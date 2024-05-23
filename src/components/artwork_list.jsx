import './artwork_list.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(
    () =>
      async function () {
        // Fetch or import your JSON data here
        const response = await fetch(`http://localhost:8000/artworks`);
        const data = await response.json();
        console.log(data);

        const artworkSampleData = data.slice(0, 10);
        setArtworks(artworkSampleData);
      },

    []
  );

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get('/artworks'); // Assuming you want to fetch the article with ID 1
        console.log(response.data.data); // Adjust according to Strapi response format
      } catch (err) {
        throw Error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <ul className="artwork-list">
      {artworks.map((artwork, index) => (
        <li key={index}>
          <Link to={`/${artwork.id}`} key={artwork.id}>
            <img src={artwork.image} alt="Artwork" />
            <div className="info">
              <p className="title">{artwork.title}</p>
              <p className="author">{artwork.author}</p>
              <ul className="hashtags">
                {artwork.hashtags.map((hashtag, index) => (
                  <li key={index}>#{hashtag}</li>
                ))}
              </ul>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArtworkList;
