import ArtworkList from './components/artwork_list';
import './artwork.css';

const ArtworkPage = () => {
  return (
    <div className="artwork-page">
      <div className="artwork-title">
        <h1>Artwork</h1>
        <hr />
        <ul className="artwork-categories">
          <li>#illustration</li>
          <li>#digitalart</li>
          <li>#sculptures</li>
          <li>#paintings</li>
          <li>#photography</li>
        </ul>
      </div>
      <div className="artwork">
        <ArtworkList />
      </div>
      <div className="pagination">{/* Pagination components */}</div>
    </div>
  );
};

export default ArtworkPage;
