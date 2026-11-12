export const retailStages = [
  {
    "title": "Data Quality",
    "source": "DataQuality.sql",
    "learning": "I used conditional aggregation to check missing identifiers, descriptions and nonpositive values before analysing sales.",
    "techniques": "COUNT, COUNT DISTINCT, SUM, CASE WHEN",
    "finding": "805,549 retained rows; no missing customer/description or nonpositive quantity/price flags in the cleaned CSV.",
    "examples": [
      {
        "title": "Example 1",
        "source": "DataQuality.sql",
        "code": "-- Data quality check\n\nSELECT\n    COUNT(*) AS total_rows,\n    COUNT(DISTINCT Invoice) AS total_invoices,\n    COUNT(DISTINCT CustomerID) AS total_customers,\n    SUM(CASE WHEN CustomerID IS NULL THEN 1 ELSE 0 END) AS missing_customers,\n    SUM(CASE WHEN Description IS NULL THEN 1 ELSE 0 END) AS missing_descriptions,\n    SUM(CASE WHEN Quantity <= 0 THEN 1 ELSE 0 END) AS invalid_quantity_rows,\n    SUM(CASE WHEN Price <= 0 THEN 1 ELSE 0 END) AS invalid_price_rows\nFROM OnlineRetail..OnlineRetail",
        "question": "Data Quality: What does the source query show?",
        "interpretation": "I used conditional aggregation to check missing identifiers, descriptions and nonpositive values before analysing sales."
      }
    ]
  },
  {
    "title": "Revenue Analysis",
    "source": "RevenueAnalysis.sql",
    "learning": "I calculated AOV from revenue and distinct invoices, and used NULLIF to guard the monthly denominator.",
    "techniques": "CTEs, SUM, COUNT DISTINCT, GROUP BY, NULLIF, ROUND",
    "finding": "Revenue 17,743,429.178; 36,969 orders; 5,878 customers; AOV 479.95.",
    "examples": [
      {
        "title": "Example 1",
        "source": "RevenueAnalysis.sql",
        "code": "WITH revenue_summary AS(\t\n\tSELECT \n\t\tSUM(Revenue) AS total_revenue, \n\t\tCOUNT (DISTINCT Invoice) AS total_orders, \n\t\tCOUNT (DISTINCT CustomerID) AS total_customers\n\tFROM OnlineRetail..OnlineRetail)\nSELECT \n\tROUND(total_revenue,2) AS total_revenue,\n\ttotal_orders,\n\ttotal_customers,\n\tROUND(total_revenue/total_orders,2) AS average_order_value\nFROM revenue_summary",
        "question": "Revenue Analysis: Overall revenue KPI summary",
        "interpretation": "I calculated AOV from revenue and distinct invoices, and used NULLIF to guard the monthly denominator."
      },
      {
        "title": "Example 2",
        "source": "RevenueAnalysis.sql",
        "code": "WITH revenue_summary AS (\t\n    SELECT \n        YearMonth,\n        SUM(Revenue) AS total_revenue, \n        COUNT(DISTINCT Invoice) AS total_orders, \n        COUNT(DISTINCT CustomerID) AS total_customers\n    FROM OnlineRetail..OnlineRetail\n    GROUP BY YearMonth\n)\nSELECT \n    YearMonth,\n    ROUND(total_revenue, 2) AS total_revenue,\n    total_orders,\n    total_customers,\n    ROUND(total_revenue / NULLIF(total_orders, 0), 2) AS average_order_value\nFROM revenue_summary\nWHERE YearMonth is not null\nORDER BY YearMonth;",
        "question": "Revenue Analysis: Monthly revenue",
        "interpretation": "I calculated AOV from revenue and distinct invoices, and used NULLIF to guard the monthly denominator."
      }
    ]
  },
  {
    "title": "Product Analysis",
    "source": "ProductAnalysis.sql",
    "learning": "I compared product revenue and units. Grouping by price splits a product into price points; grouping by stock code and description changes the grain.",
    "techniques": "GROUP BY, SUM, COUNT DISTINCT, CTE, WHERE, ORDER BY",
    "finding": "Stock code 22423 leads revenue at 286,486.30. Stock code 84077 leads units. Revenue is not profit.",
    "examples": [
      {
        "title": "Example 1",
        "source": "ProductAnalysis.sql",
        "code": "SELECT \n\tStockCode,\n\tDescription,\n\tROUND(SUM(revenue),2) AS Revenue,\n\tROUND(Price,2) AS Price,\n\tSUM(Quantity) AS Units_Sold,\n\tCOUNT (DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nWHERE StockCode is not null\nGROUP BY StockCode, Description, Price\nORDER BY Revenue DESC",
        "question": "Product Analysis: Top Products by revenue",
        "interpretation": "I compared product revenue and units. Grouping by price splits a product into price points; grouping by stock code and description changes the grain."
      },
      {
        "title": "Example 2",
        "source": "ProductAnalysis.sql",
        "code": "SELECT \n\tStockCode,\n\tDescription,\n\tROUND(SUM(revenue),2) AS Revenue,\n\tSUM(Quantity) AS Units_Sold,\n\tCOUNT (DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nWHERE StockCode is not null\nGROUP BY StockCode, Description\nORDER BY Revenue DESC\n\n-- Top Products by quantity sold\nSELECT \n\tStockCode,\n\tDescription,\n\tROUND(SUM(revenue),2) AS Revenue,\n\tSUM(Quantity) AS Units_Sold,\n\tCOUNT (DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nWHERE StockCode is not null\nGROUP BY StockCode, Description\nORDER BY Units_Sold DESC\n\n-- High Quantity, Low Revenue Products\nWith HighQuantityLowRev AS (\nSELECT \n\tStockCode,\n\tDescription,\n\tROUND(SUM(revenue),2) AS Revenue,\n\tSUM(Quantity) AS Units_Sold\nFROM OnlineRetail..OnlineRetail\nWHERE StockCode is not null\nGROUP BY StockCode, Description\n)\nSELECT \n\tStockCode,\n\tDescription,\n\tRevenue,\n\tUnits_Sold,\n\tROUND(Revenue * 1.0/Units_Sold, 2) AS Average_Unit_Revenue\nFROM HighQuantityLowRev\nWHERE Units_Sold >= 1000\nORDER BY Units_Sold DESC",
        "question": "Product Analysis: Top Products by revenue",
        "interpretation": "I compared product revenue and units. Grouping by price splits a product into price points; grouping by stock code and description changes the grain."
      }
    ]
  },
  {
    "title": "Customer Analysis",
    "source": "CustomerAnalysis.sql",
    "learning": "I used NTILE to measure revenue concentration. I also identified integer division in the repeat-rate query: it returns 72 rather than 72.39%.",
    "techniques": "CTEs, NTILE OVER, CASE WHEN, SUM, COUNT DISTINCT",
    "finding": "4,255 repeat customers out of 5,878 (72.39%, independently computed). Top decile: 63.93% of revenue.",
    "examples": [
      {
        "title": "Example 1",
        "source": "CustomerAnalysis.sql",
        "code": "With TopCustRev AS (\nSELECT \n\tCustomerID,\n\tCOUNT (DISTINCT Invoice) AS Orders,\n\tSUM(Revenue) AS Revenue\nFROM OnlineRetail..OnlineRetail\nGROUP BY CustomerID\n)\nSELECT\n\tCustomerID,\n\tOrders,\n\tROUND(Revenue, 2) AS Revenue,\n\tROUND(Revenue * 1.0/Orders,2) AS Average_Order_Value\nFROM TopCustRev\t\nWHERE CustomerID is not null\nORDER BY Revenue DESC\n\n-- Revenue Concentration\n-- How much revenue is generated by the top 10% of customers, the next 10% and so on...\nWITH CustRev AS (\nSELECT\n\tCustomerID,\n\tSUM(Revenue) AS Revenue\nFrom OnlineRetail..OnlineRetail\nGROUP BY CustomerID\n)\n,RankCus AS(\nSELECT \n\tCustomerID,\n\tRevenue,\n\tNTILE(10) OVER (ORDER BY Revenue DESC) AS Revenue_Decline\nFROM CustRev\n)\nSELECT\n\tRevenue_Decline,\n\tCOUNT (*) AS Customers,\n\tROUND(SUM(Revenue),2) AS Decline_Revenue\nFROM RankCus\nGROUP BY Revenue_Decline\nORDER BY Revenue_Decline\n\t\t\n-- Customer Repeat Rate\nWITH CustOrders AS(\nSELECT\n\tCustomerID,\n\tCOUNT(DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nGROUP BY CustomerID\n)\nSELECT \n\tCOUNT (*) AS Total_Customer,\n\tSUM(CASE WHEN Orders > 1 THEN 1 ELSE 0 END) AS RepeatCustomers,\n\tROUND(100 * SUM(CASE WHEN Orders > 1 THEN 1 ELSE 0 END) / COUNT (*), 2) AS Customer_Repeat_Rate\nFROM CustOrders",
        "question": "Customer Analysis: Top Customers by Revenue",
        "interpretation": "I used NTILE to measure revenue concentration. I also identified integer division in the repeat-rate query: it returns 72 rather than 72.39%."
      }
    ]
  },
  {
    "title": "Country Analysis",
    "source": "Country_Analysis.sql",
    "learning": "I compared country revenue and order value using distinct invoices rather than transaction rows.",
    "techniques": "GROUP BY, SUM, COUNT DISTINCT, CTE, ROUND",
    "finding": "United Kingdom: 14,723,147.52 revenue, 82.98% share and 33,541 orders.",
    "examples": [
      {
        "title": "Example 1",
        "source": "Country_Analysis.sql",
        "code": "SELECT\n\tCountry,\n\tROUND (SUM(Revenue),2) AS Revenue,\n\tCOUNT (DISTINCT Invoice) AS Orders,\n\tCOUNT (DISTINCT CustomerID) AS Customers\nFROM OnlineRetail..OnlineRetail\nGROUP BY Country\nORDER BY revenue DESC\n\n-- Average Order Value by country\nwith AOV as(\nSELECT \n\tCountry,\n\tSUM(Revenue) AS Revenue,\n\tCOUNT(DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nGROUP BY Country\n)\nSELECT\n\tCountry,\n\tROUND(Revenue, 2) AS Revenue,\n\tOrders,\n\tROUND(Revenue/Orders, 2) AS Average_Order_Value\nFROM AOV\nORDER BY Revenue DESC",
        "question": "Country Analysis: Top countries by revenue",
        "interpretation": "I compared country revenue and order value using distinct invoices rather than transaction rows."
      }
    ]
  },
  {
    "title": "RFM Customer Segmentation",
    "source": "RFMSegment.sql",
    "learning": "I summarised pre-existing RFM segments. This script does not define recency calculations, scoring or classification thresholds.",
    "techniques": "GROUP BY, COUNT, SUM, AVG, ROUND",
    "finding": "Champions: 1,182 customers and 12,289,134.80 revenue (69.26%). This is a historical snapshot.",
    "examples": [
      {
        "title": "Example 1",
        "source": "RFMSegment.sql",
        "code": "-- RFM Segment Performance\n-- R: Recency- how recently they bought the items\n-- F: Frequency- how often they bought \n-- M: Monetary- how much they spent\nSELECT\n\tSegment,\n\tCOUNT(*) AS Customers,\n\tROUND(SUM(Monetary), 2) AS Revenue,\n\tROUND(AVG(Monetary), 2) As Average_Customer_Value,\n\tROUND(AVG(Frequency), 2) AS Average_Orders,\n\tROUND(AVG(Recency), 2) AS Average_Recency_Days\nFROM OnlineRetail..RFMSegments\nGROUP BY Segment\nORDER BY Revenue DESC",
        "question": "RFM Customer Segmentation: What does the source query show?",
        "interpretation": "I summarised pre-existing RFM segments. This script does not define recency calculations, scoring or classification thresholds."
      }
    ]
  }
];