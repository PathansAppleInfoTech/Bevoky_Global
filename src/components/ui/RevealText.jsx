import { motion } from 'framer-motion';

/**
 * Splits text into words and animates each one up + in with a stagger.
 * Use for headlines where the words arriving in sequence adds weight.
 */
export default function RevealText({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.05,
  once = true,
}) {
  const words = text.split(' ');
  const Tag = motion[as] || motion.h2;

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const word = {
    hidden: { opacity: 0, y: '0.6em', filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.6 }}
      style={{ overflow: 'hidden' }}
    >
      {words.map((w, i) => (
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', marginRight: '0.28em' }}
        >
          <motion.span variants={word} style={{ display: 'inline-block' }}>
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
