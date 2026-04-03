"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const t = useTranslations("Hero");

    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center px-6 md:px-12">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
                    alt={t("image_alt")}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-tight">
                        {t("title")}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="mt-6 text-xl md:text-2xl text-white/90 max-w-2xl font-light"
                >
                    {t("subtitle")}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="mt-10"
                >
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 active:scale-95 shadow-xl"
                    >
                        {t("cta")}
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </motion.div>
            </div>

            {/* Decorative vertical line */}
            <div className="absolute bottom-0 right-12 w-px h-32 bg-white/30 hidden md:block" />
        </section>
    );
}
