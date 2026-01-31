import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function NeuroTraining() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const accentRuleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(
        imageRef.current,
        { x: '60vw', opacity: 0, scale: 1.04 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        accentRuleRef.current,
        { x: '-12vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '-10vw', y: '10vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      scrollTl.fromTo(
        ctaRef.current,
        { x: '-8vw', y: '6vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      // SETTLE (30-70%): Hold positions

      // EXIT (70-100%)
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-neuromind-bg z-20"
    >
      {/* Left text block */}
      <div
        ref={textRef}
        className="absolute left-[8vw] top-[22vh] w-[38vw] z-20"
      >
        {/* Accent rule */}
        <div ref={accentRuleRef} className="accent-rule mb-8" />

        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,3.6vw,56px)] text-neuromind-navy leading-[1.0] mb-8"
        >
          NEURO-TRAINING
          <br />
          <span className="text-neuromind-accent">DE ALTA PERFORMANCE</span>
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-lg text-neuromind-navy-secondary leading-relaxed mb-8 max-w-lg"
        >
          Aulas práticas, protocolos baseados em evidências e feedback 
          individualizado para transformar hábitos de liderança.
        </p>

        {/* CTA */}
        <button ref={ctaRef} className="btn-secondary flex items-center gap-2">
          Conheça o método
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Right image */}
      <div
        ref={imageRef}
        className="absolute right-0 top-0 w-[50vw] h-full"
      >
        <img
          src="/neuro_training_room.jpg"
          alt="Neuro-training"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-neuromind-bg" />
      </div>
    </section>
  );
}
