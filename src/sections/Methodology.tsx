import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Search, Flag, Zap, Users, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  { icon: Search, label: 'DIAGNÓSTICO', number: '1' },
  { icon: Flag, label: 'MARCOS', number: '2' },
  { icon: Zap, label: 'IMPACTOS', number: '3' },
  { icon: Users, label: 'COMPETÊNCIAS', number: '4' },
  { icon: Target, label: 'PERSONAS', number: '5' },
];

export default function Methodology() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const phasesRef = useRef<HTMLDivElement>(null);
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
        { x: '-60vw', opacity: 0, scale: 1.04 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(
        headlineRef.current,
        { x: '18vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.05
      );

      scrollTl.fromTo(
        bodyRef.current,
        { x: '12vw', y: '10vh', opacity: 0 },
        { x: 0, y: 0, opacity: 1, ease: 'none' },
        0.1
      );

      const phaseItems = phasesRef.current?.querySelectorAll('.phase-chip');
      if (phaseItems) {
        scrollTl.fromTo(
          phaseItems,
          { y: '6vh', opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.02, ease: 'none' },
          0.15
        );
      }

      scrollTl.fromTo(
        ctaRef.current,
        { x: '8vw', opacity: 0 },
        { x: 0, opacity: 1, ease: 'none' },
        0.2
      );

      // SETTLE (30-70%): Hold

      // EXIT (70-100%)
      scrollTl.fromTo(
        textRef.current,
        { x: 0, opacity: 1 },
        { x: '22vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        imageRef.current,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0.2, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-neuromind-bg z-30"
    >
      {/* Left image */}
      <div
        ref={imageRef}
        className="absolute left-0 top-0 w-[50vw] h-full"
      >
        <img
          src="/method_collaboration.jpg"
          alt="Metodologia"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-neuromind-bg" />
      </div>

      {/* Right text block */}
      <div
        ref={textRef}
        className="absolute left-[56vw] top-[22vh] w-[38vw] z-20"
      >
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(34px,3.6vw,56px)] text-neuromind-navy leading-[1.0] mb-8"
        >
          MÉTODO
          <br />
          <span className="text-neuromind-accent">COMPROVADO</span>
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="text-lg text-neuromind-navy-secondary leading-relaxed mb-8 max-w-lg"
        >
          Nossa metodologia integra três vertentes complementares para criar 
          líderes resilientes e conscientes.
        </p>

        {/* Vertentes */}
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="px-4 py-2 rounded-full border border-neuromind-accent/30 text-neuromind-accent text-sm font-medium">
            Neurociência Comportamental
          </span>
          <span className="px-4 py-2 rounded-full border border-neuromind-accent/30 text-neuromind-accent text-sm font-medium">
            Psicologia
          </span>
          <span className="px-4 py-2 rounded-full border border-neuromind-accent/30 text-neuromind-accent text-sm font-medium">
            Gestão Estratégica
          </span>
        </div>

        {/* 5 Fases */}
        <div ref={phasesRef} className="mb-8">
          <p className="font-mono text-xs text-neuromind-navy-secondary uppercase tracking-wider mb-4">
            5 Fases da Metodologia
          </p>
          <div className="flex flex-wrap gap-2">
            {phases.map((phase) => (
              <div
                key={phase.number}
                className="phase-chip flex items-center gap-2 px-3 py-2 rounded-full border border-[rgba(244,246,255,0.15)] bg-[rgba(13,18,32,0.6)]"
              >
                <phase.icon className="w-3.5 h-3.5 text-neuromind-accent" />
                <span className="font-mono text-xs text-neuromind-navy">
                  {phase.number}. {phase.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button ref={ctaRef} className="btn-secondary flex items-center gap-2">
          Ver etapas
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
