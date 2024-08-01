import './artwork_list.css';
import { Link } from 'react-router-dom';
import { GoComment } from 'react-icons/go';

const ArtworkList = ({ artworks }) => {
  return (
    <ul className="artwork-list">
      {artworks.map((artwork, index) => (
        <li key={index}>
          <Link to={`${artwork.id}`} key={artwork.id}>
            <div className="info">
              <img
                src={`http://localhost:1337${artwork.attributes.Media.data.attributes.url}`}
                alt="Artwork"
              />

              <p className="title">{artwork.attributes.title}</p>
              <p className="author">{artwork.attributes.author}</p>
              <p>
                <GoComment /> {artwork.attributes.thoughts.data.length} Comments
              </p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ArtworkList;
