import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const galleryItems = [
  {
    image:
      "https://images.unsplash.com/photo-1505427214476-47e71e07abfe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjB3b3JzaGlwJTIwY29uZ3JlZ2F0aW9ufGVufDF8fHx8MTc3Mjc0OTk2MHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.03.01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559657608-cf55e9a8b4c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwYmlibGUlMjBwYWdlcyUyMGxpZ2h0fGVufDF8fHx8MTc3MjcwNjAyNHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.02.22",
  },
  {
    image:
      "https://images.unsplash.com/photo-1631108980044-f025e1b3a4e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFycnklMjBuaWdodCUyMHNreSUyMG1pbGt5JTIwd2F5fGVufDF8fHx8MTc3MjY4NDE5Nnww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.02.15",
  },
  {
    image:
      "https://images.unsplash.com/photo-1629803569181-56f364f3cf1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2Z0JTIwd2hpdGUlMjBjbG91ZHMlMjBibHVlJTIwc2t5fGVufDF8fHx8MTc3Mjc4MDQyOHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.02.08",
  },
  {
    image:
      "https://images.unsplash.com/photo-1709054754811-6c8d2d1ab015?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjaG9pciUyMHNpbmdpbmd8ZW58MXx8fHwxNzcyNzM4NjM2fDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.02.01",
  },
  {
    image:
      "https://images.unsplash.com/photo-1630011041146-04d179c6e215?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWJsZSUyMHN0dWR5JTIwZ3JvdXAlMjB0YWJsZXxlbnwxfHx8fDE3NzI3ODA0Mjh8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.01.25",
  },
  {
    image:
      "https://images.unsplash.com/photo-1629823607559-1e499b76a2d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBjbG91ZHMlMjBkcmFtYXRpYyUyMHNreXxlbnwxfHx8fDE3NzI3MzM1NTB8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.01.18",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616428882609-7443facdbe81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBwcmF5ZXIlMjBoYW5kcyUyMGNhbmRsZXxlbnwxfHx8fDE3NzI3ODA0MzB8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.01.11",
  },
  {
    image:
      "https://images.unsplash.com/photo-1612443284801-1892bb711269?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwZm9yZXN0fGVufDF8fHx8MTc3Mjc4MDQzMHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2026.01.04",
  },
  {
    image:
      "https://images.unsplash.com/photo-1611862662189-2021254caebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBzdW5yaXNlJTIwY2xvdWRzJTIwaG9yaXpvbnxlbnwxfHx8fDE3NzI3ODA0MzB8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    title: "갤러리제목입니다",
    date: "2025.12.28",
  },
];

export function Gallery() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [mobilePage, setMobilePage] = useState(0);
  const [mobileTransitioning, setMobileTransitioning] = useState(false);
  const [mobileDisplayPage, setMobileDisplayPage] = useState(0);
  const mobilePerPage = 2;
  const mobileTotalPages = Math.ceil(galleryItems.length / mobilePerPage);

  const changeMobilePage = (newPage: number) => {
    if (mobileTransitioning || newPage < 0 || newPage >= mobileTotalPages) return;
    setMobileTransitioning(true);
    // fade out
    setTimeout(() => {
      setMobileDisplayPage(newPage);
      setMobilePage(newPage);
      // fade in
      setTimeout(() => setMobileTransitioning(false), 30);
    }, 250);
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  return (
    <section className="p_top_5 p_bottom_5 bg-white" id="community">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header – left title, right arrows, black line below */}
        <div className="flex items-end justify-between flex-wrap gap-y-[0.5rem]">
          <div className="min-w-0">
            <h2
              className="text-gray-900"
              style={{
                fontSize: "var(--section-title)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                fontFamily: "var(--font-section-title)",
                wordBreak: "normal",
                overflowWrap: "normal",
              }}
            >GALLERY</h2>
          </div>
          {/* Desktop: Arrow buttons */}
          <div className="hidden md:flex items-center gap-[0.5rem]">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="w-[2.2rem] h-[2.2rem] flex items-center justify-center disabled:opacity-25 transition-all duration-300"
              style={{ backgroundColor: "transparent", borderRadius: "50%", border: "2px solid #000000" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#000000"; const svg = e.currentTarget.querySelector("svg"); if (svg) svg.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; const svg = e.currentTarget.querySelector("svg"); if (svg) svg.style.color = "#000000"; }}
            >
              <ChevronLeft className="w-[1rem] h-[1rem] transition-colors duration-300" style={{ color: "#000000" }} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="w-[2.2rem] h-[2.2rem] flex items-center justify-center disabled:opacity-25 transition-all duration-300"
              style={{ backgroundColor: "transparent", borderRadius: "50%", border: "2px solid #000000" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#000000"; const svg = e.currentTarget.querySelector("svg"); if (svg) svg.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; const svg = e.currentTarget.querySelector("svg"); if (svg) svg.style.color = "#000000"; }}
            >
              <ChevronRight className="w-[1rem] h-[1rem] transition-colors duration-300" style={{ color: "#000000" }} strokeWidth={2.5} />
            </button>
          </div>
          {/* Mobile: Arrow buttons */}
          <div className="flex md:hidden items-center gap-[0.5rem]">
            <button
              onClick={() => changeMobilePage(mobilePage - 1)}
              disabled={mobilePage === 0}
              className="w-[2.2rem] h-[2.2rem] flex items-center justify-center disabled:opacity-25 transition-all duration-300"
              style={{ backgroundColor: "transparent", borderRadius: "50%", border: "2px solid #000000" }}
            >
              <ChevronLeft className="w-[1rem] h-[1rem]" style={{ color: "#000000" }} strokeWidth={2.5} />
            </button>
            <span style={{ fontSize: "var(--p4)", color: "#999", minWidth: "2.5rem", textAlign: "center" }}>
              {mobilePage + 1} / {mobileTotalPages}
            </span>
            <button
              onClick={() => changeMobilePage(mobilePage + 1)}
              disabled={mobilePage >= mobileTotalPages - 1}
              className="w-[2.2rem] h-[2.2rem] flex items-center justify-center disabled:opacity-25 transition-all duration-300"
              style={{ backgroundColor: "transparent", borderRadius: "50%", border: "2px solid #000000" }}
            >
              <ChevronRight className="w-[1rem] h-[1rem]" style={{ color: "#000000" }} strokeWidth={2.5} />
            </button>
          </div>
        </div>
        {/* Black 1px divider */}
        <div style={{ height: "1px", backgroundColor: "#000000", marginTop: "1.25rem", marginBottom: "2rem" }} />

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="hidden md:flex gap-[1rem] overflow-x-auto pb-[1rem] items-center"
          style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {galleryItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="group flex-shrink-0 w-[calc(25%-0.75rem)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Hover overlay – bottom 1/4 */}
                <div
                  className="absolute bottom-0 left-0 right-0 flex flex-col justify-center px-[1rem] py-[0.6rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    height: "25%",
                    background: "rgba(0,0,0,0.45)",
                    backdropFilter: "blur(6px)",
                    WebkitBackdropFilter: "blur(6px)",
                  }}
                >
                  <p style={{ color: "#ffffff", fontSize: "var(--p3)", fontWeight: 600, lineHeight: 1.3 }}>
                    {item.title}
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "var(--p4)", fontWeight: 300, marginTop: "0.15rem" }}>
                    {item.date}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: 2 items per page with arrows */}
        <div className="md:hidden">
          <div
            className="grid grid-cols-2 gap-[0.6rem]"
            style={{
              opacity: mobileTransitioning ? 0 : 1,
              transform: mobileTransitioning ? "translateY(8px)" : "translateY(0)",
              transition: "opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            {galleryItems
              .slice(mobileDisplayPage * mobilePerPage, mobileDisplayPage * mobilePerPage + mobilePerPage)
              .map((item, i) => (
                <a key={`mobile-${mobileDisplayPage}-${i}`} href="#" className="group block">
                  <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: "4/3" }}>
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p
                    className="mt-[0.3rem] text-gray-700"
                    style={{ fontSize: "var(--p4)", fontWeight: 500 }}
                  >
                    {item.title}
                  </p>
                  <p
                    className="text-gray-400"
                    style={{ fontSize: "var(--caption)", fontWeight: 300 }}
                  >
                    {item.date}
                  </p>
                </a>
              ))}
          </div>
        </div>

        {/* All view link */}
        <div className="mt-[1.5rem] text-center">
          <a
            href="#"
            className="group/link inline-flex items-center gap-[0.4rem] text-gray-900 hover:text-[#5a7a5a] transition-colors"
            style={{
              fontSize: "var(--p2)",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            view all
            <ArrowRight
              size={16}
              className="opacity-0 group-hover/link:opacity-100 transition-all duration-200"
            />
          </a>
        </div>
      </div>
    </section>
  );
}