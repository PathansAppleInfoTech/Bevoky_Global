import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiShield,
  FiGlobe,
  FiAward,
  FiTarget,
  FiEye,
  FiArrowRight,
} from "react-icons/fi";
import {
  PiBeerBottleDuotone,
  PiPackageDuotone,
  PiHandshakeDuotone,
  PiUsersThreeDuotone,
} from "react-icons/pi";
import { GiGlobeRing, GiTruck, } from "react-icons/gi";
import { FaLocationDot, FaWineGlass } from "react-icons/fa6";
import "./About.css";
import "./Products.css";
import "./Contact.css";
import heroBg from '../assets/images/Hero Atmosphere.webp';
import comboBottle from '../assets/images/Bevoky Combo.png';
import beerBottle from '../assets/images/Bevoky Lager Beer.png';

import beerGlass from '../assets/images/Beer.png'
import wineGlass from '../assets/images/Wine.png'
import spiritGlass from '../assets/images/Whisky.png'
import readyDrink from '../assets/images/Ready-Drink.png'
import nonAlcoholic from '../assets/images/Non-Alco.png'
import Reveal from "../components/ui/Reveal";
import MagneticButton from "../components/ui/MagneticButton";
gsap.registerPlugin(ScrollTrigger);

/* ---------------------------------------------------------
   NOTE: This file assumes Header and Footer are already
   rendered by a shared layout (e.g. via React Router's
   <Outlet />), matching the rest of the site. Only the
   About-page-specific sections live here, per the brief.

   Placeholder assets:
   - /assets/bottles/*  -> replace with client-supplied bottle renders
   - /assets/beverages/* -> replace with client-supplied category photography
   Everything else is sourced from Unsplash as placeholder photography.
--------------------------------------------------------- */

const heroFeatures = [
  {
    icon: <FiShield />,
    title: "Germany Based",
    desc: "Operations rooted in Germany, serving Europe.",
  },
  {
    icon: <FiGlobe />,
    title: "European Network",
    desc: "Strong connections across 20+ European markets.",
  },
  {
    icon: <FiAward />,
    title: "Quality Assured",
    desc: "Every product meets our high standards.",
  },
];

const stats = [
  { icon: <PiBeerBottleDuotone />, value: "5+", label: "Beverage Categories" },
  { icon: <GiGlobeRing />, value: "20+", label: "European Markets" },
  { icon: <FiShield />, value: "100%", label: "Import Compliance" },
  { icon: <PiHandshakeDuotone />, value: "Reliable", label: "Supply Network" },
];

const whyChooseUs = [
  {
    icon: <FiShield />,
    title: "Germany Based Company",
    desc: "Local strength with deep understanding of the European market.",
  },
  {
    icon: <FiGlobe />,
    title: "Strong European Market",
    desc: "Established network and presence in 20+ European countries.",
  },
  {
    icon: <GiTruck />,
    title: "Reliable Supply Chain",
    desc: "Efficient logistics and consistent product availability you can depend on.",
  },
  {
    icon: <PiPackageDuotone />,
    title: "Premium Category Selection",
    desc: "Carefully curated portfolio from trusted producers worldwide.",
  },
  {
    icon: <PiHandshakeDuotone />,
    title: "Professional Partnerships",
    desc: "Transparent, fair, and long-term relationships built on trust and integrity.",
  },
  {
    icon: <PiUsersThreeDuotone />,
    title: "Customer Oriented Service",
    desc: "Dedicated support and solutions tailored to your business needs.",
  },
];

const processSteps = [
  { icon: <GiGlobeRing />, title: "Sourcing", desc: "We carefully select premium beverages from trusted producers worldwide." },
  { icon: <FiShield />, title: "Import & Compliance", desc: "Handling import, documentation, and compliance to ensure smooth operations." },
  { icon: <GiTruck />, title: "Logistics", desc: "Efficient and secure logistics ensuring timely delivery across Europe." },
  { icon: <FaLocationDot />, title: "Distribution", desc: "Delivering to distributors, retailers, and hospitality partners." },
  { icon: <PiUsersThreeDuotone />, title: "Growth Together", desc: "Building long-term partnerships that create value and drive mutual growth." },
];

const portfolio = [
  {
    name: "Beer",
    img: beerGlass,
  },
  {
    name: "Wine",
    img: wineGlass,
  },
  {
    name: "Spirits",
    img: spiritGlass,
  },
  {
    name: "Ready to Drink",
    img: readyDrink,
  },
  {
    name: "Non Alcoholic",
    img: nonAlcoholic,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const blurReveal = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const processRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          transformOrigin: "left center",
          ease: "none",
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        }
      );
    }, processRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>About Bevoky Global | Germany's Trusted Beverage Import & Distribution Partner</title>

        <meta
          name="description"
          content="Learn about Bevoky Global UG (haftungsbeschränkt), a Germany-based beverage import and distribution company dedicated to connecting premium international beer, wine, spirits, and non-alcoholic beverage producers with distributors, retailers, and hospitality businesses across Europe."
        />

        <meta
          name="keywords"
          content="About Bevoky Global, beverage distribution Germany, beverage importer Europe, beer importer Germany, wine distribution Europe, spirits distribution, beverage wholesale, international beverage trading, Germany beverage company"
        />

        <meta
          property="og:title"
          content="About Bevoky Global | Germany's Trusted Beverage Import & Distribution Partner"
        />

        <meta
          property="og:description"
          content="Discover Bevoky Global's journey, mission, vision, values, and expertise in connecting premium international beverage brands with European markets."
        />

        <meta property="og:type" content="website" />

        <meta
          property="og:url"
          content="https://bevokyglobal.com/about"
        />

        <link
          rel="canonical"
          href="https://bevokyglobal.com/about"
        />
      </Helmet>

      <main className="about-page">
        {/* ================= SECTION 1 — HERO ================= */}

        <section className="about-hero">
          <div className="about-hero__bg">
            <img
              src={heroBg}
              alt=""
              aria-hidden="true"
            />
            <div className="about-hero__overlay" />
          </div>

          <div className="about-hero__inner">
            <motion.div
              className="about-hero__content"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              {/* Copy block: eyebrow, title, paragraph share one tight rhythm */}
              <div className="about-hero__copy">
                <span className="eyebrow">— ABOUT BEVOKY GLOBAL</span>
                <h1 className="about-hero__title">
                  Connecting Premium Beverages with{" "}
                  <span className="text-gold">Markets Across Europe.</span>
                </h1>
                <p className="about-hero__text">
                  Bevoky Global UG (haftungsbeschränkt) is a Germany-based
                  beverage import and distribution company connecting
                  international producers with distributors, wholesalers,
                  retailers, and hospitality businesses across Europe.
                </p>
              </div>



              {/* <Reveal delay={0.24}>
                <MagneticButton variant="primary" as="a" href="/contact">
                  Learn More
                </MagneticButton>
              </Reveal> */}
            </motion.div>

            <motion.div
              className="about-hero__visual"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="about-hero__glow" />
              <div className="about-hero__particles">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span key={i} className={`particle particle--${i % 5}`} />
                ))}
              </div>
              <img
                className="about-hero__bottles"
                src={comboBottle}
                alt="Bevoky Global premium beer bottle range"
              />
              <div className="about-hero__reflection" />
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 2 — COMPANY STORY ================= */}
        <section className="story" id="story">
          <div className="story__inner">
            <motion.div
              className="story__content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
            >
              <span className="eyebrow eyebrow--dark">— OUR STORY</span>
              <h2>
                Built on Trust, <br /> Scaled by Expertise
              </h2>
              <p>
                From the moment we started, our mission was clear — bring the world's
                finest beverages to European markets with integrity and precision.
              </p>
              <p>
                What began as a single vision has grown into a network of trusted
                relationships spanning Europe. We don't just distribute; we partner,
                grow, and build lasting success together.
              </p>
              <p>
                Every bottle, every delivery, every partnership reflects our commitment
                to excellence and our belief that great beverages deserve great partners.
              </p>
              <Reveal delay={0.24}>
                <MagneticButton variant="primary" as="a" href="/products">
                  Explore Our Portfolio
                </MagneticButton>
              </Reveal>
            </motion.div>

            {/* <div className="story__stats">
              <div className="story__map" aria-hidden="true" />
              <div className="story__grid">
                {stats.map((s, i) => (
                  <motion.div
                    className="stat-card"
                    key={s.label}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={i}
                    whileHover={{ y: -6 }}
                  >
                    <span className="stat-card__icon">{s.icon}</span>
                    <strong>{s.value}</strong>
                    <span>{s.label}</span>
                  </motion.div>
                ))}
              </div>
            </div> */}
            <div className="story__stats">
              <div className="story__map" aria-hidden="true" />
              <motion.div
                className="story__visual"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
              >
                <div className="story__glow" aria-hidden="true" />

                <div className="story__frame">
                  <img src={beerBottle} alt="Curated beverage selection" />
                  <span className="story__corner story__corner--tl" />
                  <span className="story__corner story__corner--br" />
                </div>

                <div className="story__badge">
                  <strong>Since 2026</strong>
                  <span>Trusted Import Partner</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= SECTION 3 — WHY CHOOSE US ================= */}
        <section className="why">
          <div className="why__inner">
            <div className="why__left">
              <motion.span
                className="eyebrow why__eyebrow"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                — OUR VALUES
              </motion.span>
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                Why Partners Choose Us
              </motion.h2>
              <motion.p
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
              >
                We are more than a distributor — we are a long-term partner
                committed to your growth and our shared success.
              </motion.p>

              <div className="why__grid">
                {whyChooseUs.map((c, i) => (
                  <motion.div
                    className="why-card"
                    key={c.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    custom={i}
                  >
                    <span className="why-card__icon">{c.icon}</span>
                    <h4>{c.title}</h4>
                    <p>{c.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              className="why__image"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src="https://images.unsplash.com/photo-1560264280-88b68371db39?q=80&w=1200&auto=format&fit=crop"
                alt="Business partnership handshake"
              />
              <div className="why__image-overlay" />
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 4 — MISSION & VISION ================= */}
        <section className="mv">
          <div className="mv__inner">
            <motion.div
              className="mv-card mv-card--dark"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={blurReveal}
              whileHover={{ y: -6 }}
            >
              <img
                className="mv-card__bg"
                src={heroBg}
                alt=""
                aria-hidden="true"
              />
              <div className="mv-card__scrim mv-card__scrim--dark" />
              <div className="mv-card__content">
                <span className="mv-card__icon"><FiTarget /></span>
                <span className="eyebrow">— OUR MISSION</span>
                <p>
                  To be the trusted bridge between world-class beverage
                  producers and the European market, delivering with
                  precision and integrity.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="mv-card mv-card--dark"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={blurReveal}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -6 }}
            >
              <img
                className="mv-card__bg"
                src={heroBg}
                alt=""
                aria-hidden="true"
              />
              <div className="mv-card__scrim mv-card__scrim--dark" />
              <div className="mv-card__content">
                <span className="mv-card__icon"><FiEye /></span>
                <span className="eyebrow">— OUR VISION</span>
                <p>
                  To be the preferred distribution partner across Europe —
                  recognized for reliability, compliance, and exceptional
                  service in every market we serve.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SECTION 5 — PARTNER CTA ================= */}
        <section className="partner-cta">
          <div className="partner-cta__particles" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className={`particle particle--${i % 5}`} />
            ))}
          </div>
          <div className="partner-cta__inner">
            <motion.div
              className="partner-cta__content"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={fadeUp}
            >
              <span className="eyebrow why__eyebrow">— JOIN WITH US</span>
              <h2>Let's Build Something Exceptional Together</h2>
              <p>
                Join hands with Bevoky Global and bring premium beverages to
                more markets across Europe.
              </p>
              <Reveal delay={0.24}>
                <MagneticButton variant="primary" as="a" href="/contact">
                  Get in Touch
                </MagneticButton>
              </Reveal>
            </motion.div>

            <motion.img
              className="partner-cta__bottles"
              src={comboBottle}
              alt="Bevoky Global beer bottle lineup"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </section>

        {/* ================= SECTION 6 — OUR PROCESS ================= */}
        <section className="process" ref={processRef}>
          <motion.div
            className="process__head"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="eyebrow eyebrow--dark">— OUR PROCESS</span>
            <h2>From Selection to Shelf</h2>
          </motion.div>

          <div className="process__timeline">
            <div className="process__line-track">
              <div className="process__line-fill" ref={lineRef} />
            </div>
            <div className="story__map" aria-hidden="true" />

            {processSteps.map((step, i) => (
              <motion.div
                className="process-step"
                key={step.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
              >
                <span className="process-step__number">{i + 1}</span>
                <span className="process-step__icon">{step.icon}</span>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= SECTION 7 — PORTFOLIO ================= */}
        <section className="portfolio">
          <motion.div
            className="portfolio__head"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <span className="eyebrow eyebrow--dark">— OUR PORTFOLIO</span>
            <h2>A World of Premium Beverages</h2>
          </motion.div>

          <div className="portfolio__grid">
            {portfolio.map((p, i) => (
              <motion.div
                className="portfolio-card"
                key={p.name}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
              >
                <div className="portfolio-card__media">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <div className="portfolio-card__gradient" />
                </div>
                <span className="portfolio-card__label">{p.name}</span>
              </motion.div>
            ))}
          </div>

          <motion.a
            href="/products"
            className="btn portfolio__cta"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={5}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Reveal delay={0.24}>
              <MagneticButton variant="primary" as="a" href="/products">
                Explore Categories
              </MagneticButton>
            </Reveal>
          </motion.a>
        </section>
      </main>
    </>
  );
}