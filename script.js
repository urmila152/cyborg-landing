(function(){
  // ---------- INJECT CYBORG PORTRAIT SVG ----------
  const portraitMount = document.getElementById('hero-portrait');
  portraitMount.innerHTML = `
  <svg viewBox="0 0 420 460" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="faceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#23262E"/>
        <stop offset="100%" stop-color="#13151A"/>
      </linearGradient>
      <radialGradient id="irisGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#FF2A4D"/>
        <stop offset="60%" stop-color="#FF2A4D" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="#FF2A4D" stop-opacity="0"/>
      </radialGradient>
      <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- ambient ring -->
    <circle cx="210" cy="220" r="190" fill="none" stroke="#00FFC2" stroke-opacity="0.08" stroke-width="1"/>
    <circle cx="210" cy="220" r="160" fill="none" stroke="#FF2A4D" stroke-opacity="0.06" stroke-width="1"/>

    <!-- head silhouette: organic left half, mechanical right half -->
    <path d="M210 40
             C 130 40, 78 105, 78 195
             C 78 270, 110 320, 150 360
             L 150 420
             C 150 432, 160 440, 175 440
             L 245 440
             C 258 440, 268 430, 268 418
             L 268 358
             C 312 318, 342 268, 342 195
             C 342 105, 290 40, 210 40 Z"
          fill="url(#faceGrad)" stroke="#3A3D47" stroke-width="1.5"/>

    <!-- panel seam down the middle (organic/mech divide) -->
    <line x1="210" y1="44" x2="210" y2="436" stroke="#0A0B0F" stroke-width="2" stroke-dasharray="2 4" opacity="0.6"/>

    <!-- mechanical plating, right half -->
    <path d="M210 70 C 270 72, 312 120, 312 195 C 312 255, 290 295, 256 330 L 256 70 Z"
          fill="#1A1C22" stroke="#3A3D47" stroke-width="1"/>
    <rect x="222" y="100" width="64" height="14" rx="2" fill="#0F1014" stroke="#3A3D47" stroke-width="0.75"/>
    <rect x="222" y="122" width="40" height="8" rx="1.5" fill="#0F1014" stroke="#3A3D47" stroke-width="0.75"/>
    <circle cx="296" cy="148" r="4" fill="#00FFC2" opacity="0.85"/>
    <circle cx="296" cy="162" r="4" fill="#3A3D47"/>
    <circle cx="296" cy="176" r="4" fill="#3A3D47"/>

    <!-- jaw seam lines, mechanical side -->
    <path d="M232 300 L 270 300" stroke="#3A3D47" stroke-width="1"/>
    <path d="M236 314 L 264 314" stroke="#3A3D47" stroke-width="1"/>

    <!-- circuit traces, mechanical cheek -->
    <path d="M230 200 h20 v18 h14 v22" fill="none" stroke="#00FFC2" stroke-width="1" opacity="0.5"/>
    <circle cx="264" cy="240" r="2.5" fill="#00FFC2" opacity="0.8"/>
    <path d="M226 230 h-8 v30 h18" fill="none" stroke="#FF2A4D" stroke-width="1" opacity="0.35"/>

    <!-- LEFT EYE (organic, calm) -->
    <ellipse cx="160" cy="190" rx="17" ry="11" fill="#0A0B0F" stroke="#3A3D47" stroke-width="1"/>
    <circle cx="160" cy="190" r="6" fill="#6E7180"/>
    <circle cx="158" cy="188" r="2" fill="#C7C9D1" opacity="0.7"/>

    <!-- RIGHT EYE (mechanical, glowing, tracked) -->
    <g id="cyber-eye">
      <ellipse cx="258" cy="188" rx="22" ry="15" fill="#0A0B0F" stroke="#3A3D47" stroke-width="1.5"/>
      <circle cx="258" cy="188" r="16" fill="url(#irisGlow)" filter="url(#softGlow)"/>
      <circle id="iris-core" cx="258" cy="188" r="7" fill="#FF2A4D"/>
      <circle id="iris-spec" cx="255" cy="185" r="2" fill="#FFD9DF"/>
      <circle cx="258" cy="188" r="22" fill="none" stroke="#FF2A4D" stroke-opacity="0.3" stroke-width="1"/>
    </g>

    <!-- brow line -->
    <path d="M138 168 Q 160 158, 182 168" fill="none" stroke="#6E7180" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
    <path d="M232 162 L 286 158" fill="none" stroke="#3A3D47" stroke-width="2" stroke-linecap="round"/>

    <!-- nose bridge -->
    <path d="M205 195 L 198 240 L 215 248" fill="none" stroke="#3A3D47" stroke-width="1.25" opacity="0.7"/>

    <!-- mouth: neutral line, slight panel on mech side -->
    <path d="M178 320 Q 210 332, 244 320" fill="none" stroke="#6E7180" stroke-width="1.5" stroke-linecap="round"/>
    <rect x="244" y="312" width="20" height="16" rx="2" fill="#0F1014" stroke="#3A3D47" stroke-width="0.75"/>

    <!-- scan line, animated -->
    <rect id="scan-line" x="78" y="40" width="264" height="2" fill="#00FFC2" opacity="0.5"/>
  </svg>
  `;

  // cursor-tracked iris
  const eye = document.getElementById('cyber-eye');
  const irisCore = document.getElementById('iris-core');
  const irisSpec = document.getElementById('iris-spec');
  let eyeRect = null;

  function refreshEyeRect(){
    const svg = portraitMount.querySelector('svg');
    if(svg) eyeRect = svg.getBoundingClientRect();
  }
  window.addEventListener('resize', refreshEyeRect);
  window.addEventListener('scroll', refreshEyeRect, { passive:true });
  setTimeout(refreshEyeRect, 300);

  window.addEventListener('mousemove', (e)=>{
    if(!eyeRect) return;
    // eye center in viewBox space (258,188) mapped from rendered box
    const svg = portraitMount.querySelector('svg');
    if(!svg) return;
    const r = svg.getBoundingClientRect();
    const scaleX = 420 / r.width;
    const scaleY = 460 / r.height;
    const cx = r.left + (258 / scaleX);
    const cy = r.top + (188 / scaleY);
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.min(5, Math.hypot(dx,dy) / 40);
    const angle = Math.atan2(dy,dx);
    const ox = Math.cos(angle)*dist;
    const oy = Math.sin(angle)*dist;
    irisCore.setAttribute('cx', 258+ox);
    irisCore.setAttribute('cy', 188+oy);
    irisSpec.setAttribute('cx', 255+ox);
    irisSpec.setAttribute('cy', 185+oy);
  }, { passive:true });

  // scan line loop
  const scanLine = document.getElementById('scan-line');
  let scanY = 40, scanDir = 1;
  function animateScan(){
    scanY += scanDir * 0.9;
    if(scanY > 430){ scanDir = -1; }
    if(scanY < 40){ scanDir = 1; }
    if(scanLine) scanLine.setAttribute('y', scanY);
    requestAnimationFrame(animateScan);
  }
  requestAnimationFrame(animateScan);

  // ---------- HERO ENTRANCE SEQUENCE ----------
  const heroEls = [
    '.hero-text .eyebrow',
    '.hero-text h1',
    '.hero-text p',
    '.hero-actions',
    '.hero-portrait'
  ];
  function runEntrance(){
    heroEls.forEach((sel, i)=>{
      const el = document.querySelector(sel);
      if(!el) return;
      el.style.transition = 'opacity 0.7s cubic-bezier(.16,1,.3,1), transform 0.7s cubic-bezier(.16,1,.3,1)';
      el.style.transform = 'translateY(16px)';
      setTimeout(()=>{
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i*140);
    });
  }

  // ---------- LOADING SCREEN ----------
  const loading = document.getElementById('loading');
  let entranceRan = false;
  function triggerEntrance(){
    if(entranceRan) return;
    entranceRan = true;
    loading.style.opacity = '0';
    setTimeout(()=>{
      loading.style.display = 'none';
      runEntrance();
    }, 500);
  }
  setTimeout(triggerEntrance, 500);

  // ---------- SCROLL REVEALS ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el=>io.observe(el));

  // ---------- DIAGNOSTICS BAR FILL ON VIEW ----------
  const diagBars = document.querySelectorAll('.diag-bar .fill');
  const diagIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        diagBars.forEach(bar=>{
          bar.style.width = bar.dataset.pct + '%';
        });
        diagIO.disconnect();
      }
    });
  }, { threshold: 0.3 });
  const diagWrap = document.getElementById('diagnostics');
  if(diagWrap) diagIO.observe(diagWrap);

})();
