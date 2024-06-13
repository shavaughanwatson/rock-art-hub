import './feature_artwork_list.css';
import { useState, useEffect } from 'react';

const FeatureArtworkList = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(
    () =>
      async function () {
        // Fetch or import your JSON data here
        const response = await fetch(`http://localhost:3000/artworks`);
        const data = await response.json();
        console.log(data);

        const artworkSampleData = data.slice(0, 4);
        setArtworks(artworkSampleData);
      },
    []
  );

  return (
    <ul className="artwork-list">
      {artworks.map((artwork, index) => (
        <li key={index}>
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
        </li>
      ))}
    </ul>
  );
};

export default FeatureArtworkList;
