import type { Project } from './projects';
export const retailRepo = "https://github.com/Adyan05/Online-Retail-E2E-Analysis";
export const retailFile = (name:string) => `${retailRepo}/blob/main/${name}`;
export const retailMedia: Record<string,{title:string;caption:string;image?:string;group:string}> = {
  "overview": {
    "title": "Online Retail Overview",
    "image": "images/retail/sales_overview.png",
    "group": "Power BI",
    "caption": "One verified repository report page: five KPI cards, revenue trend, product and country revenue, Country and YearMonth slicers."
  },
  "kpis": {
    "title": "Retail KPI cards",
    "group": "Power BI",
    "caption": "Revenue, orders, customers, Average Order Value and quantity sold."
  },
  "productChart": {
    "title": "Product contribution",
    "group": "Power BI",
    "caption": "Revenue by Description in the original report; different from SQL StockCode / Description grouping."
  },
  "countryChart": {
    "title": "Country revenue",
    "group": "Power BI",
    "caption": "Revenue by country with slicer-based exploration."
  },
  "raw": {
    "title": "Original retail workbook",
    "group": "Excel",
    "caption": "supporting_files/online_retail.xlsx; raw CSV is the full population used for validation."
  },
  "cleaned": {
    "title": "Cleaned retail workbook",
    "group": "Excel",
    "caption": "cleaned_online_retail_sales.xlsx; verify populated rows separately from worksheet dimensions."
  },
  "revenue": {
    "title": "Transaction and revenue fields",
    "group": "Excel",
    "caption": "Invoice, Quantity, Price and derived Revenue."
  },
  "customers": {
    "title": "Customer information",
    "group": "Excel",
    "caption": "CustomerID and Country identify customer and market context."
  },
  "products": {
    "title": "Product information",
    "group": "Excel",
    "caption": "StockCode and Description identify the product at sales-line level."
  },
  "rfm": {
    "title": "RFM segmentation workbook",
    "group": "Excel",
    "caption": "customer_rfm_segments.xlsx / Worksheet: 5,878 customer rows with R/F/M scores and Segment."
  },
  "revenueSql": {
    "title": "Revenue SQL",
    "group": "SQL",
    "caption": "RevenueAnalysis.sql \u2014 overall and monthly KPIs."
  },
  "customerSql": {
    "title": "Customer SQL",
    "group": "SQL",
    "caption": "CustomerAnalysis.sql \u2014 customer value, deciles and repeat rate."
  },
  "productSql": {
    "title": "Product SQL",
    "group": "SQL",
    "caption": "ProductAnalysis.sql \u2014 revenue and quantity comparisons."
  },
  "rfmSql": {
    "title": "RFM SQL",
    "group": "SQL",
    "caption": "RFMSegment.sql \u2014 segment aggregation."
  },
  "qualitySql": {
    "title": "Validation SQL",
    "group": "SQL",
    "caption": "DataQuality.sql \u2014 missing fields and nonpositive values."
  },
  "preparation": {
    "title": "Notebook preparation",
    "group": "Notebook",
    "caption": "OnlineRetail.ipynb \u2014 rename Customer ID and parse InvoiceDate."
  },
  "cleaning": {
    "title": "Notebook cleaning",
    "group": "Notebook",
    "caption": "Drop missing customer/description rows; retain Quantity > 0 and Price > 0."
  },
  "transformations": {
    "title": "Notebook transformations",
    "group": "Notebook",
    "caption": "Date parts and Revenue = Quantity \u00d7 Price. YearMonth creation is missing from the saved cells."
  }
};
export const retailQuestions = [
  {
    "title": "Revenue performance",
    "objective": "Establish performance and seasonality.",
    "techniques": "SUM, COUNT DISTINCT, GROUP BY YearMonth",
    "findings": "17,743,429.18 revenue; November 2010 is the peak month.",
    "relevance": "Use complete periods for planning.",
    "items": [
      "What is the total revenue?",
      "How many distinct orders were recorded?",
      "How many unique customers purchased?",
      "What is Average Order Value?",
      "How did monthly revenue change?",
      "Which months recorded the highest revenue?",
      "What patterns occur in order volume and revenue?"
    ]
  },
  {
    "title": "Customer analysis",
    "objective": "Understand value concentration and repeat purchasing.",
    "techniques": "CTEs, NTILE(10), CASE, distinct invoice counts",
    "findings": "The leading 588 customers contribute 63.93% of revenue; 4,255 customers repeat.",
    "relevance": "Investigate concentration and retention opportunities.",
    "items": [
      "Which customers generated the highest revenue?",
      "What revenue comes from the highest-value groups?",
      "How concentrated is customer revenue?",
      "What percentage placed more than one order?",
      "How does purchasing frequency vary?",
      "Which customers may need retention attention?"
    ]
  },
  {
    "title": "Product performance",
    "objective": "Compare demand and sales contribution.",
    "techniques": "GROUP BY StockCode / Description, SUM, ORDER BY",
    "findings": "REGENCY CAKESTAND 3 TIER leads revenue; WORLD WAR 2 GLIDERS ASSTD DESIGNS leads units.",
    "relevance": "Assess margin and stock before changing inventory.",
    "items": [
      "Which products lead revenue?",
      "Which products lead quantity?",
      "Are high-volume products always high-revenue products?",
      "Which products have high units but low revenue?",
      "How can this support inventory and merchandising?"
    ]
  },
  {
    "title": "Geographical analysis",
    "objective": "Assess market concentration and basket values.",
    "techniques": "Country aggregation, distinct counts, AOV",
    "findings": "United Kingdom is the largest revenue market.",
    "relevance": "Consider market dependence and country context.",
    "items": [
      "Which countries lead revenue?",
      "Which countries lead order count?",
      "Which markets have the largest customer bases?",
      "How does AOV differ between countries?",
      "Is revenue concentrated in few countries?"
    ]
  },
  {
    "title": "RFM segmentation",
    "objective": "Understand purchasing behaviour and customer value.",
    "techniques": "Provided RFM output; SQL COUNT / SUM / AVG by Segment",
    "findings": "Five recorded segments; Champions contribute 69.26% of revenue.",
    "relevance": "Propose targeted follow-up; no campaigns were executed.",
    "items": [
      "Who purchased most recently?",
      "Who purchases most frequently?",
      "Who has the highest monetary value?",
      "How are customers classified into behavioural segments?",
      "Which segments contribute most revenue?",
      "What are average value, frequency and recency by segment?",
      "Which segments could be prioritized for campaigns?"
    ]
  },
  {
    "title": "Data quality",
    "objective": "Define a reliable analytical population.",
    "techniques": "Pandas dropna and positive-value filters; SQL CASE checks",
    "findings": "805,549 rows remain after documented filtering.",
    "relevance": "Distinguish positive identified sales from net retail revenue.",
    "items": [
      "Are customer identifiers missing?",
      "Are quantities or prices nonpositive?",
      "How should missing or invalid transactions be handled?",
      "Which checks make KPIs trustworthy?"
    ]
  }
];
export const retail:Project = {
  "id": "online-retail",
  "title": "Online Retail Analytics",
  "fullTitle": "Online Retail \u2014 End-to-End Data Analysis",
  "subtitle": "Sales Analysis & Customer Segmentation",
  "category": "Data Analytics",
  "cardAction": "View Project",
  "accent": "coffee retail",
  "cover": "images/retail/sales_overview.png",
  "coverLabel": "Online Retail Overview",
  "description": "I used Python to prepare retail transactions, SQL to analyse sales and customer segments, and Power BI to report the findings.",
  "technologies": [
    "Python",
    "Excel",
    "SQL",
    "Power BI",
    "RFM Analysis"
  ],
  "repository": "https://github.com/Adyan05/Online-Retail-E2E-Analysis",
  "documentation": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/README.md",
  "metadata": [
    {
      "label": "Project type",
      "value": "Data Analytics / Business Intelligence"
    },
    {
      "label": "Focus",
      "value": "Customer behaviour and retail performance"
    },
    {
      "label": "Specialisation",
      "value": "RFM Customer Segmentation"
    }
  ],
  "slides": [
 {id:'overview',kind:'overview',title:'Project Overview',body:'I prepared retail transactions, analysed sales with SQL and compared revenue, products, countries and customer segments in Power BI.',analytics:'retail:kpis'},
 {id:'dataset',kind:'overview',title:'Dataset & Data Quality',body:'805,549 retained sales lines from 1 December 2009 to 9 December 2011. Revenue is Quantity × Price for positive sales with known customers; it excludes returns and is not net revenue. I checked missing identifiers, descriptions and nonpositive quantities and prices.',analytics:'retail:dataset',caption:'Source currency is unspecified. December 2011 is a partial month.'},
 {id:'sql',kind:'technologies',title:'SQL Analysis',body:'Six stages use the original T-SQL. Expand an example to view the code and explanation.',analytics:'retail:sql'},
 {id:'dashboards',kind:'screenshots',title:'Power BI Dashboards',body:'Three existing Power BI pages. Select an image to enlarge it.',analytics:'retail:dashboard'},
 {id:'findings',kind:'results',title:'Key Findings',analytics:'retail:findings'},
 {id:'learning',kind:'objectives',title:'What I Learned',body:'Technical lessons from the six SQL scripts and three report pages.',analytics:'retail:learning',links:[{label:'What I Learned',url:'#project/online-retail-learning'}]}
 ]
};
