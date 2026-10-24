import { lazy, Suspense, useEffect, useState } from "react";
import { ClientOnly, Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Download, Orbit, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
const Universe = lazy(() => import("./Universe"));
const titles = [
  "AI Engineer",
  "Full Stack Developer",
  "ML Engineer",
  "Backend Developer",
  "Creator",
  "Builder",
];
export function Hero() {
  const [title, setTitle] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) return;
    const timer = setInterval(() => setTitle((t) => (t + 1) % titles.length), 3200);
    return () => clearInterval(timer);
  }, [reduced]);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden />
      <div className="hero-topline mono">
        <span>
          <span className="signal-dot" /> SYSTEM ONLINE
        </span>
        <span>UDAIPUR, INDIA / PLANET EARTH</span>
      </div>
      <div className="core-scene">
        <ClientOnly
          fallback={
            <div className="core-fallback">
              <Orbit size={150} strokeWidth={0.3} />
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="core-fallback">
                <Orbit size={150} strokeWidth={0.3} />
              </div>
            }
          >
            <Universe />
          </Suspense>
        </ClientOnly>
      </div>
      <div className="core-label mono">
        <Plus size={12} />
        <span>
          NEURAL CORE
          <br />
          <small>V.01 / ALWAYS EVOLVING</small>
        </span>
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.8 }}
        >
          <div className="hero-eyebrow mono">
            <span /> A MIND IN MOTION
          </div>
          <h1 id="hero-title">
            Mihir
            <br />
            <span>
              Chhatwani<span className="name-period">.</span>
            </span>
          </h1>
          <div className="title-line">
            <span>I’m an</span>
            <AnimatePresence mode="wait">
              <motion.strong
                key={title}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {titles[title]}
              </motion.strong>
            </AnimatePresence>
            <span className="title-caret">_</span>
          </div>
          <p className="hero-description">
            Turning curiosity into code.
            <br />
            Building intelligent things for a world of possibilities.
          </p>
          <div className="hero-actions">
            <Button variant="hero" asChild size="lg">
              <a href="#projects">
                Explore my work <ArrowUpRight />
              </a>
            </Button>
            <Button variant="heroOutline" asChild size="lg">
              <a href="/mihir-chhatwani-resume.txt" download>
                <Download /> Résumé
              </a>
            </Button>
          </div>
          <Link to="/contact" className="hero-contact">
            Have something in mind?{" "}
            <span>
              Let’s connect <ArrowUpRight size={13} />
            </span>
          </Link>
        </motion.div>
      </div>
      <div className="hero-bottom mono">
        <a href="#about">
          <ArrowDown size={15} />
          <span>SCROLL TO EXPLORE</span>
        </a>
        <div>
          CRAFTED WITH INTENTION<span>01 — 06</span>
        </div>
      </div>
    </section>
  );
}
