import { retailLearning } from './data/retailLearning';
import { useEffect, useState } from 'react';

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import { ArrowUpRight, ArrowRight, Code2, Menu, X, GitFork, Link, Mail, Phone, Asterisk } from 'lucide-react';

import { profile } from './data/profile';

import { projects, validRepository } from './data/projects';

import { education } from './data/education';
import SkillIcon from './components/SkillIcon';
import InteractivePortrait from './components/InteractivePortrait';
import { skills } from './data/skills';

import { experienceGroups } from './data/experience';

import { achievements } from './data/achievements';



import { site } from './config/site';

import { Media, Placeholder } from './components/Placeholder';

import Presentation from './components/Presentation';

const projectFromHash=()=>{const match=location.hash.match(/^#project\/([\w-]+)(?:\/[\w-]+)?$/);return match?.[1]||null;};

export default function App(){const [filter,setFilter]=useState('All projects'),[selected,setSelected]=useState(projectFromHash),[menu,setMenu]=useState(false),[active,setActive]=useState('home');const reduced=useReducedMotion();

 useEffect(()=>{const hash=()=>setSelected(projectFromHash());window.addEventListener('hashchange',hash);const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)setActive(e.target.id);});},{rootMargin:'-20% 0px -55% 0px'});document.querySelectorAll('main > section').forEach(el=>observer.observe(el));return()=>{window.removeEventListener('hashchange',hash);observer.disconnect();};},[]);

 const open=(id:string)=>{const target=id==='coffee-sales'?`#project/${id}/overview`:`#project/${id}`;history.pushState({presentation:true},'',target);setSelected(id);};const close=()=>{if(location.hash.startsWith('#project/coffee-sales')){history.replaceState(null,'','#projects');setSelected(null);}else if(history.state?.presentation)history.back();else {history.replaceState(null,'','#projects');setSelected(null);}};const project=[...projects,retailLearning].find(p=>p.id===selected);

 const reveal={initial:{opacity:0,y:reduced?0:24},whileInView:{opacity:1,y:0},viewport:{once:true},transition:{duration:.5}};

 return <><a className="skip-link" href="#projects">Skip to projects</a><header className="header"><a href="#home" className="brand" aria-label="Home"><span className="brand-icon"><Code2 size={16}/></span>{profile.name}</a><button className="mobile-menu icon-button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Toggle navigation">{menu?<X/>:<Menu/>}</button><nav className={menu?'expanded':''} aria-label="Main navigation">{site.sections.map(s=><a href={`#${s.id}`} key={s.id} onClick={()=>setMenu(false)} className={active===s.id?'active':''} aria-current={active===s.id?'location':undefined}>{s.label}</a>)}</nav><a className="header-contact" href="#contact">Contact <ArrowUpRight size={15}/></a></header>

 <main><section id="home" className="hero reference-hero">

 <motion.h1 {...reveal} className="name-display"><span>{profile.name.split(' ')[0]}</span> {profile.name.split(' ').slice(1).join(' ')}</motion.h1>

 <motion.div {...reveal} className="hero-introduction"><span className="eyebrow">PERSONAL PORTFOLIO</span><h2>{profile.title}</h2><p>{profile.intro}</p><a className="button dark" href="#projects">View Projects <ArrowUpRight size={16}/></a></motion.div>

 <InteractivePortrait src={profile.image}/>

 <div className="hero-socials">{profile.github&&<a className="pill" href={profile.github}><GitFork size={16}/>GitHub</a>}{profile.linkedin&&<a className="pill" href={profile.linkedin}><Link size={16}/>LinkedIn</a>}<a className="pill" href="#about">About me <ArrowUpRight size={15}/></a><a className="pill" href="#contact">Contact <ArrowUpRight size={15}/></a><span className="hero-index">PORTFOLIO / 01</span></div>

 </section>

 <section id="projects" className="projects-section"><motion.div {...reveal} className="section-heading"><div><span className="eyebrow">01 / PROJECT COLLECTION</span><h2>PROJECTS</h2></div><p>Selected projects in data analytics and software engineering.</p></motion.div><div className="filters" aria-label="Filter projects">{['All projects',...new Set(projects.map(p=>p.category))].map(f=><button key={f} aria-pressed={filter===f} className={filter===f?'chosen':''} onClick={()=>setFilter(f)}>{f}{f==='All projects'&&<span>{projects.length.toString().padStart(2,'0')}</span>}</button>)}</div><motion.div layout className="project-grid"><AnimatePresence mode="popLayout">{projects.filter(p=>filter==='All projects'||p.category===filter).map((p,i)=><motion.article layout key={p.id} initial={{opacity:0,y:reduced?0:16}} animate={{opacity:1,y:0}} exit={{opacity:0,scale:reduced?1:.97}} transition={{duration:.25,delay:i*.04}} className={`project-card ${p.accent}`}><button className="project-cover" aria-label={`View ${p.title} ${p.id==='coffee-sales'?'case study':'presentation'}`} onClick={()=>open(p.id)}><span className="cover-label">{p.placeholder?'PLACEHOLDER PROJECT':p.category}</span>{p.cover?<Media src={p.cover} alt={`${p.title} cover`}/>:p.coverLabel?<Placeholder label={p.coverLabel}/>:<div className={`cover-art art-${p.id}`} aria-hidden="true"><div className="mini-window"><span/><span/><span/><div className="mini-content"><Code2 size={30}/><i/><i/><i/></div></div><div className="floating-tile"><Asterisk size={36}/></div></div>}<span className="cover-bottom"><span>{p.id==='coffee-sales'?'PROJECT CASE STUDY':'PROJECT PRESENTATION'}</span><span>{p.id==='coffee-sales'?'05 SECTIONS':`${p.slides.length.toString().padStart(2,'0')} SLIDES`} <ArrowUpRight size={17}/></span></span></button><div className="project-info"><span className="eyebrow muted">{p.category}</span><h3>{p.title}</h3>{p.subtitle&&<p className="project-subtitle">{p.subtitle}</p>}<p>{p.description}</p><div className="card-bottom"><span>{p.technologies.length?p.technologies.join(' · '):'Tech stack to be added'}</span><button className="text-link" onClick={()=>open(p.id)}>{p.cardAction || "View Project"} <ArrowUpRight size={17}/></button></div>{validRepository(p.repository)&&<a className="text-link" href={p.repository} target="_blank" rel="noreferrer">GitHub <GitFork size={15}/></a>}</div></motion.article>)}</AnimatePresence></motion.div><div className="collection-note"><span className="status-dot"/> Projects marked as placeholders are awaiting content.</div></section>

 <section id="about" className="about-section"><motion.div {...reveal}><span className="eyebrow">02 / ABOUT ME</span><h2>About Me</h2><p>{profile.about}</p><div className="about-facts">{[['Interests',profile.interests],['Next steps',profile.goals]].map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></motion.div><div className="profile-frame"><Media src={profile.image} alt={profile.image?"Portfolio owner portrait":"Profile photo placeholder"}/></div></section>

 <section id="education" className="simple-section"><div><span className="eyebrow">EDUCATION</span><h2>Education</h2></div><div>{education.map(e=><article className="timeline-item education-item" key={e.institution}><span className="eyebrow">{e.period}</span><h3>{e.institution}</h3><h4>{e.degree}</h4><p className="education-grade">Grade: {e.grade}</p><p>{e.detail}</p></article>)}</div></section>

 <section id="skills"><div className="section-heading"><div><span className="eyebrow">03 / SKILLS</span><h2>Technical Skills</h2></div><p>Skills from my projects and professional experience.</p></div><div className="skill-groups">{skills.map(s=><motion.article {...reveal} key={s.title}><h3>{s.title}</h3><div className="skill-icon-grid">{s.items.map(item=><div className="skill-tile" key={item.name}><span className="skill-symbol"><SkillIcon name={item.icon}/></span><span>{item.name}</span></div>)}</div></motion.article>)}</div></section>

 <section id="experience" className="simple-section"><div><span className="eyebrow">04 / EXPERIENCE</span><h2>Experience</h2></div><div>{experienceGroups.map(group=><section className="experience-group" key={group.organization}><h3 className="experience-organization">{group.organization}</h3>{group.roles.map(e=><article className="timeline-item" key={e.title}><h4>{e.title}</h4><p>{e.description}</p><p className="experience-period">{e.period} · {e.type}</p><ul className="experience-duties">{e.bullets.map(item=><li key={item}>{item}</li>)}</ul><div className="experience-links">{e.certificate&&<a className="pill" href={`${import.meta.env.BASE_URL}${e.certificate}`} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={14}/></a>}</div></article>)}</section>)}</div></section>

 <section id="achievements" className="simple-section"><div><span className="eyebrow">05 / ACHIEVEMENTS</span><h2>Awards & Certificates</h2></div><div className="achievement-list">{achievements.map(a=><article className="achievement" key={a.title}><a className="certificate-preview" href={`${import.meta.env.BASE_URL}${a.certificate}`} target="_blank" rel="noreferrer" aria-label={`View ${a.title} certificate`}><Media src={a.image} alt={`${a.title} certificate recognising Adyan Dean, ${a.period}`}/></a><div className="achievement-copy"><span className="eyebrow">{a.period} · {a.category}</span><h3>{a.title}</h3><p className="achievement-organization">{a.organization}</p><p>{a.description}</p><p>{a.role}</p><a className="button dark" href={`${import.meta.env.BASE_URL}${a.certificate}`} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={16}/></a></div></article>)}</div></section>

 <section id="contact" className="contact-section"><span className="pill contact-kicker">CONTACT <ArrowUpRight size={14}/></span><h2>Contact Me</h2><p>Contact me about data analytics and software development opportunities.</p><div className="contact-links">{profile.phone&&<a className="button dark" href={`tel:${profile.phone}`}><Phone size={18}/>{profile.phone}</a>}{profile.email&&<a className="button dark" href={`mailto:${profile.email}`}><Mail size={18}/>{profile.email}</a>}{profile.github&&<a className="button dark" href={profile.github}><GitFork size={18}/>GitHub</a>}{profile.linkedin&&<a className="button dark" href={profile.linkedin}><Link size={18}/>LinkedIn</a>}{!profile.email&&!profile.github&&!profile.linkedin&&<span className="contact-placeholder"><Mail size={18}/> Contact details coming soon</span>}</div></section></main><footer className="site-footer"><span>{profile.name} / Developer portfolio</span><a href="#home">Back to top <ArrowRight size={15}/></a></footer><AnimatePresence mode="wait">{project&&<Presentation key={project.id} project={project} onClose={close}/>}</AnimatePresence></>;

}

