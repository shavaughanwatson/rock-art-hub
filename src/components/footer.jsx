import './footer.css'; // You can define your styles in this file
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="left-links">
        <Link to="/about">
          <p>About Us</p>
        </Link>
      </div>
      <div className="logo">
        {/* Your logo image or text goes here */}
        <Link to="/">
          <h1>ROCK ART HUB</h1>
        </Link>
        <p>Building a Geoscience Community</p>
      </div>
      <div className="social-links">
        <h3>Follow Us</h3>
        <ul>
          <li>Instagram</li>
          <li>LinkedIn</li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
