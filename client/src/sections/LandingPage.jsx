import { motion } from "framer-motion";
import { useState } from "react";
import AboutSectionComponent from "./AboutSection/AboutSection";
import ExperienceSectionComponent from "./ExperienceSection/ExperienceSection";
import ProjectSectionComponent from "./ProjectSection/ProjectSection"
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/Footer/Footer";

function LandingPageComponent() {
  const [blurBackground, setBlurBackground] = useState(false);
  const [showFullHeadshot, setShowFullHeadshot] = useState(false);

  return (
    <div>
      <motion.div className={`container dark-mode ${blurBackground ? "blurred" : ""}`}>
        <Header />

        <div className="page-body">
          <div className="page-container">
            <Sidebar
              setBlurBackground={setBlurBackground}
              setShowFullHeadshot={setShowFullHeadshot}
            />

            <div className="content-container">
              <AboutSectionComponent />
              <ExperienceSectionComponent />
              <ProjectSectionComponent /> 
            </div>
          </div>
        </div>

        <Footer />
      </motion.div>

      {showFullHeadshot && (
        <div 
          className="headshot-modal"
          onClick={() => { setShowFullHeadshot(false);
          setBlurBackground(false); }}
        >
          <img 
            src="/headshot.jpg"
            alt="Full Headshot"
            className="headshot-full"
          />
        </div>
      )}
    </div>
  );
}

export default LandingPageComponent;
