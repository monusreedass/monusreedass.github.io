/* ═══════════════════════════════════════════
   HAPPY BIRTHDAY MONUSREE — INTERACTIONS
   Arts & Flowers Theme
   ═══════════════════════════════════════════ */

// ───── CONFIG (edit these!) ─────
const BIRTHDAY_MONTH = 2;   // 1 = Jan, 2 = Feb, …12 = Dec
const BIRTHDAY_DAY = 20;  // day of month

const LOVE_LETTER = `প্রিয় আলো,\n\nআজ বছরের একটি বিশেষ দিন এই দিনেই তুই এসেছিলি, এই দিন আমার কাছে সবসময়ের জন্য স্পেশাল। এই দিনে আমি সবচেয়ে বেশি চাই তোর সকল মনের আশা পূর্ন হোক। আর সামনের যত খারাপ কিছু আছে বাতাসে মিসে যাক। 💕`;

// ═══════════════════════════════════════════
// 1.  LOADING SCREEN — click to enter + start music
// ═══════════════════════════════════════════
(function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;

  loader.addEventListener('click', () => {
    loader.classList.add('hidden');
    // Start music on this user gesture
    const audio = document.getElementById('bg-music');
    const btn = document.getElementById('music-btn');
    if (audio) {
      audio.play().then(() => {
        if (btn) btn.classList.add('playing');
      }).catch(() => { });
    }
  });
})();

// ═══════════════════════════════════════════
// 2.  FLOATING FLOWERS (Canvas — Hero)
// ═══════════════════════════════════════════
(function initFloatingFlowers() {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let flowers = [];
  const FLOWER_EMOJIS = ['🌸', '🌹', '🌷', '🌺', '🌻', '🌼', '💐', '🏵️', '❀', '✿'];

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize);
  resize();

  function spawnFlower() {
    if (flowers.length >= 12) return;
    flowers.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: 16 + Math.random() * 20,
      speed: 0.5 + Math.random() * 1.0,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      emoji: FLOWER_EMOJIS[Math.floor(Math.random() * FLOWER_EMOJIS.length)],
      opacity: 0.4 + Math.random() * 0.5,
      rot: (Math.random() - 0.5) * 0.4,
      rotSpeed: (Math.random() - 0.5) * 0.01
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    flowers.forEach(f => {
      f.y -= f.speed;
      f.wobble += f.wobbleSpeed;
      f.x += Math.sin(f.wobble) * 0.8;
      f.rot += f.rotSpeed;

      ctx.save();
      ctx.globalAlpha = f.opacity;
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot);
      ctx.font = `${f.size}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(f.emoji, 0, 0);
      ctx.restore();
    });
    flowers = flowers.filter(f => f.y + f.size > -20);
    requestAnimationFrame(animate);
  }

  setInterval(spawnFlower, 1200);
  animate();
})();

// ═══════════════════════════════════════════
// 3.  FALLING PETALS (Canvas — Full Page)
// ═══════════════════════════════════════════
(function initPetals() {
  const c = document.getElementById('petals-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let petals = [];

  const PETAL_COLORS = [
    'rgba(255,182,193,0.6)',
    'rgba(248,200,220,0.5)',
    'rgba(201,160,220,0.4)',
    'rgba(230,230,250,0.5)',
    'rgba(255,218,185,0.4)',
  ];

  function resize() { c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', resize); resize();

  function drawPetal(x, y, size, rot, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(size * 0.4, -size * 0.6, size, -size * 0.4, size * 0.5, 0);
    ctx.bezierCurveTo(size, size * 0.4, size * 0.4, size * 0.6, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    // Subtle vein
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(size * 0.25, 0, size * 0.5, 0);
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
    ctx.restore();
  }

  function spawnPetal() {
    if (petals.length >= 18) return;
    petals.push({
      x: Math.random() * c.width,
      y: -20,
      size: 12 + Math.random() * 16,
      speedY: 0.4 + Math.random() * 0.8,
      speedX: (Math.random() - 0.5) * 0.5,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.015 + Math.random() * 0.02,
      color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
      alpha: 0.4 + Math.random() * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, c.width, c.height);
    petals.forEach(p => {
      p.y += p.speedY;
      p.wobble += p.wobbleSpeed;
      p.x += Math.sin(p.wobble) * 0.8 + p.speedX;
      p.rot += p.rotSpeed;
      drawPetal(p.x, p.y, p.size, p.rot, p.color, p.alpha);
    });
    petals = petals.filter(p => p.y < c.height + 30);
    requestAnimationFrame(animate);
  }

  setInterval(spawnPetal, 900);
  animate();
})();

// ═══════════════════════════════════════════
// 4.  PAINT SPLATTERS (Background Canvas)
// ═══════════════════════════════════════════
(function initPaint() {
  const c = document.getElementById('paint-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');

  function resize() { c.width = innerWidth; c.height = innerHeight; }
  addEventListener('resize', () => { resize(); draw(); }); resize();

  const SPLATS = [
    { x: 0.15, y: 0.2, r: 0.12, color: 'rgba(255,182,193,0.08)' },
    { x: 0.8, y: 0.15, r: 0.1, color: 'rgba(230,230,250,0.1)' },
    { x: 0.5, y: 0.7, r: 0.14, color: 'rgba(248,200,220,0.07)' },
    { x: 0.25, y: 0.8, r: 0.09, color: 'rgba(201,160,220,0.08)' },
    { x: 0.75, y: 0.6, r: 0.11, color: 'rgba(255,218,185,0.07)' },
    { x: 0.1, y: 0.55, r: 0.08, color: 'rgba(255,105,180,0.04)' },
    { x: 0.9, y: 0.4, r: 0.1, color: 'rgba(255,182,193,0.06)' },
  ];

  function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    SPLATS.forEach(s => {
      const x = s.x * c.width;
      const y = s.y * c.height;
      const r = s.r * Math.max(c.width, c.height);
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
      grad.addColorStop(0, s.color);
      grad.addColorStop(0.7, s.color.replace(/[\d.]+\)$/, '0.02)'));
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  draw();
})();

// ═══════════════════════════════════════════
// 5.  SCROLL-REVEAL (IntersectionObserver)
// ═══════════════════════════════════════════
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));

// ═══════════════════════════════════════════
// 6.  TYPING ANIMATION (Love Message)
// ═══════════════════════════════════════════
(function initTyping() {
  const el = document.getElementById('typing-text');
  const revealBtn = document.getElementById('reveal-btn');
  if (!el) return;

  let started = false;

  const typeObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !started) {
        started = true;
        typeText(el, LOVE_LETTER, 30, () => {
          if (revealBtn) revealBtn.style.display = 'inline-block';
        });
        typeObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  typeObserver.observe(el);
})();

function typeText(element, text, speed, onComplete) {
  let i = 0;
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor-blink';
  element.appendChild(cursorSpan);

  function tick() {
    if (i < text.length) {
      element.insertBefore(document.createTextNode(text[i]), cursorSpan);
      i++;
      setTimeout(tick, speed);
    } else {
      setTimeout(() => {
        cursorSpan.remove();
        if (onComplete) onComplete();
      }, 600);
    }
  }
  tick();
}

// ───── Reveal hidden message ─────
document.getElementById('reveal-btn')?.addEventListener('click', function () {
  const hidden = document.getElementById('hidden-message');
  if (hidden) {
    hidden.style.display = 'block';
    this.style.display = 'none';
  }
});

// ═══════════════════════════════════════════
// 7.  CONFETTI 🎉
// ═══════════════════════════════════════════
function launchConfetti(duration = 3500) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#E6E6FA', '#FFD700', '#FFF0F5', '#FF6EB4'];
  const pieces = [];
  const PIECE_COUNT = 180;

  for (let i = 0; i < PIECE_COUNT; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: 6 + Math.random() * 8,
      h: 4 + Math.random() * 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      vx: (Math.random() - 0.5) * 4,
      vy: 2 + Math.random() * 4,
      rot: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      opacity: 1
    });
  }

  const start = performance.now();

  function draw(now) {
    const elapsed = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.04;
      p.rot += p.rotSpeed;
      if (elapsed > duration - 800) p.opacity = Math.max(0, p.opacity - 0.02);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rot * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });

    if (elapsed < duration) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(draw);
}

// ═══════════════════════════════════════════
// 8.  SURPRISE BUTTON + MODAL
// ═══════════════════════════════════════════
document.getElementById('surprise-btn')?.addEventListener('click', () => {
  launchConfetti();
  const modal = document.getElementById('surprise-modal');
  if (modal) modal.style.display = 'flex';
});

document.getElementById('modal-close')?.addEventListener('click', () => {
  const modal = document.getElementById('surprise-modal');
  if (modal) modal.style.display = 'none';
});

document.getElementById('surprise-modal')?.addEventListener('click', function (e) {
  if (e.target === this) this.style.display = 'none';
});

// ═══════════════════════════════════════════
// 9.  COUNTDOWN TIMER
// ═══════════════════════════════════════════
(function initCountdown() {
  function getNext() {
    const now = new Date();
    let target = new Date(now.getFullYear(), BIRTHDAY_MONTH - 1, BIRTHDAY_DAY);
    if (target <= now) target.setFullYear(target.getFullYear() + 1);
    return target;
  }

  function update() {
    const diff = getNext() - new Date();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    const pad = n => String(n).padStart(2, '0');
    const elD = document.getElementById('cd-days');
    const elH = document.getElementById('cd-hours');
    const elM = document.getElementById('cd-minutes');
    const elS = document.getElementById('cd-seconds');

    if (elD) elD.textContent = pad(d);
    if (elH) elH.textContent = pad(h);
    if (elM) elM.textContent = pad(m);
    if (elS) elS.textContent = pad(s);
  }

  update();
  setInterval(update, 1000);
})();

// ═══════════════════════════════════════════
// 10. MUSIC — AUTOPLAY + TOGGLE
// ═══════════════════════════════════════════
(function initMusic() {
  const btn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;

  let playing = false;

  function startPlaying() {
    if (playing) return;
    audio.play().then(() => {
      playing = true;
      btn.classList.add('playing');
    }).catch(() => { });
  }

  function toggleMusic() {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
      playing = false;
    } else {
      startPlaying();
    }
  }

  btn.addEventListener('click', toggleMusic);

  // Try autoplay after loader hides
  window.addEventListener('load', () => {
    setTimeout(startPlaying, 2000);
  });

  // Fallback: play on first user interaction if browser blocked autoplay
  function onFirstInteraction() {
    startPlaying();
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
    document.removeEventListener('scroll', onFirstInteraction);
  }
  document.addEventListener('click', onFirstInteraction, { once: false });
  document.addEventListener('touchstart', onFirstInteraction, { once: false });
  document.addEventListener('scroll', onFirstInteraction, { once: false });
})();

// ═══════════════════════════════════════════
// 11. DOT-NAV SMOOTH SCROLL & SCROLL-SPY
// ═══════════════════════════════════════════
document.querySelectorAll('.dot-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

(function initScrollSpy() {
  const dots = document.querySelectorAll('.dot-link');
  const sections = [];
  dots.forEach(dot => {
    const sec = document.querySelector(dot.getAttribute('href'));
    if (sec) sections.push({ dot, sec });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        dots.forEach(d => d.classList.remove('active'));
        const match = sections.find(s => s.sec === entry.target);
        if (match) match.dot.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => observer.observe(s.sec));
})();

// ═══════════════════════════════════════════
// 12. HERO FADE-IN
// ═══════════════════════════════════════════
document.querySelectorAll('.fade-in-up').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 1s ease, transform 1s ease';
});
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelectorAll('.fade-in-up').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, 2000);
});
