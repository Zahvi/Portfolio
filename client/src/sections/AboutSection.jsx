import { motion } from 'framer-motion';

function AboutSectionComponent()
{
  const AboutContent = "I grew up under the endless skies of the Gulf Coast, where the rhythm of the waves echoed my relentless curiosity. What started as a simple dissatisfaction with the imperfect—systems that wasted time, processes that lacked fairness—evolved into a profound drive to rewrite the rules. As I matured, that spark ignited into an entrepreneurial blaze, fueled by books like *Think and Grow Rich*, which whispered secrets of mindset and mastery, teaching me that true success blooms from vision, persistence, and the courage to challenge the status quo. Through the lens of time, I've transformed obstacles into opportunities, my perfectionist's gaze spotting hidden flaws and forging elegant solutions with a blend of honesty, justice, and mercy. Kind and loyal to my core, I mentor others not for acclaim, but because sharing knowledge builds empires. Disdainful of deceit and inefficiency, I craft my path with integrity, turning the unknown into the extraordinary. In me, you see not just a developer, but a force—ready to partner, innovate, and elevate any venture to its pinnacle.";

  const textVariants = 
  {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <motion.section
      className="about-section"
      initial="hidden"
      animate="visible"
      variants={textVariants}
      style={{ paddingTop: '24px' }} /* Reverted to original alignment */
    >
      <div className="content-block">
        <motion.p
          variants={textVariants}
          className="content-text"
        >
          {AboutContent}
        </motion.p>
      </div>
    </motion.section>
  );
}

export default AboutSectionComponent;