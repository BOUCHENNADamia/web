/* ============================================================
   HWUM Summer Programme 2027 — main.js
   Handles: Navigation, Scroll Reveal, Form + Validation,
            MySQL Database (via PHP/PDO API), Filtering,
            Gallery Carousel + Lightbox
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

/* ── 3. GALLERY — CAROUSEL + COUNTRY FILTERS + LIGHTBOX ──── */
// To add a photo: drop the file in images/gallery/ and add one entry below.
// A filter button appears automatically for every country present in the data.
const COUNTRIES = {
  malaysia:  { label: 'Malaysia',  flag: '🇲🇾' },
  singapore: { label: 'Singapore', flag: '🇸🇬' },
  thailand:  { label: 'Thailand',  flag: '🇹🇭' },
  china:     { label: 'China',     flag: '🇨🇳' }
};

const GALLERY_PHOTOS = [
  // ── Malaysia ──
  { src: 'images/gallery/my-petronas.jpg', country: 'malaysia',
    title: 'Petronas Twin Towers — Kuala Lumpur',
    desc: 'The iconic 452 m twin skyscrapers, symbol of modern Malaysia — just 45 minutes from campus.' },
  { src: 'images/gallery/my-batu-caves.jpg', country: 'malaysia',
    title: 'Batu Caves — Selangor',
    desc: 'Climb the 272 rainbow steps to a Hindu temple set inside a limestone cave, guarded by a 42 m golden statue.' },
  { src: 'images/gallery/my-putrajaya-mosque.jpg', country: 'malaysia',
    title: 'Putra Mosque — Putrajaya',
    desc: 'The rose-pink granite mosque on Putrajaya Lake, minutes away from the HWUM campus.' },
  { src: 'images/gallery/my-thean-hou.jpg', country: 'malaysia',
    title: 'Thean Hou Temple — Kuala Lumpur',
    desc: 'One of Southeast Asia\'s largest Chinese temples, famous for its hundreds of red lanterns.' },
  { src: 'images/gallery/my-perhentian-bay.jpg', country: 'malaysia',
    title: 'Perhentian Islands — Terengganu',
    desc: 'Boats resting in the bay of Perhentian Kecil under a fiery sky — paradise islands on Malaysia\'s east coast, a weekend trip from KL.' },
  { src: 'images/gallery/my-perhentian-village.jpg', country: 'malaysia',
    title: 'Fisherman Village — Perhentian Islands',
    desc: 'The stilt restaurants of the fishermen\'s village light up at dusk, right over the water.' },
  { src: 'images/gallery/my-perhentian-boat.jpg', country: 'malaysia',
    title: 'Boat trip at dawn — Perhentian Islands',
    desc: 'Gliding over glassy water at sunrise — the classic way to hop between the islands\' beaches and snorkelling spots.' },
  { src: 'images/gallery/my-perhentian-sunset.jpg', country: 'malaysia',
    title: 'Sunset over the South China Sea',
    desc: 'Watching the sun melt into the sea from the beach — every evening ends like this in the Perhentians.' },
  { src: 'images/gallery/my-perhentian-turtle.jpg', country: 'malaysia',
    title: 'Green Sea Turtle — Perhentian Islands',
    desc: 'Snorkelling side by side with wild green turtles in crystal-clear water, just metres from the beach.' },
  { src: 'images/gallery/my-perhentian-nemo.jpg', country: 'malaysia',
    title: 'Finding Nemo — Perhentian Islands',
    desc: 'A clownfish peeking out of its sea anemone on the shallow coral reef.' },
  { src: 'images/gallery/my-perhentian-shark.jpg', country: 'malaysia',
    title: 'Blacktip Reef Shark — Perhentian Islands',
    desc: 'A (harmless!) blacktip reef shark patrolling the reef — one of the most thrilling encounters of the trip.' },
  { src: 'images/gallery/my-melaka-church.jpg', country: 'malaysia',
    title: 'Church of St. Francis Xavier — Melaka',
    desc: 'A neo-Gothic church built in 1849, one landmark among many in Melaka\'s UNESCO-listed historic centre — two hours by bus from campus.' },
  { src: 'images/gallery/my-melaka-afamosa.jpg', country: 'malaysia',
    title: 'A Famosa Fort — Melaka',
    desc: 'The Porta de Santiago gate is all that remains of the Portuguese fortress built in 1511 — one of the oldest European ruins in Asia.' },
  { src: 'images/gallery/my-melaka-jonker.jpg', country: 'malaysia',
    title: 'Jonker Street — Melaka',
    desc: 'Colourful shophouses, chicken-rice balls and antique shops in the heart of Melaka\'s Chinatown.' },
  { src: 'images/gallery/my-melaka-temple.jpg', country: 'malaysia',
    title: 'Chinese Clan House — Melaka',
    desc: 'Gilded calligraphy boards and quiet courtyards inside a clan house of Melaka\'s centuries-old Chinese community.' },

  // ── Singapore ──
  { src: 'images/gallery/sg-marina-bay.jpg', country: 'singapore',
    title: 'Marina Bay — Singapore',
    desc: 'Singapore\'s futuristic skyline around Marina Bay Sands — one hour by plane or an overnight bus from KL.' },
  { src: 'images/gallery/sg-merlion.jpg', country: 'singapore',
    title: 'The Merlion',
    desc: 'Half lion, half fish — the national icon of Singapore watching over the bay.' },
  { src: 'images/gallery/sg-gardens-bay-1.jpg', country: 'singapore',
    title: 'Gardens by the Bay',
    desc: 'A futuristic nature park of biodomes and skywalks in the heart of the city.' },
  { src: 'images/gallery/sg-gardens-bay-2.jpg', country: 'singapore',
    title: 'Inside Gardens by the Bay',
    desc: 'Waterfalls, orchids and misty walkways beneath the glass domes.' },
  { src: 'images/gallery/sg-supertrees.jpg', country: 'singapore',
    title: 'Supertree Grove',
    desc: 'The 50 m solar-powered Supertrees light up every evening for the free Garden Rhapsody show.' },
  { src: 'images/gallery/sg-botanic-garden-1.jpg', country: 'singapore',
    title: 'Singapore Botanic Gardens',
    desc: 'A UNESCO World Heritage site, over 160 years old and home to 10,000 plant species.' },
  { src: 'images/gallery/sg-botanic-garden-2.jpg', country: 'singapore',
    title: 'Botanic Gardens Greenery',
    desc: 'Tropical calm in the middle of the city — the perfect break between two visits.' },
  { src: 'images/gallery/sg-jewel-vortex.jpg', country: 'singapore',
    title: 'Jewel Changi — Rain Vortex',
    desc: 'The world\'s tallest indoor waterfall (40 m), right inside Singapore\'s Changi Airport.' },
  { src: 'images/gallery/sg-sentosa.jpg', country: 'singapore',
    title: 'Sentosa Island',
    desc: 'Singapore\'s resort island — beaches, cable cars and Universal Studios.' },

  // ── Thailand ──
  { src: 'images/gallery/th-grand-palace-1.jpg', country: 'thailand',
    title: 'The Grand Palace — Bangkok',
    desc: 'Home of the Kings of Siam since 1782 and Thailand\'s most sacred site.' },
  { src: 'images/gallery/th-grand-palace-2.jpg', country: 'thailand',
    title: 'Grand Palace Details',
    desc: 'Gilded chedis, mosaic pillars and mythical guardians at every corner.' },
  { src: 'images/gallery/th-grand-palace-3.jpg', country: 'thailand',
    title: 'Grand Palace Courtyards',
    desc: 'Every roofline glitters — allow half a day to take it all in.' },
  { src: 'images/gallery/th-wat-pho-1.jpg', country: 'thailand',
    title: 'Wat Pho — Bangkok',
    desc: 'Temple of the Reclining Buddha and the birthplace of traditional Thai massage.' },
  { src: 'images/gallery/th-wat-pho-2.jpg', country: 'thailand',
    title: 'Wat Pho Stupas',
    desc: 'Great chedis covered in hand-painted porcelain flowers.' },
  { src: 'images/gallery/th-wat-pho-3.jpg', country: 'thailand',
    title: 'Wat Pho Grounds',
    desc: 'A maze of golden spires and quiet courtyards, five minutes from the Grand Palace.' },
  { src: 'images/gallery/th-bangkok-skyline.jpg', country: 'thailand',
    title: 'Bangkok Skyline',
    desc: 'A sprawling megacity of 11 million people — two hours from KL by plane.' },
  { src: 'images/gallery/th-bangkok-rooftop.jpg', country: 'thailand',
    title: 'Bangkok Rooftops',
    desc: 'Sunset drinks above the city — rooftop bars are a Bangkok institution.' },
  { src: 'images/gallery/th-chatuchak-market.jpg', country: 'thailand',
    title: 'Chatuchak Weekend Market',
    desc: 'Over 15,000 stalls — one of the largest markets in the world.' },
  { src: 'images/gallery/th-night-market.jpg', country: 'thailand',
    title: 'Bangkok Night Market',
    desc: 'Street-food paradise: pad thai, mango sticky rice and grilled skewers for a couple of euros.' },
  { src: 'images/gallery/th-muay-thai.jpg', country: 'thailand',
    title: 'Muay Thai — Rajadamnern Stadium',
    desc: 'Thailand\'s national sport, live in Bangkok\'s legendary boxing arena.' }
];

const galleryFilters  = document.getElementById('galleryFilters');
const carouselTrack   = document.getElementById('carouselTrack');
const carouselCounter = document.getElementById('carouselCounter');
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');

let visiblePhotos = GALLERY_PHOTOS;
let lightboxIndex = 0;

function renderFilters() {
  const present = [...new Set(GALLERY_PHOTOS.map(p => p.country))];
  const buttons = [`<button class="filter-btn active" data-filter="all">All <sup>${GALLERY_PHOTOS.length}</sup></button>`]
    .concat(present.map(c => {
      const count = GALLERY_PHOTOS.filter(p => p.country === c).length;
      return `<button class="filter-btn" data-filter="${c}">${COUNTRIES[c].flag} ${COUNTRIES[c].label} <sup>${count}</sup></button>`;
    }));
  galleryFilters.innerHTML = buttons.join('');

  galleryFilters.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilters.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCarousel(btn.dataset.filter);
    });
  });
}

function renderCarousel(filter = 'all') {
  visiblePhotos = filter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.country === filter);

  carouselTrack.innerHTML = visiblePhotos.map((p, i) => `
    <figure class="carousel-slide" data-index="${i}" tabindex="0" role="button"
            aria-label="View ${p.title} full size">
      <img src="${p.src}" alt="${p.title}" loading="lazy" />
      <figcaption class="slide-caption">
        <span class="slide-country">${COUNTRIES[p.country].flag} ${COUNTRIES[p.country].label}</span>
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
      </figcaption>
    </figure>`).join('');

  carouselTrack.scrollLeft = 0;
  updateCounter();

  carouselTrack.querySelectorAll('.carousel-slide').forEach(slide => {
    const open = () => openLightbox(Number(slide.dataset.index));
    slide.addEventListener('click', open);
    slide.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
  });
}

function slideStep() {
  const slide = carouselTrack.querySelector('.carousel-slide');
  return slide ? slide.offsetWidth + 20 : 400; // slide width + track gap
}

function updateCounter() {
  if (!visiblePhotos.length) { carouselCounter.textContent = ''; return; }
  const index = Math.min(visiblePhotos.length, Math.round(carouselTrack.scrollLeft / slideStep()) + 1);
  carouselCounter.textContent = `${index} / ${visiblePhotos.length} photos`;
}

document.getElementById('carouselPrev').addEventListener('click', () => carouselTrack.scrollBy({ left: -slideStep() }));
document.getElementById('carouselNext').addEventListener('click', () => carouselTrack.scrollBy({ left: slideStep() }));
carouselTrack.addEventListener('scroll', updateCounter);

/* Lightbox */
function openLightbox(index) {
  lightboxIndex = index;
  const p = visiblePhotos[index];
  if (!p) return;
  lightboxImg.src = p.src;
  lightboxImg.alt = p.title;
  lightboxCaption.innerHTML = `<strong>${p.title}</strong>${p.desc}`;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function stepLightbox(dir) {
  openLightbox((lightboxIndex + dir + visiblePhotos.length) % visiblePhotos.length);
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev').addEventListener('click', () => stepLightbox(-1));
document.getElementById('lightboxNext').addEventListener('click', () => stepLightbox(1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  stepLightbox(-1);
  if (e.key === 'ArrowRight') stepLightbox(1);
});

renderFilters();
renderCarousel();

/* ── 4. DATABASE (MySQL via PHP + PDO) ──────────────────── */
// All registrations live in the MySQL database `hwum_summer`
// (created by database.sql). The PHP scripts in /php run the
// SQL queries with PDO prepared statements and return JSON.
const API_BASE = 'php/';

let dbCourses     = [];  // courses table, loaded from the database
let displayedRows = [];  // rows currently shown (used for CSV export)

async function apiRequest(url, postData) {
  const options = postData
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(postData) }
    : undefined;
  const res = await fetch(API_BASE + url, options);
  let json = null;
  try { json = await res.json(); } catch { /* non-JSON response */ }
  if (!res.ok || !json || json.success === false) {
    throw new Error(json && json.error ? json.error : 'Server error (HTTP ' + res.status + ')');
  }
  return json;
}

const dbStatus = document.getElementById('dbStatus');

function showDbError(err) {
  if (!dbStatus) return;
  dbStatus.hidden = false;
  dbStatus.textContent = err instanceof TypeError
    ? 'Database offline — Cannot reach the database server. Start Apache and MySQL (XAMPP), import database.sql, and open the site via http://localhost/ — not by double-clicking index.html.'
    : 'Database error — ' + err.message;
}

function hideDbError() {
  if (dbStatus) dbStatus.hidden = true;
}

function populateCourseSelects() {
  const formSelect   = document.getElementById('fcourse');
  const filterSelect = document.getElementById('filterCourse');
  dbCourses.forEach(c => {
    if (formSelect) {
      formSelect.insertAdjacentHTML('beforeend',
        `<option value="${c.courseID}">${escapeHTML(c.courseName)} (${escapeHTML(c.courseCode)})</option>`);
    }
    if (filterSelect) {
      filterSelect.insertAdjacentHTML('beforeend',
        `<option value="${c.courseID}">${escapeHTML(c.courseName)}</option>`);
    }
  });
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

regForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputs  = regForm.querySelectorAll('.form-control[required], .form-control[type="email"], .form-control[type="tel"]');
  let allValid  = true;
  inputs.forEach(inp => { if (!validateField(inp)) allValid = false; });
  if (!allValid) return;

  const data = {
    name:     regForm.querySelector('#fname').value.trim(),
    phone:    regForm.querySelector('#fphone').value.trim(),
    email:    regForm.querySelector('#femail').value.trim(),
    courseID: Number(regForm.querySelector('#fcourse').value),
    comments: regForm.querySelector('#fcomments').value.trim()
  };

  const submitBtn = regForm.querySelector('.form-submit');
  const formError = document.getElementById('formGlobalError');
  submitBtn.disabled = true;
  if (formError) formError.classList.remove('show');

  try {
    // INSERT INTO registrations … executed by php/register.php
    await apiRequest('register.php', data);
    formWrap.style.display = 'none';
    formSuccess.style.display = 'block';
    renderAdminTable();
  } catch (err) {
    if (formError) {
      formError.textContent = err instanceof TypeError
        ? 'Cannot reach the database server. Is XAMPP (Apache + MySQL) running?'
        : err.message;
      formError.classList.add('show');
    }
  } finally {
    submitBtn.disabled = false;
  }
});

document.getElementById('resetFormBtn')?.addEventListener('click', () => {
  formWrap.style.display = '';
  formSuccess.style.display = 'none';
  regForm.reset();
});

/* ── 6. ADMIN TABLE ──────────────────────────────────────── */
const adminTableBody = document.getElementById('adminTableBody');
const filterCourse   = document.getElementById('filterCourse');
const filterSearch   = document.getElementById('filterSearch');
const statsBar       = document.getElementById('statsBar');

const STAT_LABELS = {
  'K17SW':    'Web Development',
  'K17PL-SS': 'Python ML',
  'MALAY-SS': 'Malay Skills'
};

const COURSE_BADGES = {
  'K17SW':    'badge-web',
  'K17PL-SS': 'badge-py',
  'MALAY-SS': 'badge-malay'
};

function renderStats(stats, total) {
  if (!statsBar) return;
  statsBar.innerHTML =
    `<div class="stat-pill"><strong>${total}</strong>Total Registrations</div>` +
    stats.map(s =>
      `<div class="stat-pill"><strong>${s.total}</strong>${escapeHTML(STAT_LABELS[s.courseCode] || s.courseName)}</div>`
    ).join('');
}

async function renderAdminTable() {
  if (!adminTableBody) return;

  const params = new URLSearchParams();
  if (filterCourse && filterCourse.value !== 'all') params.set('course', filterCourse.value);
  if (filterSearch && filterSearch.value.trim())    params.set('search', filterSearch.value.trim());

  let data;
  try {
    // SELECT … INNER JOIN … WHERE … executed by php/registrations.php
    data = await apiRequest('registrations.php?' + params.toString());
  } catch (err) {
    showDbError(err);
    adminTableBody.innerHTML = `
      <tr><td colspan="6" class="table-empty">
        <p>Database not connected.</p>
      </td></tr>`;
    return;
  }

  hideDbError();

  if (dbCourses.length === 0 && data.courses.length > 0) {
    dbCourses = data.courses;
    populateCourseSelects();
  }

  displayedRows = data.registrations;
  renderStats(data.stats, data.total);

  if (displayedRows.length === 0) {
    adminTableBody.innerHTML = `
      <tr><td colspan="6" class="table-empty">
        <p>No registrations found. ${data.total === 0 ? 'Registrations will appear here once students submit the form.' : 'Try adjusting your filters.'}</p>
      </td></tr>`;
    return;
  }

  adminTableBody.innerHTML = displayedRows.map(r => {
    const date  = new Date(r.regDate.replace(' ', 'T')).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
    const badge = COURSE_BADGES[r.courseCode] || '';
    return `
    <tr>
      <td>${escapeHTML(r.fullName)}</td>
      <td>${escapeHTML(r.phone)}</td>
      <td><a href="mailto:${escapeHTML(r.email)}">${escapeHTML(r.email)}</a></td>
      <td><span class="course-badge ${badge}">${escapeHTML(r.courseName)}</span></td>
      <td>${date}</td>
      <td><button class="delete-btn" onclick="handleDelete(${r.regID})" title="Delete entry">Delete</button></td>
    </tr>`;
  }).join('');
}

window.handleDelete = async function(id) {
  if (!confirm('Remove this registration from the database?')) return;
  try {
    // DELETE FROM registrations WHERE regID = ? via php/delete.php
    await apiRequest('delete.php', { id });
    renderAdminTable();
  } catch (err) {
    showDbError(err);
  }
};

filterCourse?.addEventListener('change', renderAdminTable);

// Debounce the search so we don't query the database on every keystroke
let searchTimer;
filterSearch?.addEventListener('input', () => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(renderAdminTable, 300);
});

// Export CSV (from the rows currently displayed)
document.getElementById('exportBtn')?.addEventListener('click', () => {
  if (!displayedRows.length) { alert('No registrations to export.'); return; }
  const quote  = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const header = ['ID','Name','Phone','Email','Course','Comments','Date'];
  const rows   = displayedRows.map(r => [
    r.regID, quote(r.fullName), quote(r.phone), quote(r.email),
    quote(r.courseName), quote(r.comments),
    new Date(r.regDate.replace(' ', 'T')).toLocaleDateString('en-GB')
  ]);
  const csv  = [header, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = Object.assign(document.createElement('a'), { href: url, download: 'hwum_registrations.csv' });
  a.click(); URL.revokeObjectURL(url);
});

function escapeHTML(str) {
  const d = document.createElement('div');
  d.textContent = str || '';
  return d.innerHTML;
}

/* ── 7. INIT ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAdminTable();
  highlightNavLink();
});
