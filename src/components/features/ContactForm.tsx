"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { ContactSchema, type ContactInput } from "@/lib/validations/contact";
import { sendContactForm } from "@/lib/actions/contact";
import { useTranslations } from "next-intl";

export default function ContactForm() {
    const t = useTranslations("ContactPage");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactInput>({
        resolver: zodResolver(ContactSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            message: "",
            company: "", // Honeypot
        },
    });

    const onSubmit = async (data: ContactInput) => {
        setIsSubmitting(true);
        setResult(null);
        try {
            const response = await sendContactForm(data);
            setResult(response);
            if (response.success) {
                reset();
            }
        } catch (error) {
            setResult({ success: false, message: "An unexpected error occurred." });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 p-10 md:p-16 rounded-[48px] shadow-sm border border-gray-100 relative overflow-hidden"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                {/* Honeypot field - Hidden from users */}
                <div className="hidden">
                    <label>Company</label>
                    <input {...register("company")} tabIndex={-1} autoComplete="off" />
                </div>

                {/* Name Field */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">
                        {t("form_name")} <span className="text-red-500">*</span>
                    </label>
                    <input
                        {...register("name")}
                        type="text"
                        placeholder="Your Name"
                        className={`w-full bg-white border ${errors.name ? "border-red-500" : "border-gray-100"} rounded-2xl p-6 text-lg text-black focus:ring-2 focus:ring-black transition-all outline-none`}
                    />
                    {errors.name && <p className="text-red-500 text-sm ml-2">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email Field */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">
                            {t("form_email")}
                        </label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="email@example.com"
                            className={`w-full bg-white border ${errors.email ? "border-red-500" : "border-gray-100"} rounded-2xl p-6 text-lg text-black focus:ring-2 focus:ring-black transition-all outline-none`}
                        />
                        {errors.email && <p className="text-red-500 text-sm ml-2">{errors.email.message}</p>}
                    </div>

                    {/* Phone Field */}
                    <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">
                            {t("form_phone")}
                        </label>
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder="07xxx xxxxxx"
                            className={`w-full bg-white border ${errors.phone ? "border-red-500" : "border-gray-100"} rounded-2xl p-6 text-lg text-black focus:ring-2 focus:ring-black transition-all outline-none`}
                        />
                        {errors.phone && <p className="text-red-500 text-sm ml-2">{errors.phone.message}</p>}
                    </div>
                </div>

                {/* Message Field */}
                <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ml-2">
                        {t("form_message")} <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        {...register("message")}
                        rows={4}
                        placeholder="How can we help?"
                        className={`w-full bg-white border ${errors.message ? "border-red-500" : "border-gray-100"} rounded-2xl p-6 text-lg text-black focus:ring-2 focus:ring-black transition-all outline-none resize-none`}
                    />
                    {errors.message && <p className="text-red-500 text-sm ml-2">{errors.message.message}</p>}
                </div>

                {/* Status Message */}
                {result && (
                    <div className={`p-4 rounded-2xl text-center font-medium ${result.success ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                        {result.message}
                    </div>
                )}

                <button
                    disabled={isSubmitting}
                    className={`w-full bg-black text-white py-6 rounded-2xl font-bold text-xl hover:bg-gray-800 transition-all active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                    {isSubmitting ? "Sending..." : t("form_submit")}
                </button>
            </form>
        </motion.div>
    );
}
