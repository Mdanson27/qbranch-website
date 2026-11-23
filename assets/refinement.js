/* QBranch — grounded geographical globe animation (Natural Earth country outlines). */
(() => {
  'use strict';
  const canvas = document.getElementById('qb-earth');
  if (!canvas) return;
  const frame = canvas.parentElement;
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let land = [], width = 0, height = 0, dpr = 1, running = false, visible = true;
  let raf = 0, start = 0, last = 0;
  const RADIANS = Math.PI / 180;
  const uganda = [32.29, 1.37];
  const clamp = n => Math.max(0, Math.min(1, n));
  function resize() {
    const r = canvas.getBoundingClientRect();
    width = Math.max(1, r.width);
    height = Math.max(1, r.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    paint(performance.now());
  }
  function drawLine(coords, project, color, lineWidth, fillColor) {
    let segments = 0;
    ctx.beginPath();
    for (const ring of coords) {
      let drawing = false, started = false;
      for (const point of ring) {
        const p = project(point[0], point[1]);
        if (!p.visible) { drawing = false; continue; }
        if (!drawing) { ctx.moveTo(p.x, p.y); drawing = true; started = true; }
        else ctx.lineTo(p.x, p.y);
      }
      if (started) { ctx.closePath(); segments++; }
    }
    if (!segments) return;
    if (fillColor) { ctx.fillStyle = fillColor; ctx.fill(); }
    if (lineWidth) { ctx.strokeStyle = color; ctx.lineWidth = lineWidth; ctx.stroke(); }
  }
  function paint(now) {
    if (!width || !height) return;
    ctx.clearRect(0, 0, width, height);
    const radius = Math.min(width * .405, height * .43);
    const cx = width * .50, cy = height * .495;
    if (radius < 20) return;
    const elapsed = reduced.matches ? 2600 : Math.max(0, now - start);
    // A deliberate reveal turning the globe toward Africa, then a nearly stationary float.
    const turn = clamp(elapsed / 2700);
    const eased = turn * turn * (3 - 2 * turn);
    const centerLon = (3 + eased * 29 + (reduced.matches ? 0 : Math.sin(elapsed / 8100) * 1.2)) * RADIANS;
    const centerLat = 9 * RADIANS;
    const slat = Math.sin(centerLat), clat = Math.cos(centerLat);
    const project = (lon,lat) => {
      const phi = lat * RADIANS, diff = lon * RADIANS - centerLon;
      const co = Math.cos(phi), si = Math.sin(phi);
      const depth = slat * si + clat * co * Math.cos(diff);
      return {x:cx + radius * co * Math.sin(diff), y:cy-radius*(clat*si-slat*co*Math.cos(diff)),visible:depth>0.018,depth};
    };
    // Gentle outer atmospheric light.
    const halo = ctx.createRadialGradient(cx,cy,radius*.62,cx,cy,radius*1.30);
    halo.addColorStop(0,'rgba(30,130,255,.0)'); halo.addColorStop(.62,'rgba(19,144,255,.18)'); halo.addColorStop(1,'rgba(5,38,105,0)');
    ctx.fillStyle=halo;ctx.beginPath();ctx.arc(cx,cy,radius*1.29,0,Math.PI*2);ctx.fill();
    const ocean=ctx.createRadialGradient(cx-radius*.33,cy-radius*.5,radius*.1,cx,cy,radius*1.1);
    ocean.addColorStop(0,'#124d87'); ocean.addColorStop(.45,'#0a315d');ocean.addColorStop(1,'#03132d');
    ctx.fillStyle=ocean;ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.fill();
    ctx.save();ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);ctx.clip();
    // Latitude / longitude wireframe is a genuine projected 3D graticule.
    for (let lat=-75;lat<=75;lat+=15) {
      ctx.beginPath();let drawing=false;
      for(let lon=-180;lon<=180;lon+=3){const p=project(lon,lat);if(!p.visible){drawing=false;continue}if(!drawing){ctx.moveTo(p.x,p.y);drawing=true}else ctx.lineTo(p.x,p.y)}
      ctx.strokeStyle='rgba(75,175,245,.15)';ctx.lineWidth=.8;ctx.stroke();
    }
    for (let lon=-180;lon<=180;lon+=15) {
      ctx.beginPath();let drawing=false;
      for(let lat=-88;lat<=88;lat+=3){const p=project(lon,lat);if(!p.visible){drawing=false;continue}if(!drawing){ctx.moveTo(p.x,p.y);drawing=true}else ctx.lineTo(p.x,p.y)}
      ctx.strokeStyle='rgba(75,175,245,.15)';ctx.lineWidth=.8;ctx.stroke();
    }
    // Actual Natural Earth outlines; Africa lights up rather than a fictional map silhouette.
    for (const [code,isAfrica,polygons] of land) {
      for (const polygon of polygons) {
        drawLine(polygon,project,isAfrica?'rgba(100,204,255,.56)':'rgba(83,138,185,.32)',isAfrica?.85:.45,
          code==='UGA'?'#35efec':isAfrica?'#1a6799':'#163955');
      }
    }
    // Light falls from upper-left, atmosphere from lower-right.
    const shade=ctx.createLinearGradient(cx-radius,cy-radius,cx+radius,cy+radius);
    shade.addColorStop(0,'rgba(133,220,255,.12)');shade.addColorStop(.5,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(0,5,24,.44)');
    ctx.fillStyle=shade;ctx.fillRect(cx-radius,cy-radius,radius*2,radius*2);
    ctx.restore();
    // Uganda geographic marker and light pulses placed at genuine lat/lon.
    const pin=project(...uganda);
    if(pin.visible){
      const pulse=reduced.matches?0.4:((elapsed%2100)/2100);
      for(let n=0;n<3;n++){
        const phase=(pulse+n/3)%1;
        ctx.strokeStyle=`rgba(74,242,237,${(1-phase)*.62})`;
        ctx.lineWidth=1.6;ctx.beginPath();ctx.arc(pin.x,pin.y,9+phase*radius*.36,0,2*Math.PI);ctx.stroke();
      }
      ctx.shadowColor='#6afff5';ctx.shadowBlur=25;
      ctx.fillStyle='#b8fffb';ctx.beginPath();ctx.arc(pin.x,pin.y,5.7,0,2*Math.PI);ctx.fill();ctx.shadowBlur=0;
      const tx=Math.min(width-91,pin.x+19),ty=Math.max(22,pin.y-27);
      ctx.font='800 12px Manrope, sans-serif';ctx.fillStyle='#e7ffff';ctx.fillText('UGANDA',tx,ty);
      ctx.font='600 9px ui-monospace, monospace';ctx.fillStyle='#8dd8fb';ctx.fillText('01°N  32°E',tx,ty+16);
    }
    ctx.strokeStyle='rgba(85,181,255,.43)';ctx.lineWidth=1.6;
    ctx.beginPath();ctx.arc(cx,cy,radius-.4,0,Math.PI*2);ctx.stroke();
    const rim=ctx.createLinearGradient(cx-radius,cy-radius,cx+radius,cy+radius);
    rim.addColorStop(0,'#51b8ff');rim.addColorStop(.48,'rgba(71,168,237,.07)');rim.addColorStop(1,'rgba(49,149,243,.32)');
    ctx.strokeStyle=rim;ctx.lineWidth=3;ctx.beginPath();ctx.arc(cx,cy,radius+1.5,0,Math.PI*2);ctx.stroke();
  }
  function tick(t){if(!running)return;if(t-last>32){paint(t);last=t}raf=requestAnimationFrame(tick)}
  function startMotion(){if(running||!visible||document.hidden||reduced.matches)return;running=true;last=0;raf=requestAnimationFrame(tick)}
  function stopMotion(){running=false;cancelAnimationFrame(raf)}
  new ResizeObserver(resize).observe(frame);
  if('IntersectionObserver'in window)new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)startMotion();else stopMotion()},{threshold:.02}).observe(frame);
  document.addEventListener('visibilitychange',()=>document.hidden?stopMotion():startMotion());
  reduced.addEventListener?.('change',()=>{stopMotion();paint(performance.now());startMotion()});
  window.addEventListener('pagehide',stopMotion,{once:true});
  start=performance.now();resize();startMotion();
  fetch('assets/visuals/world-earth.json',{cache:'force-cache'})
    .then(r=>{if(!r.ok)throw Error('Earth geodata '+r.status);return r.json()})
    .then(data=>{land=data.features||[];paint(performance.now())})
    .catch(()=>{ /* The globe grid, Uganda coordinates and light pulses still work offline. */ });
})();