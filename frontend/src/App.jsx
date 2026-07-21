import { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Courses from './components/Courses.jsx';
import Testimonials from './components/Testimonials.jsx';
import Register from './components/Register.jsx';
import Gallery from './components/Gallery.jsx';
import AdminPanel from './components/AdminPanel.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [courses, setCourses]       = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  // Registration form and admin panel are siblings in the same tree,
  // so they share the course list and refresh signal through normal props.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 70);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.09, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content">
        <Home />
        <Marquee />
        <About />
        <Courses />
        <Testimonials />
        <Register courses={courses} onRegisterSuccess={() => setRefreshKey(k => k + 1)} />
        <Gallery />
        <AdminPanel courses={courses} refreshKey={refreshKey} onCoursesLoaded={setCourses} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
