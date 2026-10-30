// src/components/BeforeAfterSlider.jsx
"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function BeforeAfterSlider({ item, lang = "ar" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef(null);

  const handleSliderChange = (e) => {
    setSliderPosition(Number(e.target.value));
  };

  const isRtl = lang === "ar";
  const tiltY = ((sliderPosition - 50) / 50) * 4.5;
  const offsetPercent = 100 - sliderPosition;

  // متن‌های دوزبانه
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
      {/* هاله ظریف متحرک در هاور پشت کارت */}
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

        {/* خط برش لیزری به رنگ athar-lime */}
        <div
          className="pointer-events-none absolute top-0 bottom-0 w-[2px] bg-athar-lime shadow-[0_0_15px_rgba(167,217,87,1),0_0_30px_rgba(167,217,87,0.5)]"
          style={{ right: `${offsetPercent}%` }}
        >
          {/* دستگیره درگ دایره‌ای با فلش‌های متقابل */}
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

        {/* رنج اینپوت تعاملی نامرئی برای درگ نرم */}
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

        {/* نشانگر راهنمای لمس */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/60 px-3 py-0.5 text-[10px] font-medium text-slate-300 backdrop-blur-md whitespace-nowrap">
          {t.hint}
        </div>
      </div>

      {/* جزئیات و دستاورد شاگرد */}
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
