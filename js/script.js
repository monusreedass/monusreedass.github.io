/* ═══════════════════════════════════════════
   HAPPY BIRTHDAY MONUSREE — INTERACTIONS
   ═══════════════════════════════════════════ */

// ───── CONFIG (edit these!) ─────
const BIRTHDAY_MONTH = 2;   // 1 = Jan, 2 = Feb, …12 = Dec
const BIRTHDAY_DAY   = 15;  // day of month

const LOVE_LETTER = `My dearest Monusree,\n\nOn this beautiful day, I just want to remind you how incredibly special you are. Your kindness, your laughter, your warmth — they make the world a better place. Every single day with you is a gift I never take for granted.\n\nHappy Birthday, my love. May this year bring you all the joy, love, and dreams your heart can hold. 💕`;

// ═══════════════════════════════════════════
// 1.  LOADING SCREEN
// ═══════════════════════════════════════════
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1800);
});

// ═══════════════════════════════════════════
// 2.  FLOATING HEARTS (Canvas)
// ═══════════════════════════════════════════
(function initHearts() {
  const canvas = document.getElementById('hearts-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let hearts = [];
  const COLORS = ['#FFB6C1','#FFC0CB','#FF69B4','#FF1493','#F8C8DC','#E6E6FA'];

  function resize() { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; }
  window.addEventListener('resize', resize);
  resize();

  function spawnHeart() {
    hearts.push({
      x: Math.random() * canvas.width,
      y: canvas.height + 20,
      size: 10 + Math.random() * 18,
      speed: 0.6 + Math.random() * 1.2,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.02,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.3 + Math.random() * 0.5
    });
  }

  function drawHeart(x, y, size, color, opacity) {
    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color;
    ctx.beginPath();
    const top = y - size / 2;
    ctx.moveTo(x, top + size / 4);
    ctx.bezierCurveTo(x, top, x - size / 2, top, x - size / 2, top + size / 4);
    ctx.bezierCurveTo(x - size / 2, top + size / 2, x, top + size * 0.6, x, top + size);
    ctx.bezierCurveTo(x, top + size * 0.6, x + size / 2, top + size / 2, x + size / 2, top + size / 4);
    ctx.bezierCurveTo(x + size / 2, top, x, top, x, top + size / 4);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach(h => {
      h.y -= h.speed;
      h.wobble += h.wobbleSpeed;
      h.x += Math.sin(h.wobble) * 0.8;
      drawHeart(h.x, h.y, h.size, h.color, h.opacity);
    });
    hearts = hearts.filter(h => h.y + h.size > -20);
    requestAnimationFrame(animate);
  }

  // Spawn a heart every 400ms
  setInterval(spawnHeart, 400);
  animate();
})();

// ═══════════════════════════════════════════
// 3.  SCROLL-REVEAL (IntersectionObserver)
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
// 4.  TYPING ANIMATION (Love Message)
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
  // Add a blinking cursor span
  const cursorSpan = document.createElement('span');
  cursorSpan.className = 'cursor-blink';
  element.appendChild(cursorSpan);

  function tick() {
    if (i < text.length) {
      // Insert character before the cursor
      element.insertBefore(document.createTextNode(text[i]), cursorSpan);
      i++;
      setTimeout(tick, speed);
    } else {
      // Remove cursor after a short pause
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
// 5.  CONFETTI 🎉
// ═══════════════════════════════════════════
function launchConfetti(duration = 3500) {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const COLORS = ['#FFB6C1','#FFC0CB','#FF69B4','#FF1493','#E6E6FA','#FFD700','#FFF0F5','#FF6EB4'];
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
      p.vy += 0.04; // gravity
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
// 6.  SURPRISE BUTTON + MODAL
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

// Close modal on overlay click
document.getElementById('surprise-modal')?.addEventListener('click', function (e) {
  if (e.target === this) this.style.display = 'none';
});

// ═══════════════════════════════════════════
// 7.  COUNTDOWN TIMER
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
// 8.  MUSIC TOGGLE
// ═══════════════════════════════════════════
(function initMusic() {
  const btn = document.getElementById('music-btn');
  const audio = document.getElementById('bg-music');
  if (!btn || !audio) return;

  let playing = false;

  btn.addEventListener('click', () => {
    if (playing) {
      audio.pause();
      btn.classList.remove('playing');
    } else {
      audio.play().catch(() => {}); // catch autoplay block
      btn.classList.add('playing');
    }
    playing = !playing;
  });
})();

// ═══════════════════════════════════════════
// 9.  SMOOTH SCROLL FOR NAV LINKS
// ═══════════════════════════════════════════
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ═══════════════════════════════════════════
// 10. HERO FADE-IN
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
  }, 2000); // after loader
});
