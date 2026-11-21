import type { Project, Slide, SlideKind } from './projects';

const sections: [string, SlideKind][] = [
  ['Project Overview', 'overview'], ['Business Problem', 'problem'],
  ['Project Objectives', 'objectives'], ['Data Preparation and Methodology', 'architecture'],
  ['Dashboard and Data Visualisations', 'screenshots'], ['Key Findings and Insights', 'results'],
  ['Decisions & Analytical Reasoning', 'architecture'], ['Business Recommendations', 'features'],
  ['Tools and Technologies', 'technologies'], ['What I Learned', 'objectives'],
];

type Brief = {
  problem: string; focus: string; application: string; dataset: string; techniques: string;
  deliverables: string; objectives: string[]; method: string; decisions: string;
  findings: [string, string, string][]; recommendations: [string, string, string, string][];
  tools: [string, string][]; learning: [string, string, string, string];
};

const briefs: Record<string, Brief> = {
  'coffee-sales': {
    problem: 'Sales teams need to see which markets and products drive revenue and how often customers return.', focus: 'Sales KPIs · Product mix · Repeat purchasing', application: 'Sales and inventory planning',
    dataset: '1,000 coffee sales lines, 957 orders, 2019–2022', techniques: 'Excel lookups, SQL joins and window functions, DAX', deliverables: 'SQL analysis, prepared CSVs and two Power BI pages',
    objectives: ['Measure revenue, distinct orders and average order value.', 'Compare sales across markets, products and months.', 'Measure repeat purchasing.'],
    method: 'I joined Orders, Customers and Products, checked keys and missing values, and loaded prepared CSVs into PostgreSQL. I used a Calendar table to support time comparisons in Power BI.',
    findings: [['Market concentration', 'The United States contributed 35,639.73, about 79% of revenue.', 'Sales performance depends heavily on one market.'], ['Repeat purchasing', '25 of 913 purchasing customers placed more than one order.', 'A cohort review could show whether low repeat purchasing persists over comparable periods.']],
    decisions: 'I counted distinct invoices because orders can contain multiple sales lines. The overview uses KPI cards and a revenue trend, while the monthly table shows period comparisons. August 2022 is incomplete and the source currency is unspecified.',
    recommendations: [['Review repeat purchasing by acquisition cohort.', '25 of 913 customers placed multiple orders.', 'Identify cohorts that may benefit from follow-up.', '90-day repeat purchase rate']],
    tools: [['Excel', 'Prepared structured tables with lookups and calculated sales fields.'], ['PostgreSQL / SQL', 'Joined source tables and compared sales and customer metrics.'], ['Power BI / Power Query / DAX', 'Built the relational model, KPI measures and report pages.']],
    learning: ['I used joins, CTEs and window functions to answer sales questions.', 'I distinguished sales rows from orders when defining KPIs.', 'I assessed how market concentration affects sales planning.', 'I would test the remaining draft queries and compare retention across equal periods.'],
  },
  'online-retail': {
    problem: 'Retail teams need to identify sales concentration, leading products and customer segments for planning.', focus: 'Revenue · Product rankings · RFM', application: 'Sales planning and customer segmentation',
    dataset: '805,549 retained Online Retail sales lines, Dec 2009–Dec 2011', techniques: 'T-SQL aggregates and deciles, RFM summaries, DAX', deliverables: 'Six SQL scripts and three Power BI report pages',
    objectives: ['Check retained sales records for quality issues.', 'Compare revenue, order value and product demand across markets.', 'Summarise purchasing behaviour and RFM groups.'],
    method: 'I used the cleaned positive-sales dataset and an existing RFM snapshot. The SQL examples cover data quality, revenue, product, customer, country and segment analysis.',
    findings: [['Market concentration', 'The UK generated 82.98% of retained sales revenue.', 'Sales planning should account for dependence on the UK.'], ['Customer value', 'Champions contributed 69.26% of historical revenue across 1,182 customers.', 'Customer value is concentrated in one historical segment.']],
    decisions: 'I used distinct invoices for order counts, a line chart for monthly trends and horizontal bars for rankings. Revenue excludes returns. The SQL repeat-rate example truncates its percentage, and the source does not document RFM scoring thresholds.',
    recommendations: [['Test a retention offer for a defined customer cohort.', 'The RFM snapshot shows concentrated historical value.', 'Measure the incremental effect of outreach.', 'Repeat purchase rate versus a comparison group']],
    tools: [['Python / Excel', 'Prepared and reviewed transaction and segmentation files.'], ['T-SQL', 'Checked data quality and calculated commercial metrics.'], ['Power BI / DAX', 'Reported sales, product rankings and historical segment performance.']],
    learning: ['I used conditional aggregates, CTEs and NTILE to answer distinct retail questions.', 'I checked metric granularity and recognised integer division in the repeat-rate query.', 'I interpreted sales concentration and segment value as inputs to planning.', 'I would document RFM thresholds and validate DAX under more filter contexts.'],
  },
  'hr-analytics': {
    problem: 'Employee turnover creates hiring and staffing costs. HR teams need to know where to investigate retention.', focus: 'Attrition KPIs · Risk factors · Employee segments', application: 'Evidence-based retention planning',
    dataset: 'Fictional IBM HR dataset, 1,470 employee records and 35 columns', techniques: 'PostgreSQL grouping and CASE, Python comparisons, DAX measures', deliverables: 'SQL analysis, Python charts and three Power BI report pages',
    objectives: ['Measure overall attrition and retention.', 'Compare attrition across departments and job roles.', 'Assess differences by overtime, income and employee experience.', 'Identify groups for further investigation using minimum group sizes.'],
    method: 'I checked missing values and duplicate employee IDs, created an attrition flag and grouped employee attributes. I compared rates with group counts and used Power BI to organise the overview, factors and segment results.',
    findings: [['Overall attrition', '237 of 1,470 employees left (16.12%).', 'This provides a baseline for comparing groups in the dataset.'], ['Overtime', 'Observed attrition was 30.53% with overtime and 10.44% without.', 'Workload is a useful topic for investigation. The comparison is observational.'], ['Highest qualifying segment', '14 of 20 employees left (70%).', 'Small groups need review before broad conclusions.']],
    decisions: 'I compared rates with group counts and used a 10-employee minimum for report rankings. SQL segment definitions differ from the report, and the original SQL rate expressions use integer division. The displayed decimal results come from the source-data checks.',
    recommendations: [['Review overtime allocation with HR and line managers.', 'Employees working overtime had higher observed attrition.', 'Identify workload pressures worth addressing.', 'Overtime hours and department attrition rate']],
    tools: [['PostgreSQL / SQL', 'Checked employee records and compared group-level attrition.'], ['Python / pandas / Matplotlib', 'Checked rates and produced factor charts.'], ['Power BI / DAX', 'Built three report pages with KPI cards, comparisons and slicers.']],
    learning: ['I used conditional counts and grouping to measure attrition.', 'I checked denominators and group sizes before comparing rates.', 'I linked workforce metrics to retention questions HR teams can investigate.', 'I would reconcile segment rules and test filter and reset behaviour in Power BI Desktop.'],
  },
  'census-demographic': {
    problem: 'Inconsistent census records make it difficult to compare age, employment and household patterns for planning.', focus: 'Data quality · Household features · Demographics', application: 'Demographic reporting and planning',
    dataset: 'University census dataset, 10,601 records and 12 original columns', techniques: 'Missing-value checks, group transforms, feature engineering and age bands', deliverables: 'Analysis notebook, demographic summaries and charts',
    objectives: ['Audit missing and inconsistent fields.', 'Create features for age, employment and household occupancy.', 'Visualise population and employment distributions.'],
    method: 'I audited types and missing values, standardised categories, converted numeric strings, and used street and house number to group households.',
    findings: [['Missing religion', 'The notebook reduced 6,162 missing values to zero through rule-based fills.', 'Reported completeness depends on assumptions about families and missing responses.'], ['Employment classification', '5,688 records were classified as employed (53.66% of all records).', 'Labour planning needs a separate labour-force denominator.']],
    decisions: 'I used a boxplot to inspect extreme ages and horizontal bars to compare age bands in a population pyramid. The age cap and household-based fills affect the distributions.',
    recommendations: [['Compare demographic summaries with and without imputation.', 'Some fields have substantial missingness and rule-based fills.', 'Show which planning figures are sensitive to assumptions.', 'Change in category share under each treatment']],
    tools: [['Python / pandas / NumPy', 'Audited, cleaned and grouped census records.'], ['Matplotlib / Seaborn', 'Visualised demographic distributions and outliers.']],
    learning: ['I used group transforms and created household features.', 'I considered how imputation changes the population summaries.', 'I distinguished a share of all records from a labour-force rate.', 'I would keep imputation flags and fix the final age-band boundary.'],
  },
  dwill: {
    problem: 'Digital asset owners need a way to arrange conditional access for beneficiaries without sharing account credentials.', focus: 'Conditional access · Encrypted storage · System testing', application: 'Digital inheritance workflow design',
    dataset: 'Prototype evidence from the group report and implementation', techniques: 'Contract state transitions, encrypted file storage and system testing', deliverables: 'Academic prototype, poster and project report',
    objectives: ['Assign beneficiaries to digital assets.', 'Encrypt and store files separately from contract state.', 'Test the activation, response and retrieval workflow.'],
    method: 'I contributed technical research, IPFS retrieval and system testing as part of the four-member team.',
    findings: [['Best Industry Project', 'Group O received first place in 2024.', 'The award recognises the academic prototype and its documented workflow.']],
    decisions: 'The design places encrypted files on IPFS and uses Solidity for subscription and switch state. A seven-day response window allows the benefactor to cancel activation.',
    recommendations: [['Review encryption and access controls before considering production use.', 'The report and source document prototype cryptography limitations.', 'Identify risks to file confidentiality and retrieval.', 'Security findings resolved and retrieval tests passed']],
    tools: [['React / TypeScript / Vite', 'Built the prototype interface.'], ['Solidity / thirdweb / Web3', 'Managed contract state and wallet interactions.'], ['IPFS / Pinata', 'Uploaded and retrieved encrypted files.']],
    learning: ['I worked with IPFS retrieval and contract interactions.', 'I tested the workflow across components.', 'I learned how a response window supports conditional access.', 'I would review key handling and have the design assessed before deployment.'],
  },
};

export function getBrief(project: Project) { return briefs[project.id]; }

export function standardiseProject(project: Project): Project {
  const brief = getBrief(project);
  const slides = sections.map(([title, kind], index): Slide => ({ id: `section-${index + 1}`, kind, title }));
  if (!brief) {
    slides[0].body = 'Project materials are pending.';
    slides[9].evidence = project.slides;
    return { ...project, slides };
  }

  slides[0].cards = [
    { title: 'Business Problem', text: brief.problem },
    { title: 'Analytical Focus', text: brief.focus },
    { title: 'Business Application', text: brief.application },
  ];
  if (project.id === 'hr-analytics') {
    slides[3].links = [{ label: 'Full HR SQL analysis', url: '#project/hr-analytics/sql' }];
    slides[4].links = [{ label: 'Report details and DAX', url: '#project/hr-analytics/dashboards' }];
    slides[9].links = [{ label: 'Full HR learning page', url: '#project/hr-analytics/learning' }];
    slides[4].body = 'Three Power BI pages cover workforce turnover, attrition factors and employee segments. The project files are available in What I Learned.';
  }
  if (project.id === 'dwill') slides[0].image = project.cover;
  const visual = (title: string, image: string, caption: string) => ({ title, image, caption });
  const gallery = project.id === 'coffee-sales' ? [
    visual('Sales Overview', 'images/coffee/dashboard-1.png', 'Sales were 45,135.35 across 957 orders. The US contributed about 79%, giving sales teams a market concentration measure.'),
    visual('Monthly Performance', 'images/coffee/dashboard-2.png', 'February 2020 had the highest monthly revenue at 1,798.40. August 2022 is partial and is excluded from report growth comparisons.'),
  ] : project.id === 'online-retail' ? [
    visual('Online Retail Overview', 'images/retail/sales_overview.png', 'The UK generated 82.98% of retained revenue. November 2010 led monthly sales at 1,172,336.04. Compare full months when planning for seasonal demand.'),
    visual('Customer Segmentation', 'images/retail/customer_segmentation.png', 'Champions generated 69.26% of historical revenue. Needs Attention was the largest segment with 2,045 customers. Compare group size and value before planning outreach.'),
    visual('Product Performance', 'images/retail/product_performance.png', 'Stock code 22423 led revenue and 84077 led units. Compare both rankings when reviewing assortment, and interpret nonmerchandise codes separately.'),
  ] : undefined;
  if (gallery) slides[4].gallery = gallery;
  if (project.id === 'coffee-sales') {
    slides[3].links = [
      { label: 'Excel preparation', url: '#project/coffee-sales/cleaning' },
      { label: 'Detailed SQL analysis', url: '#project/coffee-sales/sql' },
    ];
    slides[4].links = [{ label: 'Dashboard and model', url: '#project/coffee-sales/dashboard' }];
    slides[9].links = [{ label: 'Full learning page', url: '#project/coffee-sales/learning' }];
  }
  slides[1].body = `${brief.problem} This work supports ${brief.application.toLowerCase()}.`;
  slides[2].bullets = brief.objectives;
  slides[3].body = brief.method;
  slides[5].cards = brief.findings.map(([title, evidence, implication]) => ({ title, text: `${evidence} ${implication}` }));
  slides[6].body = brief.decisions;
  slides[7].recommendations = brief.recommendations;
  slides[8].cards = brief.tools.map(([title, text]) => ({ title, text }));
  slides[9].cards = ['Technical Skills', 'Analytical Skills', 'Business Understanding', 'Challenges and Improvements'].map((title, index) => ({ title, text: brief.learning[index] }));

  for (const item of project.slides) {
    const target = item.analytics === 'kpis' || item.analytics === 'retail:kpis' ? 0
      : item.analytics?.endsWith(':learning') || item.id === 'learning' || item.id === 'learnings' ? 9
      : item.kind === 'screenshots' || item.analytics === 'dashboard' ? 4
      : item.kind === 'results' ? 5 : item.kind === 'repository' ? 9 : 3;
    (slides[target].evidence ??= []).push(item);
  }
  return { ...project, cardAction: 'View Case Study', metadata: [
    { label: 'Project Type', value: project.category }, { label: 'Tools Used', value: project.technologies.join(' · ') }, { label: 'Dataset', value: brief.dataset },
    { label: 'Analytical Techniques', value: brief.techniques }, { label: 'Deliverables', value: brief.deliverables },
    ...project.metadata?.filter(item => item.label !== 'Dataset') ?? [],
  ], slides };
}
