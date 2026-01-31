import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Linkedin, Mail } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);



export default function Founders() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { founder1Url, founder2Url, founder3Url } = useBrandingStore();

  const foundersData = [
    {
      name: 'Amanda Karla',
      role: 'Psicologia do Desenvolvimento',
      defaultImage: '/amanda_warm.jpg',
      currentImage: founder3Url,
      description: 'Psicoterapeuta, advogada e empresária da Quanta Psicologia. Especialização em Psicologia Transpessoal, formação internacional em terapia somática do trauma. Mentoria de Transição de Carreira, Assessoria PsicoJurídica e Consultoria Empresarial.',
      linkedin: '#',
      email: 'amanda@neuromindschool.com.br',
    },
    {
      name: 'Marcelo Pelicano',
      role: 'Gestão Estratégica',
      defaultImage: '/marcelo_warm.jpg',
      currentImage: founder1Url,
      description: 'Mestre em Gestão de Processos, MBA em Gestão Estratégica de Negócios, Projetos, Metodologias Ágeis e Graduado em Administração de Empresas. Empresário na Automattus, Analista de Gestão da EBSERH e longa experiência em gestão da inovação e internacionalização de empresas.',
      linkedin: '#',
      email: 'marcelo@neuromindschool.com.br',
    },
    {
      name: 'Daniella Santos',
      role: 'Neurociência Comportamental',
      defaultImage: '/daniella_warm.jpg',
      currentImage: founder2Url,
      description: 'Doutora em Neurociência Comportamental, Mestra em Psicobiologia, graduada em Biomedicina. Palestrante, escritora e empresária em Neurociência da Autoeficácia e Autoexpansão. Pesquisadora do Laboratório de Evolução do Comportamento Humano da UFRN.',
      linkedin: '#',
      email: 'daniella@neuromindschool.com.br',
    },
  ];

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

      const cards = cardsRef.current?.querySelectorAll('.founder-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
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
      id="sobre"
      className="section-padding bg-neuromind-white"
    >
      <div className="container-max">
        {/* Heading */}
        <div ref={headingRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            Nossa Equipe
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6">
            Quem somos
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed">
            Nos juntamos com a missão de transformar o mundo através dos líderes
            de ambientes corporativos com experiência, ciência e humanidade.
          </p>
        </div>

        {/* Founder cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {foundersData.map((founder) => (
            <div
              key={founder.name}
              className="founder-card bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-soft-lg"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <img
                  src={founder.currentImage || founder.defaultImage}
                  alt={founder.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-neuromind-navy font-heading font-semibold mb-1">
                  {founder.name}
                </h3>
                <p className="text-neuromind-yellow font-medium text-sm mb-4">
                  {founder.role}
                </p>
                <p className="text-neuromind-navy-secondary text-sm leading-relaxed mb-6">
                  {founder.description}
                </p>

                {/* Social links */}
                <div className="flex items-center gap-3">
                  <a
                    href={founder.linkedin}
                    className="w-10 h-10 rounded-xl border border-neuromind-border flex items-center justify-center text-neuromind-navy-secondary hover:border-neuromind-yellow hover:text-neuromind-yellow transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${founder.email}`}
                    className="w-10 h-10 rounded-xl border border-neuromind-border flex items-center justify-center text-neuromind-navy-secondary hover:border-neuromind-yellow hover:text-neuromind-yellow transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
