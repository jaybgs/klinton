"use client";
import ScrollVelocity from './components/react-bits/ScrollVelocity/ScrollVelocity';
import ScrollReveal from './components/react-bits/ScrollReveal/ScrollReveal';
import ScrollFloat from './components/react-bits/ScrollFloat/ScrollFloat';
export function StoryMarquee(){return <section className="nadon-story-marquee" aria-label="Honest moments, beautifully remembered"><div aria-hidden="true"><ScrollVelocity texts={['Honest moments. Beautifully remembered.']} velocity={24} fontSize="clamp(30px,5vw,72px)" fontWeight={400} separator=" · " skewWithVelocity={0.025} pauseOnHover fadeEdges/></div></section>}
export function PhilosophyReveal({text}:{text:string}){return <ScrollReveal baseOpacity={0.35} baseRotation={0} enableBlur={false} containerClassName="nadon-philosophy-reveal" textClassName="nadon-philosophy-text">{text}</ScrollReveal>}
export function FloatingTitle({children}:{children:string}){return <ScrollFloat distance={20} stretch={0.1} containerClassName="nadon-floating-title" textClassName="nadon-floating-title-text">{children}</ScrollFloat>}
