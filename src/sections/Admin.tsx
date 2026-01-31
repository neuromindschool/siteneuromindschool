import React, { useState } from 'react';
import { useBrandingStore } from '../lib/store';
import { Upload, X, Save, RefreshCw, Type, Image as ImageIcon, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Admin() {
    const store = useBrandingStore();
    const [activeTab, setActiveTab] = useState<'branding' | 'content'>('branding');

    // Branding State
    const [selectedLogo, setSelectedLogo] = useState<string | null>(store.logoUrl);
    const [selectedAccent, setSelectedAccent] = useState<string | null>(store.accentUrl);
    const [selectedF1, setSelectedF1] = useState<string | null>(store.founder1Url);
    const [selectedF2, setSelectedF2] = useState<string | null>(store.founder2Url);
    const [selectedF3, setSelectedF3] = useState<string | null>(store.founder3Url);
    const [selectedHQ1, setSelectedHQ1] = useState<string | null>(store.hqPhoto1Url);
    const [selectedHQ2, setSelectedHQ2] = useState<string | null>(store.hqPhoto2Url);
    const [selectedHQ3, setSelectedHQ3] = useState<string | null>(store.hqPhoto3Url);

    // Content State
    const [content, setLocalContent] = useState({
        heroTitle1: store.heroTitle1,
        heroTitleAccent1: store.heroTitleAccent1,
        heroTitle2: store.heroTitle2,
        heroTitleAccent2: store.heroTitleAccent2,
        heroSubtitle: store.heroSubtitle,
        propTag: store.propTag,
        propTitle: store.propTitle,
        propDescription: store.propDescription,
        vertTag: store.vertTag,
        vertTitle: store.vertTitle,
        vertDescription: store.vertDescription,
        servTag: store.servTag,
        servTitle: store.servTitle,
        servDescription: store.servDescription,
        fasesTag: store.fasesTag,
        fasesTitle: store.fasesTitle,
        fasesDescription: store.fasesDescription,
        contTag: store.contTag,
        contTitle: store.contTitle,
        contDescription: store.contDescription,
        ctaTitle: store.ctaTitle,
        ctaDescription: store.ctaDescription,
    });

    const handleFileChange = (setter: React.Dispatch<React.SetStateAction<string | null>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setter(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleContentChange = (field: string, value: string) => {
        setLocalContent(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        // Save Images
        store.setLogoUrl(selectedLogo);
        store.setAccentUrl(selectedAccent);
        store.setFounder1Url(selectedF1);
        store.setFounder2Url(selectedF2);
        store.setFounder3Url(selectedF3);
        store.setHqPhoto1Url(selectedHQ1);
        store.setHqPhoto2Url(selectedHQ2);
        store.setHqPhoto3Url(selectedHQ3);

        // Save Content
        Object.entries(content).forEach(([field, value]) => {
            store.setContent(field as any, value);
        });

        alert('Configurações atualizadas com sucesso!');
    };

    const handleReset = () => {
        if (window.confirm('Certeza que deseja resetar todas as alterações?')) {
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF9F5] p-6 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="flex flex-col gap-2">
                        <Link to="/" className="flex items-center gap-1.5 text-sm font-bold text-[#6190E8] hover:text-[#001B2E] transition-colors mb-2 group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Voltar para o site
                        </Link>
                        <h1 className="text-4xl font-bold text-[#001B2E] mb-2 font-heading">Painel Admin</h1>
                        <p className="text-[#4A5568]">Personalize a experiência total da Neuromind School</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={handleReset} className="flex items-center gap-2 text-sm text-[#4A5568] hover:text-[#001B2E] transition-colors py-2 px-4">
                            <RefreshCw className="w-4 h-4" />
                            Descartar
                        </button>
                        <button onClick={handleSave} className="btn-primary flex items-center gap-2 py-3 px-8 shadow-glow">
                            <Save className="w-4 h-4" />
                            Salvar Alterações
                        </button>
                    </div>
                </header>

                {/* Tabs */}
                <div className="flex gap-1 bg-white p-1 rounded-2xl border border-[#E2E8F0] mb-8 w-fit">
                    <button
                        onClick={() => setActiveTab('branding')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'branding' ? 'bg-[#001B2E] text-white shadow-lg' : 'text-[#4A5568] hover:bg-gray-50'}`}
                    >
                        <ImageIcon className="w-4 h-4" />
                        Identidade Visual
                    </button>
                    <button
                        onClick={() => setActiveTab('content')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'content' ? 'bg-[#001B2E] text-white shadow-lg' : 'text-[#4A5568] hover:bg-gray-50'}`}
                    >
                        <Type className="w-4 h-4" />
                        Conteúdo e Textos
                    </button>
                </div>

                {activeTab === 'branding' ? (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Logo */}
                            <div className="bg-white rounded-[32px] p-8 shadow-soft border border-[#E2E8F0]">
                                <h3 className="text-lg font-bold text-[#001B2E] mb-6 flex items-center gap-2">Logo Principal</h3>
                                <div className="relative aspect-[3/1] rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors border-[#E2E8F0] hover:border-[#FAB015]">
                                    {selectedLogo ? (
                                        <>
                                            <img src={selectedLogo} alt="Logo" className="w-full h-full object-contain p-4" />
                                            <button onClick={() => setSelectedLogo(null)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                                        </>
                                    ) : (
                                        <label className="flex flex-col items-center cursor-pointer p-4">
                                            <Upload className="w-8 h-8 text-[#E2E8F0] mb-2" />
                                            <span className="text-xs text-[#4A5568]">Subir Logo</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange(setSelectedLogo)} />
                                        </label>
                                    )}
                                </div>
                            </div>
                            {/* Accent */}
                            <div className="bg-white rounded-[32px] p-8 shadow-soft border border-[#E2E8F0]">
                                <h3 className="text-lg font-bold text-[#001B2E] mb-6 flex items-center gap-2">Ícone de Destaque</h3>
                                <div className="relative aspect-square w-32 mx-auto rounded-2xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors border-[#E2E8F0] hover:border-[#FAB015]">
                                    {selectedAccent ? (
                                        <>
                                            <img src={selectedAccent} alt="Accent" className="w-full h-full object-contain p-4" />
                                            <button onClick={() => setSelectedAccent(null)} className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"><X className="w-4 h-4" /></button>
                                        </>
                                    ) : (
                                        <label className="flex flex-col items-center cursor-pointer p-4">
                                            <Upload className="w-8 h-8 text-[#E2E8F0] mb-2" />
                                            <span className="text-xs text-[#4A5568]">Subir Ícone</span>
                                            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange(setSelectedAccent)} />
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Team */}
                        <div className="bg-white rounded-[40px] p-10 shadow-soft border border-[#E2E8F0]">
                            <h3 className="text-xl font-bold text-[#001B2E] mb-8">Fotos dos Especialistas</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { state: selectedF3, setter: setSelectedF3, label: "Amanda Karla" },
                                    { state: selectedF1, setter: setSelectedF1, label: "Marcelo Pelicano" },
                                    { state: selectedF2, setter: setSelectedF2, label: "Daniella Santos" },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-4 text-center">
                                        <div className="relative aspect-square rounded-[32px] border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors border-[#E2E8F0] hover:border-[#FAB015]">
                                            {item.state ? (
                                                <>
                                                    <img src={item.state} alt="Preview" className="w-full h-full object-cover" />
                                                    <button onClick={() => item.setter(null)} className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"><X className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <label className="flex flex-col items-center cursor-pointer p-4">
                                                    <Upload className="w-8 h-8 text-[#E2E8F0] mb-2" />
                                                    <span className="text-xs font-medium">{item.label}</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange(item.setter)} />
                                                </label>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-[#001B2E]">{item.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* HQ Photos */}
                        <div className="bg-white rounded-[40px] p-10 shadow-soft border border-[#E2E8F0]">
                            <h3 className="text-xl font-bold text-[#001B2E] mb-8">Fotos da Sede (Natal-RN)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {[
                                    { state: selectedHQ1, setter: setSelectedHQ1, label: "Principal" },
                                    { state: selectedHQ2, setter: setSelectedHQ2, label: "Interna" },
                                    { state: selectedHQ3, setter: setSelectedHQ3, label: "Detalhe" },
                                ].map((item, idx) => (
                                    <div key={idx} className="space-y-4">
                                        <div className="relative aspect-video rounded-3xl border-2 border-dashed flex items-center justify-center overflow-hidden transition-colors border-[#E2E8F0] hover:border-[#FAB015]">
                                            {item.state ? (
                                                <>
                                                    <img src={item.state} alt="HQ" className="w-full h-full object-cover" />
                                                    <button onClick={() => item.setter(null)} className="absolute top-3 right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg"><X className="w-4 h-4" /></button>
                                                </>
                                            ) : (
                                                <label className="flex flex-col items-center cursor-pointer p-4 w-full h-full">
                                                    <Upload className="w-8 h-8 text-[#E2E8F0] mb-2" />
                                                    <span className="text-xs font-medium">{item.label}</span>
                                                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange(item.setter)} />
                                                </label>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Sections Text Management */}
                        {[
                            {
                                section: 'Hero (Capa)',
                                fields: [
                                    { id: 'heroTitle1', label: 'Título 1 (Normal)', type: 'text' },
                                    { id: 'heroTitleAccent1', label: 'Destaque 1 (Azul)', type: 'text' },
                                    { id: 'heroTitle2', label: 'Título 2 (Normal)', type: 'text' },
                                    { id: 'heroTitleAccent2', label: 'Destaque 2 (Amarelo)', type: 'text' },
                                    { id: 'heroSubtitle', label: 'Subtítulo Principal', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Filosofia (Por que...)',
                                fields: [
                                    { id: 'propTag', label: 'Etiqueta (Tag)', type: 'text' },
                                    { id: 'propTitle', label: 'Título da Seção', type: 'text' },
                                    { id: 'propDescription', label: 'Texto de Apoio', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Metodologia (Vertentes)',
                                fields: [
                                    { id: 'vertTag', label: 'Etiqueta (Tag)', type: 'text' },
                                    { id: 'vertTitle', label: 'Título da Seção', type: 'text' },
                                    { id: 'vertDescription', label: 'Texto de Apoio', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Soluções (Como ajudamos)',
                                fields: [
                                    { id: 'servTag', label: 'Etiqueta (Tag)', type: 'text' },
                                    { id: 'servTitle', label: 'Título da Seção', type: 'text' },
                                    { id: 'servDescription', label: 'Texto de Apoio', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Processo (Caminho)',
                                fields: [
                                    { id: 'fasesTag', label: 'Etiqueta (Tag)', type: 'text' },
                                    { id: 'fasesTitle', label: 'Título da Seção', type: 'text' },
                                    { id: 'fasesDescription', label: 'Texto de Apoio', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Contato',
                                fields: [
                                    { id: 'contTag', label: 'Etiqueta (Tag)', type: 'text' },
                                    { id: 'contTitle', label: 'Título da Seção', type: 'text' },
                                    { id: 'contDescription', label: 'Texto de Apoio', type: 'textarea' },
                                ]
                            },
                            {
                                section: 'Página de Destino (Final CTA)',
                                fields: [
                                    { id: 'ctaTitle', label: 'Título Final', type: 'text' },
                                    { id: 'ctaDescription', label: 'Texto Final', type: 'textarea' },
                                ]
                            }
                        ].map((group, gIdx) => (
                            <div key={gIdx} className="bg-white rounded-[32px] p-8 shadow-soft border border-[#E2E8F0]">
                                <h3 className="text-lg font-bold text-[#001B2E] mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-[#FAB015]" />
                                    {group.section}
                                </h3>
                                <div className="space-y-5">
                                    {group.fields.map((field) => (
                                        <div key={field.id} className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#4A5568] uppercase ml-1">{field.label}</label>
                                            {field.type === 'textarea' ? (
                                                <textarea
                                                    value={(content as any)[field.id]}
                                                    onChange={(e) => handleContentChange(field.id, e.target.value)}
                                                    rows={3}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-[#E2E8F0] text-sm focus:border-[#FAB015] focus:ring-1 focus:ring-[#FAB015] outline-none transition-all resize-none"
                                                />
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={(content as any)[field.id]}
                                                    onChange={(e) => handleContentChange(field.id, e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-[#E2E8F0] text-sm focus:border-[#FAB015] focus:ring-1 focus:ring-[#FAB015] outline-none transition-all"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center text-xs text-gray-400">
                    <p>© 2026 Neuromind School • Todos os títulos e textos agora podem ser customizados aqui.</p>
                </div>
            </div>
        </div>
    );
}
