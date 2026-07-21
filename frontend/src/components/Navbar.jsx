import { useState, useEffect } from 'react';
import { NAV_LINKS, NAV_LABELS } from '../data.js';

export default function Navbar() {
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

  function closeMenu() { setMenuOpen(false); }

  return (
    <header>
      <nav id="navbar" className={scrolled ? 'scrolled' : ''} role="navigation" aria-label="Main navigation">
        <div className="container">
          <a className="nav-brand" href="#home" aria-label="HWUM Summer Programme home">
            <span>HWUM</span>&nbsp;Summer&thinsp;&mdash;&thinsp;2027
          </a>
          <div className={`nav-links-wrap${menuOpen ? ' open' : ''}`} id="navLinksWrap">
            {NAV_LINKS.map(id => (
              <a key={id} href={`#${id}`}
                 className={active === id ? 'active' : ''}
                 onClick={closeMenu}>
                {NAV_LABELS[id]}
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
