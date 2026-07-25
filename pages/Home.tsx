import React from 'react';
import Introduction from '../components/home/Introduction';
import AboutPreview from '../components/home/AboutPreview';
import FeaturedProjects from '../components/home/FeaturedProjects';
import ServicesPreview from '../components/home/ServicesPreview';
import Testimonials from '../components/home/Testimonials';
import ServiceAreas from '../components/home/ServiceAreas';
import { useRouteMeta } from '../lib/useRouteMeta';
import JsonLd from '../components/seo/JsonLd';
import { LOCAL_BUSINESS_SCHEMA } from '../data/schema';

const Home: React.FC = () => {
  useRouteMeta();

  return (
    <>
      <JsonLd schema={LOCAL_BUSINESS_SCHEMA} />
      <Introduction />
      <AboutPreview />
      <FeaturedProjects />
      <ServicesPreview />
      <Testimonials />
      <ServiceAreas />
    </>
  );
};

export default Home;
