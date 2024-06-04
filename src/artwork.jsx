import ArtworkList from './components/artwork_list';
import './artwork.css';

const ArtworkPage = () => {
  return (
    <div className="artwork-page">
      <div className="category-menu">
        <h1>Categories</h1>
        <ul className="artwork-categories">
          <li>#illustration</li>
          <li>#digitalart</li>
          <li>#sculptures</li>
          <li>#paintings</li>
          <li>#photography</li>
        </ul>
      </div>
      <div className="artwork">
        <div className="artwork-title">
          <h1>Artwork</h1>
          <p>Check out our gallery with various arts about geology.</p>
          <hr />
        </div>
        <ArtworkList />
      </div>
      <div className="pagination">{/* Pagination components */}</div>
    </div>
  );
};

export default ArtworkPage;
