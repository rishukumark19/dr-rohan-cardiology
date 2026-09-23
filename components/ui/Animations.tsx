"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useEffect, useRef } from "react";

// ─── FadeUp ──────────────────────────────────────────────────────────────────
// Fade-up reveal for individual elements
export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerGrid ─────────────────────────────────────────────────────────────
// Stagger children in a grid/list
export function StaggerGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.09 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── StaggerItem ─────────────────────────────────────────────────────────────
// Child item for stagger grid
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── AnimatedSection ─────────────────────────────────────────────────────────
// Fade in a full section
export function AnimatedSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ─── CountUp ─────────────────────────────────────────────────────────────────
// Animated number counter that counts up on entering the viewport.
// Accepts a string like "18,000+" or "4.9" and animates the numeric part.
export function CountUp({
  value,
  className = "",
}: {
  value: string;           // e.g. "18,000+", "4.9", "99.2%", "15+"
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Extract the numeric portion and suffix
  const numMatch = value.match(/[\d,.]+/);
  const numStr = numMatch ? numMatch[0].replace(/,/g, "") : "0";
  const numericVal = parseFloat(numStr);
  const suffix = value.replace(/[\d,]+/, "").replace(/^\.?\d+/, ""); // everything after the number

  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1200, bounce: 0 });
  const display = useTransform(spring, (v) => {
    if (numericVal >= 1000) {
      return `${Math.round(v).toLocaleString()}${suffix}`;
    }
    if (numericVal % 1 !== 0) {
      return `${v.toFixed(1)}${suffix}`;
    }
    return `${Math.round(v)}${suffix}`;
  });

  useEffect(() => {
    if (inView) {
      motionVal.set(numericVal);
    }
  }, [inView, numericVal, motionVal]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {display}
    </motion.span>
  );
}
