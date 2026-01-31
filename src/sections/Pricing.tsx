import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, ArrowRight, Users, User, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: 'Essencial',
    icon: Users,
    description: 'Acesso ao conteúdo + comunidade',
    price: 'R$ 997',
    period: '/mês',
    features: [
      'Acesso a todos os módulos',
      'Comunidade exclusiva',
      'Materiais complementares',
      'Certificado de conclusão',
    ],
    cta: 'Matricular',
    highlighted: false,
  },
  {
    name: 'Profissional',
    icon: User,
    description: '+ mentorias em grupo + templates',
    price: 'R$ 1.997',
    period: '/mês',
    features: [
      'Tudo do Essencial',
      'Mentorias em grupo semanais',
      'Templates e frameworks',
      'Sessões de Q&A ao vivo',
      'Acesso vitalício à comunidade',
    ],
    cta: 'Matricular',
    highlighted: true,
  },
  {
    name: 'Executivo',
    icon: Crown,
    description: '+ mentorias 1:1 + diagnóstico de equipe',
    price: 'R$ 4.997',
    period: '/mês',
    features: [
      'Tudo do Profissional',
      'Mentorias individuais mensais',
      'Diagnóstico de equipe',
      'Plano de desenvolvimento personalizado',
      'Acompanhamento de implementação',
    ],
    cta: 'Falar com consultor',
    highlighted: false,
  },
];

export default function Pricing() {
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
      const cards = cardsRef.current?.querySelectorAll('.tier-card');
      if (cards) {
        cards.forEach((card, index) => {
          gsap.fromTo(
            card,
            { x: '10vw', opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse',
              },
              delay: index * 0.15,
            }
          );
        });
      }

      // Image parallax
      gsap.fromTo(
        imageRef.current,
        { y: -16 },
        {
          y: 16,
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
      className="relative bg-neuromind-bg py-24 z-[60]"
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left sticky image */}
          <div className="lg:sticky lg:top-24 order-2 lg:order-1">
            <div ref={imageRef} className="relative rounded-2xl overflow-hidden">
              <img
                src="/coaching_sticky.jpg"
                alt="Mentoria"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neuromind-bg/80 to-transparent" />
            </div>
          </div>

          {/* Right content */}
          <div className="order-1 lg:order-2">
            {/* Heading */}
            <div ref={headingRef} className="mb-12">
              <span className="font-mono text-xs tracking-[0.14em] text-neuromind-accent uppercase block mb-4">
                Invista em Você
              </span>
              <h2 className="text-[clamp(34px,3.6vw,56px)] text-neuromind-navy leading-[1.0] mb-6">
                ESCOLHA SEU
                <br />
                <span className="text-neuromind-accent">ACOMPANHAMENTO</span>
              </h2>
              <p className="text-lg text-neuromind-navy-secondary leading-relaxed max-w-lg">
                Planos flexíveis para atender às suas necessidades de 
                desenvolvimento de liderança.
              </p>
            </div>

            {/* Tier cards */}
            <div ref={cardsRef} className="space-y-6 mb-10">
              {tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`tier-card relative rounded-[22px] p-6 transition-all duration-300 cursor-pointer ${
                    tier.highlighted
                      ? 'bg-neuromind-accent/10 border-2 border-neuromind-accent'
                      : 'bg-[rgba(13,18,32,0.8)] border border-[rgba(244,246,255,0.08)] hover:border-[rgba(182,255,46,0.3)]'
                  }`}
                >
                  {tier.highlighted && (
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-neuromind-accent text-neuromind-bg text-xs font-bold rounded-full">
                      MAIS POPULAR
                    </div>
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        tier.highlighted ? 'bg-neuromind-accent/20' : 'bg-neuromind-accent/10'
                      }`}>
                        <tier.icon className="w-5 h-5 text-neuromind-accent" />
                      </div>
                      <div>
                        <h3 className="text-neuromind-navy font-heading font-bold text-lg">
                          {tier.name}
                        </h3>
                        <p className="text-neuromind-navy-secondary text-sm">
                          {tier.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-neuromind-accent font-heading font-bold text-2xl">
                        {tier.price}
                      </div>
                      <div className="text-neuromind-navy-secondary text-xs">
                        {tier.period}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-neuromind-navy-secondary">
                        <Check className="w-4 h-4 text-neuromind-accent flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className={`w-full py-3 rounded-[14px] font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      tier.highlighted
                        ? 'bg-neuromind-accent text-neuromind-bg hover:shadow-glow'
                        : 'border border-[rgba(244,246,255,0.2)] text-neuromind-navy hover:border-neuromind-accent hover:text-neuromind-accent'
                    }`}
                  >
                    {tier.cta}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
