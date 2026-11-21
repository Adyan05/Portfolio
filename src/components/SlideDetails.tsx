import BusinessQuestions from './BusinessQuestions';
import { ArrowDown, ArrowUpRight, Users, LockKeyhole, Timer, Blocks, Wallet, Folder } from 'lucide-react';
import type { Slide } from '../data/projects';
import { Media } from './Placeholder';
import CoffeeContent, { EvidenceImage } from './CoffeeContent';
import RetailContent from './RetailContent';

export const resourceUrl = (url:string) => (url.startsWith('https://') || url.startsWith('#')) ? url : `${import.meta.env.BASE_URL}${url.replace(/^\//,'')}`;
const icons = [Users, LockKeyhole, Timer, Blocks, Wallet, Folder];

export function SlideDetails({slide}:{slide:Slide}) {
  return <>
    {slide.sqlProject && <BusinessQuestions project={slide.sqlProject}/>}
    {slide.code && <pre className="evidence-code" tabIndex={0} aria-label="Source code example"><code>{slide.code}</code></pre>}
    {slide.analytics && (slide.analytics.startsWith('retail:') ? <RetailContent key={slide.id} kind={slide.analytics.slice(7)}/> : <CoffeeContent key={slide.id} kind={slide.analytics}/>)}
    {slide.cards && <div className="case-cards">{slide.cards.map((card,i)=>{const Icon=icons[i%icons.length];return <section key={card.title}><Icon size={22} strokeWidth={1.4}/><h4>{card.title}</h4><p>{card.text}</p></section>;})}</div>}
    {slide.workflow && <div className="case-workflow"><ol>{slide.workflow.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}<ArrowDown size={15} aria-hidden="true"/></li>)}</ol><div className="workflow-branches">{slide.branches?.map(branch=><p key={branch}>{branch}</p>)}</div></div>}
    {slide.recommendations?.map(([action, evidence, benefit, kpi]) => <section className="case-recommendation" key={action}><h4>{action}</h4><dl><dt>Supporting evidence</dt><dd>{evidence}</dd><dt>Potential benefit</dt><dd>{benefit}</dd><dt>Suggested KPI</dt><dd>{kpi}</dd></dl></section>)}
    {slide.evidence?.map(item => {
      const visual = item.image && { title: item.imageAlt || item.title, image: item.image, caption: item.caption || '', group: 'Project visuals' };
      if (slide.kind === 'screenshots' && item.gallery) return <section key={item.id} className="case-evidence-disclosure"><h4>{item.title}</h4><SlideDetails slide={item}/></section>;
      return <details className="case-evidence-disclosure" key={item.id} open={slide.kind === 'screenshots' && !slide.gallery && Boolean(item.analytics) || undefined}>
        <summary>{item.title}</summary>
        {item.body && <p>{item.body}</p>}
        {item.bullets && <ul>{item.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>}
        {visual && <EvidenceImage item={visual}/>}
        <SlideDetails slide={visual ? { ...item, caption: undefined } : item}/>
      </details>;
    })}
    {slide.kind === 'screenshots' && slide.gallery && <div className="standard-visuals">{slide.gallery.map(visual => <EvidenceImage key={visual.title} item={{...visual, group: 'Project visuals'}}/>)}</div>}
    {slide.kind !== 'screenshots' && slide.gallery && <div className="case-gallery">{slide.gallery.map(item=><figure key={item.title}>{item.image?<a href={resourceUrl(item.image)} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} image`}><Media src={item.image} alt={`${item.title} — ${item.caption}`}/></a>:<Media alt={`${item.title} placeholder`}/>}<figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption></figure>)}</div>}
    {slide.caption && <p className="case-caption">{slide.caption}</p>}
    {slide.links && <div className="case-resources">{slide.links.map(link=><a className="pill" href={resourceUrl(link.url)} key={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14}/></a>)}</div>}
  </>;
}
