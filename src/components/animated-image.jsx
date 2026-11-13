
"use client";

import { motion } from "motion/react";

export default function AnimatedImage({
  children,
  className = "",
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{
        opacity: 0,
        scale: 0.94,
      }}
      whileInView={{
        opacity: 1,
        scale: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
