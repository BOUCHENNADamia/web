/* HWUM Summer Programme 2027 — main.js (React 18, CDN + Babel) */

const { useState, useEffect, useRef, useCallback } = React;

/* Data */
const COUNTRIES = {
  malaysia:  { label: 'Malaysia',  flag: '🇲🇾' },
  singapore: { label: 'Singapore', flag: '🇸🇬' },
  thailand:  { label: 'Thailand',  flag: '🇹🇭' },
  china:     { label: 'China',     flag: '🇨🇳' }
};

const GALLERY_PHOTOS = [
  { src: 'images/gallery/my-petronas.jpg',       country: 'malaysia',  title: 'Petronas Twin Towers — Kuala Lumpur',       desc: 'The iconic 452 m twin skyscrapers, symbol of modern Malaysia — just 45 minutes from campus.' },
  { src: 'images/gallery/my-batu-caves.jpg',     country: 'malaysia',  title: 'Batu Caves — Selangor',                     desc: 'Climb the 272 rainbow steps to a Hindu temple set inside a limestone cave, guarded by a 42 m golden statue.' },
  { src: 'images/gallery/my-putrajaya-mosque.jpg', country: 'malaysia', title: 'Putra Mosque — Putrajaya',                 desc: 'The rose-pink granite mosque on Putrajaya Lake, minutes away from the HWUM campus.' },
  { src: 'images/gallery/my-thean-hou.jpg',      country: 'malaysia',  title: 'Thean Hou Temple — Kuala Lumpur',           desc: "One of Southeast Asia's largest Chinese temples, famous for its hundreds of red lanterns." },
  { src: 'images/gallery/my-perhentian-bay.jpg', country: 'malaysia',  title: 'Perhentian Islands — Terengganu',           desc: "Boats resting in the bay of Perhentian Kecil under a fiery sky — paradise islands on Malaysia's east coast." },
  { src: 'images/gallery/my-perhentian-village.jpg', country: 'malaysia', title: 'Fisherman Village — Perhentian Islands', desc: 'The stilt restaurants of the fishermen\'s village light up at dusk, right over the water.' },
  { src: 'images/gallery/my-perhentian-boat.jpg',  country: 'malaysia', title: 'Boat trip at dawn — Perhentian Islands',   desc: 'Gliding over glassy water at sunrise — the classic way to hop between the islands\' beaches.' },
  { src: 'images/gallery/my-perhentian-sunset.jpg', country: 'malaysia', title: 'Sunset over the South China Sea',         desc: 'Watching the sun melt into the sea from the beach — every evening ends like this in the Perhentians.' },
  { src: 'images/gallery/my-perhentian-turtle.jpg', country: 'malaysia', title: 'Green Sea Turtle — Perhentian Islands',   desc: 'Snorkelling side by side with wild green turtles in crystal-clear water, just metres from the beach.' },
  { src: 'images/gallery/my-perhentian-nemo.jpg',   country: 'malaysia', title: 'Finding Nemo — Perhentian Islands',       desc: 'A clownfish peeking out of its sea anemone on the shallow coral reef.' },
  { src: 'images/gallery/my-perhentian-shark.jpg',  country: 'malaysia', title: 'Blacktip Reef Shark — Perhentian Islands', desc: 'A (harmless!) blacktip reef shark patrolling the reef — one of the most thrilling encounters of the trip.' },
  { src: 'images/gallery/my-melaka-church.jpg',  country: 'malaysia',  title: 'Church of St. Francis Xavier — Melaka',     desc: 'A neo-Gothic church built in 1849, one landmark among many in Melaka\'s UNESCO-listed historic centre.' },
  { src: 'images/gallery/my-melaka-afamosa.jpg', country: 'malaysia',  title: 'A Famosa Fort — Melaka',                    desc: 'The Porta de Santiago gate — one of the oldest European ruins in Asia.' },
  { src: 'images/gallery/my-melaka-jonker.jpg',  country: 'malaysia',  title: 'Jonker Street — Melaka',                    desc: 'Colourful shophouses, chicken-rice balls and antique shops in the heart of Melaka\'s Chinatown.' },
  { src: 'images/gallery/my-melaka-temple.jpg',  country: 'malaysia',  title: 'Chinese Clan House — Melaka',               desc: "Gilded calligraphy boards and quiet courtyards inside a clan house of Melaka's centuries-old Chinese community." },
  { src: 'images/gallery/sg-marina-bay.jpg',     country: 'singapore', title: 'Marina Bay — Singapore',                    desc: "Singapore's futuristic skyline around Marina Bay Sands — one hour by plane from KL." },
  { src: 'images/gallery/sg-merlion.jpg',        country: 'singapore', title: 'The Merlion',                               desc: 'Half lion, half fish — the national icon of Singapore watching over the bay.' },
  { src: 'images/gallery/sg-gardens-bay-1.jpg',  country: 'singapore', title: 'Gardens by the Bay',                        desc: 'A futuristic nature park of biodomes and skywalks in the heart of the city.' },
  { src: 'images/gallery/sg-gardens-bay-2.jpg',  country: 'singapore', title: 'Inside Gardens by the Bay',                 desc: 'Waterfalls, orchids and misty walkways beneath the glass domes.' },
  { src: 'images/gallery/sg-supertrees.jpg',     country: 'singapore', title: 'Supertree Grove',                           desc: 'The 50 m solar-powered Supertrees light up every evening for the free Garden Rhapsody show.' },
  { src: 'images/gallery/sg-botanic-garden-1.jpg', country: 'singapore', title: 'Singapore Botanic Gardens',               desc: 'A UNESCO World Heritage site, over 160 years old and home to 10,000 plant species.' },
  { src: 'images/gallery/sg-botanic-garden-2.jpg', country: 'singapore', title: 'Botanic Gardens Greenery',                desc: 'Tropical calm in the middle of the city.' },
  { src: 'images/gallery/sg-jewel-vortex.jpg',   country: 'singapore', title: 'Jewel Changi — Rain Vortex',                desc: "The world's tallest indoor waterfall (40 m), right inside Singapore's Changi Airport." },
  { src: 'images/gallery/sg-sentosa.jpg',        country: 'singapore', title: 'Sentosa Island',                            desc: "Singapore's resort island — beaches, cable cars and Universal Studios." },
  { src: 'images/gallery/th-grand-palace-1.jpg', country: 'thailand',  title: 'The Grand Palace — Bangkok',                desc: "Home of the Kings of Siam since 1782 and Thailand's most sacred site." },
  { src: 'images/gallery/th-grand-palace-2.jpg', country: 'thailand',  title: 'Grand Palace Details',                      desc: 'Gilded chedis, mosaic pillars and mythical guardians at every corner.' },
  { src: 'images/gallery/th-grand-palace-3.jpg', country: 'thailand',  title: 'Grand Palace Courtyards',                   desc: 'Every roofline glitters — allow half a day to take it all in.' },
  { src: 'images/gallery/th-wat-pho-1.jpg',      country: 'thailand',  title: 'Wat Pho — Bangkok',                         desc: 'Temple of the Reclining Buddha and the birthplace of traditional Thai massage.' },
  { src: 'images/gallery/th-wat-pho-2.jpg',      country: 'thailand',  title: 'Wat Pho Stupas',                            desc: 'Great chedis covered in hand-painted porcelain flowers.' },
  { src: 'images/gallery/th-wat-pho-3.jpg',      country: 'thailand',  title: 'Wat Pho Grounds',                           desc: 'A maze of golden spires and quiet courtyards, five minutes from the Grand Palace.' },
  { src: 'images/gallery/th-bangkok-skyline.jpg',  country: 'thailand', title: 'Bangkok Skyline',                          desc: 'A sprawling megacity of 11 million people — two hours from KL by plane.' },
  { src: 'images/gallery/th-bangkok-rooftop.jpg',  country: 'thailand', title: 'Bangkok Rooftops',                         desc: 'Sunset drinks above the city — rooftop bars are a Bangkok institution.' },
  { src: 'images/gallery/th-chatuchak-market.jpg', country: 'thailand', title: 'Chatuchak Weekend Market',                 desc: 'Over 15,000 stalls — one of the largest markets in the world.' },
  { src: 'images/gallery/th-night-market.jpg',   country: 'thailand',  title: 'Bangkok Night Market',                      desc: 'Street-food paradise: pad thai, mango sticky rice and grilled skewers for a couple of euros.' },
  { src: 'images/gallery/th-muay-thai.jpg',      country: 'thailand',  title: "Muay Thai — Rajadamnern Stadium",           desc: "Thailand's national sport, live in Bangkok's legendary boxing arena." },
  { src: 'images/gallery/ch-Bruce-Lee-statue.jpg',         country: 'china', title: 'Bruce Lee Statue — Hong Kong',        desc: 'The iconic bronze statue of the martial arts legend on the Avenue of Stars.' },
  { src: 'images/gallery/ch-Chin-Lin.jpg',                 country: 'china', title: 'Chi Lin Nunnery — Hong Kong',         desc: 'A tranquil Buddhist nunnery complex featuring stunning wooden architecture and lotus ponds.' },
  { src: 'images/gallery/ch-Chin-Lin2.jpg',                country: 'china', title: 'Chi Lin Nunnery Gardens — Hong Kong', desc: 'A closer look at the traditional Chinese architectural details.' },
  { src: 'images/gallery/ch-Hong-Kong.jpg',                country: 'china', title: 'Hong Kong Skyline',                   desc: 'The breathtaking panoramic view of the famous skyline across Victoria Harbour.' },
  { src: 'images/gallery/ch-Hong-kong2.jpg',               country: 'china', title: 'Victoria Harbour — Hong Kong',        desc: 'A vibrant scene looking out across the bustling waters of Victoria Harbour.' },
  { src: 'images/gallery/ch-Lianhuashan-park.jpg',         country: 'china', title: 'Lianhuashan Park — Shenzhen',         desc: 'A popular hilltop park offering panoramic views of the modern Shenzhen cityscape.' },
  { src: 'images/gallery/ch-Nan-Lian.jpg',                 country: 'china', title: 'Nan Lian Garden — Hong Kong',         desc: 'A beautifully landscaped Chinese classical garden in the heart of the city.' },
  { src: 'images/gallery/ch-Shenzhen-day.jpg',             country: 'china', title: 'Shenzhen Cityscape — Day',            desc: 'The bustling urban landscape of Shenzhen under the daylight.' },
  { src: 'images/gallery/ch-Shenzhen-night.jpg',           country: 'china', title: 'Shenzhen Cityscape — Night',          desc: 'The impressive skyline of Shenzhen illuminating the night sky.' },
  { src: 'images/gallery/ch-Xixiang.jpg',                  country: 'china', title: 'Xixiang Area — Shenzhen',             desc: 'A glimpse into the local atmosphere of the Xixiang district.' },
  { src: 'images/gallery/ch-animal.jpg',                   country: 'china', title: 'Local Wildlife',                      desc: 'A captured moment of local fauna.' },
  { src: 'images/gallery/ch-lianhuashan-park-statue.jpg',  country: 'china', title: 'Deng Xiaoping Statue — Shenzhen',     desc: 'The prominent statue at the summit of Lianhuashan Park, overlooking Shenzhen.' },
  { src: 'images/gallery/ch-sik-sik-yuen-wong-tai-statue.jpg', country: 'china', title: 'Wong Tai Sin Temple — Hong Kong', desc: 'The colorful Sik Sik Yuen Wong Tai Sin Temple, famous for its wish-granting reputation.' },
  { src: 'images/gallery/ch-spiral-library.jpg',           country: 'china', title: 'Modern Architecture',                 desc: 'A unique architectural perspective of a modern library design.' },
];

const COURSE_BADGES = { 'K17SW': 'badge-web', 'K17PL-SS': 'badge-py', 'MALAY-SS': 'badge-malay' };
const STAT_LABELS   = { 'K17SW': 'Web Development', 'K17PL-SS': 'Python ML', 'MALAY-SS': 'Malay Skills' };
const API_BASE      = 'php/';

/* API helper */
async function apiRequest(url, postData) {
  const options = postData
    ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(postData) }
    : undefined;
  const res = await fetch(API_BASE + url, options);
  let json = null;
  try { json = await res.json(); } catch {}
  if (!res.ok || !json || json.success === false)
    throw new Error(json?.error || 'Server error (HTTP ' + res.status + ')');
  return json;
}

/* Navbar */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive]     = useState('home');

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
      const sections = document.querySelectorAll('section[id]');
      let cur = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 100) cur = s.id; });
      setActive(cur);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = ['home','about','courses','testimonials','gallery','register','admin','contact'];
  const labels = { home:'Home', about:'About', courses:'Courses', testimonials:'Testimonials',
                   gallery:'Gallery', register:'Register', admin:'Database', contact:'Contact' };

  function closeMenu() { setMenuOpen(false); }

  return (
    <header>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <div className="container">
          <a className="nav-brand" href="#home" aria-label="HWUM Summer Programme home">
            <span>HWUM</span>&nbsp;Summer&thinsp;&mdash;&thinsp;2027
          </a>
          <div className={`nav-links-wrap${menuOpen ? ' open' : ''}`} id="navLinksWrap">
            {links.map(id => (
              <a key={id} href={`#${id}`}
                 className={active === id ? 'active' : ''}
                 onClick={closeMenu}>
                {labels[id]}
              </a>
            ))}
            <a href="#register" className="btn btn-primary nav-cta" onClick={closeMenu}>Apply Now →</a>
          </div>
          <button className={`hamburger${menuOpen ? ' open' : ''}`}
                  aria-label="Toggle menu"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen(o => !o)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}

/* Gallery */
function Gallery() {
  const [filter, setFilter]           = useState('all');
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const trackRef = useRef(null);
  const [counter, setCounter] = useState('');

  const visible = filter === 'all'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.country === filter);

  function updateCounter() {
    const el = trackRef.current;
    if (!el || !visible.length) { setCounter(''); return; }
    const slideW = (el.querySelector('.carousel-slide')?.offsetWidth || 400) + 20;
    const idx = Math.min(visible.length, Math.round(el.scrollLeft / slideW) + 1);
    setCounter(`${idx} / ${visible.length} photos`);
  }

  useEffect(() => {
    if (trackRef.current) trackRef.current.scrollLeft = 0;
    updateCounter();
  }, [filter]);

  function scroll(dir) {
    const el = trackRef.current;
    if (!el) return;
    const slideW = (el.querySelector('.carousel-slide')?.offsetWidth || 400) + 20;
    el.scrollBy({ left: dir * slideW, behavior: 'smooth' });
  }

  useEffect(() => {
    function onKey(e) {
      if (lightboxIdx === null) return;
      if (e.key === 'Escape')     setLightboxIdx(null);
      if (e.key === 'ArrowLeft')  setLightboxIdx(i => (i - 1 + visible.length) % visible.length);
      if (e.key === 'ArrowRight') setLightboxIdx(i => (i + 1) % visible.length);
    }
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, visible.length]);

  const countries = [...new Set(GALLERY_PHOTOS.map(p => p.country))];

  return (
    <section id="gallery" className="section-wrap" aria-label="Photo Gallery — Places to Discover">
      <div className="container">
        <div className="text-center">
          <span className="section-label reveal">05 &mdash; Gallery</span>
          <h2 className="section-title reveal">Places You Will Discover</h2>
          <p className="section-desc reveal">
            With classes running Monday to Wednesday only, every week is a chance to explore.
            Here is what awaits you in Malaysia — and just a short flight away in Singapore, Thailand and beyond.
            All photos were taken by previous participants.
          </p>
        </div>

        <div className="gallery-filters reveal" role="group" aria-label="Filter photos by country">
          <button className={`filter-btn${filter === 'all' ? ' active' : ''}`}
                  onClick={() => setFilter('all')}>
            All <sup>{GALLERY_PHOTOS.length}</sup>
          </button>
          {countries.map(c => (
            <button key={c}
                    className={`filter-btn${filter === c ? ' active' : ''}`}
                    onClick={() => setFilter(c)}>
              {COUNTRIES[c].flag} {COUNTRIES[c].label} <sup>{GALLERY_PHOTOS.filter(p => p.country === c).length}</sup>
            </button>
          ))}
        </div>

        <div className="carousel reveal">
          <button className="carousel-btn prev" onClick={() => scroll(-1)} aria-label="Previous photos">&#10094;</button>
          <div className="carousel-track" ref={trackRef} onScroll={updateCounter} aria-label="Photo carousel">
            {visible.map((photo, i) => (
              <figure key={photo.src + i}
                      className="carousel-slide"
                      tabIndex={0}
                      role="button"
                      aria-label={`View ${photo.title} full size`}
                      onClick={() => setLightboxIdx(i)}
                      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIdx(i); } }}>
                <img src={photo.src} alt={photo.title} loading="lazy" decoding="async" />
                <figcaption className="slide-caption">
                  <span className="slide-country">{COUNTRIES[photo.country].flag} {COUNTRIES[photo.country].label}</span>
                  <h3>{photo.title}</h3>
                  <p>{photo.desc}</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <button className="carousel-btn next" onClick={() => scroll(1)} aria-label="Next photos">&#10095;</button>
        </div>
        <p className="carousel-counter" aria-live="polite">{counter}</p>
      </div>

      {lightboxIdx !== null && (
        <div className="lightbox open" role="dialog" aria-modal="true" aria-label="Image viewer"
             onClick={e => { if (e.target.classList.contains('lightbox')) setLightboxIdx(null); }}>
          <button className="lightbox-close" onClick={() => setLightboxIdx(null)} aria-label="Close image viewer">&times;</button>
          <button className="lightbox-nav prev"
                  onClick={() => setLightboxIdx(i => (i - 1 + visible.length) % visible.length)}
                  aria-label="Previous image">&#10094;</button>
          <figure className="lightbox-figure">
            <img id="lightboxImg" src={visible[lightboxIdx].src} alt={visible[lightboxIdx].title} />
            <figcaption id="lightboxCaption">
              <strong>{visible[lightboxIdx].title}</strong>{visible[lightboxIdx].desc}
            </figcaption>
          </figure>
          <button className="lightbox-nav next"
                  onClick={() => setLightboxIdx(i => (i + 1) % visible.length)}
                  aria-label="Next image">&#10095;</button>
        </div>
      )}
    </section>
  );
}

/* Registration form */
function RegistrationForm({ courses, onRegisterSuccess }) {
  const [values, setValues]     = useState({ name:'', phone:'', email:'', courseID:'', comments:'' });
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmit] = useState(false);
  const [globalErr, setGlobal]  = useState('');
  const [success, setSuccess]   = useState(false);

  function validate(field, val) {
    if (['name','phone','email','courseID'].includes(field) && !val.trim())
      return 'This field is required.';
    if (field === 'email' && val.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()))
      return 'Please enter a valid email address.';
    if (field === 'phone' && val.trim() && !/^[\d\s+\-()\[\]]{6,20}$/.test(val.trim()))
      return 'Please enter a valid phone number.';
    return '';
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues(v => ({ ...v, [name]: value }));
    if (errors[name]) setErrors(er => ({ ...er, [name]: validate(name, value) }));
  }

  function handleBlur(e) {
    const { name, value } = e.target;
    setErrors(er => ({ ...er, [name]: validate(name, value) }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
    ['name','phone','email','courseID'].forEach(f => {
      const msg = validate(f, values[f]);
      if (msg) newErrors[f] = msg;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    setSubmit(true);
    setGlobal('');
    try {
      await apiRequest('register.php', {
        name: values.name, phone: values.phone, email: values.email,
        courseID: Number(values.courseID), comments: values.comments
      });
      setSuccess(true);
      onRegisterSuccess();
    } catch (err) {
      setGlobal(err instanceof TypeError
        ? 'Cannot reach the database server. Is XAMPP running?'
        : err.message);
    } finally {
      setSubmit(false);
    }
  }

  if (success) return (
    <div className="form-success" aria-live="polite">
      <h3>Registration Submitted</h3>
      <p>Thank you for your interest in the HWUM Summer Programme 2027. Your information has been saved to our database. You will receive a confirmation email from Suzanne Vilchez shortly.</p>
      <br />
      <button className="btn btn-dark" style={{margin:'0 auto'}}
              onClick={() => { setSuccess(false); setValues({ name:'', phone:'', email:'', courseID:'', comments:'' }); }}>
        Register Another Student
      </button>
    </div>
  );

  return (
    <form id="regForm" noValidate aria-label="Summer Programme registration form" onSubmit={handleSubmit}>
      <h3>Registration Form</h3>
      <p>All fields marked <span style={{color:'var(--accent2)'}}>*</span> are required.</p>

      <div className="form-group">
        <label htmlFor="fname">Full Name <span>*</span></label>
        <input type="text" id="fname" name="name" className={`form-control${errors.name ? ' error' : ''}`}
               placeholder="e.g. Sophie Martin" required autoComplete="name"
               value={values.name} onChange={handleChange} onBlur={handleBlur} />
        {errors.name && <span className="error-msg show" role="alert">{errors.name}</span>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="fphone">Contact Number <span>*</span></label>
          <input type="tel" id="fphone" name="phone" className={`form-control${errors.phone ? ' error' : ''}`}
                 placeholder="+33 6 12 34 56 78" required autoComplete="tel"
                 value={values.phone} onChange={handleChange} onBlur={handleBlur} />
          {errors.phone && <span className="error-msg show" role="alert">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="femail">Email Address <span>*</span></label>
          <input type="email" id="femail" name="email" className={`form-control${errors.email ? ' error' : ''}`}
                 placeholder="you@esiea.fr" required autoComplete="email"
                 value={values.email} onChange={handleChange} onBlur={handleBlur} />
          {errors.email && <span className="error-msg show" role="alert">{errors.email}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="fcourse">Preferred Course <span>*</span></label>
        <select id="fcourse" name="courseID" className={`form-control${errors.courseID ? ' error' : ''}`} required
                value={values.courseID} onChange={handleChange} onBlur={handleBlur}>
          <option value="" disabled>— Select a course —</option>
          {courses.map(c => (
            <option key={c.courseID} value={c.courseID}>{c.courseName} ({c.courseCode})</option>
          ))}
        </select>
        {errors.courseID && <span className="error-msg show" role="alert">{errors.courseID}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="fcomments">Additional Comments</label>
        <textarea id="fcomments" name="comments" className="form-control"
                  placeholder="Any questions, dietary requirements, or additional information…"
                  value={values.comments} onChange={handleChange} />
      </div>

      {globalErr && <span className="error-msg show" role="alert">{globalErr}</span>}
      <button type="submit" className="btn btn-dark btn-primary form-submit" disabled={submitting}>
        {submitting ? 'Submitting…' : 'Submit Registration →'}
      </button>
    </form>
  );
}

/* Admin panel */
function AdminPanel({ courses, refreshKey, onCoursesLoaded }) {
  const [rows, setRows]         = useState([]);
  const [stats, setStats]       = useState([]);
  const [total, setTotal]       = useState(0);
  const [filterCourse, setFC]   = useState('all');
  const [search, setSearch]     = useState('');
  const [dbError, setDbError]   = useState('');
  const searchTimer = useRef(null);
  const coursesLoadedRef = useRef(false);

  const load = useCallback(async () => {
    const params = new URLSearchParams();
    if (filterCourse !== 'all') params.set('course', filterCourse);
    if (search.trim()) params.set('search', search.trim());
    try {
      const data = await apiRequest('registrations.php?' + params.toString());
      setRows(data.registrations);
      setStats(data.stats);
      setTotal(data.total);
      setDbError('');
      if (!coursesLoadedRef.current && data.courses.length > 0) {
        coursesLoadedRef.current = true;
        onCoursesLoaded(data.courses);
      }
    } catch (err) {
      setDbError(err instanceof TypeError
        ? 'Database offline — Start Apache and MySQL in XAMPP, import database.sql, then open via http://localhost/'
        : 'Database error — ' + err.message);
      setRows([]);
    }
  }, [filterCourse, search, onCoursesLoaded]);

  useEffect(() => { load(); }, [load, refreshKey]);

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(load, 300);
  }

  async function handleDelete(id) {
    if (!confirm('Remove this registration from the database?')) return;
    try {
      await apiRequest('delete.php', { id });
      load();
    } catch (err) {
      setDbError('Delete error — ' + err.message);
    }
  }

  function exportCSV() {
    if (!rows.length) { alert('No registrations to export.'); return; }
    const q = v => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const header = ['ID','Name','Phone','Email','Course','Comments','Date'];
    const body   = rows.map(r => [
      r.regID, q(r.fullName), q(r.phone), q(r.email),
      q(r.courseName), q(r.comments),
      new Date(r.regDate.replace(' ','T')).toLocaleDateString('en-GB')
    ]);
    const csv  = [header, ...body].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'hwum_registrations.csv' });
    a.click(); URL.revokeObjectURL(url);
  }

  return (
    <section id="admin" className="section-wrap" aria-label="Registration Database">
      <div className="container">
        <span className="section-label reveal">06 &mdash; Database</span>
        <h2 className="section-title reveal">Registration Database</h2>
        <p className="section-desc reveal">
          All submitted registrations are stored in a MySQL database (<code>hwum_summer</code>) queried through PHP and SQL.
          They can be filtered by course, searched by name or email, and exported as CSV.
        </p>

        {dbError && <div className="db-status" role="alert">{dbError}</div>}

        <div className="stats-bar reveal" aria-label="Registration statistics">
          <div className="stat-pill"><strong>{total}</strong>Total Registrations</div>
          {stats.map(s => (
            <div key={s.courseCode} className="stat-pill">
              <strong>{s.total}</strong>{STAT_LABELS[s.courseCode] || s.courseName}
            </div>
          ))}
        </div>

        <div className="admin-header reveal">
          <div className="admin-filters" role="group" aria-label="Filter registrations">
            <label htmlFor="filterCourse">Filter by course:</label>
            <select id="filterCourse" value={filterCourse} onChange={e => setFC(e.target.value)}>
              <option value="all">All Courses</option>
              {courses.map(c => (
                <option key={c.courseID} value={c.courseID}>{c.courseName}</option>
              ))}
            </select>
            <input type="search" className="admin-search"
                   placeholder="Search name or email…"
                   value={search} onChange={handleSearchChange}
                   aria-label="Search registrations" />
          </div>
          <button className="export-btn" onClick={exportCSV}>Export CSV</button>
        </div>

        <div className="table-wrap reveal" role="region" aria-label="Registrations table" aria-live="polite">
          <table>
            <thead>
              <tr>
                <th scope="col">Full Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Email</th>
                <th scope="col">Course</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr><td colSpan={6} className="table-empty">
                  <p>{dbError ? 'Database not connected.' : (total === 0
                    ? 'Registrations will appear here once students submit the form.'
                    : 'No registrations match your filters.')}</p>
                </td></tr>
              ) : rows.map(r => {
                const date  = new Date(r.regDate.replace(' ','T')).toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });
                const badge = COURSE_BADGES[r.courseCode] || '';
                return (
                  <tr key={r.regID}>
                    <td>{r.fullName}</td>
                    <td>{r.phone}</td>
                    <td><a href={`mailto:${r.email}`}>{r.email}</a></td>
                    <td><span className={`course-badge ${badge}`}>{r.courseName}</span></td>
                    <td>{date}</td>
                    <td><button className="delete-btn" onClick={() => handleDelete(r.regID)}>Delete</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* Registration form + admin panel share course list and refresh state through
   one component, rendered as a portal into #formWrap so both stay in sync
   via normal React props instead of global variables. */
function RegisterAndAdmin() {
  const [courses, setCourses]       = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const formWrapEl = document.getElementById('formWrap');

  return (
    <>
      {formWrapEl && ReactDOM.createPortal(
        <RegistrationForm courses={courses} onRegisterSuccess={() => setRefreshKey(k => k + 1)} />,
        formWrapEl
      )}
      <AdminPanel courses={courses} refreshKey={refreshKey} onCoursesLoaded={setCourses} />
    </>
  );
}

/* Mount */
const navbarRoot  = document.getElementById('navbarRoot');
const galleryRoot = document.getElementById('galleryRoot');
const adminRoot    = document.getElementById('adminRoot');

if (navbarRoot)  ReactDOM.createRoot(navbarRoot).render(<Navbar />);
if (galleryRoot) ReactDOM.createRoot(galleryRoot).render(<Gallery />);
if (adminRoot)   ReactDOM.createRoot(adminRoot).render(<RegisterAndAdmin />);

/* Scroll reveal for both static sections and the content React just mounted */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
