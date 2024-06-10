import './artworkdetailpage.css'; // You can define your styles in this file
import { useLoaderData } from 'react-router-dom';
import { FcLike } from 'react-icons/fc';
import { PiBookmarkSimpleFill } from 'react-icons/pi';
import api from './api';

const ArtworkDetail = () => {
  const artwork = useLoaderData();
  return (
    <>
      <div className="artwork-detail">
        <div className="artwork-image">
          <img
            src={`http://localhost:1337${artwork.attributes.Media.data.attributes.url}`}
            alt="geology artwork"
          />
        </div>
        <div className="artwork-menu">
          <ul className="menu-list">
            <li>
              <FcLike size={30} /> <p>{artwork.attributes.Likes}</p>
            </li>
            <li>
              <PiBookmarkSimpleFill size={30} />
              <p>50</p>
            </li>
          </ul>
        </div>

        <div className="artwork-info">
          <h2>{artwork.attributes.Title}</h2>
          <p>Made by {artwork.attributes.Author}</p>
          <p>Posted at {artwork.attributes.createdAt}</p>

          <p>{artwork.attributes.Description}</p>

          <ul className="hashtags">
            {artwork.attributes.Hashtags.map((tag, index) => (
              <li key={index}>#{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export async function loader({ params }) {
  const response = await api.get(`/artworks/${params.id}?populate=*`); // Assuming you want to fetch the article with ID 1
  const data = response.data.data;
  console.log(response);
  console.log(data); // Adjust according to Strapi response format

  /*
  const response = await fetch(
    `http://localhost:1337/api/artwork/${params.id}?populate=*`
  );
  const data = await response.json();
  */
  return data;
}
export default ArtworkDetail;
