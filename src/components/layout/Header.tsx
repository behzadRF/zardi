"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import LocaleSwitcher from "./LocaleSwitcher";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const t = useTranslations("Common");
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const phoneNumber = "07916363315";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        // Check initial scroll position
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        // Disable scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => window.removeEventListener("scroll", handleScroll);
    }, [mobileMenuOpen]);

    const navItems = [
        { name: t("home"), href: "/" },
        { name: t("services"), href: "/services" },
        { name: t("projects"), href: "/projects" },
        { name: t("about"), href: "/about" },
        { name: t("contact"), href: "/contact" },
    ];

    return (
        <>
            <header
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12",
                    isScrolled ? "bg-white shadow-sm py-4" : "bg-transparent py-6",
                    mobileMenuOpen && "bg-transparent shadow-none"
                )}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className={cn("text-2xl font-bold tracking-tighter transition-colors", (isScrolled && !mobileMenuOpen) ? "text-black" : "text-white")}>
                        ZARDI
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn("text-sm font-medium transition-colors", isScrolled ? "text-black hover:text-gray-500" : "text-white/90 hover:text-white")}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <div className={cn("h-4 w-px mx-2 transition-colors", isScrolled ? "bg-gray-200" : "bg-white/30")} />

                        <a
                            href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border",
                                isScrolled
                                    ? "bg-black text-white border-black hover:bg-gray-800 shadow-md"
                                    : "bg-white/10 text-white border-white/20 hover:bg-white/20 backdrop-blur-sm"
                            )}
                        >
                            <Phone className="w-3.5 h-3.5" />
                            {phoneNumber}
                        </a>

                        <LocaleSwitcher className={isScrolled ? "text-black" : "text-white"} />
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        className={cn("md:hidden p-2 -mr-2 transition-colors relative z-[60]", (isScrolled && !mobileMenuOpen) ? "text-black" : "text-white")}
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay & Panel */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[55] md:hidden"
                        />

                        {/* Sheet Panel */}
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-[56] p-10 flex flex-col items-center md:hidden h-[75vh] shadow-[0_-20px_40px_rgba(0,0,0,0.3)]"
                        >
                            {/* Handle Bar */}
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mb-8 shrink-0" />

                            {/* Mobile Call CTA */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.1 }}
                                className="w-full mb-8"
                            >
                                <a
                                    href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                                    className="flex items-center justify-center gap-3 bg-black text-white w-full py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-95 transition-transform"
                                >
                                    <Phone className="w-5 h-5 fill-white text-white" />
                                    {phoneNumber}
                                </a>
                            </motion.div>

                            <div className="flex flex-col items-center gap-6 overflow-y-auto w-full pb-10">
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 + 0.1 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="text-2xl font-bold text-gray-900 active:text-black transition-colors"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="mt-4 pt-8 border-t border-gray-100 w-full flex justify-center"
                                >
                                    <LocaleSwitcher className="text-black scale-125 origin-center" />
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
