import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import logo from '../../assets/images/logo.webp';
import styles from './Footer.module.css';

const explore = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Bevoky' },
  { to: '/products', label: 'Beverage Categories' },
  { to: '/contact', label: 'Contact' },
];

const business = [
  { to: '/contact', label: 'Get In Touch' },
  { to: '/products', label: 'Import Management' },
  { to: '/products', label: 'Distribution Network' },
  { to: '/about', label: 'Markets We Serve' },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <Reveal>
          <div className={styles.top}>
            <div className={styles.brandBlock}>
              <img src={logo} alt="Bevoky Global" className={styles.logoImg} />
              <p className={styles.brandDesc}>
                Bevoky Global UG (haftungsbeschränkt) is a Germany-based
                beverage import and distribution company, connecting
                international producers with distributors, wholesalers,
                retailers, and hospitality businesses across Europe.
              </p>
              {/* <div className={styles.socials}>
                {['in', 'ig', 'x'].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className={styles.socialIcon}
                    aria-label={`Bevoky Global on ${s}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </a>
                ))}
              </div> */}
            </div>

            <div>
              <div className={styles.colTitle}>Explore</div>
              <ul className={styles.linkList}>
                {explore.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className={styles.colTitle}>Business</div>
              <ul className={styles.linkList}>
                {business.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>


            <div>
              <div className={styles.colTitle}>Legal</div>

              <ul className={styles.linkList}>
                <li>
                  <Link to="/imprint">Imprint</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
              </ul>
            </div>
            {/* <div>
              <div className={styles.colTitle}>Contact</div>
              <div className={styles.contactItem}>
                <a href="tel:+4915667124460">+49 156 67124460</a>
              </div>
              <div className={styles.contactItem}>
                <a href="mailto:info@bevokyglobal.com">info@bevokyglobal.com</a>
              </div>
              <div className={styles.contactItem}>Mönchengladbach , Germany</div>
            </div> */}
          </div>
        </Reveal>

        <div className={styles.bottom}>
          <span>© {new Date().getFullYear()} Bevoky Global UG (haftungsbeschränkt). All rights reserved.</span>
          <span>Registered in Germany</span>
          <span>Powered by Pathans Apple Info Tech</span>
        </div>

        {/* <div className={styles.disclaimer}>
          <p>
            Please enjoy alcoholic beverages responsibly. This website is intended
            only for individuals who are of legal drinking age in their country or
            region of residence. Bevoky Global UG (haftungsbeschränkt) does not
            promote irresponsible consumption of alcohol.
          </p>
        </div> */}
      </div>
    </footer>
  );
}
