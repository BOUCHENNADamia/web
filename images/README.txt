HWUM Summer Programme 2027 — Image Assets
==========================================

STRUCTURE
  /images/
    hero-bg.jpg          → Hero banner (Petronas Towers, generated from Petronas.JPEG)
    about-campus.jpg     → About section (Putra Mosque, generated from Putrajaya_Mosque.JPEG)
    *.JPEG               → Original full-resolution photos (kept as source material,
                           NOT referenced by the website)
    /gallery/            → Web-optimised copies (max 1600 px, JPEG q80) used by the site

GALLERY NAMING
  Files are prefixed by country:  my- = Malaysia · sg- = Singapore · th- = Thailand

ADDING A PHOTO TO THE CAROUSEL
  1. Export a web-optimised copy (max ~1600 px) into /images/gallery/
     e.g.  cn-great-wall.jpg  for a China photo
  2. Open js/main.js and add one entry to the GALLERY_PHOTOS array
     (src, country, title, desc). The country filter button appears automatically.

NOTE
  Box_Thaï.JPEG  is the Rajadamnern Muay Thai stadium  → th-muay-thai.jpg
  Thaïlande.JPEG is a Bangkok night market             → th-night-market.jpg
