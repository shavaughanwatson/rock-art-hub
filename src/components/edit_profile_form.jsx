import { useContext } from 'react';
import { MainHeaderContext } from '../RootLayout';

function EditForm({ handleEditProfile }) {
  const login = useContext(MainHeaderContext);

  return (
    <div>
      <form onSubmit={handleEditProfile}>
        <div className="form-group">
          <h2>Edit Profile</h2>
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
        <button type="submit" className="loginbtn">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditForm;
