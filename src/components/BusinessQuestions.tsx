import { useState } from 'react';
import { Copy } from 'lucide-react';
import results from '../data/sqlQuestionResults.json';

const projects = {
  'coffee-sales': { name: 'Coffee Orders', dialect: 'PostgreSQL', source: 'https://github.com/Adyan05/Coffee-Sales/blob/main/' },
  'online-retail': { name: 'Online Retail', dialect: 'T-SQL', source: import.meta.env.BASE_URL + 'retail/sql/' },
  'hr-analytics': { name: 'HR Analytics', dialect: 'PostgreSQL', source: import.meta.env.BASE_URL + 'downloads/hr/' },
};

export type SqlProject = keyof typeof projects;
type Question = (typeof results)[SqlProject][number];
const keyword = /^(?:SELECT|FROM|WHERE|WITH|AS|GROUP|BY|ORDER|DESC|ASC|DISTINCT|CASE|WHEN|THEN|ELSE|END|FILTER|COUNT|SUM|ROUND|NULLIF|AND|IS|NOT|NULL|LIMIT)$/i;
const tokens = /(--[^\n]*|'(?:[^']|'')*'|\b(?:SELECT|FROM|WHERE|WITH|AS|GROUP|BY|ORDER|DESC|ASC|DISTINCT|CASE|WHEN|THEN|ELSE|END|FILTER|COUNT|SUM|ROUND|NULLIF|AND|IS|NOT|NULL|LIMIT)\b)/gi;

function format(value: string | number | null, decimals: number) {
  return typeof value === 'number'
    ? value.toLocaleString('en', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : value ?? '—';
}

function BusinessQuestion({ question, number, project }: { question: Question; number: number; project: SqlProject }) {
  const [showAll, setShowAll] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');
  const info = projects[project];
  const rows = showAll ? question.rows : question.rows.slice(0, 10);
  const titleId = `question-${question.id}`;
  const chart = question.chart;
  const decimalPlaces = (column: number) => question.decimals.includes(column) ? 2 : 0;
  const chartRows = chart ? question.rows.slice(0, 6) : [];
  const max = chart ? Math.max(1, ...chartRows.map(row => Number(row[chart[1]]))) : 1;

  async function copyQuery() {
    try {
      await navigator.clipboard.writeText(question.code);
      setCopyStatus('SQL copied.');
    } catch {
      setCopyStatus('Select the query text to copy it.');
    }
  }

  return <article className="business-question" aria-labelledby={titleId}>
    <header className="question-header">
      <span>Business Question {String(number).padStart(2, '0')}</span>
      <span className="question-tag">{info.name}</span>
    </header>
    <h4 id={titleId}>{question.title}</h4>
    <h5>SQL Query</h5>
    <div className="question-code">
      <div className="question-toolbar">
        <a href={info.source + encodeURIComponent(question.source)} target="_blank" rel="noreferrer">{info.dialect} · {question.source}</a>
        <button className="pill" type="button" onClick={copyQuery}><Copy size={14} aria-hidden="true"/>Copy SQL</button>
      </div>
      <pre tabIndex={0} aria-label={`SQL for ${question.title}`}><code>{question.code.split(tokens).map((part, index) => <span key={index} className={keyword.test(part) ? 'question-keyword' : part.startsWith('--') ? 'question-comment' : undefined}>{part}</span>)}</code></pre>
      <span aria-live="polite">{copyStatus}</span>
    </div>

    <h5>SQL Query Results</h5>
    <div className="question-table" tabIndex={0} role="region" aria-label={`Results for ${question.title}`}>
      <table>
        <thead><tr>{question.columns.map((column, index) => <th key={column} scope="col" className={typeof rows[0]?.[index] === 'number' ? 'numeric' : undefined}>{column}</th>)}</tr></thead>
        <tbody>{rows.map((row, index) => <tr key={index}>{row.map((value, column) => <td key={column} className={typeof value === 'number' ? 'numeric' : undefined}>{format(value, decimalPlaces(column))}</td>)}</tr>)}</tbody>
      </table>
    </div>
    {question.rowCount > 10 && <div className="question-controls">
      <span>{rows.length.toLocaleString()} of {question.rowCount.toLocaleString()} rows</span>
      {question.export
        ? <a className="pill" download href={import.meta.env.BASE_URL + question.export}>Download full CSV</a>
        : <button className="pill" type="button" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show fewer rows' : 'Show all rows'}</button>}
    </div>}
    {question.hrRate && <p>Decimal rates are calculated separately from the displayed counts. The original SQL rate uses integer division.</p>}
    {chart && <figure className="question-chart">
      <figcaption>{question.columns[chart[1]]}{question.rowCount > chartRows.length ? ' · first six rows' : ''}</figcaption>
      <ul>{chartRows.map((row, index) => <li key={index}>
        <span>{row[chart[0]]}</span>
        <meter min={0} max={max} value={Number(row[chart[1]])} aria-label={String(row[chart[0]])}/>
        <strong>{format(row[chart[1]], decimalPlaces(chart[1]))}{question.hrRate ? '%' : ''}</strong>
      </li>)}</ul>
    </figure>}
    <h5>How the Query Works</h5>
    <p>{question.explanation}</p>
    <h5>Key Findings</h5>
    <p>{question.finding}</p>
    <h5>Business Decision / Recommendation</h5>
    <dl className="question-decisions">
      <dt>Proposed decision</dt><dd>{question.decision}</dd>
      <dt>Recommendation</dt><dd>{question.action}</dd>
      <dt>Relevant KPI</dt><dd>{question.kpi}</dd>
    </dl>
    {question.dashboard && <a className="pill" href={import.meta.env.BASE_URL + question.dashboard} target="_blank" rel="noreferrer">View related Power BI preview</a>}
  </article>;
}

export default function BusinessQuestions({ project }: { project: SqlProject }) {
  return <div className="business-questions">
    <p>Results were generated from the project CSVs in SQLite using the displayed query logic. The source code retains its original dialect. {project === 'online-retail' ? 'Validation mapped the original SQL Server table name to the local CSV table. Revenue uses the source unit.' : project === 'hr-analytics' ? 'Validation rebuilt the attrition flag from the source view and kept integer division for the original rate.' : 'Revenue uses the source unit.'}</p>
    {results[project].map((question, index) => <BusinessQuestion key={question.id} number={index + 1} project={project} question={question}/>)}
  </div>;
}
