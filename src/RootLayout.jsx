import { Outlet } from 'react-router-dom';
import MainHeader from './components/mainheader.jsx';

import { createContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from './authService';
import { Link } from 'react-router-dom';

export const MainHeaderContext = createContext();

function RootLayout() {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showProfileModal, setProfileModal] = useState(false);
  const [query, setQuery] = useState('');
  const [isLoggedIn, setisLoggedIn] = useState(false); // Track user authentication state
  const [user, setUser] = useState(null); // Track user authentication state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [dateOfBirth, setdateOfBirth] = useState('');
  const [occupation, setoccupation] = useState('');
  const [avatar, setavatar] = useState('');
  const [bio, setbio] = useState('');

  useEffect(() => {
    const user = authService.getCurrentUser();
    console.log(user);
    if (user) {
      setUser(user);
      setisLoggedIn(true);
    }
  }, []);

  const openSignupModal = e => {
    e.preventDefault();
    setShowSignupModal(true);
  };

  const closeSignupModal = () => {
    setShowSignupModal(false);
  };

  const openProfileModal = e => {
    e.preventDefault();
    setProfileModal(true);
  };

  const closeProfileModal = () => {
    setProfileModal(false);
  };

  const navigate = useNavigate();

  const handleQuery = e => {
    setQuery(e);
  };

  const handleSignup = async e => {
    e.preventDefault();
    try {
      const userData = await authService.signup(
        username,
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
        occupation,
        avatar,
        bio
      );
      setUser(userData);

      setisLoggedIn(true);
      closeSignupModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditProfile = async e => {
    e.preventDefault();
    const newUserData = await authService.edit(
      firstName,
      lastName,
      occupation,
      bio
    );
    setUser(newUserData);
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const userData = await authService.login(email, password);
      setUser(userData);
      console.log(userData);

      setisLoggedIn(true);
      closeSignupModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loglevel');
    setUser(null);
    setisLoggedIn(false);
    console.log('User logged out');
  };

  const goToSearchPage = () => {
    if (query === '') {
      alert(`No text has been inputed`);
      return;
    }

    localStorage.setItem('searchQuery', query);
    navigate('/search');
  };

  return (
    <MainHeaderContext.Provider
      value={{
        updateQuery: handleQuery,
        openSignupModal: openSignupModal,
        closeSignupModal: closeSignupModal,
        openProfileModal: openProfileModal,
        closeProfileModal: closeProfileModal,
        handleSignup: handleSignup,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleEditProfile: handleEditProfile,
        loadsearchProducts: goToSearchPage,
        setUser: setUser,
        setUsername: setUsername,
        setEmail: setEmail,
        setPassword: setPassword,
        setfirstName: setfirstName,
        setlastName: setlastName,
        setdateOfBirth: setdateOfBirth,
        setoccupation: setoccupation,
        setavatar: setavatar,
        setbio: setbio,
        setisLoggedIn: setisLoggedIn,
        setQuery: setQuery,
        showSignupModal: showSignupModal,
        showProfileModal: showProfileModal,
        isLoggedIn: isLoggedIn,
        queryText: query,
        username: username,
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dateOfBirth,
        occupation: occupation,
        bio: bio,
        avatar: avatar,
        user: user,
      }}
    >
      <MainHeader />
      <div className="outlet-wrapper">
        <div className="category-menu">
          <ul className="menu-links">
            <Link to="/artwork">
              <li>
                <p>Explore Art 🎨</p>
              </li>
            </Link>

            <Link to="/about">
              <li>
                <p>About Us ❔</p>
              </li>
            </Link>
          </ul>
        </div>

        <Outlet />
      </div>
    </MainHeaderContext.Provider>
  );
}
export default RootLayout;
