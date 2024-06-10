import './artwork_list.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const ArtworkList = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get('/artworks?populate=*'); // Assuming you want to fetch the article with ID 1

        console.log(response);
        console.log(response.data.data); // Adjust according to Strapi response format
        console.log(response.data.data[0]); // Adjust according to Strapi response format
        console.log(response.data.data[0].attributes);

        const artworkSampleData = response.data.data;
        setArtworks(artworkSampleData);
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
            <img
              src={`http://localhost:1337${artwork.attributes.Media.data.attributes.url}`}
              alt="Artwork"
            />
            <div className="info">
              <p className="title">{artwork.attributes.Title}</p>

              <p className="author">{artwork.attributes.Author}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArtworkList;

/*
              <ul className="hashtags">
                {artwork.attributes.Hashtags.map((hashtag, index) => (
                  <li key={index}>#{hashtag}</li>
                ))}
              </ul>
              */
