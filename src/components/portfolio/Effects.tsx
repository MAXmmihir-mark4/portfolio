import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { Orbit } from "lucide-react";
import { Starfield } from "./Starfield";

export function ExperienceEffects() {
  const reduced = useReducedMotion();
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 180, damping: 24 }),
    sy = useSpring(y, { stiffness: 180, damping: 24 });
  const [hovered, setHovered] = useState(false);
  const [boot, setBoot] = useState(true);
  const [percent, setPercent] = useState(0);
  const trail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reduced) {
      setBoot(false);
      return;
    }
    const timer = window.setInterval(() => setPercent((p) => Math.min(100, p + 10)), 65);
    const end = window.setTimeout(() => {
      setBoot(false);
      window.clearInterval(timer);
    }, 800);
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: true });
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHovered(!!(e.target as HTMLElement).closest("a, button, input, textarea, .tilt-panel"));
      if (trail.current)
        gsap.to(trail.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.65,
          ease: "power3.out",
          overwrite: true,
        });
    };
    window.addEventListener("pointermove", move);
    return () => {
      clearInterval(timer);
      clearTimeout(end);
      lenis.destroy();
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", move);
    };
  }, [reduced, x, y]);
  return (
    <>
      <Starfield />
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="ai-cursor"
            style={{ x: sx, y: sy }}
            animate={{ scale: hovered ? 2.2 : 1 }}
          />
          <div aria-hidden ref={trail} className="cursor-trail" />
        </>
      )}
      <AnimatePresence>
        {boot && (
          <motion.div
            className="boot-screen"
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.45 }}
          >
            <motion.div animate={{ rotate: 180 }} transition={{ duration: 1.2 }}>
              <Orbit size={44} strokeWidth={1} />
            </motion.div>
            <span className="mono">MC / INITIALIZING</span>
            <strong>
              {percent.toString().padStart(2, "0")}
              <small>%</small>
            </strong>
            <span className="mono">
              {percent < 50 ? "NEURAL CORE · ONLINE" : "ORBITAL SYSTEMS · READY"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
