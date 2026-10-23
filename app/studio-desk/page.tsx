"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import StatusMark from '../components/react-bits/StatusMark/StatusMark';
import {readInquiries,saveInquiries,brief,responseDraft,type Inquiry} from '../booking-demo';
import s from './desk.module.css';
export default function Desk(){const [items,setItems]=useState<Inquiry[]>([]);const [selected,setSelected]=useState('');const [error,setError]=useState('');const [draft,setDraft]=useState('');const [filter,setFilter]=useState('All');const [query,setQuery]=useState('');const [loaded,setLoaded]=useState(false);const [feedback,setFeedback]=useState('');
 useEffect(()=>{try{setItems(readInquiries());}catch{setError('Unable to read saved demo inquiries.');}finally{setLoaded(true);}},[]);
 const item=items.find(i=>i.id===selected);
 function select(i:Inquiry){setSelected(i.id);setDraft(i.draft ?? responseDraft(i));setFeedback('');}
 function reviewed(){if(!item)return;try{const next=items.map(i=>i.id===item.id?{...i,status:'Reviewed' as const,reviewedAt:new Date().toISOString()}:i);saveInquiries(next);setItems(next);}catch{setError('Unable to save the review.');}}
 function saveDraft(){if(!item)return;try{const next=items.map(i=>i.id===item.id?{...i,draft}:i);saveInquiries(next);setItems(next);setFeedback('Draft saved in this browser.');}catch{setError('Unable to save this draft.');}}
 const visible=items.filter(i=>(filter==='All'||i.status===filter)&&[i.name,i.email,i.type,i.location].join(' ').toLowerCase().includes(query.trim().toLowerCase()));
 function sample(){const example:Inquiry={id:crypto.randomUUID(),name:'Alex Morgan (sample)',email:'alex@example.com',type:'Wedding',date:'2027-06-12',location:'Lagos · sample venue',notes:'An intimate outdoor celebration. Natural portraits, family moments and warm evening light.',status:'New',created:new Date().toISOString()};try{const next=[example,...items];saveInquiries(next);setItems(next);select(example);}catch{setError('Unable to save sample data.');}}
 return <main className={s.shell}>
 <aside className={s.sidebar}>
 <div className={s.studioMark}><span>nk.</span><div>Nadon Klinton<small>STUDIO WORKSPACE</small></div></div>
 <p className={s.navLabel}>YOUR STUDIO</p>
 <nav aria-label="Studio sections">
 <a className={s.activeNav} href="#overview"><span>◫</span> Overview</a>
 <a href="#inquiries"><span>▤</span> Inquiries <small>{items.length}</small></a>
 <a href="#review"><span>✎</span> Review desk</a>
 </nav>
 <div className={s.sidebarNote}><span className={s.dot}/> Local preview<p>A little more space for the work behind the photographs.</p><Link href="/">View your website </Link></div>
 <div className={s.profile}><span>NK</span><div>Nadon Klinton<small>Photographer</small></div></div>
 </aside>
 <div className={s.content}>
 <header className={s.topline}><span>Workspace / <b>Overview</b></span><span className={s.previewBadge}>Browser demo</span></header>
 <section id="overview" className={s.heading}><div><span className={s.eyebrow}>BEHIND THE PHOTOGRAPHS</span><h1>The studio <em>desk.</em></h1><p>Less admin. More room for the moments that matter.</p></div><Link className={s.primary} href="/booking">+ New demo inquiry</Link></section>
 <div data-scroll-reveal className={s.stats}>
 <article><span>Total inquiries <i></i></span><b>{loaded?items.length:'—'}</b><small>Saved in this browser</small></article>
 <article className={s.highlight}><span>Awaiting review <i>◷</i></span><b>{loaded?items.filter(i=>i.status==='New').length:'—'}</b><small>Your next stories to explore</small></article>
 <article><span>Reviewed <i>✓</i></span><b>{loaded?items.filter(i=>i.status==='Reviewed').length:'—'}</b><small>Ready for your next step</small></article>
 </div>
 <div className={s.notice}><span className={s.dot}/><p>Demo workspace. Inquiries and drafts stay in this browser. AI, email and secure sign-in will be connected in Base44.</p></div>
 {error&&<p role="alert" className={s.error}>{error}</p>}
 <div className={s.deskGrid}>
 <section data-scroll-reveal id="inquiries" className={s.panel}>
 <div className={s.panelHeading}><div><span className={s.eyebrow}>YOUR INBOX</span><h2>Incoming stories <small>{items.length}</small></h2></div><button className={s.add} onClick={sample} disabled={!loaded} aria-label="Add fictional sample inquiry">+</button></div>
 <label className={s.search}>Search inquiries<input type="search" placeholder="Search name, email or location…" value={query} onChange={e=>setQuery(e.target.value)}/></label>
 <div className={s.filters} aria-label="Filter inquiries">{['All','New','Reviewed'].map(f=><button key={f} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f==='New'?'Awaiting review':f}</button>)}</div>
 <div className={s.inquiryList}>
 {!loaded?<p role="status">Loading saved inquiries…</p>:items.length===0?<div className={s.empty}><span>✉</span><h3>Your next story starts here.</h3><p>New booking inquiries will arrive in this space.</p><button className={s.secondary} onClick={sample}>Try a sample inquiry</button></div>:visible.length===0?<div className={s.empty}><h3>No matching stories.</h3><p>Try another name or filter.</p><button className={s.secondary} onClick={()=>{setQuery('');setFilter('All');}}>Clear filters</button></div>:null}
 {visible.map(i=><button className={s.inquiry} aria-pressed={selected===i.id} key={i.id} onClick={()=>select(i)}><span className={s.avatar}>{i.name.split(' ').slice(0,2).map(n=>n[0]).join('')}</span><span className={s.inquiryText}><b>{i.name}</b><span>{i.type} · {i.date}</span><small>{i.location}</small></span><span className={s.status} data-new={i.status==='New'}>{i.status==='New'?'New':'Reviewed'}</span></button>)}
 </div><div className={s.listFooter}>Showing {visible.length} of {items.length} inquiries<span>Browser storage</span></div>
 </section>
 <section data-scroll-reveal id="review" className={s.panel}>
 {item?<><div className={s.reviewHeading}><span className={s.eyebrow}>INQUIRY / {item.id.slice(0,8)}</span><StatusMark status={item.status==='New'?'pending':'done'} label={item.status} color="#899778" doneColor="#74865e"/></div><h2 className={s.clientName}>{item.name}</h2><p className={s.email}>{item.email}</p><div className={s.details}><div><small>SESSION</small>{item.type}</div><div><small>REQUESTED DATE</small>{item.date}</div><div><small>LOCATION</small>{item.location}</div></div>
 <details className={s.briefBlock} open><summary>Prepared brief <span>Template</span></summary><pre>{brief(item)}</pre></details>
 <label className={s.draftLabel}>Response draft<span>Make it sound like you.</span><textarea rows={8} value={draft} onChange={e=>setDraft(e.target.value)}/></label>
 <p className={s.hint}>Draft only. Saving or reviewing does not send an email or confirm a booking.</p>
 <div className={s.actions}><button className={s.secondary} onClick={saveDraft}>Save draft</button><button className={s.primary} onClick={reviewed} disabled={item.status==='Reviewed'}>{item.status==='Reviewed'?'Reviewed ✓':'Mark reviewed '}</button></div>
 <p role="status" className={s.feedback}>{feedback}</p>{item.reviewedAt&&<p className={s.hint}>Reviewed {new Date(item.reviewedAt).toLocaleString()}</p>}
 </>:<div className={s.focusEmpty}><span className={s.emptyIcon}>✎</span><span className={s.eyebrow}>THE REVIEW DESK</span><h2>Every story,<br/><em>given a little care.</em></h2><p>Select an inquiry to explore its brief, refine the reply and mark it reviewed.</p><div className={s.workflow}><span>01 · Read the brief</span><span>02 · Make it personal</span><span>03 · Review</span></div></div>}
 </section></div>
 <footer className={s.footer}><span>NADON KLINTON / STUDIO DESK</span><span>Thoughtfully captured. Carefully managed.</span></footer>
 </div></main>;
}



