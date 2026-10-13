export const sqlExamples = [
  {
    "title": "Executive snapshot",
    "question": "What revenue, volume and customer reach does the dataset record?",
    "code": "SELECT SUM(sales) as total_revenue, SUM(quantity) as units_sold, COUNT(DISTINCT orderid) AS distinct_orders, COUNT(DISTINCT customerid) as purchasing_customers\nFROM orders",
    "source": "AggregationKPI.sql",
    "interpretation": "Establishes the baseline for all later comparisons."
  },
  {
    "title": "Monthly sales",
    "question": "How do revenue, orders and units change each month?",
    "code": "SELECT DATE_TRUNC('month', orderdate)::date  AS SalesMonth, SUM(sales) AS MonthlyRevenue, COUNT(DISTINCT orderid) AS OrderCounts, SUM(quantity) AS UnitsSold\nFROM orders\nGROUP BY SalesMonth\nORDER BY SalesMonth",
    "source": "AggregationKPI.sql",
    "interpretation": "Supports period comparisons; August 2022 must be treated as partial."
  },
  {
    "title": "Product revenue ranking",
    "question": "Which products rank highest within each country?",
    "code": "WITH country_product_revenue AS(\n\tSELECT SUM(ord.sales) AS revenue, ord.productid, ord.coffeetypename, cust.country\n\tFROM orders ord\n\tJOIN products prod\n\tON ord.productid=prod.productid\n\tJOIN customers cust \n\tON cust.customerid=ord.customerid\n\tGROUP BY ord.productid, ord.coffeetypename, cust.country\n),\nranked_product AS(\n\tSELECT *, RANK() OVER (\n\t\t\t\t\tPARTITION BY country\n\t\t\t\t\tORDER BY revenue DESC\n\t) AS product_rank\n\tFROM country_product_revenue\n\t)\nSELECT * \nFROM ranked_product\nWHERE product_rank <= 3\nORDER BY country, product_rank, productid, coffeetypename",
    "source": "AdvancedAnalysis.sql",
    "interpretation": "Surfaces market-specific product demand without assuming identical preferences."
  },
  {
    "title": "Customer leaderboard",
    "question": "Who contributes the most lifetime revenue?",
    "code": "WITH customer_revenue AS(\n\tSELECT customerid, customername, SUM(sales) AS revenue\n\tFROM orders\n\tGROUP BY customerid, customername\n)\nSELECT *, RANK() OVER (ORDER BY revenue DESC) AS customer_rank\nFROM customer_revenue\nORDER BY customer_rank, customerid",
    "source": "AdvancedAnalysis.sql",
    "interpretation": "Identifies high-value customers for further investigation, not a proven targeting strategy."
  },
  {
    "title": "Purchase frequency",
    "question": "How many customers have never purchased or placed repeat orders?",
    "code": "WITH customer_metric AS(\n\tSELECT cust.customerid, \n\t\t\tcust.customername, \n\t\t\tCOUNT(DISTINCT ord.orderid) AS order_count, \n\t\t\tCOALESCE(SUM(ord.sales),0) AS revenue\n\tFROM customers cust\n\tLEFT JOIN orders ord\n\tON cust.customerid=ord.customerid\n\tGROUP BY cust.customerid, cust.customername\n),\ncustomer_segments AS (\n\tSELECT customerid,\n\t\t\trevenue,\n\t\t\tCASE\n\t\t\tWHEN order_count=0 THEN 'Never Purchased'\n\t\t\tWHEN order_count=1 THEN 'One Order'\n\t\t\tWHEN order_count=2 THEN 'Two Orders'\n\t\t\tWHEN order_count=3 THEN 'Three Order'\n\t\t\tELSE 'Four-plus Orders'\n\t\tEND as Segment\n\tFROM customer_metric\n)\nSELECT segment, COUNT(*) AS customer_count, SUM(revenue) as revenue\nFROM customer_segments\nGROUP BY segment",
    "source": "AdvancedAnalysis.sql",
    "interpretation": "Separates registration from purchase activity and motivates retention analysis."
  }
];
export const daxExamples = [
  {
    "title": "Total Revenue",
    "code": "Total Revenue =\nSUM('public orders'[sales])",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Total Orders",
    "code": "Total Orders =\nDISTINCTCOUNT('public orders'[orderid])",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Average Order Value",
    "code": "Average Order Value =\nDIVIDE([Total Revenue], [Total Orders])",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Purchasing Customers",
    "code": "Purchasing Customers =\nDISTINCTCOUNT('public orders'[customerid])",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Total Revenue MoM%",
    "code": "Total Revenue MoM% =\nVAR ThisMonth = SELECTEDVALUE('Calendar'[Month Start])\nVAR LastObservedDate = CALCULATE(MAX('public orders'[orderdate]), REMOVEFILTERS())\nVAR PreviousMonthStart = EDATE(ThisMonth,-1)\nVAR PreviousRevenue =\n    CALCULATE([Total Revenue], REMOVEFILTERS('Calendar'),\n        DATESBETWEEN('Calendar'[Date],PreviousMonthStart,EOMONTH(ThisMonth,-1)))\nRETURN\nIF(NOT ISBLANK(ThisMonth) && EOMONTH(ThisMonth,0) <= LastObservedDate && NOT ISBLANK([Total Revenue]),\n    DIVIDE([Total Revenue]-PreviousRevenue,PreviousRevenue))",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Total Revenue YoY%",
    "code": "Total Revenue YoY% =\nVAR ThisMonth = SELECTEDVALUE('Calendar'[Month Start])\nVAR LastObservedDate = CALCULATE(MAX('public orders'[orderdate]), REMOVEFILTERS())\nVAR ComparisonMonth = EDATE(ThisMonth,-12)\nVAR PreviousRevenue =\n    CALCULATE([Total Revenue], REMOVEFILTERS('Calendar'),\n        DATESBETWEEN('Calendar'[Date],ComparisonMonth,EOMONTH(ComparisonMonth,0)))\nRETURN\nIF(NOT ISBLANK(ThisMonth) && EOMONTH(ThisMonth,0) <= LastObservedDate && NOT ISBLANK([Total Revenue]),\n    DIVIDE([Total Revenue]-PreviousRevenue,PreviousRevenue))",
    "source": "README.md + supplied model metadata"
  },
  {
    "title": "Revenue Share",
    "code": "Revenue Share =\nDIVIDE([Total Revenue], CALCULATE([Total Revenue], ALLSELECTED('public customers'[country]), ALLSELECTED('public products'[Coffee Type Name])))",
    "source": "README.md + supplied model metadata"
  }
];
