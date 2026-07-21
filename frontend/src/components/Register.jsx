import RegistrationForm from './RegistrationForm.jsx';

export default function Register({ courses, onRegisterSuccess }) {
  return (
    <section id="register" className="section-wrap" aria-label="Registration Form">
      <div className="container">
        <div className="register-wrap">

          <div>
            <span className="section-label reveal">04 &mdash; Apply Now</span>
            <h2 className="section-title reveal">Join the 2027 Programme</h2>
            <p className="reveal">Places are limited to 40 students. Complete the form to register your interest for the HWUM Summer Programme 2027.</p>
            <ul className="info-checklist reveal" aria-label="What happens after you register">
              <li><span className="icon">&mdash;</span> Your registration is saved instantly to our database</li>
              <li><span className="icon">&mdash;</span> Your coordinator Suzanne Vilchez will follow up by email</li>
              <li><span className="icon">&mdash;</span> You will receive the official HWUM registration form</li>
              <li><span className="icon">&mdash;</span> Accommodation at Shaftsbury RYO is included</li>
              <li><span className="icon">&mdash;</span> Shuttle service between residence and campus provided</li>
              <li><span className="icon">&mdash;</span> The experience validates your ESIEA international mobility</li>
            </ul>
            <div className="deadline-note reveal">
              <p>
                <strong>Application deadline &mdash; March 15, 2027</strong><br />
                Questions? Email <a href="mailto:mobility@esiea.fr">mobility@esiea.fr</a>
              </p>
            </div>
          </div>

          <div className="reveal">
            <div className="form-card">
              <RegistrationForm courses={courses} onRegisterSuccess={onRegisterSuccess} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
