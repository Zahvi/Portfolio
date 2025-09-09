import { motion } from 'framer-motion';
import AboutSectionComponent from './AboutSection';
import ExperienceSectionComponent from './ExperienceSection';

function LandingPageComponent()
{
  const HeroTitle = "Mikal A. Burrows";
  const HeroSubtitle = "Full Stack Developer";

  const sidebarVariants = 
  {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div>
      <motion.div
        className="container dark-mode"
      >
        <header className="header">
          <nav className="nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#portfolio" className="nav-link">Portfolio</a>
            <a href="#contact" className="nav-link">Contact</a>
            <a href="#resume" className="nav-link">Resume</a>
          </nav>
        </header>
        <div className="page-body">
          <div className="page-container">
            <motion.aside
              variants={sidebarVariants}
              initial="hidden"
              animate="visible"
              className="sidebar"
            >
              <h1 className="sidebar-title">{HeroTitle}</h1>
              <h2 className="sidebar-subtitle">{HeroSubtitle}</h2>
              <a href="mailto:burrows.mikal@gmail.com" className="sidebar-link">burrows.mikal@gmail.com</a>
              <a href="tel:+17274158487" className="sidebar-link">(727) 415-8487</a>
              <div className="sidebar-social-links">
                <a href="https://github.com" className="sidebar-link">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg" alt="GitHub" className="social-icon" />
                </a>
                <a href="https://linkedin.com" className="sidebar-link">
                  <img src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg" alt="LinkedIn" className="social-icon" />
                </a>
              </div>
            </motion.aside>
            <div className="content-container">
              <AboutSectionComponent />
              <ExperienceSectionComponent />
            </div>
          </div>
        </div>
        <footer className="footer">
          <p className="footer-text">© 2025 Mikal A. Burrows. Built with Precision.</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default LandingPageComponent;