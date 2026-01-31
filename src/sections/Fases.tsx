import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, Flag, Zap, Users, Target } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

const fases = [
  {
    number: '01',
    icon: Search,
    title: 'Diagnóstico',
    description: 'Mapeamos o perfil atual, desafios e objetivos de desenvolvimento de cada líder.',
  },
  {
    number: '02',
    icon: Flag,
    title: 'Marcos',
    description: 'Definimos metas claras e mensuráveis de crescimento pessoal e profissional.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Impactos',
    description: 'Trabalhamos comportamentos e hábitos que geram resultados sustentáveis.',
  },
  {
    number: '04',
    icon: Users,
    title: 'Competências',
    description: 'Desenvolvemos habilidades técnicas e comportamentais essenciais.',
  },
  {
    number: '05',
    icon: Target,
    title: 'Personas',
    description: 'Consolidamos a identidade de líder única de cada pessoa.',
  },
];

export default function Fases() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const fasesRef = useRef<HTMLDivElement>(null);
  const { fasesTag, fasesTitle, fasesDescription } = useBrandingStore();

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

      const items = fasesRef.current?.querySelectorAll('.fase-item');
      if (items) {
        gsap.fromTo(
          items,
          { x: -30, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: fasesRef.current,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - Heading */}
          <div ref={headingRef}>
            <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
              {fasesTag}
            </span>
            <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6 font-heading font-bold">
              {fasesTitle}
            </h2>
            <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
              {fasesDescription}
            </p>
          </div>

          {/* Right - Fases list */}
          <div ref={fasesRef} className="space-y-4">
            {fases.map((fase) => (
              <div
                key={fase.number}
                className="fase-item bg-white rounded-2xl p-5 flex items-start gap-4 transition-all duration-300 hover:shadow-soft"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neuromind-yellow/20 flex items-center justify-center">
                  <fase.icon className="w-5 h-5 text-neuromind-yellow" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-neuromind-yellow font-mono text-sm font-medium">
                      {fase.number}
                    </span>
                    <h3 className="text-neuromind-navy font-heading font-semibold">
                      {fase.title}
                    </h3>
                  </div>
                  <p className="text-neuromind-navy-secondary text-sm leading-relaxed">
                    {fase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
