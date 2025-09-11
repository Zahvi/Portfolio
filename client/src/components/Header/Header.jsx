import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <a href="#about" className="nav-link">About</a>
        <a href="#portfolio" className="nav-link">Portfolio</a>
        <a href="#contact" className="nav-link">Contact</a>
        <a href="#resume" className="nav-link">Resume</a>
      </nav>
    </header>
  );
}

export default Header;