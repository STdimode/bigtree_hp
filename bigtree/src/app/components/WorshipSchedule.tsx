import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useParallax } from "./useParallax";

/* ── Data ── */
const allViews = [
  {
    image:
      "https://images.unsplash.com/photo-1704254077225-f4e218628329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlJTIwYXVkaWVuY2UlMjBzZWF0ZWQlMjBkYXJrJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcyNzE1NzgzfDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    category: "주일예배",
    sub: "큰나무교회 본당",
    items: [
      { name: "1부", detail: "주일", time: "오전 09:30" },
      { name: "2부", detail: "주일", time: "오전 11:30" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1704254077225-f4e218628329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBzZXJ2aWNlJTIwYXVkaWVuY2UlMjBzZWF0ZWQlMjBkYXJrJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcyNzE1NzgzfDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    category: "푸른교회예배",
    sub: "",
    items: [
      { name: "아기새영유아교회", detail: "1-4세", time: "오전 11:30", location: "포도나무실" },
      { name: "아기새교회", detail: "5-7세", time: "오전 11:30", location: "포도나무실" },
      { name: "123어린이교회", detail: "초1-초3", time: "오전 11:30", location: "느티나무실" },
      { name: "456어린이교회", detail: "초4-초6", time: "오전 11:30", location: "자람터2" },
      { name: "중고등푸른교회", detail: "중1-고3", time: "09:30", location: "자람터1" },
      { name: "청년교회", detail: "주일", time: "오후 14:30", location: "큰나무교회 본당" },
    ],
  },
  {
    image:
      "https://images.unsplash.com/photo-1544427901-7da49550f9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwJTIwYmFuZCUyMHN0YWdlJTIwZGltJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcyNzE1NDk4fDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    category: "주중예배",
    sub: "큰나무교회 본당",
    items: [
      { name: "새벽기도", detail: "월-금", time: "오전 05:30" },
      { name: "수요예배", detail: "수요일", time: "오전 11:00" },
      { name: "수요중보기도", detail: "수요일", time: "저녁 20:30" },
      { name: "금요찬양예배", detail: "금요일", time: "저녁 20:30" },
    ],
  },
];

/* PC views: 주일+푸른 합쳐서 1페이지, 주중 1페이지 = 총 2 */
const pcViews = [
  { groups: [allViews[0], allViews[1]], image: allViews[0].image },
  { groups: [allViews[2]], image: allViews[2].image },
];

/* Mobile views: 각각 1페이지 = 총 3 */
const mobileViews = allViews;

/* ── Schedule block (single category) ── */
function ScheduleBlock({ view, last }: { view: (typeof allViews)[number]; last?: boolean }) {
  return (
    <div style={{ marginBottom: last ? 0 : "1.8rem" }}>
      <div style={{ marginBottom: "0.7rem" }}>
        <span
          style={{
            fontSize: "var(--p1)",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "-0.01em",
          }}
        >
          {view.category}
        </span>
        {view.sub && (
          <span
            style={{
              fontSize: "var(--p3)",
              fontWeight: 400,
              color: "#888",
              marginLeft: "0.8rem",
            }}
          >
            {view.sub}
          </span>
        )}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto 1fr",
          rowGap: "0.45rem",
          columnGap: "1.2rem",
          alignItems: "baseline",
        }}
      >
        {view.items.map((item) => (
          <div key={item.name} style={{ display: "contents" }}>
            <span style={{ fontSize: "var(--p2)", fontWeight: 600, color: "#555555" }}>
              {"location" in item && (item as any).location
                ? (item as any).location
                : view.sub || ""}
            </span>
            <span style={{ fontSize: "var(--p2)", fontWeight: 400, color: "#222222" }}>
              {item.name}
            </span>
            <span
              style={{ fontSize: "var(--p3)", fontWeight: 400, color: "#888888", letterSpacing: "0.01em" }}
            >
              {item.detail} {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WorshipSchedule() {
  /* PC: 2 views */
  const [pcView, setPcView] = useState(0);
  const [pcTransitioning, setPcTransitioning] = useState(false);
  const [pcDisplay, setPcDisplay] = useState(0);

  /* Mobile: 3 views */
  const [mobView, setMobView] = useState(0);
  const [mobTransitioning, setMobTransitioning] = useState(false);
  const [mobDisplay, setMobDisplay] = useState(0);

  const { sectionRef, bgRef } = useParallax(0.5);

  const changePc = (n: number) => {
    if (pcTransitioning) return;
    setPcTransitioning(true);
    setTimeout(() => {
      setPcDisplay(n);
      setPcView(n);
      setTimeout(() => setPcTransitioning(false), 50);
    }, 300);
  };
  const changeMob = (n: number) => {
    if (mobTransitioning) return;
    setMobTransitioning(true);
    setTimeout(() => {
      setMobDisplay(n);
      setMobView(n);
      setTimeout(() => setMobTransitioning(false), 50);
    }, 300);
  };

  const pcNext = () => changePc((pcView + 1) % pcViews.length);
  const pcPrev = () => changePc((pcView - 1 + pcViews.length) % pcViews.length);
  const mobNext = () => changeMob((mobView + 1) % mobileViews.length);
  const mobPrev = () => changeMob((mobView - 1 + mobileViews.length) % mobileViews.length);

  const currentPc = pcViews[pcDisplay];
  const currentMob = mobileViews[mobDisplay];

  return (
    <section ref={sectionRef as any} className="p_top_5 p_bottom_5" id="worship">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* ═══ PC LAYOUT (lg+) ═══ */}
        <div className="hidden lg:block">
          {/* Title + arrows */}
          <div className="flex items-center gap-[1rem]">
            <h2
              className="text-gray-900"
              style={{
                fontSize: "var(--section-title)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                fontFamily: "var(--font-section-title)",
              }}
            >
              WORSHIP SCHEDULE
            </h2>
            <div className="flex items-center gap-[0.3rem] ml-auto flex-shrink-0">
              <button
                onClick={pcPrev}
                className="w-[2.2rem] h-[2.2rem] flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-[1.5rem] h-[1.5rem]" strokeWidth={1.5} />
              </button>
              <span
                style={{
                  fontSize: "var(--p4)",
                  fontWeight: 400,
                  color: "#999",
                  minWidth: "3rem",
                  textAlign: "center",
                }}
              >
                {pcView + 1} / {pcViews.length}
              </span>
              <button
                onClick={pcNext}
                className="w-[2.2rem] h-[2.2rem] flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ChevronRight className="w-[1.5rem] h-[1.5rem]" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#000000", marginTop: "0.85rem", marginBottom: "1.65rem" }} />

          {/* Content grid */}
          <div className="grid grid-cols-2 overflow-hidden h-[32rem]">
            <div
              className="p-[3rem] flex flex-col justify-center"
              style={{
                alignItems: "flex-start",
                opacity: pcTransitioning ? 0 : 1,
                transform: pcTransitioning ? "translateY(12px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {currentPc.groups.map((g, i) => (
                <ScheduleBlock key={g.category} view={g} last={i === currentPc.groups.length - 1} />
              ))}
            </div>
            <div className="relative h-full overflow-hidden">
              <div
                ref={bgRef}
                className="absolute left-0 right-0 will-change-transform"
                style={{ top: "-15%", bottom: "-15%" }}
              >
                <ImageWithFallback
                  src={currentPc.image}
                  alt="Worship"
                  className="w-full h-full object-cover transition-opacity duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ═══ MOBILE LAYOUT (<lg) ═══ */}
        <div className="lg:hidden">
          {/* Title + arrows */}
          <div className="flex items-center gap-[1rem] flex-wrap gap-y-[0.25rem]">
            <h2
              className="text-gray-900"
              style={{
                fontSize: "var(--section-title)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                lineHeight: 1.3,
                fontFamily: "var(--font-section-title)",
                wordBreak: "normal",
                overflowWrap: "normal",
              }}
            >
              WORSHIP<br />SCHEDULE
            </h2>
            <div className="flex items-center gap-[0.3rem] ml-auto flex-shrink-0">
              <button
                onClick={mobPrev}
                className="w-[2.2rem] h-[2.2rem] flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ChevronLeft className="w-[1.5rem] h-[1.5rem]" strokeWidth={1.5} />
              </button>
              <span
                style={{
                  fontSize: "var(--p4)",
                  fontWeight: 400,
                  color: "#999",
                  minWidth: "3rem",
                  textAlign: "center",
                }}
              >
                {mobView + 1} / {mobileViews.length}
              </span>
              <button
                onClick={mobNext}
                className="w-[2.2rem] h-[2.2rem] flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
              >
                <ChevronRight className="w-[1.5rem] h-[1.5rem]" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#000000", marginTop: "0.85rem", marginBottom: "1.65rem" }} />

          {/* Content */}
          <div className="grid grid-cols-1 overflow-hidden">
            <div
              className="p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center"
              style={{
                alignItems: "flex-start",
                opacity: mobTransitioning ? 0 : 1,
                transform: mobTransitioning ? "translateY(12px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              <ScheduleBlock view={currentMob} last />
            </div>
            <div className="relative h-[18rem] overflow-hidden">
              <ImageWithFallback
                src={currentMob.image}
                alt="Worship"
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}