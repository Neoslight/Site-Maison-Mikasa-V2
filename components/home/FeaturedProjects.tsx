import React from 'react';
import { projectsData } from '../../data/projects';
import Button from '../ui/Button';
import Container from '../ui/Container';
import ProjectCard from '../ui/ProjectCard';
import Reveal from '../ui/Reveal';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

const FeaturedProjects: React.FC = () => {
  const [first, ...others] = projectsData.filter((p) => !p.hidden).slice(0, 3);

  return (
    <Section id="realisations">
      <Container>
        <Reveal>
          <SectionHeading
            eyebrow="Réalisations"
            title="Des lieux de vie, pensés un par un"
            align="center"
            action={
              <Button to="/realisations" variant="link">
                Toutes les réalisations
              </Button>
            }
          />
        </Reveal>

        <Reveal>
          <ProjectCard project={first} featured sizes="(max-width: 1280px) 100vw, 1200px" />
        </Reveal>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-x-10">
          {others.map((project, index) => (
            <Reveal key={project.id} delay={index * 120} className={index === 1 ? 'md:mt-32' : ''}>
              <ProjectCard project={project} sizes="(max-width: 768px) 100vw, 50vw" />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default FeaturedProjects;
