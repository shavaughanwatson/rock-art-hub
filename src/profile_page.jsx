import './profile_page.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY } from './util';
import { MainHeaderContext } from './RootLayout';
import Modal from 'react-modal';
import EditProfileForm from './components/edit_profile_form';
import PostForm from './components/post_form';

function ProfilePage() {
  const login = useContext(MainHeaderContext);
  const [artworks, setArtworks] = useState([]);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPostForm, setPostForm] = useState(false);

  const [firstName, setFirstName] = useState(login.user.user.firstName);
  const [lastName, setLastName] = useState(login.user.user.lastName);
  const [occupation, setOccupation] = useState(login.user.user.occupation);
  const [bio, setBio] = useState(login.user.user.bio);

  useEffect(() => {
    const fetchUserArtworks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/artworks?filters[author][$eq]=${login.user.user.username}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );
        console.log(login.user);
        console.log(response.data.data);
        setArtworks(response.data.data);
      } catch (error) {
        console.error('Error fetching user artworks:', error);
      }
    };

    fetchUserArtworks();
  }, [login.user.user.username]);

  const openEditProfileModal = e => {
    e.preventDefault();
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const openPostForm = e => {
    e.preventDefault();
    setPostForm(true);
  };

  const closePostForm = () => {
    setPostForm(false);
  };

  const handleEditProfile = async e => {
    e.preventDefault();

    const response = await axios.put(
      `http://localhost:1337/api/users/${login.user.user.id}`,
      {
        firstName: login.firstName,
        lastName: login.lastName,
        occupation: login.occupation,
        bio: login.bio,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    console.log(response.data);
    console.log(response.data.bio);
    setFirstName(response.data.firstName);
    setLastName(response.data.lastName);
    setOccupation(response.data.occupation);
    setBio(response.data.bio);
  };

  const handleDelete = async artworkId => {
    try {
      await axios.delete(`http://localhost:1337/api/artworks/${artworkId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      setArtworks(artworks.filter(artwork => artwork.id !== artworkId));
    } catch (error) {
      console.error('Error deleting artwork:', error);
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="profile">
          <div className="profile-pic">
            <img src={login.user.user.avatar}></img>
          </div>

          <div className="profile-info">
            <h2>{firstName}</h2>
            <h2>{lastName}</h2>
            <h2>{occupation}</h2>
            <p>{bio}</p>
            <button className="cta-btn login" onClick={openEditProfileModal}>
              Edit
            </button>
          </div>
        </div>
        <div className="user-artworks">
          <h3>My Artwork</h3>
          <button className="cta-btn login" onClick={openPostForm}>
            Post
          </button>
          <ul className="artwork-list">
            {artworks.map((artwork, index) => (
              <li key={index}>
                <img
                  src={`http://localhost:1337${artwork.attributes.Media.data.attributes.url}`}
                  alt="Artwork"
                />
                <div className="info">
                  <p className="title">{artwork.attributes.title}</p>
                  <button onClick={() => handleDelete(artwork.id)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={showEditProfileModal}
        onRequestClose={closeEditProfileModal}
        contentLabel="Signup Modal"
        ariaHideApp={false}
      >
        <EditProfileForm handleEditProfile={handleEditProfile} />
      </Modal>

      <Modal
        isOpen={showPostForm}
        onRequestClose={closePostForm}
        contentLabel="Signup Modal"
        ariaHideApp={false}
      >
        <PostForm setArtworks={setArtworks} />
      </Modal>
    </>
  );
}

export default ProfilePage;
