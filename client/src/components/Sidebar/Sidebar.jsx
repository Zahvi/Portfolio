import { motion } from "framer-motion";
import './Sidebar.css';

function Sidebar({ setBlurBackground, setShowFullHeadshot }) {
    const HeroTitle = "Mikal A. Burrows";
    const HeroSubtitle = "Full Stack Developer";

    const sidebarVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: "easeOut" },
        },
    };

    const openModal = () => { setShowFullHeadshot(true); setBlurBackground(true); };

    return (
        <motion.aside
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            className="sidebar"
        >
            <h1 className="sidebar-title">{HeroTitle}</h1>
            <h2 className="sidebar-subtitle">{HeroSubtitle}</h2>

            <a
                href="mailto:burrows.mikal@gmail.com"
                className="sidebar-link"
            >
                burrows.mikal@gmail.com
            </a>
            <a
                href="tel:+17274158487"
                className="sidebar-link"
            >
                (727) 415-8487
            </a>

            <div
                className="sidebar-headshot-container"
                onClick={openModal}
            >
                <img src="/headshot.jpg" className="sidebar-headshot" />
            </div>

            <div className="sidebar-social-links">
                <a
                    href="https://github.com/Zahvi"
                    className="sidebar-link"
                >
                    <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/github.svg"
                        alt="GitHub"
                        className="social-icon"
                    />
                </a>
                <a
                    href="https://www.linkedin.com/in/mikalburrows/"
                    className="sidebar-link"
                >
                    <img
                        src="https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/linkedin.svg"
                        alt="LinkedIn"
                        className="social-icon"
                    />
                </a>
            </div>
        </motion.aside>
    );
}

export default Sidebar;
