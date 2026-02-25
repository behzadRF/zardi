"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    const t = useTranslations("About");

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/about_hero.png" // We will need to map this in next.config or just use the direct path if possible, but better to use a standard path
                    alt="ZARDI Office"
                    fill
                    className="object-cover opacity-60"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-white" />

                <div className="relative z-10 text-center px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-bold text-white tracking-tighter"
                    >
                        {t("title")}
                    </motion.h1>
                </div>
            </section>

            <section className="py-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-6 text-xl text-gray-600 leading-relaxed"
                            >
                                <p className="text-black font-medium text-2xl">
                                    {t("description_1")}
                                </p>
                                <p>
                                    {t("description_2")}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div>
                                    <p className="text-4xl font-bold text-black mb-2">10+</p>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Years Experience</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-bold text-black mb-2">150+</p>
                                    <p className="text-sm text-gray-400 uppercase tracking-widest font-bold">Luxury Projects</p>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="aspect-[4/5] relative rounded-[40px] overflow-hidden shadow-2xl"
                        >
                            <Image
                                src="/about_hero.png"
                                alt="Detail"
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
