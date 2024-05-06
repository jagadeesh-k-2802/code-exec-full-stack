import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/" className="header__nav__logo-container">
          CodeExec
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&lt;/&gt;</p>
        </Link>

        <ul>
          <li>
            <Link to="/select-language">Languages</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
