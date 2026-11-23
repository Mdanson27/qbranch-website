/* QBranch: 5-second accessible binary-to-word assembly. The code forms the actual brand. */
(() => {
  'use strict';
  const root=document.documentElement, intro=document.getElementById('qb-intro');
  if(!intro||!root.classList.contains('qb-intro-enabled'))return;
  const canvas=document.getElementById('qb-intro-canvas'),brand=intro.querySelector('.qb-intro-brand');
  const progress=intro.querySelector('#qb-intro-percent'),skip=intro.querySelector('#qb-intro-skip');
  const ctx=canvas?.getContext('2d',{alpha:true});
  const TOTAL=5000, EXIT_AT=TOTAL-360;
  const rnd=(a,b)=>a+Math.random()*(b-a),clamp=t=>Math.max(0,Math.min(1,t)),ease=t=>t*t*(3-2*t);
  let w=0,h=0,streams=[],particles=[],raf=0,timer=0,ending=false,stopped=false;
  const started=performance.now();
  function assembleWord(){
    if(!brand||!ctx)return [];
    const rect=brand.getBoundingClientRect(),style=getComputedStyle(brand);
    const fontSize=parseFloat(style.fontSize)||80,mask=document.createElement('canvas');
    mask.width=Math.max(1,Math.ceil(rect.width));mask.height=Math.max(1,Math.ceil(rect.height));
    const measure=mask.getContext('2d',{willReadFrequently:true});
    if(!measure)return [];
    measure.font=`800 ${fontSize}px ${style.fontFamily}`;
    if('letterSpacing'in measure)measure.letterSpacing=style.letterSpacing;
    measure.textAlign='center';measure.textBaseline='middle';measure.fillStyle='#000';
    measure.fillText('QBRANCH',mask.width/2,mask.height/2);
    const pixels=measure.getImageData(0,0,mask.width,mask.height).data;
    const size=w<600?5:7,spots=[];
    for(let y=1;y<mask.height;y+=size){for(let x=1;x<mask.width;x+=size){
      if(pixels[(y*mask.width+x)*4+3]>110)spots.push({x:rect.left+x,y:rect.top+y});
    }}
    for(let i=spots.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[spots[i],spots[j]]=[spots[j],spots[i]]}
    return spots.slice(0,w<600?440:950).map((p,i)=>({
      x:p.x,y:p.y,fx:rnd(0,w),fy:rnd(-h*.7,h*.8),
      delay:rnd(65,350),duration:rnd(640,1100),glyph:i%2?'1':'0',alpha:rnd(.74,1)
    }));
  }
  function setup(){
    if(ending||!ctx)return;
    w=innerWidth;h=innerHeight;
    const dpr=Math.min(devicePixelRatio||1,2);
    canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    const count=Math.min(62,Math.max(18,Math.round(w/30)));
    streams=Array.from({length:count},(_,i)=>({
      x:(i+.3+rnd(-.25,.25))*w/count,y:rnd(-h*1.2,0),speed:rnd(80,235),gap:rnd(17,24),
      len:Math.floor(rnd(8,18)),alpha:rnd(.11,.34),size:rnd(10,13),seed:Math.round(rnd(0,400))
    }));
    particles=assembleWord();
  }
  function render(now){
    if(stopped||ending||!ctx)return;
    const t=now-started;
    if(t>=EXIT_AT){finish();return}
    ctx.clearRect(0,0,w,h);
    // Binary background is scenery; only the particles below build the letters.
    const rainOpacity=1-.46*ease(clamp((t-1900)/1800));
    for(const s of streams){
      const span=h+s.len*s.gap+200,firstY=((s.y+(t/1000)*s.speed+span)%span)-s.len*s.gap;
      ctx.font=`600 ${s.size}px ui-monospace,monospace`;ctx.textBaseline='middle';ctx.textAlign='center';
      for(let j=0;j<s.len;j++){
        const y=firstY+j*s.gap;if(y<0||y>h)continue;
        ctx.globalAlpha=s.alpha*rainOpacity*(.25+.75*j/s.len);
        ctx.fillStyle=j===s.len-1?'#0c52c5':'#2476dc';ctx.fillText((s.seed+j)%3?'0':'1',s.x,y);
      }
    }
    // A dense mask of 0 and 1 converges to the very same QBRANCH word position.
    const vanishing=1-ease(clamp((t-1730)/550));
    ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`800 ${w<600?8:10}px ui-monospace,monospace`;
    if(vanishing>0){for(const p of particles){
      let portion=clamp((t-p.delay)/p.duration);if(!portion)continue;
      portion=ease(portion);
      const x=p.fx+(p.x-p.fx)*portion,y=p.fy+(p.y-p.fy)*portion;
      ctx.globalAlpha=p.alpha*Math.min(1,portion*2)*vanishing;
      ctx.fillStyle=portion>.87?'#0754d0':'#378df0';ctx.fillText(p.glyph,x,y);
    }}
    ctx.globalAlpha=1;
    if(progress)progress.textContent=String(Math.min(99,Math.floor(t/EXIT_AT*100))).padStart(2,'0')+'%';
    raf=requestAnimationFrame(render);
  }
  function finish(skipped=false){
    if(ending)return;ending=true;cancelAnimationFrame(raf);clearTimeout(timer);
    if(progress)progress.textContent='100%';intro.classList.add('is-exiting');
    setTimeout(()=>{
      intro.hidden=true;intro.setAttribute('aria-hidden','true');root.classList.remove('qb-intro-enabled');stopped=true;
      if(skipped){const main=document.getElementById('main-content');if(main){main.setAttribute('tabindex','-1');main.focus({preventScroll:true});main.addEventListener('blur',()=>main.removeAttribute('tabindex'),{once:true})}}
    },360);
  }
  skip?.addEventListener('click',()=>finish(true));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!ending)finish(true)});
  addEventListener('pagehide',()=>finish(),{once:true});
  addEventListener('resize',()=>{if(!ending)setup()},{passive:true});
  document.fonts?.ready.then(()=>{if(!ending)setup()}).catch(()=>{});
  setup();raf=requestAnimationFrame(render);
  timer=setTimeout(()=>finish(),EXIT_AT); // ensures unlock if RAF is paused in background tabs.
})();