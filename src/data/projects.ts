export type SlideKind = 'overview'|'problem'|'objectives'|'technologies'|'architecture'|'features'|'screenshots'|'results'|'repository';
export interface Slide { sqlProject?: SqlProject; evidence?: Slide[]; recommendations?: [string, string, string, string][]; id: string; kind: SlideKind; title: string; body?: string; code?: string; bullets?: string[]; image?: string; imageAlt?: string; placeholder?: boolean; analytics?: string; caption?: string; cards?: {title:string;text:string}[]; workflow?: string[]; branches?: string[]; gallery?: {title:string;image?:string;caption:string}[]; links?: {label:string;url:string}[] }
export interface Project { id: string; title: string; fullTitle?:string; subtitle?:string; institution?:string; module?:string; achievement?:string; documentation?:string; category: string; description: string; accent: string; cover?: string; coverLabel?: string; cardAction?: string; metadata?: {label:string;value:string}[]; technologies: string[]; repository?: string; placeholder?: boolean; slides: Slide[] }
import type { SqlProject } from '../components/BusinessQuestions';
import { dwill } from './dwill';
import { coffee } from './coffee';
import { retail } from './retail';
import { hr } from './hr';
import { standardiseProject } from './caseStudies';
const projectSources: Project[] = [coffee, retail, hr, dwill];
export const projects = projectSources.map(standardiseProject);
export function validRepository(value?: string) { if(!value) return false; try { const u=new URL(value); return u.protocol==='https:' && u.hostname==='github.com' && /^\/[^/]+\/[^/]+\/?$/.test(u.pathname) && !u.username && !u.password; } catch {return false;} }
