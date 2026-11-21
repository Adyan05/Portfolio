import { useState } from 'react';
import { Copy } from 'lucide-react';
import results from '../data/sqlQuestionResults.json';

const projects = {
  'coffee-sales': { dialect: 'PostgreSQL', source: 'https://github.com/Adyan05/Coffee-Sales/blob/main/' },
  'online-retail': { dialect: 'T-SQL', source: import.meta.env.BASE_URL + 'retail/sql/' },
  'hr-analytics': { dialect: 'PostgreSQL', source: import.meta.env.BASE_URL + 'downloads/hr/' },
};

export type SqlProject = keyof typeof projects;
type Question = (typeof results)[SqlProject][number];
const keyword = /^(?:SELECT|FROM|WHERE|WITH|AS|GROUP|BY|ORDER|DESC|ASC|DISTINCT|CASE|WHEN|THEN|ELSE|END|FILTER|COUNT|SUM|ROUND|NULLIF|AND|IS|NOT|NULL|LIMIT)$/i;
const tokens = /(--[^\n]*|'(?:[^']|'')*'|\b(?:SELECT|FROM|WHERE|WITH|AS|GROUP|BY|ORDER|DESC|ASC|DISTINCT|CASE|WHEN|THEN|ELSE|END|FILTER|COUNT|SUM|ROUND|NULLIF|AND|IS|NOT|NULL|LIMIT)\b)/gi;

function format(value: string | number | null) {
  return typeof value === 'number'
    ? value.toLocaleString('en', { maximumFractionDigits: 4 })
    : value ?? '—';
}

function BusinessQuestion({ question, number, project }: { question: Question; number: number; project: SqlProject }) {
  const [copyStatus, setCopyStatus] = useState('');
  const info = projects[project];
  const titleId = `question-${question.id}`;
  const index = String(number).padStart(2, '0');

  async function copyQuery() {
    try {
      await navigator.clipboard.writeText(question.code);
      setCopyStatus('SQL copied.');
    } catch {
      setCopyStatus('Select the query text to copy it.');
    }
  }

  return <article className="business-question" aria-labelledby={titleId}>
    <h4 id={titleId}><span className="question-number">Business Question {index}</span>{question.title}</h4>
    <h5>SQL Query</h5>
    <div className="question-code">
      <div className="question-toolbar">
        <a href={info.source + encodeURIComponent(question.source)} target="_blank" rel="noreferrer">{info.dialect} · {question.source}</a>
        <button className="pill" type="button" onClick={copyQuery}><Copy size={14} aria-hidden="true"/>Copy SQL</button>
      </div>
      <pre tabIndex={0} aria-label={`SQL for ${question.title}`}><code>{question.code.split(tokens).map((part, index) => <span key={index} className={keyword.test(part) ? 'question-keyword' : part.startsWith('--') ? 'question-comment' : undefined}>{part}</span>)}</code></pre>
      <span aria-live="polite">{copyStatus}</span>
    </div>

    <h5>SQL Results</h5>
    {question.status && <p>{question.status}</p>}
    {question.rows.length > 0 && <div className="question-table" tabIndex={0} role="region" aria-label={`Results for ${question.title}`}>
      <table>
        <thead><tr>{question.columns.map((column, i) => <th key={i} scope="col" className={typeof question.rows[0][i] === 'number' ? 'numeric' : undefined}>{column}</th>)}</tr></thead>
        <tbody>{question.rows.map((row, i) => <tr key={i}>{row.map((value, column) => <td key={column} className={typeof value === 'number' ? 'numeric' : undefined}>{format(value)}</td>)}</tr>)}</tbody>
      </table>
    </div>}
    {question.export && <div className="question-controls">
      <span>{question.rows.length.toLocaleString()} of {question.rowCount.toLocaleString()} rows</span>
      <a className="pill" download href={import.meta.env.BASE_URL + question.export}>Download full CSV</a>
    </div>}
  </article>;
}

export default function BusinessQuestions({ project }: { project: SqlProject }) {
  return <div className="business-questions">
    {results[project].map((question, index) => <BusinessQuestion key={question.id} number={index + 1} project={project} question={question}/>)}
  </div>;
}
