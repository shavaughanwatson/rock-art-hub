import './search_list.css';

import { Link } from 'react-router-dom';

const SearchList = ({ artList }) => {
  return (
    <ul className="resource-list">
      {artList.map((search, index) => (
        <Link to={`/${search.id}`} key={search.id}>
          <li key={index}>
            <img
              src={`http://localhost:1337${search.attributes.Media.data.attributes.url}`}
              alt="Artwork"
            />
            <div className="info">
              <p className="title">{search.attributes.title}</p>
              <p className="author">{search.attributes.author}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchList;
