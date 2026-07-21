export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="footer-inner">
        <div className="footer-brand-col">
          <a className="nav-brand" href="#home"><span>HWUM</span>&nbsp;Summer&thinsp;&mdash;&thinsp;2027</a>
          <p>An enriching academic and cultural experience at Heriot-Watt University Malaysia, designed for ESIEA engineering students.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About the Programme</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#register">Register</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Useful Links</h4>
          <ul>
            <li><a href="https://www.hw.ac.uk/malaysia" target="_blank" rel="noopener">HWUM Website</a></li>
            <li><a href="https://www.esiea.fr" target="_blank" rel="noopener">ESIEA Website</a></li>
            <li><a href="https://imigresen-online.imi.gov.my/mdac/main" target="_blank" rel="noopener">Malaysia MDAC</a></li>
            <li><a href="https://fildariane.diplomatie.gouv.fr" target="_blank" rel="noopener">Fil d'Ariane</a></li>
            <li><a href="https://www.diplomatie.gouv.fr" target="_blank" rel="noopener">France Diplomatie</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2027 HWUM Summer Programme · ESIEA × Heriot-Watt University Malaysia</p>
        <p>Website by ESIEA Students · <a href="#register">Apply Now</a></p>
      </div>
    </footer>
  );
}
