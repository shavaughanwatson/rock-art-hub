import './artworkdetailpage.css';
import { useLoaderData } from 'react-router-dom';

const ResourceDetail = () => {
  const resources = useLoaderData();
  return (
    <>
      <div className="artwork-detail">
        <div className="artwork-image">
          <img src={resources.image} alt="Artwork" className="imgResources" />
        </div>
        <div className="artwork-info">
          <h2>{resources.title}</h2>
          <p>{resources.description}</p>
          <ul className="hashtags">
            {resources.hashtags.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export async function loader({ params }) {
  const response = await fetch(`http://localhost:8000/resources/${params.id}`);
  const data = await response.json();
  return data;
}

export default ResourceDetail;
