import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Heart, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vertentes = [
  {
    icon: Heart,
    title: 'Psicologia do Desenvolvimento',
    description: 'Desenvolva autoconsciência, inteligência emocional e resiliência. Trabalhamos o crescimento pessoal como base para a liderança autêntica.',
    color: 'bg-neuromind-brown/10',
    iconColor: 'text-neuromind-brown',
  },
  {
    icon: Compass,
    title: (
      <>
        Gestão <br /> Estratégica
      </>
    ),
    description: 'Alinhe propósito, estratégia e resultados com foco nas pessoas. Liderança que gera resultados sustentáveis através do desenvolvimento humano.',
    color: 'bg-neuromind-yellow/20',
    iconColor: 'text-neuromind-yellow',
  },
  {
    icon: Brain,
    title: 'Neurociência Comportamental',
    description: 'Entenda como o cérebro processa emoções, toma decisões e forma hábitos. Aplicamos conhecimentos científicos para desenvolver autoconsciência e inteligência emocional.',
    color: 'bg-neuromind-blue/10',
    iconColor: 'text-neuromind-blue',
  },
];

export default function Vertentes() {
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

      const cards = cardsRef.current?.querySelectorAll('.vertente-card');
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
      id="metodologia"
      className="section-padding bg-white"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Metodologia
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Uma metodologia integrada
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Três disciplinas que se complementam para formação completa de líderes humanizados.
          </p>
        </div>

        {/* Vertentes cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {vertentes.map((vertente, index) => (
            <div
              key={index}
              className="vertente-card bg-white rounded-3xl p-8 border border-neuromind-border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <div className={`w-14 h-14 rounded-2xl ${vertente.color} flex items-center justify-center mb-6`}>
                <vertente.icon className="w-6 h-6 text-neuromind-navy" />
              </div>

              <h3 className="text-xl text-neuromind-navy font-heading font-semibold mb-4">
                {vertente.title}
              </h3>
              <p className="text-neuromind-navy-secondary leading-relaxed">
                {vertente.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
