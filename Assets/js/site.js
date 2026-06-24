/* ============================================================
   MYA — shared layout + behaviour  (EDIT HEADER / NAV / FOOTER + GLOBAL JS HERE)
   Injected into every page's #header, #drawer and #site-footer placeholders.
   ============================================================ */
(function(){
  var HEADER = `
  <div class="wrap bar">
    <nav class="nav-left">
      <ul class="nav-links">
        <li data-nav="home"><a href="index.html">Home</a></li>
        <li class="has-sub" data-nav="newyachts">
          <a href="fleet.html">New Yachts <span class="caret">▼</span></a>
          <ul class="submenu">
            <li><a href="sunseeker.html">Sunseeker</a></li>
            <li><a href="saxdor.html">Saxdor</a></li>
            <li><a href="sealegs.html">Sealegs</a></li>
            <li><a href="fleet.html">View All Models</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    <a href="index.html" class="logo" aria-label="MYA — Motoryachts Australasia home">
      <img src="Assets/Logo_V5.png" alt="MYA — Motoryachts Australasia" class="logo-img">
      <div class="header-tagline-wrap">
        <span class="header-tagline">Motoryachts Australasia</span>
      </div>
    </a>
    <div class="nav-right">
      <ul class="nav-links">
        <li data-nav="preowned"><a href="pre-owned.html">Pre-Owned</a></li>
        <li data-nav="service"><a href="service.html">After-Sales</a></li>
      </ul>
      <div class="nav-cta">
        <a href="contact.html" class="nav-enq">Enquire</a>
      </div>
    </div>
    <button class="burger" id="burger" aria-label="Open menu"><span></span><span></span><span></span></button>
  </div>
`;
  var DRAWER = `
  <a href="index.html" data-close>Home</a>
  <a href="about.html" data-close>About</a>
  <a href="sunseeker.html" data-close>Sunseeker <span>New</span></a>
  <a href="saxdor.html" data-close>Saxdor <span>New</span></a>
  <a href="sealegs.html" data-close>Sealegs <span>New</span></a>
  <a href="fleet.html" data-close>The Fleet</a>
  <a href="pre-owned.html" data-close>Pre-Owned</a>
  <a href="service.html" data-close>After-Sales &amp; Service</a>
  <div class="d-foot">
    <a href="tel:0499770180">+61 499 770 180</a>
    <a href="mailto:james@myaa.com.au">james@myaa.com.au</a>
    <p style="margin-top:12px">26 Rous Head Road, North Fremantle WA</p>
  </div>
`;
  var FOOTER = `
  <div class="wrap">
    <div class="f-top">
      <div class="f-brand">
      <img src="Assets/Logo_V5.png" alt="MYA — Motoryachts Australasia" class="logo-img">
      <p>The official Western Australian dealer for the world's most sought-after yacht and marine brands.</p>
      <div class="dealer-logos">
        <img src="Assets/Sunseeker_Silver_Logo.png" alt="Sunseeker" class="dlr-logo">
        <img src="Assets/Saxdor-Blue-Logo.png" alt="Saxdor" class="dlr-logo">
        <img src="Assets/Sealegs-logo.png" alt="Sealegs" class="dlr-logo">
        <img src="Assets/Pirelli_Speedboat_Logo.png" alt="Pirelli" class="dlr-logo">
        <img src="Assets/Protector_Logo.png" alt="Protector" class="dlr-logo">
      </div>
        <div class="ded">
          Official Dealer · Sunseeker &amp; Saxdor<br>
          Member · DCH Marine Network<br>
          Authorised Mercury Dealer
        </div>
      </div>
      <div class="f-col">
        <h5>Yachts</h5>
        <ul>
          <li><a href="sunseeker.html">Sunseeker</a></li>
          <li><a href="saxdor.html">Saxdor</a></li>
          <li><a href="fleet.html">The Fleet</a></li>
          <li><a href="pre-owned.html">Pre-Owned</a></li>
        </ul>
      </div>
      <div class="f-col">
        <h5>Company</h5>
        <ul>
          <li><a href="about.html">About</a></li>
          <li><a href="brokerage.html">Brokerage</a></li>
          <li><a href="service.html">After-Sales</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="f-col">
        <h5>Contact</h5>
        <p class="cl">
          26 Rous Head Road<br>North Fremantle WA 6159<br><br>
          <a href="tel:0499770180">0499 770 180</a><br>
          <a href="mailto:james@myaa.com.au">james@myaa.com.au</a>
        </p>
      </div>
    </div>
    <div class="f-bottom">
      <p>© 2026 MYA — Motoryachts Australasia. All Rights Reserved.</p>
      <div class="fnav">
        <a href="https://www.instagram.com/motoryachtsaustralasia" target="_blank" rel="noopener">Instagram</a>
        <a href="https://www.facebook.com/motoryachtsaustralasia/" target="_blank" rel="noopener">Facebook</a>
      </div>
    </div>
  </div>
`;
  var h=document.getElementById('header');      if(h && !h.innerHTML.trim()) h.innerHTML=HEADER;
  var d=document.getElementById('drawer');       if(d && !d.innerHTML.trim()) d.innerHTML=DRAWER;
  var f=document.getElementById('site-footer');  if(f && !f.innerHTML.trim()) f.innerHTML=FOOTER;
})();
/* ============================================================
   MYA — shared behaviour
   parallax engine · header · reveals · counters · lightbox · form
   ============================================================ */
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header scroll state + progress ---------- */
  var header = document.getElementById('header');
  var progress = document.getElementById('progress');
  var hero = document.querySelector('.hero');
  function onScroll(){
    var y = window.scrollY || document.documentElement.scrollTop;
    if(header){
      if(hero){ header.classList.toggle('scrolled', y > 40); }
      else { header.classList.add('solid'); }
    }
    if(progress){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y/h)*100 : 0) + '%';
    }
  }

  /* ---------- active nav ---------- */
  var page = document.body.getAttribute('data-page');
  if(page){
    document.querySelectorAll('.nav-links > li[data-nav]').forEach(function(li){
      if(li.getAttribute('data-nav') === page) li.classList.add('active');
    });
  }

  /* ---------- mobile drawer ---------- */
  var burger = document.getElementById('burger');
  var drawer = document.getElementById('drawer');
  if(burger && drawer){
    burger.addEventListener('click', function(){
      var open = drawer.classList.toggle('open');
      burger.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('[data-close]').forEach(function(a){
      a.addEventListener('click', function(){
        drawer.classList.remove('open'); burger.classList.remove('open'); document.body.style.overflow = '';
      });
    });
  }

  /* ---------- reveal on scroll ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  document.querySelectorAll('.reveal, .kicker').forEach(function(el){ io.observe(el); });

  /* ---------- number counters ---------- */
  var counted = new WeakSet();
  var cObs = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if(!e.isIntersecting || counted.has(e.target)) return;
      counted.add(e.target);
      var el = e.target, span = el.querySelector('.c');
      if(el.dataset.plain || !span) return;
      var target = parseInt(el.dataset.count, 10);
      if(reduce){ span.textContent = target; return; }
      var dur = 1700, start = performance.now();
      (function tick(now){
        var p = Math.min((now-start)/dur, 1), eased = 1-Math.pow(1-p,3);
        span.textContent = Math.round(target*eased);
        if(p<1) requestAnimationFrame(tick);
      })(start);
    });
  }, {threshold:0.5});
  document.querySelectorAll('.stat .num').forEach(function(el){ cObs.observe(el); });

  /* ---------- PARALLAX ENGINE ---------- */
  var pxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  var ticking = false;
  function applyParallax(){
    var vh = window.innerHeight;
    for(var i=0;i<pxEls.length;i++){
      var el = pxEls[i];
      var r = el.getBoundingClientRect();
      if(r.bottom < -vh*0.6 || r.top > vh*1.6) continue;
      var speed = parseFloat(el.getAttribute('data-speed')) || 0.18;
      var center = r.top + r.height/2;
      var offset = center - vh/2;
      var ty = (-offset*speed);
      var extra = el.getAttribute('data-px-extra') || '';
      el.style.transform = 'translate3d(0,' + ty.toFixed(1) + 'px,0) ' + extra;
    }
    ticking = false;
  }
  function requestPx(){ if(!ticking){ ticking = true; requestAnimationFrame(applyParallax); } }

  /* combined scroll handler */
  function loop(){ onScroll(); if(!reduce && pxEls.length) requestPx(); }
  window.addEventListener('scroll', loop, {passive:true});
  window.addEventListener('resize', loop, {passive:true});
  loop();
  if(!reduce && pxEls.length) applyParallax();

  /* ---------- LIGHTBOX (galleries) ---------- */
  var lb = document.getElementById('lightbox');
  if(lb){
    var lbImg = lb.querySelector('img');
    var lbCount = lb.querySelector('.lb-count');
    var triggers = [].slice.call(document.querySelectorAll('[data-lb]'));
    var idx = 0;
    function show(i){
      idx = (i + triggers.length) % triggers.length;
      var src = triggers[idx].getAttribute('data-lb');
      lbImg.src = src;
      if(lbCount) lbCount.textContent = (idx+1) + ' / ' + triggers.length;
    }
    function open(i){ show(i); lb.classList.add('open'); document.body.style.overflow='hidden'; }
    function close(){ lb.classList.remove('open'); document.body.style.overflow=''; }
    triggers.forEach(function(t,i){ t.addEventListener('click', function(){ open(i); }); });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function(){ show(idx-1); });
    lb.querySelector('.lb-next').addEventListener('click', function(){ show(idx+1); });
    lb.addEventListener('click', function(e){ if(e.target === lb) close(); });
    document.addEventListener('keydown', function(e){
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      if(e.key==='ArrowLeft') show(idx-1);
      if(e.key==='ArrowRight') show(idx+1);
    });
  }

  /* ---------- contact form (front-end demo) ---------- */
  var form = document.getElementById('enquiry');
  if(form){
    var note = document.getElementById('note');
    var sel = form.querySelector('select');
    if(sel) sel.addEventListener('change', function(){ sel.style.color = sel.value ? 'var(--paper)' : 'var(--muted)'; });
    form.addEventListener('submit', function(ev){
      ev.preventDefault();
      var fn = (form.querySelector('#fn')||{}).value || '';
      var em = (form.querySelector('#em')||{}).value || '';
      fn = fn.trim(); em = em.trim();
      if(!fn || !em){ note.textContent = 'Please add your name and email so we can reply.'; note.classList.add('show'); return; }
      note.textContent = 'Thank you, ' + fn + ' — your enquiry has been received. Our team will be in touch within one business day.';
      note.classList.add('show');
      form.reset();
      if(sel) sel.style.color = 'var(--muted)';
    });
  }
})();