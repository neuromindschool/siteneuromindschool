import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    value: '500+',
    label: 'líderes transformados',
    description: 'em suas jornadas de desenvolvimento',
  },
  {
    value: '50+',
    label: 'organizações',
    description: 'que cultivam culturas mais humanizadas',
  },
  {
    value: '4.9/5',
    label: 'avaliação média',
    description: 'dos nossos programas',
  },
  {
    value: '85%',
    label: 'dos participantes',
    description: 'reportam maior clareza de propósito',
  },
];

export default function Results() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const items = statsRef.current?.querySelectorAll('.stat-item');
      if (items) {
        gsap.fromTo(
          items,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-neuromind-yellow/20"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Nosso Impacto
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Resultados que importam
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Números que refletem o impacto real da nossa metodologia na vida 
            de líderes e organizações.
          </p>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item bg-white rounded-3xl p-8 text-center"
            >
              <div className="text-[clamp(2.5rem,4vw,3.5rem)] text-neuromind-yellow font-heading font-bold mb-2">
                {stat.value}
              </div>
              <div className="text-neuromind-navy font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-neuromind-navy-secondary text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
