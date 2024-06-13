import './mainheader.css'; // You can define your styles in this file
import { Link } from 'react-router-dom';
import { SearchContext } from '../RootLayout';
import { useContext } from 'react';

function MainHeader() {
  const query = useContext(SearchContext);

  function handleQueryText(e) {
    query.updateQuery(e.target.value);
  }

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
          </ul>
        </div>
        <div className="logo">
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
        <input
          type="text"
          placeholder="Search..."
          onChange={handleQueryText}
          value={query.queryText}
        />
        <button onClick={query.loadsearchProducts}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
}
export default MainHeader;
