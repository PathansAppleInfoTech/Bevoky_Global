import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import MagneticButton from "../ui/MagneticButton";
import logo from "/assets/logo.png";
import styles from "./Header.module.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Categories" },
  { to: "/contact", label: "Contact" },
];

const menuVariants = {
  hidden: {
    opacity: 0,
    x: "100%",
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.35,
      ease: [0.4, 0, 1, 1],
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
    },
  },
};

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    const handleResize = () => {
      if (window.innerWidth > 900) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${
          scrolled || menuOpen ? styles.scrolled : ""
        }`}
      >
        <div className={`container ${styles.row}`}>
          {/* Logo */}
          <NavLink
            to="/"
            className={styles.brand}
            onClick={closeMenu}
          >
            <img
              src={logo}
              alt="Bevoky Global"
              className={styles.logoImg}
            />

            <div className={styles.brandText}>
              <span className={styles.brandName}>
                BEVOKY GLOBAL
              </span>

              <span className={styles.brandTag}>
                Beverage Distribution
              </span>
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className={styles.nav}>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `${styles.navLink} ${
                    isActive ? styles.active : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className={styles.actions}>
            <MagneticButton
              variant="primary"
              as="a"
              href="/contact"
              icon={false}
              className={styles.desktopBtn}
            >
             Get in Touch
            </MagneticButton>

            <button
              className={`${styles.menuButton} ${
                menuOpen ? styles.menuOpen : ""
              }`}
              aria-label={
                menuOpen ? "Close Menu" : "Open Menu"
              }
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <HiOutlineX />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                  >
                    <HiOutlineMenuAlt3 />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className={styles.mobileNav}>
              {links.map((link, index) => (
                <motion.div
                  key={link.to}
                  variants={itemVariants}
                  custom={index}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === "/"}
                    onClick={closeMenu}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${
                        isActive
                          ? styles.mobileActive
                          : ""
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>

            <motion.div
              className={styles.mobileFooter}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.45,
              }}
            >
              <MagneticButton
                variant="primary"
                as="a"
                href="/contact"
                icon={false}
                onClick={closeMenu}
                className={styles.mobileBtn}
              >
                Get in Touch
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}