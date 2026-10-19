/* Beyond The Stories — scroll-driven cinema, homepage only.
   One RAF loop, per-element progress, reversible animations; no layout changes. */
(() => {
  'use strict';
  const root = document.querySelector('main.story-flow');
  if (!root) return;
  const q = (s) => [...root.querySelectorAll(s)];
  const clamp = (n, a=0, b=1) => Math.min(b, Math.max(a, n));
  const mix = (a,b,t) => a+(b-a)*t;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const stage = [
    {node:root.querySelector('.about-journey'), start:.94, end:-.94},
    {node:root.querySelector('.photo-break'), start:.94, end:-.94},
    {node:root.querySelector('.offerings'), start:.94, end:-.94},
    {node:root.querySelector('.featured-work'), start:.94, end:-.94},
    {node:root.querySelector('.contact'), start:.94, end:-.94}
  ];
  const nodes = {
    aboutTitle:root.querySelector('.about-journey .large-title'),
    aboutEm:root.querySelector('.about-journey .large-title em'),
    aboutCopy:root.querySelector('.about-under'),
    aboutPhoto:root.querySelector('.about-atmosphere'),
    approachLogo:root.querySelector('.approach-logo-rotator'),
    approachLogoNote:root.querySelector('.approach-logo-note'),
    scenePhoto:root.querySelector('.photo-break-image'),
    sceneText:root.querySelector('.photo-break-text'),
    offerHead:root.querySelector('.offer-head'),
    cards:q('.offer-card'),
    cardPhotos:q('.offer-photo img'),
    workHead:root.querySelector('.work-heading'),
    workCards:q('.feature-editorial'),
    workPhotos:q('.feature-image img'),
    contactHead:root.querySelector('.contact-grid > div:first-child'),
    contactForm:root.querySelector('.contact-form'),
    meta:q('.section-meta')
  };
  const set = (el, prop, value) => {if(el) el.style.setProperty(prop,value)};
  const update = () => {
    const H = window.innerHeight;
    const mobile = window.innerWidth < 760;
    const small = mobile ? .62 : 1;
    // 0 at viewport entrance, 1 at viewport exit.
    const travel = el => {
      if (!el) return .5;
      const r=el.getBoundingClientRect();
      return clamp((H-r.top)/(H+r.height));
    };
    // A more visible entrance: 0 before entry, 1 by the section's upper third.
    const reveal = el => {
      if(!el)return 1;
      const r=el.getBoundingClientRect();
      return clamp((H*.95-r.top)/(H*.64));
    };
    const frame = el => {
      const p=travel(el);
      const center=(p-.5)*2;
      return {p,center};
    };
    if(reduce.matches){
      root.classList.add('cinematic-reduced');
      return;
    }
    root.classList.remove('cinematic-reduced');
    const approach=stage[0].node;
    if(approach){
      const rect=approach.getBoundingClientRect();
      const distance=Math.max(1,approach.offsetHeight-H);
      // 0 when the approach scene first reaches the viewport; 1 when it releases.
      const progress=clamp(-rect.top/distance);
      const smooth=t=>t*t*(3-2*t);
      const drop=smooth(clamp((progress-.025)/.68));
      const tail=smooth(clamp((progress-.72)/.28));
      const fallDistance=mobile?Math.min(H*.56,370):Math.min(H*.76,690);
      // The mark falls from above the top edge, rotates, and docks in the left rail.
      set(nodes.approachLogo,'--logo-y',`${(-fallDistance*(1-drop)+tail*13).toFixed(1)}px`);
      set(nodes.approachLogo,'--logo-x',`${((mobile?-16:-50)*(1-drop)).toFixed(1)}px`);
      set(nodes.approachLogo,'--logo-rotate',`${(-125*(1-drop)+tail*3).toFixed(2)}deg`);
      set(nodes.approachLogo,'--logo-scale',`${(.72+.28*drop).toFixed(3)}`);
      set(nodes.approachLogo,'--logo-opacity',`${clamp(progress*12).toFixed(3)}`);
      set(nodes.approachLogoNote,'--logo-note-opacity',`${clamp((progress-.39)*5).toFixed(3)}`);
      set(nodes.approachLogoNote,'--logo-note-y',`${(18*(1-drop)).toFixed(1)}px`);
      // Separate scroll lanes for type and supporting text, without moving content offscreen.
      const word=smooth(clamp((progress-.14)/.65));
      set(nodes.aboutTitle,'--cx',`${((1-word)*32*small-tail*15*small).toFixed(1)}px`);
      set(nodes.aboutEm,'--cx',`${(-(1-word)*52*small+tail*22*small).toFixed(1)}px`);
      set(nodes.aboutCopy,'--cy',`${((1-word)*42*small-tail*20*small).toFixed(1)}px`);
      set(nodes.aboutPhoto,'--cy',`${(-45*progress*small).toFixed(1)}px`);
      set(nodes.aboutPhoto,'--scale',`${(1.13+.10*progress).toFixed(3)}`);
    }
    // The cabin journey has a dedicated scroll controller.
    const offers=stage[2].node;
    if(offers){
      const {center}=frame(offers);
      set(nodes.offerHead,'--cx',`${(-75*center*small).toFixed(1)}px`);
      set(nodes.offerHead,'--cy',`${(-38*center*small).toFixed(1)}px`);
    }
    nodes.cards.forEach((el,i)=>{
      const enter=reveal(el),{center,p}=frame(el);
      const shift=(i===0?-1:1)*46*center*small;
      set(el,'--cx',`${(shift).toFixed(1)}px`);
      set(el,'--cy',`${(mix(115,0,enter)-center*42*small).toFixed(1)}px`);
      set(el,'--tilt',`${(mobile?0:(i===0?-1:1)*(1-enter)*10+center*3).toFixed(2)}deg`);
      set(el,'--scale',`${(.90+enter*.10).toFixed(3)}`);
      set(el,'--alpha',`${(.64+enter*.36).toFixed(3)}`);
      const img=nodes.cardPhotos[i];
      set(img,'--cy',`${(-100*center*small).toFixed(1)}px`);
      set(img,'--scale',`${(1.32+.04*p).toFixed(3)}`);
    });
    const work=stage[3].node;
    if(work){ const {center}=frame(work);
      set(nodes.workHead,'--cx',`${(78*center*small).toFixed(1)}px`);
      set(nodes.workHead,'--cy',`${(-34*center*small).toFixed(1)}px`);
    }
    nodes.workCards.forEach((el,i)=>{
      const enter=reveal(el),{center}=frame(el);
      set(el,'--cx',`${((i===0?-1:1)*38*center*small).toFixed(1)}px`);
      set(el,'--cy',`${(mix(100,0,enter)-35*center*small).toFixed(1)}px`);
      set(el,'--tilt',`${mobile?0:((i===0?-1:1)*(1-enter)*8).toFixed(2)}deg`);
      set(el,'--scale',`${(.93+.07*enter).toFixed(3)}`);
      const img=nodes.workPhotos[i];
      set(img,'--cy',`${(-78*center*small).toFixed(1)}px`);
    });
    const contact=stage[4].node;
    if(contact){
      const {center}=frame(contact);
      set(nodes.contactHead,'--cx',`${(-60*center*small).toFixed(1)}px`);
      set(nodes.contactHead,'--cy',`${(-36*center*small).toFixed(1)}px`);
      set(nodes.contactForm,'--cy',`${(60*center*small).toFixed(1)}px`);
    }
    nodes.meta.forEach(el=>{ const {center}=frame(el);
      set(el,'--cy',`${(-16*center*small).toFixed(1)}px`);
    });
  };
  let scheduled=false;
  const schedule=()=>{
    if(scheduled)return;
    scheduled=true;
    requestAnimationFrame(()=>{scheduled=false;update()});
  };
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  reduce.addEventListener?.('change',schedule);
  document.fonts?.ready.then(schedule).catch(()=>{});
  update();
})();
