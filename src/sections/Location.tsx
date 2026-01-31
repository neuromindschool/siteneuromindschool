import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Globe } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function Location() {
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const photosRef = useRef<HTMLDivElement>(null);

    const { hqPhoto1Url, hqPhoto2Url, hqPhoto3Url } = useBrandingStore();



    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                contentRef.current,
                { x: -50, opacity: 0 },
                {
                    x: 0,
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

            const photos = photosRef.current?.children;
            if (photos) {
                gsap.fromTo(
                    photos,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.7,
                        stagger: 0.15,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: photosRef.current,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse',
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="localizacao"
            className="section-padding bg-white overflow-hidden"
        >
            <div className="container-max">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Content */}
                    <div ref={contentRef}>
                        <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
                            Nossa Sede
                        </span>
                        <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-8 leading-tight">
                            Um espaço pensado para o{' '}
                            <span className="text-neuromind-yellow">seu desenvolvimento</span>
                        </h2>

                        <p className="text-lg text-neuromind-navy-secondary mb-10 leading-relaxed">
                            Nossa sede em Natal-RN é muito mais que um escritório. É o ponto de encontro da liderança
                            estratégica, onde realizamos nossas imersões presenciais, mentorias individuais e treinamentos
                            de alto impacto. Um ambiente que une sofisticação, ciência e humanidade.
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-neuromind-brown/10 flex items-center justify-center shrink-0">
                                    <MapPin className="w-6 h-6 text-neuromind-brown" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-neuromind-navy mb-1">Endereço</h4>
                                    <p className="text-neuromind-navy-secondary text-sm">
                                        Av. Rodrigues Alves, 800 - Tirol, Natal - RN, 59020-200<br />
                                        Tyrol Business Center
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-neuromind-brown/10 flex items-center justify-center shrink-0">
                                    <Globe className="w-6 h-6 text-neuromind-brown" />
                                </div>
                                <div>
                                    <h4 className="font-heading font-bold text-neuromind-navy mb-1">Alcance</h4>
                                    <p className="text-neuromind-navy-secondary text-sm">
                                        Sede física em Natal-RN<br />
                                        Atendimento online para todo o Brasil e o Mundo
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Photo Grid */}
                    <div ref={photosRef} className="grid grid-cols-2 gap-4 h-[500px]">
                        <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden shadow-soft-lg group">
                            {hqPhoto1Url ? (
                                <img src={hqPhoto1Url} alt="Sede 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-neuromind-navy/5 flex items-center justify-center border-2 border-dashed border-neuromind-navy/20">
                                    <span className="text-neuromind-navy/30 text-sm">Foto da Sede 1</span>
                                </div>
                            )}
                        </div>
                        <div className="col-span-1 rounded-3xl overflow-hidden shadow-soft-lg group">
                            {hqPhoto2Url ? (
                                <img src={hqPhoto2Url} alt="Sede 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-neuromind-navy/5 flex items-center justify-center border-2 border-dashed border-neuromind-navy/20">
                                    <span className="text-neuromind-navy/30 text-sm">Foto da Sede 2</span>
                                </div>
                            )}
                        </div>
                        <div className="col-span-1 rounded-3xl overflow-hidden shadow-soft-lg group">
                            {hqPhoto3Url ? (
                                <img src={hqPhoto3Url} alt="Sede 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            ) : (
                                <div className="w-full h-full bg-neuromind-navy/5 flex items-center justify-center border-2 border-dashed border-neuromind-navy/20">
                                    <span className="text-neuromind-navy/30 text-sm">Foto da Sede 3</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Map */}
                <div className="rounded-[40px] overflow-hidden shadow-soft-lg h-[450px] border border-neuromind-border">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.444313647914!2d-35.200807399999995!3d-5.792743199999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b30011798d2625%3A0xb60d004352ee37e4!2sTyrol%20Business%20Center!5e0!3m2!1spt-BR!2sbr!4v1769841022059!5m2!1spt-BR!2sbr"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
