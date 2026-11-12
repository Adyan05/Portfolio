SELECT * 
FROM OnlineRetail..OnlineRetail

-- Data quality check

SELECT
    COUNT(*) AS total_rows,
    COUNT(DISTINCT Invoice) AS total_invoices,
    COUNT(DISTINCT CustomerID) AS total_customers,
    SUM(CASE WHEN CustomerID IS NULL THEN 1 ELSE 0 END) AS missing_customers,
    SUM(CASE WHEN Description IS NULL THEN 1 ELSE 0 END) AS missing_descriptions,
    SUM(CASE WHEN Quantity <= 0 THEN 1 ELSE 0 END) AS invalid_quantity_rows,
    SUM(CASE WHEN Price <= 0 THEN 1 ELSE 0 END) AS invalid_price_rows
FROM OnlineRetail..OnlineRetail