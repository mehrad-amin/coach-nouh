// src/components/UnifiedFloatingDock.jsx
"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Flame,
  ShieldCheck,
  ArrowDown,
  X,
  Sparkles,
} from "lucide-react";

export default function UnifiedFloatingDock({ lang = "ar" }) {
  const isRtl = lang === "ar";

  const [biomechanics, setBiomechanics] = useState(null);
  const [calcData, setCalcData] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isNearBooking, setIsNearBooking] = useState(false);

  // لود داده‌های ذخیره‌شده از تعاملات کاربر در نشست جاری
  useEffect(() => {
    try {
      const bio = sessionStorage.getItem("user_biomechanics_audit");
      if (bio) setBiomechanics(JSON.parse(bio));

      const calc = sessionStorage.getItem("user_fitness_data");
      if (calc) setCalcData(JSON.parse(calc));

      const plan = sessionStorage.getItem("user_selected_plan");
      if (plan) setSelectedPlan(JSON.parse(plan));
    } catch (e) {
      console.error("Session storage read error:", e);
    }

    const handleBioUpdate = (e) => setBiomechanics(e.detail || null);
    const handleCalcUpdate = (e) => setCalcData(e.detail || null);
    const handlePlanUpdate = (e) => setSelectedPlan(e.detail || null);

    window.addEventListener("biomechanics_audit_updated", handleBioUpdate);
    window.addEventListener("fitness_calc_updated", handleCalcUpdate);
    window.addEventListener("plan_selected", handlePlanUpdate);
    window.addEventListener("fitness_plan_selected", handlePlanUpdate);

    return () => {
      window.removeEventListener("biomechanics_audit_updated", handleBioUpdate);
      window.removeEventListener("fitness_calc_updated", handleCalcUpdate);
      window.removeEventListener("plan_selected", handlePlanUpdate);
      window.removeEventListener("fitness_plan_selected", handlePlanUpdate);
    };
  }, []);

  // ناظر اسکرول: مخفی‌سازی هوشمند نوار شناور هنگام رسیدن به فرم نهایی ثبت‌نام
  useEffect(() => {
    const bookingEl = document.getElementById("booking");
    if (!bookingEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearBooking(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(bookingEl);
    return () => observer.disconnect();
  }, []);

  // اگر کاربر هنوز گزینه‌ای را انتخاب نکرده یا به فرم رسیده، چیزی رندر نمی‌شود
  const hasItems = Boolean(biomechanics || calcData || selectedPlan);
  if (!hasItems || isNearBooking) {
    return null;
  }

  const scrollToBooking = () => {
    const el = document.getElementById("booking");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const bioDisplayName = isRtl
    ? biomechanics?.nameAr?.split(" ")[0] +
      " " +
      (biomechanics?.nameAr?.split(" ")[1] || "")
    : biomechanics?.nameEn?.split(" ")[0] || "";

  const planDisplayName =
    selectedPlan?.title?.split(" ")[0] +
    " " +
    (selectedPlan?.title?.split(" ")[1] || "");

  return (
    <aside
      dir={isRtl ? "rtl" : "ltr"}
      aria-label={
        isRtl ? "شريط التقييم والخطة المختارة" : "Active Assessment Dock"
      }
      className={`fixed bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-1.25rem)] max-w-xl md:max-w-2xl z-50 transition-all duration-300 ease-out ${
        isNearBooking
          ? "opacity-0 translate-y-12 pointer-events-none"
          : "opacity-100 translate-y-0 pointer-events-auto"
      }`}
    >
      {/* کانتینر اصلی نوار شناور با دارک گلس‌مورفیسم لوکس و سایه نوری لیمویی */}
      <div className="w-full rounded-2xl sm:rounded-3xl border border-white/15 bg-[#08120d]/90 backdrop-blur-2xl p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_20px_rgba(167,217,87,0.12)] antialiased">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* ردیف بج‌های تعاملی با اسکرول افقی بدون شکستگی */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 min-w-0 flex-1">
            {/* ۱. بج ارزیابی حرکتی و مفاصل */}
            {biomechanics && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 px-2.5 py-1.5 text-white shadow-xs">
                <Activity className="w-3.5 h-3.5 text-athar-lime animate-pulse shrink-0" />
                <span className="text-[11px] font-black truncate max-w-[100px] sm:max-w-[130px]">
                  {bioDisplayName}
                </span>
                {biomechanics.riskReduction && (
                  <span className="text-[9px] font-sans font-bold text-athar-lime bg-athar-lime/20 border border-athar-lime/30 px-1 py-0.5 rounded">
                    -{biomechanics.riskReduction}
                  </span>
                )}
                <button
                  type="button"
                  aria-label={isRtl ? "إلغاء التقييم" : "Remove Assessment"}
                  onClick={() => {
                    sessionStorage.removeItem("user_biomechanics_audit");
                    setBiomechanics(null);
                  }}
                  className="p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ۲. بج کالری محاسبه‌شده از ماشین‌حساب محمد */}
            {calcData && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 px-2.5 py-1.5 text-white shadow-xs">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-current shrink-0" />
                <span className="text-[11px] font-sans font-black text-white">
                  {calcData.result?.targetCalories || calcData.result?.calories}
                </span>
                <span className="text-[9px] font-bold text-athar-lime">
                  {isRtl ? "سعرة" : "KCAL"}
                </span>
                <button
                  type="button"
                  aria-label={isRtl ? "إلغاء السعرات" : "Remove Calories"}
                  onClick={() => {
                    sessionStorage.removeItem("user_fitness_data");
                    setCalcData(null);
                  }}
                  className="p-0.5 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ۳. بج اشتراک و بسته تمرینی انتخابی */}
            {selectedPlan && (
              <div className="inline-flex items-center gap-1.5 shrink-0 rounded-xl bg-athar-lime/15 border border-athar-lime/40 px-2.5 py-1.5 text-white shadow-xs ring-1 ring-athar-lime/30">
                <ShieldCheck className="w-3.5 h-3.5 text-athar-lime shrink-0" />
                <span className="text-[11px] font-black truncate max-w-[90px] sm:max-w-[120px]">
                  {planDisplayName}
                </span>
                <span className="text-[10px] font-sans font-bold text-athar-lime whitespace-nowrap">
                  {selectedPlan.price}
                </span>
                <button
                  type="button"
                  aria-label={isRtl ? "إلغاء الباقة" : "Remove Plan"}
                  onClick={() => {
                    sessionStorage.removeItem("user_selected_plan");
                    setSelectedPlan(null);
                  }}
                  className="p-0.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* دکمه اقدام نهایی لیمویی با کنتراست و درخشش نئونی */}
          <button
            type="button"
            onClick={scrollToBooking}
            className="shrink-0 flex items-center justify-center gap-1.5 cursor-pointer rounded-xl sm:rounded-2xl bg-athar-lime hover:bg-athar-lime-hover text-athar-forest-deep px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black shadow-[0_0_18px_rgba(167,217,87,0.35)] transition-all duration-200 active:scale-95 whitespace-nowrap"
          >
            <span>{isRtl ? "استكمال الحجز" : "Proceed to Booking"}</span>
            <ArrowDown className="w-3.5 h-3.5 stroke-[2.5] text-athar-forest-deep animate-bounce" />
          </button>
        </div>
      </div>
    </aside>
  );
}
