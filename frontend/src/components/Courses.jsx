import { COURSES_INFO } from '../data.js';

export default function Courses() {
  return (
    <section id="courses" className="section-wrap" aria-label="Course Information">
      <div className="container">
        <div className="text-center">
          <span className="section-label reveal">02 &mdash; Course Information</span>
          <h2 className="section-title reveal">What You Will Study</h2>
          <p className="section-desc reveal">Three carefully selected courses taught by HWUM faculty, combining technical depth with cultural relevance. All courses run over the 8-week programme.</p>
        </div>

        <div className="courses-grid">
          {COURSES_INFO.map(c => (
            <article className="course-card reveal" aria-label={c.ariaLabel} key={c.code}>
              <div className={`course-header ${c.headerClass}`}>
                <p className="course-code">{c.code}</p>
                <h3 className="course-name">{c.name}</h3>
              </div>
              <div className="course-body">
                <p className="course-desc">{c.desc}</p>
                <div className="course-outcomes">
                  <h4>Learning Outcomes</h4>
                  <ul aria-label={c.outcomesLabel}>
                    {c.outcomes.map(o => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              </div>
              <div className="course-footer">
                <span>{c.footer[0]}</span>
                <span>{c.footer[1]}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
