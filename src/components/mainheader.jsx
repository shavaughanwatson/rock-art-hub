import './mainheader.css'; // You can define your styles in this file
import { Link } from 'react-router-dom';

function MainHeader() {
  return (
    <div className="header">
      <nav className="main-nav">
        <div className="left-links">
          <ul>
            <Link to="/about">
              <li>About Us</li>
            </Link>
            <Link to="/artwork">
              <li>Artwork</li>
            </Link>
            <Link to="/resource">
              <li>Resources</li>
            </Link>
          </ul>
        </div>
        <div className="logo">
          {/* Your logo image or text goes here */}
          <Link to="/">
            <h1>ROCK ART HUB</h1>
          </Link>
          <p>Building a Geoscience Community</p>
        </div>
        <div className="right-links">
          <ul>
            <li>
              <button className="cta-btn sign-up">Sign Up</button>
            </li>
            <li>
              <button className="cta-btn login">Login</button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="search-bar">
        <input type="text" placeholder="Search..." />
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
export default MainHeader;
