/* Scroll-controlled photo/door sequence. One native sticky scene, no external dependencies. */
(() => {
 'use strict';
 const stage=document.querySelector('.cabin-journey');
 if(!stage)return;
 const pin=stage.querySelector('.cabin-sticky');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
 const ramp=(x,a,b)=>{let t=clamp((x-a)/(b-a));return t*t*(3-2*t)};
 let queued=false;
 function update(){
  queued=false;
  if(reduce.matches){pin.style.removeProperty('--cp');return;}
  const rect=stage.getBoundingClientRect();
  const length=Math.max(1,stage.offsetHeight-innerHeight);
  const p=clamp(-rect.top/length);
  // Approach, glass opens, interior text, door re-opens and hands off to services.
  const approach=ramp(p,.02,.25);
  const open=ramp(p,.20,.39)*(1-ramp(p,.56,.68)) + ramp(p,.72,.87);
  const inside=ramp(p,.38,.52)*(1-ramp(p,.70,.80));
  const exit=ramp(p,.69,.87);
  const handoff=ramp(p,.83,.985);
  for(const [name,val] of Object.entries({cp:p,approach,open,inside,exit,handoff}))pin.style.setProperty('--'+name,val.toFixed(4));
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(update)}}
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduce.addEventListener?.('change',schedule);
 update();
})();
