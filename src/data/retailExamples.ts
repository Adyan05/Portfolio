export const retailExamples = [
  {
    "title": "Executive summary",
    "source": "RevenueAnalysis.sql",
    "code": "WITH revenue_summary AS(\t\n\tSELECT \n\t\tSUM(Revenue) AS total_revenue, \n\t\tCOUNT (DISTINCT Invoice) AS total_orders, \n\t\tCOUNT (DISTINCT CustomerID) AS total_customers\n\tFROM OnlineRetail..OnlineRetail)\nSELECT \n\tROUND(total_revenue,2) AS total_revenue,\n\ttotal_orders,\n\ttotal_customers,\n\tROUND(total_revenue/total_orders,2) AS average_order_value\nFROM revenue_summary",
    "question": "What revenue, orders, customers and AOV were recorded?",
    "interpretation": "SUM and distinct invoice/customer counts preserve transaction versus order granularity. The executive query has no zero-denominator guard."
  },
  {
    "title": "Monthly performance",
    "source": "RevenueAnalysis.sql",
    "code": "WITH revenue_summary AS (\t\n    SELECT \n        YearMonth,\n        SUM(Revenue) AS total_revenue, \n        COUNT(DISTINCT Invoice) AS total_orders, \n        COUNT(DISTINCT CustomerID) AS total_customers\n    FROM OnlineRetail..OnlineRetail\n    GROUP BY YearMonth\n)\nSELECT \n    YearMonth,\n    ROUND(total_revenue, 2) AS total_revenue,\n    total_orders,\n    total_customers,\n    ROUND(total_revenue / NULLIF(total_orders, 0), 2) AS average_order_value\nFROM revenue_summary\nWHERE YearMonth is not null\nORDER BY YearMonth;",
    "question": "How does revenue vary by month?",
    "interpretation": "GROUP BY YearMonth and NULLIF protect the monthly AOV denominator. December 2011 is a partial month."
  },
  {
    "title": "Revenue concentration",
    "source": "CustomerAnalysis.sql",
    "code": "WITH CustRev AS (\nSELECT\n\tCustomerID,\n\tSUM(Revenue) AS Revenue\nFrom OnlineRetail..OnlineRetail\nGROUP BY CustomerID\n)\n,RankCus AS(\nSELECT \n\tCustomerID,\n\tRevenue,\n\tNTILE(10) OVER (ORDER BY Revenue DESC) AS Revenue_Decline\nFROM CustRev\n)\nSELECT\n\tRevenue_Decline,\n\tCOUNT (*) AS Customers,\n\tROUND(SUM(Revenue),2) AS Decline_Revenue\nFROM RankCus\nGROUP BY Revenue_Decline\nORDER BY Revenue_Decline",
    "question": "How much revenue comes from the highest-value customer decile?",
    "interpretation": "NTILE(10) assigns nearly equal customer groups. The first bucket contains 588 customers. The source does not exclude NULL customer IDs; the cleaned dataset has none."
  },
  {
    "title": "Repeat customers",
    "source": "CustomerAnalysis.sql",
    "code": "WITH CustOrders AS(\nSELECT\n\tCustomerID,\n\tCOUNT(DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nGROUP BY CustomerID\n)\nSELECT \n\tCOUNT (*) AS Total_Customer,\n\tSUM(CASE WHEN Orders > 1 THEN 1 ELSE 0 END) AS RepeatCustomers,\n\tROUND(100 * SUM(CASE WHEN Orders > 1 THEN 1 ELSE 0 END) / COUNT (*), 2) AS Customer_Repeat_Rate\nFROM CustOrders",
    "question": "What percentage of customers placed multiple orders?",
    "interpretation": "The original T-SQL expression uses integer division: it yields 72 rather than 72.39. The case study recomputes the decimal percentage independently. No source code is silently corrected."
  },
  {
    "title": "Product performance",
    "source": "ProductAnalysis.sql",
    "code": "SELECT \n\tStockCode,\n\tDescription,\n\tROUND(SUM(revenue),2) AS Revenue,\n\tSUM(Quantity) AS Units_Sold,\n\tCOUNT (DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nWHERE StockCode is not null\nGROUP BY StockCode, Description\nORDER BY Revenue DESC",
    "question": "Which stock-code and description combinations lead revenue?",
    "interpretation": "This excerpt groups by StockCode and Description, unlike the preceding price-level query. Changing descriptions can split one stock code; revenue is not profit."
  },
  {
    "title": "RFM performance",
    "source": "RFMSegment.sql",
    "code": "SELECT\n\tSegment,\n\tCOUNT(*) AS Customers,\n\tROUND(SUM(Monetary), 2) AS Revenue,\n\tROUND(AVG(Monetary), 2) As Average_Customer_Value,\n\tROUND(AVG(Frequency), 2) AS Average_Orders,\n\tROUND(AVG(Recency), 2) AS Average_Recency_Days\nFROM OnlineRetail..RFMSegments\nGROUP BY Segment\nORDER BY Revenue DESC",
    "question": "How do customer segments differ in value and behaviour?",
    "interpretation": "COUNT, SUM and AVG summarize the provided segmentation output. Segment names are verified; the classification rules are absent from the notebook."
  },
  {
    "title": "Country comparison",
    "source": "Country_Analysis.sql",
    "code": "with AOV as(\nSELECT \n\tCountry,\n\tSUM(Revenue) AS Revenue,\n\tCOUNT(DISTINCT Invoice) AS Orders\nFROM OnlineRetail..OnlineRetail\nGROUP BY Country\n)\nSELECT\n\tCountry,\n\tROUND(Revenue, 2) AS Revenue,\n\tOrders,\n\tROUND(Revenue/Orders, 2) AS Average_Order_Value\nFROM AOV\nORDER BY Revenue DESC",
    "question": "How does average order value differ by country?",
    "interpretation": "Revenue divided by distinct invoices provides market-level AOV. Different basket sizes do not establish differences in profitability."
  },
  {
    "title": "Data quality",
    "source": "DataQuality.sql",
    "code": "SELECT\n    COUNT(*) AS total_rows,\n    COUNT(DISTINCT Invoice) AS total_invoices,\n    COUNT(DISTINCT CustomerID) AS total_customers,\n    SUM(CASE WHEN CustomerID IS NULL THEN 1 ELSE 0 END) AS missing_customers,\n    SUM(CASE WHEN Description IS NULL THEN 1 ELSE 0 END) AS missing_descriptions,\n    SUM(CASE WHEN Quantity <= 0 THEN 1 ELSE 0 END) AS invalid_quantity_rows,\n    SUM(CASE WHEN Price <= 0 THEN 1 ELSE 0 END) AS invalid_price_rows\nFROM OnlineRetail..OnlineRetail",
    "question": "Which missing values and nonpositive transactions need attention?",
    "interpretation": "Conditional aggregation identifies potential issues; this query does not remove or correct rows."
  }
];
