import { motion } from 'framer-motion';

function ExperienceSectionComponent()
{
  const experiences = [
    {
      title: "Software Developer",
      company: "Blue Purpose",
      date: "09/2023 - Present",
      summary: "Providing software solutions for healthcare facilities to help understand patient and facility data analytics.",
      responsibilities: [
        "Developed and maintained a Blazor Server web application using C#, HTML, CSS, Radzen, and MSSQL, creating new features and systems to deliver meaningful data analytics for healthcare facilities.",
        "Wrote and optimized SQL queries and stored procedures to manage and analyze large datasets, enabling efficient data retrieval and robust reporting for nursing facilities.",
        "Collaborated daily with team members in standup meetings and directly with clients to discuss, resolve issues, and finalize feature requirements, utilizing Azure DevOps for task management and pull request reviews."
      ]
    },
    {
      title: "Full Stack Developer",
      company: "unQbd",
      date: "02/2023 - 09/2023",
      summary: "A book streaming platform offering authors a way to publish their book seamlessly while also allowing users to access books affordably.",
      responsibilities: [
        "Create and sustain a RESTful API Blazor WASM web application, utilizing ASP.NET, C#, HTML, CSS, Radzen, and MSSQL.",
        "Communicate and collaborate with team members to deliver exceptional development solutions.",
        "Engage in code reviews, debugging, and troubleshooting processes to uphold software quality and enhance stability."
      ]
    }
  ];

  const cardVariants = 
  {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <motion.section
      className="experience-section"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="experience-card"
          custom={index}
          variants={cardVariants}
        >
          <div className="experience-date">{exp.date}</div>
          <div className="experience-details">
            <h3 className="experience-title">
                {exp.title}{" - "}
                <span className="experience-company">{exp.company}</span>
            </h3>
            <p className="experience-summary">{exp.summary}</p>
            <ul className="experience-responsibilities">
              {exp.responsibilities.map((resp, i) => (
                <li key={i} className="responsibility-item">{resp}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
      <div class="button-container">
        <a href="/Mikal Burrows Resume.htm" className="resume-button" target="_blank" rel="noopener noreferrer">
            View Full Resume
        </a>
      </div>
    </motion.section>
  );
}

export default ExperienceSectionComponent;