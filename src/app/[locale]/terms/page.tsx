"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function TermsPage() {
    const t = useTranslations("TermsPage");

    return (
        <main className="min-h-screen bg-white">
            <Header />
            <section className="pt-40 pb-24 px-6 md:px-12">
                <div className="max-w-4xl mx-auto">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-bold mb-12"
                    >
                        {t("title")}
                    </motion.h1>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="prose prose-lg text-gray-600 leading-relaxed"
                    >
                        <p>{t("content")}</p>
                        <p className="mt-8">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </motion.div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
