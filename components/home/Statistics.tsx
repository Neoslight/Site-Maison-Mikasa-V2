import React, { useRef, useEffect, useState } from 'react';

interface Stat {
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  isText?: false;
}

interface StatText {
  isText: true;
  value: string;
  label: string;
}

type StatItem = Stat | StatText;

const stats: StatItem[] = [
  { target: 14, suffix: '', label: 'Projets réalisés' },
  { target: 18, suffix: '', label: 'Clients accompagnés' },
  { isText: true, value: 'Depuis 2020', label: "Années d'expérience" },
  { isText: true, value: 'Golfe du Morbihan', label: 'Zone d\'intervention' },
];

function useCountUp(target: number, duration: number, triggered: boolean): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!triggered) return;
    let start: number | null = null;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, triggered]);

  return count;
}

const NumericStat: React.FC<{ stat: Stat; triggered: boolean }> = ({ stat, triggered }) => {
  const count = useCountUp(stat.target, 1500, triggered);
  return (
    <p className="font-serif text-4xl md:text-5xl text-stone-800">
      {stat.prefix}{count}{stat.suffix}
    </p>
  );
};

const Statistics: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTriggered(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-stone-50 border-y border-stone-200 py-12">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center px-6"
      >
        {stats.map((stat) => (
          <div key={stat.label}>
            {stat.isText === true ? (
              <p className="font-serif text-2xl md:text-3xl text-stone-800">{stat.value}</p>
            ) : (
              <NumericStat stat={stat as Stat} triggered={triggered} />
            )}
            <p className="text-xs uppercase tracking-widest text-sage-600 mt-2">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
