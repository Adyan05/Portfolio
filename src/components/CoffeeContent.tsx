import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Copy, X, Coffee } from 'lucide-react';
import { coffeeMedia, questionGroups, coffeeFile } from '../data/coffee';
import { sqlExamples, daxExamples } from '../data/coffeeExamples';
import { Media } from './Placeholder';
import { resourceUrl } from './SlideDetails';

export function Tabs({items,value,onChange,label}:{items:string[];value:number;onChange:(i:number)=>void;label:string}) {
 const ref=useRef<HTMLDivElement>(null);
 return <div className="coffee-tabs" ref={ref} role="tablist" aria-label={label} onKeyDown={e=>{if(['ArrowRight','ArrowLeft','Home','End'].includes(e.key)){e.preventDefault();e.stopPropagation();const i=e.key==='Home'?0:e.key==='End'?items.length-1:(value+(e.key==='ArrowRight'?1:-1)+items.length)%items.length;onChange(i);(ref.current?.children[i] as HTMLButtonElement)?.focus();}}}>{items.map((item,i)=><button key={item} type="button" role="tab" aria-selected={value===i} tabIndex={value===i?0:-1} onClick={()=>onChange(i)}>{item}</button>)}</div>;
}

export function EvidenceImage({item}:{item:typeof coffeeMedia[string]}) {
 const [open,setOpen]=useState(false);const dialog=useRef<HTMLDialogElement>(null);
 useEffect(()=>{if(open)dialog.current?.showModal();else dialog.current?.close();},[open]);
 return <figure className="coffee-evidence">{item.image?<button className="evidence-image" onClick={()=>setOpen(true)} aria-label={`Enlarge ${item.title}`}><Media src={item.image} alt={item.title}/><span>Enlarge image <ArrowUpRight size={15}/></span></button>:<div className="dashboard-placeholder"><Coffee size={34} strokeWidth={1}/><span>SCREENSHOT PLACEHOLDER</span><h4>{item.title}</h4><p>Original screenshot to be added</p></div>}<figcaption>{item.caption}</figcaption>{open&&<dialog ref={dialog} className="coffee-lightbox" aria-label={item.title} onCancel={e=>{e.preventDefault();e.stopPropagation();setOpen(false);}} onKeyDown={e=>e.stopPropagation()}><button className="pill" onClick={()=>setOpen(false)} aria-label="Close image"><X size={16}/>Close image</button><Media src={item.image} alt={item.title}/><p>{item.caption}</p></dialog>}</figure>;
}

export function Count({value,decimals=0}:{value:number;decimals?:number}) {
 const reduced=useReducedMotion(),[n,setN]=useState(reduced?value:0);const ref=useRef<HTMLSpanElement>(null);
 useEffect(()=>{if(reduced){setN(value);return;}let frame=0;let begun=false;const observer=new IntersectionObserver(([e])=>{if(e.isIntersecting&&!begun){begun=true;const start=performance.now();const step=(t:number)=>{const progress=Math.min((t-start)/700,1);setN(value*(1-(1-progress)**3));if(progress<1)frame=requestAnimationFrame(step);};frame=requestAnimationFrame(step);}});if(ref.current)observer.observe(ref.current);return()=>{observer.disconnect();cancelAnimationFrame(frame);};},[value,reduced]);
 return <span ref={ref} aria-label={value.toLocaleString('en',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}><span aria-hidden="true">{n.toLocaleString('en',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}</span></span>;
}

export function CodePanel({dax=false, supplied, fileLink=coffeeFile}:{dax?:boolean; supplied?:{title:string;code:string;source:string;question?:string;interpretation?:string}[];fileLink?:(name:string)=>string}) {
 const [tab,setTab]=useState(0),[status,setStatus]=useState('');const examples: {title:string;code:string;source:string;question?:string;interpretation?:string}[]=supplied || (dax?daxExamples:sqlExamples);const item=examples[tab];
 const parts=item.code.split(/('(?:[^']|'')*'|\b(?:SELECT|FROM|WHERE|GROUP|BY|ORDER|AS|SUM|COUNT|DISTINCT|WITH|JOIN|LEFT|ON|CASE|WHEN|THEN|ELSE|END|RANK|OVER|PARTITION|DESC|COALESCE|ROUND|NULLIF|NTILE|AVG|NULL|IS|DATE_TRUNC|DISTINCTCOUNT|DIVIDE|CALCULATE|ALLSELECTED|VAR|RETURN|IF|ISBLANK|REMOVEFILTERS|DATESBETWEEN|EOMONTH|EDATE)\b)/gi);
 return <div className="coffee-code"><Tabs items={examples.map(e=>e.title)} value={tab} onChange={i=>{setTab(i);setStatus('');}} label={dax?'DAX measures':'SQL examples'}/><div role="tabpanel" aria-label={item.title}><div className="code-heading"><span>{dax?'DAX / VERIFIED MODEL EXCERPT':'SQL / REPOSITORY EXCERPT'}</span><button className="pill" onClick={async()=>{try{await navigator.clipboard.writeText(item.code);setStatus('Copied');}catch{setStatus('Copy unavailable — select the code below.');}}}><Copy size={14}/>Copy Code</button></div>{'question' in item&&<p>{item.question}</p>}<pre tabIndex={0} aria-label={`${item.title} code`}><code>{parts.map((part,i)=><span key={i} className={i%2?'code-token':''}>{part}</span>)}</code></pre><span className="copy-status" aria-live="polite">{status}</span>{'interpretation' in item&&<p><strong>Business interpretation:</strong> {item.interpretation}</p>}<a className="text-link" href={fileLink(dax?'README.md':item.source)} target="_blank" rel="noreferrer">{dax?'README and supplied model export':item.source}<ArrowUpRight size={14}/></a></div></div>;
}

const findings=[['Leading country','United States · 35,639.73','About 79% of revenue'],['Leading coffee','Excelsa · 12,306.71','Source currency'],['Leading roast','Light · 17,354.87','Source currency'],['Leading size','2.5 · 23,786.12','Size as recorded in source'],['Peak month','February 2020 · 1,798.40','Highest monthly revenue'],['Top customer','Allis Wilmore · 317.08','Highest lifetime revenue'],['Top product','Arabica / Light / 2.5 · 2,561.59','Product A-L-2.5'],['Repeat purchasers','25 of 913','More than one distinct order']];

export default function CoffeeContent({kind}:{kind:string}) {
 const [tab,setTab]=useState(0);const reduced=useReducedMotion();
 if(kind==='questions')return <div className="coffee-questions">{questionGroups.map(g=><details key={g.title}><summary>{g.title}<span>{g.items.length} questions</span></summary><p>{g.why}</p><ul>{g.items.map(([q,where])=><li key={q}><span>{q}</span><small>{where}</small></li>)}</ul></details>)}</div>;
 if(kind==='kpis')return <div className="coffee-kpis">{[['Total revenue',45135.35,2],['Distinct orders',957,0],['Units sold',3551,0],['Purchasing customers',913,0],['Average Order Value',47.16,2]].map(([title,value,decimal])=><div key={title}><span>{title}</span><strong><Count value={Number(value)} decimals={Number(decimal)}/></strong><small>{decimal?'Source currency':'Source dataset'}</small></div>)}</div>;
 if(kind==='sql'||kind==='dax')return <CodePanel dax={kind==='dax'}/>;
 if(kind==='insights')return <div className="coffee-findings">{findings.map(([title,value,note])=><div key={title}><span>{title}</span><strong>{value}</strong><small>{note}</small></div>)}</div>;
 if(kind==='model')return <div className="coffee-model" aria-label="One-to-many relationships from Customers, Products and Calendar to Orders"><div className="dimension-row">{[['Customers','customerid'],['Products','productid'],['Calendar','Date']].map(([name,key])=><div key={name}><strong>{name}</strong><code>{key}</code><span>1</span><ArrowDown size={22}/><span>many</span></div>)}</div><div className="orders-fact"><strong>Orders</strong><span>customerid · productid · orderdate</span><small>Sales-line fact table · 1,000 rows / 957 distinct orders</small></div></div>;
 if(kind==='dashboard')return <div className="coffee-dashboard"><Tabs items={['Sales Overview','Monthly Detail']} value={tab} onChange={setTab} label="Power BI report pages"/><AnimatePresence mode="wait"><motion.div key={tab} role="tabpanel" aria-label={tab?'Monthly Detail':'Sales Overview'} initial={{opacity:0,y:reduced?0:8}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:reduced?0:.2}}><EvidenceImage item={coffeeMedia[tab?'monthly':'overview']}/></motion.div></AnimatePresence></div>;
 const groups=kind==='excel'?['Excel']:['Excel','SQL','Power BI','Documentation'];const group=groups[Math.min(tab,groups.length-1)];
 return <div>{kind!=='excel'&&<Tabs items={groups} value={tab} onChange={setTab} label="Evidence categories"/>}<div className="coffee-evidence-grid" role="tabpanel" aria-label={group}>{Object.values(coffeeMedia).filter(x=>x.group===group).map(x=><EvidenceImage key={x.title} item={x}/>)}</div></div>;
}
