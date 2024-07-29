import './mainheader.css'; // You can define your styles in this file
import { Link } from 'react-router-dom';
import { MainHeaderContext } from '../RootLayout';
import { useContext } from 'react';
import Modal from 'react-modal';
import AuthForm from '../components/authForm.jsx';

function MainHeader() {
  const heading = useContext(MainHeaderContext);

  function handleQueryText(e) {
    heading.updateQuery(e.target.value);
  }

  return (
    <div className="header">
      <nav className="main-nav">
        <div className="logo">
          <Link to="/">
            <h1>ROCK ART HUB</h1>
          </Link>
          <p>Building a Geoscience Community</p>
        </div>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleQueryText}
            value={heading.queryText}
          />
          <button onClick={heading.loadsearchProducts}>
            <i className="fa fa-search"></i>
          </button>
        </div>
        <div className="right-links">
          <ul>
            {heading.isLoggedIn ? (
              <>
                <li>
                  <div className="user">
                    <Link to="/profile">
                      <figure className="avatar">
                        <img src={heading.user.user.avatar} />
                      </figure>
                    </Link>
                    <h2>Welcome, {heading.user.user.username}!</h2>
                  </div>
                </li>
                <li>
                  <button
                    className="cta-btn login"
                    onClick={heading.handleLogout}
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  className="cta-btn login"
                  onClick={heading.openSignupModal}
                >
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <Modal
        isOpen={heading.showSignupModal}
        onRequestClose={heading.closeSignupModal}
        contentLabel="Signup Modal"
        ariaHideApp={false}
      >
        <AuthForm
          handleLogin={heading.handleLogin}
          handleSignup={heading.handleSignup}
          onClose={heading.closeSignupModal}
        />
      </Modal>
    </div>
  );
}
export default MainHeader;
