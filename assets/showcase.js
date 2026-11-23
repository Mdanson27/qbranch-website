/* QBranch media and interaction upgrades: source material uses actual business categories, never invented case studies. */
(() => {
  'use strict';
  const $=(q,root=document)=>root.querySelector(q), $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
  const base='assets/visuals/';
  const art={
    network:'network.svg',telecom:'telecom.svg',security:'security.svg',surveillance:'surveillance.svg',access:'access.svg',
    fence:'fence.svg',cloud:'cloud.svg',payments:'payments.svg',products:'products.svg',workplace:'workplace.svg'
  };
  // Curated one-to-one image assignments. No image is reused anywhere else on the site.
  // Non-photographed categories retain their real service icon, not an arbitrary stock placeholder.
  const page=document.body.dataset.page||'';
  const servicePhotos={
    index:{
      'Networking & Telecommunication':'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1080&q=83',
      'CCTV & Smart Security':'https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1080&q=83',
      'Managed IT & Support':'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1080&q=83',
      'Hardware & ICT Supply':'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1080&q=83',
      'Data & Network Security':'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=1080&q=83',
      'Software & Intelligent Systems':'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1080&q=83'
    }
  };
  const productPhotos={
    index:{
      'Computers & Workstations':'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1000&q=83',
      'Servers & Networking':'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1000&q=83'
    },
    products:{
      'Computers & Laptops':'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=83',
      'Business Servers':'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=83',
      'Networking Equipment':'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1000&q=83'
    }
  };
  const fallback=(kind)=>base+(art[kind]||art.workplace);
  function mediaFor(source,card) {
    if(!source)return null;
    const frame=document.createElement('div');frame.className='experience-media';
    const img=document.createElement('img');img.src=source;img.alt='Illustrative photo relevant to the listed technology category';
    img.decoding='async';img.loading='lazy';
    img.addEventListener('error',()=>{frame.remove();card.classList.add('no-card-photo')},{once:true});
    frame.append(img);return frame;
  }
  const classify=(txt)=>{
    const t=(txt||'').toLowerCase();
    if(/cctv|camera|surveillance|video security/.test(t))return 'surveillance';
    if(/access|biometric|fingerprint|attendance/.test(t))return 'access';
    if(/electric|fenc|perimeter/.test(t))return 'fence';
    if(/payment|money transfer|transaction/.test(t))return 'payments';
    if(/firewall|cyber|data security|protect/.test(t))return 'security';
    if(/cloud|data recover|backup/.test(t))return 'cloud';
    if(/network|cabl|telecommun|internet|wifi|router|connectivity/.test(t))return 'network';
    if(/alarm/.test(t))return 'security';
    if(/computer|laptop|printer|hardware|equipment|products|tablet|office tech/.test(t))return 'products';
    if(/managed|support|solution|software|digital|artificial|ai|system|database/.test(t))return 'workplace';
    return 'telecom';
  };
  const extra={
    network:['Structured cabling and connection planning','Reliable day-to-day access to business systems','A clear path from installation to support'],
    security:['Review data and network protection needs','Consider threats, configuration and continuity','Choose the right security approach for your organisation'],
    surveillance:['Discuss camera coverage and monitoring requirements','Consider site layout and appropriate recording equipment','Plan fitting, setup and ongoing servicing'],
    access:['Explore card, PIN or biometric entry options','Consider time-attendance and premises controls','Match hardware to the site and staff workflows'],
    fence:['Consider perimeter and physical security','Plan equipment, siting and maintenance needs','Integrate with broader protection measures'],
    cloud:['Consider data continuity and recovery options','Review existing infrastructure and service gaps','Discuss practical solutions for your environment'],
    products:['Choose computing and technology categories','Request appropriate specifications and availability','Discuss installation and ongoing support'],
    workplace:['Understand existing tools and requirements','Connect systems, devices and workflows','Plan a supportable path to implementation'],
    telecom:['Assess communications and connectivity needs','Review equipment and installation options','Plan ongoing maintenance and support'],
    payments:['Discuss digital transaction system requirements','Review secure data handling needs','Explore business software integrations']
  };
  function flipCard(card,kind,title,href,photoUrl){
    const original=[...card.childNodes];card.textContent='';card.classList.add('experience-flip');
    const inner=document.createElement('div');inner.className='flip-inner';
    const front=document.createElement('div');front.className='flip-face flip-front';
    const photo=mediaFor(photoUrl,card);
    if(photo)front.append(photo);else card.classList.add('no-card-photo');
    for(const node of original)front.append(node);
    const id='flip-'+Math.random().toString(36).slice(2,10);
    const frontToggle=document.createElement('button');frontToggle.type='button';frontToggle.className='flip-toggle';frontToggle.textContent='Explore details +';frontToggle.setAttribute('aria-controls',id);frontToggle.setAttribute('aria-expanded','false');
    front.append(frontToggle);
    const back=document.createElement('div');back.id=id;back.className='flip-face flip-back';back.setAttribute('aria-label',title+' detail view');back.setAttribute('aria-hidden','true');
    const kicker=document.createElement('span');kicker.className='experience-kicker';kicker.textContent='HOW WE CAN HELP';
    const h=document.createElement('h3');h.textContent=title;
    const ul=document.createElement('ul');(extra[kind]||extra.workplace).forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.append(li)});
    const actions=document.createElement('div');actions.className='back-actions';
    const a=document.createElement('a');a.href=href||'contact.html';a.textContent='Explore / enquire ↗';
    const backToggle=document.createElement('button');backToggle.type='button';backToggle.className='flip-toggle';backToggle.textContent='← Back';
    actions.append(a,backToggle);back.append(kicker,h,ul,actions);inner.append(front,back);card.append(inner);
    const toggle=()=>{
      const on=card.classList.toggle('is-flipped');frontToggle.setAttribute('aria-expanded',String(on));back.setAttribute('aria-hidden',String(!on));front.inert=on;back.inert=!on; (on?backToggle:frontToggle).focus({preventScroll:true});
    };
    back.inert=true;frontToggle.addEventListener('click',toggle);backToggle.addEventListener('click',toggle);
    card.addEventListener('keydown',e=>{if(e.key==='Escape'&&card.classList.contains('is-flipped')){e.stopPropagation();toggle()}});
  }
  // Home/About interactive cards. Existing links remain and all details are sourced from listed capabilities.
  $$('.service-card').forEach(card=>{
    const title=$('h3',card)?.textContent?.trim()||'ICT service';
    const kind=classify(title);const href=$('a[href]',card)?.getAttribute('href')||'contact.html';flipCard(card,kind,title,href,servicePhotos[page]?.[title]);
  });
  // Existing product cards keep their category filtering and original working links.
  $$('.product-card').forEach(card=>{
    const title=$('h3',card)?.textContent?.trim()||'Business equipment';const kind=classify(title);
    const artBox=$('.product-art',card);const chosen=productPhotos[page]?.[title];
    if(artBox&&chosen){const originalIcon=artBox.firstElementChild?.cloneNode(true);const media=mediaFor(chosen,card);if(media){media.querySelector('img')?.addEventListener('error',()=>{if(originalIcon)artBox.replaceChildren(originalIcon)}, {once:true});artBox.textContent='';artBox.append(media)}}
    else card.classList.add('no-product-photo');
    const body=$('.product-body',card);if(body){const b=document.createElement('button');b.className='quick-look';b.type='button';b.textContent='Quick view +';body.append(b);b.addEventListener('click',()=>openViewer(card,title,kind,b))}
  });
  // Historic project headings are technical focus areas, not verified completed commissions.
  $$('.project-card').forEach(card=>{
    const title=$('h3',card)?.textContent?.trim()||'Technical focus';
    const kind=classify(title);
    flipCard(card,kind,title,'contact.html?service=projects',null);
    const back=$('.flip-back',card);if(back){let note=document.createElement('p');note.textContent='Illustrative focus area — not a verified client case study.';note.style.cssText='font-size:11px;color:#a5c6e9;margin:-3px 0 10px';back.insertBefore(note,$('.back-actions',back))}
  });
  // Detailed service and industry cards intentionally use their existing icons and content.
  let modal=null,lastFocus=null;
  function makeViewer(){if(modal)return modal;modal=document.createElement('div');modal.className='experience-viewer';modal.hidden=true;modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.setAttribute('aria-label','Technology product quick view');modal.innerHTML='<div class="experience-viewer-panel"><button type="button" class="experience-viewer-close" aria-label="Close quick view">×</button><div class="experience-viewer-copy"><span class="experience-kicker">PRODUCT CATEGORY</span><h2></h2><p></p><a class="btn small" href="contact.html?service=products">Enquire about this category ↗</a></div></div>';
    document.body.append(modal);$('.experience-viewer-close',modal).addEventListener('click',closeViewer);modal.addEventListener('click',e=>{if(e.target===modal)closeViewer()});
    document.addEventListener('keydown',e=>{if(modal?.hidden)return;if(e.key==='Escape')closeViewer();if(e.key==='Tab'){const focusables=$$('button,a[href]',modal);if(!focusables.length)return;const first=focusables[0],last=focusables[focusables.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});return modal}
  function openViewer(card,title,kind,trigger){const v=makeViewer();lastFocus=trigger;$('.experience-viewer-copy h2',v).textContent=title;$('.experience-viewer-copy p',v).textContent=$('.product-body p',card)?.textContent?.trim()||'Contact QBranch to confirm availability and technical specifications.';const href=$('.product-body a',card)?.href||'contact.html?service=products';$('.experience-viewer-copy a',v).href=href;v.hidden=false;document.body.classList.add('experience-dialog-open');$('.experience-viewer-close',v).focus()}
  function closeViewer(){if(!modal)return;modal.hidden=true;document.body.classList.remove('experience-dialog-open');lastFocus?.focus()}
  function addShowcase(){
    const main=$('main');if(!main)return;
    // A real, locally hosted silent video reel made from original conceptual illustrations.
    if(document.body.dataset.page==='index'){
      const film=document.createElement('section');film.className='experience-film';film.setAttribute('aria-labelledby','experience-film-heading');
      film.innerHTML=`<div class="container experience-film-layout"><div class="experience-film-copy"><span class="experience-kicker">A CLOSER LOOK AT ICT</span><h2 id="experience-film-heading">Systems that connect. <span style="color:#1173e8">Technology that performs.</span></h2><p>From structured networks and surveillance to access control, business equipment and data protection — explore how QBranch's service areas support connected organisations.</p><div class="clip-tags"><span>Networks</span><span>Surveillance</span><span>Access control</span><span>Security</span><span>Digital workplace</span></div><a class="btn small" href="services.html">Explore technical services ↗</a><p class="experience-film-note">Concept video uses original illustrations; not footage of specific QBranch projects or customers.</p></div><div><div class="experience-film-frame"><video id="qb-experience-video" controls playsinline muted loop preload="metadata" poster="assets/visuals/video-poster.webp" aria-label="QBranch technology capabilities overview: networking, CCTV, access control, cybersecurity and office technology"><source src="assets/visuals/qbranch-capabilities-overview.mp4" type="video/mp4">Your browser does not support embedded video.</video></div><p class="experience-film-note">Tap play to explore the technology overview. No audio is required.</p></div></div>`;
      const first=$('.section.soft-bg',main)||$('.section',main);if(first)first.after(film);else main.append(film);
      const clip=$('#qb-experience-video',film);
      if(clip&&'IntersectionObserver' in window){const vidObserver=new IntersectionObserver(([entry])=>{
        if(!entry.isIntersecting){clip.pause();return}if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches&&!document.hidden)clip.play().catch(()=>{});
      },{threshold:.42});vidObserver.observe(clip);document.addEventListener('visibilitychange',()=>{if(document.hidden)clip.pause()});}
      // Generic CAPABILITY / 01 artwork gallery intentionally removed.
      // The dedicated, correctly named service and product sections carry this information.
    }
    if(document.body.dataset.page==='index'||document.body.dataset.page==='products'){
      const brands=[['hp','HP'],['dell','Dell'],['lenovo','Lenovo'],['acer','Acer'],['asus','ASUS'],['apple','Apple'],['microsoft','Microsoft'],['samsung','Samsung'],['canon','Canon'],['epson','Epson']];
      const wrap=document.createElement('section');wrap.className='technology-brands';wrap.setAttribute('aria-label','Technology brands represented in QBranch product listings');
      const logos=brands.map(([slug,label])=>`<div class="brand-tile"><img src="https://cdn.simpleicons.org/${slug}/1559AE" alt="" loading="lazy" onerror="this.remove()"><span>${label}</span></div>`).join('');
      wrap.innerHTML=`<div class="container"><div class="section-head"><div><span class="experience-kicker">PRODUCT BRAND RANGE</span><h2>Technology brands in the catalogue.</h2></div><p>QBranch's existing catalogue references hardware and technology from established global brands. Ask for current models, pricing and availability.</p></div><div class="brand-row">${logos}</div><p class="brand-qualification">Brand logos are used for product identification only. Listing a brand does not imply an authorised reseller or formal partnership.</p></div>`;
      const foot=$('.footer');if(foot)foot.before(wrap);else main.append(wrap);
    }
  }
  addShowcase();
})();