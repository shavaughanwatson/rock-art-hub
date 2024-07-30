import { useState } from 'react';
import './authForm.css';
import { useContext } from 'react';
import { MainHeaderContext } from '../RootLayout';

function AuthForm() {
  const [SignUpForm, setSignUpForm] = useState(false);

  const login = useContext(MainHeaderContext);

  const changetoSignUpForm = () => {
    setSignUpForm(true);
  };

  const changetoLoginUpForm = () => {
    setSignUpForm(false);
  };

  return (
    <div className="modal-container">
      <div className="cta-section">
        <h1>{SignUpForm ? 'Join Us Today!' : 'Welcome Back!'} </h1>
        <p>
          {SignUpForm
            ? 'Sign up to enjoy all the benefits of our community.'
            : 'Login to access your account.'}
        </p>
      </div>

      <div className="form-section">
        {SignUpForm ? (
          <>
            <span className="close" onClick={login.closeSignupModal}>
              &times;
            </span>

            <h2>Log In</h2>
            <form onSubmit={login.handleSignup}>
              <div className="form-group-1">
                <div>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={login.username}
                      onChange={e => login.setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={login.email}
                      onChange={e => login.setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={login.password}
                      onChange={e => login.setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={login.firstName}
                      onChange={e => login.setfirstName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={login.lastName}
                      onChange={e => login.setlastName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth:</label>
                  <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={login.dateOfBirth}
                    onChange={e => login.setdateOfBirth(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="occupation">Occupation</label>
                <select
                  name="occupation"
                  id="occupation"
                  value={login.occupation}
                  onChange={e => login.setoccupation(e.target.value)}
                >
                  <option value=""></option>
                  <option value="Geo-Scientist">Geo-Scientist</option>
                  <option value="Artist">Artist</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bio">Tell us about yourself!</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows="4"
                  cols="100"
                  value={login.bio}
                  onChange={e => login.setbio(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="firstName">Avatar-Url</label>
                <input
                  type="text"
                  id="avatar"
                  name="avatar"
                  value={login.avatar}
                  onChange={e => login.setavatar(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="loginbtn">
                Sign Up
              </button>
              <button onClick={changetoLoginUpForm} className="signUpbtn">
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <span className="close" onClick={login.closeSignupModal}>
              &times;
            </span>
            <h2>Sign Up</h2>

            <form onSubmit={login.handleLogin}>
              <div className="form-group">
                <label htmlFor="username">Email:</label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  value={login.email}
                  onChange={e => login.setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={login.password}
                  onChange={e => login.setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="loginbtn">
                Login
              </button>
              <button onClick={changetoSignUpForm} className="signUpbtn">
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
