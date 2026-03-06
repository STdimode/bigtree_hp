import footerLogoImg from "figma:asset/8f618088d82ee24f099958af0e355558b21b1b39.png";

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#ffffff", borderTop: "1px solid #d0d0d0", paddingTop: "2rem", paddingBottom: "1.5rem" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 1.5rem" }}>
        {/* Top: Logo */}
        <div style={{ marginBottom: "1rem" }}>
          <img src={footerLogoImg} alt="큰나무교회 로고" style={{ height: "2.2rem", width: "auto" }} />
        </div>

        {/* Bottom: Info left + Copyright right */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "1rem" }}>
          {/* Left: Contact & Address */}
          <div>
            <p style={{
              fontSize: "var(--p3)",
              fontWeight: 300,
              color: "#888888",
              lineHeight: 1.8,
              letterSpacing: "0.01em",
            }}>
              <span style={{ fontWeight: 500, color: "#555555" }}>TEL</span>{" "}
              070-8680-5160, 02-2665-1132
              {"    "}
              <span style={{ fontWeight: 500, color: "#555555" }}>FAX</span>{" "}
              02-2663-1097
            </p>
            <p style={{
              fontSize: "var(--p3)",
              fontWeight: 300,
              color: "#888888",
              lineHeight: 1.8,
              letterSpacing: "0.01em",
            }}>
              <span style={{ fontWeight: 500, color: "#555555" }}>MAIL</span>{" "}
              BIGTREE@BIGTREE.OR.KR
              {"    "}
              <span style={{ fontWeight: 500, color: "#555555" }}>ADDRESS</span>{" "}
              서울시 강서구 금낭화로 232 큰나무교회
            </p>
          </div>

          {/* Right: Copyright */}
          <div style={{ textAlign: "right" }}>
            <p style={{
              fontSize: "var(--p3)",
              fontWeight: 300,
              color: "#888888",
              lineHeight: 1.7,
              letterSpacing: "0.01em",
            }}>
              COPYRIGHT © 2026 큰나무교회
              <br />
              ALL RIGHTS RESERVED. DESIGNED BY (주)소네트정보
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}