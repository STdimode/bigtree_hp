import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import slider1 from "figma:asset/a2580ae9d24c601f6c1e07fd729847adead18c8a.png";
import slider2 from "figma:asset/54a0b0179e6efb1865be9f90287c7a3b4c813b97.png";
import slider3 from "figma:asset/84ab185d9df6befe402cb5f8f2778f6ff36b17b2.png";

const slides = [
  { image: slider1 },
  { image: slider2 },
  { image: slider3 },
];

export function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (idx: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(idx);
      setTimeout(() => setIsTransitioning(false), 700);
    },
    [isTransitioning]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length), [current, goTo]);
  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, goTo]
  );

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <>
      <style>{`
        #hero-section { aspect-ratio: 4/3; }
        @media (min-width: 768px) {
          #hero-section { aspect-ratio: unset; height: 85vh; min-height: 500px; max-height: 800px; }
        }
      `}</style>
      <section id="hero-section" className="relative w-full overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 ease-in-out"
            style={{ opacity: current === i ? 1 : 0, zIndex: current === i ? 1 : 0 }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/35 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-7 h-7" strokeWidth={1} />
        </button>
        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 flex items-center justify-center text-white/35 hover:text-white transition-colors"
        >
          <ChevronRight className="w-7 h-7" strokeWidth={1} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-[3px] transition-all duration-500 ${
                current === i ? "bg-white w-7" : "bg-white/25 w-[10px]"
              }`}
            />
          ))}
        </div>
      </section>
    </>
  );
}