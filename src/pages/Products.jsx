import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiStar,
  FiGlobe,
  FiShield,
  FiTruck,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";
import { FaHandshake, FaLeaf, FaGlassCheers, FaAward } from "react-icons/fa";
import "./Products.css";
import "./About.css";

import heroBg from '../assets/images/Hero Atmosphere.webp';
import comboBottle from '../assets/images/Bevoky Combo.png';
import beer from '../assets/images/Beer.png'
import vodka from '../assets/images/Vodka.png'
import whisky from '../assets/images/Whisky.png'
import readyDrink from '../assets/images/Ready-Drink.png'
import nonAlco from '../assets/images/Non-Alco.png'

import { Helmet } from "react-helmet-async";
import MagneticButton from "../components/ui/MagneticButton";
import Reveal from "../components/ui/Reveal";

gsap.registerPlugin(ScrollTrigger);

/* ---------- animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ---------- static content ---------- */
const storyLetters = [
  { key: "BE", label: "Beer", text: "Beer", highlight: "Be", position: "start", img: beer },
  { key: "VO", label: "Vodka", text: "Vodka", highlight: "Vo", position: "start", img: vodka },
  { key: "KY", label: "Whisky", text: "Whisky", highlight: "ky", position: "end", img: whisky },
];

const categories = [
  { title: "Beer", img: beer, items: ["Lager", "Strong", "Premium", "Wheat Beer", "Stout", "Ale & More"] },
  { title: "Vodka", img: vodka, items: ["Premium", "Flavoured", "Classic", "Triple Distilled", "Craft & More"] },
  { title: "Whisky", img: whisky, items: ["Single Malt", "Blended", "Bourbon", "Rye", "Premium Reserve", "& More"] },
  { title: "Ready to Drink", img: readyDrink, items: ["RTD Cocktails", "Hard Seltzers", "Premium Mixes", "Flavoured Drinks", "& More"] },
  { title: "Non-Alcoholic", img: nonAlco, items: ["Malt Beverages", "Fruit Drinks", "Sparkling Drinks", "Energy Drinks", "& More"] },
];

/* Section 4 — Why Choose (now with stats + longer, bordered cards) */
const stats = [
  { value: "20+", label: "European Markets" },
  { value: "EU", label: "Quality Standards" },
  { value: "12+", label: "Beverage Categories" },
  { value: "100%", label: "Import Compliance" },
];

const whyChoose = [
  {
    icon: <FiStar />,
    title: "Premium Quality Selection",
    text: "Every product in our portfolio is hand-vetted against strict quality benchmarks before it ever reaches a shelf, so partners only ever offer their customers the best.",
  },
  {
    icon: <FiGlobe />,
    title: "20+ European Markets",
    text: "From Germany outward, our distribution network spans over twenty countries, giving brands a fast, reliable route into some of Europe's most competitive markets.",
  },
  {
    icon: <FiShield />,
    title: "100% Import Compliance",
    text: "Every shipment clears full regulatory, labelling and safety checks before distribution, so partners never have to worry about customs delays or compliance risk.",
  },
  {
    icon: <FiTruck />,
    title: "Reliable Supply Chain",
    text: "A dedicated logistics team and warehousing network keep lead times short and predictable, even across multi-country, multi-brand orders.",
  },
  {
    icon: <FaHandshake />,
    title: "Long-Term Partnerships",
    text: "We build relationships measured in years, not shipments — investing in joint growth plans with distributors, wholesalers and retailers alike.",
  },
  {
    icon: <FaAward />,
    title: "Proven Track Record",
    text: "Over a decade of consistent, on-time delivery has made Bevoky Global a trusted name for hospitality groups and retail chains across the continent.",
  },
];

/* Section 5 — Global Standards (expanded copy, richer cards) */
const globalStandards = [
  {
    icon: <FaLeaf />,
    title: "Quality in Every Bottle",
    text: "Each beverage we carry is sourced from producers who share our commitment to craftsmanship, from raw ingredients through to final bottling.",
  },
  {
    icon: <FiGlobe />,
    title: "Global Taste, Local Trust",
    text: "We bring flavours from across the world to European shelves, adapting our range to match regional preferences without compromising authenticity.",
  },
  {
    icon: <FaGlassCheers />,
    title: "Celebrate Together",
    text: "Our beverages are chosen to be part of real moments — from casual gatherings to premium hospitality experiences — wherever people come together.",
  },
  {
    icon: <FaLeaf />,
    title: "Drink Responsibly",
    text: "We actively promote responsible consumption across our markets, working with partners to encourage moderation and safe distribution practices.",
  },
];

const Products = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      gsap.utils.toArray(".gsap-reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 60, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%" },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Our Products | Premium Beer, Wine, Spirits & Beverages | Bevoky Global</title>
        <meta
          name="description"
          content="Explore Bevoky Global's diverse beverage portfolio, including premium beer, lager, strong beer, whisky, vodka, wine, spirits, and non-alcoholic beverages sourced from trusted international producers and distributed across Europe."
        />
        <meta
          name="keywords"
          content="Bevoky Global products, premium beer, lager beer, strong beer, premium beer Europe, whisky, vodka, wine, spirits, beverages, beverage portfolio, beverage distribution Europe, imported beverages, beverage wholesale Germany"
        />
        <meta property="og:title" content="Our Products | Premium Beer, Wine, Spirits & Beverages | Bevoky Global" />
        <meta
          property="og:description"
          content="Discover our carefully curated range of premium beers, wines, spirits, and non-alcoholic beverages supplied to distributors, wholesalers, retailers, and hospitality businesses across Europe."
        />
        <meta property="og:image" content="https://bevokyglobal.com/assets/icon.png" />
        <meta property="og:url" content="https://bevokyglobal.com/products" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Products | Premium Beer, Wine, Spirits & Beverages | Bevoky Global" />
        <meta
          name="twitter:description"
          content="Explore Bevoky Global's premium portfolio of beers, wines, spirits, and non-alcoholic beverages distributed throughout Europe."
        />
        <meta name="twitter:image" content="https://bevokyglobal.com/assets/icon.png" />
        <link rel="canonical" href="https://bevokyglobal.com/products" />
      </Helmet>

      <main className="products-page">
        {/* ============ SECTION 1 — PRODUCT INTRO HERO ============ */}
        <section className="about-hero">
          <div className="about-hero__bg">
            <img src={heroBg} alt="" aria-hidden="true" />
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
              <span className="eyebrow">— CATEGORIES BEVOKY GLOBAL</span>
              <h1 className="about-hero__title">
                Premium Beverage Collection{" "}
                <span className="text-gold">for a Better Tomorrow</span>
              </h1>
              <p className="about-hero__text">
                Discover a world of exceptional beverages. Carefully selected. Responsibly
                distributed. Across Germany and Europe.
              </p>

              {/* <Reveal>
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

        {/* ============ SECTION 2 — STORY BEHIND BEVOKY ============ */}
        <section className="story-section" aria-label="The story behind Bevoky">
          <div className="story-card gsap-reveal">
            <div className="story-left">
              <span className="eyebrow-gold">THE STORY BEHIND</span>
              <h2 className="story-heading">
                BEVOKY<span className="gold-text"></span>
              </h2>
              <p className="story-subtitle">More than a name. A promise of quality.</p>
              <span className="gold-underline" />
            </div>

            <div className="story-middle">
              {storyLetters.map((item, i) => {
                const parts = item.position === "start"
                  ? { highlight: item.highlight, normal: item.text.slice(item.highlight.length) }
                  : { normal: item.text.slice(0, item.text.length - item.highlight.length), highlight: item.highlight };

                return (
                  <motion.div
                    key={item.key}
                    className="story-letter-card"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.15 }}
                    whileHover={{ y: -6 }}
                  >
                    <img src={item.img} alt={item.label} />
                    <h3>
                      {item.position === "start" ? (
                        <>
                          <span className="gold-text">{parts.highlight}</span>
                          {parts.normal}
                        </>
                      ) : (
                        <>
                          {parts.normal}
                          <span className="gold-text">{parts.highlight}</span>
                        </>
                      )}
                    </h3>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="story-right"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p>
                <strong>BEVOKY</strong> comes from the letters of the world's most celebrated
                beverage categories — Beer, Vodka and Whisky.
              </p>
              <p>
                A name that represents our passion, expertise and commitment to bringing the finest
                beverages to markets across Europe.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 3 — PRODUCT CATEGORIES ============ */}
        <section className="categories-section" aria-label="Our premium product categories">
          <motion.div
            className="section-intro-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="eyebrow-gold" variants={fadeUp} custom={0}>
              OUR PRODUCT CATEGORIES
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
              A Complete Range of Premium Beverages
            </motion.h2>
            <motion.p className="section-paragraph center" variants={fadeUp} custom={2}>
              From refreshing beers to fine whiskies, we bring the world's favourite beverages to
              you.
            </motion.p>
          </motion.div>

          <div className="categories-grid">
            {categories.map((c, i) => (
              <motion.div
                className="category-card"
                key={c.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={scaleIn}
                custom={i}
                whileHover={{ y: -8 }}
              >
                <div className="category-image-wrap">
                  <img src={c.img} alt={c.title} />
                  <div className="category-overlay" />
                </div>
                <div className="category-body">
                  <h3>{c.title}</h3>
                  <ul>
                    {c.items.map((item) => (
                      <li key={item}>
                        <FiCheckCircle className="check-icon" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ SECTION 4 — WHY CHOOSE BEVOKY GLOBAL (dark, content-rich) ============ */}
        {/* <section className="why-choose-section" aria-label="Why choose Bevoky Global">
          <div className="why-choose-header">
            <motion.div
              className="why-choose-intro"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.span className="eyebrow-gold" variants={fadeUp} custom={0}>
                — WHY CHOOSE BEVOKY GLOBAL —
              </motion.span>
              <motion.h2 className="section-heading light" variants={fadeUp} custom={1}>
                Your Trusted Partner in Beverage Distribution
              </motion.h2>
              <motion.p className="section-paragraph light" variants={fadeUp} custom={2}>
                We combine a carefully curated portfolio with a logistics network built for
                Europe's toughest markets — so partners get quality, compliance and reliability
                in every single shipment.
              </motion.p>
            </motion.div>

            <div className="why-choose-stats">
              {stats.map((s, i) => (
                <motion.div
                  className="stat-item"
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="why-choose-grid">
            {whyChoose.map((w, i) => (
              <motion.div
                className="why-choose-card"
                key={w.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6 }}
              >
                <span className="why-choose-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="feature-icon">{w.icon}</span>
                <h4>{w.title}</h4>
                <p>{w.text}</p>
              </motion.div>
            ))}
          </div>
        </section> */}

        {/* ============ SECTION 5 — GLOBAL STANDARDS (light, content-rich cards) ============ */}
        <section className="global-standards-section" aria-label="Global standards">
          <motion.div
            className="section-intro-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="eyebrow-gold" variants={fadeUp} custom={0}>
              OUR COMMITMENT
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
              Global Standards, Local Trust
            </motion.h2>
            <motion.p className="section-paragraph center" variants={fadeUp} custom={2}>
              Every bottle we distribute carries a promise — of quality, of authenticity, and of
              responsibility toward the markets and people we serve.
            </motion.p>
          </motion.div>

          <div className="global-standards-grid">
            {globalStandards.map((g, i) => (
              <motion.div
                className="global-standard-card"
                key={g.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
              >
                <span className="feature-icon outline-dark">{g.icon}</span>
                <h5>{g.title}</h5>
                <p>{g.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ============ SECTION 6 — PARTNERSHIP CTA (light gold theme, not dark) ============ */}
        {/* <section className="partnership-cta" aria-label="Partnership call to action">
          <div className="partnership-card">
            <div className="partnership-content">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
                <motion.span className="eyebrow-gold" variants={fadeUp} custom={0}>
                  — PARTNER WITH US —
                </motion.span>
                <motion.h2 className="partnership-heading" variants={fadeUp} custom={1}>
                  Let's Bring Exceptional
                  <br />
                  Beverages <span className="gold-text">to More Markets</span>
                </motion.h2>
                <motion.p className="partnership-paragraph" variants={fadeUp} custom={2}>
                  Partner with Bevoky Global for a trusted, transparent and growth-focused
                  distribution journey — backed by a portfolio and network built to scale with
                  your business.
                </motion.p>

                <motion.div className="partnership-actions" variants={fadeUp} custom={3}>
                  <Reveal>
                    <MagneticButton variant="primary" as="a" href="/contact">
                      Become a Partner
                    </MagneticButton>
                  </Reveal>
                  <a className="partnership-link" href="/contact">
                    Contact Our Team <FiArrowRight />
                  </a>
                </motion.div>
              </motion.div>
            </div>

            <div className="partnership-stats">
              {stats.map((s, i) => (
                <motion.div
                  className="partnership-stat"
                  key={s.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <span className="stat-value dark">{s.value}</span>
                  <span className="stat-label dark">{s.label}</span>
                </motion.div>
              ))}
            </div>

            <img className="partnership-bg-shape gsap-parallax" src={heroBg} alt="" aria-hidden="true" />
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Products;