"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Phone, Mail, MapPin, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
    const t = useTranslations("Common");
    const tFooter = useTranslations("Footer");
    const currentYear = new Date().getFullYear();
    const phoneNumber = "07916363315";

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("services"), href: "/services" },
        { name: t("projects"), href: "/projects" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link href="/" className="text-2xl font-bold tracking-tighter">
                            ZARDI
                        </Link>
                        <p className="text-gray-500 leading-relaxed max-w-xs">
                            {tFooter("tagline")}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-black hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-8">
                            {tFooter("quick_links")}
                        </h4>
                        <ul className="space-y-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link href={item.href} className="text-gray-500 hover:text-black transition-colors">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="lg:col-span-2">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-black mb-8">
                            {tFooter("contact_us")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">{tFooter("address_label")}</p>
                                        <p className="text-gray-900 font-medium">{tFooter("address_value")}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">{tFooter("email_label")}</p>
                                        <p className="text-gray-900 font-medium">info@zardi.co.uk</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">{tFooter("phone_label")}</p>
                                        <a href={`tel:${phoneNumber}`} className="text-gray-900 font-medium hover:text-black transition-colors">
                                            {phoneNumber}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-gray-400">
                        © {currentYear} ZARDI. {tFooter("rights")}
                    </p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
