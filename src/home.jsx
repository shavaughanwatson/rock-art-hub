import './home.css'; // You can define your styles in this file

function Home() {
  return (
    <div className="homepage">
      <div className="homepage-info">
        <h1>Welcome to Rock Art Hub!</h1>
        <p>
          Check out Geology Art and more about how scieince on how the earth
          works!
        </p>
      </div>
      <div className="hompage-images">
        <ul className="image-list">
          <div className="image-1"></div>

          <div className="image-2"></div>

          <div className="image-3"></div>
        </ul>
      </div>
    </div>
  );
}

export default Home;
