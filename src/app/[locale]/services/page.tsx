"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import ServicesSection from "@/components/home/Services";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesPage() {
    const t = useTranslations("ServicesPage");

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/services_hero.png"
                    alt="Our Expertise"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4"
                    >
                        {t("title")}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/80 text-xl max-w-2xl mx-auto font-medium"
                    >
                        {t("subtitle")}
                    </motion.p>
                </div>
            </section>

            <section className="py-20 bg-white">
                <ServicesSection />
            </section>

            {/* Additional Services Pitch */}
            <section className="py-24 bg-gray-50 px-6 md:px-12">
                <div className="max-w-7xl mx-auto text-center space-y-12">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-black">{t("why_title")}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">{t("quality_title")}</h3>
                            <p className="text-gray-500 italic">"{t("quality_desc")}"</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">{t("execution_title")}</h3>
                            <p className="text-gray-500 italic">"{t("execution_desc")}"</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl shadow-sm border border-gray-100">
                            <h3 className="text-xl font-bold mb-4">{t("bespoke_title")}</h3>
                            <p className="text-gray-500 italic">"{t("bespoke_desc")}"</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
