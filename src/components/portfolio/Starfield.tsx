import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export function Starfield() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    let frame = 0;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const draw = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const progress = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      context.fillStyle = getComputedStyle(document.documentElement).getPropertyValue(progress > .4 ? "--space-foreground" : "--core-blue");
      for (let i = 0; i < 100; i++) {
        const drift = reduced ? 0 : time * .001 * (1 + i % 3);
        const x = ((Math.sin(i * 127.1) + 1) * .5 * canvas.width + drift) % canvas.width;
        const y = ((Math.cos(i * 74.7) + 1) * .5 * canvas.height - window.scrollY * .06 + canvas.height * 10) % canvas.height;
        context.globalAlpha = (.12 + (i % 4) * .08) * (progress > .4 ? 1 : .4);
        context.beginPath(); context.arc(x, y, .5 + (i % 3) * .35, 0, Math.PI * 2); context.fill();
      }
      if (!reduced) frame = requestAnimationFrame(draw);
    };
    draw(0);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [reduced]);
  return <canvas ref={ref} className="living-starfield" aria-hidden />;
}