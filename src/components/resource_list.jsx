import './resource_list.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(
    () =>
      async function () {
        // Fetch or import your JSON data here
        const response = await fetch(`http://localhost:8000/resources`);
        const data = await response.json();
        console.log(data);

        const resourcesSampleData = data.slice(0, 10);
        setResources(resourcesSampleData);
      },
    []
  );
  return (
    <ul className="resource-list">
      {resources.map((resource, index) => (
        <Link to={`/resources/${resource.id}`} key={resource.id}>
          <li key={index}>
            <img src={resource.image} alt="resource" />
            <div className="info">
              <p className="title">{resource.title}</p>
              <p className="author">{resource.author}</p>
              <ul className="hashtags">
                {resource.hashtags.map((hashtag, index) => (
                  <li key={index}>#{hashtag}</li>
                ))}
              </ul>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default ResourceList;
