import { Instagram, Mail, ArrowUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const footerLinks = {
  programa: [
    { label: 'Cursos Presenciais', href: '/servico/cursos-presenciais' },
    { label: 'Cursos Online', href: '/servico/cursos-online' },
    { label: 'Mentoria', href: '/servico/mentoria' },
    { label: 'Palestras', href: '/servico/palestras' },
    { label: 'Imersões', href: '/servico/imersoes' },
  ],
  empresa: [
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'Metodologia', href: '#metodologia' },
    { label: 'Depoimentos', href: '#' },
    { label: 'Contato', href: '#contato' },
  ],
  legal: [
    { label: 'Privacidade', href: '#' },
    { label: 'Termos de Uso', href: '#' },
    { label: 'Admin', href: '/admin', icon: Lock },
  ],
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neuromind-white border-t border-neuromind-border">
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <Logo className="scale-[0.65] origin-left" variant="dark" />
            </div>
            <p className="text-neuromind-navy-secondary text-sm leading-relaxed mb-6">
              Transformando liderança através da neurociência, psicologia e
              gestão estratégica humanizada.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/neuromindschool"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-neuromind-border flex items-center justify-center text-neuromind-navy-secondary hover:border-neuromind-yellow hover:text-neuromind-yellow transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="mailto:contato@neuromindschool.com.br"
                className="w-10 h-10 rounded-xl border border-neuromind-border flex items-center justify-center text-neuromind-navy-secondary hover:border-neuromind-yellow hover:text-neuromind-yellow transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links - Programa */}
          <div>
            <h4 className="text-neuromind-navy font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Programa
            </h4>
            <ul className="space-y-3">
              {footerLinks.programa.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neuromind-navy-secondary text-sm hover:text-neuromind-yellow transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Empresa */}
          <div>
            <h4 className="text-neuromind-navy font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-neuromind-navy-secondary text-sm hover:text-neuromind-yellow transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-neuromind-navy-secondary text-sm hover:text-neuromind-yellow transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Legal */}
          <div>
            <h4 className="text-neuromind-navy font-heading font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neuromind-navy-secondary text-sm hover:text-neuromind-yellow transition-colors flex items-center gap-2"
                  >
                    {link.icon && <link.icon className="w-3 h-3" />}
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-neuromind-border">
          <p className="text-neuromind-navy-secondary text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Neuromind School. Todos os direitos reservados.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-neuromind-navy-secondary text-sm hover:text-neuromind-yellow transition-colors"
          >
            Voltar ao topo
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
