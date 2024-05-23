import './artworkdetailpage.css'; // You can define your styles in this file
import { useLoaderData } from 'react-router-dom';

const ArtworkDetail = () => {
  const artwork = useLoaderData();
  return (
    <>
      <div className="artwork-detail">
        <div className="artwork-image">
          <img src={artwork.image} alt="Artwork" />
        </div>
        <div className="artwork-info">
          <h2>{artwork.title}</h2>
          <p>{artwork.description}</p>
          <ul className="hashtags">
            {artwork.hashtags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8000/artworks/${params.id}`);
  const data = await response.json();
  return data;
}
export default ArtworkDetail;
