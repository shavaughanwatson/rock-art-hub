import { Outlet } from 'react-router-dom';
import MainHeader from './components/mainheader.jsx';
import Footer from './components/footer.jsx';
import { createContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SearchContext = createContext();

function RootLayout() {
  const [query, setQuery] = useState('');

  const navigate = useNavigate();

  const handleQuery = e => {
    setQuery(e);
  };

  async function goToSearchPage() {
    if (query === '') {
      alert(`No text has been inputed`);
      return;
    }
    navigate('/search');
  }

  return (
    <SearchContext.Provider
      value={{
        queryText: query,
        updateQuery: handleQuery,
        loadsearchProducts: goToSearchPage,
      }}
    >
      <MainHeader />
      <Outlet />
      <Footer />
    </SearchContext.Provider>
  );
}
export default RootLayout;
