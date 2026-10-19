(() => {
  'use strict';
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const clamp = (v,a=0,b=1) => Math.max(a,Math.min(b,v));
  const lerp = (a,b,t) => a+(b-a)*t;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const hero = $('.hero'), lineLeft = $('.hero-line-left'), lineRight = $('.hero-line-right');
  const photo = $('.hero-photo'), blurb = $('.hero-blurb'), floatOne = $('.float-photo-one'), floatTwo = $('.float-photo-two');
  const horizontal = $('.horizontal-section'), horizontalIntro = $('.horizontal-intro'), horizontalVisual = $('.horizontal-visual');
  const progress = $('.progress'), header = $('.header'), marquee = $('[data-marquee]');
  let raf = false;
  function update(){
    raf = false;
    const y = window.scrollY, h = window.innerHeight;
    progress.style.width = `${100*y/Math.max(1,document.documentElement.scrollHeight-h)}%`;
    header.classList.toggle('scrolled',y>40);
    if(reduced.matches)return;
    if(hero){
    const rect = hero.getBoundingClientRect();
    const distance = Math.max(1,hero.offsetHeight-h);
    const p = clamp(-rect.top/distance);
    // Dramatic opposing text movement (driven by actual scroll position).
    const side = Math.min(window.innerWidth*.78,1000);
    lineLeft.style.transform = `translate3d(${(-side*p).toFixed(1)}px,${(-12*p).toFixed(1)}px,0)`;
    lineRight.style.transform = `translate3d(${(side*.9*p).toFixed(1)}px,${(24*p).toFixed(1)}px,0)`;
    photo.style.transform = `scale(${(1.08+.24*p).toFixed(3)}) translate3d(${(-3*p).toFixed(2)}%,${(5*p).toFixed(2)}%,0)`;
    blurb.style.transform = `translate3d(${(-110*p).toFixed(1)}px,${(-170*p).toFixed(1)}px,0)`;
    blurb.style.opacity = String(clamp(1-p*2.2));
    const appear1 = clamp((p-.12)/.35), appear2 = clamp((p-.35)/.37);
    floatOne.style.opacity = String(appear1);
    floatOne.style.transform = `translate3d(${(-35*p).toFixed(1)}px,${lerp(100,-70,appear1).toFixed(1)}px,0) rotate(${lerp(6,-6,p).toFixed(1)}deg) scale(${lerp(.82,1.07,appear1).toFixed(2)})`;
    floatTwo.style.opacity = String(appear2);
    floatTwo.style.transform = `translate3d(${(75*p).toFixed(1)}px,${lerp(110,-110,appear2).toFixed(1)}px,0) rotate(${lerp(-10,7,p).toFixed(1)}deg) scale(${lerp(.75,1.04,appear2).toFixed(2)})`;
    }
    if(marquee){const mr=marquee.parentElement.getBoundingClientRect();if(mr.bottom>0&&mr.top<h)marquee.style.transform=`translate3d(${-((y-(hero?.offsetHeight||0))*.24).toFixed(1)}px,0,0)`;}
    $$('.parallax-image').forEach(el=>{const r=el.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<h)el.style.transform=`translate3d(0,${((r.top+r.height*.5-h*.5)*-.15).toFixed(1)}px,0) scale(1.08)`});
    if(horizontal && horizontalIntro && horizontalVisual){const hr=horizontal.getBoundingClientRect();if(hr.bottom>0&&hr.top<h){const q=clamp(-hr.top/Math.max(1,horizontal.offsetHeight-h));horizontalIntro.style.transform=`translate3d(${(-Math.min(window.innerWidth*.82,1000)*q).toFixed(1)}px,0,0)`;horizontalIntro.style.opacity=String(clamp(1-q*1.6));horizontalVisual.style.transform=`perspective(1100px) translate3d(${lerp(120,-70,q).toFixed(1)}px,0,0) rotateY(${lerp(-16,8,q).toFixed(1)}deg) scale(${lerp(.86,1.06,q).toFixed(2)})`;} }
  }
  function requestUpdate(){if(!raf){raf=true;requestAnimationFrame(update)}}
  addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',requestUpdate,{passive:true});reduced.addEventListener?.('change',requestUpdate);requestUpdate();
  const observer = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>observer.observe(el));
  const menu=$('.menu-button'), mobile=$('.mobile-nav');function closeMenu(){mobile.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu')}menu.addEventListener('click',()=>{const open=mobile.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close menu':'Open menu')});$$('.mobile-nav a').forEach(a=>a.addEventListener('click',closeMenu));
  $('#year').textContent=new Date().getFullYear();
  $('#contact-form')?.addEventListener('submit',e=>{e.preventDefault();const f=e.currentTarget;if(!f.reportValidity())return;const v=new FormData(f);const recipient='hello@example.com';const subject=`Beyond The Stories — ${v.get('interest')} enquiry`;const body=`Name: ${v.get('name')}\nEmail: ${v.get('email')}\nInterested in: ${v.get('interest')}\n\n${v.get('message')}`;location.href=`mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`});

  // Keep broken external photos from leaving a blank panel; a CSS background remains visible.
  $$('img').forEach(img=>img.addEventListener('error',()=>{img.style.opacity='0';img.parentElement?.classList.add('photo-unavailable')}));
})();
