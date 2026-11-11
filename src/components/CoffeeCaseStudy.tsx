import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Database,
  FileSpreadsheet,
  GraduationCap,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { coffeeDatasets } from '../data/coffeeDatasets';
import {
  cleaningChecks,
  formulaEvidence,
  learningSections,
  sqlStages,
  workflow,
  type CoffeePage,
  type SqlExample,
} from '../data/coffeeCaseStudy';
import { coffeeFile, coffeeRepo } from '../data/coffee';

const pages: { id: CoffeePage; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'cleaning', label: 'Data Cleaning' },
  { id: 'sql', label: 'SQL Analysis' },
  { id: 'learning', label: 'What I Learned' },
];

function pageFromHash(): CoffeePage {
  const match = location.hash.match(/^#project\/coffee-sales\/(overview|cleaning|sql|learning)$/);
  return (match?.[1] as CoffeePage) || 'overview';
}

function PrivacyNote() {
  return (
    <aside className="coffee-privacy-note">
      <ShieldCheck size={18} aria-hidden="true" />
      <p><strong>Public-data safeguard.</strong> The table structure and non-personal values come from the source files. Customer names, contact details, addresses and identifiers are masked in this portfolio preview.</p>
    </aside>
  );
}

function DatasetTable({ title, headers, rows }: { title: string; headers: readonly string[]; rows: readonly (readonly string[])[] }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? rows : rows.slice(0, 6);
  return (
    <section className="dataset-pane" aria-label={title}>
      <div className="dataset-title"><span>{title}</span><small>{headers.length} columns</small></div>
      <div className="dataset-scroll" tabIndex={0} aria-label={`${title} spreadsheet preview`}>
        <table>
          <thead><tr><th className="row-number" aria-label="Row number">#</th>{headers.map(header => <th key={header}>{header}</th>)}</tr></thead>
          <tbody>{shown.map((row, index) => <tr key={index}><th className="row-number" scope="row">{index + 2}</th>{row.map((value, column) => <td key={`${index}-${column}`} className={value === '— missing —' ? 'missing-cell' : undefined}>{value}</td>)}</tr>)}</tbody>
        </table>
      </div>
      <button className="dataset-more" type="button" onClick={() => setExpanded(value => !value)}>{expanded ? 'Show fewer rows' : `Explore ${rows.length - 6} more sample rows`} <ArrowRight size={14} /></button>
    </section>
  );
}

function CleaningPage() {
  const [dataset, setDataset] = useState<keyof typeof coffeeDatasets>('orders');
  const selected = coffeeDatasets[dataset];
  return (
    <div className="coffee-case-page">
      <header className="case-page-heading"><span className="case-page-number">02</span><div><span className="eyebrow">DATA PREPARATION & CLEANING WITH EXCEL</span><h2>Showing what changed, and what did not.</h2><p>I compared the source workbook with the exported CSV files, then traced the formula evidence in the project workbook. The raw workbook itself contains no formulas; the preparation formulas are present in <code>coffeeOrdersProject.xlsx</code>.</p></div></header>
      <PrivacyNote />
      <div className="dataset-switcher" role="tablist" aria-label="Choose dataset">{Object.entries(coffeeDatasets).map(([key, value]) => <button type="button" role="tab" aria-selected={dataset === key} key={key} onClick={() => setDataset(key as keyof typeof coffeeDatasets)}>{value.label}</button>)}</div>
      <p className="dataset-note">{selected.note}</p>
      <div className="dataset-comparison" role="tabpanel" aria-label={`${selected.label} before and after cleaning`}>
        <DatasetTable title="Before Cleaning · Excel" headers={selected.before.headers} rows={selected.before.rows} />
        <DatasetTable title="After Cleaning · CSV" headers={selected.after.headers} rows={selected.after.rows} />
      </div>

      <section className="case-block">
        <div className="case-section-heading"><span className="eyebrow">VERIFIED EXCEL FORMULAS</span><h3>How the prepared Orders table was built.</h3><p>These examples are taken from the project workbook, not inferred from the CSV output.</p></div>
        <div className="formula-grid">{formulaEvidence.map(item => <article key={item.title}><span>{item.title}</span><code>{item.formula}</code><p>{item.detail}</p></article>)}</div>
      </section>

      <section className="case-block">
        <div className="case-section-heading"><span className="eyebrow">VALIDATION</span><h3>Checks performed before analysis.</h3></div>
        <div className="quality-table"><div className="quality-row quality-head"><span>Table</span><span>Scope</span><span>Duplicate check</span><span>Missing-value observation</span></div>{cleaningChecks.map(row => <div className="quality-row" key={row[0]}>{row.map((value, index) => <span key={value}>{index === 0 && <CheckCircle2 size={15} aria-hidden="true" />}{value}</span>)}</div>)}</div>
        <div className="case-callout"><strong>What I learned</strong><p>I learned to keep missing values visible rather than replacing them with invented data, to verify uniqueness before aggregation, and to check that lookup keys and calculated fields are complete before loading the data into SQL.</p></div>
      </section>
    </div>
  );
}

function highlightSql(code: string) {
  const keyword = /\b(SELECT|FROM|WHERE|GROUP|BY|ORDER|AS|SUM|COUNT|DISTINCT|WITH|JOIN|LEFT|ON|CASE|WHEN|THEN|ELSE|END|RANK|OVER|PARTITION|DESC|COALESCE|ROUND|NULLIF|AVG|NULL|IS|DATE_TRUNC|LIMIT|AND|OR|LAG)\b/gi;
  const exactKeyword = /^(SELECT|FROM|WHERE|GROUP|BY|ORDER|AS|SUM|COUNT|DISTINCT|WITH|JOIN|LEFT|ON|CASE|WHEN|THEN|ELSE|END|RANK|OVER|PARTITION|DESC|COALESCE|ROUND|NULLIF|AVG|NULL|IS|DATE_TRUNC|LIMIT|AND|OR|LAG)$/i;
  return code.split(keyword).map((part, index) => exactKeyword.test(part) ? <span className="sql-keyword" key={index}>{part}</span> : <span key={index}>{part}</span>);
}

function SqlExamplePanel({ example }: { example: SqlExample }) {
  const [status, setStatus] = useState('');
  return (
    <details className="sql-example">
      <summary><span><small>PROBLEM</small>{example.title}</span><span>View analysis</span></summary>
      <div className="sql-example-body">
        <p className="sql-problem">{example.problem}</p>
        {example.reviewNote && <aside className="sql-review-note"><strong>Source review note</strong><p>{example.reviewNote}</p></aside>}
        <div className="sql-toolbar"><span>SQL solution</span><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(example.code); setStatus('Copied'); } catch { setStatus('Select the code to copy'); } }}><Copy size={14} /> Copy SQL</button></div>
        <pre tabIndex={0}><code>{highlightSql(example.code)}</code></pre>
        <span className="copy-status" aria-live="polite">{status}</span>
        <div className="sql-techniques">{example.techniques.map(item => <span key={item}>{item}</span>)}</div>
        <div className="sql-explanation-grid"><div><strong>How it works</strong><p>{example.explanation}</p></div><div><strong>What I learned</strong><p>{example.learning}</p></div>{example.result && <div><strong>Verified result or limitation</strong><p>{example.result}</p></div>}</div>
      </div>
    </details>
  );
}

function SqlPage() {
  const [stageIndex, setStageIndex] = useState(0);
  const stage = sqlStages[stageIndex];
  return (
    <div className="coffee-case-page">
      <header className="case-page-heading"><span className="case-page-number">03</span><div><span className="eyebrow">SQL ANALYSIS & PRACTICAL APPLICATIONS</span><h2>From selecting rows to solving multi-step questions.</h2><p>The four repository scripts show a clear progression. I selected examples that demonstrate a distinct analytical technique and kept source limitations visible.</p></div></header>
      <div className="sql-stage-nav" role="tablist" aria-label="SQL learning stages">{sqlStages.map((item, index) => <button type="button" role="tab" aria-selected={stageIndex === index} onClick={() => setStageIndex(index)} key={item.id}><span>{item.number}</span>{item.title}<small>{item.source}</small></button>)}</div>
      <section className="sql-stage" role="tabpanel" aria-label={stage.title}>
        <header><div><span className="eyebrow">STAGE {stage.number}</span><h3>{stage.title}</h3></div><a href={coffeeFile(stage.source)} target="_blank" rel="noreferrer">Open source file <ArrowUpRight size={15} /></a></header>
        <div className="stage-learning"><article><strong>What I applied</strong><p>{stage.applied}</p></article><article><strong>What I learned</strong><p>{stage.learned}</p></article></div>
        <div className="sql-example-list">{stage.examples.map(example => <SqlExamplePanel example={example} key={example.title} />)}</div>
      </section>
    </div>
  );
}

function LearningPage() {
  return (
    <div className="coffee-case-page learning-page">
      <header className="case-page-heading"><span className="case-page-number">04</span><div><span className="eyebrow">DEDICATED REFLECTION</span><h1>What I Learned</h1><p>This page explains how my thinking developed from preparing a workbook to solving relational and time-based SQL problems.</p></div></header>
      <div className="learning-index" aria-label="Learning topics">{learningSections.map(item => <div className="learning-index-item" key={item.id}><span>{item.label}</span>{item.title}</div>)}</div>
      <div className="learning-sections">{learningSections.map(item => <section id={`learning-${item.id}`} key={item.id}><span>{item.label}</span><div><h2>{item.title}</h2><p>{item.body}</p></div></section>)}</div>
      <section className="next-learning"><GraduationCap size={28} /><div><span className="eyebrow">NEXT DEVELOPMENT AREA</span><h2>Stronger validation and retention analysis.</h2><p>I want to finish and test the remaining draft queries, add repeatable data-quality checks, and explore customer cohorts so that retention is measured across comparable time periods.</p></div></section>
    </div>
  );
}

function OverviewPage({ navigate }: { navigate: (page: CoffeePage) => void }) {
  const metrics = [
    ['1,000', 'sales lines'],
    ['957', 'distinct orders'],
    ['3', 'related tables'],
    ['4', 'SQL learning stages'],
  ];
  return (
    <div className="coffee-case-page">
      <section className="coffee-case-hero">
        <div><span className="eyebrow">PORTFOLIO CASE STUDY</span><h1>Coffee Orders Data Analysis <em>Excel & SQL</em></h1><p>I prepared a raw coffee-orders workbook, exported structured datasets and used PostgreSQL to answer progressively more complex business questions. This case study focuses on the evidence behind the work: the source data, formulas, queries, findings and lessons.</p><div className="case-hero-actions"><button className="button dark" type="button" onClick={() => navigate('cleaning')}>View data preparation <ArrowRight size={15} /></button><a className="pill" href={coffeeRepo} target="_blank" rel="noreferrer">Open repository <ArrowUpRight size={15} /></a></div></div>
        <div className="case-metrics">{metrics.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
      </section>

      <section className="case-block overview-intro"><div className="case-section-heading"><span className="eyebrow">PROJECT PURPOSE</span><h2>Turning prepared records into explainable analysis.</h2></div><div className="overview-columns"><p>The project starts with three Excel worksheets: Orders, Customers and Products. I used the related identifiers to enrich the order data, calculate sales fields and create structured CSV files for PostgreSQL.</p><p>The SQL work then progresses through retrieval, filtering, aggregation, joins, CTEs and window functions. Each stage connects the syntax to a practical question rather than treating SQL as a list of commands.</p></div></section>

      <section className="case-block"><div className="case-section-heading"><span className="eyebrow">PROJECT WORKFLOW</span><h2>One connected analysis process.</h2></div><ol className="coffee-workflow">{workflow.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><p>{detail}</p></div>{index < workflow.length - 1 && <ArrowRight size={17} aria-hidden="true" />}</li>)}</ol></section>

      <section className="case-block"><div className="case-section-heading"><span className="eyebrow">VERIFIED FINDINGS</span><h2>What the prepared data shows.</h2></div><div className="verified-findings"><article><strong>45,135.35</strong><span>Total revenue in the unspecified source currency</span></article><article><strong>79%</strong><span>Approximate revenue contribution from the United States</span></article><article><strong>25 of 913</strong><span>Purchasing customers with more than one distinct order</span></article><article><strong>Excelsa</strong><span>Highest-revenue coffee type at 12,306.71</span></article></div><p className="finding-limit">These observations describe this dataset. They do not prove that a product, market or loyalty programme caused the result.</p></section>

      <section className="case-block"><div className="case-section-heading"><span className="eyebrow">SKILLS DEMONSTRATED</span><h2>Techniques connected to analytical decisions.</h2></div><div className="skill-evidence-grid"><article><FileSpreadsheet size={23} /><h3>Excel & Data Preparation</h3><p>XLOOKUP, INDEX/MATCH, IF, calculated fields, structured tables, missing-value review and CSV preparation.</p></article><article><Database size={23} /><h3>SQL</h3><p>Filtering, aggregation, joins, CTEs, subqueries, conditional logic, window functions and date analysis.</p></article><article><Search size={23} /><h3>Analytical Reasoning</h3><p>Defining KPIs, checking data grain, validating results, interpreting limitations and translating questions into queries.</p></article></div></section>
    </div>
  );
}

export default function CoffeeCaseStudy({ onClose }: { onClose: () => void }) {
  const [page, setPage] = useState<CoffeePage>(pageFromHash);
  const topRef = useRef<HTMLDivElement>(null);
  const currentIndex = useMemo(() => pages.findIndex(item => item.id === page), [page]);

  useEffect(() => {
    const sync = () => setPage(pageFromHash());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const navigate = (next: CoffeePage) => {
    history.pushState({ presentation: true, coffeePage: next }, '', `#project/coffee-sales/${next}`);
    setPage(next);
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="coffee-case-study" ref={topRef}>
      <header className="coffee-case-top">
        <button className="pill" type="button" onClick={onClose}><ArrowLeft size={15} /> Back to portfolio</button>
        <span>COFFEE ORDERS DATA ANALYSIS</span>
        <a href={coffeeRepo} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={14} /></a>
      </header>
      <nav className="coffee-case-nav" aria-label="Coffee project navigation">{pages.map(item => <button type="button" aria-current={page === item.id ? 'page' : undefined} onClick={() => navigate(item.id)} key={item.id}><span>{String(pages.indexOf(item) + 1).padStart(2, '0')}</span>{item.label}</button>)}</nav>

      <div className="coffee-case-content" role="main">
        {page === 'overview' && <OverviewPage navigate={navigate} />}
        {page === 'cleaning' && <CleaningPage />}
        {page === 'sql' && <SqlPage />}
        {page === 'learning' && <LearningPage />}
      </div>

      <footer className="coffee-case-footer"><span>{pages[currentIndex].label}</span><div><button type="button" className="pill" disabled={currentIndex === 0} onClick={() => navigate(pages[currentIndex - 1].id)}><ArrowLeft size={14} /> Previous</button><button type="button" className="button dark" disabled={currentIndex === pages.length - 1} onClick={() => navigate(pages[currentIndex + 1].id)}>Next <ArrowRight size={14} /></button></div></footer>
    </div>
  );
}
