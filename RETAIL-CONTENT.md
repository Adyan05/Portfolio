# Online Retail case study — content and evidence

Route: `#project/online-retail`. The project has 16 independent slides in `src/data/retail.ts`. Reorder, add or remove objects in its `slides` array. Preserve other project data files.

## Files
- `src/data/retail.ts`: project metadata, slides, 34 questions, media configuration.
- `src/data/retailExamples.ts`: eight original repository SQL excerpts.
- `src/data/retailMetrics.ts`: verified RFM aggregates.
- `src/components/RetailContent.tsx`: RFM explorer, field descriptions, findings, galleries.
- `src/retail.css`: retail-specific presentation styling.
- `src/components/CoffeeContent.tsx`: shared accessible tabs, code viewer, image lightbox and counters.
- `src/components/SlideDetails.tsx`, `src/data/projects.ts`, `src/main.tsx`: integration.

## Adding screenshots
Upload to `public/images/retail/`. Follow `public/images/retail/README.md` for the exact media keys and suggested filenames. Set each `retailMedia` entry's optional `image` property to `images/retail/filename.png`. Set the project's `cover` separately when its actual dashboard capture is ready. No dashboard, notebook or Excel screenshots have been fabricated.

## Evidence inspected
GitHub repository: https://github.com/Adyan05/Online-Retail-E2E-Analysis
Inspected on 13 October 2026: README, current PBIX, all six SQL scripts, notebook, both analysis workbooks, raw workbook, CSV directory and supporting_files directory.

Local cleaned CSV SHA-256 matches the repository LFS pointer: `90c36fa00aaa56a92efecbcca4dafca0ca482762413ab5aa6c5ba0c92c8e6e09`.
Notebook and three workbook Git blob hashes match the remote tree. Current SQL and PBIX were fetched from GitHub because local copies differed. The raw CSV was filtered using the exact documented notebook conditions; its resulting row count matches the cleaned CSV. The complete cleaned workbook was streamed: 805,549 populated records despite a larger worksheet dimension. Revenue agrees with the CSV. RFM workbook values match the CSV; customer frequency and monetary totals match cleaned transactions.

## Verified findings
- 805,549 cleaned sales lines; 36,969 invoices; 5,878 customers; 4,631 stock codes; 41 countries.
- 1 December 2009–9 December 2011. Final month is incomplete.
- Revenue 17,743,429.18; AOV 479.95, source monetary unit (currency undocumented).
- November 2010 peak: 1,172,336.04.
- Leading 588-customer decile: 11,342,602.48 / 63.93% of revenue.
- 4,255 repeat purchasers / 72.39%; customer 18102 leads revenue at 608,821.65.
- Product grouping StockCode + Description: REGENCY CAKESTAND 3 TIER leads revenue at 286,486.30; WORLD WAR 2 GLIDERS ASSTD DESIGNS leads quantity at 109,169 units (revenue 24,905.87).
- United Kingdom: 14,723,147.52 / 82.98%; 33,541 orders, 5,350 customers, AOV 438.96.
- Recorded segments: Champions 1,182; At Risk 880; Loyal Customers 877; Needs Attention 2,045; New or Promising 894. Champions contribute 69.26% of revenue. All segment revenue and averages are available in retailMetrics.ts.

## Limits preserved in the website
- Raw CSV contains 1,067,371 rows; raw XLSX is truncated at 1,048,575 data rows (Excel's sheet limit).
- Cleaned population excludes missing customer/description and nonpositive quantity/price rows. It describes identified positive sales, not net revenue after returns. Exclusion counts overlap; do not add them.
- Notebook documents renaming, datetime parsing, date parts, filtering and Revenue multiplication. YearMonth generation, RFM scoring and export cells are missing. No undocumented correction, deduplication or Excel formulas are claimed.
- RFM names and values are exact outputs; membership thresholds/reference date are unverified. Recommendations are proposals, not interventions.
- Current GitHub PBIX has one page, Online Retail Overview. Local copy has an additional Customer Segmentation page, deliberately not attributed to the remote version. Report layout and measure references were inspected; compressed model measure formulas were not decoded.
- SQL is T-SQL. Repeat-rate integer division yields 72; portfolio independently computes 72.39%. Original excerpt remains unchanged. NULL customers are not filtered in the decile/repeat queries but cleaned data has none. Only monthly AOV explicitly guards zero denominators.
- Product SQL includes price-level and StockCode/Description grouping; the report groups by Description. No profitability claims.
- No actual application screenshots were supplied. Placeholders are replaceable; derived RFM visualization is labeled as a portfolio chart.

## Validation
TypeScript and production Vite build; browser checks for seven project cards, all 16 retail slides on mobile, 34 questions, SQL copy/tabs/keyboard, five RFM groups, galleries, links, focus restoration, swipe and runtime errors. Coffee Sales and dWill regression checks retained. Repository resource paths matched against GitHub's tree; PBIX download retrieved successfully.
