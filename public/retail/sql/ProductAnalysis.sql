-- Top Products by revenue
-- Some Products have different prices
SELECT 
	StockCode,
	Description,
	ROUND(SUM(revenue),2) AS Revenue,
	ROUND(Price,2) AS Price,
	SUM(Quantity) AS Units_Sold,
	COUNT (DISTINCT Invoice) AS Orders
FROM OnlineRetail..OnlineRetail
WHERE StockCode is not null
GROUP BY StockCode, Description, Price
ORDER BY Revenue DESC


-- Top Products by revenue
SELECT 
	StockCode,
	Description,
	ROUND(SUM(revenue),2) AS Revenue,
	SUM(Quantity) AS Units_Sold,
	COUNT (DISTINCT Invoice) AS Orders
FROM OnlineRetail..OnlineRetail
WHERE StockCode is not null
GROUP BY StockCode, Description
ORDER BY Revenue DESC

-- Top Products by quantity sold
SELECT 
	StockCode,
	Description,
	ROUND(SUM(revenue),2) AS Revenue,
	SUM(Quantity) AS Units_Sold,
	COUNT (DISTINCT Invoice) AS Orders
FROM OnlineRetail..OnlineRetail
WHERE StockCode is not null
GROUP BY StockCode, Description
ORDER BY Units_Sold DESC

-- High Quantity, Low Revenue Products
With HighQuantityLowRev AS (
SELECT 
	StockCode,
	Description,
	ROUND(SUM(revenue),2) AS Revenue,
	SUM(Quantity) AS Units_Sold
FROM OnlineRetail..OnlineRetail
WHERE StockCode is not null
GROUP BY StockCode, Description
)
SELECT 
	StockCode,
	Description,
	Revenue,
	Units_Sold,
	ROUND(Revenue * 1.0/Units_Sold, 2) AS Average_Unit_Revenue
FROM HighQuantityLowRev
WHERE Units_Sold >= 1000
ORDER BY Units_Sold DESC