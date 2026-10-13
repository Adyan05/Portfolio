# Online Retail screenshots

Upload original screenshots here. No screenshot is currently supplied.
Configure each image in `src/data/retail.ts`, inside `retailMedia`:

```ts
overview: {
  title: 'Online Retail Overview',
  caption: 'Your accurate caption',
  group: 'Power BI',
  image: 'images/retail/power-bi-overview.png',
},
```

Use project-relative image paths without a leading slash. Do not use a Windows path.

Suggested filenames (match media keys in retail.ts):
- overview: power-bi-overview.png
- kpis: power-bi-kpis.png
- productChart: power-bi-products.png
- countryChart: power-bi-countries.png
- raw: excel-raw.png
- cleaned: excel-cleaned.png
- revenue: excel-revenue.png
- customers: excel-customers.png
- products: excel-products.png
- rfm: excel-rfm.png
- revenueSql: sql-revenue.png
- customerSql: sql-customers.png
- productSql: sql-products.png
- rfmSql: sql-rfm.png
- qualitySql: sql-quality.png
- preparation: notebook-preparation.png
- cleaning: notebook-cleaning.png
- transformations: notebook-transformations.png

To use the dashboard as the card cover too, set `cover: 'images/retail/power-bi-overview.png'` on the retail project. Images open in a zoom dialog and retain their aspect ratio. Missing images remain explicitly labeled placeholders. Remove/reorder entries or slides independently.
