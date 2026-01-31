import { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Users,
  Monitor,
  Mic,
  BookOpen,
  UserCircle,
  Mountain,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Users,
    title: 'Cursos Presenciais',
    description: 'Experiências imersivas de aprendizado em grupo, com interação face a face e networking.',
    slug: 'cursos-presenciais',
    color: 'bg-neuromind-yellow/20',
    iconColor: 'text-neuromind-yellow',
  },
  {
    icon: Monitor,
    title: 'Cursos Online',
    description: 'Flexibilidade para aprender no seu ritmo, com conteúdo de alta qualidade disponível 24/7.',
    slug: 'cursos-online',
    color: 'bg-neuromind-blue/20',
    iconColor: 'text-neuromind-blue',
  },
  {
    icon: Mic,
    title: 'Palestras',
    description: 'Inspiração e insights para sua equipe ou evento, com conteúdo personalizado.',
    slug: 'palestras',
    color: 'bg-neuromind-yellow/20',
    iconColor: 'text-neuromind-yellow',
  },
  {
    icon: BookOpen,
    title: 'Livro',
    description: 'Metodologia Neuromind em formato literário, para aprofundar seu conhecimento.',
    slug: 'livro',
    color: 'bg-neuromind-blue/20',
    iconColor: 'text-neuromind-blue',
  },
  {
    icon: UserCircle,
    title: 'Mentoria',
    description: 'Acompanhamento individual de desenvolvimento, com atenção exclusiva ao seu crescimento.',
    slug: 'mentoria',
    color: 'bg-neuromind-yellow/20',
    iconColor: 'text-neuromind-yellow',
  },
  {
    icon: Mountain,
    title: 'Imersões',
    description: 'Experiências profundas de transformação, fora da rotina para resultados acelerados.',
    slug: 'imersoes',
    color: 'bg-neuromind-blue/20',
    iconColor: 'text-neuromind-blue',
  },
];

export default function Services() {
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

      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
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
      id="programa"
      className="section-padding bg-white"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Nossas Soluções
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Como podemos ajudar
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Oferecemos diversas formas de apoiar sua jornada de desenvolvimento
            como líder humanizado.
          </p>
        </div>

        {/* Services grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.title}
              to={`/servico/${service.slug}`}
              className="service-card group bg-white rounded-3xl p-6 border border-neuromind-border transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 cursor-pointer block"
            >
              <div className={`w-12 h-12 rounded-xl ${service.color} flex items-center justify-center mb-5 transition-colors`}>
                <service.icon className={`w-5 h-5 ${service.iconColor}`} />
              </div>
              <h3 className="text-lg text-neuromind-navy font-heading font-semibold mb-3">
                {service.title}
              </h3>
              <p className="text-neuromind-navy-secondary text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <div className={`flex items-center gap-2 ${service.iconColor} text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity`}>
                Saiba mais
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
