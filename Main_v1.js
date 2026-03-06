/* ================================================================== */
/*  Navigation Data                                                   */
/* ================================================================== */
const navItems = [
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
    label: "선교·나눔",
    href: "#mission",
  },
  {
    label: "커뮤니티",
    href: "#community",
    children: [
      { label: "공지사항", href: "#community-notice" },
      { label: "교회소식", href: "#community-news" },
      { label: "주보", href: "#community-bulletin" },
      { label: "갤러리", href: "#community-gallery" },
    ],
  },
];

function flattenChildren(children) {
  let flat = [];
  children.forEach(child => {
    if (child.items) {
      if (child.heading) {
        flat.push({ label: child.heading, href: child.href || "#", isSub: false });
      }
      child.items.forEach(sub => {
        flat.push({ label: sub.label, href: sub.href, isSub: true });
      });
    } else {
      flat.push({ label: child.label, href: child.href, isSub: false });
    }
  });
  return flat;
}

function renderDesktopNav() {
  const navContainer = document.getElementById("desktop-nav");
  if (!navContainer) return;

  navItems.forEach(item => {
    const div = document.createElement("div");
    div.style.cssText = "position: relative;";

    const a = document.createElement("a");
    a.href = item.href;
    a.style.cssText = "display: flex; align-items: center; gap: 0.25rem; color: #ffffff; font-size: var(--nav-label); font-weight: 700; letter-spacing: -0.01em; padding-top: 1.2rem; padding-bottom: 1.2rem; transition: color 0.2s;";
    a.textContent = item.label;
    div.appendChild(a);

    if (item.children) {
      const dropdown = document.createElement("div");
      dropdown.style.cssText = "position: absolute; top: 100%; left: 50%; transform: translateX(-50%); min-width: 11rem; padding-top: 0.4rem; opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease;";

      const inner = document.createElement("div");
      inner.style.cssText = "background: rgba(255,255,255,0.97); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06); padding: 0.6rem 0;";

      flattenChildren(item.children).forEach((child, idx) => {
        const ca = document.createElement("a");
        ca.href = child.href;
        ca.style.cssText = `display: block; padding: ${child.isSub ? "0.7rem 1.4rem 0.3rem" : "0.4rem 1.4rem"}; font-size: var(--p3); font-weight: ${child.isSub ? "700" : "400"}; color: ${child.isSub ? "#5a7a5a" : "#444444"}; white-space: nowrap; transition: background 0.15s ease, color 0.15s ease; ${child.isSub && idx > 0 ? "border-top: 0.0625rem solid #f0f0ec;" : ""} margin-top: ${child.isSub && idx > 0 ? "0.2rem" : "0"};`;
        ca.textContent = child.label;

        ca.addEventListener("mouseenter", () => {
          ca.style.background = "#f5f5f0";
          if (!child.isSub) ca.style.color = "#5a7a5a";
        });
        ca.addEventListener("mouseleave", () => {
          ca.style.background = "transparent";
          if (!child.isSub) ca.style.color = "#444444";
        });
        inner.appendChild(ca);
      });

      dropdown.appendChild(inner);
      div.appendChild(dropdown);

      div.addEventListener("mouseenter", () => {
        dropdown.style.opacity = "1";
        dropdown.style.pointerEvents = "auto";
      });
      div.addEventListener("mouseleave", () => {
        dropdown.style.opacity = "0";
        dropdown.style.pointerEvents = "none";
      });
    }

    navContainer.appendChild(div);
  });
}

function renderMobileNav() {
  const overlayGrid = document.getElementById("mobile-nav-grid");
  if (!overlayGrid) return;

  navItems.forEach(item => {
    const col = document.createElement("div");
    col.style.textAlign = "left";

    const title = document.createElement("a");
    title.href = item.href;
    title.style.cssText = "display: block; font-size: var(--menu-title); font-weight: 700; color: #333333; letter-spacing: -0.01em; padding-bottom: 0.6rem; margin-bottom: 0.5rem; border-bottom: 2px solid #333333; transition: color 0.2s ease;";
    title.textContent = item.label;
    title.addEventListener("mouseenter", () => title.style.color = "#5a7a5a");
    title.addEventListener("mouseleave", () => title.style.color = "#333333");
    title.addEventListener("click", closeMobileMenu);
    col.appendChild(title);

    if (item.children) {
      const listContainer = document.createElement("div");
      listContainer.style.display = "flex";
      listContainer.style.flexDirection = "column";

      item.children.forEach((child, cIdx) => {
        if (child.items) {
          const groupDiv = document.createElement("div");
          if (cIdx > 0) groupDiv.style.marginTop = "0.7rem";

          const subHeading = document.createElement("a");
          subHeading.href = child.href || "#";
          subHeading.style.cssText = "display: block; font-size: var(--menu-sub-heading); font-weight: 700; color: #5a7a5a; padding: 0.2rem 0; letter-spacing: -0.01em; transition: color 0.15s ease;";
          subHeading.textContent = child.heading;
          subHeading.addEventListener("mouseenter", () => subHeading.style.color = "#3a4a3a");
          subHeading.addEventListener("mouseleave", () => subHeading.style.color = "#5a7a5a");
          subHeading.addEventListener("click", closeMobileMenu);
          groupDiv.appendChild(subHeading);

          child.items.forEach(sub => {
            const subLink = document.createElement("a");
            subLink.href = sub.href;
            subLink.style.cssText = "display: block; font-size: var(--menu-item); font-weight: 400; color: #888888; padding: 0.22rem 0 0.22rem 0.4rem; transition: color 0.15s ease;";
            subLink.textContent = sub.label;
            subLink.addEventListener("mouseenter", () => subLink.style.color = "#5a7a5a");
            subLink.addEventListener("mouseleave", () => subLink.style.color = "#888888");
            subLink.addEventListener("click", closeMobileMenu);
            groupDiv.appendChild(subLink);
          });

          listContainer.appendChild(groupDiv);
        } else {
          const childLink = document.createElement("a");
          childLink.href = child.href;
          childLink.style.cssText = "display: block; font-size: var(--menu-item); font-weight: 400; color: #888888; padding: 0.28rem 0; transition: color 0.15s ease;";
          childLink.textContent = child.label;
          childLink.addEventListener("mouseenter", () => childLink.style.color = "#5a7a5a");
          childLink.addEventListener("mouseleave", () => childLink.style.color = "#888888");
          childLink.addEventListener("click", closeMobileMenu);
          listContainer.appendChild(childLink);
        }
      });
      col.appendChild(listContainer);
    }
    overlayGrid.appendChild(col);
  });
}

function toggleMobileMenu() {
  const overlay = document.getElementById("mobile-overlay");
  const btn = document.getElementById("mobile-menu-btn");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  if (overlay.style.display === "none" || overlay.style.display === "") {
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    btn.style.color = "#333333";
    btn.style.position = "relative";
    btn.style.zIndex = "60";
    iconMenu.style.display = "none";
    iconClose.style.display = "block";
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  const overlay = document.getElementById("mobile-overlay");
  const btn = document.getElementById("mobile-menu-btn");
  const iconMenu = document.getElementById("icon-menu");
  const iconClose = document.getElementById("icon-close");

  overlay.style.display = "none";
  document.body.style.overflow = "";
  btn.style.color = "";
  btn.style.position = "";
  btn.style.zIndex = "";
  iconMenu.style.display = "block";
  iconClose.style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  renderDesktopNav();
  renderMobileNav();
  document.getElementById("mobile-menu-btn")?.addEventListener("click", toggleMobileMenu);
});

/* ================================================================== */
/*  Hero Slider                                                       */
/* ================================================================== */
const heroSlides = [
  { image: "/UserData/bigtreech/Layouts/bigtreech_Layout/images/a2580ae9d24c601f6c1e07fd729847adead18c8a.png" },
  { image: "/UserData/bigtreech/Layouts/bigtreech_Layout/images/54a0b0179e6efb1865be9f90287c7a3b4c813b97.png" },
  { image: "/UserData/bigtreech/Layouts/bigtreech_Layout/images/84ab185d9df6befe402cb5f8f2778f6ff36b17b2.png" },
];

let heroCurrentIndex = 0;
let heroIsTransitioning = false;
let heroTimer;

function initHeroSlider() {
  const container = document.getElementById("slider-container");
  const dotsContainer = document.getElementById("slider-dots");
  if (!container || !dotsContainer) return;

  heroSlides.forEach((slide, i) => {
    // Slides
    const slideDiv = document.createElement("div");
    slideDiv.className = "hero-slide";
    slideDiv.style.cssText = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; transition: opacity 0.7s ease-in-out; opacity: ${i === 0 ? "1" : "0"}; z-index: ${i === 0 ? "1" : "0"};`;

    const bgDiv = document.createElement("div");
    bgDiv.style.cssText = `position: absolute; top: 0; left: 0; right: 0; bottom: 0; background-size: cover; background-position: center; background-image: url(${slide.image});`;

    slideDiv.appendChild(bgDiv);
    container.appendChild(slideDiv);

    // Dots
    const dotBtn = document.createElement("button");
    dotBtn.className = "hero-dot";
    dotBtn.style.cssText = `height: 0.1875rem; transition: all 0.5s; ${i === 0 ? "background-color: #ffffff; width: 1.75rem;" : "background-color: rgba(255,255,255,0.25); width: 0.625rem;"}`;
    dotBtn.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dotBtn);
  });

  document.getElementById("hero-prev-btn")?.addEventListener("click", heroPrev);
  document.getElementById("hero-next-btn")?.addEventListener("click", heroNext);

  startHeroTimer();
}

function updateHeroDOM() {
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".hero-dot");

  slides.forEach((slide, i) => {
    slide.style.opacity = i === heroCurrentIndex ? "1" : "0";
    slide.style.zIndex = i === heroCurrentIndex ? "1" : "0";
  });

  dots.forEach((dot, i) => {
    dot.style.cssText = `height: 0.1875rem; transition: all 0.5s; ${i === heroCurrentIndex ? "background-color: #ffffff; width: 1.75rem;" : "background-color: rgba(255,255,255,0.25); width: 0.625rem;"}`;
  });
}

function goToSlide(idx) {
  if (heroIsTransitioning) return;
  heroIsTransitioning = true;
  heroCurrentIndex = idx;

  updateHeroDOM();
  resetHeroTimer();

  setTimeout(() => {
    heroIsTransitioning = false;
  }, 700);
}

function heroNext() {
  goToSlide((heroCurrentIndex + 1) % heroSlides.length);
}

function heroPrev() {
  goToSlide((heroCurrentIndex - 1 + heroSlides.length) % heroSlides.length);
}

function startHeroTimer() {
  heroTimer = setInterval(heroNext, 6000);
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  startHeroTimer();
}

document.addEventListener("DOMContentLoaded", initHeroSlider);

/* ================================================================== */
/*  Worship Schedule                                                  */
/* ================================================================== */

const allViews = [
  {
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwfGVufDF8fHx8MTc3MjcxNTQ5OHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    category: "주일예배",
    sub: "큰나무교회 본당",
    items: [
      { name: "1부 예배", detail: "주일", time: "오전 08:00" },
      { name: "2부 예배", detail: "주일", time: "오전 09:30" },
      { name: "3부 예배", detail: "주일", time: "오전 11:30" },
      { name: "4부 청년예 예배", detail: "주일", time: "오후 14:30" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwfGVufDF8fHx8MTc3MjcxNTQ5OHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
    category: "다음세대예배",
    sub: "",
    items: [
      { name: "아기새교회 (영유아)", detail: "주일", time: "오전 09:30, 11:30", location: "자람터2" },
      { name: "123어린이교회", detail: "주일", time: "오전 09:30, 11:30", location: "자람터1" },
      { name: "456어린이교회", detail: "주일", time: "오전 09:30, 11:30", location: "비전홀" },
      { name: "중고등푸른교회", detail: "주일", time: "오전 09:30", location: "자람터1" },
      { name: "청년교회", detail: "주일", time: "오후 14:30", location: "큰나무교회 본당" },
    ],
  },
  {
    image: "https://images.unsplash.com/photo-1544427901-7da49550f9e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JzaGlwJTIwYmFuZCUyMHN0YWdlJTIwZGltJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcyNzE1NDk4fDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral",
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

const pcViews = [
  { groups: [allViews[0], allViews[1]], image: allViews[0].image },
  { groups: [allViews[2]], image: allViews[2].image },
];
const mobileViews = allViews;

let pcView = 0;
let pcTransitioning = false;
let mobView = 0;
let mobTransitioning = false;

function buildScheduleBlock(view, last) {
  let html = `<div style="margin-bottom: ${last ? '0' : '1.8rem'}">
    <div style="margin-bottom: 0.7rem;">
      <span style="font-size: var(--p1); font-weight: 700; color: #1a1a1a; letter-spacing: -0.01em;">${view.category}</span>
      ${view.sub ? `<span style="font-size: var(--p3); font-weight: 400; color: #888; margin-left: 0.8rem;">${view.sub}</span>` : ''}
    </div>
    <div style="display: grid; grid-template-columns: auto auto 1fr; row-gap: 0.45rem; column-gap: 1.2rem; align-items: baseline;">
  `;

  view.items.forEach(item => {
    let loc = item.location ? item.location : (view.sub || "");
    html += `
      <div style="display: contents;">
        <span style="font-size: var(--p2); font-weight: 600; color: #555555;">${loc}</span>
        <span style="font-size: var(--p2); font-weight: 400; color: #222222;">${item.name}</span>
        <span style="font-size: var(--p3); font-weight: 400; color: #888888; letter-spacing: 0.01em;">${item.detail} ${item.time}</span>
      </div>
    `;
  });

  html += `</div></div>`;
  return html;
}

function updatePcSchedule(index) {
  const content = document.getElementById("ws-pc-content");
  const img = document.getElementById("ws-pc-image");
  const indicator = document.getElementById("ws-pc-indicator");
  if (!content || !img) return;

  const currentPc = pcViews[index];

  let html = "";
  currentPc.groups.forEach((g, i) => {
    html += buildScheduleBlock(g, i === currentPc.groups.length - 1);
  });

  content.innerHTML = html;
  img.src = currentPc.image;
  indicator.textContent = `${index + 1} / ${pcViews.length}`;
}

function updateMobSchedule(index) {
  const content = document.getElementById("ws-mob-content");
  const img = document.getElementById("ws-mob-image");
  const indicator = document.getElementById("ws-mob-indicator");
  if (!content || !img) return;

  const currentMob = mobileViews[index];

  content.innerHTML = buildScheduleBlock(currentMob, true);
  img.src = currentMob.image;
  indicator.textContent = `${index + 1} / ${mobileViews.length}`;
}

function changePc(n) {
  if (pcTransitioning) return;
  pcTransitioning = true;

  const content = document.getElementById("ws-pc-content");
  if (content) {
    content.style.opacity = "0";
    content.style.transform = "translateY(0.75rem)";
  }

  setTimeout(() => {
    pcView = n;
    updatePcSchedule(pcView);
    if (content) {
      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
        setTimeout(() => pcTransitioning = false, 300);
      }, 50);
    }
  }, 300);
}

function changeMob(n) {
  if (mobTransitioning) return;
  mobTransitioning = true;

  const content = document.getElementById("ws-mob-content");
  if (content) {
    content.style.opacity = "0";
    content.style.transform = "translateY(0.75rem)";
  }

  setTimeout(() => {
    mobView = n;
    updateMobSchedule(mobView);
    if (content) {
      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
        setTimeout(() => mobTransitioning = false, 300);
      }, 50);
    }
  }, 300);
}

function wsPcNext() { changePc((pcView + 1) % pcViews.length); }
function wsPcPrev() { changePc((pcView - 1 + pcViews.length) % pcViews.length); }
function wsMobNext() { changeMob((mobView + 1) % mobileViews.length); }
function wsMobPrev() { changeMob((mobView - 1 + mobileViews.length) % mobileViews.length); }

document.addEventListener("DOMContentLoaded", () => {
  updatePcSchedule(0);
  updateMobSchedule(0);
  document.getElementById("ws-pc-next")?.addEventListener("click", wsPcNext);
  document.getElementById("ws-pc-prev")?.addEventListener("click", wsPcPrev);
  document.getElementById("ws-mob-next")?.addEventListener("click", wsMobNext);
  document.getElementById("ws-mob-prev")?.addEventListener("click", wsMobPrev);
});

/* ================================================================== */
/*  Next Generation                                                   */
/* ================================================================== */
const departments = [
  { name: "아기새교회", age: "", desc: "하나님의 사랑 안에서 아이들이 신앙의 첫 날갯짓을 배우는 공동체입니다.", hasArrow: true },
  { name: "123어린이교회", age: "", desc: "하나님의 사랑 안에서 믿음의 뿌리를 깊이 내리며 자라가는 어린이 공동체입니다.", hasArrow: false },
  { name: "456어린이교회", age: "", desc: "말씀과 예배 속에서 예수님과의 관계를 배우며 믿음을 삶으로 세워가는 공동체입니다.", hasArrow: false },
  { name: "중고등푸른교회", age: "", desc: "청소년들이 성경적 정체성을 세우고 하나님의 비전을 발견하도록 돕는 공동체입니다.", hasArrow: false },
  { name: "청년교회", age: "", desc: "하나님 안에서 서로를 세우며 함께 성장하는 청년 공동체입니다.", hasArrow: false },
  { name: "틈새포플러스학교", age: "", desc: "성경적 가치관으로 세상을 이해하고 살아가도록 돕는 교육 공동체입니다.", hasArrow: false },
];

function initNextGen() {
  const grid = document.getElementById("nextgen-grid");
  if (!grid) return;

  departments.forEach((dept, i) => {
    const div = document.createElement("div");
    div.role = "button";
    div.tabIndex = 0;
    div.className = "cms-nextgen-item";
    div.style.cssText = `display: block; padding: ${i < 3 ? "0 0 1.4rem 0" : "1.4rem 0"}; border: none; box-shadow: none; cursor: pointer; outline: none; transition: opacity 0.3s ease; opacity: 0.7; text-align: left;`;

    const titleWrap = document.createElement("div");
    titleWrap.className = "cms-nextgen-title-wrap";
    titleWrap.style.cssText = "display: flex; align-items: center; gap: 0.6rem; margin-bottom: 0.6rem; justify-content: flex-start;";

    const h3 = document.createElement("h3");
    h3.style.cssText = "color: #ffffff; font-size: var(--h3); font-weight: 700; letter-spacing: 0.01em;";
    h3.textContent = dept.name;

    const svgWrap = document.createElement("div");
    svgWrap.innerHTML = `<svg data-arrow style="width: 1rem; height: 1rem; color: #ffffff; opacity: 0; transition: opacity 0.35s ease, transform 0.35s ease; transform: translateX(0);" stroke-width="2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
    const arrow = svgWrap.firstElementChild;

    const p = document.createElement("p");
    p.dataset.desc = "true";
    p.style.cssText = "color: #9ca3af; font-size: var(--p3); font-weight: 300; line-height: 1.75; transition: color 0.2s;";
    p.innerHTML = `<span style="color: #b0b8c1;">${dept.age}</span> ${dept.desc}`;

    titleWrap.appendChild(h3);
    titleWrap.appendChild(arrow);
    div.appendChild(titleWrap);
    div.appendChild(p);

    div.addEventListener("mouseenter", () => {
      div.style.opacity = "1";
      p.style.color = "#bbb";
      arrow.style.opacity = "1";
      arrow.style.transform = "translateX(0.25rem)";
    });

    div.addEventListener("mouseleave", () => {
      div.style.opacity = "0.7";
      p.style.color = "#9ca3af";
      arrow.style.opacity = "0";
      arrow.style.transform = "translateX(0)";
    });

    grid.appendChild(div);
  });
}

document.addEventListener("DOMContentLoaded", initNextGen);

/* ================================================================== */
/*  Gallery                                                           */
/* ================================================================== */
const galleryItems = [
  { image: "https://images.unsplash.com/photo-1517404215738-15263e9f9178?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBjb21tdW5pdHl8ZW58MXx8fHwxNzcyNzgwNDMwfDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral", title: "갤러리제목입니다", date: "2026.02.15" },
  { image: "https://images.unsplash.com/photo-1621360841013-c76831f1fc83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaHVyY2glMjBnYXRoZXJpbmd8ZW58MXx8fHwxNzcyNzgwNDMwfDA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral", title: "갤러리제목입니다", date: "2026.01.20" },
  { image: "https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncm91cCUyMG9mJTIwcGVvcGxlJTIwc21pbGluZ3xlbnwxfHx8fDE3NzI3ODA0MzB8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral", title: "갤러리제목입니다", date: "2026.01.12" },
  { image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWdodCUyMHNreSUyMHN0YXJzJTIwZm9yZXN0fGVufDF8fHx8MTc3Mjc4MDQzMHww&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral", title: "갤러리제목입니다", date: "2026.01.04" },
  { image: "https://images.unsplash.com/photo-1611862662189-2021254caebf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkZW4lMjBzdW5yaXNlJTIwY2xvdWRzJTIwaG9yaXpvbnxlbnwxfHx8fDE3NzI3ODA0MzB8MA&ixlib=rb-4.1.0&q=100&w=2400&utm_source=figma&utm_medium=referral", title: "갤러리제목입니다", date: "2025.12.28" },
];

const mobilePerPage = 2;
const mobileTotalPages = Math.ceil(galleryItems.length / mobilePerPage);
let mobilePage = 0;
let mobileTransitioning = false;

function initGallery() {
  const scrollContainer = document.getElementById("gallery-scroll");
  const pcPrev = document.getElementById("gallery-pc-prev");
  const pcNext = document.getElementById("gallery-pc-next");
  const mobPrev = document.getElementById("gallery-mob-prev");
  const mobNext = document.getElementById("gallery-mob-next");

  if (!scrollContainer) return;

  // Render Desktop Scroll Items
  galleryItems.forEach((item, i) => {
    const a = document.createElement("a");
    a.href = "#";
    a.className = "cms-gallery-item-wrapper";
    a.style.cssText = "flex-shrink: 0; width: calc(25% - 0.75rem); scroll-snap-align: start; text-decoration: none;";

    a.innerHTML = `
      <div class="cms-gallery-img-container" style="position: relative; overflow: hidden; background-color: #f3f4f6; aspect-ratio: 4/3;">
        <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease;" />
        <div class="cms-gallery-caption" style="position: absolute; bottom: 0; left: 0; right: 0; display: flex; flex-direction: column; justify-content: center; padding: 0.6rem 1rem; opacity: 0; transition: opacity 0.3s ease; height: 25%; background: rgba(0,0,0,0.45); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px);">
          <p style="color: #ffffff; font-size: var(--p3); font-weight: 600; line-height: 1.3;">${item.title}</p>
          <p style="color: rgba(255,255,255,0.7); font-size: var(--p4); font-weight: 300; margin-top: 0.15rem;">${item.date}</p>
        </div>
      </div>
    `;

    let imgEl = a.querySelector("img");
    let captionEl = a.querySelector(".cms-gallery-caption");
    a.addEventListener("mouseenter", () => {
      imgEl.style.transform = "scale(1.05)";
      captionEl.style.opacity = "1";
    });
    a.addEventListener("mouseleave", () => {
      imgEl.style.transform = "scale(1)";
      captionEl.style.opacity = "0";
    });

    scrollContainer.appendChild(a);
  });

  // Desktop scroll logic
  function checkScroll() {
    if (!scrollContainer || !pcPrev || !pcNext) return;
    const canScrollLeft = scrollContainer.scrollLeft > 10;
    const canScrollRight = scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth - 10;

    pcPrev.disabled = !canScrollLeft;
    pcNext.disabled = !canScrollRight;
    pcPrev.style.opacity = canScrollLeft ? "1" : "0.25";
    pcNext.style.opacity = canScrollRight ? "1" : "0.25";
  }

  function scrollPc(dir) {
    if (!scrollContainer) return;
    const amount = scrollContainer.clientWidth * 0.6;
    scrollContainer.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }

  scrollContainer.addEventListener("scroll", checkScroll);
  pcPrev?.addEventListener("click", () => scrollPc("left"));
  pcNext?.addEventListener("click", () => scrollPc("right"));

  // Initial check
  checkScroll();

  // Mobile rendering and logic
  renderMobileGallery(mobilePage);
  updateMobileGalleryControls();

  mobPrev?.addEventListener("click", () => changeMobilePage(mobilePage - 1));
  mobNext?.addEventListener("click", () => changeMobilePage(mobilePage + 1));
}

function renderMobileGallery(pageIndex) {
  const container = document.getElementById("gallery-mob-container");
  if (!container) return;

  const start = pageIndex * mobilePerPage;
  const items = galleryItems.slice(start, start + mobilePerPage);

  let html = "";
  items.forEach((item, i) => {
    html += `
      <a href="#" style="display: block; text-decoration: none;">
        <div style="position: relative; overflow: hidden; background-color: #f3f4f6; aspect-ratio: 4/3;">
          <img src="${item.image}" alt="${item.title}" style="width: 100%; height: 100%; object-fit: cover;" />
        </div>
        <p style="margin-top: 0.3rem; color: #374151; font-size: var(--p4); font-weight: 500;">${item.title}</p>
        <p style="color: #9ca3af; font-size: var(--caption); font-weight: 300;">${item.date}</p>
      </a>
    `;
  });
  container.innerHTML = html;
}

function updateMobileGalleryControls() {
  const mobPrev = document.getElementById("gallery-mob-prev");
  const mobNext = document.getElementById("gallery-mob-next");
  const indicator = document.getElementById("gallery-mob-indicator");

  if (mobPrev) {
    mobPrev.disabled = mobilePage === 0;
    mobPrev.style.opacity = mobilePage === 0 ? "0.25" : "1";
  }
  if (mobNext) {
    mobNext.disabled = mobilePage >= mobileTotalPages - 1;
    mobNext.style.opacity = mobilePage >= mobileTotalPages - 1 ? "0.25" : "1";
  }
  if (indicator) {
    indicator.textContent = `${mobilePage + 1} / ${mobileTotalPages}`;
  }
}

function changeMobilePage(newPage) {
  if (mobileTransitioning || newPage < 0 || newPage >= mobileTotalPages) return;
  mobileTransitioning = true;

  const container = document.getElementById("gallery-mob-container");
  if (container) {
    container.style.opacity = "0";
    container.style.transform = "translateY(0.5rem)";
  }

  setTimeout(() => {
    mobilePage = newPage;
    renderMobileGallery(mobilePage);
    updateMobileGalleryControls();

    if (container) {
      setTimeout(() => {
        container.style.opacity = "1";
        container.style.transform = "translateY(0)";
        setTimeout(() => mobileTransitioning = false, 30);
      }, 50);
    }
  }, 250);
}

document.addEventListener("DOMContentLoaded", initGallery);

/* ================================================================== */
/*  Parallax Setup                                                    */
/* ================================================================== */
function initParallax() {
  const section = document.getElementById("welcome");
  const bg = document.getElementById("welcome-bg");
  if (!section || !bg) return;

  const speed = 0.6;

  function tick() {
    const rect = section.getBoundingClientRect();
    const windowH = window.innerHeight;
    const progress = 1 - (rect.top + rect.height) / (windowH + rect.height);
    const offset = (progress - 0.5) * windowH * speed;
    bg.style.transform = `translate3d(0, ${offset}px, 0)`;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

document.addEventListener("DOMContentLoaded", initParallax);

/* ================================================================== */
/*  FadeUp Setup                                                      */
/* ================================================================== */
function initFadeUp() {
  const elements = document.querySelectorAll(".fade-up");
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", initFadeUp);
