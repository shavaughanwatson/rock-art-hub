import './resources.css';
import ResourceList from './components/search_list';

const ResourcePage = () => {
  return (
    <div className="resource-page">
      <div className="resource-title">
        <h1>Resources</h1>
        <hr />
        <ul className="resource-categories">
          <li>#Geology Art</li>
          <li>#Geoscience</li>
          <li>#Multimedia</li>
          <li>#History</li>
          <li>#Nature</li>
        </ul>
      </div>
      <ResourceList />
      <div className="pagination">{/* Pagination components */}</div>
    </div>
  );
};

export default ResourcePage;
