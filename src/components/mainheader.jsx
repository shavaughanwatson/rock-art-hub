import './mainheader.css'; // You can define your styles in this file
import { Link } from 'react-router-dom';
import { MainHeaderContext } from '../RootLayout';
import { useContext } from 'react';
import Modal from 'react-modal';
import AuthForm from '../components/authForm.jsx';
import { FiSearch } from 'react-icons/fi';

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
          <form onSubmit={heading.loadsearchProducts}>
            <input
              type="text"
              placeholder="Search..."
              onChange={handleQueryText}
              value={heading.queryText}
            />
            <button type="submit" className="search-btn">
              <FiSearch />
            </button>
          </form>
        </div>
        <div className="right-links">
          <ul>
            {heading.isLoggedIn ? (
              <>
                <li>
                  <div className="user">
                    <Link to={`${heading.user.id}`}>
                      <figure className="avatar">
                        <img src={heading.user.avatar} />
                      </figure>
                    </Link>
                    <h2>Welcome, {heading.user.username}!</h2>
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
        style={{
          overlay: {
            backgroundColor: '#0b140fe1',
          },
          content: {
            background: '#241E1F',
            padding: '0px',
          },
        }}
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
