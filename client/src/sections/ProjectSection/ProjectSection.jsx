import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import './ProjectSection.css';

function ProjectsSectionComponent() {
  const navigate = useNavigate();

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
      type: "Video Game",
      date: "10/2021 - 11/2021",
      description: "A 3D defense game where players protect Earth by controlling a rotating force field to block incoming UFOs and asteroids. Enemies vary in speed, damage output, and the amount of health restored when destroyed, requiring strategic timing and positioning.",
      role: "Solo Developer",
      technologies: ["Unity", "C#", "Blender"],
      responsibilities: [
        "Designed and developed the entire game system, from core mechanics to polished gameplay loop.",
        "Modeled all 3D assets, including Earth, UFOs, asteroids, and the force field.",
        "Created custom UI elements, sound effects, and animations to support the player experience.",
        "Implemented unique enemy behaviors with varied attributes for difficulty scaling and strategy.",
        "Programmed health/repair mechanics, collision systems, and enemy wave progression."
      ]
    },
    {
      name: "Project Starship",
      type: "Video Game",
      date: "07/2020 - 09/2020",
      description: "A fast-paced 2D arcade shooter where players control three color-coded spaceships that can be swapped in real-time. To destroy enemies, the player must attack with the matching-colored ship. Each ship has its own unique special ability, which is powered by destroying asteroids of the corresponding color.",
      role: "Solo Developer",
      technologies: ["Unity", "C#", "Krita"],
      responsibilities: [
        "Designed and developed the entire game from scratch, including gameplay mechanics, enemy logic, and scoring system.",
        "Hand crafted all pixel art sprites, UI elements, and animations.",
        "Composed and implemented all sound effects and integrated them into gameplay",
        "Programmed custom systems for color-matching combat, ship-switching mechanics, and special abilities.",
        "Built energy management and resource-replenishing systems tied to asteroid destruction.",
      ]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { y: -5, transition: { duration: 0.3, ease: "easeOut" } }
  };

  const handleCardClick = (project) => {
    if (project.type === "Video Game") {
      const slug = project.name.toLowerCase().replace(/\s+/g, "-");
      navigate(`/game/${slug}`);
    } 
    else {
      console.log("Non-game project clicked:", project.name);
    }
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
