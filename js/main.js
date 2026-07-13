/* ============================================================
   HWUM Summer Programme 2027 — main.js
   Handles: Navigation, Scroll Reveal, Form + Validation,
            localStorage Database, Filtering, Gallery Lightbox
   ============================================================ */

'use strict';

/* ── 1. NAVIGATION ───────────────────────────────────────── */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinksWrap');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNavLink();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
}

/* ── 2. SCROLL REVEAL ────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 3. GALLERY FILTER + LIGHTBOX ────────────────────────── */
const filterBtns  = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightboxImg');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;

    galleryItems.forEach(item => {
      const show = filter === 'all' || item.dataset.cat === filter;
      item.style.display = show ? '' : 'none';
    });
  });
});

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── 4. DATABASE (localStorage) ─────────────────────────── */
const DB_KEY = 'hwum_registrations';

function getDB() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || [];
  } catch { return []; }
}

function saveDB(data) {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
}

function addRegistration(entry) {
  const db = getDB();
  const record = {
    id:        Date.now(),
    timestamp: new Date().toISOString(),
    ...entry
  };
  db.push(record);
  saveDB(db);
  return record;
}

function deleteRegistration(id) {
  const db = getDB().filter(r => r.id !== Number(id));
  saveDB(db);
}

/* ── 5. REGISTRATION FORM ────────────────────────────────── */
const regForm    = document.getElementById('regForm');
const formWrap   = document.getElementById('formWrap');
const formSuccess = document.getElementById('formSuccess');

function validateField(input) {
  const group = input.closest('.form-group');
  const errEl = group ? group.querySelector('.error-msg') : null;
  let valid = true;
  let msg   = '';

  if (input.hasAttribute('required') && !input.value.trim()) {
    valid = false; msg = 'This field is required.';
  } else if (input.type === 'email' && input.value.trim()) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(input.value.trim())) { valid = false; msg = 'Please enter a valid email address.'; }
  } else if (input.type === 'tel' && input.value.trim()) {
    const re = /^[\d\s\+\-\(\)]{6,20}$/;
    if (!re.test(input.value.trim())) { valid = false; msg = 'Please enter a valid phone number.'; }
  }

  input.classList.toggle('error', !valid);
  if (errEl) { errEl.textContent = msg; errEl.classList.toggle('show', !valid); }
  return valid;
}

// Live validation on blur
regForm.querySelectorAll('.form-control').forEach(input => {
  input.addEventListener('blur', () => validateField(input));
  input.addEventListener('input', () => {
    if (input.classList.contains('error')) validateField(input);
  });
});

regForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs  = regForm.querySelectorAll('.form-control[required], .form-control[type="email"], .form-control[type="tel"]');
  let allValid  = true;
  inputs.forEach(inp => { if (!validateField(inp)) allValid = false; });
  if (!allValid) return;

  const data = {
    name:     regForm.querySelector('#fname').value.trim(),
    phone:    regForm.querySelector('#fphone').value.trim(),
    email:    regForm.querySelector('#femail').value.trim(),
    course:   regForm.querySelector('#fcourse').value,
    comments: regForm.querySelector('#fcomments').value.trim()
  };

  addRegistration(data);

  // Show success
  formWrap.style.display = 'none';
  formSuccess.style.display = 'block';
  renderAdminTable();

  // Update stats bar
  renderStats();
});

document.getElementById('resetFormBtn')?.addEventListener('click', () => {
  formWrap.style.display = '';
  formSuccess.style.display = 'none';
  regForm.reset();
});

/* ── 6. ADMIN TABLE ──────────────────────────────────────── */
const adminTableBody  = document.getElementById('adminTableBody');
const filterCourse    = document.getElementById('filterCourse');
const filterSearch    = document.getElementById('filterSearch');
const totalCount      = document.getElementById('totalCount');
const webCount        = document.getElementById('webCount');
const pyCount         = document.getElementById('pyCount');
const malayCount      = document.getElementById('malayCount');

function renderStats() {
  const db = getDB();
  if (totalCount)  totalCount.textContent  = db.length;
  if (webCount)    webCount.textContent    = db.filter(r => r.course === 'Web Development and Databases').length;
  if (pyCount)     pyCount.textContent     = db.filter(r => r.course === 'Python for Machine Learning').length;
  if (malayCount)  malayCount.textContent  = db.filter(r => r.course === 'Malay Communication Skills').length;
}

function renderAdminTable() {
  const db         = getDB();
  const courseFilter = filterCourse ? filterCourse.value : 'all';
  const searchTerm   = filterSearch ? filterSearch.value.toLowerCase() : '';

  const filtered = db.filter(r => {
    const matchCourse = courseFilter === 'all' || r.course === courseFilter;
    const matchSearch = !searchTerm ||
      r.name.toLowerCase().includes(searchTerm) ||
      r.email.toLowerCase().includes(searchTerm);
    return matchCourse && matchSearch;
  });

  if (!adminTableBody) return;

  if (filtered.length === 0) {
    adminTableBody.innerHTML = `
      <tr><td colspan="6" class="table-empty">
        <div class="empty-icon">📋</div>
        <p>No registrations found. ${db.length === 0 ? 'Registrations will appear here once students submit the form.' : 'Try adjusting your filters.'}</p>
      </td></tr>`;
    return;
  }

  const courseBadgeClass = {
    'Web Development and Databases': 'badge-web',
    'Python for Machine Learning':   'badge-py',
    'Malay Communication Skills':    'badge-malay'
  };

  adminTableBody.innerHTML = filtered.map(r => {
    const date  = new Date(r.timestamp).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    const badge = courseBadgeClass[r.course] || '';
    return `
    <tr>
      <td>${escapeHTML(r.name)}</td>
      <td>${escapeHTML(r.phone)}</td>
      <td><a href="mailto:${escapeHTML(r.email)}">${escapeHTML(r.email)}</a></td>
      <td><span class="course-badge ${badge}">${escapeHTML(r.course)}</span></td>
      <td>${date}</td>
      <td><button class="delete-btn" onclick="handleDelete(${r.id})" title="Delete entry">🗑</button></td>
    </tr>`;
  }).join('');

  renderStats();
}

window.handleDelete = function(id) {
  if (!confirm('Remove this registration from the database?')) return;
  deleteRegistration(id);
  renderAdminTable();
  renderStats();
};

filterCourse?.addEventListener('change', renderAdminTable);
filterSearch?.addEventListener('input', renderAdminTable);

// Export CSV
document.getElementById('exportBtn')?.addEventListener('click', () => {
  const db  = getDB();
  if (!db.length) { alert('No registrations to export.'); return; }
  const header = ['ID','Name','Phone','Email','Course','Comments','Date'];
  const rows   = db.map(r => [
    r.id, `"${r.name}"`, `"${r.phone}"`, `"${r.email}"`,
    `"${r.course}"`, `"${r.comments.replace(/"/g,'""')}"`,
    new Date(r.timestamp).toLocaleDateString('en-GB')
  ]);
  const csv  = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'hwum_registrations.csv' });
  a.click(); URL.revokeObjectURL(url);
});

// Seed demo data on first load
function seedDemoData() {
  if (getDB().length > 0) return;
  const demos = [
    { name:'Sophie Martin',     phone:'+33 6 12 34 56 78', email:'s.martin@esiea.fr',    course:'Web Development and Databases', comments:'Very excited for this programme!' },
    { name:'Lucas Bernard',     phone:'+33 7 98 76 54 32', email:'l.bernard@esiea.fr',   course:'Python for Machine Learning',   comments:'Looking forward to the ML projects.' },
    { name:'Amina Benali',      phone:'+33 6 55 44 33 22', email:'a.benali@esiea.fr',    course:'Malay Communication Skills',    comments:'Want to learn Bahasa Malaysia.' },
    { name:'Jules Dupont',      phone:'+33 6 11 22 33 44', email:'j.dupont@esiea.fr',    course:'Web Development and Databases', comments:'' },
    { name:'Yasmine Oukili',    phone:'+33 7 66 77 88 99', email:'y.oukili@esiea.fr',    course:'Python for Machine Learning',   comments:'Interested in neural networks.' },
  ];
  demos.forEach(d => {
    const db = getDB();
    db.push({ id: Date.now() + Math.random(), timestamp: new Date(Date.now() - Math.random()*7*24*3600000).toISOString(), ...d });
    saveDB(db);
  });
}

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

/* ── 7. INIT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  seedDemoData();
  renderAdminTable();
  renderStats();
  highlightNavLink();
});
