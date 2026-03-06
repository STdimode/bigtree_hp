import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  /** 뷰포트 진입 비율 (0~1) */
  threshold?: number;
  /** 지연 시간(ms) */
  delay?: number;
  /** translateY 시작 거리(px) */
  distance?: number;
  /** 애니메이션 지속 시간(s) */
  duration?: number;
}

export function FadeUp({
  children,
  threshold = 0.12,
  delay = 0,
  distance = 48,
  duration = 0.75,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => setVisible(true), delay);
          } else {
            setVisible(true);
          }
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay / 1000}s, transform ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
