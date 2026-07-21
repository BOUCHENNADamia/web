import { TESTIMONIALS } from '../data.js';

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Student Testimonials">
      <div className="container">
        <div className="text-center">
          <span className="section-label reveal">03 &mdash; Testimonials</span>
          <h2 className="section-title reveal" style={{ color: 'var(--white)' }}>What Students Say</h2>
          <p className="section-desc reveal">Hear from previous ESIEA participants who experienced the HWUM Summer Programme first-hand.</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map(t => (
            <article className="testi-card reveal" aria-label={`Testimonial from ${t.name.split(' ')[0]}`} key={t.name}>
              <blockquote className="testi-quote">"{t.quote}"</blockquote>
              <div className="testi-author">
                <div className="testi-avatar" aria-hidden="true">{t.initial}</div>
                <div>
                  <p className="testi-name">{t.name}</p>
                  <p className="testi-role">{t.role}</p>
                  <span className="testi-tag">{t.tag}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
