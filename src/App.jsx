import { useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import { Header } from "./components/Header.jsx";
import ApplicationOverlay from "./components/ApplicationOverlay.jsx";
// import FloatingCta from "./components/FloatingCta.jsx";

import {
  // StatementSection,
  UrgencySection,
  ProcessSection,
  FaqSection,
  AudienceSection,
  WorkSection,
  // FounderSection,
  // BenefitsSection,
  // TestimonialsSection,
  // ObjectionsSection,
  FinalCta,
  Footer,
} from "./components/LandingSections.jsx";

import ThankYou from "./pages/ThankYou.jsx";
import LeadsDashboard from "./pages/LeadsDashboard.jsx";

import "./socialdaa.css";

function MetaPixelRouteViews() {
  const location = useLocation();
  const previousPage = useRef(`${location.pathname}${location.search}`);

  useEffect(() => {
    const currentPage = `${location.pathname}${location.search}`;

    if (currentPage !== previousPage.current) {
      previousPage.current = currentPage;

      if (typeof window.fbq === "function") {
        window.fbq("track", "PageView");
      }
    }
  }, [location.pathname, location.search]);

  return null;
}

function Home() {
  const [applicationOpen, setApplicationOpen] = useState(false);

  // const [floatingVisible, setFloatingVisible] = useState(false);
  // useEffect(() => {
  //   setFloatingVisible(true);
  // }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setApplicationOpen(false);
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const openApplication = () => setApplicationOpen(true);

  return (
    <div id="top" className="landing-page">
      <Header onApply={openApplication} />
      <WorkSection onApply={openApplication} />
      <AudienceSection />
      {/* <StatementSection /> */}
      <UrgencySection />
      <ProcessSection />
      <FaqSection />

      {/* <BenefitsSection /> */}
      {/* <TestimonialsSection /> */}
      {/* <ObjectionsSection /> */}

      {/* 
      <section className="center-section closing-statement">
        <div className="wrap">
          <p className="scrub closing-copy">
            No more excuses. From first idea to final edit, we take care of
            everything. All you need to do is start.
          </p>
          <button className="btn" onClick={openApplication}>
            Apply Now
          </button>
        </div>
      </section>
      */}

      <FinalCta onApply={openApplication} />
      <Footer />

      {/* <FloatingCta
        visible={floatingVisible && !applicationOpen}
        onApply={openApplication}
      /> */}

      <ApplicationOverlay
        open={applicationOpen}
        onClose={() => setApplicationOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <>
      <MetaPixelRouteViews />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/dashboard" element={<LeadsDashboard />} />
      </Routes>
    </>
  );
}

export default App;
