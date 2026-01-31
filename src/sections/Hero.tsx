import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { accentUrl, heroTitle1, heroTitleAccent1, heroTitle2, heroTitleAccent2, heroSubtitle } = useBrandingStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out' }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power2.out' }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-white pt-36 pb-20 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-neuromind-yellow/20 rounded-full blur-3xl opacity-60 -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neuromind-blue/10 rounded-full blur-3xl opacity-40 translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div ref={contentRef} className="relative z-10">


            <h1 className="animate-item text-[clamp(40px,5vw,64px)] text-neuromind-navy leading-[1.1] mb-6 font-heading font-bold">
              {heroTitle1}{' '}
              <span className="text-neuromind-blue">{heroTitleAccent1}</span>.
              <br />
              {heroTitle2}{' '}
              <span className="text-neuromind-yellow">{heroTitleAccent2}</span>.
            </h1>

            <p className="animate-item text-lg text-neuromind-navy-secondary leading-relaxed mb-8 max-w-lg">
              {heroSubtitle}
            </p>

            <div className="animate-item flex flex-wrap items-center gap-4">
              <button
                onClick={() => scrollToSection('#contato')}
                className="btn-primary flex items-center gap-2"
              >
                Inscrições
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection('#metodologia')}
                className="btn-secondary"
              >
                Conheça nossa metodologia
              </button>
            </div>
          </div>

          {/* Right image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-soft-lg">
              <img
                src="/hero_warm.jpg"
                alt="Liderança humanizada"
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-neuromind-yellow rounded-2xl flex items-center justify-center shadow-glow overflow-hidden">
              {accentUrl ? (
                <img src={accentUrl} alt="Accent" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white font-heading font-bold text-3xl">N</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
