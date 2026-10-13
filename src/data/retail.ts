import type { Project } from './projects';
export const retailRepo = "https://github.com/Adyan05/Online-Retail-E2E-Analysis";
export const retailFile = (name:string) => `${retailRepo}/blob/main/${name}`;
export const retailMedia: Record<string,{title:string;caption:string;image?:string;group:string}> = {
  "overview": {
    "title": "Online Retail Overview",
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
  "subtitle": "End-to-End Retail Analysis and Customer Segmentation",
  "category": "Data Analytics",
  "cardAction": "View Case Study",
  "accent": "coffee retail",
  "coverLabel": "Online Retail dashboard \u2014 screenshot pending",
  "description": "Transforming transaction data into business insights through Python preparation, SQL analysis, RFM customer segmentation and Power BI reporting. An analytics portfolio project exploring performance, customer value, product demand and geographical sales.",
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
    {
      "id": "dashboard",
      "kind": "overview",
      "title": "Retail performance, in perspective.",
      "body": "Understanding retail performance and customer behaviour through data. Explore the analysis, the original SQL and the supplied customer segmentation output.",
      "analytics": "retail:dashboard",
      "caption": "Original Power BI screenshots are pending. These placeholders do not simulate a dashboard; download the actual PBIX to explore its report."
    },
    {
      "id": "overview",
      "kind": "overview",
      "title": "From transactions to business understanding.",
      "body": "I prepared historical retail transactions, investigated performance with SQL, and organised customer RFM outputs and a Power BI overview report. The objective is to support informed sales planning, customer management and marketing decisions.",
      "analytics": "retail:kpis",
      "caption": "Independently calculated from the cleaned CSV. Currency is not identified in the repository documentation. Revenue covers positive sales for identified customers; it excludes returns and is not net revenue."
    },
    {
      "id": "challenge",
      "kind": "problem",
      "title": "Four questions behind the analysis.",
      "body": "Transactional records need context before they can guide decisions.",
      "cards": [
        {
          "title": "Sales visibility",
          "text": "Understand revenue, distinct orders, customer reach and monthly patterns."
        },
        {
          "title": "Customer value",
          "text": "Identify purchasing frequency and the concentration of revenue among customers."
        },
        {
          "title": "Product and market contribution",
          "text": "Compare product demand and country performance at a defined level of detail."
        },
        {
          "title": "Customer segmentation",
          "text": "Use recent activity, frequency and monetary value to explore differences in behaviour."
        }
      ]
    },
    {
      "id": "questions",
      "kind": "objectives",
      "title": "Business questions I investigated.",
      "body": "Explore 34 questions across six analytical themes. Source-backed calculations, interpretive questions and unverified classification rules are distinguished below.",
      "analytics": "retail:questions"
    },
    {
      "id": "dataset",
      "kind": "overview",
      "title": "Understand the analytical population.",
      "body": "805,549 sales rows \u00b7 36,969 distinct invoices \u00b7 5,878 customers \u00b7 4,631 stock codes \u00b7 41 countries. Reporting period: 1 December 2009 \u2013 9 December 2011.",
      "analytics": "retail:dataset",
      "caption": "December 2011 is incomplete. Invoice and CustomerID are identifiers, even when stored as numeric values. StockCode is text. Date/Time and Year/Month/Day are additional derived fields."
    },
    {
      "id": "excel",
      "kind": "screenshots",
      "title": "Explore the retail workbooks.",
      "body": "Excel provides inspectable transaction and segmentation exports. The documented cleaning operations are in Python; no Excel formula or PivotTable workflow is claimed.",
      "analytics": "retail:excel",
      "caption": "Actual screenshots have not been supplied. Preserve the original worksheet names and values when adding screenshots. The full raw CSV contains 1,067,371 rows; the raw workbook reaches Excel\u2019s row limit, so it is not a complete substitute."
    },
    {
      "id": "quality",
      "kind": "technologies",
      "title": "Preparing reliable data for analysis.",
      "body": "I checked missing values and nonpositive transactions before defining the positive-sales population.",
      "cards": [
        {
          "title": "Missing identifiers \u2192 remove",
          "text": "Raw CSV: 243,007 missing Customer ID values and 4,382 missing descriptions (overlap is possible). The notebook drops rows missing either field."
        },
        {
          "title": "Nonpositive values \u2192 exclude",
          "text": "Raw data: 22,950 nonpositive quantities and 6,207 nonpositive prices. The sales filter retains only Quantity > 0 and Price > 0; these counts are not additive."
        },
        {
          "title": "Documented transformations",
          "text": "Rename Customer ID to CustomerID, parse InvoiceDate, derive date/time parts and calculate Revenue = Quantity \u00d7 Price."
        },
        {
          "title": "Verified outcome",
          "text": "1,067,371 raw rows become 805,549 cleaned rows: 261,822 excluded overall. The cleaned CSV has no missing fields. No deduplication or transaction-value correction is documented."
        },
        {
          "title": "Retained population",
          "text": "Positive, priced sales with customer and description information remain. Returns and unidentified sales are outside this population."
        },
        {
          "title": "Reproducibility gap",
          "text": "The notebook groups by YearMonth but does not contain the cell creating it. RFM generation and export steps are also absent; the saved notebook is not a complete reproducible pipeline."
        }
      ]
    },
    {
      "id": "sql",
      "kind": "technologies",
      "title": "From business questions to SQL.",
      "body": "Inspect eight original T-SQL examples from the repository. Copy buttons preserve the original calculations, including documented limitations.",
      "analytics": "retail:sql",
      "caption": "SQL Server syntax (database..table). Queries were inspected, not executed against the original database. Independent CSV calculations validate the displayed findings; integer division and product granularity are called out explicitly."
    },
    {
      "id": "rfm",
      "kind": "architecture",
      "title": "Understand customers with RFM.",
      "body": "Recency describes how recently a customer purchased; Frequency describes how often; Monetary captures spend. Select a recorded segment to explore its observed behaviour and a proposed next step.",
      "analytics": "retail:rfm",
      "caption": "Exact segment names and values come from the supplied RFM output. Scoring cutoffs, the recency reference date and classification code are not documented in the saved notebook. Observed averages are not membership thresholds. Recommendations are proposed actions, not completed campaigns."
    },
    {
      "id": "report",
      "kind": "screenshots",
      "title": "One report, a focused overview.",
      "body": "The repository PBIX contains one page: Online Retail Overview. Five KPI cards show revenue, orders, customers, AOV and quantity. A time-series line chart and product/country revenue bars accompany Country and YearMonth slicers.",
      "links": [
        {
          "label": "Download Power BI report",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/raw/refs/heads/main/OverviewReport.pbix"
        }
      ],
      "analytics": "retail:dashboard",
      "caption": "The local PBIX has an extra Customer Segmentation page. This portfolio describes the current GitHub PBIX. Report measures are referenced in its layout, but their compressed model formulas have not been independently decoded."
    },
    {
      "id": "findings",
      "kind": "results",
      "title": "What the data revealed.",
      "body": "Verified observations from the cleaned CSV and RFM output, paired with interpretation and potential actions.",
      "analytics": "retail:findings"
    },
    {
      "id": "challenges",
      "kind": "objectives",
      "title": "Challenges and how I addressed them.",
      "body": "",
      "cards": [
        {
          "title": "Transactional quality",
          "text": "I used notebook filters and SQL checks to define which sales belong in the analysis."
        },
        {
          "title": "Reliable metrics",
          "text": "I counted distinct invoices rather than sales rows and used revenue per invoice for AOV."
        },
        {
          "title": "Customer concentration",
          "text": "I used NTILE(10) to compare revenue across approximately equal customer groups."
        },
        {
          "title": "Repeat behaviour",
          "text": "I counted distinct invoices per customer. Reviewing the SQL exposed an integer-division limitation in the percentage."
        },
        {
          "title": "Interpreting RFM",
          "text": "I compared the supplied segment outputs while keeping undocumented classification rules explicit."
        },
        {
          "title": "Product granularity",
          "text": "I distinguished stock-code/description totals from price-level groups and avoided treating revenue as profit."
        },
        {
          "title": "BI communication",
          "text": "I organised KPI cards, a trend chart, contribution bars and slicers around a focused overview."
        }
      ]
    },
    {
      "id": "learning",
      "kind": "objectives",
      "title": "What I learned.",
      "body": "",
      "cards": [
        {
          "title": "Data quality first",
          "text": "I learned that population filters change the meaning of every KPI."
        },
        {
          "title": "SQL with purpose",
          "text": "I connected CTEs, aggregates and window functions to business questions."
        },
        {
          "title": "Customer value",
          "text": "I learned to inspect concentration as well as overall revenue."
        },
        {
          "title": "RFM interpretation",
          "text": "I learned to distinguish segment outputs from reproducible scoring rules."
        },
        {
          "title": "Volume versus revenue",
          "text": "I compared units with sales value without assuming margin or profit."
        },
        {
          "title": "Visual communication",
          "text": "I used a concise dashboard structure to make comparisons easier."
        },
        {
          "title": "Consistency",
          "text": "I learned to reconcile rows, invoices, workbooks and report versions before presenting a result."
        },
        {
          "title": "Evidence and outcomes",
          "text": "I separated observations and proposed actions from measured business improvements."
        }
      ]
    },
    {
      "id": "workflow",
      "kind": "architecture",
      "title": "An end-to-end analytical workflow.",
      "body": "The available artifacts connect preparation, analysis, segmentation and reporting. The notebook documents only part of this chain.",
      "workflow": [
        "Raw retail CSV",
        "Python preparation and positive-sales filtering",
        "Cleaned transaction exports",
        "SQL validation and business analysis",
        "Provided RFM output and SQL comparison",
        "Power BI overview",
        "Findings and proposed recommendations"
      ],
      "caption": "This is an artifact-level workflow, not a claim that the saved notebook generates every output. YearMonth creation, RFM scoring and export steps require additional source code."
    },
    {
      "id": "gallery",
      "kind": "screenshots",
      "title": "Behind the analysis.",
      "body": "Browse screenshot slots by tool. Add real captures independently; each configured image supports enlargement.",
      "analytics": "retail:gallery"
    },
    {
      "id": "resources",
      "kind": "repository",
      "title": "Explore the source materials.",
      "body": "Inspect the source code, workbooks and report. These are analysis artifacts, not a live retail application.",
      "links": [
        {
          "label": "Download Power BI report",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/raw/refs/heads/main/OverviewReport.pbix"
        },
        {
          "label": "cleaned_online_retail_sales.xlsx",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/cleaned_online_retail_sales.xlsx"
        },
        {
          "label": "customer_rfm_segments.xlsx",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/customer_rfm_segments.xlsx"
        },
        {
          "label": "OnlineRetail.ipynb",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/OnlineRetail.ipynb"
        },
        {
          "label": "RevenueAnalysis.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/RevenueAnalysis.sql"
        },
        {
          "label": "CustomerAnalysis.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/CustomerAnalysis.sql"
        },
        {
          "label": "ProductAnalysis.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/ProductAnalysis.sql"
        },
        {
          "label": "Country_Analysis.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/Country_Analysis.sql"
        },
        {
          "label": "RFMSegment.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/RFMSegment.sql"
        },
        {
          "label": "DataQuality.sql",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/DataQuality.sql"
        },
        {
          "label": "README.md",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/README.md"
        },
        {
          "label": "csv",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/csv"
        },
        {
          "label": "supporting_files",
          "url": "https://github.com/Adyan05/Online-Retail-E2E-Analysis/blob/main/supporting_files"
        }
      ]
    }
  ]
};
