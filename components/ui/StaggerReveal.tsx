import React, { useRef, useEffect, useState, cloneElement, isValidElement, Children } from 'react';

interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  baseDelay?: number;
}

const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className,
  baseDelay = 120,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const staggeredChildren = Children.map(children, (child, i) => {
    if (!isValidElement(child)) return child;
    const existing = (child.props as React.HTMLAttributes<HTMLElement>).className ?? '';
    return cloneElement(child as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      className: `${existing} fade-in-section${visible ? ' is-visible' : ''}`,
      style: {
        ...(child.props as React.HTMLAttributes<HTMLElement>).style,
        transitionDelay: `${i * baseDelay}ms`,
      },
    });
  });

  return (
    <div ref={containerRef} className={className}>
      {staggeredChildren}
    </div>
  );
};

export default StaggerReveal;
