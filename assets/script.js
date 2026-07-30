// ---------- Loader ----------
// Hides once the page's HTML/CSS/scripts are parsed, NOT once every network
// resource finishes — that used to include all 176 hero-sequence images
// (~26MB), which could keep this splash on screen for 10-30+ seconds on a
// mobile connection. The hero sequence has its own lightweight progress
// indicator, so this splash no longer needs to wait for it.
document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  if (loader) setTimeout(() => loader.classList.add('hide'), 700);
});

// ---------- AOS ----------
if (window.AOS) AOS.init({ duration: 800, once: true, offset: 60 });

// ---------- Scroll progress + navbar state ----------
const scrollProgress = document.getElementById('scrollProgress');
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (scrollProgress) scrollProgress.style.width = scrolled + '%';
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ---------- Hamburger ----------
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }));
}

// ---------- Particles (home hero only) ----------
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  for (let i = 0; i < 26; i++) {
    const p = document.createElement('span');
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDelay = (Math.random() * 12) + 's';
    p.style.animationDuration = (9 + Math.random() * 8) + 's';
    particlesEl.appendChild(p);
  }
}

// ---------- Counters ----------
const counterEls = document.querySelectorAll('.counter-box .num[data-count]');
if (counterEls.length) {
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const tick = () => {
      cur += step;
      if (cur >= target) { el.textContent = target; return; }
      el.textContent = cur;
      requestAnimationFrame(tick);
    };
    tick();
  };
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counterEls.forEach(el => obs.observe(el));
}

// ---------- Projects filter ----------
const filterBtns = document.querySelectorAll('.filter-btn');
const projItems = document.querySelectorAll('.proj-item');
if (filterBtns.length && projItems.length) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projItems.forEach(item => {
        const show = filter === 'all' || item.getAttribute('data-cat') === filter;
        item.style.display = show ? '' : 'none';
      });
    });
  });
}

// ---------- Packages accordion ----------
function toggleCard(headEl) {
  const card = headEl.closest('.pkg-card');
  if (!card) return;
  const wasOpen = card.classList.contains('open');
  document.querySelectorAll('.pkg-card.open').forEach(c => c.classList.remove('open'));
  if (!wasOpen) card.classList.add('open');
}

// ---------- WhatsApp number ----------
const WA_NUMBER = '919500417217';

// ---------- Contact form -> WhatsApp ----------
function sendContact() {
  const name = document.getElementById('cName')?.value.trim() || '';
  const phone = document.getElementById('cPhone')?.value.trim() || '';
  const email = document.getElementById('cEmail')?.value.trim() || '';
  const msg = document.getElementById('cMsg')?.value.trim() || '';

  if (!name || !phone) {
    alert('Please enter your name and phone number.');
    return;
  }

  let text = `Hello Buildo, I'm ${name}.`;
  text += `\nPhone: ${phone}`;
  if (email) text += `\nEmail: ${email}`;
  if (msg) text += `\nMessage: ${msg}`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

// ---------- Quote form -> WhatsApp ----------
function sendQuote() {
  const name = document.getElementById('qName')?.value.trim() || '';
  const phone = document.getElementById('qPhone')?.value.trim() || '';
  const whatsapp = document.getElementById('qWhatsapp')?.value.trim() || '';
  const email = document.getElementById('qEmail')?.value.trim() || '';
  const propertyType = document.getElementById('qPropertyType')?.value || '';
  const location = document.getElementById('qLocation')?.value.trim() || '';
  const budget = document.getElementById('qBudget')?.value || '';
  const services = document.getElementById('qServices')?.value || '';
  const desc = document.getElementById('qDesc')?.value.trim() || '';

  if (!name || !phone) {
    alert('Please enter your full name and phone number.');
    return;
  }

  let text = `Hello Buildo, I'd like a detailed quote.`;
  text += `\nName: ${name}`;
  text += `\nPhone: ${phone}`;
  if (whatsapp) text += `\nWhatsApp: ${whatsapp}`;
  if (email) text += `\nEmail: ${email}`;
  if (propertyType) text += `\nProperty Type: ${propertyType}`;
  if (location) text += `\nLocation: ${location}`;
  if (budget) text += `\nBudget: ${budget}`;
  if (services) text += `\nServices Needed: ${services}`;
  if (desc) text += `\nDescription: ${desc}`;
  text += `\n(Note: please share reference images directly in this chat.)`;

  window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}
