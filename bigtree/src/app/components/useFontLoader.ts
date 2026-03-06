import { useEffect, useState } from "react";

const FONT_URL =
  "https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/HSBombaram.woff";

export function useFontLoader() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const existing = Array.from(document.fonts).find(
      (f) => f.family === "HsBombaram20"
    );
    if (existing) {
      setLoaded(true);
      return;
    }

    const font = new FontFace("HsBombaram20", `url('${FONT_URL}')`, {
      weight: "normal",
      style: "normal",
      display: "swap",
    });

    font
      .load()
      .then((loadedFont) => {
        document.fonts.add(loadedFont);
        setLoaded(true);
        console.log("[Font] HsBombaram20 loaded successfully");
      })
      .catch((e) => {
        console.error("[Font] HsBombaram20 load failed:", e);
      });
  }, []);

  return loaded;
}
