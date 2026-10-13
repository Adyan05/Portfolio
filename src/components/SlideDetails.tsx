import { ArrowDown, ArrowUpRight, Users, LockKeyhole, Timer, Blocks, Wallet, Folder } from 'lucide-react';
import type { Slide } from '../data/projects';
import { Media } from './Placeholder';
import CoffeeContent from './CoffeeContent';
import RetailContent from './RetailContent';

export const resourceUrl = (url:string) => url.startsWith('https://') ? url : `${import.meta.env.BASE_URL}${url.replace(/^\//,'')}`;
const icons = [Users, LockKeyhole, Timer, Blocks, Wallet, Folder];

export function SlideDetails({slide}:{slide:Slide}) {
  return <>
    {slide.analytics && (slide.analytics.startsWith('retail:') ? <RetailContent key={slide.id} kind={slide.analytics.slice(7)}/> : <CoffeeContent key={slide.id} kind={slide.analytics}/>)}
    {slide.cards && <div className="case-cards">{slide.cards.map((card,i)=>{const Icon=icons[i%icons.length];return <section key={card.title}><Icon size={22} strokeWidth={1.4}/><h4>{card.title}</h4><p>{card.text}</p></section>;})}</div>}
    {slide.workflow && <div className="case-workflow"><ol>{slide.workflow.map((step,i)=><li key={step}><span>{String(i+1).padStart(2,'0')}</span>{step}<ArrowDown size={15} aria-hidden="true"/></li>)}</ol><div className="workflow-branches">{slide.branches?.map(branch=><p key={branch}>{branch}</p>)}</div></div>}
    {slide.gallery && <div className="case-gallery">{slide.gallery.map(item=><figure key={item.title}>{item.image?<a href={resourceUrl(item.image)} target="_blank" rel="noreferrer" aria-label={`Open ${item.title} image`}><Media src={item.image} alt={`${item.title} — ${item.caption}`}/></a>:<Media alt={`${item.title} placeholder`}/>}<figcaption><strong>{item.title}</strong><span>{item.caption}</span></figcaption></figure>)}</div>}
    {slide.caption && <p className="case-caption">{slide.caption}</p>}
    {slide.links && <div className="case-resources">{slide.links.map(link=><a className="pill" href={resourceUrl(link.url)} key={link.url} target="_blank" rel="noreferrer">{link.label}<ArrowUpRight size={14}/></a>)}</div>}
  </>;
}
