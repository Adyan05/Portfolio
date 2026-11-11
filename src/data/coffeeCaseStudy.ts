export type CoffeePage = 'overview' | 'cleaning' | 'dashboard' | 'sql' | 'learning';

export type SqlExample = {
  title: string;
  problem: string;
  code: string;
  techniques: string[];
  explanation: string;
  learning: string;
  result?: string;
  reviewNote?: string;
};

export type SqlStage = {
  id: string;
  number: string;
  title: string;
  source: string;
  applied: string;
  learned: string;
  examples: SqlExample[];
};

export const formulaEvidence = [
  {
    title: 'Customer lookups',
    formula: '=XLOOKUP(C2,customers!$A$1:$A$1001,customers!$B$1:$B$1001,,0)',
    detail: 'Retrieved customer names from the Customers worksheet by matching Customer ID.',
  },
  {
    title: 'Product lookups',
    formula: '=INDEX(products!$A$1:$G$49,MATCH(D2,products!$A$1:$A$49,0),MATCH(I$1,products!$A$1:$G$1,0))',
    detail: 'Matched Product ID and the requested column header to return coffee, roast, size and price attributes.',
  },
  {
    title: 'Sales calculation',
    formula: '=L2*E2',
    detail: 'Calculated each sales-line value as Unit Price multiplied by Quantity.',
  },
  {
    title: 'Readable categories',
    formula: '=IF(I2="Rob","Robusta",IF(I2="Exc","Excelsa",IF(I2="Ara","Arabica",IF(I2="Lib","Liberica",""))))',
    detail: 'Converted abbreviated coffee codes into names that are easier to interpret in analysis.',
  },
];

export const cleaningChecks = [
  ['Orders', '1,000 rows', '0 exact duplicate rows', '206 blank email values among purchasing records'],
  ['Customers', '1,000 rows', '0 exact duplicate rows', '204 blank emails and 130 blank phone numbers retained'],
  ['Products', '48 rows', '0 exact duplicate rows', 'All seven product fields populated'],
] as const;

export const sqlStages: SqlStage[] = [
  {
    id: 'fundamentals',
    number: '01',
    title: 'SQL Fundamentals',
    source: 'SimpleSummary.sql',
    applied: 'I retrieved selected columns, filtered by dates and markets, sorted results, checked missing values and created readable sales-value bands.',
    learned: 'I learned to translate a precise question into a small query and to check the shape and quality of the result before moving to more complex analysis.',
    examples: [
      {
        title: 'Recent sales review',
        problem: 'Return the 20 most recent sales lines for a quick operational review.',
        code: `SELECT orderid, orderdate, customerid, productid, quantity, sales
FROM orders
ORDER BY orderdate DESC, orderid, productid
LIMIT 20;`,
        techniques: ['SELECT', 'ORDER BY', 'LIMIT'],
        explanation: 'The query sorts the newest dates first, adds stable tie-breakers and limits the result to a manageable review list.',
        learning: 'I learned that sorting should be explicit and deterministic when a result is limited.',
        result: 'Returns exactly 20 sales lines, ordered from the latest transaction date.',
      },
      {
        title: 'Missing contact information',
        problem: 'Identify customers without a usable email address and label the missing value clearly.',
        code: `SELECT customername,
       COALESCE(NULLIF(TRIM(email),''), 'Missing Email') AS empty_email
FROM customers
WHERE NULLIF(TRIM(email),'') IS NULL;`,
        techniques: ['TRIM', 'NULLIF', 'COALESCE', 'WHERE', 'IS NULL'],
        explanation: 'TRIM removes surrounding whitespace, NULLIF turns an empty string into NULL, and COALESCE supplies a readable label.',
        learning: 'I learned that blank strings and NULL values need consistent treatment before missing-value checks are reliable.',
        result: 'The cleaned customer file contains 204 blank email values.',
      },
      {
        title: 'Sales-line value bands',
        problem: 'Group sales lines into small, medium and high-value review bands.',
        code: `SELECT sales, coffeetypename, customername,
CASE
    WHEN sales < 20 THEN 'Small Sale'
    WHEN sales >= 20 AND sales < 50 THEN 'Medium Sale'
    WHEN sales >= 50 THEN 'High Sale'
END AS sales_category
FROM orders;`,
        techniques: ['CASE WHEN', 'Calculated category', 'Conditional logic'],
        explanation: 'The CASE expression evaluates each sales line once and assigns a mutually exclusive category.',
        learning: 'I learned how conditional logic can turn a continuous measure into an interpretable business grouping.',
        result: '323 small, 371 medium and 306 high-value sales lines.',
      },
    ],
  },
  {
    id: 'aggregation',
    number: '02',
    title: 'Aggregation & KPI Analysis',
    source: 'AggregationKPI.sql',
    applied: 'I grouped transactional records and calculated revenue, units, distinct orders, purchasing customers, Average Order Value and performance by month, country and product.',
    learned: 'I learned that the aggregation level must match the business metric. In particular, counting rows would overstate orders because an order can contain several product lines.',
    examples: [
      {
        title: 'Executive sales snapshot',
        problem: 'Summarise the overall scale of sales activity in one row.',
        code: `SELECT SUM(sales) AS total_revenue,
       SUM(quantity) AS units_sold,
       COUNT(DISTINCT orderid) AS distinct_orders,
       COUNT(DISTINCT customerid) AS purchasing_customers
FROM orders;`,
        techniques: ['SUM', 'COUNT(DISTINCT)', 'KPI calculation'],
        explanation: 'SUM produces revenue and volume totals, while DISTINCTCOUNT logic prevents repeated order and customer IDs from being counted more than once.',
        learning: 'I learned to define each KPI before writing the query and to respect the difference between sales lines, orders and customers.',
        result: '45,135.35 revenue, 3,551 units, 957 distinct orders and 913 purchasing customers.',
      },
      {
        title: 'Monthly sales scorecard',
        problem: 'Compare revenue, order counts and units across calendar months.',
        code: `SELECT DATE_TRUNC('month', orderdate)::date AS salesmonth,
       SUM(sales) AS monthlyrevenue,
       COUNT(DISTINCT orderid) AS ordercounts,
       SUM(quantity) AS unitssold
FROM orders
GROUP BY salesmonth
ORDER BY salesmonth;`,
        techniques: ['DATE_TRUNC', 'GROUP BY', 'SUM', 'COUNT(DISTINCT)'],
        explanation: 'DATE_TRUNC assigns each date to its month. The query then aggregates all sales lines within that monthly grain.',
        learning: 'I learned to create consistent time periods before comparing trends.',
        result: 'February 2020 records the highest monthly revenue at 1,798.40. August 2022 is partial.',
      },
      {
        title: 'Country performance',
        problem: 'Compare revenue, order reach, customer reach and AOV across countries.',
        code: `SELECT country,
       SUM(sales) AS revenue,
       COUNT(DISTINCT orderid),
       COUNT(DISTINCT customerid),
       ROUND(SUM(sales) / COUNT(DISTINCT orderid), 2) AS averageordervalue
FROM orders
GROUP BY country;`,
        techniques: ['GROUP BY', 'SUM', 'COUNT(DISTINCT)', 'ROUND'],
        explanation: 'The query keeps country as the grouping dimension and calculates several measures at the same level.',
        learning: 'I learned to compare related KPIs together instead of judging a market from revenue alone.',
        result: 'The United States contributes 35,639.73, approximately 79% of total revenue.',
      },
    ],
  },
  {
    id: 'joins',
    number: '03',
    title: 'Multi-Table Analysis',
    source: 'MultitableAnalysis.sql',
    applied: 'I linked Orders to Customers and Products through customer and product identifiers, then combined those attributes with sales behaviour and profitability calculations.',
    learned: 'I learned that join choice controls which records survive. I also learned to aggregate at the correct grain after a join to avoid repeated values and incorrect totals.',
    examples: [
      {
        title: 'Customer purchase lookup',
        problem: 'Add customer context to each sales line.',
        code: `SELECT ord.customerid, ord.orderdate, ord.orderid, ord.productid,
       ord.sales, ord.quantity, cust.customername, cust.country,
       cust.phonenumber, cust.email
FROM orders ord
JOIN customers cust
  ON ord.customerid = cust.customerid;`,
        techniques: ['INNER JOIN', 'Primary/foreign-key relationship', 'Aliases'],
        explanation: 'The join matches each order row to the customer with the same Customer ID. Only matching records are returned.',
        learning: 'I learned how a foreign key lets me add descriptive context without storing every customer attribute in every source table.',
        result: 'The public portfolio does not display this query output because it contains customer contact information.',
      },
      {
        title: 'Complete customer value directory',
        problem: 'Keep every registered customer, including people with no matching order, and calculate order count and revenue.',
        code: `SELECT cust.customerid, cust.customername,
       COUNT(DISTINCT ord.orderid) AS ordercount,
       COALESECE(SUM(ord.sales),0) AS revenue
FROM customers cust
LEFT JOIN orders ord
  ON cust.customerid = ord.customerid
GROUP BY cust.customerid, cust.customername;`,
        techniques: ['LEFT JOIN', 'COUNT(DISTINCT)', 'GROUP BY', 'NULL handling'],
        explanation: 'The LEFT JOIN preserves the complete customer list. Aggregation creates one result row per customer.',
        learning: 'Reviewing this query reinforced that LEFT JOIN is required for unmatched customers and that function names must be validated before execution.',
        reviewNote: 'The source file spells COALESCE as COALESECE. The intended logic is clear, but the source query needs that spelling correction before it will run.',
      },
      {
        title: 'Estimated product profitability',
        problem: 'Combine units sold with the product profit field to estimate total profit and margin by product.',
        code: `WITH product_info AS (
    SELECT ord.productid,
           SUM(ord.quantity) AS units_sold,
           SUM(ord.sales) AS revenue,
           SUM(ord.quantity * prod.profit) AS estimated_total_profit
    FROM orders ord
    JOIN products prod
      ON ord.productid = prod.productid
    GROUP BY ord.productid
)
SELECT productid, units_sold, revenue,
       ROUND(estimated_total_profit,2) AS estimated_total_profit,
       ROUND(100 * estimated_total_profit / NULLIF(revenue,0),2)
         AS estimated_profit_margin
FROM product_info;`,
        techniques: ['JOIN', 'CTE', 'SUM', 'NULLIF', 'Calculated margin'],
        explanation: 'The CTE creates product-level revenue and estimated profit before the final query calculates a percentage margin.',
        learning: 'I learned to separate an intermediate aggregation from the final business calculation so each step is easier to inspect.',
        result: 'Presented as an estimate because the source workbook does not document the business definition of the Profit field.',
      },
    ],
  },
  {
    id: 'advanced',
    number: '04',
    title: 'Advanced SQL Analysis',
    source: 'AdvancedAnalysis.sql',
    applied: 'I used CTEs, subqueries, CASE expressions and window functions to structure multi-step customer, product and time-series questions.',
    learned: 'I learned to build and validate a complex query in stages: define the grain, create the intermediate result, apply the window calculation and then filter or interpret the final output.',
    examples: [
      {
        title: 'Customer purchase-frequency segments',
        problem: 'Separate registered customers by the number of distinct orders they placed.',
        code: `WITH customer_metric AS (
    SELECT cust.customerid,
           cust.customername,
           COUNT(DISTINCT ord.orderid) AS order_count,
           COALESCE(SUM(ord.sales),0) AS revenue
    FROM customers cust
    LEFT JOIN orders ord ON cust.customerid = ord.customerid
    GROUP BY cust.customerid, cust.customername
),
customer_segments AS (
    SELECT customerid, revenue,
           CASE
             WHEN order_count = 0 THEN 'Never Purchased'
             WHEN order_count = 1 THEN 'One Order'
             WHEN order_count = 2 THEN 'Two Orders'
             WHEN order_count = 3 THEN 'Three Order'
             ELSE 'Four-plus Orders'
           END AS segment
    FROM customer_metric
)
SELECT segment, COUNT(*) AS customer_count, SUM(revenue) AS revenue
FROM customer_segments
GROUP BY segment;`,
        techniques: ['Multiple CTEs', 'LEFT JOIN', 'CASE WHEN', 'COUNT(DISTINCT)'],
        explanation: 'The first CTE creates customer-level measures. The second labels each customer, and the final query summarises the segments.',
        learning: 'I learned how CTEs make the data flow of a multi-step segmentation problem visible.',
        result: '87 never purchased, 888 placed one order, 13 placed two, 7 placed three and 5 placed four or more.',
      },
      {
        title: 'Top products within each country',
        problem: 'Rank products by revenue separately inside every country and retain the top three ranks.',
        code: `WITH country_product_revenue AS (
    SELECT SUM(ord.sales) AS revenue, ord.productid,
           ord.coffeetypename, cust.country
    FROM orders ord
    JOIN products prod ON ord.productid = prod.productid
    JOIN customers cust ON cust.customerid = ord.customerid
    GROUP BY ord.productid, ord.coffeetypename, cust.country
),
ranked_product AS (
    SELECT *, RANK() OVER (
        PARTITION BY country
        ORDER BY revenue DESC
    ) AS product_rank
    FROM country_product_revenue
)
SELECT *
FROM ranked_product
WHERE product_rank <= 3
ORDER BY country, product_rank, productid, coffeetypename;`,
        techniques: ['Multiple CTEs', 'RANK', 'PARTITION BY', 'Multiple JOINs'],
        explanation: 'Revenue is aggregated first. RANK then restarts for each country, and the outer filter keeps the leading products while retaining ties.',
        learning: 'I learned why GROUP BY alone cannot return a top-N result inside each category.',
        result: 'The leading products are L-D-2.5 in Ireland, E-D-2.5 in the United Kingdom and A-M-2.5 in the United States.',
      },
      {
        title: 'Product revenue contribution',
        problem: 'Calculate each product’s percentage contribution to its country’s revenue.',
        code: `WITH product_sale AS (
    SELECT SUM(sales) AS revenue, productid, country
    FROM orders
    GROUP BY productid, country
)
SELECT *,
       ROUND(100.0 * revenue /
             NULLIF(SUM(revenue) OVER (PARTITION BY country),0),2)
         AS revenue_percentage
FROM product_sale
ORDER BY country, revenue_percentage DESC;`,
        techniques: ['CTE', 'SUM OVER', 'PARTITION BY', 'Percentage of total'],
        explanation: 'The window sum calculates a country total without collapsing the product rows. Each product can then be divided by that total.',
        learning: 'I learned that window functions retain row-level detail while adding an aggregate context.',
      },
      {
        title: 'Month-over-month and year-over-year growth',
        problem: 'Compare monthly revenue with the previous month and the same month one year earlier.',
        code: `WITH monthly_sales AS (
    SELECT SUM(sales) AS revenue,
           DATE_TRUNC('month', orderdate)::date AS sales_month
    FROM orders
    WHERE orderdate < DATE '2022-08-01'
    GROUP BY DATE_TRUNC('month', orderdate)::date
),
revenue_comparison AS (
    SELECT sales_month, revenue,
           LAG(revenue,1) OVER (ORDER BY sales_month) AS prev_month_rev,
           LAG(revenue,12) OVER (ORDER BY sales_month) AS prev_year_rev
    FROM monthly_sales
)
SELECT *,
       ROUND(100.0 * (revenue-prev_month_rev) /
             NULLIF(prev_month_rev,0),2) AS month_over_month_growth_percentage,
       ROUND(100.0 * (revenue-prev_year_rev) /
             NULLIF(prev_year_rev,0),2) AS year_over_year_growth_percentage
FROM revenue_comparison
ORDER BY sales_month;`,
        techniques: ['Multiple CTEs', 'LAG', 'Date calculation', 'MoM/YoY'],
        explanation: 'Monthly totals are created first. LAG retrieves prior comparison values, and the final query calculates percentage change safely.',
        learning: 'I learned to align the calculation grain before using LAG and to exclude the incomplete August 2022 month from growth comparisons.',
      },
    ],
  },
];

export const learningSections = [
  {
    id: 'quality',
    label: 'A',
    title: 'Understanding Data Quality',
    body: 'I learned that an analysis is only as reliable as the structure beneath it. The original Orders worksheet contained the core identifiers, dates and quantities, while its customer and product attribute columns were blank. Comparing it with the prepared CSV made the enrichment step visible. I also checked missing contact values and exact duplicate rows instead of treating an exported file as automatically clean.',
  },
  {
    id: 'excel',
    label: 'B',
    title: 'Developing My Excel Skills',
    body: 'The raw workbook contains no formulas. In the project workbook, I used XLOOKUP to retrieve customer attributes, INDEX and MATCH to retrieve product attributes, IF to expand abbreviated category codes, and multiplication to calculate Sales. This taught me how lookup keys connect worksheets and why readable, structured fields make later analysis easier.',
  },
  {
    id: 'foundation',
    label: 'C',
    title: 'Building My SQL Foundation',
    body: 'The first queries taught me to retrieve only the fields I needed, define date boundaries, sort results explicitly and handle missing values. I learned that a query should begin with a clear question and that small validation queries are useful before attempting complex analysis.',
  },
  {
    id: 'metrics',
    label: 'D',
    title: 'Turning Data into Business Metrics',
    body: 'Aggregation helped me move from individual sales lines to measures such as revenue, units, distinct orders, purchasing customers and Average Order Value. The distinction between COUNT(*) and COUNT(DISTINCT orderid) was especially important because one order can contain several product lines.',
  },
  {
    id: 'relationships',
    label: 'E',
    title: 'Understanding Relational Data',
    body: 'Joining Orders, Customers and Products showed me how a database avoids repeating the same descriptive information in every table. I learned that INNER JOIN returns matches, whereas LEFT JOIN is required when I need to keep customers who have not ordered. I also learned to check the row grain after each join before aggregating.',
  },
  {
    id: 'complex',
    label: 'F',
    title: 'Solving Complex SQL Problems',
    body: 'CTEs gave me a practical way to break a large question into named intermediate results. Window functions then allowed me to rank products inside each country, calculate contribution percentages without losing product rows, and compare one month with another using LAG.',
  },
  {
    id: 'challenges',
    label: 'G',
    title: 'Challenges and Problem-Solving',
    body: 'The project files show several useful lessons: distinct orders must be separated from sales lines, unmatched customers require a LEFT JOIN, blank strings need consistent NULL handling, and a misspelled function prevents an otherwise valid query from running. I learned to validate each step rather than treating the first draft as final.',
  },
  {
    id: 'reflection',
    label: 'H',
    title: 'Overall Project Reflection',
    body: 'This project helped me connect preparation and analysis as one workflow. Excel made the raw relationships visible and produced structured exports; SQL let me test questions, calculate KPIs and analyse behaviour across tables. My next step is to strengthen automated data-quality checks, rewrite the remaining unfinished SQL queries, and develop more customer-retention analysis. These are the same habits I would apply in an entry-level analyst role: define the question, verify the data, choose the correct grain and explain the result clearly.',
  },
] as const;

export const workflow = [
  ['Raw Excel Data', 'Three source worksheets with orders, customers and products.'],
  ['Excel Preparation', 'Lookup formulas connect the tables and calculate readable sales fields.'],
  ['Cleaned CSV Datasets', 'Structured exports provide consistent inputs for the database.'],
  ['SQL Analysis', 'Four stages progress from filtering to window functions and retention questions.'],
  ['Power BI Dashboard', 'Two report pages turn the prepared measures into interactive performance views.'],
  ['Business Insights', 'KPIs and comparisons describe sales, products, markets and customers.'],
  ['Learning Outcomes', 'The project records the reasoning, limitations and technical lessons behind the queries.'],
] as const;
