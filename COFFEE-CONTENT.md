# Coffee Sales case study

Live route: `#project/coffee-sales`. One new project, sixteen configurable presentation slides. Existing projects and their data are retained.

## Edit content and upload screenshots

- `src/data/coffee.ts`: project copy, slide order, metadata, 24 questions and media slots.
- `src/data/coffeeExamples.ts`: five verbatim SQL excerpts and seven DAX definitions.
- `src/components/CoffeeContent.tsx`: report tabs, questions, animated KPIs, code/copy panels, model diagram, gallery and image enlargement.
- `src/coffee.css`: scoped layout and styling.
- Shared integration changes: project registration/types in `src/data/projects.ts`, optional cover/action rendering in `src/App.tsx`, metadata in `Presentation.tsx`, optional analytical content in `SlideDetails.tsx`, and the stylesheet import in `main.tsx`.

Upload screenshots into **`public/images/coffee/`**, using the filenames listed in that directory's README. For example:

```ts
overview: {
  title: 'Power BI — Sales Overview',
  image: 'images/coffee/sales-overview.png',
  caption: 'Original Power BI Sales Overview page.',
  group: 'Power BI'
}
```

Set `cover: 'images/coffee/sales-overview.png'` on the coffee project to replace the project-card placeholder. Report tabs and the gallery share the media entries. Images retain their original aspect ratio and enlarge in an accessible dialog. Supply genuine captures; no dashboards or worksheet images were fabricated.

## Evidence and verification

The local CoffeeData.xlsx, Coffee Sales.pbix, CSVs and the basic SQL files match their GitHub blob hashes. The local README and AdvancedAnalysis.sql differed, so the current GitHub versions were retrieved and reviewed instead.

CSV recomputation confirmed 1,000 rows, 957 distinct orders, 3,551 units, 913 purchasing customers, 1,000 registered customers, 48 products and total revenue 45,135.35. Dates, peak month, leading products/categories/customer/country, 25 repeat buyers and loyalty/non-loyalty AOV were independently recomputed. Monetary values use source currency. August 2022 is partial.

Workbook inspection confirmed the Orders table, XLOOKUP, INDEX/MATCH, IF, sales multiplication and TotalSales PivotTable. No workbook was edited. PBIX report definitions confirmed Sales Overview and Monthly Detail pages, charts, KPI bindings and slicer interactions. The accompanying local model export confirmed DAX definitions, PostgreSQL import queries and relationships; the relationship diagram is a documented model summary, not a screenshot. Core DAX formulas also agree with the current README.

## Evidence still needed / limitations

- Original Power BI, Excel, SQL-editor and model screenshots are not available. All media slots clearly say placeholder. Power BI Desktop rendering was not available in this environment.
- Model relationships and complete MoM/YoY expressions were read from the supplied model export and corroborated by report metadata/README. The compressed PBIX semantic model was not independently decoded or refreshed. Re-export the current model if it changes.
- Some SQL exercises are unfinished or incorrect: MultitableAnalysis Q18 uses an inner join for a non-purchaser question, Q19 misspells COALESCE, and AdvancedAnalysis Q29/Q30/Q36 contain incomplete or invalid syntax. The case study uses intact excerpts (Q9, Q12, Q25, Q31, Q32) and does not claim the entire script collection ran successfully. The source repository was not modified.
- Running-total work is incomplete; it is not advertised as a finished feature. Profit-field semantics and causal effects of loyalty/retention remain unverified.
- Source findings are observations, not implemented business decisions or measured improvements. No live dashboard URL or embed is invented.

Validation covers TypeScript/production build, desktop/mobile layouts, report and code tabs, 24 questions, SQL clipboard behavior, KPIs, resource paths, history/focus navigation and dWill preservation.
