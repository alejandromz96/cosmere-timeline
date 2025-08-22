"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const FAR_SPEED = 0.15;
const MID_SPEED = 0.35;
const NEAR_SPEED = 0.65;

const Starfield = () => {
  const { scrollY } = useScroll();
  const prefersReduced = useReducedMotion();

  const yFar = useTransform(scrollY, (v) => (prefersReduced ? 0 : -v * FAR_SPEED));
  const yMid = useTransform(scrollY, (v) => (prefersReduced ? 0 : -v * MID_SPEED));
  const yNear = useTransform(scrollY, (v) => (prefersReduced ? 0 : -v * NEAR_SPEED));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 select-none" aria-hidden>
      <div className="absolute inset-0 bg-zinc-950" />
      <motion.div
        style={{ y: yFar }}
        className="motion-safe:animate-sf-drift-1 sf-1 absolute inset-0 transform-gpu bg-white/90 [mask-image:url('/starfield/layer1.svg')] [mask-size:220] [mask-repeat:repeat] mix-blend-screen will-change-transform motion-reduce:animate-none"
      />
      <motion.div
        style={{ y: yMid }}
        className="motion-safe:animate-sf-drift-2 sf-2 absolute inset-0 transform-gpu bg-white/90 [mask-image:url('/starfield/layer2.svg')] [mask-size:220] [mask-repeat:repeat] mix-blend-screen will-change-transform motion-reduce:animate-none"
      />
      <motion.div
        style={{ y: yNear }}
        className="motion-safe:animate-sf-drift-3 sf-3 absolute inset-0 transform-gpu bg-white/90 [mask-image:url('/starfield/layer3.svg')] [mask-size:220] [mask-repeat:repeat] mix-blend-screen will-change-transform motion-reduce:animate-none"
      />
    </div>
  );
};

export default Starfield;
