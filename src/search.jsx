import './search.css';
import SearchList from './components/search_list';
import { useContext } from 'react';
import { MainHeaderContext } from './RootLayout';
import { useState, useEffect } from 'react';
import Pagination from './components/pagination';
import api from './api';

const SearchPage = () => {
  const [artList, setartList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  const searchquery = useContext(MainHeaderContext);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await api.get(
          `/artworks?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&filters[$or][0][title][$contains]=${searchquery.queryText}&filters[$or][1][author][$contains]=${searchquery.queryText}&filters[$or][2][category][$contains]=${searchquery.queryText}`
        );

        console.log(response);
        console.log(response.data.data); // Adjust according to Strapi response format

        setartList(response.data.data);
        setTotalPages(response.data.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArticle();
  }, [currentPage]);

  return (
    <div className="resource-page">
      <div className="resource-title">
        <h1>Search</h1>
        <hr />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>
      <SearchList artList={artList} />
      <div className="pagination">{/* Pagination components */}</div>
    </div>
  );
};

export default SearchPage;
