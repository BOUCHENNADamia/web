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

MELAKA SET (Malaysia — my-melaka-*)
  Melaka.JPEG              → my-melaka-church.jpg   (Church of St. Francis Xavier, 1849)
  Melaka_2.JPEG            → my-melaka-afamosa.jpg  (A Famosa / Porta de Santiago)
  ChinaTown_MElaka_2.JPEG  → my-melaka-jonker.jpg   (Jonker Street shophouses)
  ChinaTown_Melaka.JPEG    → my-melaka-temple.jpg   (Chinese clan house interior)
  Melaka_3.JPEG            → NOT converted: the file is actually HEIC (no
                             Windows HEIF codec available). Re-export it as
                             JPEG from your phone to add it to the gallery.
  Group_Photo.JPEG         → group-photo.jpg        (contact section, Dutch Square)

PERHENTIAN ISLANDS SET (Malaysia — my-perhentian-*)
  Perhentian.JPEG        → my-perhentian-bay.jpg      (boats in the bay at sunset)
  FisherMan_Village.jpg  → my-perhentian-village.jpg  (stilt village at dusk)
  Perhentian.jpg         → my-perhentian-boat.jpg     (boat bow at dawn)
  Sunset.JPEG            → my-perhentian-sunset.jpg   (EXIF orientation fixed)
  Green_Turtle.jpg       → my-perhentian-turtle.jpg   (snorkelling with a green turtle)
  Nemo.jpg               → my-perhentian-nemo.jpg     (clownfish in its anemone)
  Shark.jpg              → my-perhentian-shark.jpg    (blacktip reef shark)
