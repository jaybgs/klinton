"use client";
import {useState, useEffect, type FormEvent} from 'react';
import Link from 'next/link';
import Stepper, {Step} from '../components/react-bits/Stepper/Stepper';
import GlideSelect from '../components/react-bits/GlideSelect/GlideSelect';
import StatusMark from '../components/react-bits/StatusMark/StatusMark';
import {VoiceNotePreview,PaymentPreview} from '../experience-ui';
import {readInquiries,saveInquiries,type Inquiry} from '../booking-demo';
import s from '../booking-ui.module.css';
export default function Booking(){
 const [ready,setReady]=useState(false);useEffect(()=>setReady(true),[]);
 const [step,setStep]=useState(0);const [done,setDone]=useState('');const [error,setError]=useState('');
 const [data,setData]=useState({name:'',email:'',type:'Wedding',date:'',location:'',notes:''});
 const update=(field:string,value:string)=>setData(current=>({...current,[field]:value}));
 function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();setError('');if(step<2){const fields=new FormData(e.currentTarget);setData(current=>({...current,...Object.fromEntries(fields.entries())}));setStep(step+1);return;}if(!data.date||!data.location.trim()){setStep(0);setError('Please complete the date and location.');return;}try{const item:Inquiry={...data,id:crypto.randomUUID(),status:'New',created:new Date().toISOString()};saveInquiries([item,...readInquiries()]);setDone(item.id);}catch{setError('This browser could not save the inquiry. Please allow local storage and try again.');}}
 return <main className={s.page}><div className={s.notice}>FRONTEND PREVIEW · Sample details only. Saved in this browser; no email is sent.</div><div className={s.layout}><aside data-scroll-reveal className={s.intro}><span className={s.eyebrow}>LET’S CREATE SOMETHING PERSONAL</span><h1>Your story.<br/><em>Our next frame.</em></h1><p>A celebration, a new chapter, or simply a moment you want to hold on to. Tell me a little about it.</p><Stepper step={done?4:step+1} showFooter={false} disableStepIndicators theme="light" accentColor="#74865e" frame={false} indicator="numbers" className="nadon-booking-stepper"><Step title="The occasion"/><Step title="Your details"/><Step title="The little things"/></Stepper><small>Submitting an inquiry does not reserve a date. Availability and pricing are confirmed personally.</small></aside>
 <section data-scroll-reveal className={s.panel}>{done?<div role="status"><StatusMark status="done" label="Demo inquiry saved" doneColor="#74865e"/><h2>A beautiful<br/><em>beginning.</em></h2><p>Your sample inquiry is ready in the studio desk on this browser. No booking has been confirmed and no message has been sent.</p><p className={s.reference}>Reference: {done.slice(0,8)}</p><Link className={s.primary} href="/studio-desk">View studio desk </Link><PaymentPreview/></div>:<form key={step} onSubmit={submit}><span className={s.eyebrow}>STEP 0{step+1} / 03</span><h2>{['What brings you here?','Let’s get acquainted.','Make it yours.'][step]}</h2>
 {step===0&&<><div className="nadon-session-select"><span>Session type</span><input type="hidden" name="type" value={data.type}/><GlideSelect options={['Wedding','Pre-wedding','Portrait','Family','Editorial','Birthday']} value={data.type} onChange={v=>update('type',v)} ariaLabel="Session type" size="lg" radius={16} accentColor="#74865e" surfaceColor="#f2f1e9" highlightColor="#e0e6d4" textColor="#303a2e"/></div><label>Preferred date<input name="date" required type="date" value={data.date} min={new Date().toLocaleDateString('en-CA')} onChange={e=>update('date',e.target.value)}/></label><label>City or venue<input name="location" required maxLength={160} value={data.location} onChange={e=>update('location',e.target.value)} placeholder="Where is your story unfolding?"/></label></>}
 {step===1&&<><label>Your name<input name="name" required autoComplete="name" maxLength={100} value={data.name} onChange={e=>update('name',e.target.value)} placeholder="Your name"/></label><label>Email address<input name="email" required type="email" autoComplete="email" maxLength={200} value={data.email} onChange={e=>update('email',e.target.value)} placeholder="you@example.com"/></label><p>For this preview, please use fictional contact details.</p></>}
 {step===2&&<><label>Tell me about your plans<textarea maxLength={3000} rows={5} value={data.notes} onChange={e=>update('notes',e.target.value)} placeholder="The feeling, the people, the details that matter…"/></label><VoiceNotePreview/><div className={s.summary}><b>{data.type}</b><span>{data.date} · {data.location}</span><span>{data.name} · {data.email}</span><span>Package and pricing: to be discussed</span></div><label className={s.check}><input type="checkbox" required/>I understand this is a browser-only demo, not a real booking.</label></>}
 {error&&<p role="alert">{error}</p>}<div className={s.actions}>{step>0?<button type="button" onClick={()=>setStep(step-1)}>← Back</button>:<span/>}<button className={s.primary} type="submit" disabled={!ready}>{step===2?'Save demo inquiry':'Continue'} </button></div></form>}</section></div></main>;
}







