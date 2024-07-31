import './profile_page.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { API_KEY } from './util';
import { MainHeaderContext } from './RootLayout';
import Modal from 'react-modal';
import EditProfileForm from './components/edit_profile_form';
import PostForm from './components/post_form';
import { FaPlus } from 'react-icons/fa6';
import { useLoaderData } from 'react-router-dom';
import api from './api';

function ProfilePage() {
  const login = useContext(MainHeaderContext);
  const user = useLoaderData();
  const [artworks, setArtworks] = useState([]);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPostForm, setPostForm] = useState(false);

  // const [firstName, setFirstName] = useState(login.user.firstName);
  // const [lastName, setLastName] = useState(login.user.lastName);
  //const [occupation, setOccupation] = useState(login.user.occupation);
  //const [bio, setBio] = useState(login.user.bio);

  useEffect(() => {
    const fetchUserArtworks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1337/api/artworks?filters[author][$eq]=${login.user.username}&populate=*`,
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
  }, [user.username]);

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
      `http://localhost:1337/api/users/${login.user.id}`,
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
    //setFirstName(response.data.firstName);
    //setLastName(response.data.lastName);
    //setOccupation(response.data.occupation);
    //setBio(response.data.bio);
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
            <img src={user.avatar}></img>
          </div>

          <div className="profile-info">
            <h2>
              {user.firstName} {user.lastName}
            </h2>

            <h3>{user.occupation}</h3>
            <h4>Bio:</h4>
            <p>{user.bio}</p>
            {login.isLoggedIn ? (
              <>
                {' '}
                <div className="edit-btn-box">
                  <button
                    className="cta-btn login"
                    onClick={openEditProfileModal}
                  >
                    Edit
                  </button>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="user-artworks">
          <h3>
            Artwork
            {login.isLoggedIn ? (
              <>
                <button className="cta-btn login" onClick={openPostForm}>
                  Post Artwork <FaPlus />
                </button>
              </>
            ) : (
              ''
            )}
          </h3>

          <ul className="artwork-list">
            {artworks.length === 0 ? (
              <>
                <p>No artwork has been posted yet! </p>
              </>
            ) : (
              <>
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
              </>
            )}
          </ul>
        </div>
      </div>

      <Modal
        isOpen={showEditProfileModal}
        onRequestClose={closeEditProfileModal}
        contentLabel="Signup Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            width: '50%',
            height: '500px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            background: '#241e1f',
          },
        }}
      >
        <EditProfileForm handleEditProfile={handleEditProfile} />
      </Modal>

      <Modal
        isOpen={showPostForm}
        onRequestClose={closePostForm}
        contentLabel="Signup Modal"
        ariaHideApp={false}
        style={{
          overlay: {
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
          },
          content: {
            width: '50%',
            height: '500px',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            overflow: 'hidden',
            background: '#241e1f',
          },
        }}
      >
        <PostForm setArtworks={setArtworks} />
      </Modal>
    </>
  );
}

export async function loader({ params }) {
  const response = await api.get(`/users/${params.id}?populate=*`);
  const data = response.data;
  console.log(response);
  console.log(data); // Adjust according to Strapi response format

  return data;
}

export default ProfilePage;
