import React from 'react';
import Introduction from '../components/home/Introduction';
import Statistics from '../components/home/Statistics';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesPreview from '../components/home/ServicesPreview';
import Testimonials from '../components/home/Testimonials';
import { usePageMeta } from '../lib/usePageMeta';

const Home: React.FC = () => {
  usePageMeta(
    'Accueil',
    "Architecture d'intérieur et décoration sur-mesure en Bretagne et Golfe du Morbihan."
  );

  return (
    <>
      <Introduction />
      <Statistics />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesPreview />
      <Testimonials />
    </>
  );
};

export default Home;
