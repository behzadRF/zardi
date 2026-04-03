"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TermsPage() {
    const t = useTranslations("TermsPage");

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Elegant Hero Section */}
            <section className="relative h-[45vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/terms_hero.png"
                    alt="Terms of Service"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-white" />

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
                    >
                        {t("title")}
                    </motion.h1>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12 bg-white -mt-10">
                <div className="max-w-4xl mx-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12 text-xl text-gray-500 leading-relaxed font-medium"
                    >
                        <p className="border-l-4 border-black pl-8 py-2 italic text-2xl text-black/80">
                            {t("content_1")}
                        </p>
                        <p>
                            {t("content_2")}
                        </p>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
