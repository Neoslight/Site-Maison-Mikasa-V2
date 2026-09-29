import React from 'react';
import Introduction from '../components/home/Introduction';
import FeaturedProjects from '../components/home/FeaturedProjects';
import Approach from '../components/home/Approach';
import ServicesList from '../components/home/ServicesList';
import Testimonials from '../components/home/Testimonials';
import { useRouteMeta } from '../lib/useRouteMeta';
import JsonLd from '../components/seo/JsonLd';
import { LOCAL_BUSINESS_SCHEMA } from '../data/schema';

const Home: React.FC = () => {
  useRouteMeta();

  return (
    <>
      <JsonLd schema={LOCAL_BUSINESS_SCHEMA} />
      <Introduction />
      <FeaturedProjects />
      <Approach />
      <ServicesList />
      <Testimonials />
    </>
  );
};

export default Home;
