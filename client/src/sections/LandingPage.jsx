import { motion } from 'framer-motion';
import { useState } from 'react';

function LandingPageComponent()
{
  const [IsDarkMode, SetIsDarkMode] = useState(true);

  const HeroTitle = "MIKAL A. BURROWS";
  const HeroSubtitle = "Full Stack Developer";
  const AboutContent = "Born in the rolling hills of Ocala, I grew up under the endless skies of the Gulf Coast, where the rhythm of the waves echoed my relentless curiosity. What started as a simple dissatisfaction with the imperfect—systems that wasted time, processes that lacked fairness—evolved into a profound drive to rewrite the rules. As I matured, that spark ignited into an entrepreneurial blaze, fueled by books like *Think and Grow Rich*, which whispered secrets of mindset and mastery, teaching me that true success blooms from vision, persistence, and the courage to challenge the status quo. Through the lens of time, I've transformed obstacles into opportunities, my perfectionist's gaze spotting hidden flaws and forging elegant solutions with a blend of honesty, justice, and mercy. Kind and loyal to my core, I mentor others not for acclaim, but because sharing knowledge builds empires. Disdainful of deceit and inefficiency, I craft my path with integrity, turning the unknown into the extraordinary. In me, you see not just a developer, but a force—ready to partner, innovate, and elevate any venture to its pinnacle.";
  const CtaText = "View My Work";

  const ToggleMode = () => 
  {
    SetIsDarkMode(!IsDarkMode);
  };

  const sidebarVariants = 
  {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const contentVariants = 
  {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.2 } }
  };

  const textVariants = 
  {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
  };

  const ctaVariants = 
  {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut", delay: 0.4 } }
  };

  return (
    <motion.div
      className={`container ${IsDarkMode ? 'dark-mode' : 'light-mode'}`}
    >
      <header className="header">
        <nav className="nav">
          <a href="#about" className="nav-link">About</a>
          <a href="#portfolio" className="nav-link">Portfolio</a>
          <a href="#contact" className="nav-link">Contact</a>
          <a href="#resume" className="nav-link">Resume</a>
        </nav>
      </header>
      <div className="layout-wrapper">
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="visible"
          className="sidebar"
        >
          <h1 className="sidebar-title">{HeroTitle}</h1>
          <h2 className="sidebar-subtitle">{HeroSubtitle}</h2>
          <div className="sidebar-links">
            <a href="tel:+17274158487" className="sidebar-link">(727) 415-8487</a>
            <a href="mailto:burrows.mikal@gmail.com" className="sidebar-link">burrows.mikal@gmail.com</a>
            <a href="https://github.com" className="sidebar-link">GitHub</a>
            <a href="https://linkedin.com" className="sidebar-link">LinkedIn</a>
          </div>
          <motion.button
            onClick={ToggleMode}
            className="mode-toggle"
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {IsDarkMode ? '🌞' : '🌙'}
          </motion.button>
        </motion.aside>
        <div className="content-wrapper">
          <motion.section
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="content-section"
            id="about"
          >
            <div className="content-block">
              <motion.p
                variants={textVariants}
                className="content-text"
              >
                {AboutContent}
              </motion.p>
              <motion.a
                variants={ctaVariants}
                href="#portfolio"
                className="cta-button"
              >
                {CtaText}
              </motion.a>
            </div>
          </motion.section>
          <footer className="footer">
            <p className="footer-text">© 2025 Mikal A. Burrows. Built with Precision.</p>
          </footer>
        </div>
      </div>
    </motion.div>
  );
}

export default LandingPageComponent;