import './search_list.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchContext } from '../RootLayout';
import { useContext } from 'react';
import api from '../api';

const SearchList = () => {
  const searchquery = useContext(SearchContext);

  const [artList, setartList] = useState([]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(
          `/artworks?populate=*&filters[$or][0][Title][$contains]=${searchquery.queryText}&filters[$or][1][Author][$contains]=${searchquery.queryText}&filters[$or][2][Hashtags][$contains]=${searchquery.queryText}&filters[$or][3][Category][$contains]=${searchquery.queryText}`
        );

        console.log(response);
        console.log(response.data.data); // Adjust according to Strapi response format

        setartList(response.data.data);
      } catch (err) {
        throw Error('Error fetching article:', err);
      }
    };

    fetchArticle();
  }, []); // Empty dependency array means this effect runs once when the component

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
              <p className="title">{search.attributes.Title}</p>
              <p className="author">{search.attributes.Author}</p>
            </div>
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default SearchList;
