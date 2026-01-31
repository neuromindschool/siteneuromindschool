import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  MessageCircle, 
  Heart, 
  MessageSquare, 
  Target, 
  Shield,
  ArrowRight,
  Download
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const modules = [
  {
    icon: Brain,
    title: 'Neurociência da Decisão',
    description: 'Entenda como o cérebro processa informações e toma decisões sob pressão.',
  },
  {
    icon: MessageCircle,
    title: 'Comunicação Não-Violenta',
    description: 'Desenvolva habilidades de comunicação empática e assertiva.',
  },
  {
    icon: Heart,
    title: 'Gestão de Estados Emocionais',
    description: 'Aprenda a reconhecer e regular emoções em si e nos outros.',
  },
  {
    icon: MessageSquare,
    title: 'Feedback Estruturado',
    description: 'Domine técnicas de feedback que promovem crescimento real.',
  },
  {
    icon: Target,
    title: 'Hábitos de Alta Performance',
    description: 'Construa rotinas sustentáveis para produtividade e bem-estar.',
  },
  {
    icon: Shield,
    title: 'Cultura de Segurança Psicológica',
    description: 'Crie ambientes onde todos se sintam seguros para contribuir.',
  },
];

export default function Modules() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.module-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { x: '8vw', opacity: 0, rotate: 1 },
            {
              x: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.1,
            }
          );
        });
      }

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: -20 },
        {
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-neuromind-bg-secondary py-24 z-50"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left sticky image */}
          <div className="lg:sticky lg:top-24">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden">
              <img
                src="/modules_sticky.jpg"
                alt="Módulos do programa"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neuromind-bg-secondary/80 to-transparent" />
            </div>
          </div>

          {/* Right content */}
          <div>
            {/* Heading */}
            <div ref={headingRef} className="mb-12">
              <span className="font-mono text-xs tracking-[0.14em] text-neuromind-accent uppercase block mb-4">
                Programa Completo
              </span>
              <h2 className="text-[clamp(34px,3.6vw,56px)] text-neuromind-navy leading-[1.0] mb-6">
                O QUE VOCÊ VAI
                <br />
                <span className="text-neuromind-accent">APRENDER</span>
              </h2>
              <p className="text-lg text-neuromind-navy-secondary leading-relaxed max-w-lg">
                Seis módulos para construir liderança adaptativa, comunicação 
                clara e decisões conscientes.
              </p>
            </div>

            {/* Module cards */}
            <div ref={cardsRef} className="space-y-4 mb-10">
              {modules.map((module, index) => (
                <div
                  key={module.title}
                  className="module-card card-module flex items-start gap-4 cursor-pointer group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-neuromind-accent/10 flex items-center justify-center group-hover:bg-neuromind-accent/20 transition-colors">
                    <module.icon className="w-5 h-5 text-neuromind-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs text-neuromind-accent">
                        MÓDULO {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-neuromind-navy font-heading font-bold text-lg mb-1 group-hover:text-neuromind-accent transition-colors">
                      {module.title}
                    </h3>
                    <p className="text-neuromind-navy-secondary text-sm leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neuromind-navy-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all flex-shrink-0 mt-6" />
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="btn-primary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Baixar grade completa
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
