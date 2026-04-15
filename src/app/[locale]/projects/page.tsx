"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations, useLocale } from "next-intl";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, Maximize2, ExternalLink, Share2, Check } from "lucide-react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import toursData from "@/data/virtual-tours.json";

export default function ProjectsPage() {
    const t = useTranslations("ProjectsPage");
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [activeTour, setActiveTour] = useState<any>(null);
    const [copiedId, setCopiedId] = useState<string | null>(null);

    // Deep linking: check for tour ID in URL
    useEffect(() => {
        const tourId = searchParams.get("id");
        if (tourId) {
            const tour = toursData.find(t => t.id === tourId);
            if (tour) {
                setActiveTour(tour);
            }
        }
    }, [searchParams]);

    const handleOpenTour = (tour: any) => {
        setActiveTour(tour);
        // Update URL without reloading
        const params = new URLSearchParams(searchParams.toString());
        params.set("id", tour.id);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handleCloseTour = () => {
        setActiveTour(null);
        // Clear URL param
        const params = new URLSearchParams(searchParams.toString());
        params.delete("id");
        router.push(`${pathname}`, { scroll: false });
    };

    const handleShare = (e: React.MouseEvent, tourId: string) => {
        e.stopPropagation();
        const baseUrl = window.location.origin + pathname;
        const shareUrl = `${baseUrl}?id=${tourId}`;
        
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopiedId(tourId);
            setTimeout(() => setCopiedId(null), 2000);
        });
    };

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Dark Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/projects_hero.png"
                    alt="Our Portfolio"
                    fill
                    className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-white" />

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-6xl md:text-9xl font-bold text-white tracking-tighter"
                    >
                        {t("title")}
                    </motion.h1>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-white -mt-10 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl text-gray-400 mb-20 max-w-4xl font-medium italic leading-relaxed"
                    >
                        {t("coming_soon")}
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                        {toursData.map((tour, index) => (
                            <motion.div
                                key={tour.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                onClick={() => handleOpenTour(tour)}
                                className="group relative aspect-[16/10] bg-gray-100 rounded-[3rem] overflow-hidden cursor-pointer shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                            >
                                <Image
                                    src={tour.image}
                                    alt={locale === 'fa' ? tour.title_fa : tour.title_en}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center gap-4">
                                     <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30">
                                        <Maximize2 className="text-white w-8 h-8" />
                                     </div>
                                     <span className="text-white font-bold text-sm tracking-widest uppercase">{t("view_tour")}</span>
                                </div>

                                {/* Share Button */}
                                <button
                                    onClick={(e) => handleShare(e, tour.id)}
                                    className="absolute top-8 right-8 z-30 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white hover:bg-white transition-all hover:text-black group/share"
                                    title="Share Copy Link"
                                >
                                    {copiedId === tour.id ? <Check className="w-5 h-5" /> : <Share2 className="w-5 h-5" />}
                                </button>

                                <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 to-transparent z-20">
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{locale === 'fa' ? tour.title_fa : tour.title_en}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fullscreen Tour Viewer */}
            <AnimatePresence>
                {activeTour && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-6 md:px-12">
                            <h2 className="text-white font-bold text-xl md:text-2xl tracking-tight">
                                {locale === 'fa' ? activeTour.title_fa : activeTour.title_en}
                            </h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={(e) => handleShare(e, activeTour.id)}
                                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20 font-bold text-sm"
                                >
                                    {copiedId === activeTour.id ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                                    {copiedId === activeTour.id ? "Link Copied" : "Share Link"}
                                </button>
                                <a 
                                    href={activeTour.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all border border-white/20"
                                >
                                    <ExternalLink className="w-6 h-6" />
                                </a>
                                <button 
                                    onClick={handleCloseTour}
                                    className="p-3 rounded-full bg-white text-black hover:bg-gray-200 transition-all"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 w-full h-full relative p-4 md:p-12 pt-0">
                            <motion.div 
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="w-full h-full bg-gray-900 rounded-[3rem] overflow-hidden shadow-3xl border border-white/10"
                            >
                                <iframe 
                                    src={`${activeTour.url}&play=1`}
                                    className="w-full h-full border-0"
                                    allowFullScreen
                                    allow="xr-spatial-tracking"
                                />
                            </motion.div>
                        </div>
                        
                        <div className="p-8 text-center bg-transparent">
                             <button 
                                onClick={handleCloseTour}
                                className="text-white/50 hover:text-white transition-colors text-sm uppercase tracking-[0.3em]"
                             >
                                {t("back_to_list")}
                             </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
