import { motion } from 'framer-motion';

/**
 * Cinematic scroll reveal: blur + fade + subtle rise.
 * Wrap any block of content; triggers once when ~20% visible.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  duration = 1,
  className,
  as = 'div',
  once = true,
  amount = 0.2,
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
