import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useParallax } from "./useParallax";
import welcomeBg from "figma:asset/4cd7b2aa85ddaa90aeff41090f5b1d299f84ffed.png";

export function WelcomeSection() {
  const { sectionRef, bgRef } = useParallax(0.6);

  return (
    <section
      ref={sectionRef as any}
      className="relative p_top_6 p_bottom_6 overflow-hidden"
      id="welcome"
    >
      {/* Background with parallax */}
      <div
        ref={bgRef}
        className="absolute left-0 right-0 will-change-transform"
        style={{ top: "-20%", bottom: "-20%" }}
      >
        <ImageWithFallback
          src={welcomeBg}
          alt="Welcome"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#2d3e2d]/60" />
      </div>

      <div className="relative z-10 max-w-[46rem] mx-auto px-6 text-center">
        {/* Label – P3, Regular */}
        <p
          className="text-[#9dbd9d] mb-[1.2rem]"
          style={{
            fontSize: "var(--p3)",
            fontWeight: 400,
            letterSpacing: "0.2em",
          }}
        >WELCOME NEW FAMILY</p>
        {/* Heading – H1, SemiBold */}
        <h2
          className="text-white mb-[1.2rem]"
          style={{
            fontSize: "var(--section-title)",
            fontWeight: 600,
            lineHeight: 1.5,
            letterSpacing: "-0.02em",
          }}
        >큰나무의 그늘 아래서<br />함께 쉼을 얻고 뿌리 내리세요</h2>
        {/* Body – P2, Light */}
        <p
          className="text-white/55 mb-[2.5rem] max-w-[28rem] mx-auto"
          style={{
            fontSize: "var(--p2)",
            fontWeight: 300,
            lineHeight: 1.85,
          }}
        >
          큰나무의 그늘 아래서 함께 쉼을 얻고 뿌리 내릴 수 있도록<br />
          새가족을 위한 따뜻한 안내를 준비했습니다.<br />
          아래 버튼을 클릭하시면 자세한 등록 과정을 살펴보실 수 있습니다.
        </p>
        {/* CTA – P2, Bold */}
        <a
          href="#"
          className="inline-block bg-white text-[#2d3e2d] px-[2.2rem] py-[0.8rem] hover:bg-[#f4f4f2] transition-colors shadow-lg"
          style={{
            fontSize: "var(--p2)",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          새가족 등록 안내
        </a>
      </div>
    </section>
  );
}