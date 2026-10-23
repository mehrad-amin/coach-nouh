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
      className="min-h-screen bg-athar-cream text-athar-forest transition-colors"
    >
      <Navbar lang={lang} onToggleLang={toggleLanguage} />
      <HeroSection lang={lang} />
      <MethodologySection lang={lang} />
      <TestimonialsSection lang={lang} />
      <FitnessCalculator lang={lang} />
      <PricingSection lang={lang} />
      <FaqSection lang={lang} />
      <ContactSection lang={lang} />
      <BookingForm lang={lang} />
      <UnifiedFloatingDock lang={lang} />
    </div>
  );
}
