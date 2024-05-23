import './home.css'; // You can define your styles in this file
import FeatureArtworkList from './components/feature_artwork_list';
import FeatureResourceList from './components/feature_resource_list';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homepage">
      <div className="featured-artwork">
        <h2>Featured Artwork</h2>
        <FeatureArtworkList />
        <Link to="/artwork" className="viewbtn">
          View More
        </Link>
      </div>
      <hr />
      <div className="resource-section">
        <h2>Resource Section</h2>
        <FeatureResourceList />
        <Link to="/resources" className="viewbtn">
          View More
        </Link>
      </div>
    </div>
  );
}

export default Home;
