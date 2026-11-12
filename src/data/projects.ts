export type SlideKind = 'overview'|'problem'|'objectives'|'technologies'|'architecture'|'features'|'screenshots'|'results'|'repository';
export interface Slide { id: string; kind: SlideKind; title: string; body?: string; bullets?: string[]; image?: string; imageAlt?: string; placeholder?: boolean; analytics?: string; caption?: string; cards?: {title:string;text:string}[]; workflow?: string[]; branches?: string[]; gallery?: {title:string;image?:string;caption:string}[]; links?: {label:string;url:string}[] }
export interface Project { id: string; title: string; fullTitle?:string; subtitle?:string; institution?:string; module?:string; achievement?:string; documentation?:string; category: string; description: string; accent: string; cover?: string; coverLabel?: string; cardAction?: string; metadata?: {label:string;value:string}[]; technologies: string[]; repository?: string; placeholder?: boolean; slides: Slide[] }
import { dwill } from './dwill';
import { coffee } from './coffee';
import { retail } from './retail';
import { hr } from './hr';
const slide = (kind: SlideKind, title: string, body: string): Slide => ({id:kind,kind,title,body,placeholder:true});
export const projects: Project[] = [
 coffee, retail, hr,
 {id:'data-project',title:'Data analytics project',category:'Data Analytics',description:'Data analytics project — content pending.',accent:'sand',technologies:[],placeholder:true,slides:[slide('overview','Project Overview','Introduce your analysis and the question it explores.'),slide('architecture','Methodology','Add your real data preparation and analysis methodology.'),slide('screenshots','Analysis','Add verified charts or implementation screenshots.'),slide('results','Key Results','Add findings, uncertainty, and limitations supported by your work.')]},
 dwill,
 {id:'software-project',title:'Software project',category:'Software Engineering',description:'Software engineering project — content pending.',accent:'sage',technologies:[],placeholder:true,slides:[
 slide('overview','Project Overview','Add a short introduction to your project, who it serves, and what you built.'),
 slide('problem','Problem','Describe the challenge, who experiences it, and why solving it matters.'),
 slide('objectives','Objectives','Add the goals and constraints that shaped your work.'),
 slide('technologies','Tools & Technologies','List the technologies you actually used and explain the key choices.'),
 slide('architecture','Architecture','Upload your system architecture diagram and describe the flow between components.'),
 slide('features','Key Features','Describe the features you implemented and the needs they address.'),
 slide('screenshots','Implementation','Upload real implementation screenshots with descriptive captions.'),
 slide('results','Key Results','Add verified outcomes, lessons learned, and supporting evidence.'),
 slide('repository','Source Code','Add your GitHub repository URL to make the source available.') ]},
];
export function validRepository(value?: string) { if(!value) return false; try { const u=new URL(value); return u.protocol==='https:' && u.hostname==='github.com' && /^\/[^/]+\/[^/]+\/?$/.test(u.pathname) && !u.username && !u.password; } catch {return false;} }
