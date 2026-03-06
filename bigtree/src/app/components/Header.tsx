import { useState, useRef, useEffect } from "react";
import { Menu, X, Lock } from "lucide-react";
import logoImg from "figma:asset/8b7e1da79d9fd855e07c562f69e0a58f828ed1a0.png";

/* ================================================================== */
/*  Data – single source of truth for all menus (desktop + overlay)   */
/* ================================================================== */
interface SubItem {
  label: string;
  href: string;
}
interface SubGroup {
  heading: string;
  href?: string;
  items: SubItem[];
}
interface NavItem {
  label: string;
  href: string;
  children?: (SubItem | SubGroup)[];
}

function isGroup(c: SubItem | SubGroup): c is SubGroup {
  return "items" in c;
}

const navItems: NavItem[] = [
  {
    label: "소개",
    href: "#about",
    children: [
      {
        heading: "비전",
        href: "#about-vision",
        items: [
          { label: "걸어온 길", href: "#about-history" },
          { label: "우리의 모습", href: "#about-us" },
          { label: "플랜2026", href: "#about-plan" },
        ],
      },
      { label: "예배 안내", href: "#about-worship" },
      { label: "오시는길", href: "#about-location" },
      { label: "섬기는 사람들", href: "#about-people" },
    ],
  },
  {
    label: "예배",
    href: "#worship",
    children: [
      {
        heading: "말씀",
        href: "#worship-sermon",
        items: [
          { label: "담임목사설교", href: "#worship-pastor" },
          { label: "주일 예배", href: "#worship-sunday" },
          { label: "합일예배", href: "#worship-united" },
          { label: "특별 예배", href: "#worship-special" },
        ],
      },
      {
        heading: "찬양",
        href: "#worship-praise",
        items: [
          { label: "선재", href: "#worship-sunjae" },
          { label: "푸른나무찬양대", href: "#worship-pureunnamu" },
          { label: "큰나무찬양대", href: "#worship-keunnamu" },
          { label: "사론여성찬양대", href: "#worship-saron" },
          { label: "로뎀남성찬양대", href: "#worship-rodem" },
        ],
      },
      {
        heading: "기타",
        items: [
          { label: "가정예배", href: "#worship-family" },
        ],
      },
    ],
  },
  {
    label: "다음세대",
    href: "#nextgen",
    children: [
      { label: "아기새교회", href: "#nextgen-baby" },
      { label: "123어린이교회", href: "#nextgen-123" },
      { label: "456어린이교회", href: "#nextgen-456" },
      { label: "중고등푸른교회", href: "#nextgen-youth" },
      { label: "청년교회", href: "#nextgen-young" },
      { label: "틈새포플러스학교", href: "#nextgen-school" },
    ],
  },
  {
    label: "양육",
    href: "#nurture",
    children: [
      { label: "BTBS", href: "#nurture-btbs" },
      { label: "제자훈련", href: "#nurture-disciple" },
      { label: "새가족등록", href: "#nurture-newcomer" },
    ],
  },
  {
    label: "사역",
    href: "#ministry",
    children: [
      {
        heading: "나눔",
        href: "#ministry-sharing",
        items: [
          { label: "편한나눔", href: "#ministry-easy-sharing" },
          { label: "블리펙다섯", href: "#ministry-blifec" },
        ],
      },
      {
        heading: "선교",
        href: "#ministry-mission",
        items: [
          { label: "국내", href: "#ministry-domestic" },
          { label: "해외", href: "#ministry-overseas" },
        ],
      },
    ],
  },
  {
    label: "문화",
    href: "#culture",
    children: [
      { label: "팀II", href: "#culture-team2" },
      { label: "책 읽는 크리스천", href: "#culture-book" },
      { label: "함께 보는 영화", href: "#culture-movie" },
    ],
  },
  {
    label: "소식",
    href: "#news",
    children: [
      { label: "공지사항", href: "#news-notice" },
      { label: "갤러리", href: "#news-gallery" },
      { label: "영상게시판", href: "#news-video" },
      { label: "주보", href: "#news-bulletin" },
    ],
  },
];

/* ================================================================== */
/*  Helper: flatten for desktop dropdown                              */
/* ================================================================== */
function flattenChildren(
  children: (SubItem | SubGroup)[]
): { label: string; href: string; isSub?: boolean }[] {
  const result: { label: string; href: string; isSub?: boolean }[] = [];
  for (const c of children) {
    if (isGroup(c)) {
      if (c.href) result.push({ label: c.heading, href: c.href, isSub: true });
      for (const item of c.items) result.push({ label: item.label, href: item.href });
    } else {
      result.push({ label: c.label, href: c.href });
    }
  }
  return result;
}

/* ================================================================== */
/*  Shared overlay sub-components                                     */
/*  – 렌더 로직을 한 곳에 모아 PC/모바일 텍스트 수정이 1회로 해결됨   */
/* ================================================================== */

/** 서브카테고리 제목 (녹색 볼드) */
function OverlaySubHeading({
  heading,
  href,
  onClose,
}: {
  heading: string;
  href?: string;
  onClose: () => void;
}) {
  return (
    <a
      href={href || "#"}
      onClick={onClose}
      style={{
        display: "block",
        fontSize: "var(--menu-sub-heading)",
        fontWeight: 700,
        color: "#5a7a5a",
        paddingBottom: "0.3rem",
        marginBottom: "0.25rem",
        borderBottom: "1px solid #e8e8e4",
        transition: "color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#3d5c3d";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#5a7a5a";
      }}
    >
      {heading}
    </a>
  );
}

/** 일반 하위 항목 (회색) */
function OverlayLinkItem({
  label,
  href,
  indent,
  onClose,
}: {
  label: string;
  href: string;
  indent?: boolean;
  onClose: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClose}
      style={{
        display: "block",
        fontSize: "var(--menu-item)",
        fontWeight: 400,
        color: "#888888",
        padding: indent ? "0.22rem 0 0.22rem 0.4rem" : "0.28rem 0",
        transition: "color 0.15s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#5a7a5a";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "#888888";
      }}
    >
      {label}
    </a>
  );
}

/** 하나의 대메뉴 컬럼 (제목 + 하위 전체) */
function OverlayColumn({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  return (
    <div style={{ textAlign: "left" }}>
      {/* ── 대메뉴 제목 ── */}
      <a
        href={item.href}
        onClick={onClose}
        style={{
          display: "block",
          fontSize: "var(--menu-title)",
          fontWeight: 700,
          color: "#333333",
          letterSpacing: "-0.01em",
          paddingBottom: "0.6rem",
          marginBottom: "0.5rem",
          borderBottom: "2px solid #333333",
          transition: "color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#5a7a5a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "#333333";
        }}
      >
        {item.label}
      </a>

      {/* ── 하위 목록 ── */}
      {item.children && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {item.children.map((child, cIdx) => {
            if (isGroup(child)) {
              return (
                <div
                  key={child.heading}
                  style={{ marginTop: cIdx > 0 ? "0.7rem" : "0" }}
                >
                  <OverlaySubHeading
                    heading={child.heading}
                    href={child.href}
                    onClose={onClose}
                  />
                  {child.items.map((sub) => (
                    <OverlayLinkItem
                      key={sub.href}
                      label={sub.label}
                      href={sub.href}
                      indent
                      onClose={onClose}
                    />
                  ))}
                </div>
              );
            }
            return (
              <OverlayLinkItem
                key={child.href}
                label={child.label}
                href={child.href}
                onClose={onClose}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Header                                                            */
/* ================================================================== */
export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeOverlay = () => setMobileOpen(false);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex items-center justify-between h-[4.5rem]">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src={logoImg}
            alt="큰나무교회 로고"
            style={{ height: "2rem", width: "auto" }}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-14">
          {navItems.map((item) => (
            <div
              key={item.href}
              className="relative"
              onMouseEnter={() => handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              <a
                href={item.href}
                className="text-white hover:text-white transition-colors flex items-center gap-1"
                style={{
                  fontSize: "var(--nav-label)",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  paddingTop: "1.2rem",
                  paddingBottom: "1.2rem",
                }}
              >
                {item.label}
              </a>

              {/* Dropdown */}
              {item.children && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    minWidth: "11rem",
                    paddingTop: "0.4rem",
                    opacity: activeDropdown === item.label ? 1 : 0,
                    pointerEvents:
                      activeDropdown === item.label ? "auto" : "none",
                    transition: "opacity 0.2s ease, transform 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      background: "rgba(255,255,255,0.97)",
                      backdropFilter: "blur(12px)",
                      WebkitBackdropFilter: "blur(12px)",
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                      padding: "0.6rem 0",
                    }}
                  >
                    {flattenChildren(item.children).map((child, idx) => (
                      <a
                        key={child.href + idx}
                        href={child.href}
                        style={{
                          display: "block",
                          padding: child.isSub
                            ? "0.7rem 1.4rem 0.3rem"
                            : "0.4rem 1.4rem",
                          fontSize: "var(--p3)",
                          fontWeight: child.isSub ? 700 : 400,
                          color: child.isSub ? "#5a7a5a" : "#444444",
                          whiteSpace: "nowrap",
                          transition:
                            "background 0.15s ease, color 0.15s ease",
                          borderTop:
                            child.isSub && idx > 0
                              ? "1px solid #f0f0ec"
                              : "none",
                          marginTop: child.isSub && idx > 0 ? "0.2rem" : "0",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#f5f5f0";
                          if (!child.isSub)
                            e.currentTarget.style.color = "#5a7a5a";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          if (!child.isSub)
                            e.currentTarget.style.color = "#444444";
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          {/* Login icon */}
          <button className="relative p-3 text-white group">
            <Lock className="w-5 h-5" />
            <span
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-3 py-1 bg-white text-gray-700 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{ fontSize: "var(--caption)", fontWeight: 500 }}
            >
              로그인
            </span>
          </button>

          {/* Hamburger */}
          <button
            className={`p-3 text-white ${mobileOpen ? "relative z-[60]" : ""}`}
            style={{ color: mobileOpen ? "#333333" : undefined }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="w-7 h-7" />
            ) : (
              <Menu className="w-7 h-7" />
            )}
          </button>
        </div>
      </div>

      {/* ============================================================== */}
      {/*  Fullscreen overlay menu                                        */}
      {/* ============================================================== */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "#ffffff",
            zIndex: 55,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            animation: "overlayFadeIn 0.35s ease forwards",
          }}
        >
          <div
            className="flex justify-center px-5 pt-[5rem] pb-[3rem] sm:px-8 md:px-10 lg:items-center lg:min-h-screen lg:pt-[5rem] lg:pb-[3rem]"
          >
            <div
              className="w-full grid grid-cols-2 gap-x-5 gap-y-7 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-8 md:grid-cols-4 md:gap-x-7 md:gap-y-9 lg:grid-cols-7 lg:gap-x-[2.5rem] lg:gap-y-[2rem]"
              style={{ maxWidth: "1200px" }}
            >
              {navItems.map((item) => (
                <OverlayColumn
                  key={item.href}
                  item={item}
                  onClose={closeOverlay}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}