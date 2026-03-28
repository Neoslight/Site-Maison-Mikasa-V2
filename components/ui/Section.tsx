import React, { useEffect, useRef, useState } from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  bgColor?: string;
  py?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  bgColor = 'bg-white',
  py = 'py-16 md:py-24',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Unobserve once visible — the fade-in plays once and stays
          observer.unobserve(entry.target);
        }
      });
    });

    const currentElement = domRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return (
    <section id={id} className={`${bgColor} ${py}`}>
      <div ref={domRef} className={`fade-in-section ${isVisible ? 'is-visible' : ''} ${className}`}>
        {children}
      </div>
    </section>
  );
};

export default Section;
