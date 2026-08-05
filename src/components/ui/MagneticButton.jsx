import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import styles from './MagneticButton.module.css';

export default function MagneticButton({
  children,
  variant = 'primary',
  as = 'button',
  href,
  onClick,
  className = '',
  icon = true,
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.28);
    y.set(relY * 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = motion[as] || motion.button;

  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`${styles.btn} ${styles[variant]} ${className}`}
    >
      <span className={styles.sheen} />
      <span style={{ position: 'relative', zIndex: 2 }}>{children}</span>
      {icon && (
        <span className={styles.icon} style={{ position: 'relative', zIndex: 2 }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </Tag>
  );
}
