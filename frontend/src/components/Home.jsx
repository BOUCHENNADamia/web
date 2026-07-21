export default function Home() {
  return (
    <section id="home" aria-label="Home">
      <div className="hero-inner">
        <p className="hero-eyebrow reveal">Heriot-Watt University Malaysia &mdash; Summer 2027</p>
        <h1 className="hero-title reveal">
          Experience Asia.<br />
          <em>Transform your future.</em>
        </h1>
        <p className="hero-subtitle reveal">
          Join the HWUM Summer Programme — an enriching eight-week journey combining academic excellence, cultural immersion, and unforgettable travel experiences in the heart of Southeast Asia.
        </p>
        <div className="hero-actions reveal">
          <a href="#register" className="btn btn-primary">Apply Now &rarr;</a>
          <a href="#about" className="btn btn-outline">Learn More</a>
        </div>
        <div className="hero-stats reveal">
          <div className="hero-stat"><strong>8</strong><span>Weeks</span></div>
          <div className="hero-stat"><strong>3</strong><span>Courses</span></div>
          <div className="hero-stat"><strong>40+</strong><span>Students</span></div>
          <div className="hero-stat"><strong>6</strong><span>Countries to Explore</span></div>
        </div>
      </div>
      <div className="scroll-hint">
        <div className="scroll-line"></div>
        scroll
      </div>
    </section>
  );
}
