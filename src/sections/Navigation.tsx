import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Logo from '../components/Logo';

const navLinks = [
  { label: 'Cursos Presenciais', href: '/servico/cursos-presenciais' },
  { label: 'Cursos Online', href: '/servico/cursos-online' },
  { label: 'Palestras', href: '/servico/palestras' },
  { label: 'Mentorias', href: '/servico/mentoria' },
  { label: 'Imersões', href: '/servico/imersoes' },
  { label: 'Livro', href: '/servico/livro' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/' + href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-soft'
          : 'bg-white border-b border-neuromind-border'
          }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center py-2 transition-transform hover:scale-105">
              <Logo className="scale-[0.6] md:scale-[0.7] origin-left" variant="dark" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-neuromind-navy-secondary text-[13px] font-medium hover:text-neuromind-yellow transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button className="btn-primary text-sm py-2.5 px-5">
                Inscrições
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl border border-neuromind-border flex items-center justify-center text-neuromind-navy"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[999] bg-white/98 backdrop-blur-xl transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-6 px-6">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="text-neuromind-navy font-heading font-bold text-3xl hover:text-neuromind-yellow transition-colors text-center"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => handleNavClick('#contato')}
            className="btn-primary mt-6 w-full text-lg"
          >
            Inscrições
          </button>
        </div>
      </div>
    </>
  );
}
