"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const t = useTranslations("ProjectsPage");

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Dark Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/projects_hero.png"
                    alt="Our Portfolio"
                    fill
                    className="object-cover opacity-50"
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

            <section className="py-24 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-2xl text-gray-400 mb-20 max-w-3xl font-medium italic"
                    >
                        {t("coming_soon")}
                    </motion.p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="aspect-[16/10] bg-gray-50 rounded-[40px] overflow-hidden group relative cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex items-center justify-center">
                                    <span className="text-white font-bold text-xl px-8 py-3 border border-white/30 rounded-full backdrop-blur-md">{t("view_case_study")}</span>
                                </div>
                                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
                                <div className="absolute bottom-10 left-10 z-20">
                                    <div className="h-4 w-24 bg-black/20 rounded-full mb-3" />
                                    <div className="h-8 w-64 bg-black/40 rounded-full" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
