// src/components/Navbar.jsx
"use client";

import React, { useState } from "react";
import { Globe, Menu, X, ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
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
      { label: "جدول المتابعة", href: "#tracking" },
      { label: "التسعيرة والاشتراك", href: "#pricing" },
    ],
    whatsappCta: "تواصل واتساب",
    langToggle: "English",
    whatsappUrl:
      "https://wa.me/?text=مرحباً%20كابتن%20نوح،%20أود%20الاستفسار%20عن%20جلسات%20التدريب%20الشخصي",
  },
  en: {
    brandName: "COACH NOUH",
    brandSubtitle: "Personal Trainer & Lifestyle",
    links: [
      { label: "Home", href: "#" },
      { label: "Methodology", href: "#methodology" },
      { label: "Progress Tracking", href: "#tracking" },
      { label: "Pricing & Plans", href: "#pricing" },
    ],
    whatsappCta: "WhatsApp Coach",
    langToggle: "العربية",
    whatsappUrl:
      "https://wa.me/?text=Hello%20Coach%20Nouh,%20I'd%20like%20to%20inquire%20about%20personal%20coaching",
  },
};

export default function Navbar({ lang = "ar", onToggleLang }) {
  const isRtl = lang === "ar";
  const t = NAV_CONTENT[lang] || NAV_CONTENT.ar;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      dir={isRtl ? "rtl" : "ltr"}
      className="sticky top-0 z-50 w-full border-b border-athar-border/70 bg-athar-cream/85 backdrop-blur-xl transition-all"
    >
      {/* ارتفاع بهینه هدر: h-14 در تبلت/موبایل و h-16 در لپ‌تاپ */}
      <div className="mx-auto flex h-14 md:h-16 max-w-6xl items-center justify-between px-4 sm:px-8">
        {/* ۱. لوگو و عنوان برند */}
        <a href="#" className="group flex items-center gap-2.5 sm:gap-3">
          <div className="relative flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-xl border border-athar-forest/20 bg-athar-forest text-athar-lime font-black text-lg shadow-athar-soft transition-transform duration-300 group-hover:scale-105">
            <span className="font-sans">N</span>
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-athar-lime ring-2 ring-athar-cream" />
          </div>

          <div className="flex flex-col text-start leading-none">
            <span className="text-sm sm:text-base font-black tracking-tight text-athar-forest-deep transition-colors group-hover:text-athar-forest">
              {t.brandName}
            </span>
            <span className="text-[9.5px] sm:text-[10px] font-semibold text-athar-muted block mt-1">
              {t.brandSubtitle}
            </span>
          </div>
        </a>

        {/* ۲. منوی دسکتاپ */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-bold text-athar-muted">
          {t.links.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative py-1 transition-colors hover:text-athar-forest-deep after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:scale-x-0 after:bg-athar-lime after:transition-transform hover:after:scale-x-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ۳. اکشن‌ها (دکمه زبان و واتس‌اپ) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onToggleLang}
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-athar-border bg-white/90 px-3 py-1.5 text-xs font-bold text-athar-forest shadow-2xs transition-all hover:border-athar-forest/40 hover:bg-white active:scale-95 cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-athar-forest" />
            <span>{t.langToggle}</span>
          </button>

          <a
            href={t.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-athar-forest px-4 py-1.5 text-xs font-bold text-white shadow-athar-soft transition-all hover:bg-athar-forest-deep active:scale-95 group"
          >
            <WhatsAppIcon className="w-3.5 h-3.5 text-athar-lime fill-current" />
            <span>{t.whatsappCta}</span>
            {isRtl ? (
              <ArrowLeft className="w-3.5 h-3.5 text-athar-lime transition-transform group-hover:-translate-x-0.5" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5 text-athar-lime transition-transform group-hover:translate-x-0.5" />
            )}
          </a>
        </div>

        {/* ۴. دکمه‌های کنترل موبایل */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onToggleLang}
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-athar-border bg-white/90 px-2.5 py-1 text-[11px] font-bold text-athar-forest shadow-2xs active:scale-95"
          >
            {isRtl ? "EN" : "عربي"}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle Navigation Menu"
            className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-athar-border bg-white text-athar-forest shadow-2xs active:scale-95"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* منوی کشویی موبایل */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden border-b border-athar-border bg-athar-cream/98 px-5 py-4 sm:hidden shadow-athar-float backdrop-blur-2xl"
          >
            <div className="flex flex-col gap-2.5">
              {t.links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-1.5 text-xs font-bold text-athar-forest-deep transition-colors hover:bg-white hover:text-athar-forest"
                >
                  {link.label}
                </a>
              ))}

              <div className="pt-2 border-t border-athar-border/70">
                <a
                  href={t.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-athar-forest py-2 text-xs font-bold text-white shadow-md active:scale-95"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-athar-lime fill-current" />
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
