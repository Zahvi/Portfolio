import { motion } from 'framer-motion';
import './ProjectSection.css';

function ProjectsSectionComponent() {
  const projects = [
    {
      name: "Scholar",
      type: "Web App",
      date: "07/2025 - Present",
      description: "Responsive Blazor Server web application designed to manage student coursework and analytics.",
      role: "Lead Developer",
      technologies: ["Blazor Server", ".NET Core", "MSSQL", "HTML", "CSS", "Radzen"],
      responsibilities: [
        "Developed core features of the application using Blazor Server to provide a dynamic user interface.",
        "Designed database schema and optimized MSSQL queries for fast data retrieval.",
        "Implemented responsive design ensuring usability across desktop and mobile devices."
      ]
    },
    {
      name: "Planet Protection",
      type: "Game",
      date: "10/2021 - 11/2021",
      description: "3D video game developed to teach environmental awareness.",
      role: "Solo Developer",
      technologies: ["Unity", "C#", "Blender"],
      responsibilities: [
        "Programmed game mechanics and player interactions using C# in Unity.",
        "Modeled and animated 3D assets with Blender to create immersive environments.",
        "Tested and debugged gameplay to ensure smooth player experience."
      ]
    },
    {
      name: "Project Starship",
      type: "Game",
      date: "07/2020 - 09/2020",
      description: "2D space exploration game developed to experiment with game design mechanics.",
      role: "Solo Developer",
      technologies: ["Unity", "C#"],
      responsibilities: [
        "Designed levels and game logic using Unity and C#.",
        "Implemented scoring, progression, and player controls.",
        "Conducted user testing and iterated on feedback to improve gameplay."
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const handleCardClick = (project) => {
    console.log("Card clicked:", project.name);
    // modal or navigation can go here
  };

  return (
    <motion.section
      className="projects-section"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
    >
      {projects.map((project, index) => (
        <motion.div
          key={index}
          className="project-card"
          variants={cardVariants}
          whileHover="hover"
          onClick={() => handleCardClick(project)}
        >
          <div className="project-date">{project.date}</div>
          <div className="project-details">
            <h3 className="project-title">
              {project.name} - <span className="project-type">{project.type}</span>
            </h3>

            <p className="project-description">{project.description}</p>

            <div className="project-meta-chips">
              <div className="meta-line">
                <span className="meta-label">Role:</span>
                <span className="meta-chip">{project.role}</span>
              </div>
              <div className="meta-line">
                <span className="meta-label">Key Technologies:</span>
                {project.technologies.map((tech, i) => (
                  <span key={i} className="meta-chip">{tech}</span>
                ))}
              </div>
            </div>

            <ul className="project-responsibilities">
              {project.responsibilities.map((resp, i) => (
                <li key={i} className="responsibility-item">{resp}</li>
              ))}
            </ul>

            {/* Banner purely CSS-controlled */}
            <div className="view-project-banner">
              View Project
            </div>
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
}

export default ProjectsSectionComponent;
