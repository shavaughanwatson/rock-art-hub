import './search.css';
import SearchList from './components/search_list';

const SearchPage = () => {
  return (
    <div className="resource-page">
      <div className="resource-title">
        <h1>Search</h1>
        <hr />
      </div>
      <SearchList />
      <div className="pagination">{/* Pagination components */}</div>
    </div>
  );
};

export default SearchPage;
