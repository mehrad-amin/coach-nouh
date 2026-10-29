// src/components/Navbar.jsx
"use client";

import React, { useState } from "react";
import { Globe, Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.73 14.82 12.18 15.87C12.76 16.12 13.22 16.27 13.57 16.38C14.16 16.57 14.7 16.54 15.12 16.48C15.59 16.41 16.57 15.89 16.77 15.31C16.98 14.73 16.98 14.24 16.92 14.13C16.86 14.03 16.7 13.97 16.46 13.85C16.22 13.73 15.04 13.15 14.82 13.07C14.6 12.99 14.44 12.95 14.28 13.19C14.12 13.43 13.66 13.97 13.52 14.13C13.38 14.29 13.24 14.31 13 14.19C12.76 14.07 11.98 13.82 11.06 13C10.34 12.36 9.85 11.57 9.71 11.33C9.57 11.09 9.7 10.96 9.82 10.84C9.93 10.73 10.06 10.55 10.18 10.41C10.3 10.27 10.34 10.17 10.42 10.01C10.5 9.85 10.46 9.71 10.4 9.59C10.34 9.47 9.88 8.33 9.68 7.87C9.49 7.42 9.29 7.48 9.15 7.47C9.02 7.46 8.86 7.46 8.7 7.46L8.53 7.33Z" />
    </svg>
  );
}

const NAV_CONTENT = {
  ar: {
    brandName: "كوتش نوح",
    brandSubtitle: "مدرب شخصي ونمط حياة",
    links: [
      { label: "الرئيسية", href: "#" },
      { label: "منهجية التدريب", href: "#methodology" },
      { label: "الحاسبة", href: "#calculator" },
      { label: "التسعيرة والاشتراك", href: "#pricing" },
    ],
    whatsappCta: "تواصل واتساب",
    langToggle: "English",
    whatsappUrl:
      "https://wa.me/96894486154?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D8%A7%D8%A8%D8%AA%D9%86%20%D9%86%D9%88%D8%AD%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A",
  },
  en: {
    brandName: "COACH NOUH",
    brandSubtitle: "Personal Trainer & Lifestyle",
    links: [
      { label: "Home", href: "#" },
      { label: "Methodology", href: "#methodology" },
      { label: "Calculator", href: "#calculator" },
      { label: "Pricing & Plans", href: "#pricing" },
    ],
    whatsappCta: "WhatsApp Coach",
    langToggle: "العربية",
    whatsappUrl:
      "https://wa.me/96894486154?text=Hello%20Coach%20Nouh,%20I'd%20like%20to%20inquire%20about%20personal%20coaching",
  },
};

export default function Navbar({ lang = "ar", onToggleLang }) {
  const isRtl = lang === "ar";
  const t = NAV_CONTENT[lang] || NAV_CONTENT.ar;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      /* گلس‌مورفیسم خالص: بدون هیچ رنگ پس‌زمینه کدر، با بلور شیشه‌ای نرم، خط مرزی مویی ترنسپرنت و سایه ملایم */
      className="fixed top-0 inset-x-0 z-50 w-full border-b border-white/[0.08] bg-white/[0.03] backdrop-blur-md supports-[backdrop-filter]:bg-white/[0.02] transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex h-14 md:h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* ۱. لوگو و نشان برند */}
        <a href="#" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/[0.08] text-athar-lime font-black text-lg backdrop-blur-lg shadow-sm transition-transform duration-300 group-hover:scale-105">
            <span className="font-sans">N</span>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-athar-lime ring-2 ring-black/40 animate-pulse" />
          </div>

          <div className="flex flex-col text-start leading-none">
            <span className="text-sm sm:text-base font-black tracking-tight text-white transition-colors group-hover:text-athar-lime drop-shadow-sm">
              {t.brandName}
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-medium text-slate-200/80 block mt-1 drop-shadow-xs">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* ۲. منوی پیوندها در دسکتاپ */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-bold text-slate-200">
          {t.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative py-1 transition-colors hover:text-white drop-shadow-xs after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:scale-x-0 after:bg-athar-lime after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ۳. اکشن‌ها (تغییر زبان و واتس‌اپ) */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onToggleLang}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.07] hover:bg-white/[0.14] px-3 py-1.5 text-xs font-bold text-slate-100 backdrop-blur-lg shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-athar-lime" />
            <span>{t.langToggle}</span>
          </button>

          <a
            href={t.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-athar-lime px-4 py-1.5 text-xs font-black text-athar-forest-deep shadow-[0_0_18px_rgba(167,217,87,0.35)] transition-all hover:bg-athar-lime-hover hover:shadow-[0_0_24px_rgba(167,217,87,0.55)] active:scale-95 group cursor-pointer"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-athar-forest-deep fill-current" />
            <span>{t.whatsappCta}</span>
            {isRtl ? (
              <ArrowLeft className="w-3.5 h-3.5 text-athar-forest-deep transition-transform group-hover:-translate-x-0.5 stroke-[2.5]" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-athar-forest-deep transition-transform group-hover:translate-x-0.5 stroke-[2.5]" />
            )}
          </a>
        </div>

        {/* ۴. کلیدهای کنترل در سایز موبایل */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.08] backdrop-blur-md px-2.5 py-1 text-[11px] font-bold text-slate-100 active:scale-95"
          >
            {isRtl ? "EN" : "عربي"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle Navigation Menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-white/15 bg-white/[0.08] text-white backdrop-blur-md shadow-xs active:scale-95 cursor-pointer"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-athar-lime" />
            ) : (
              <Menu className="h-4 w-4 text-slate-100" />
            )}
          </button>
        </div>
      </div>

      {/* منوی کشویی موبایل با شیشه کریستالی خالص */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-b border-white/10 bg-black/40 px-5 py-4 sm:hidden shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2">
              {t.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-xs font-bold text-slate-100 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2.5 mt-1 border-t border-white/10">
                <a
                  href={t.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-athar-lime py-2.5 text-xs font-black text-athar-forest-deep shadow-[0_0_20px_rgba(167,217,87,0.35)] active:scale-95"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-athar-forest-deep fill-current" />
                  <span>{t.whatsappCta}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
