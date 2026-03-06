import { FileText, MapPin, SquareParking, Flower2 } from "lucide-react";

const links = [
  { icon: FileText, label: "주보", href: "#bulletin", desc: "이번 주 예배 안내와 소식" },
  { icon: MapPin, label: "오시는 길", href: "#map", desc: "교회 위치 및 교통편 안내" },
  { icon: SquareParking, label: "시설·주차", href: "#facility", desc: "교회 시설 및 주차장 안내" },
  { icon: Flower2, label: "새가족 안내", href: "#welcome", desc: "처음 오시는 분을 환영합니다" },
];

export function QuickLinks() {
  return (
    <section className="p_top_3 p_bottom_3" style={{ backgroundColor: "#e8efe8" }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Welcome label */}
        <p
          className="text-center text-gray-800 p_bottom_1"
          style={{
            fontSize: "30px",
            fontWeight: 800,
            letterSpacing: "0.2rem",
            fontFamily: "var(--font-section-title)",
          }}
        >Welcome to Bigtree Church</p>

        <div className="grid grid-cols-2 lg:flex lg:justify-center gap-0">
          {links.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex flex-col items-center gap-[0.5rem] py-[1.5rem] px-[1rem] lg:px-[3.375rem] transition-all group relative"
            >
              <div
                className="flex items-center justify-center w-[6rem] h-[6rem] bg-white/70 group-hover:bg-white transition-colors"
                style={{ borderRadius: "50%" }}
              >
                <item.icon
                  className="w-[2.4rem] h-[2.4rem] text-gray-800 group-hover:text-[#5a7a5a] transition-colors"
                  strokeWidth={1.4}
                  strokeLinejoin="miter"
                  strokeLinecap="square"
                />
              </div>
              {/* Label */}
              <span
                className="text-gray-800"
                style={{
                  fontSize: "var(--p2)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                }}
              >
                {item.label}
              </span>
              {/* Description */}
              <span
                className="text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-0"
                style={{
                  fontSize: "var(--p3)",
                  fontWeight: 400,
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                }}
              >
                {item.desc}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}