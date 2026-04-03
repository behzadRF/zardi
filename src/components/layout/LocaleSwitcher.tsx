"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Languages, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LocaleSwitcher({ className }: { className?: string }) {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const locales = [
        { code: "en", label: "English" },
        { code: "fa", label: "فارسی" },
        { code: "de", label: "Deutsch" },
        { code: "ar", label: "العربية" },
    ];

    const currentLocale = locales.find((l) => l.code === locale) || locales[0];

    const handleLocaleChange = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
        setIsOpen(false);
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={cn("relative", className)} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 py-1 px-2 rounded-lg hover:bg-black/5 transition-colors cursor-pointer outline-none"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <Languages className="w-4 h-4 opacity-70" />
                <span className="text-sm font-medium">{currentLocale.label}</span>
                <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full mt-2 right-0 md:left-auto md:right-0 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[140px] z-[60]"
                        role="listbox"
                    >
                        <div className="py-1.5 px-1 bg-white">
                            {locales.map((l) => (
                                <button
                                    key={l.code}
                                    onClick={() => handleLocaleChange(l.code)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors text-left",
                                        locale === l.code
                                            ? "bg-gray-50 text-black font-semibold"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-black"
                                    )}
                                    style={{ direction: l.code === 'fa' || l.code === 'ar' ? 'rtl' : 'ltr' }}
                                >
                                    <span>{l.label}</span>
                                    {locale === l.code && <Check className="w-3.5 h-3.5 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
