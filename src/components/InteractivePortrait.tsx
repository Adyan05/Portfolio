import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Media } from './Placeholder';
export default function InteractivePortrait({src}:{src:string}) {
 const [colour,setColour]=useState(false);const reduced=useReducedMotion();
 return <motion.button type="button" className={`hero-portrait interactive-portrait ${colour?'portrait-colour':''}`} aria-label="Show portrait in colour" aria-pressed={colour} onClick={()=>setColour(!colour)} whileHover={reduced?{}:{scale:1.025,rotate:1}} whileTap={reduced?{}:{scale:.985}} transition={{duration:.25}}><Media src={src} alt="Adyan Dean"/><span className="portrait-interaction-hint">{colour?'Click for monochrome':'Click for colour'}</span></motion.button>;
}
