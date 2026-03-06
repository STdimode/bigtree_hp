import { useEffect, useRef } from "react";

export function useParallax(speed = 0.5) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    let running = true;

    const tick = () => {
      if (!running) return;
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // 0 when section enters bottom, 1 when it leaves top
      const progress = 1 - (rect.top + rect.height) / (windowH + rect.height);
      const offset = (progress - 0.5) * windowH * speed;
      bg.style.transform = `translate3d(0, ${offset}px, 0)`;
      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    return () => {
      running = false;
    };
  }, [speed]);

  return { sectionRef, bgRef };
}