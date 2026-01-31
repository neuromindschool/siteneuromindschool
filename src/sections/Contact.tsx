import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Instagram, Send } from 'lucide-react';
import { useBrandingStore } from '../lib/store';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const { contTag, contTitle, contDescription } = useBrandingStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: leftRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entraremos em contato em breque.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contato"
      className="section-padding bg-white"
    >
      <div className="container-max">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <span className="text-neuromind-yellow font-medium text-sm uppercase tracking-wider mb-4 block">
            {contTag}
          </span>
          <h2 className="text-[clamp(32px,3.5vw,48px)] text-neuromind-navy mb-6 font-heading font-bold">
            {contTitle}
          </h2>
          <p className="text-lg text-neuromind-navy-secondary leading-relaxed max-w-2xl mx-auto">
            {contDescription}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left - Contact Info */}
          <div className="lg:col-span-4">
            <div className="bg-neuromind-white/40 p-10 rounded-[40px] border border-neuromind-border h-full flex flex-col justify-start shadow-soft-sm">
              <span className="text-neuromind-yellow font-bold text-xs uppercase tracking-widest mb-2 block">
                Contato Direto
              </span>
              <h4 className="text-2xl text-neuromind-navy font-heading font-bold mb-8">Nossos Canais</h4>

              <div className="space-y-6">
                <a
                  href="mailto:contato@neuromindschool.com.br"
                  className="flex items-center gap-4 text-neuromind-navy-secondary hover:text-neuromind-yellow transition-all font-medium group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neuromind-border flex items-center justify-center group-hover:border-neuromind-yellow group-hover:shadow-soft transition-all shrink-0">
                    <Mail className="w-5 h-5 text-neuromind-navy group-hover:text-neuromind-yellow" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neuromind-navy/50 uppercase font-bold tracking-wider">E-mail</span>
                    <span className="text-sm">contato@neuromindschool.com.br</span>
                  </div>
                </a>

                <a
                  href="https://instagram.com/neuromindschool"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-neuromind-navy-secondary hover:text-neuromind-yellow transition-all font-medium group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white border border-neuromind-border flex items-center justify-center group-hover:border-neuromind-yellow group-hover:shadow-soft transition-all shrink-0">
                    <Instagram className="w-5 h-5 text-neuromind-navy group-hover:text-neuromind-yellow" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] text-neuromind-navy/50 uppercase font-bold tracking-wider">Instagram</span>
                    <span className="text-sm">@neuromindschool</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div ref={leftRef} className="lg:col-span-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 bg-neuromind-white/40 p-8 rounded-[32px] border border-neuromind-border shadow-soft">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-neuromind-navy text-sm font-medium mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-neuromind-border text-neuromind-navy placeholder-neuromind-navy-secondary/50 focus:border-neuromind-yellow focus:outline-none transition-colors"
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neuromind-navy text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-neuromind-border text-neuromind-navy placeholder-neuromind-navy-secondary/50 focus:border-neuromind-yellow focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-neuromind-navy text-sm font-medium mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-neuromind-border text-neuromind-navy placeholder-neuromind-navy-secondary/50 focus:border-neuromind-yellow focus:outline-none transition-colors"
                  placeholder="Nome da sua empresa"
                />
              </div>
              <div>
                <label className="block text-neuromind-navy text-sm font-medium mb-2">
                  Mensagem
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3.5 rounded-2xl bg-white border border-neuromind-border text-neuromind-navy placeholder-neuromind-navy-secondary/50 focus:border-neuromind-yellow focus:outline-none transition-colors resize-none"
                  placeholder="Como podemos ajudar?"
                  required
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full flex items-center justify-center gap-2 py-4"
              >
                <Send className="w-4 h-4" />
                Enviar mensagem
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
