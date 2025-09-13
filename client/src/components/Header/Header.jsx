import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#about" className="nav-link">About</a>
        <a href="#experience" className="nav-link">Experience</a>
        <a href="#projects" className="nav-link">Projects</a>
        <a
          href="/Mikal_Burrows_Resume.htm"
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            // Force browser to open file directly without SPA interception
            window.open('/Mikal_Burrows_Resume.htm', '_blank', 'noopener,noreferrer');
            e.preventDefault(); // prevent default SPA behavior
          }}
        >
          Resume
        </a>
      </nav>
    </header>
  );
}

export default Header;
