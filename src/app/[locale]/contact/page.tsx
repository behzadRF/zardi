"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useTranslations } from "next-intl";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import siteConfig from "@/data/site-config.json";
import ContactForm from "@/components/features/ContactForm";

export default function ContactPage() {
    const t = useTranslations("ContactPage");
    const { contact } = siteConfig;

    return (
        <main className="min-h-screen bg-white">
            <Header />

            {/* Elegant Hero with Image */}
            <section className="relative h-[55vh] flex items-center justify-center overflow-hidden bg-black">
                <Image
                    src="/contact_hero.png"
                    alt="Contact Us"
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

            <section className="py-24 px-6 md:px-12 bg-white -mt-10 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-2xl text-gray-400 mb-12 leading-relaxed font-medium italic">
                                {t("subtitle")}
                            </p>

                            <div className="space-y-10">
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-black text-white rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                        <Phone className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t("phone")}</p>
                                        <div className="flex flex-col gap-2">
                                            <a href={`tel:${contact.mobile}`} className="text-3xl font-bold text-black hover:text-gray-500 transition-colors">
                                                {contact.mobile}
                                            </a>
                                            <a href={`tel:${contact.phone}`} className="text-3xl font-bold text-black hover:text-gray-500 transition-colors">
                                                {contact.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                                        <Mail className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t("email")}</p>
                                        <p className="text-3xl font-bold text-black group-hover:text-gray-600 transition-colors">{contact.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">{t("address")}</p>
                                        <p className="text-3xl font-bold text-black group-hover:text-gray-600 transition-colors font-sans">{contact.address}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <ContactForm />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
