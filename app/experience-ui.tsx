"use client";
import {useEffect,useState,type ReactNode} from 'react';
import AnimatedContent from './components/react-bits/AnimatedContent/AnimatedContent';
import AccordionGallery from './components/react-bits/AccordionGallery/AccordionGallery';


import PeekRating from './components/react-bits/PeekRating/PeekRating';
import VoicePill from './components/react-bits/VoicePill/VoicePill';
import SlideCommit from './components/react-bits/SlideCommit/SlideCommit';
export function Reveal({children}:{children:ReactNode}){return <AnimatedContent data-reveal-managed distance={28} duration={0.65} threshold={0.08}>{children}</AnimatedContent>}
export function CollectionGallery({items}:{items:{image:string;label:string;link:string;alt?:string}[]}){
 const [mobile,setMobile]=useState(false);
 useEffect(()=>{const m=window.matchMedia('(max-width:640px)');const update=()=>setMobile(m.matches);update();m.addEventListener('change',update);return()=>m.removeEventListener('change',update)},[]);
 return <Reveal><section className="nadon-accordion-collection"><AccordionGallery items={items} defaultIndex={0} height={mobile?Math.max(560,items.length*90):520} orientation={mobile?'vertical':'horizontal'} radius={22} tilt={0} parallax={0.15} grayscale={false} expandRatio={0.5} accentColor="#dce6cb"/></section></Reveal>
}export function RatingSection(){
 const [rating,setRating]=useState(0);const [message,setMessage]=useState('');
 useEffect(()=>{try{const v=Number(localStorage.getItem('nadon-preview-rating'));if(v>=0&&v<=5)setRating(v)}catch{}},[]);
 function rate(v:number){setRating(v);try{localStorage.setItem('nadon-preview-rating',String(v));setMessage(v?'Your preview rating is saved on this device.':'Preview rating cleared.')}catch{setMessage('This browser could not save the rating.')}}
 return <Reveal><section className="nadon-rating-section"><div><span>YOUR PERSPECTIVE</span><h2>A little feedback.<br/><em>A better experience.</em></h2><p>Rate this website preview. Client review submissions will come with Base44.</p></div><div><PeekRating value={rating} onChange={rate} activeColor="#8a996e" idleColor="#b6beaa" tipColor="#303a2e" labels={['Needs work','Fair','Good','Lovely','Excellent']} ariaLabel="Rate this website preview"/><p role="status">{message||'Only your own rating; no public score.'}</p></div></section></Reveal>
}
export function VoiceNotePreview(){const [message,setMessage]=useState('Interaction preview only — no microphone, recording or upload.');return <div className="nadon-voice-preview"><VoicePill reactive="simulated" mode="toggle" accentColor="#9da986" background="#303a2e" ariaLabel="Try voice note animation" onStart={()=>setMessage('Preview animation playing. No audio is being recorded.')} onStop={()=>setMessage('Preview stopped. Voice messages will be connected in Base44.')}/><div><b>Prefer to tell your story?</b><p role="status">{message}</p></div></div>}
export function PaymentPreview(){const [done,setDone]=useState(false);return <details className="nadon-payment-preview"><summary>Future deposit experience · preview</summary><p>Pricing and payment processing will be connected in Base44. This demonstration cannot charge you or reserve a date.</p><SlideCommit label="Slide to try the preview" doneLabel="Preview complete" onConfirm={()=>setDone(true)} width={260} trackColor="#e4e9db" handleColor="#36452f" successColor="#758764"/><p role="status">{done?'No payment taken. No booking confirmed.':'Keyboard: focus the slider and use the right arrow, or End to complete.'}</p></details>}





