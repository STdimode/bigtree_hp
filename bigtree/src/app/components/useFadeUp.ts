import { useEffect, useRef, useState } from "react";

/**
 * 스크롤 시 요소가 뷰포트에 진입하면 페이드업 애니메이션을 트리거합니다.
 * @param threshold 뷰포트 진입 비율 (0~1, 기본 0.15)
 * @param delay 지연 시간(ms, 기본 0) — 여러 요소를 순차적으로 나타낼 때 사용
 */
export function useFadeUp(threshold = 0.15, delay = 0) {
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

  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: "opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  };

  return { ref, style, visible };
}
