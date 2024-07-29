import './home.css'; // You can define your styles in this file
import FeatureArtworkList from './components/feature_artwork_list';

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="homepage">
      <div className="featured-artwork">
        <h1>Welcome to Rock Art Hub!</h1>
        <p>
          Check out Geology Art and more about how scieince on how the earth
          works!
        </p>
        <FeatureArtworkList />
        <Link to="/artwork" className="viewbtn">
          View More
        </Link>
      </div>
      <hr />
    </div>
  );
}

export default Home;
