# Oral Presentation Plan — HWUM Summer Programme 2027 Website

> K17SW Web Development and Databases — Week 8 presentation (10% de la note ; le projet lui-même vaut 30%).
> **Format : 10 minutes, 5 intervenants (~2 min chacun), démo live.**
> Les scripts sont en anglais (à dire tel quel ou reformulé avec vos mots) ; les indications `[SHOW: …]` disent quoi montrer à l'écran à ce moment-là ; les remarques d'organisation sont en français.

---

## Ligne directrice

Le sujet (site promotionnel + inscription + base de données) est la **consigne commune à tous les groupes** — inutile d'argumenter longuement pourquoi ce site existe, une phrase suffit. Ce qui différencie les groupes, c'est l'exécution technique. Donc :

- **Le sujet** : une phrase, on passe.
- **Design (couleurs, polices, HTML/CSS)** : bref (~45 s), avec le vocabulaire du cours (consistency, visual hierarchy, accessibility).
- **Technique (React, PHP, SQL, sécurité)** : c'est le cœur de la présentation — surtout la base de données, puisque le module s'appelle *Web Development and **Databases***.
- **Démo live** : votre meilleur atout — un formulaire qui écrit réellement en base vaut mieux que des slides.

Supports recommandés : **le site en direct pour presque tout** + 2 slides seulement (1 slide titre/équipe, 1 slide diagramme ER repris du README). Moins de slides = plus de démo.

---

## Déroulé minuté

| Temps | Intervenant | Sujet | Support |
|---|---|---|---|
| 0:00–1:20 | Speaker 1 | Sujet (1 phrase), Information Architecture | Slide titre → site (scroll) |
| 1:20–3:20 | Speaker 2 | Front-end : HTML sémantique, CSS, responsive, design | Site (resize + DevTools) |
| 3:20–5:40 | Speaker 3 | React : composants, state, hooks, fetch API | Site (gallery + form) + DevTools |
| 5:40–8:10 | Speaker 4 | Base de données & PHP : modèle ER, SQL, sécurité | Slide ER → site (register + admin) |
| 8:10–10:00 | Speaker 5 | Choix techniques, limites, conclusion | Site (Database panel) → slide titre |

---

## Speaker 1 — Introduction & Information Architecture (0:00–1:20, ~170 mots)

**Script (EN) :**

> [SHOW: slide titre — nom du projet + les 5 prénoms]
> Good morning everyone. Our website is a promotional and registration site for the **HWUM Summer Programme 2027**, built for the module's shared brief — an ESIEA mobility programme site with a real database-backed registration form.
>
> [SHOW: le site en direct — scroller lentement du hero jusqu'au footer pendant les phrases suivantes]
> For the information architecture, we chose a **single-page design with seven sections**, ordered like a funnel: first you *discover* — the hero and the About section; then you *evaluate* — the courses and testimonials from previous participants; then you *act* — the registration form; and finally you *explore* — the photo gallery and the contact details. The fixed navigation bar highlights the section you're in, so you always know where you are — that's the core of good IA as we saw in Week 1.
>
> The stack: **semantic HTML5 and CSS3** for structure and design, **React** for the interactive parts of the page, and **PHP with PDO and MySQL** on the server. My teammates will now walk you through each layer.

**Transition :** "Let's start with the front end — [prénom]?"

---

## Speaker 2 — Front-end : semantic HTML, CSS, responsive (1:20–3:20, ~260 mots)

**Script (EN) :**

> [SHOW: le site, section About à l'écran]
> The front end follows one principle from Week 2: **separation of structure and presentation**. Sections like About, Courses, Testimonials and Contact are plain **semantic HTML5** — no framework needed for static content. All presentation lives in a single external stylesheet; there are zero inline styles.
>
> [SHOW: DevTools ouverts (F12), onglet Elements, replier le body pour montrer header/main/section/footer]
> The markup uses a `header`, a `main` landmark, `section` and `article` elements, `figure` with `figcaption` for images, a `footer` — and one single `h1` with a logical heading hierarchy below it. This matters for three reasons: maintainability, accessibility for screen readers, and SEO.
>
> [SHOW: fermer DevTools, remonter en haut du site]
> For the design, we went for a "Malaysian summer" travel-poster feel: palm green, mango yellow and paper cream, defined **once** as CSS custom properties in `:root` — so the entire theme can be changed in one place, which is what gives the site its consistency. Typography: Young Serif for display headings, Albert Sans for reading comfort. Layout is done with **CSS Grid and Flexbox**, and font sizes use `clamp()` so they scale fluidly with the viewport.
>
> [SHOW: réduire la fenêtre à ~375px de large — ou DevTools mode mobile — montrer le menu hamburger, l'ouvrir, cliquer un lien]
> The site is fully **responsive** through media queries — on mobile the navigation collapses into this hamburger menu.
>
> Accessibility: a skip-to-content link, alt text on all 49 photos, WCAG-checked contrast, keyboard navigation with visible focus.
>
> The navigation bar, the gallery, the registration form and the database panel you'll see next are **not static HTML** — they're React components. Over to [prénom].

**Transition :** "Let's look at how React fits into this page."

---

## Speaker 3 — React: components, state, hooks (3:20–5:40, ~280 mots)

**Script (EN) :**

> [SHOW: section Gallery]
> As covered in Week 4, we used **React** for every part of the page that needs to react to user interaction: the navigation bar, the photo gallery, the registration form, and the database panel. Each is a proper **function component** using hooks — `useState` for state, `useEffect` for side effects like fetching data, `useRef` for direct DOM access when we need it, for example to control the horizontal scroll of the carousel.
>
> One deliberate choice: instead of a build step like Create React App, we load **React and Babel directly from a CDN** and write JSX straight in the browser. That means deploying this site is still just "copy the files into htdocs" — exactly like a plain HTML site, no `npm install` needed on the server. The trade-off is that the browser transpiles the JSX on every page load instead of once at build time — acceptable for a small single-page site, not something we'd do at a larger scale.
>
> [SHOW: cliquer les filtres pays — Malaysia, puis China — puis cliquer une photo pour ouvrir la lightbox, naviguer avec les flèches, fermer]
> The gallery is **data-driven**: our 49 photos are described in a single JavaScript array — source, country, title, caption. The filter buttons, the photo counts, and the carousel slides are all **generated from that array and from state**, with `visible.map()` — this is the React idiom the course introduced with `key` props and list rendering.
>
> [SHOW: section Register — taper "abc" dans le champ email, cliquer ailleurs → l'erreur apparaît ; corriger → l'erreur disparaît]
> The registration form is a **controlled component** — every input's value lives in React state, updated on every keystroke, with validation re-run on blur. But as Week 3 taught us: client-side validation is for **user experience**, not security — anyone can bypass it with DevTools or curl. So every rule is checked **a second time on the server**, in PHP.
>
> The form talks to the server with the **fetch API** inside an async function — and the same mechanism powers the database panel, which [prénom] will show you now.

**Transition :** "And that's where the database comes in."

---

## Speaker 4 — Database & PHP backend (5:40–8:10, ~320 mots) — LE MOMENT FORT

**Script (EN) :**

> [SHOW: slide avec le diagramme ER (repris du README)]
> Behind the form there's a MySQL database with **two related tables**. `courses` holds the three courses; `registrations` holds the applicants. They're linked by a **foreign key** — each registration belongs to exactly one course, a course can have many registrations. The design is **normalized**: course details are stored once, never duplicated in each registration row. Three constraints do real work here: the foreign key has `ON DELETE RESTRICT` — you cannot delete a course that still has registrations; `ON UPDATE CASCADE`; and a **UNIQUE constraint on email** — the database itself refuses duplicate registrations.
>
> [SHOW: basculer sur le site, remplir le formulaire avec un nom réel de l'équipe + un email inventé, choisir un cours, Submit → message de succès]
> Let me register live. This just executed an SQL `INSERT` through PHP, called from our React form's submit handler.
>
> [SHOW: scroller à la section Database — la nouvelle ligne est en haut du tableau]
> And here it is — this admin panel, also a React component, is fed by a `SELECT` with an **INNER JOIN** between the two tables, through the fetch API.
>
> [SHOW: choisir un cours dans le filtre, puis taper un nom dans la recherche]
> Important point: this filtering and this search are **not done in JavaScript** — each action sends a new request and the filtering happens **in SQL**, with a `WHERE` clause and a `LIKE` pattern. These statistics pills are a `LEFT JOIN` with `GROUP BY` and `COUNT` — LEFT JOIN so a course with zero registrations still appears.
>
> [SHOW: re-soumettre le formulaire avec le MÊME email → message d'erreur "already registered"]
> If I try to register twice with the same email — rejected. That's the UNIQUE constraint, caught by PHP and returned as a friendly message.
>
> **Security**: every single query uses **PDO prepared statements** — the SQL and the user data travel separately, so SQL injection is impossible by construction. Plus server-side validation on every field.

**Transition :** "So the site works — but every technical choice deserves a justification. [Prénom]?"

---

## Speaker 5 — Technical choices, limits, conclusion (8:10–10:00, ~250 mots)

**Script (EN) :**

> [SHOW: section Database à l'écran]
> An honest limitation first: this Database panel is **open** — no login, and anyone can delete a row. In a real deployment this would sit behind authentication, and deletion would be restricted to administrators. We kept it visible **on purpose**, so the SQL requirements of this assignment can be assessed live. Same honesty about the testimonials: the 2027 programme hasn't run yet, so they're illustrative content.
>
> Second point, a question you might expect: why CDN-loaded React instead of a bundler like Vite or Create React App? It was a deployment trade-off — our target environment is a shared XAMPP server, and loading React directly in the browser means the site stays a simple "drop the files in htdocs" deployment, with no Node.js required to run it. We're aware that at production scale a real build step would be the right call — smaller bundle, no client-side transpiling.
>
> A word on teamwork: we are five, we worked with **Git and GitHub**, developed on branches and merged our work — including the China photo set you saw in the gallery.
>
> [SHOW: revenir au slide titre]
> To conclude: this project covers the full stack of the module — semantic HTML5 and responsive CSS, React components and the fetch API, PHP with PDO, and a normalized MySQL database queried with real SQL. Thank you — we're happy to take questions.

---

## Avant l'oral — checklist fonctionnelle du site

À dérouler **la veille** ET **le matin même**, sur la machine qui servira à la démo, toujours via `http://localhost/...` (jamais en `file://`).

**Navigation & affichage**
- [ ] La page charge sans erreur : ouvrir DevTools (F12) → onglet **Console** : aucune erreur rouge (et pas de warning React du type "two roots rendered into the same container" ou "duplicate key").
- [ ] Les 7 liens de la navbar scrollent vers la bonne section ; le lien actif se met en surbrillance en scrollant.
- [ ] Fenêtre réduite à ~375 px : le menu hamburger apparaît, s'ouvre, se ferme, et un lien cliqué ferme le menu.
- [ ] La carte Google Maps s'affiche dans Contact (nécessite internet — si la salle n'a pas de réseau, prévoir de le dire : "embedded external API, needs connectivity").
- [ ] La salle où vous présentez a du réseau : le site charge React et Babel depuis un CDN (`unpkg.com`) — **sans internet, le site ne s'affichera pas du tout**. Tester dans la salle réelle si possible, ou prévoir une solution de secours (captures d'écran / vidéo).

**Galerie**
- [ ] Chaque filtre pays affiche le bon nombre de photos (All = 49, China = 14).
- [ ] Aucune image cassée (icône grise).
- [ ] La lightbox s'ouvre, flèches ← → fonctionnent, Échap ferme, le focus revient sur la vignette.

**Formulaire (les 4 cas à tester)**
- [ ] Email invalide (`abc`) → message d'erreur sous le champ, pas d'envoi.
- [ ] Champ requis vide → message d'erreur.
- [ ] Soumission valide → message de succès + la ligne apparaît dans le panneau Database.
- [ ] Re-soumission avec le même email → message "already registered" (contrainte UNIQUE).

**Panneau Database**
- [ ] Le tableau se remplit (pas de bandeau rouge).
- [ ] Filtre par cours + recherche par nom renvoient les bons résultats.
- [ ] Les pastilles de statistiques affichent un compte par cours.
- [ ] Le bouton Delete supprime une ligne (tester sur une ligne de test, pas sur les données de démo préparées !).
- [ ] Export CSV télécharge un fichier lisible.

**Répétition**
- [ ] Une répétition complète chronométrée à 5 : viser 9 min 30 pour garder une marge.
- [ ] Chacun connaît sa phrase de transition ; un seul ordinateur, on ne change pas de machine.
- [ ] Zoom navigateur à 125 % pour le projecteur ; notifications coupées (mode Ne pas déranger) ; onglets inutiles fermés.
- [ ] Plan B : captures d'écran (ou courte vidéo) de chaque étape de la démo dans un dossier sur le bureau, au cas où XAMPP/le réseau/le CDN lâche.

---

## La démo base de données : lancement et présentation

### Mise en route (à faire AVANT de passer, pas devant le jury)

1. Ouvrir le **XAMPP Control Panel** → Start sur **Apache** puis **MySQL** (les deux doivent passer au vert).
2. Le projet doit être dans `C:\xampp\htdocs\` (ex. `C:\xampp\htdocs\hwum`), avec `index.html`, `css/`, `js/`, `php/`, `images/` — pas besoin d'autre chose (pas de `frontend/`, pas de build : cette version charge React depuis un CDN).
3. **Réinitialiser la base pour des données propres** : ouvrir `http://localhost/phpmyadmin` → onglet **Import** → choisir `database.sql` → **Go**. Cela recrée `hwum_summer` avec les 3 cours et 5 inscriptions de démonstration — le tableau ne sera donc ni vide ni pollué par vos tests.
4. Ouvrir `http://localhost/hwum/index.html`, vérifier que le panneau Database affiche les 5 lignes (pas de bandeau rouge).
5. Garder **deux onglets ouverts** : le site, et phpMyAdmin sur la table `registrations` (voir ci-dessous).

### Pendant la présentation

- La démo principale se fait **dans le site** (Speaker 4) : INSERT via le formulaire → la ligne apparaît → filtre/recherche SQL → doublon rejeté.
- **Bonus qui fait très bon effet si le temps le permet** (~15 s) : après l'inscription live, basculer sur l'onglet **phpMyAdmin**, rafraîchir la table `registrations` → la ligne est là aussi. Phrase : *"And to prove this isn't front-end trickery — here is the same row inside MySQL itself."* C'est la preuve la plus convaincante que le site parle à une vraie base.
- Si le jury veut voir le SQL : le README contient le tableau « SQL queries used by the website » ; les requêtes sont aussi lisibles dans `php/registrations.php`. Ne pas ouvrir le code sauf si on vous le demande — le temps est compté.

### Si ça casse pendant la démo

- **Bandeau rouge dans la section Database** : c'est notre propre gestion d'erreur (à dire ! *"this red banner is our error handling"*). Cause quasi certaine : MySQL arrêté → rouvrir XAMPP, Start MySQL, recharger la page.
- **La page reste blanche / rien ne s'affiche** : très probablement pas de réseau (le site charge React/Babel depuis un CDN) — vérifier la connexion internet de la salle avant de commencer.
- **Formulaire qui ne répond pas** : vérifier qu'on est bien sur `http://localhost/...` et pas sur un `file://`.
- **Rien ne marche** : basculer sur les captures d'écran du plan B et continuer le script — ne pas déboguer devant le jury.

### Après la démo

- Réimporter `database.sql` si vous devez repasser (autre groupe, session de rattrapage) pour repartir de données propres.

---

## Questions probables du jury (réponses en anglais)

1. *Why load React from a CDN instead of using a build tool like Vite or Create React App?* → Deployment simplicity: our target is a shared XAMPP server, so keeping the site as plain files that can be dropped into htdocs — no Node.js, no build step — outweighed the benefits of a bundler for a project this size.
2. *How do you prevent SQL injection?* → PDO **prepared statements** everywhere: the query and the data travel separately; user input is never concatenated into SQL.
3. *Why validate on both client and server?* → Client = instant feedback (UX); server = security, because the client can be bypassed with curl or DevTools.
4. *What does the UNIQUE constraint on email do?* → The database rejects duplicates itself; PHP catches SQL error code 23000 and returns a friendly message.
5. *Why LEFT JOIN and not INNER JOIN for the statistics?* → So courses with zero registrations still appear with a count of 0.
6. *What is ON DELETE RESTRICT?* → You cannot delete a course that still has registrations — it protects referential integrity.
7. *Is your database normalized?* → Yes: course data lives once in `courses`; registrations reference it by foreign key — no redundancy, no update anomalies.
8. *Is the site accessible?* → Semantic landmarks (`header`/`main`/`nav`/`footer`), skip link, alt text, WCAG contrast, keyboard navigation with visible focus, focus management in the lightbox, `aria-expanded` on the menu.
9. *How would you deploy it for real?* → Apache + PHP + MySQL hosting, HTTPS, credentials outside the repo, an authenticated admin area, email confirmation for registrations, and a proper React build step instead of the CDN version.
10. *What about transactions / indexes?* (Week 7) → Our operations are single-statement, so MySQL's per-statement atomicity suffices; with multi-step writes we'd use PDO transactions. The primary keys and the UNIQUE email column are already indexed; with large data we'd index `courseID` for the JOIN (MySQL creates one automatically for the FK).
