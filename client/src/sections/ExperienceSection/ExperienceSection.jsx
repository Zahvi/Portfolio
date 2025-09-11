import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import './ExperienceSection.css';

function ExperienceSectionComponent() {
  // Track expanded state for each card independently
  const [expandedCards, setExpandedCards] = useState({});

  const experiences = [
    {
      title: "Software Developer",
      company: "Blue Purpose",
      date: "09/2023 - Present",
      summary: "Providing software solutions for healthcare facilities to help understand patient and facility data analytics.",
      skills: ["C#", "Blazor Server", "MSSQL", "HTML", "CSS", "Radzen", "Azure DevOps"],
      responsibilities: [
        "Developed and maintained a Blazor Server web application using C#, HTML, CSS, Radzen, and MSSQL, creating new features and systems to deliver meaningful data analytics for healthcare facilities.",
        "Wrote and optimized SQL queries and stored procedures to manage and analyze large datasets, enabling efficient data retrieval and robust reporting for nursing facilities.",
        "Collaborated daily with team members in standup meetings and directly with clients to discuss, resolve issues, and finalize feature requirements, utilizing Azure DevOps for task management and pull request reviews."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "UnQbd",
      date: "02/2023 - 09/2023",
      summary: "A book streaming platform offering authors a way to publish their book seamlessly while also allowing users to access books affordably.",
      skills: ["C#", "ASP.NET", "Blazor WASM", "HTML", "CSS", "Radzen", "MSSQL", "REST API"],
      responsibilities: [
        "Create and sustain a RESTful API Blazor WASM web application, utilizing ASP.NET, C#, HTML, CSS, Radzen, and MSSQL.",
        "Communicate and collaborate with team members to deliver exceptional development solutions.",
        "Engage in code reviews, debugging, and troubleshooting processes to uphold software quality and enhance stability."
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const toggleExpand = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <motion.section
      className="experience-section"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {experiences.map((exp, index) => {
        const isExpanded = !!expandedCards[index];

        return (
          <motion.div 
            key={index} 
            className={`experience-card ${isExpanded ? 'expanded' : ''}`}
            custom={index}
            variants={cardVariants}
            onClick={() => toggleExpand(index)}
          >
            <div className="experience-date">{exp.date}</div>
            <div className="experience-details">
              <h3 className="experience-title">
                {exp.title} - <span className="experience-company">{exp.company}</span>
              </h3>
              <p className="experience-summary">{exp.summary}</p>

              <AnimatePresence>
                {isExpanded && (
                  <motion.ul
                    className="experience-responsibilities"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto", transition: { duration: 0.3, ease: "easeInOut" } }}
                    exit={{ opacity: 0, height: 0, transition: { duration: 0.15, ease: "easeInOut" } }}
                  >
                    {exp.responsibilities.map((resp, i) => (
                      <li
                        key={i}
                        className="responsibility-item"
                      >
                        {resp}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>

              <div className="skills-container">
                {exp.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="skill-chip"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="see-more-banner">
                {isExpanded ? "See Less" : "See More"}
              </div>
            </div>
          </motion.div>
        );
      })}

      <div className="button-container">
        <a 
          href="/Mikal_Burrows_Resume.htm"
          className="resume-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Full Resume
        </a>
      </div>
    </motion.section>
  );
}

export default ExperienceSectionComponent;
