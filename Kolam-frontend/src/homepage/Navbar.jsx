import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/" className="logo-link">Dot2Art</Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/collections">Collections</Link>
        </li>
        <li>
          <Link to="/learn">Learn With Us</Link>
        </li>
        <li>
          <Link to="/about">About Us</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
