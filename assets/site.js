(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const header = $('.site-header');
  const back = $('.backtop');
  const progress = $('.scroll-track');
  let scrollPending = false;
  function onScroll(){
    if(scrollPending) return;
    scrollPending=true;
    requestAnimationFrame(()=>{
      const y=window.scrollY;
      header?.classList.toggle('scrolled',y>20);
      back?.classList.toggle('visible',y>500);
      const max=Math.max(1,document.documentElement.scrollHeight-innerHeight);
      if(progress)progress.style.width=`${Math.min(100,y/max*100)}%`;
      scrollPending=false;
    });
  }
  addEventListener('scroll',onScroll,{passive:true});onScroll();
  back?.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
  const drawer=$('#mobile-drawer');
  const toggleMenu = (open) => {
    drawer?.classList.toggle('open',open);
    drawer?.setAttribute('aria-hidden',String(!open));
    $('.menu-trigger')?.setAttribute('aria-expanded',String(open));
    document.body.classList.toggle('menu-open',open);
    if(open) $('.mobile-close')?.focus();
  };
  $('.menu-trigger')?.addEventListener('click',()=>toggleMenu(true));
  $('.mobile-close')?.addEventListener('click',()=>toggleMenu(false));
  drawer?.addEventListener('click',event=>{if(event.target===drawer)toggleMenu(false)});
  $$('.mobile-nav a').forEach(a=>a.addEventListener('click',()=>toggleMenu(false)));
  const overlay=$('#search-overlay'), input=$('#site-search'),results=$('#search-results');
  const entries=[
    ['Home','Our approach to technology and business','index.html'],
    ['About QBranch','Background, mission, vision and company focus','about.html'],
    ['Services','IT installation, networking, surveillance, security and support','services.html'],
    ['Solutions','Business IT management, integration, AI and software','solutions.html'],
    ['Products','Computers, servers, printers, networking and ICT devices','products.html'],
    ['Industries','Corporate, NGOs, public institutions','industries.html'],
    ['Projects & Expertise','Data networking, security, systems and more','projects.html'],
    ['Contact','Get a quotation, Kampala office, email and telephone','contact.html'],
    ['CCTV Installation','HD, IP, PTZ surveillance cameras','services.html#surveillance'],
    ['Biometric Access Control','Door access and time attendance','services.html#access'],
    ['Electric Fencing','Perimeter and facility security','services.html#physical'],
    ['Alarm Systems','Intruder and fire alarms and detectors','services.html#alarms'],
    ['Networking & Structured Cabling','LAN, WLAN and telecom infrastructure','services.html#networks'],
    ['Data Security & Firewalls','Data lifecycle protection and network security','solutions.html#security'],
    ['Managed IT & Monitoring','IT management, traffic monitoring and support','solutions.html#managed'],
    ['Systems Development & AI','Software, data and AI solution exploration','solutions.html#software'],
    ['Video Conferencing','Meeting room and collaboration systems','products.html#conferencing'],
    ['Data Recovery','Recovery and continuity enquiry','solutions.html#recovery']
  ];
  const esc = s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let previousFocus=null;
  const openSearch=()=>{previousFocus=document.activeElement;overlay?.classList.add('open');overlay?.setAttribute('aria-hidden','false');document.body.classList.add('menu-open');if(input){input.value='';input.focus()}renderResults('')};
  const closeSearch=()=>{overlay?.classList.remove('open');overlay?.setAttribute('aria-hidden','true');document.body.classList.remove('menu-open');previousFocus?.focus()};
  $$('.search-trigger').forEach(b=>b.addEventListener('click',openSearch));
  $('.search-close')?.addEventListener('click',closeSearch);
  overlay?.addEventListener('click',event=>{if(event.target===overlay)closeSearch()});
  addEventListener('keydown',event=>{
    if(event.key==='Escape'){if(overlay?.classList.contains('open'))closeSearch();else if(drawer?.classList.contains('open'))toggleMenu(false)}
    if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();openSearch()}
  });
  function renderResults(term){
    if(!results)return;
    const q=term.trim().toLowerCase();
    const hits=entries.filter(x=>!q||(`${x[0]} ${x[1]}`).toLowerCase().includes(q)).slice(0,9);
    results.innerHTML=hits.length?hits.map(x=>`<a href="${esc(x[2])}"><strong>${esc(x[0])}</strong><span>${esc(x[1])}</span></a>`).join(''):'<p>No results found. Try “networking”, “CCTV”, “products”, or “contact”.</p>';
  }
  input?.addEventListener('input',()=>renderResults(input.value));
  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(items=>items.forEach(item=>{if(item.isIntersecting){item.target.classList.add('is-visible');observer.unobserve(item.target)}}),{threshold:.08});
    $$('.reveal').forEach(el=>observer.observe(el));
  }else $$('.reveal').forEach(el=>el.classList.add('is-visible'));
  const filters=$$('.filter[data-filter]');
  filters.forEach(btn=>btn.addEventListener('click',()=>{
    filters.forEach(f=>{f.classList.remove('active');f.setAttribute('aria-pressed','false')});
    btn.classList.add('active');btn.setAttribute('aria-pressed','true');
    const category=btn.dataset.filter;
    $$('[data-product-category]').forEach(card=>{card.hidden=category!=='all'&&card.dataset.productCategory!==category});
  }));
  let toastTimeout;
  const showToast=(message)=>{const toast=$('#toast');if(!toast)return;toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>toast.classList.remove('show'),4300)};
  const form=$('#enquiry-form');
  form?.addEventListener('submit',event=>{
    event.preventDefault();
    if(!form.reportValidity())return;
    const data=new FormData(form);
    const clean=(key)=>String(data.get(key)||'').trim().replace(/[\r\n]{2,}/g,'\n');
    const subject=`QBranch website enquiry — ${clean('service')||'General enquiry'}`;
    const message=[`Name: ${clean('name')}`,`Email: ${clean('email')}`,`Phone: ${clean('phone')||'Not provided'}`,`Organisation: ${clean('company')||'Not provided'}`,`Service: ${clean('service')||'General enquiry'}`,'', 'Project details:',clean('message')].join('\n');
    const link='mailto:sales@qbranch.co.ug?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(message);
    const target=$('#mailto-preview');if(target)target.value=subject+'\n\n'+message;
    const fallback=$('#mail-fallback');if(fallback)fallback.hidden=false;
    const openMail=$('#open-email');if(openMail)openMail.href=link;
    showToast('Enquiry prepared. Open your email app or copy the message below, then press Send.');
  });
  $('#copy-enquiry')?.addEventListener('click',async()=>{
    const t=$('#mailto-preview')?.value||'';
    try{await navigator.clipboard.writeText(t);showToast('Enquiry copied. Paste it into an email to sales@qbranch.co.ug.')}catch{const ta=$('#mailto-preview');ta?.select();showToast('Select and copy the prepared enquiry below.')}
  });
  $$('a[href^="mailto:"]').forEach(a=>a.setAttribute('rel','noopener'));
})();