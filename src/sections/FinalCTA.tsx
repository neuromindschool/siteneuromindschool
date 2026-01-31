import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { ctaTitle, ctaDescription } = useBrandingStore();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contato');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-neuromind-blue relative overflow-hidden"
    >
      {/* Decorative accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="container-max relative z-10">
        <div ref={contentRef} className="text-center max-w-2xl mx-auto">
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-white mb-6 font-bold font-heading">
            {ctaTitle}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed mb-10">
            {ctaDescription}
          </p>
          <button
            onClick={scrollToContact}
            className="inline-flex items-center justify-center gap-2 mx-auto bg-neuromind-white text-neuromind-blue font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105 hover:bg-white shadow-lg"
          >
            Fale com a gente
            <ArrowRight className="w-5 h-5 text-neuromind-blue" />
          </button>
        </div>
      </div>
    </section>
  );
}
