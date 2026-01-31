import { useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
    Users,
    Monitor,
    Mic,
    BookOpen,
    UserCircle,
    Mountain,
    ArrowLeft,
    CheckCircle2,
    Calendar,
    Clock,
    Target
} from 'lucide-react';
import Navigation from '../sections/Navigation';
import Footer from '../sections/Footer';

const servicesData = {
    'cursos-presenciais': {
        icon: Users,
        title: 'Cursos Presenciais',
        description: 'Experiências imersivas de aprendizado em grupo, com interação face a face e networking de alto nível.',
        fullDescription: 'Nossos cursos presenciais são desenhados para proporcionar uma imersão completa no universo da liderança humanizada. Através de dinâmicas de grupo, estudos de caso reais e mentoria direta, os participantes transformam sua visão estratégica e suas habilidades interpessoais em um ambiente seguro e estimulante.',
        benefits: [
            'Networking com outros líderes e gestores',
            'Atividades práticas e dinâmicas de grupo',
            'Feedback em tempo real dos especialistas',
            'Ambiente focado e livre de distrações',
            'Material didático exclusivo'
        ],
        features: [
            { icon: Calendar, label: 'Encontros Mensais', value: 'Sábados das 08h às 18h' },
            { icon: Clock, label: 'Carga Horária', value: '40 horas presenciais' },
            { icon: Target, label: 'Público-alvo', value: 'Gestores e Empreendedores' }
        ]
    },
    'cursos-online': {
        icon: Monitor,
        title: 'Cursos Online',
        description: 'Flexibilidade para aprender no seu ritmo, com conteúdo de alta qualidade disponível 24/7.',
        fullDescription: 'A plataforma online da Neuromind permite que você acesse nossa metodologia de qualquer lugar do mundo. Combinamos aulas gravadas em alta definição com sessões ao vivo de tira-dúvidas, garantindo que o aprendizado seja profundo, flexível e totalmente aplicável ao seu dia a dia.',
        benefits: [
            'Acesso vitalício ao conteúdo base',
            'Plataforma interativa e gamificada',
            'Certificação reconhecida pelo mercado',
            'Fórum exclusivo de discussão',
            'Aulas ao vivo via Zoom quinzenalmente'
        ],
        features: [
            { icon: Clock, label: 'Flexibilidade', value: 'Aprenda no seu próprio ritmo' },
            { icon: Monitor, label: 'Acesso', value: 'Disponível em qualquer dispositivo' },
            { icon: Target, label: 'Foco', value: 'Praticidade e Aplicação Direta' }
        ]
    },
    'palestras': {
        icon: Mic,
        title: 'Palestras',
        description: 'Inspiração e insights para sua equipe ou evento, com conteúdo personalizado e impactante.',
        fullDescription: 'Nossas palestras levam os temas da neurociência e psicologia do desenvolvimento para grandes palcos e auditórios corporativos. Com uma abordagem dinâmica e embasada, provocamos reflexões profundas sobre o papel do líder no novo mundo do trabalho.',
        benefits: [
            'Conteúdo adaptado à realidade da empresa',
            'Formato dinâmico e engajador',
            'Insights científicos de fácil aplicação',
            'Ideal para eventos corporativos e convenções',
            'Interação ativa com o público'
        ],
        features: [
            { icon: Clock, label: 'Duração', value: '60 a 90 minutos' },
            { icon: Users, label: 'Capacidade', value: 'Sem limite de participantes' },
            { icon: Target, label: 'Impacto', value: 'Transformação de Cultura' }
        ]
    },
    'livro': {
        icon: BookOpen,
        title: 'Livro',
        description: 'Metodologia Neuromind em formato literário, para aprofundar seu conhecimento e consulta constante.',
        fullDescription: 'O livro da Neuromind consolida anos de pesquisa e prática clínica e empresarial em um guia completo para a liderança do futuro. Um companheiro indispensável para quem busca fundamentar sua gestão em princípios sólidos de desenvolvimento humano.',
        benefits: [
            'Guia prático de consulta diária',
            'Exercícios de autodesenvolvimento',
            'Estudos de caso detalhados',
            'Prefácio de grandes nomes da gestão',
            'Acesso a conteúdo digital complementar'
        ],
        features: [
            { icon: BookOpen, label: 'Formato', value: 'Capa Dura e Digital (E-book)' },
            { icon: Target, label: 'Objetivo', value: 'Fundamentação Teórica' },
            { icon: Users, label: 'Público', value: 'Estudantes e Profissionais' }
        ]
    },
    'mentoria': {
        icon: UserCircle,
        title: 'Mentoria',
        description: 'Acompanhamento individual de desenvolvimento, com atenção exclusiva ao seu crescimento e desafios únicos.',
        fullDescription: 'A mentoria individual é o serviço mais personalizado da Neuromind. Durante os encontros, um de nossos especialistas trabalha diretamente em cima de seus desafios específicos, ajudando a destravar potenciais e acelerar resultados de forma estratégica e humana.',
        benefits: [
            'Atenção 100% personalizada',
            'Diagnóstico de perfil comportamental',
            'Plano de ação individualizado',
            'Network estratégico do mentor',
            'Suporte via WhatsApp entre sessões'
        ],
        features: [
            { icon: Calendar, label: 'Sessões', value: 'Quinzenais ou Mensais' },
            { icon: Clock, label: 'Duração', value: 'Ciclos de 6 meses' },
            { icon: Target, label: 'Foco', value: 'Crescimento Individualizado' }
        ]
    },
    'imersoes': {
        icon: Mountain,
        title: 'Imersões',
        description: 'Experiências profundas de transformação, fora da rotina para resultados acelerados e autoconhecimento.',
        fullDescription: 'Nossas imersões levam líderes para fora do ambiente corporativo tradicional. Em locais cuidadosamente selecionados, promovemos uma jornada intensiva de 2 a 3 dias focada no autoconhecimento profundo e no refinamento da Visão Estratégica.',
        benefits: [
            'Ambiente transformador e inspirador',
            'Desconexão total para foco absoluto',
            'Atividades de imersão sensorial',
            'Networking de altíssimo nível',
            'Acompanhamento pós-imersão'
        ],
        features: [
            { icon: Calendar, label: 'Duração', value: '2 a 3 dias intensivos' },
            { icon: Users, label: 'Vagas', value: 'Grupos reduzidos (máx. 15 pessoas)' },
            { icon: Target, label: 'Experiência', value: 'Transformação Profunda' }
        ]
    }
};

export default function ServiceDetail() {
    const { id } = useParams();
    const service = servicesData[id as keyof typeof servicesData];
    const sectionRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
        const ctx = gsap.context(() => {
            gsap.from('.animate-fade-in', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power2.out'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, [id]);

    if (!service) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-neuromind-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-neuromind-navy mb-4">Serviço não encontrado</h1>
                    <Link to="/" className="text-neuromind-yellow hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Voltar para o início
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={sectionRef} className="min-h-screen bg-neuromind-white">
            <Navigation />

            <div className="pt-32 pb-20">
                <div className="container-max">
                    {/* Back Link */}
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-neuromind-navy-secondary hover:text-neuromind-yellow transition-colors mb-8 group"
                    >
                        <div className="w-8 h-8 rounded-full border border-neuromind-border flex items-center justify-center group-hover:border-neuromind-yellow">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">Voltar para o início</span>
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                        {/* Left Content */}
                        <div className="lg:col-span-7">
                            <div className="animate-fade-in">
                                <div className="w-16 h-16 rounded-2xl bg-neuromind-yellow/20 flex items-center justify-center mb-6">
                                    <service.icon className="w-8 h-8 text-neuromind-yellow" />
                                </div>
                                <h1 className="text-[clamp(32px,4vw,56px)] text-neuromind-navy font-heading font-bold mb-6 leading-tight">
                                    {service.title}
                                </h1>
                                <p className="text-xl text-neuromind-navy-secondary leading-relaxed mb-8">
                                    {service.description}
                                </p>
                                <div className="prose prose-lg prose-neuromind text-neuromind-navy-secondary">
                                    <p>{service.fullDescription}</p>
                                </div>
                            </div>

                            <div className="mt-12 animate-fade-in">
                                <h3 className="text-2xl text-neuromind-navy font-heading font-bold mb-6">
                                    Principais Benefícios
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {service.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex gap-3 items-start p-4 rounded-2xl bg-white border border-neuromind-border shadow-soft-sm">
                                            <CheckCircle2 className="w-5 h-5 text-neuromind-yellow shrink-0 mt-0.5" />
                                            <span className="text-neuromind-navy-secondary text-sm leading-snug">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar */}
                        <div className="lg:col-span-5">
                            <div className="animate-fade-in space-y-8 sticky top-32">
                                {/* Features Card */}
                                <div className="bg-white rounded-[40px] p-8 border border-neuromind-border shadow-soft-lg">
                                    <h3 className="text-xl text-neuromind-navy font-heading font-bold mb-6">
                                        Detalhes do Programa
                                    </h3>
                                    <div className="space-y-6">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-neuromind-navy/5 flex items-center justify-center shrink-0">
                                                    <feature.icon className="w-5 h-5 text-neuromind-navy" />
                                                </div>
                                                <div>
                                                    <p className="text-[10px] text-neuromind-yellow uppercase tracking-wider font-bold mb-0.5">
                                                        {feature.label}
                                                    </p>
                                                    <p className="text-sm text-neuromind-navy font-medium">
                                                        {feature.value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-10 pt-8 border-t border-neuromind-border">
                                        <Link
                                            to="/#contato"
                                            onClick={() => {
                                                setTimeout(() => {
                                                    const element = document.querySelector('#contato');
                                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                                }, 100);
                                            }}
                                            className="btn-primary w-full py-4 text-center justify-center"
                                        >
                                            Tenho Interesse
                                        </Link>
                                    </div>
                                </div>

                                {/* Newsletter/CTA Support */}
                                <div className="bg-neuromind-blue rounded-[40px] p-8 text-white relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <h4 className="text-xl font-bold mb-2">Ficou com dúvidas?</h4>
                                        <p className="text-white/90 text-sm mb-6">
                                            Fale agora mesmo com um de nossos consultores de carreira.
                                        </p>
                                        <a
                                            href="mailto:contato@neuromindschool.com.br"
                                            className="inline-flex items-center gap-2 text-white text-sm font-bold border-b-2 border-white pb-1 hover:text-neuromind-yellow hover:border-neuromind-yellow transition-colors"
                                        >
                                            Enviar E-mail
                                        </a>
                                    </div>
                                    <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl transition-transform duration-700 group-hover:scale-150" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
