SELECT * 
FROM OnlineRetail..RFMSegments

-- RFM Segment Performance
-- R: Recency- how recently they bought the items
-- F: Frequency- how often they bought 
-- M: Monetary- how much they spent
SELECT
	Segment,
	COUNT(*) AS Customers,
	ROUND(SUM(Monetary), 2) AS Revenue,
	ROUND(AVG(Monetary), 2) As Average_Customer_Value,
	ROUND(AVG(Frequency), 2) AS Average_Orders,
	ROUND(AVG(Recency), 2) AS Average_Recency_Days
FROM OnlineRetail..RFMSegments
GROUP BY Segment
ORDER BY Revenue DESC