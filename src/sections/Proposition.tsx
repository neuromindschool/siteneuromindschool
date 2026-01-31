import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, Heart, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    icon: Eye,
    title: 'Consciência',
    description: 'Líderes conscientes de si mesmos e do impacto que têm nos outros.',
  },
  {
    icon: Heart,
    title: 'Conexão',
    description: 'Relacionamentos autênticos baseados em escuta e empatia.',
    color: 'bg-neuromind-blue/10',
    iconColor: 'text-neuromind-blue',
  },
  {
    icon: Compass,
    title: 'Propósito',
    description: 'Liderança alinhada com valores pessoais e organizacionais.',
  },
];

export default function Proposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll('.pillar-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: cardsRef.current,
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
      className="section-padding bg-neuromind-white"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Nossa Filosofia
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Por que liderança humanizada?
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Acreditamos que liderança verdadeira nasce da conexão autêntica com as pessoas.
            Nossa abordagem integra ciência e empatia para desenvolver líderes que inspiram,
            não apenas gerenciam.
          </p>
        </div>

        {/* Pillars */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="pillar-card card-soft text-center group"
            >
              <div className={`w-16 h-16 rounded-2xl ${pillar.color || 'bg-neuromind-brown/10'} flex items-center justify-center mx-auto mb-6 transition-colors`}>
                <pillar.icon className={`w-7 h-7 ${pillar.iconColor || 'text-neuromind-brown'}`} />
              </div>
              <h3 className="text-xl text-neuromind-navy font-heading font-semibold mb-3">
                {pillar.title}
              </h3>
              <p className="text-neuromind-navy-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
