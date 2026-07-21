import { useState, useEffect, useRef } from 'react';
import { COUNTRIES, GALLERY_PHOTOS } from '../data.js';

export default function Gallery() {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
