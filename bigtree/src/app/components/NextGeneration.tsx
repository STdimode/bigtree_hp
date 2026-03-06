import { ArrowRight } from "lucide-react";

const departments = [
  {
    name: "아기새교회",
    age: "",
    desc: "하나님의 사랑 안에서 아이들이 신앙의 첫 날갯짓을 배우는 공동체입니다.",
    hasArrow: true,
  },
  {
    name: "123어린이교회",
    age: "",
    desc: "하나님의 사랑 안에서 믿음의 뿌리를 깊이 내리며 자라가는 어린이 공동체입니다.",
    hasArrow: false,
  },
  {
    name: "456어린이교회",
    age: "",
    desc: "말씀과 예배 속에서 예수님과의 관계를 배우며 믿음을 삶으로 세워가는 공동체입니다.",
    hasArrow: false,
  },
  {
    name: "중고등푸른교회",
    age: "",
    desc: "청소년들이 성경적 정체성을 세우고 하나님의 비전을 발견하도록 돕는 공동체입니다.",
    hasArrow: false,
  },
  {
    name: "청년교회",
    age: "",
    desc: "하나님 안에서 서로를 세우며 함께 성장하는 청년 공동체입니다.",
    hasArrow: false,
  },
  {
    name: "틈새포플러스학교",
    age: "",
    desc: "성경적 가치관으로 세상을 이해하고 살아가도록 돕는 교육 공동체입니다.",
    hasArrow: false,
  },
];

export function NextGeneration() {
  return (
    <section className="p_top_6 p_bottom_6" style={{ backgroundColor: "#1a2e1a" }} id="nextgen">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Title */}
        <h2
          className="text-white p_bottom_4 text-center lg:text-left"
          style={{
            fontSize: "var(--section-title)",
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            fontFamily: "var(--font-section-title)",
          }}
        >NEXT<br />GENERATION</h2>

        {/* Content: subtitle left + grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-x-[2rem] gap-y-[2rem]">
          {/* Left: subtitle */}
          <div className="text-center lg:text-left">
            <p
              className="text-white"
              style={{
                fontSize: "var(--section-sub)",
                fontWeight: 500,
                lineHeight: 1.7,
                letterSpacing: "-0.01em",
              }}
            >
              큰나무교회의 미래,
              <br />
              다음세대입니다.
            </p>
          </div>

          {/* Right: 3-col department grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[2rem] gap-y-0">
            {departments.map((dept, i) => (
              <div
                key={i}
                role="button"
                tabIndex={0}
                style={{
                  display: "block",
                  padding: i < 3 ? "0 0 1.4rem 0" : "1.4rem 0",
                  border: "none",
                  boxShadow: "none",
                  cursor: "pointer",
                  outline: "none",
                  transition: "opacity 0.3s ease",
                }}
                className="text-center lg:text-left"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  const desc = e.currentTarget.querySelector<HTMLParagraphElement>("[data-desc]");
                  if (desc) desc.style.color = "#bbb";
                  const arrow = e.currentTarget.querySelector<SVGElement>("[data-arrow]");
                  if (arrow) { arrow.style.opacity = "1"; arrow.style.transform = "translateX(4px)"; }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                  const desc = e.currentTarget.querySelector<HTMLParagraphElement>("[data-desc]");
                  if (desc) desc.style.color = "#9ca3af";
                  const arrow = e.currentTarget.querySelector<SVGElement>("[data-arrow]");
                  if (arrow) { arrow.style.opacity = "0"; arrow.style.transform = "translateX(0)"; }
                }}
              >
                {/* Name + optional arrow */}
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }} className="justify-center lg:justify-start">
                  <h3
                    style={{
                      color: "#ffffff",
                      fontSize: "var(--h3)",
                      fontWeight: 700,
                      letterSpacing: "0.01em",
                    }}
                  >
                    {dept.name}
                  </h3>
                  <ArrowRight
                    data-arrow
                    style={{ width: "1rem", height: "1rem", color: "#ffffff", opacity: 0, transition: "opacity 0.35s ease, transform 0.35s ease", transform: "translateX(0)" }}
                    strokeWidth={2}
                  />
                </div>
                {/* Age + Description */}
                <p
                  data-desc
                  style={{
                    color: "#9ca3af",
                    fontSize: "var(--p3)",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    transition: "color 0.2s",
                  }}
                >
                  <span style={{ color: "#b0b8c1" }}>{dept.age}</span>{" "}
                  {dept.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}