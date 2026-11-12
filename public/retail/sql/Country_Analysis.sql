-- Top countries by revenue

SELECT
	Country,
	ROUND (SUM(Revenue),2) AS Revenue,
	COUNT (DISTINCT Invoice) AS Orders,
	COUNT (DISTINCT CustomerID) AS Customers
FROM OnlineRetail..OnlineRetail
GROUP BY Country
ORDER BY revenue DESC

-- Average Order Value by country
with AOV as(
SELECT 
	Country,
	SUM(Revenue) AS Revenue,
	COUNT(DISTINCT Invoice) AS Orders
FROM OnlineRetail..OnlineRetail
GROUP BY Country
)
SELECT
	Country,
	ROUND(Revenue, 2) AS Revenue,
	Orders,
	ROUND(Revenue/Orders, 2) AS Average_Order_Value
FROM AOV
ORDER BY Revenue DESC