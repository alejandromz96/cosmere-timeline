"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/**
 * Simplified, opinionated star parallax background for scrollytelling.
 * - Fullscreen fixed background
 * - Moves only with the mouse (slow & smooth)
 * - Subtle upward drift with page scroll
 * - Light twinkle on a few stars
 * - Avoids SSR hydration issues by generating stars only on mount
 */

// ===== TUNABLE CONSTANTS (no props) =====
const SPREAD = 3200; // area around center where stars are placed
const MAX_SHIFT = 64; // max mouse shift for the nearest layer (px)
const DENSITY = { NEAR: 380, MID: 320, FAR: 280, TWINKLE: 180 };
const SCROLL_FACTOR = { NEAR: -0.5, MID: -0.35, FAR: -0.2 }; // translateY per px scroll
const SPRING = { stiffness: 90, damping: 22, mass: 0.35 }; // motion spring

// ===== Utilities =====
function makeBoxShadow(count: number, area: number, blur = 0, opacity = 1) {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const x = Math.random() * area - area / 2;
    const y = Math.random() * area - area / 2;
    const o = Math.max(0.5, Math.min(1, opacity + (Math.random() - 0.5) * 0.4));
    const tint = Math.random();
    const color =
      tint < 0.1
        ? `rgba(150, 190, 255, ${o})`
        : tint > 0.9
          ? `rgba(255, 230, 200, ${o})`
          : `rgba(255, 255, 255, ${o})`;
    parts.push(`${x}px ${y}px ${blur}px ${color}`);
  }
  return parts.join(", ");
}

export default function StarParallax() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Hydration-safe gate: render stars only after mount
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  // Mouse tracking → motion values (slow + smooth)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, SPRING);
  const sy = useSpring(my, SPRING);

  // Scroll → motion value
  const sv = useMotionValue(0);
  useEffect(() => {
    const onScroll = () => sv.set(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sv]);

  // Parallax per layer (mouse)
  const nearX = useTransform(sx, (v) => v * 1);
  const nearYMouse = useTransform(sy, (v) => v * 1);
  const midX = useTransform(sx, (v) => v * 0.6);
  const midYMouse = useTransform(sy, (v) => v * 0.6);
  const farX = useTransform(sx, (v) => v * 0.35);
  const farYMouse = useTransform(sy, (v) => v * 0.35);

  // Scroll offsets
  const nearYScroll = useTransform(sv, (y) => y * SCROLL_FACTOR.NEAR);
  const midYScroll = useTransform(sv, (y) => y * SCROLL_FACTOR.MID);
  const farYScroll = useTransform(sv, (y) => y * SCROLL_FACTOR.FAR);

  // Combine mouse + scroll for Y
  const nearY = useTransform<number, number>([nearYMouse, nearYScroll], ([a, b]) => a + b);
  const midY = useTransform<number, number>([midYMouse, midYScroll], ([a, b]) => a + b);
  const farY = useTransform<number, number>([farYMouse, farYScroll], ([a, b]) => a + b);

  // Generate stars once on client
  const stars = useMemo(() => {
    if (!ready) return null;
    return {
      near: makeBoxShadow(DENSITY.NEAR, SPREAD, 2, 0.95),
      mid: makeBoxShadow(DENSITY.MID, SPREAD, 1, 0.85),
      far: makeBoxShadow(DENSITY.FAR, SPREAD, 0, 0.75),
      twinkle: makeBoxShadow(DENSITY.TWINKLE, SPREAD, 3, 0.9),
    } as const;
  }, [ready]);

  // Mouse listeners (viewport-centered, slow response)
  useEffect(() => {
    if (!ready) return;
    const handle = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dxn = (e.clientX - cx) / cx;
      const dyn = (e.clientY - cy) / cy;
      // smaller shift for "lento"
      mx.set(dxn * MAX_SHIFT);
      my.set(dyn * MAX_SHIFT);
    };
    const leave = () => {
      mx.set(0);
      my.set(0);
    };
    window.addEventListener("mousemove", handle);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", handle);
      window.removeEventListener("mouseleave", leave);
    };
  }, [ready, mx, my]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 isolate -z-10 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black"
      aria-label="Parallax starfield"
      role="img"
    >
      {/* Render nothing until mounted to avoid SSR mismatch */}
      {!ready ? null : (
        <>
          {/* FAR */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ translateX: farX, translateY: farY }}
          >
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: 1,
                height: 1,
                boxShadow: stars!.far,
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* MID */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ translateX: midX, translateY: midY }}
          >
            <div
              className="absolute top-1/2 left-1/2 h-[1.5px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 transform drop-shadow-[0_0_1px_rgba(255,255,255,0.2)]"
              style={{ boxShadow: stars!.mid }}
            />
          </motion.div>

          {/* NEAR */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ translateX: nearX, translateY: nearY }}
          >
            <div
              className="absolute top-1/2 left-1/2"
              style={{
                width: 2,
                height: 2,
                boxShadow: stars!.near,
                transform: "translate(-50%, -50%)",
                filter: "drop-shadow(0 0 2px rgba(255,255,255,0.35))",
              }}
            />
          </motion.div>

          {/* TWINKLE overlay */}
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ translateX: nearX, translateY: nearY }}
          >
            <div
              className="twinkle absolute top-1/2 left-1/2"
              style={{
                width: 2,
                height: 2,
                boxShadow: stars!.twinkle,
                transform: "translate(-50%, -50%)",
              }}
            />
          </motion.div>

          {/* Nebulae for depth */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-1 opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(800px 400px at 20% 10%, rgba(56,189,248,0.12), transparent 60%)," +
                "radial-gradient(600px 300px at 80% 20%, rgba(236,72,153,0.10), transparent 60%)," +
                "radial-gradient(700px 350px at 40% 80%, rgba(132,204,22,0.08), transparent 60%)",
            }}
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />

          {/* Twinkle keyframes (scoped) */}
          <style>{`
            @keyframes twinkle { 0% { opacity: 0.25 } 50% { opacity: 0.6 } 100% { opacity: 0.25 } }
            .twinkle { animation: twinkle 3.6s ease-in-out infinite; animation-delay: 0.3s; filter: drop-shadow(0 0 3px rgba(255,255,255,0.35)); }
          `}</style>
        </>
      )}
    </div>
  );
}
