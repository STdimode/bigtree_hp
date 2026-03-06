import { ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

import msgImg1 from "figma:asset/46d5fc88ddc14b8877b24449cbd9e706ddc1523a.png";
import msgImg2 from "figma:asset/559d4219322d99d8db5f21dc8976c55871d63eb8.png";
import msgImg3 from "figma:asset/1ff19fe278a623ce6e814e624ff9e3acd51283bf.png";

const messages = [
  {
    image: msgImg1,
    date: "2026.03.08",
    title: "감추어진 비밀, 드러난 은혜",
    scripture: "출애굽기 14:10-14",
    speaker: "이시호 담임목사",
  },
  {
    image: msgImg2,
    date: "2026.03.08",
    title: "감추어진 비밀, 드러난 은혜",
    scripture: "히브리서 11:1-6",
    speaker: "이시호 담임목사",
  },
  {
    image: msgImg3,
    date: "2026.03.08",
    title: "감추어진 비밀, 드러난 은혜",
    scripture: "시편 139:23-24",
    speaker: "이시호 담임목사",
  },
];

export function Messages() {
  return (
    <section className="p_top_5 p_bottom_5 bg-white" id="about">
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-end justify-between flex-wrap gap-y-[0.5rem]">
          <div className="min-w-0">
            {/* Label – P3, Regular, tracked */}
            
            {/* Title – H1, Bold */}
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
            >
              MESSAGES
            </h2>
          </div>
          {/* View all – P3, Regular */}
          <a
            href="#"
            className="flex items-center gap-1.5 text-gray-900 hover:text-[#5a7a5a] transition-colors"
            style={{
              fontSize: "var(--p3)",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            view all
            <ArrowRight className="w-[0.8rem] h-[0.8rem]" strokeWidth={1.5} />
          </a>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#000000", marginTop: "1.25rem", marginBottom: "1.25rem" }} />

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[1.5rem]">
          {messages.map((msg, i) => (
            <div key={i} className={`group block ${i > 0 ? "hidden md:block" : ""}`}>
              {/* Speaker – P4, gray */}
              <p
                style={{
                  fontSize: "var(--p4)",
                  fontWeight: 400,
                  color: "#888888",
                  marginBottom: "0.25rem",
                }}
              >
                {msg.date} | {msg.speaker}
              </p>
              {/* Title – card-title, SemiBold */}
              <p
                className="text-gray-900"
                style={{
                  fontSize: "var(--card-title)",
                  fontWeight: 600,
                  lineHeight: 1.45,
                  letterSpacing: "-0.01em",
                  marginBottom: "0.7rem",
                }}
              >
                {msg.title}
              </p>
              {/* Thumbnail */}
              <div className="aspect-[16/10] overflow-hidden mb-[0.6rem] bg-gray-100">
                <ImageWithFallback
                  src={msg.image}
                  alt={msg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* More link */}
              <a
                href="#"
                className="hover:text-[#5a7a5a] transition-colors"
                style={{
                  fontSize: "var(--p4)",
                  fontWeight: 400,
                  color: "#888888",
                }}
              >
                more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}