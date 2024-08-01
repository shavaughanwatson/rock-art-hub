import './search_list.css';
import { GoComment } from 'react-icons/go';

import { Link } from 'react-router-dom';

const SearchList = ({ artList }) => {
  return (
    <ul className="artwork-list">
      {artList.length === 0 ? (
        <>
          <p className="error">No search results have been found!</p>
        </>
      ) : (
        <>
          {artList.map((search, index) => (
            <Link to={`/artwork/${search.id}`} key={search.id}>
              <li key={index}>
                <img
                  src={`http://localhost:1337${search.attributes.Media.data.attributes.url}`}
                  alt="Artwork"
                />
                <div className="info">
                  <p className="title">{search.attributes.title}</p>
                  <p className="author">{search.attributes.author}</p>
                  <p>
                    {' '}
                    <GoComment />
                    {search.attributes.thoughts.data.length} Comments
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </>
      )}
    </ul>
  );
};

export default SearchList;
