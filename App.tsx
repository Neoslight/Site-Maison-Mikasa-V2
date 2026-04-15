import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetails from './pages/ProjectDetails';
import Services from './pages/Services';
import Contact from './pages/Contact';
import RendezVous from './pages/RendezVous';
import MentionsLegales from './pages/MentionsLegales';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/common/ScrollToTop';
import ErrorBoundary from './components/common/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<About />} />
          <Route path="/prestations" element={<Services />} />
          <Route path="/realisations" element={<Projects initialType="Tous" />} />
          <Route path="/realisations/maison" element={<Projects initialType="Maison" />} />
          <Route
            path="/realisations/appartement"
            element={<Projects initialType="Appartement" />}
          />
          <Route
            path="/realisations/professionnel"
            element={<Projects initialType="Professionnel" />}
          />
          <Route path="/realisations/:projectId" element={<ProjectDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rendez-vous" element={<RendezVous />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
};

export default App;
