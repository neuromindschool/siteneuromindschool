import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BrandingState {
    logoUrl: string | null;
    accentUrl: string | null;
    founder1Url: string | null;
    founder2Url: string | null;
    founder3Url: string | null;
    hqPhoto1Url: string | null;
    hqPhoto2Url: string | null;
    hqPhoto3Url: string | null;

    // Content
    heroTitle1: string;
    heroTitleAccent1: string;
    heroTitle2: string;
    heroTitleAccent2: string;
    heroSubtitle: string;

    propTag: string;
    propTitle: string;
    propDescription: string;

    vertTag: string;
    vertTitle: string;
    vertDescription: string;

    servTag: string;
    servTitle: string;
    servDescription: string;

    fasesTag: string;
    fasesTitle: string;
    fasesDescription: string;

    contTag: string;
    contTitle: string;
    contDescription: string;

    ctaTitle: string;
    ctaDescription: string;

    setLogoUrl: (url: string | null) => void;
    setAccentUrl: (url: string | null) => void;
    setFounder1Url: (url: string | null) => void;
    setFounder2Url: (url: string | null) => void;
    setFounder3Url: (url: string | null) => void;
    setHqPhoto1Url: (url: string | null) => void;
    setHqPhoto2Url: (url: string | null) => void;
    setHqPhoto3Url: (url: string | null) => void;

    // Content Setters
    setContent: (field: keyof BrandingState, value: string) => void;
}

export const useBrandingStore = create<BrandingState>()(
    persist(
        (set) => ({
            logoUrl: null,
            accentUrl: null,
            founder1Url: null,
            founder2Url: null,
            founder3Url: null,
            hqPhoto1Url: null,
            hqPhoto2Url: null,
            hqPhoto3Url: null,

            heroTitle1: 'Liderança que',
            heroTitleAccent1: 'conecta',
            heroTitle2: 'Propósito que',
            heroTitleAccent2: 'transforma',
            heroSubtitle: 'Desenvolvemos líderes humanizados através da integração entre neurociência, psicologia e gestão estratégica.',

            propTag: 'Nossa Filosofia',
            propTitle: 'Por que liderança humanizada?',
            propDescription: 'Acreditamos que liderança verdadeira nasce da conexão autêntica com as pessoas. Nossa abordagem integra ciência e empatia para desenvolver líderes que inspiram, não apenas gerenciam.',

            vertTag: 'Metodologia',
            vertTitle: 'Uma metodologia integrada',
            vertDescription: 'Três disciplinas que se complementam para formação completa de líderes humanizados.',

            servTag: 'Como podemos ajudar?',
            servTitle: 'Soluções para o seu desenvolvimento',
            servDescription: 'Programas desenhados para diferentes momentos da sua carreira e objetivos de aprendizado.',

            fasesTag: 'O Processo',
            fasesTitle: 'O caminho da transformação',
            fasesDescription: 'Cinco fases para desenvolver líderes humanizados. Cada etapa é cuidadosamente desenhada para promover crescimento sustentável e autêntico.',

            contTag: 'Contato',
            contTitle: 'Vamos conversar',
            contDescription: 'Tem dúvidas sobre nossos programas? Quer levar a Neuromind para sua organização? Estamos aqui para ajudar.',

            ctaTitle: 'Pronto para liderar com mais propósito?',
            ctaDescription: 'Entre em contato e descubra como a Neuromind pode apoiar sua jornada de desenvolvimento como líder humanizado.',

            setLogoUrl: (url) => set({ logoUrl: url }),
            setAccentUrl: (url) => set({ accentUrl: url }),
            setFounder1Url: (url) => set({ founder1Url: url }),
            setFounder2Url: (url) => set({ founder2Url: url }),
            setFounder3Url: (url) => set({ founder3Url: url }),
            setHqPhoto1Url: (url) => set({ hqPhoto1Url: url }),
            setHqPhoto2Url: (url) => set({ hqPhoto2Url: url }),
            setHqPhoto3Url: (url) => set({ hqPhoto3Url: url }),

            setContent: (field, value) => set({ [field]: value } as any),
        }),
        {
            name: 'branding-storage',
        }
    )
);
