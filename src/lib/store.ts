import { create } from 'zustand';
import { supabase } from './supabase';

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

    isLoading: boolean;

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

    // Supabase Methods
    initialize: () => Promise<void>;
    saveToSupabase: () => Promise<void>;
}

const DEFAULT_CONTENT = {
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
    contTitle: 'Imersões',
    contDescription: 'Tem dúvidas sobre nossos programas? Quer levar a Neuromind para sua organização? Estamos aqui para ajudar.',

    ctaTitle: 'Pronto para liderar com mais propósito?',
    ctaDescription: 'Entre em contato e descubra como a Neuromind pode apoiar sua jornada de desenvolvimento como líder humanizado.',
};

const mapDbToStore = (dbData: any) => ({
    logoUrl: dbData.logo_url,
    accentUrl: dbData.accent_url,
    founder1Url: dbData.founder1_url,
    founder2Url: dbData.founder2_url,
    founder3Url: dbData.founder3_url,
    hqPhoto1Url: dbData.hq_photo1_url,
    hqPhoto2Url: dbData.hq_photo2_url,
    hqPhoto3Url: dbData.hq_photo3_url,
    heroTitle1: dbData.hero_title1,
    heroTitleAccent1: dbData.hero_title_accent1,
    heroTitle2: dbData.hero_title2,
    heroTitleAccent2: dbData.hero_title_accent2,
    heroSubtitle: dbData.hero_subtitle,
    propTag: dbData.prop_tag,
    propTitle: dbData.prop_title,
    propDescription: dbData.prop_description,
    vertTag: dbData.vert_tag,
    vertTitle: dbData.vert_title,
    vertDescription: dbData.vert_description,
    servTag: dbData.serv_tag,
    servTitle: dbData.serv_title,
    servDescription: dbData.serv_description,
    fasesTag: dbData.fases_tag,
    fasesTitle: dbData.fases_title,
    fasesDescription: dbData.fases_description,
    contTag: dbData.cont_tag,
    contTitle: dbData.cont_title,
    contDescription: dbData.cont_description,
    ctaTitle: dbData.cta_title,
    ctaDescription: dbData.cta_description,
});

const mapStoreToDb = (store: any) => ({
    logo_url: store.logoUrl,
    accent_url: store.accentUrl,
    founder1_url: store.founder1Url,
    founder2_url: store.founder2Url,
    founder3_url: store.founder3Url,
    hq_photo1_url: store.hqPhoto1Url,
    hq_photo2_url: store.hqPhoto2Url,
    hq_photo3_url: store.hqPhoto3Url,
    hero_title1: store.heroTitle1,
    hero_title_accent1: store.heroTitleAccent1,
    hero_title2: store.heroTitle2,
    hero_title_accent2: store.heroTitleAccent2,
    hero_subtitle: store.heroSubtitle,
    prop_tag: store.propTag,
    prop_title: store.propTitle,
    prop_description: store.propDescription,
    vert_tag: store.vertTag,
    vert_title: store.vertTitle,
    vert_description: store.vertDescription,
    serv_tag: store.servTag,
    serv_title: store.servTitle,
    serv_description: store.servDescription,
    fases_tag: store.fasesTag,
    fases_title: store.fasesTitle,
    fases_description: store.fasesDescription,
    cont_tag: store.contTag,
    cont_title: store.contTitle,
    cont_description: store.contDescription,
    cta_title: store.ctaTitle,
    cta_description: store.ctaDescription,
});

export const useBrandingStore = create<BrandingState>((set, get) => ({
    ...DEFAULT_CONTENT,
    isLoading: true,

    setLogoUrl: (url) => set({ logoUrl: url }),
    setAccentUrl: (url) => set({ accentUrl: url }),
    setFounder1Url: (url) => set({ founder1Url: url }),
    setFounder2Url: (url) => set({ founder2Url: url }),
    setFounder3Url: (url) => set({ founder3Url: url }),
    setHqPhoto1Url: (url) => set({ hqPhoto1Url: url }),
    setHqPhoto2Url: (url) => set({ hqPhoto2Url: url }),
    setHqPhoto3Url: (url) => set({ hqPhoto3Url: url }),

    setContent: (field, value) => set({ [field]: value } as any),

    initialize: async () => {
        try {
            const { data, error } = await supabase
                .from('branding')
                .select('*')
                .maybeSingle();

            if (error) throw error;
            if (data) {
                // If the record exists but and has any null content fields, we might want to fill them with defaults
                // For simplicity, we just merge with defaults
                const mapped = mapDbToStore(data);
                const cleaned = Object.fromEntries(
                    Object.entries(mapped).filter(([_, v]) => v !== null)
                );
                set({ ...cleaned, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (error) {
            console.error('Error loading branding:', error);
            set({ isLoading: false });
        }
    },

    saveToSupabase: async () => {
        try {
            const state = get();
            const dbData = mapStoreToDb(state);

            // First, check if a row exists
            const { data: existing } = await supabase.from('branding').select('id').maybeSingle();

            if (existing) {
                const { error } = await supabase
                    .from('branding')
                    .update(dbData)
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('branding')
                    .insert([dbData]);
                if (error) throw error;
            }
        } catch (error) {
            console.error('Error saving branding:', error);
            throw error;
        }
    }
}));
