export default function About() {
  return (
    <section id="about" className="section-wrap" aria-label="About the Programme">
      <div className="container">
        <div className="about-grid">

          <div className="about-img-wrap reveal">
            <img src="images/about-campus.jpg" alt="Putra Mosque on Putrajaya Lake, minutes from the HWUM campus" loading="lazy" />
            <div className="about-img-badge">Putrajaya, Malaysia</div>
          </div>

          <div>
            <span className="section-label reveal">01 &mdash; About the Programme</span>
            <h2 className="section-title reveal">More Than a Summer Course</h2>
            <p className="reveal">
              The HWUM Summer Programme is designed for ESIEA students seeking an international academic experience that goes beyond the classroom. Based at Heriot-Watt University's Malaysian campus in Putrajaya, the programme combines rigorous coursework with cultural activities and the freedom to explore Southeast Asia.
            </p>

            <ul className="about-list reveal" aria-label="Programme objectives">
              <li>Develop practical technical skills in web development, machine learning, and communication</li>
              <li>Experience life at a world-ranked international university</li>
              <li>Gain exposure to Malaysian and Southeast Asian cultures</li>
              <li>Build an international network with students from around the world</li>
              <li>Validate your international mobility for your ESIEA degree</li>
              <li>Travel freely with 4 free days per week — KL is a regional travel hub</li>
            </ul>

            <div className="about-features reveal" role="list" aria-label="Programme details">
              <div className="feature-item" role="listitem">
                <div className="feature-icon">01</div>
                <h4>Duration</h4>
                <p>June 3 – July 29, 2027 (8 weeks)</p>
              </div>
              <div className="feature-item" role="listitem">
                <div className="feature-icon">02</div>
                <h4>Target Students</h4>
                <p>ESIEA 3rd-year students (Bachelor in Engineering)</p>
              </div>
              <div className="feature-item" role="listitem">
                <div className="feature-icon">03</div>
                <h4>Schedule</h4>
                <p>Classes Monday–Wednesday only. Thu–Sun: free!</p>
              </div>
              <div className="feature-item" role="listitem">
                <div className="feature-icon">04</div>
                <h4>Accommodation</h4>
                <p>Shaftsbury RYO residence, included in programme</p>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }} className="reveal">
              <a href="#register" className="btn btn-dark">Register Your Interest &rarr;</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
