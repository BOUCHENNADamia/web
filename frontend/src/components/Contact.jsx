export default function Contact() {
  return (
    <section id="contact" className="section-wrap" aria-label="Contact Information">
      <div className="container">
        <div className="text-center">
          <span className="section-label reveal">07 &mdash; Contact</span>
          <h2 className="section-title reveal">Get in Touch</h2>
          <p className="section-desc reveal">Have questions about the programme? Reach out to the relevant teams below.</p>
        </div>

        <figure className="group-photo reveal">
          <img src="images/group-photo.jpg" alt="ESIEA students in front of the Queen Victoria fountain, Dutch Square, Melaka" loading="lazy" />
          <figcaption>ESIEA students &mdash; Dutch Square, Melaka. The class before you: next summer, this is your group.</figcaption>
        </figure>

        <div className="contact-grid">

          <div className="contact-card reveal">
            <div className="contact-icon">01</div>
            <h4>Heriot-Watt University Malaysia</h4>
            <p>
              No. 1, Jalan Venna P5/2<br />
              Precinct 5, 62200 Putrajaya<br />
              Wilayah Persekutuan Putrajaya<br />
              Malaysia
            </p>
          </div>

          <div className="contact-card reveal">
            <div className="contact-icon">02</div>
            <h4>Global Student Office</h4>
            <p>
              <a href="mailto:myinternationaloffice@hw.ac.uk">myinternationaloffice@hw.ac.uk</a><br />
              Mr. Fairuz: <a href="tel:+60126677140">+6012 667 7140</a><br />
              Mr. Gregory: <a href="tel:+60126322799">+6012 632 2799</a><br />
              <a href="https://www.hw.ac.uk/malaysia" target="_blank" rel="noopener">www.hw.ac.uk/malaysia</a>
            </p>
          </div>

          <div className="contact-card reveal">
            <div className="contact-icon">03</div>
            <h4>ESIEA Mobility Team</h4>
            <p>
              Coordinator: Suzanne Vilchez<br />
              Paris referent: Assia TOUI<br />
              Laval referent: Sébastien GAGEOT<br />
              <a href="mailto:mobility@esiea.fr">mobility@esiea.fr</a>
            </p>
          </div>

          <div className="contact-card reveal">
            <div className="contact-icon">04</div>
            <h4>Accommodation</h4>
            <p>
              Kartini Razali, Accommodation Manager<br />
              <a href="tel:+60123575699">+6012 357 5699</a><br />
              <a href="mailto:K.Razali@hw.ac.uk">K.Razali@hw.ac.uk</a><br />
              Shaftsbury RYO, Jalan Alamanda, Putrajaya
            </p>
          </div>

        </div>

        <div className="contact-map reveal">
          <iframe
            src="https://www.google.com/maps?q=Heriot-Watt%20University%20Malaysia%2C%20Precinct%205%2C%20Putrajaya&output=embed"
            title="Map — Heriot-Watt University Malaysia, Precinct 5, Putrajaya"
            loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>

      </div>
    </section>
  );
}
