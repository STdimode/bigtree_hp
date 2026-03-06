import { Header } from "./components/Header";
import { HeroSlider } from "./components/HeroSlider";
import { QuickLinks } from "./components/QuickLinks";
import { Messages } from "./components/Messages";
import { WorshipSchedule } from "./components/WorshipSchedule";
import { NextGeneration } from "./components/NextGeneration";
import { Gallery } from "./components/Gallery";
import { WelcomeSection } from "./components/WelcomeSection";
import { Footer } from "./components/Footer";
import { FadeUp } from "./components/FadeUp";
import { useFontLoader } from "./components/useFontLoader";

export default function App() {
  useFontLoader();

  return (
    <div className="w-full min-h-screen">
      <Header />
      <main>
        <HeroSlider />
        <FadeUp>
          <QuickLinks />
        </FadeUp>
        <FadeUp>
          <Messages />
        </FadeUp>
        <FadeUp>
          <WorshipSchedule />
        </FadeUp>
        <FadeUp>
          <NextGeneration />
        </FadeUp>
        <FadeUp>
          <Gallery />
        </FadeUp>
        <FadeUp>
          <WelcomeSection />
        </FadeUp>
      </main>
      <FadeUp>
        <Footer />
      </FadeUp>
    </div>
  );
}