/* Static content data shared across components */

export const COUNTRIES = {
  malaysia:  { label: 'Malaysia',  flag: '🇲🇾' },
  singapore: { label: 'Singapore', flag: '🇸🇬' },
  thailand:  { label: 'Thailand',  flag: '🇹🇭' },
  china:     { label: 'China',     flag: '🇨🇳' }
};

export const GALLERY_PHOTOS = [
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
  { src: 'images/gallery/ch-spiral-library.jpg',           country: 'china', title: 'Modern Architecture',                 desc: 'A unique architectural perspective of a modern library design.' }
];

export const COURSE_BADGES = { 'K17SW': 'badge-web', 'K17PL-SS': 'badge-py', 'MALAY-SS': 'badge-malay' };
export const STAT_LABELS   = { 'K17SW': 'Web Development', 'K17PL-SS': 'Python ML', 'MALAY-SS': 'Malay Skills' };
export const API_BASE      = 'php/';

export const NAV_LINKS = ['home', 'about', 'courses', 'testimonials', 'register', 'gallery', 'admin', 'contact'];
export const NAV_LABELS = {
  home: 'Home', about: 'About', courses: 'Courses', testimonials: 'Testimonials',
  register: 'Register', gallery: 'Gallery', admin: 'Database', contact: 'Contact'
};

export const COURSES_INFO = [
  {
    headerClass: 'web',
    code: 'K17SW — MODULE 1',
    name: 'Web Development & Databases',
    ariaLabel: 'Web Development and Databases course',
    desc: 'Build modern, responsive websites from scratch using HTML5, CSS3, and JavaScript. Learn how to connect your front-end to a database backend, design user interfaces, and deploy web applications — skills directly applicable to real-world software projects.',
    outcomesLabel: 'Learning outcomes for Web Development',
    outcomes: [
      'Structure web pages using semantic HTML5 elements',
      'Style responsive layouts with CSS3 and Flexbox/Grid',
      'Add interactivity with JavaScript and DOM manipulation',
      'Design and query relational databases (SQL)',
      'Connect a web front-end to a database backend',
      'Apply UX principles to create user-friendly interfaces'
    ],
    footer: ['3 sessions / week', 'Practical focus']
  },
  {
    headerClass: 'py',
    code: 'K17PL-SS — MODULE 2',
    name: 'Python for Machine Learning',
    ariaLabel: 'Python for Machine Learning course',
    desc: "Explore the foundations of artificial intelligence and machine learning using Python. From data preprocessing to neural networks, this module gives you hands-on experience with the tools powering today's AI revolution — including scikit-learn and TensorFlow basics.",
    outcomesLabel: 'Learning outcomes for Python ML',
    outcomes: [
      'Write clean, efficient Python code for data science tasks',
      'Load, clean, and visualise datasets with pandas and matplotlib',
      'Implement classification and regression algorithms',
      'Build and train feedforward neural networks',
      'Evaluate model performance using appropriate metrics',
      'Apply ML techniques to real engineering problems'
    ],
    footer: ['3 sessions / week', 'Project-based']
  },
  {
    headerClass: 'malay',
    code: 'MALAY-SS — MODULE 3',
    name: 'Malay Communication Skills',
    ariaLabel: 'Malay Communication Skills course',
    desc: 'Dive into Bahasa Malaysia — the national language spoken by over 280 million people across Southeast Asia. Learn practical everyday expressions, cultural etiquette, and conversational skills that will enrich your daily life in Malaysia and your travels throughout the region.',
    outcomesLabel: 'Learning outcomes for Malay Communication',
    outcomes: [
      'Use basic greetings, introductions, and daily expressions',
      'Navigate markets, transport, and restaurants in Bahasa Malaysia',
      'Understand cultural norms and respectful communication',
      'Read and write simple sentences in the Latin-based script',
      "Appreciate Malaysia's multicultural linguistic landscape",
      'Build connections with local students and community'
    ],
    footer: ['1 session / week (Mon)', 'Communicative approach']
  }
];

export const TESTIMONIALS = [
  {
    initial: 'C', name: 'Camille Rousseau', role: '3rd Year, ESIEA Paris · Cybersecurity', tag: 'Web Development & Databases',
    quote: "The HWUM Summer Programme completely changed my perspective on software development. The Web Development module was intense but incredibly rewarding — I built a full-stack app in just four weeks. And outside of class? I was island-hopping in Langkawi and eating the most incredible food I've ever tasted. I came back to France a different person."
  },
  {
    initial: 'M', name: 'Mehdi Taleb', role: '3rd Year, ESIEA Paris · Networks & AI', tag: 'Python for Machine Learning',
    quote: "Studying Python for Machine Learning at HWUM gave me skills I'm still using every day in my apprenticeship. The professors were brilliant and the small class sizes meant I got real one-to-one attention. But honestly, what I remember most are the weekend trips — Bangkok in a long weekend, Singapore in a day, Bali for a whole week. The location is perfect."
  },
  {
    initial: 'L', name: 'Léa Fontaine', role: '3rd Year, ESIEA Laval · Software Engineering', tag: 'Malay Communication Skills',
    quote: 'I was nervous about going to Malaysia alone, but within a week we were a proper group of friends. The Malay Communication class was fun and practical — locals genuinely lit up when we tried speaking Bahasa Malaysia. The food is unreal (nasi lemak every morning, no complaints), and having Thursday to Sunday free meant we explored more of Southeast Asia than I ever imagined possible.'
  },
  {
    initial: 'R', name: 'Rayan Bouzid', role: '3rd Year, ESIEA Paris · Embedded Systems', tag: 'Python for Machine Learning',
    quote: 'Putrajaya itself is stunning — this incredibly planned city with lakes, mosques, and government buildings. The campus is modern, the accommodation is comfortable, and the shuttle made everything easy. I learned so much in the ML module and made friends from France, Malaysia, and all over the world. 100% would recommend to any ESIEA student.'
  },
  {
    initial: 'N', name: 'Nina Perret', role: '3rd Year, ESIEA Paris · Cybersecurity', tag: 'Web Development & Databases',
    quote: 'The cultural dimension of this programme is what makes it unique. Malaysian culture is so warm and welcoming — people genuinely want to help you experience their country. The programme gave me a structured academic framework while still leaving plenty of room for cultural discovery. Cameron Highlands, Penang, and the Perhentian Islands are must-dos while you\'re there.'
  },
  {
    initial: 'T', name: 'Théo Marchand', role: '3rd Year, ESIEA Laval · Networks', tag: 'Malay Communication Skills',
    quote: "Don't hesitate — just go. Malaysia is safe, affordable, fascinating, and strategically positioned for travel across Asia. I used the long weekends to visit six countries in eight weeks. The academic content is solid and genuinely useful for your career. And the halal food situation is absolutely perfect — so easy and so delicious. One of the best decisions I've made at ESIEA."
  }
];
