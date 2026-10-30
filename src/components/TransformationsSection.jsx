// src/components/TransformationsSection.jsx
"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Activity } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* دیتای اختصاصی نتایج شاگردان کابتن بر اساس رویکرد موبیلیتی و استقلال تمرینی */
/* -------------------------------------------------------------------------- */
const TRANSFORMATIONS_DATA = {
  ar: {
    badge: "نتائج واقعية وموثقة",
    title: "تحولات بدنی واستعادة القدرة الحركية",
    subtitle:
      "نماذج حقيقية لمشتركين اكتسبوا الوعي الحركي، وحرروا مفاصلهم، ووصلوا إلى الجاهزية البدنية التامة بدون تعقيد.",
    items: [
      {
        id: 1,
        name: "أحمد البلوشي",
        period: "١٢ أسبوع",
        achievement:
          "تحرير مفصل الكتف وتخفيف آلام أسفل الظهر الناتجة عن الجلوس الطويل، مع خسارة ٨ كجم دهون وزيادة ملحوظة في المرونة.",
        beforeImg: "/images/transformations/before-1.jpg",
        afterImg: "/images/transformations/after-1.jpg",
      },

      {
        id: 3,
        name: "خالد المقبالي",
        period: "٨ أسابيع",
        achievement:
          "تحسين كفاءة التنفس، وخفة الحركة اليومية، وتحقيق انخفاض ملحوظ في قياسات الخصر مع الالتزام بأدوات بسيطة وجدول مرن.",
        beforeImg: "/images/transformations/before-4.jpg",
        afterImg: "/images/transformations/after-4.jpg",
      },
    ],
  },
  en: {
    badge: "Documented Results",
    title: "Physical Transformations & Kinetic Autonomy",
    subtitle:
      "Real trainees who restored joint mobility, shed body fat, and mastered independent training routines without reliance on machines.",
    items: [
      {
        id: 1,
        name: "Ahmed Al-Balushi",
        period: "12 Weeks",
        achievement:
          "Restored shoulder mobility, relieved posture-induced lower back tension, lost 8kg of fat, and gained complete daily agility.",
        beforeImg: "/images/transformations/before-1.jpg",
        afterImg: "/images/transformations/after-1.jpg",
      },

      {
        id: 3,
        name: "Khalid Al-Maqbali",
        period: "8 Weeks",
        achievement:
          "Substantial respiratory conditioning, overall body recomposition, and seamless adherence using lean home & gym equipment.",
        beforeImg: "/images/transformations/before-4.jpg",
        afterImg: "/images/transformations/after-4.jpg",
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* کامپوننت داخلی اسلایدر قبل و بعد (دارک‌لاکچری با خط لیزر لیمویی)           */
/* -------------------------------------------------------------------------- */
function BeforeAfterSlider({ item, lang = "ar" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  const isRtl = lang === "ar";
  const tiltY = ((sliderPosition - 50) / 50) * 4.5;
  const offsetPercent = 100 - sliderPosition;

  const t = {
    before: isRtl ? "قبل" : "Before",
    after: isRtl ? "بعد" : "After",
    hint: isRtl ? "اسحب المؤشر للمقارنة" : "Drag slider to compare",
    ariaLabel: isRtl
      ? "مؤشر مقارنة قبل وبعد"
      : "Before and after comparison slider",
  };

  return (
    <div
      ref={containerRef}
      style={{
        transform: isInteracting
          ? `perspective(1000px) rotateY(${tiltY}deg) scale3d(1.01, 1.01, 1.01)`
          : "perspective(1000px) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isInteracting
          ? "none"
          : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#08130e] p-3.5 sm:p-4 shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-all hover:border-athar-lime/30 w-full antialiased"
    >
      {/* هاله ظریف در هاور پشت کارت */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${sliderPosition}% 50%, rgba(167, 217, 87, 0.08), transparent 70%)`,
        }}
      />

      <div
        dir="ltr"
        className="relative aspect-4/5 w-full select-none overflow-hidden rounded-2xl bg-[#06100b] shadow-inner"
      >
        {/* تصویر بعد (After) */}
        <div className="absolute inset-0">
          <Image
            src={item.afterImg}
            alt={`${item.name} - ${t.after}`}
            fill
            sizes="(max-width: 768px) 85vw, 420px"
            className="object-cover object-center"
          />
        </div>

        {/* تصویر قبل (Before) با برش افقی */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${offsetPercent}% 0 0)` }}
        >
          <Image
            src={item.beforeImg}
            alt={`${item.name} - ${t.before}`}
            fill
            sizes="(max-width: 768px) 85vw, 420px"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px]" />
        </div>

        {/* خط لیزر برش به رنگ athar-lime */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-athar-lime shadow-[0_0_15px_rgba(167,217,87,1),0_0_30px_rgba(167,217,87,0.5)]"
          style={{ right: `${offsetPercent}%` }}
        >
          {/* دستگیره دایره‌ای با فلش‌های متقابل */}
          <div className="absolute top-1/2 -right-4 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#06100b] bg-athar-lime shadow-[0_0_18px_rgba(167,217,87,0.9)]">
            <svg
              className="h-3.5 w-3.5 text-athar-forest-deep"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 9l-3 3 3 3m8-6l3 3-3 3"
              />
            </svg>
          </div>
        </div>

        {/* برچسب‌های بعد و قبل */}
        <span className="pointer-events-none absolute top-3.5 right-3.5 rounded-xl border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-black text-white shadow-lg backdrop-blur-md">
          {t.after}
        </span>
        <span className="pointer-events-none absolute top-3.5 left-3.5 rounded-xl border border-athar-lime/40 bg-athar-lime/90 px-2.5 py-1 text-[11px] font-black text-athar-forest-deep shadow-[0_0_15px_rgba(167,217,87,0.4)] backdrop-blur-md">
          {t.before}
        </span>

        {/* اینپوت لمسی شفاف برای درگ */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPosition}
          onChange={handleSliderChange}
          onPointerDown={() => setIsInteracting(true)}
          onPointerUp={() => setIsInteracting(false)}
          onTouchStart={() => setIsInteracting(true)}
          onTouchEnd={() => setIsInteracting(false)}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 touch-pan-y"
          aria-label={t.ariaLabel}
        />

        {/* راهنمای لمس */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur-md whitespace-nowrap">
          {t.hint}
        </div>
      </div>

      {/* مشخصات و دستاورد شاگرد */}
      <div className="mt-4 px-1 text-start">
        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-black tracking-tight text-white">
            {item.name}
          </span>
          <span className="rounded-xl border border-athar-lime/30 bg-[#0c1f15] px-2.5 py-1 text-[11px] font-sans font-bold text-athar-lime whitespace-nowrap">
            {item.period}
          </span>
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-300 font-medium">
          {item.achievement}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* کامپوننت اصلی سکشن تحولات                                                  */
/* -------------------------------------------------------------------------- */
export default function TransformationsSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const content = TRANSFORMATIONS_DATA[lang] || TRANSFORMATIONS_DATA.ar;
  const items = content.items;

  const [currentIndex, setCurrentIndex] = useState(0);
  const total = items.length;

  if (!total) return null;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentItem = items[currentIndex];

  return (
    <section
      id="transformations"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 sm:py-24 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep border-t border-white/5"
    >
      {/* هاله استودیویی پس‌زمینه */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        {/* هدر بخش */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <Activity className="h-3.5 w-3.5 text-athar-lime" />
            <span className="text-xs font-bold text-athar-cream tracking-wide">
              {content.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
            {content.title}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-300/90 max-w-xl mx-auto leading-relaxed font-medium">
            {content.subtitle}
          </p>
        </div>

        {/* کانتینر اسلایدر کارت */}
        <div className="relative mx-auto flex max-w-[440px] flex-col items-center">
          <div
            key={currentItem.id || currentIndex}
            className="w-full transition-all duration-300 animate-in fade-in zoom-in-95"
          >
            <BeforeAfterSlider item={currentItem} lang={lang} />
          </div>

          {/* نوار کنترل اسلایدر */}
          <div className="mt-6 flex w-full items-center justify-between px-2">
            <button
              onClick={handlePrev}
              type="button"
              aria-label="Previous Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#08130e] text-white transition-all hover:border-athar-lime/50 hover:text-athar-lime hover:shadow-[0_0_15px_rgba(167,217,87,0.2)] active:scale-95 cursor-pointer"
            >
              {isRtl ? (
                <ChevronRight className="h-5 w-5 stroke-[2.2]" />
              ) : (
                <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
              )}
            </button>

            <div className="flex flex-col items-center gap-1.5">
              <span className="font-sans text-xs font-black tracking-widest text-athar-lime">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>

              <div className="flex items-center gap-1.5">
                {items.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    type="button"
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === idx
                        ? "w-5 bg-athar-lime shadow-[0_0_8px_rgba(167,217,87,0.6)]"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleNext}
              type="button"
              aria-label="Next Transformation"
              className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#08130e] text-white transition-all hover:border-athar-lime/50 hover:text-athar-lime hover:shadow-[0_0_15px_rgba(167,217,87,0.2)] active:scale-95 cursor-pointer"
            >
              {isRtl ? (
                <ChevronLeft className="h-5 w-5 stroke-[2.2]" />
              ) : (
                <ChevronRight className="h-5 w-5 stroke-[2.2]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
