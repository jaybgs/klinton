"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export function SiteMotion(){
 const pathname=usePathname();
 useEffect(()=>{
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");
  if(reduced.matches)return;
  const seen=new WeakSet<Element>();const animations=new Set<Animation>();
  const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{
   if(!entry.isIntersecting)return;
   observer.unobserve(entry.target);
   const row=entry.target.classList.contains("nadon-masonry-row");
   const targets=row?Array.from(entry.target.children):[entry.target];
   targets.forEach((target,i)=>{
    const animation=target.animate([{opacity:0,transform:"translateY(24px)"},{opacity:1,transform:"translateY(0)"}],{duration:750,delay:row?i*90:0,easing:"cubic-bezier(.22,1,.36,1)",fill:"backwards"});
    animations.add(animation);animation.finished.then(()=>animations.delete(animation)).catch(()=>{});
   });
  })},{threshold:0.08});
  const scan=()=>document.querySelectorAll(".nadon-masonry-row:not(.nadon-masonry-skeleton-row), .nadon-page section, main > section, [data-scroll-reveal]").forEach(el=>{
   if(seen.has(el)||el.closest("[data-reveal-managed]")&&!el.classList.contains("nadon-masonry-row")||el.matches(".nadon-home-hero,.nadon-home-collage")||el.querySelector(".nadon-masonry"))return;
   seen.add(el);observer.observe(el);
  });
  scan();const mutations=new MutationObserver(scan);mutations.observe(document.body,{childList:true,subtree:true});
  const stop=()=>{if(reduced.matches){observer.disconnect();animations.forEach(a=>a.cancel());}};
  reduced.addEventListener("change",stop);
  return()=>{observer.disconnect();mutations.disconnect();animations.forEach(a=>a.cancel());reduced.removeEventListener("change",stop)};
 },[pathname]);
 return null;
}
