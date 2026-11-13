
"use client";

import { motion } from "motion/react";

export default function AnimatedCard({
  children,
  className = "",
  delay = 0,
}) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: 50,
        scale: 0.96,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{
        y: -6,
        transition: { duration: 0.25 },
      }}
    >
      {children}
    </motion.div>
  );
}
