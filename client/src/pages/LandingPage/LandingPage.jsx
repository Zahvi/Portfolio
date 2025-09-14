import { motion } from "framer-motion";
import { useState } from "react";
import AboutSection from "../../sections/AboutSection/AboutSection";
import ExperienceSection from "../../sections/ExperienceSection/ExperienceSection";
import ProjectSection from "../../sections/ProjectSection/ProjectSection";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import useInertiaScroll from "../../utils/useInertiaScroll";
import './LandingPage.css';


function LandingPageComponent() {
  const [blurBackground, setBlurBackground] = useState(false);
  const [showFullHeadshot, setShowFullHeadshot] = useState(false);

  // 🔥 Hook to handle inertia scroll & nav link jumps
  useInertiaScroll("scrollable-content");

  return (
    <div>
      <motion.div
        className={`container dark-mode ${blurBackground ? "blurred" : ""}`}
      >
        <Header />

        <div className="page-body">
          <div className="page-container">
            <Sidebar
              setBlurBackground={setBlurBackground}
              setShowFullHeadshot={setShowFullHeadshot}
            />

            <div
              id="scrollable-content"
              className="content-container"
              style={{ overflowY: "auto", flex: 1 }}
            >
              <div id="about">
                <AboutSection />
              </div>
              <div id="experience">
                <ExperienceSection />
              </div>
              <div id="projects">
                <ProjectSection />
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </motion.div>

      {showFullHeadshot && (
        <div
          className="headshot-modal"
          onClick={() => {
            setShowFullHeadshot(false);
            setBlurBackground(false);
          }}
        >
          <img
            src="/headshot.jpg"
            className="headshot-full"
          />
        </div>
      )}
    </div>
  );
}

export default LandingPageComponent;
