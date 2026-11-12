--Overall revenue KPI summary
WITH revenue_summary AS(	
	SELECT 
		SUM(Revenue) AS total_revenue, 
		COUNT (DISTINCT Invoice) AS total_orders, 
		COUNT (DISTINCT CustomerID) AS total_customers
	FROM OnlineRetail..OnlineRetail)
SELECT 
	ROUND(total_revenue,2) AS total_revenue,
	total_orders,
	total_customers,
	ROUND(total_revenue/total_orders,2) AS average_order_value
FROM revenue_summary


-- Monthly revenue 
WITH revenue_summary AS (	
    SELECT 
        YearMonth,
        SUM(Revenue) AS total_revenue, 
        COUNT(DISTINCT Invoice) AS total_orders, 
        COUNT(DISTINCT CustomerID) AS total_customers
    FROM OnlineRetail..OnlineRetail
    GROUP BY YearMonth
)
SELECT 
    YearMonth,
    ROUND(total_revenue, 2) AS total_revenue,
    total_orders,
    total_customers,
    ROUND(total_revenue / NULLIF(total_orders, 0), 2) AS average_order_value
FROM revenue_summary
WHERE YearMonth is not null
ORDER BY YearMonth;