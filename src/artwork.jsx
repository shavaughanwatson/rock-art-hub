import ArtworkList from './components/artwork_list';
import { useState, useEffect } from 'react';
import './artwork.css';
import api from './api';
import Pagination from './components/pagination';

const ArtworkPage = () => {
  const categories = [
    { name: 'All 🎨', value: 'All' },
    { name: 'Fossil Art 🗿 ', value: 'Fossil Art' },
    { name: 'Rock & Minerals 💎', value: 'Rock & Minerals' },
    { name: 'Geological Landscapes 🗺️', value: 'Geological Landscapes' },
    { name: 'Geological Abstracts 🖼️', value: 'Geological Abstracts' },
  ];

  const [artworks, setArtworks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const pageSize = 8;

  useEffect(() => {
    const fetchArtworks = async () => {
      let query = `/artworks?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;

      if (selectedCategory) {
        query += `&filters[category][$contains]=${selectedCategory}`;
      }

      if (selectedCategory.includes('All')) {
        query = `/artworks?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}`;
      }

      try {
        const response = await api.get(query);
        console.log(response.data.data);
        setArtworks(response.data.data);
        setTotalPages(response.data.meta.pagination.pageCount);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, [currentPage, selectedCategory]);

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page when category changes
  };

  return (
    <div className="artwork-page">
      <div className="artwork">
        <div className="artwork-title">
          <h1>Artwork</h1>
          <p>Check out our gallery with various arts about geology.</p>

          <ul className="artwork-categories">
            {categories.map((category, index) => (
              <li key={index}>
                <button onClick={() => handleCategoryChange(category.value)}>
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={page => setCurrentPage(page)}
          />
        </div>
        <ArtworkList artworks={artworks} />
      </div>
    </div>
  );
};

export default ArtworkPage;
