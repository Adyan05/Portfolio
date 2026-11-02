import { Media } from './Placeholder';
export default function InteractivePortrait({src}:{src:string}) {
 return <div className="hero-portrait monochrome-portrait"><Media src={src} alt="Adyan Dean"/></div>;
}
