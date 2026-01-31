import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: 'A Neuromind me ajudou a reconectar com meu propósito como líder. Hoje lidero com mais leveza e autenticidade.',
    author: 'Ana R.',
    role: 'Diretora de Operações',
    company: 'TechCorp Brasil',
    image: '/ana_test.png',
  },
  {
    quote: 'Finalmente entendi que liderança não é sobre controle, é sobre conexão. Minha equipe sente a diferença.',
    author: 'Carlos M.',
    role: 'CEO',
    company: 'InnovaStart',
    image: '/carlos_test.png',
  },
  {
    quote: 'A metodologia é profunda e acolhedora ao mesmo tempo. Um verdadeiro diferencial no mercado.',
    author: 'Fernanda L.',
    role: 'Gerente de RH',
    company: 'Grupo Nexus',
    image: '/fernanda_test.png',
  },
];

export default function Testimonials() {
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

      const cards = cardsRef.current?.querySelectorAll('.testimonial-card');
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
      className="section-padding bg-white"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Depoimentos
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Histórias de transformação
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Veja o que nossos alunos dizem sobre a experiência com a Neuromind School.
          </p>
        </div>

        {/* Testimonial cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="testimonial-card bg-neuromind-white rounded-3xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-neuromind-yellow/20" />

              <p className="text-neuromind-navy leading-relaxed mb-8 pr-8">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-soft shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-neuromind-navy font-medium">
                    {testimonial.author}
                  </div>
                  <div className="text-neuromind-navy-secondary text-sm">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
