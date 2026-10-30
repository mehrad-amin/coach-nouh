// src/app/page.jsx
"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MethodologySection from "@/components/MethodologySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FitnessCalculator from "@/components/FitnessCalculator";
import UnifiedFloatingDock from "@/components/UnifiedFloatingDock";
import PricingSection from "@/components/PricingSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import BookingForm from "@/components/BookingForm";

export default function Home() {
  const [lang, setLang] = useState("ar");

  const toggleLanguage = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <div
      dir={lang === "ar" ? "rtl" : "ltr"}
      /* یکدست‌سازی بستر کلی پروژه با پایه استودیویی تیره و حذف هرگونه شکست رنگ در لبه‌ها */
      className="min-h-screen bg-[#06100b] text-slate-100 selection:bg-athar-lime selection:text-athar-forest-deep transition-colors antialiased overflow-x-hidden"
    >
      <Navbar lang={lang} onToggleLang={toggleLanguage} />
      <main>
        <HeroSection lang={lang} />
        <MethodologySection lang={lang} />
        <TestimonialsSection lang={lang} />
        <FitnessCalculator lang={lang} />
        <PricingSection lang={lang} />
        <FaqSection lang={lang} />
        <ContactSection lang={lang} />
        <BookingForm lang={lang} />
      </main>
      <UnifiedFloatingDock lang={lang} />
    </div>
  );
}
