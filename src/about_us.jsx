import './about_us.css'; // You can define your styles in this file
import AboutUsPic from './assets/about_us.png';

const AboutUs = () => {
  // Sample about us data
  const aboutUs = {
    title: 'What is Rock Art Hub?',
    description:
      'Rock Arts Hub is a revolutionary platform that celebrates the beauty and complexity of our planet through the harmonious integration of geoscience and art. Our mission is to inspire educate, and connect individuals from diverse backgrounds fostering a community that appreciates the Earths wonders and seeks to express them through  artistic endeavors',
  };

  return (
    <>
      <div className="about-us">
        <div className="about-us-image">
          <img src={AboutUsPic} alt="About Us" />
        </div>
        <div className="about-us-info">
          <h2>{aboutUs.title}</h2>
          <p>{aboutUs.description}</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
