import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiClock,
  FiShield,
  FiGlobe,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiSend,
  FiLinkedin,
  FiInstagram,
  FiChevronDown,
  FiUser,
  FiBriefcase,
  FiMessageSquare,
} from "react-icons/fi";
import { FaWhatsapp, FaHandshake, FaAward, FaChartLine } from "react-icons/fa";
import "./Contact.css";
import "./About.css";
import heroBg from '../assets/images/Hero Atmosphere.webp';
import comboBottle from '../assets/images/Bevoky Combo.png';
import lagerBottle from '../assets/images/Bevoky Lager Beer.png';
import { Helmet } from "react-helmet-async";
import { regex } from "../hooks/validation";
import Reveal from "../components/ui/Reveal";
import MagneticButton from "../components/ui/MagneticButton";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

/* ---------- shared animation variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 44 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ---------- static content ---------- */
const contactCards = [
  {
    icon: <FiMapPin />,
    title: "Head Office",
    lines: ["Ebelshof 63 , 41063 Mönchengladbach , Germany"],
  },
  { icon: <FiPhone />, title: "Phone", lines: ["+49 155 67124660"] },
  { icon: <FiMail />, title: "Email", lines: ["info@bevokyglobal.com"] },
  // { icon: <FiGlobe />, title: "Website", lines: ["www.bevokyglobal.com"] },
  {
    icon: <FiClock />,
    title: "Business Hours",
    lines: ["Mon – Fri : 9:00 AM – 5:00 PM (CET)", "Sat – Sun : Closed"],
  },
];

const whyContactItems = [
  { title: "Product Information", text: "Detailed information about our premium beverage range." },
  { title: "Partnership Opportunities", text: "Let's explore how we can grow together." },
  { title: "Import & Distribution", text: "Support with orders, delivery, and distribution." },
  { title: "Logistics Support", text: "Efficient coordination across every shipment." },
  { title: "Business Enquiries", text: "Any questions? We're just a message away." },
  { title: "Customer Assistance", text: "Friendly, dedicated support whenever you need it." },
];

const promiseFeatures = [
  { icon: <FaAward />, title: "Premium Quality", text: "Carefully selected beverages from trusted producers." },
  { icon: <FiShield />, title: "Reliable Logistics", text: "Efficient and secure delivery across Europe." },
  { icon: <FaHandshake />, title: "Strong Partnerships", text: "Long-term relationships built on trust and transparency." },
  { icon: <FaChartLine />, title: "Growth Together", text: "We grow when you grow. Let's achieve more together." },
  { icon: <FiGlobe />, title: "European Standards", text: "Compliant, consistent, and always dependable." },
];

const networkStats = [
  { value: "20+", label: "European Markets" },
  { value: "12+", label: "Beverage Categories" },
  { value: "100%", label: "Import Compliance" },
  { value: "∞", label: "Growth Potential" },
];

const socialCard = [
  { icon: <FiInstagram />, title: "Instagram", text: "Bevoky Global UG" },
  { icon: <FiMail />, title: "Email", text: "info@bevokyglobal.com" },
  { icon: <FiGlobe />, title: "Website", text: "www.bevokyglobal.com" },
  { icon: <FaWhatsapp />, title: "Phone / WhatsApp", text: "+49 155 67124660" },
];

const whyBusinessCards = [
  { icon: <FiShield />, title: "Trusted Partner", text: "Reliable distribution you can count on." },
  { icon: <FiGlobe />, title: "European Reach", text: "Strong network across 20+ European markets." },
  { icon: <FaAward />, title: "Premium Quality", text: "Carefully selected beverages, always." },
  { icon: <FaHandshake />, title: "Long-Term Growth", text: "We grow together with your business." },
];

const faqData = [
  {
    q: "How can we become a distribution partner?",
    a: "Reach out through our contact form or email with details about your brand and products. Our partnerships team will review your enquiry and schedule an introductory call to discuss the next steps.",
  },
  {
    q: "Which countries do you currently serve?",
    a: "We currently distribute across more than 20 European markets, with Germany as our operational base. Our network continues to expand as we onboard new partners.",
  },
  {
    q: "What beverage categories do you import?",
    a: "We import beer, wine, spirits, ready-to-drink beverages, and non-alcoholic products from trusted producers around the world.",
  },
  {
    q: "Can manufacturers partner with Bevoky Global?",
    a: "Yes. We work directly with manufacturers seeking reliable import and distribution support across the European market.",
  },
  {
    q: "How quickly do you respond to enquiries?",
    a: "Our dedicated team aims to respond to all enquiries within 24 hours on business days.",
  },
];

const Contact = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    address: "",
    country: "",
    email: "",
    phone: "",
    message: "",
    privacyAccepted: false,
  });

  const [errors, setErrors] = useState({
    name: "",
    company: "",
    address: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const mapWrapRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".gsap-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      // gsap.utils.toArray(".gsap-reveal").forEach((el) => {
      //   gsap.fromTo(
      //     el,
      //     { opacity: 0, y: 60, filter: "blur(6px)" },
      //     {
      //       opacity: 1,
      //       y: 0,
      //       filter: "blur(0px)",
      //       duration: 1,
      //       ease: "power3.out",
      //       scrollTrigger: {
      //         trigger: el,
      //         start: "top 85%",
      //       },
      //     }
      //   );
      // });
    });
    return () => ctx.revert();
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        return regex.name.test(value) ? "" : "Enter a valid name";

      case "company":
        if (!value) return "";
        return regex.company.test(value) ? "" : "Invalid company name";

      case "address":
        if (!value) return "";
        return regex.address.test(value) ? "" : "Invalid address";

      case "country":
        if (!value) return "Country is required";
        return regex.country.test(value)
          ? ""
          : "Enter a valid country name";

      case "email":
        if (!value) return "Email is required";
        return regex.email.test(value)
          ? ""
          : "Enter a valid email address";

      case "phone":
        if (!value) return "";
        return regex.phone.test(value)
          ? ""
          : "Enter a valid phone number";

      case "subject":
        if (!value) return "";
        return regex.subject.test(value)
          ? ""
          : "Subject should be at least 3 characters";

      case "message":
        if (!value) return "Message is required";
        return regex.message.test(value)
          ? ""
          : "Message must contain at least 10 characters";

      case "privacyAccepted":
        return value ? "" : "Please accept the Privacy Policy";

      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.privacyAccepted) {
      alert("Please accept the Privacy Policy before submitting.");
      setLoading(false);
      return;
    }
    setLoading(true);

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          company: formData.company,
          address: formData.address,
          country: formData.country,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log(result.text);

      setSubmitted(true);

      setFormData({
        name: "",
        company: "",
        address: "",
        country: "",
        email: "",
        phone: "",
        message: "",
        privacyAccepted: false,
      });

      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePrivacy = () => {
    setFormData((prev) => ({
      ...prev,
      privacyAccepted: !prev.privacyAccepted,
    }));

    setErrors((prev) => ({
      ...prev,
      privacyAccepted: "",
    }));
  };

  return (
    <>
      <Helmet>
        <title>Contact Bevoky Global | Get in Touch for Beverage Distribution</title>

        <meta
          name="description"
          content="Contact Bevoky Global UG (haftungsbeschränkt) for beverage import, distribution, wholesale partnerships, and business enquiries across Europe. Our team is ready to assist producers, distributors, retailers, and hospitality businesses."
        />

        <meta
          name="keywords"
          content="Contact Bevoky Global, beverage distribution contact, beverage importer Germany, wholesale beverage enquiries, Europe beverage distributor, beverage partnership"
        />

        <meta property="og:title" content="Contact Bevoky Global | Get in Touch for Beverage Distribution" />

        <meta
          property="og:description"
          content="Reach out to Bevoky Global for import, distribution, wholesale, retail, and partnership opportunities across Europe."
        />

        <meta property="og:type" content="website" />

        <meta property="og:url" content="https://bevokyglobal.com/contact" />

        <link rel="canonical" href="https://bevokyglobal.com/contact" />
      </Helmet>
      <main className="contact-page">
        {/* ============ SECTION 1 — CONTACT INTRO HERO (espresso/gold, matches About) ============ */}
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
              <span className="eyebrow">— CONTACT BEVOKY GLOBAL</span>
              <h1 className="about-hero__title">
                Let's Build <span className="text-gold">Stronger Connections</span>
              </h1>
              <p className="about-hero__text">
                We partner with trusted producers and businesses across Europe to source, import
                and distribute premium alcoholic and non-alcoholic beverages. Whatever your
                enquiry, our team is here to help your business grow.
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
              <img className="about-hero__bottles" src={comboBottle} alt="Bevoky Global premium beer bottle range" />
              <div className="about-hero__reflection" />
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 2 — CONTACT DETAILS + FORM (light cream, one dark card) ============ */}
        <section className="contact-details" aria-label="Contact details and enquiry form">
          <div className="contact-details-inner">
            {/* Left column */}
            <motion.div
              className="details-col details-left gsap-reveal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.span className="eyebrow-gold eyebrow-gold--dark" variants={fadeUp} custom={0}>
                GET IN TOUCH
              </motion.span>
              <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
                We'd Love To Hear From You
              </motion.h2>
              <motion.p className="section-paragraph" variants={fadeUp} custom={2}>
                Whether you have a question about our products, need assistance with an order, or
                are interested in a partnership, our team is here to help. Reach out to us using
                any of the methods below.
              </motion.p>

              <div className="contact-cards-list">
                {contactCards.map((c, i) => (
                  <motion.div
                    className="contact-card-item"
                    key={c.title}
                    variants={fadeUp}
                    custom={3 + i * 0.3}
                    whileHover={{ x: 6 }}
                  >
                    <span className="circle-icon">{c.icon}</span>
                    <div className="contact-card-text">
                      <h4>{c.title}</h4>
                      {c.lines.map((l) => (
                        <p key={l}>{l}</p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right column — form */}
            <motion.div
              className="details-col details-right gsap-reveal"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="contact-form-card">
                <span className="form-card-glow" aria-hidden="true" />

                <span className="eyebrow-gold eyebrow-gold--dark">SEND US A MESSAGE</span>
                <h3 className="form-title">Let's Start a Conversation</h3>
                <p className="form-subtitle">
                  Fill out the form and our team will get back to you within one business day.
                </p>

                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group has-icon">
                      {/* <FiUser className="field-icon" /> */}
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className={errors.name ? "error-field" : ""}
                        required
                      />
                      {errors.name && <span className="error">{errors.name}</span>}
                    </div>

                    <div className="form-group has-icon">
                      {/* <FiMail className="field-icon" /> */}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={errors.email ? "error-field" : ""}
                        required
                      />
                      {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group has-icon">
                      {/* <FiBriefcase className="field-icon" /> */}
                      <input
                        type="text"
                        name="company"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className={errors.company ? "error-field" : ""}
                        required
                      />
                      {errors.company && <span className="error">{errors.company}</span>}
                    </div>

                    <div className="form-group">
                      {/* <FiGlobe className="field-icon" /> */}
                      <input
                        type="text"
                        name="country"
                        placeholder="Country"
                        value={formData.country}
                        onChange={handleChange}
                        className={errors.country ? "error-field" : ""}
                        required
                      />
                      {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      {/* <FiPhone className="field-icon" /> */}
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={errors.phone ? "error-field" : ""}
                        required
                      />
                      {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>

                    <div className="form-group">
                      {/* <FiMapPin className="field-icon" /> */}
                      <input
                        type="text"
                        name="address"
                        placeholder="Business Address"
                        value={formData.address}
                        onChange={handleChange}
                        className={errors.address ? "error-field" : ""}
                        required
                      />
                      {errors.address && <span className="error">{errors.address}</span>}
                    </div>
                  </div>

                  <div className="form-group textarea-group">
                    {/* <FiMessageSquare className="field-icon field-icon--top" /> */}
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className={errors.message ? "error-field" : ""}
                      required
                    />
                    {errors.message && <span className="error">{errors.message}</span>}
                  </div>

                  <div className="form-group checkbox-group">
                    <button
                      type="button"
                      className={`custom-checkbox ${formData.privacyAccepted ? "checked" : ""
                        }`}
                      onClick={togglePrivacy}
                      aria-label="Accept Privacy Policy"
                      aria-pressed={formData.privacyAccepted}
                    >
                      <span className="checkbox-box">
                        {formData.privacyAccepted && (
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </span>

                      <span className="checkbox-text">
                        I have read and agree to the{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Privacy Policy
                        </a>{" "}
                        and consent to the processing of my personal data.
                      </span>
                    </button>

                    {errors.privacyAccepted && (
                      <span className="error">{errors.privacyAccepted}</span>
                    )}
                  </div>


                  <motion.button
                    type="submit"
                    className="submit-btn"
                    disabled={loading}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{loading ? "Sending..." : "SEND MESSAGE"}</span>
                    {!loading && <FiSend />}
                  </motion.button>

                  {submitted && <p className="form-success">Thank you — your message has been sent.</p>}
                </form>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ============ SECTION 3 — OUR PROMISE (dark espresso) ============ */}
        {/* <section className="promise-section" aria-label="Our promise">
          <div className="promise-inner">
            <motion.div
              className="promise-image-wrap gsap-reveal"
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1 }}
            >
              <img className="gsap-parallax" src={lagerBottle} alt="Bevoky Global lager beer bottle" />
            </motion.div>

            <div className="promise-content">
              <motion.span
                className="eyebrow-gold"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                OUR PROMISE TO YOU
              </motion.span>
              <motion.h2
                className="section-heading light"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={1}
              >
                Quality. Reliability. Partnership.
              </motion.h2>
              <motion.p
                className="section-paragraph light"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={2}
              >
                We are committed to delivering premium beverages with the highest standards of
                quality and service. Your success is our priority.
              </motion.p>

              <div className="promise-features">
                {promiseFeatures.map((f, i) => (
                  <motion.div
                    className="promise-feature-item"
                    key={f.title}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={scaleIn}
                    custom={i}
                    whileHover={{ y: -6 }}
                  >
                    <span className="feature-icon outlined">{f.icon}</span>
                    <h4>{f.title}</h4>
                    <p>{f.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* ============ SECTION 4 — EUROPEAN DISTRIBUTION NETWORK (warm cream) ============ */}
        {/* <section className="network-section" aria-label="European distribution network">
          <div className="network-inner">
            <motion.div
              className="network-left gsap-reveal"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.span className="eyebrow-gold eyebrow-gold--dark" variants={fadeUp} custom={0}>
                OUR NETWORK
              </motion.span>
              <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
                Connecting Markets Across Europe
              </motion.h2>
              <motion.p className="section-paragraph" variants={fadeUp} custom={2}>
                With a strong distribution network and trusted partners, we ensure our premium
                beverages reach every corner of Europe.
              </motion.p>

              <div className="network-stats">
                {networkStats.map((s, i) => (
                  <motion.div className="stat-item" key={s.label} variants={fadeUp} custom={3 + i * 0.3}>
                    <h3>{s.value}</h3>
                    <p>{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="network-right"
              ref={mapWrapRef}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1 }}
            >
              <div className="europe-map">
                <svg viewBox="0 0 520 480" className="map-dots" aria-hidden="true">
                  {Array.from({ length: 260 }).map((_, i) => {
                    const cx = 20 + (i % 20) * 25;
                    const cy = 20 + Math.floor(i / 20) * 34;
                    return <circle key={i} cx={cx} cy={cy} r="1.6" className="map-dot" />;
                  })}
                </svg>

                <svg viewBox="0 0 520 480" className="map-lines" aria-hidden="true">
                  <path className="conn-line" d="M260,230 C230,180 190,140 150,110" />
                  <path className="conn-line" d="M260,230 C300,170 340,120 380,80" />
                  <path className="conn-line" d="M260,230 C210,260 170,290 120,320" />
                  <path className="conn-line" d="M260,230 C320,270 360,300 410,340" />
                  <path className="conn-line" d="M260,230 C280,300 300,350 320,410" />
                  <path className="conn-line" d="M260,230 C220,220 180,210 140,200" />
                </svg>

                <span className="pin pin-de" title="Germany — Headquarters">
                  <FiMapPin />
                </span>
                <span className="pin pin-1">
                  <FiMapPin />
                </span>
                <span className="pin pin-2">
                  <FiMapPin />
                </span>
                <span className="pin pin-3">
                  <FiMapPin />
                </span>
                <span className="pin pin-4">
                  <FiMapPin />
                </span>
                <span className="pin pin-5">
                  <FiMapPin />
                </span>

                <span className="map-glow p1" />
                <span className="map-glow p2" />
                <span className="map-glow p3" />
              </div>

              <motion.div
                className="floating-info-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="eyebrow-gold small">YOU CAN ALSO FIND US HERE</span>
                <ul>
                  {socialCard.map((s) => (
                    <li key={s.title}>
                      <span className="circle-icon small">{s.icon}</span>
                      <div>
                        <h5>{s.title}</h5>
                        <p>{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section> */}

        {/* ============ SECTION 5 — FAQ (dark espresso) ============ */}
        {/* <section className="faq-section" aria-label="Frequently asked questions">
          <motion.div
            className="section-intro-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="eyebrow-gold" variants={fadeUp} custom={0}>
              FAQ
            </motion.span>
            <motion.h2 className="section-heading light" variants={fadeUp} custom={1}>
              Frequently Asked Questions
            </motion.h2>
          </motion.div>

          <div className="faq-list">
            {faqData.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  className={`faq-item ${isOpen ? "open" : ""}`}
                  key={item.q}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                >
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <motion.span
                      className="faq-chevron"
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  </button>
                  <motion.div
                    className="faq-answer"
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <p>{item.a}</p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </section> */}

        {/* ============ SECTION 6 — WHY BUSINESSES WORK WITH US (light, closes the page) ============ */}
        {/* <section className="why-business-section" aria-label="Why businesses work with us">
          <motion.div
            className="section-intro-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span className="eyebrow-gold eyebrow-gold--dark" variants={fadeUp} custom={0}>
              OUR ADVANTAGE
            </motion.span>
            <motion.h2 className="section-heading" variants={fadeUp} custom={1}>
              Why Businesses Work With Us
            </motion.h2>
          </motion.div>

          <div className="why-business-grid">
            {whyBusinessCards.map((c, i) => (
              <motion.div
                className="why-business-card"
                key={c.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, borderColor: "#D7B24D" }}
              >
                <span className="feature-icon outlined">{c.icon}</span>
                <h4>{c.title}</h4>
                <p>{c.text}</p>
              </motion.div>
            ))}
          </div>
        </section> */}
      </main>
    </>
  );
};

export default Contact;