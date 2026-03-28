import React from 'react';
import Introduction from '../components/home/Introduction';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesPreview from '../components/home/ServicesPreview';
import Testimonials from '../components/home/Testimonials';

const Home: React.FC = () => {
  return (
    <>
      <Introduction />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesPreview />
      <Testimonials />
    </>
  );
};

export default Home;
