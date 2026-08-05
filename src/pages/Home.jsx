import { Suspense, lazy, useEffect, useMemo, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

import Reveal from '../components/ui/Reveal';
import RevealText from '../components/ui/RevealText';
import MagneticButton from '../components/ui/MagneticButton';
import useCountUp from '../hooks/useCountUp';

import atmosphereImg from '../assets/images/Hero Atmosphere.webp';
import bottleImg from '../assets/images/Bevoky Premium Beer.png';
import comboBottle from '../assets/images/Bevoky Combo.png';


import beerImg from '../assets/images/Beer.png'
import wineImg from '../assets/images/Wine.png'
import spiritsImg from '../assets/images/Whisky.png'
import craftImg from '../assets/images/Ready-Drink.png'
import energyImg from '../assets/images/Non-Alco.png'

import heroVideo from '../assets/videos/hero_video.mp4';

import styles from './Home.module.css';
import './About.css'
import { Helmet } from 'react-helmet-async';

// three.js / R3F is the heaviest dependency in the bundle — split it
// into its own chunk and mount it after the initial paint.
const ParticleField = lazy(() => import('../components/ui/ParticleField'));

/* =====================================================================
   HERO BOTTLE
   ===================================================================== */

// Deterministic pseudo-random bubble field so it doesn't reshuffle on re-render
function useBubbles(count = 22) {
  return useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 137.51; // golden-angle spread for even distribution
      const left = (seed % 100);
      const size = 3 + ((seed * 7) % 9);
      const duration = 3.2 + ((seed * 3) % 4.5);
      const delay = (seed % 5) * -1;
      return { id: i, left, size, duration, delay };
    });
  }, [count]);
}

function HeroBottle() {
  const stageRef = useRef(null);
  const bubbles = useBubbles(30);
  const fizz = useBubbles(14);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const springX = useSpring(mx, { stiffness: 80, damping: 20 });
  const springY = useSpring(my, { stiffness: 80, damping: 20 });

  const rotateY = useTransform(springX, [0, 1], [-11, 11]);
  const rotateX = useTransform(springY, [0, 1], [9, -9]);
  const sweepX = useTransform(springX, [0, 1], ['-24%', '24%']);
  const specularX = useTransform(springX, [0, 1], ['-8%', '8%']);
  const glowX = useTransform(springX, [0, 1], ['42%', '58%']);
  const glowY = useTransform(springY, [0, 1], ['42%', '58%']);

  const handleMouseMove = (e) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <div
      className={styles.bottleStage}
      ref={stageRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div className={styles.bottleGlowLayer} style={{ left: glowX, top: glowY }} />
      {/* <div className={styles.bottleRays} /> */}
      {/* <div className={styles.bottleContactShadow} /> */}
      <div className={styles.bottleGroundGlow} />
      {/* <div className={styles.bottleHalo} /> */}

      {/* Slow perpetual float */}
      <motion.div
        className={styles.bottleFloatWrap}
        animate={{ y: [0, -16, 0], rotate: [0, 1.2, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Mouse-reactive tilt */}
        <motion.div
          className={styles.bottleTiltWrap}
          style={{ rotateX, rotateY }}
        >
          <img
            src={bottleImg}
            alt="Bevoky Global premium beverage bottle — luxury glass rendering"
            className={styles.bottleImage}
            draggable="false"
          />

          {/* <motion.div className={styles.bottleSweep} style={{ x: sweepX }} /> */}
          {/* <motion.div className={styles.bottleSpecular} style={{ x: specularX }} /> */}

          <div className={styles.bottleCondensation} />

          <div className={styles.bottleBubbleField}>
            {bubbles.map((b) => (
              <span
                key={b.id}
                className={styles.bottleBubble}
                style={{
                  left: `${b.left}%`,
                  width: b.size,
                  height: b.size,
                  animation: `bevoky-rise ${b.duration}s linear infinite`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>

          <div className={styles.bottleFizz}>
            {fizz.map((b) => (
              <span
                key={b.id}
                className={styles.bottleBubble}
                style={{
                  left: `${b.left}%`,
                  width: Math.max(2, b.size * 0.5),
                  height: Math.max(2, b.size * 0.5),
                  animation: `bevoky-rise ${b.duration * 0.6}s linear infinite`,
                  animationDelay: `${b.delay}s`,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Ambient beer bubbles floating in the whole stage, not just on the glass */}
      <div className={styles.bottleAmbientField} aria-hidden="true">
        {bubbles.slice(0, 16).map((b) => (
          <span
            key={`ambient-${b.id}`}
            className={styles.bottleAmbientBubble}
            style={{
              left: `${(b.left * 1.4) % 100}%`,
              width: b.size * 0.7,
              height: b.size * 0.7,
              animation: `bevoky-rise ${b.duration * 1.4}s linear infinite`,
              animationDelay: `${b.delay * 1.6}s`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes bevoky-rise {
          0% { transform: translateY(0) scale(0.6); opacity: 0; }
          12% { opacity: 0.9; }
          85% { opacity: 0.5; }
          100% { transform: translateY(-320%) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

/* =====================================================================
   HERO
   ===================================================================== */

const heroFeatures = [
  'Trusted Partnerships',
  'Reliable Supply',
  'European Distribution',
];

function HeroCheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
      <path d="M4 12.5L9.5 18L20 6" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Hero() {


  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("muted", "");
    video.muted = true;
  }, []);


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      const promise = video.play();

      if (promise !== undefined) {
        promise.catch(() => { });
      }
    };

    playVideo();

    document.addEventListener("touchstart", playVideo, {
      once: true,
    });

    return () => {
      document.removeEventListener("touchstart", playVideo);
    };
  }, []);

  return (
    <section className={styles.heroSection} id="hero">
      {/* <div className={styles.heroBgPhoto} style={{ backgroundImage: `url(${atmosphereImg})` }} /> */}
      <video
        ref={videoRef}
        className={styles.heroBgVideo}
        poster={atmosphereImg}
        autoPlay
        muted
        loop
        playsInline
        webkit-playsinline="true"
        x5-playsinline="true"
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
      </video>


      <div className={styles.heroBgGradient} />

      <Suspense fallback={null}>
        <ParticleField className={styles.heroAtmosphere} />
      </Suspense>

      <div className={styles.heroVignette} />
      <div className={styles.heroGrain} />

      <div className={`container ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          {/* <Reveal>
            <span className={styles.heroEyebrow}>Bevoky Global UG (haftungsbeschränkt)</span>
          </Reveal> */}

          {/* <RevealText
            as="h1"
            className={styles.heroHeadline}
            delay={0.3}
            text="Premium Beverage Distribution"
          /> */}
          <Reveal delay={0.2}>

            <h1 className="about-hero__title">
              Premium Beverage Distribution{" "}
              <span className="text-gold">Across Europe.</span>
            </h1>
          </Reveal>

          <motion.p
            className={styles.heroSub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
          >
            Bevoky Global UG (haftungsbeschränkt) is a Germany-based beverage import and distribution company
            connecting international producers with distributors,
            wholesalers, retailers, and hospitality businesses throughout
            Europe.
          </motion.p>

          <motion.div
            className={styles.heroCtaRow}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton variant="primary" as="a" href="/products">
              Explore Categories
            </MagneticButton>

            {/* <MagneticButton variant="ghost" as="a" href="/contact">
              Get in Touch
            </MagneticButton> */}

          </motion.div>

          {/* <motion.ul
            className={styles.heroFeatureList}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {heroFeatures.map((f) => (
              <li key={f} className={styles.heroFeatureItem}>
                <span className={styles.heroFeatureIcon}>
                  <HeroCheckIcon />
                </span>
                {f}
              </li>
            ))}
          </motion.ul> */}
        </div>

        <div className={styles.heroBottleColumn}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: '100%' }}
          >
            <HeroBottle />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   ABOUT PREVIEW
   ===================================================================== */

const aboutCounters = [
  { target: 5, suffix: '+', label: 'Beverage Categories' },
  { target: 20, suffix: '+', label: 'European Markets' },
  { target: 100, suffix: '%', label: 'Import Compliance' },
];

function AboutCounter({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div className={styles.aboutStatCard} ref={ref}>
      <div className={styles.aboutStatValue}>
        {value}
        <span>{suffix}</span>
      </div>
      <div className={styles.aboutStatLabel}>{label}</div>
    </div>
  );
}

function AboutReliableCard() {
  return (
    <div className={styles.aboutStatCard}>
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className={styles.aboutStatIcon}>
        <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
      <div className={styles.aboutStatLabel}>Reliable Supply Network</div>
    </div>
  );
}

function AboutPreview() {
  return (
    <section className={`section ${styles.aboutSection}`} id="about">
      <div className="container">
        <div className={styles.aboutGrid}>
          <div>
            <Reveal>
              <span className={styles.aboutEyebrow}>About Bevoky Global</span>
            </Reveal>
            <RevealText
              as="h2"
              className={styles.aboutHeading}
              text="A single premium gateway for beverage distribution"
            />
            <Reveal delay={0.1}>
              <p className={styles.aboutCopy}>
                Bevoky Global UG (haftungsbeschränkt) is not a beverage
                brand — we are the distribution partner behind them.
                Headquartered in Germany, we import and distribute
                beverages from trusted producers around the world,
                building lasting relationships with distributors,
                wholesalers, retailers, and hospitality businesses across
                Europe.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className={styles.aboutCopy}>
                Our portfolio grows with every partnership — today
                representing select producers, tomorrow expanding across
                categories and countries, always held to one standard of
                quality and reliability.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <MagneticButton variant="primary" as="a" href="/about">
                Learn About Us
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className={styles.aboutStatsColumn}>
              <div className={styles.aboutMapDots} aria-hidden="true" />
              <div className={styles.aboutStatsGrid}>
                {aboutCounters.map((c) => (
                  <AboutCounter key={c.label} {...c} />
                ))}
                <AboutReliableCard />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   CATEGORIES
   ===================================================================== */

const categories = [
  {
    name: 'Beer',
    desc: 'Lagers, ales, specialty & craft beer from trusted breweries.',
    image: beerImg,
  },
  {
    name: 'Wine',
    desc: 'Red, white, rosé & sparkling wines from renowned regions.',
    image: wineImg,
  },
  {
    name: 'Spirits',
    desc: 'Whisky, vodka, rum, gin & premium distilled spirits.',
    image: spiritsImg,
  },
  {
    name: 'Ready to Drink',
    desc: 'RTDs, cocktails & pre-mixed drinks for modern venues.',
    image: craftImg,
  },
  {
    name: 'Non-Alcoholic',
    desc: 'Soft drinks, juices, energy & functional beverages.',
    image: energyImg,
  },
];

function CategoryArrowIcon({ direction = 'right' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 14 14" fill="none" style={{ transform: direction === 'left' ? 'rotate(180deg)' : 'none' }}>
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Categories() {
  return (
    <section className={`section ${styles.catSection}`} id="categories">
      <div className="container">

        <div className={styles.catHead}>
          <div>
            <Reveal>
              <span className={styles.catEyebrow}>
                Our Categories
              </span>
            </Reveal>

            <RevealText
              as="h2"
              className={styles.catHeading}
              text="Premium beverages curated for your market"
            />
          </div>

          <Reveal delay={0.1}>
            <p className={styles.catHeadNote}>
              From classic favorites to modern innovations, our categories
              are carefully selected to meet the diverse needs of businesses
              across Europe.
            </p>
          </Reveal>
        </div>

        <div className={styles.catGrid}>
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              className={styles.catCard}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className={styles.catCardImg}
              />

              <div className={styles.catCardShade}></div>

              <div className={styles.catCardBorder}></div>

              <div className={styles.catCardContent}>
                <h3 className={styles.catCardTitle}>
                  {c.name}
                </h3>

                <div className={styles.catCardLine}></div>

                <p className={styles.catCardDesc}>
                  {c.desc}
                </p>

                <div className={styles.catExplore}>
                  Explore Category
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* =====================================================================
   WHY CHOOSE US
   ===================================================================== */

const whyFeatures = [
  {
    title: 'Germany-Based Company',
    text: 'Local expertise with strong roots in the European market.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Quality Focused',
    text: 'Carefully selected products that meet high standards.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Strong European Focus',
    text: 'Deep understanding of market needs and regulations.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
        <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9s1.3-6.4 3.8-9Z" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    title: 'Professional Partnerships',
    text: 'Transparent, fair and long-term business relationships.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M8 21s-6-4.35-6-9.5A4.5 4.5 0 0 1 8 7a4.5 4.5 0 0 1 4 2.4A4.5 4.5 0 0 1 16 7a4.5 4.5 0 0 1 6 4.5c0 5.15-6 9.5-6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Reliable Supply Chain',
    text: 'Efficient logistics and consistent product availability.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Customer Oriented',
    text: 'Dedicated support and solutions tailored to your needs.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4.5 20c1.4-3.6 4.3-5.6 7.5-5.6s6.1 2 7.5 5.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
];

const whyOrbitLabels = [
  { label: 'Quality', top: '4%', left: '78%' },
  { label: 'Reliability', top: '38%', left: '92%' },
  { label: 'Service', top: '76%', left: '82%' },
  { label: 'Partnership', top: '80%', left: '10%' },
  { label: 'Compliance', top: '4%', left: '14%' },
];

function WhyChooseUs() {
  return (
    <section className={`section ${styles.whySection}`} id="why-us">
      <div className="container">
        <div className={styles.whyGrid}>
          <div>
            <Reveal>
              <span className={styles.whyEyebrow}>Why Choose Us</span>
            </Reveal>
            <RevealText as="h2" className={styles.whyHeading} text="A partner you can count on" />
            <Reveal delay={0.1}>
              <p className={styles.whyIntro}>
                From compliance to logistics, every part of the journey is
                handled with the same standard of care — so your brand
                arrives in Europe exactly as intended.
              </p>
            </Reveal>

            <div className={styles.whyFeatureGrid}>
              {whyFeatures.map((f, i) => (
                <Reveal key={f.title} delay={0.12 + i * 0.06}>
                  <div className={styles.whyFeatureCard}>
                    <span className={styles.whyFeatureIcon}>{f.icon}</span>
                    <div>
                      <div className={styles.whyFeatureTitle}>{f.title}</div>
                      <div className={styles.whyFeatureText}>{f.text}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className={styles.whyBottleStage}>
              <div className={styles.whyBottleGlow} />
              <div className="story__map" aria-hidden="true" />
              <svg className={styles.whyOrbitLines} viewBox="0 0 400 400" aria-hidden="true">
                <circle cx="200" cy="200" r="150" className={styles.whyOrbitRing} />
                {whyOrbitLabels.map((o, i) => {
                  const x = (parseFloat(o.left) / 100) * 400;
                  const y = (parseFloat(o.top) / 100) * 400;
                  return <line key={i} x1="200" y1="200" x2={x} y2={y} className={styles.whyOrbitLine} />;
                })}
              </svg>
              <img src={comboBottle} alt="Bevoky Global premium bottle range" className={styles.whyBottleImg} />
              {whyOrbitLabels.map((o) => (
                <span key={o.label} className={styles.whyOrbitLabel} style={{ top: o.top, left: o.left }}>
                  {o.label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   SERVICES
   ===================================================================== */

const services = [
  {
    n: '01',
    title: 'Import Management',
    text: 'Efficient sourcing and import coordination from trusted global beverage producers.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 7l9-4 9 4-9 4-9-4Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M3 7v10l9 4 9-4V7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M12 11v10" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: '02',
    title: 'Distribution Network',
    text: 'Reliable distribution solutions across Germany and selected European business markets.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="6" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="18" cy="6" r="2.4" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="18" r="2.4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7.8 7.4 10.5 16M16.2 7.4 13.5 16M8.4 6h7.2" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    ),
  },
  {
    n: '03',
    title: 'Market Development',
    text: 'Helping beverage brands expand successfully across competitive European market segments.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 19V9M10 19V5M16 19v-7M22 19H2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M4 9l6-4 6 4 4-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    n: '04',
    title: 'Business Partnerships',
    text: 'Building trusted long-term partnerships with distributors, retailers, and wholesalers worldwide.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M8 21s-6-4.35-6-9.5A4.5 4.5 0 0 1 8 7a4.5 4.5 0 0 1 4 2.4A4.5 4.5 0 0 1 16 7a4.5 4.5 0 0 1 6 4.5c0 5.15-6 9.5-6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function Services() {
  return (
    <section className={`section ${styles.svcSection}`} id="services">
      <div className="container">
        <div className={styles.svcGrid}>
          <div className={styles.svcIntro}>
            <Reveal>
              <span className={styles.svcEyebrow}>Our Services</span>
            </Reveal>
            <RevealText as="h2" className={styles.svcHeading} text="End-to-end distribution starting with Germany" />
            <Reveal delay={0.12}>
              <p className={styles.svcIntroText}>
                Our primary focus is the German market, with a strong
                infrastructure and network to serve businesses nationwide
                and expand across Europe.
              </p>
            </Reveal>
          </div>

          <div className={styles.svcCards}>
            {services.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08}>
                <div className={styles.svcCard}>
                  <div className={styles.svcCardSweep} />
                  <span className={styles.svcCardIndex}>{s.n}</span>
                  <div className={styles.svcCardIcon}>{s.icon}</div>
                  <div className={styles.svcCardTitle}>{s.title}</div>
                  <div className={styles.svcCardText}>{s.text}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   MARKETS MAP
   ===================================================================== */

const MAP_HUB = { x: 400, y: 210 };

const markets = [
  { name: 'Netherlands', x: 250, y: 90 },
  { name: 'Belgium', x: 210, y: 190 },
  { name: 'France', x: 190, y: 300 },
  { name: 'Switzerland', x: 320, y: 340 },
  { name: 'Austria', x: 470, y: 330 },
  { name: 'Italy', x: 470, y: 380 },
  { name: 'Poland', x: 570, y: 150 },
  { name: 'Czechia', x: 540, y: 250 },
  { name: 'Denmark', x: 420, y: 60 },
  { name: 'Sweden', x: 520, y: 40 },
];

function mapCurve(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2 - 26;
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}

function MarketsMap() {
  return (
    <section className={`section ${styles.mapSection}`} id="markets">
      <div className="container">
        <div className={styles.mapGrid}>
          <div>
            <Reveal>
              <span className={styles.mapEyebrow}>Markets We Serve</span>
            </Reveal>
            <RevealText as="h2" className={styles.mapHeading} text="Connecting Europe, starting with Germany" />
            <Reveal delay={0.12}>
              <p className={styles.mapIntroText}>
                From our German hub, golden supply lines reach distributors,
                wholesalers and hospitality partners across the continent —
                a network built for consistency at scale.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <MagneticButton variant="primary" as="a" href="/contact">
                Contact Our Team
              </MagneticButton>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className={styles.mapWrap}>
              <svg
                className={styles.mapSvg}
                viewBox="0 0 780 420"
                role="img"
                aria-label="Network diagram showing Bevoky Global's distribution hub in Germany connected to partner markets across Europe"
              >
                {markets.map((m) => (
                  <path key={m.name} className={styles.mapRoute} d={mapCurve(MAP_HUB, m)} />
                ))}

                {markets.map((m) => (
                  <g key={m.name} className={styles.mapNodeCity}>
                    <circle cx={m.x} cy={m.y} r="4" />
                    <text x={m.x + 9} y={m.y + 4} className={styles.mapLabel}>
                      {m.name}
                    </text>
                  </g>
                ))}

                <g className={styles.mapNodeHub}>
                  <circle className={styles.mapPulse} cx={MAP_HUB.x} cy={MAP_HUB.y} r="6" />
                  <circle className="core" cx={MAP_HUB.x} cy={MAP_HUB.y} r="7" />
                  <text x={MAP_HUB.x + 14} y={MAP_HUB.y + 5} className={styles.mapLabelHub}>
                    GERMANY — HQ
                  </text>
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
   CTA
   ===================================================================== */

// function CTA() {
//   return (
//     <section className={styles.ctaSection} id="partner">
//       <div className={styles.ctaGlowLeft} />
//       <div className={styles.ctaGlowRight} />
//       <div className={`container ${styles.ctaContent}`}>
//         <Reveal>
//           <span className={styles.ctaEyebrow}>Partner With Bevoky Global</span>
//         </Reveal>
//         <RevealText as="h2" className={styles.ctaHeading} text="Let's grow together" />
//         <Reveal delay={0.15}>
//           <p className={styles.ctaSub}>
//             Whether you're a producer seeking market entry, or a
//             distributor looking to expand your portfolio — let's build
//             the partnership.
//           </p>
//         </Reveal>
//         <Reveal delay={0.25}>
//           <div className={styles.ctaButtonRow}>
//             <MagneticButton variant="primary" as="a" href="/contact">
//               Become a Partner
//             </MagneticButton>
//             <MagneticButton variant="ghost" as="a" href="/products">
//               Explore Categories
//             </MagneticButton>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

/* =====================================================================
   HOME
   ===================================================================== */

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Bevoky Global | Premium Beverage Import & Distribution Across Europe</title>

        <meta
          name="description"
          content="Bevoky Global UG (haftungsbeschränkt) is a Germany-based beverage import and distribution company connecting premium international beer, wine, spirits, and non-alcoholic beverage producers with distributors, wholesalers, retailers, supermarkets, and hospitality businesses across Europe."
        />

        <meta
          name="keywords"
          content="Bevoky Global, beverage distribution Europe, beverage importer Germany, beer distribution, lager, premium beer, strong beer, wine importer, whisky distributor, vodka distributor, spirits distribution, beverage wholesale Europe, horeca suppliers, beverage logistics, international beverage trading"
        />

        <meta
          property="og:title"
          content="Bevoky Global | Premium Beverage Import & Distribution Across Europe"
        />

        <meta
          property="og:description"
          content="Connecting premium international beverage brands with distributors, wholesalers, retailers, and hospitality businesses across Europe through reliable import and distribution solutions."
        />

        <meta
          property="og:image"
          content="https://bevokyglobal.com/assets/icon.png"
        />

        <meta
          property="og:url"
          content="https://bevokyglobal.com/"
        />

        <meta property="og:type" content="website" />

        <meta
          name="twitter:card"
          content="summary_large_image"
        />

        <meta
          name="twitter:title"
          content="Bevoky Global | Premium Beverage Import & Distribution Across Europe"
        />

        <meta
          name="twitter:description"
          content="Germany-based beverage import and distribution company serving distributors, wholesalers, retailers, supermarkets, and hospitality businesses throughout Europe."
        />

        <meta
          name="twitter:image"
          content="https://bevokyglobal.com/assets/icon.png"
        />

        <link
          rel="canonical"
          href="https://bevokyglobal.com/"
        />
      </Helmet>
      <Hero />
      <AboutPreview />
      <Categories />
      <WhyChooseUs />
      <Services />
      <MarketsMap />
      {/* <CTA /> */}
    </>
  );
}