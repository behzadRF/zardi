"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import servicesData from "@/data/services.json";
import { Paintbrush, Home, Layout } from "lucide-react";

const icons = {
    "interior-fit-out": Home,
    "refurbishment": Paintbrush,
    "consultancy": Layout,
};

export default function Services() {
    const t = useTranslations("Common");
    const tServices = useTranslations("Services");

    return (
        <section className="py-24 px-6 md:px-12 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                            {t("services")}
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-black leading-tight">
                            {tServices("subtitle")}
                        </h3>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => {
                        const Icon = icons[service.id as keyof typeof icons] || Home;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-10 rounded-2xl shadow-sm hover:shadow-xl transition-shadow group border border-gray-100"
                            >
                                <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-colors">
                                    <Icon className="w-7 h-7" />
                                </div>
                                <h4 className="text-2xl font-bold mb-4">{tServices(`items.${service.id}.title`)}</h4>
                                <p className="text-gray-600 leading-relaxed">
                                    {tServices(`items.${service.id}.description`)}
                                </p>
                                <div className="mt-8 h-px w-0 bg-black group-hover:w-full transition-all duration-500" />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
