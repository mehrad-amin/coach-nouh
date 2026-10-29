// src/components/MethodologySection.jsx
"use client";

import React, { useState, useRef } from "react";
import {
  Activity,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Compass,
  Target,
} from "lucide-react";

function MethodIcon({ type }) {
  if (type === "autonomy") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-athar-lime/40 bg-athar-lime/15 text-athar-lime shadow-[0_0_15px_rgba(167,217,87,0.25)] shrink-0">
        <ShieldCheck className="h-5 w-5" />
      </div>
    );
  }

  if (type === "mobility") {
    return (
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 shadow-[0_0_15px_rgba(52,199,123,0.2)] shrink-0">
        <Activity className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.08] text-athar-cream shadow-xs shrink-0">
      <Zap className="h-5 w-5 text-athar-lime" />
    </div>
  );
}

const METHODOLOGY_DATA = {
  ar: {
    badge: "فلسفة التدريب • كوتش نوح",
    title: "منهجية تبني قدرتك الحركية، لا اعتمادك على المدرب",
    subtitle:
      "أسلوب تدريب مرن وذكي يتوافق تماماً مع جدولك اليومي. هدفنا أن تمتلك مهارة التدريب الواعي لتصل لنتيجتك وتواصل بنفسك بكل ثقة.",

    coachCard: {
      tag: "مدرب شخصي ونمط حياة صحي",
      name: "الكابتن نوح",
      location: "سلطنة عُمان",
      bioTitle: "عن أسلوب الكابتن:",
      bioText:
        "مدرب شخصي معتمد يركز على استعادة مرونة الجسد وكفاءة المفاصل عبر تمارين وظيفية وأدوات بسيطة، مع تصميم خطة واقعية تتكيف بسلاسة مع التزاماتك اليومية.",
      missionTitle: "فلسفة التدريب:",
      missionQuote:
        "«أسلوب تدريب يتلائم مع كل الظروف؛ نركز على جودة الحركة وفهم تفاصيل الجسد للوصول إلى أفضل نسخة بدنية وصحية مستدامة.»",
      bulletPoints: [
        "حصص فردية بمواعيد وأيام محددة بدقة",
        "تركيز أساسي على المرونة واللياقة البدنية",
        "اعتماد كامل على أدوات بسيطة بدون تعقيد",
        "مرونة تامة في تعديل البرنامج حسب واقعك وتطورك",
      ],
      footnote:
        "تدريب شخصي عملي مبني على واقعك اليومي، بعيداً عن الجداول المنسوخة.",
    },

    pillars: [
      {
        id: "autonomy",
        badge: "الهدف الأساسي",
        title: "كسب مهارة التدريب المستقل",
        desc: "لا ندرّبك لتبقى معتمداً على المدرب. خلال البرنامج، تتعلم الأسس الحركية الصحيحة وكيفية إدارة تمرينك لتواصل بنفسك بثقة مدى الحياة.",
        proof: "استقلالية تامة في التمرين بعد البرنامج",
        highlight: true,
      },
      {
        id: "mobility",
        badge: "التركيز والاهتمام",
        title: "المرونة واللياقة البدنية الشاملة",
        desc: "الهدف ليس مجرد رفع أوزان؛ بل تحرير المفاصل، وتحسين التنفس، واكتساب مرونة وقوة وظيفية تحميك من الإصابات وتمنحك خفة ونشاطاً دائماً.",
        proof: "حماية المفاصل ورفع التحمل البدني",
        highlight: false,
      },
      {
        id: "lifestyle",
        badge: "واقعي وعملي",
        title: "أدوات بسيطة وبرنامج يتكيف معك",
        desc: "حصص محددة باليوم والوقت تعتمد على تمارين ذكية وأدوات خفيفة بدون ماكينات معقدة. خطة تتلائم مع ظروفك لتضمن استمرارية حقيقية.",
        proof: "تدريب مرن يناسب طبيعة يومك",
        highlight: false,
      },
    ],
    swipeHint: "اسحب للتنقل بين الركائز",
  },

  en: {
    badge: "COACHING METHODOLOGY • COACH NOUH",
    title: "A System Built to Empower Your Independence",
    subtitle:
      "A flexible, intelligent training method tailored around your daily routine. We equip you with conscious training skills to achieve lasting fitness on your own.",

    coachCard: {
      tag: "Personal Trainer & Lifestyle",
      name: "Coach Nouh",
      location: "Sultanate of Oman",
      bioTitle: "Coaching Philosophy:",
      bioText:
        "A certified personal coach dedicated to restoring joint longevity and true physical conditioning through functional, lean equipment tailored around your executive schedule.",
      missionTitle: "The Core Philosophy:",
      missionQuote:
        '"A training style that adapts to all life circumstances, focusing on kinetic movement quality to unlock your most resilient physical state."',
      bulletPoints: [
        "Dedicated 1-on-1 sessions scheduled by day and time",
        "Primary focus on joint mobility & physical conditioning",
        "Effective results using simple, functional gear",
        "Adaptive programming structured around your lifestyle",
      ],
      footnote:
        "Functional individual training built around your real day, avoiding copied routines.",
    },

    pillars: [
      {
        id: "autonomy",
        badge: "Ultimate Goal",
        title: "Independent Training Mastery",
        desc: "We don't train you to remain reliant on a coach. Throughout the journey, you master movement mechanics and exercise programming so you can train with complete confidence on your own.",
        proof: "Full self-reliance post-program",
        highlight: true,
      },
      {
        id: "mobility",
        badge: "Core Focus",
        title: "Mobility & Full-Body Conditioning",
        desc: "It is not just lifting weights; we focus on joint health, functional flexibility, and cardiovascular conditioning that protects against injuries and boosts daily vitality.",
        proof: "Joint longevity & functional endurance",
        highlight: false,
      },
      {
        id: "lifestyle",
        badge: "Practical & Lean",
        title: "Minimal Gear, Adaptive Routine",
        desc: "Scheduled sessions built with simple, highly effective equipment without complex machines. A training protocol that flexes around your personal commitments for sustainable progress.",
        proof: "Realistic fitness built for real life",
        highlight: false,
      },
    ],
    swipeHint: "Tap or swipe to explore methodology pillars",
  },
};

export default function MethodologySection({
  lang = "ar",
  coachImage = "/coach-nouh.jpg",
}) {
  const isRtl = lang === "ar";
  const t = METHODOLOGY_DATA[lang] || METHODOLOGY_DATA.ar;

  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNextCard = () => {
    setActiveIndex((prev) => (prev + 1) % t.pillars.length);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 35) {
      if (diff > 0) {
        setActiveIndex((prev) => (prev + 1) % t.pillars.length);
      } else {
        setActiveIndex(
          (prev) => (prev - 1 + t.pillars.length) % t.pillars.length,
        );
      }
    }
  };

  return (
    <section
      id="methodology"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full pt-10 sm:pt-14 pb-20 sm:pb-28 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* هاله‌های نوری استودیویی پیوسته در پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />
        <div className="absolute top-1/3 -right-24 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />
        <div className="absolute -bottom-24 left-10 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش متدولوژی */}
        <div className="mb-12 text-center md:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <Sparkles className="h-3.5 w-3.5 text-athar-lime animate-pulse" />
            <span className="text-xs font-bold text-athar-cream tracking-wide">
              {t.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
            {t.title}
          </h2>

          <p className="mt-3.5 text-xs sm:text-sm md:text-base text-slate-300/90 max-w-2xl mx-auto leading-relaxed font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* کارت معرفی فلسفه و تصویر مربی نوح */}
        <div className="mb-14 sm:mb-16 rounded-3xl border border-white/10 bg-[#08130e] p-6 sm:p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -end-20 w-64 h-64 rounded-full bg-athar-lime/10 blur-[80px]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            {/* ستون اول: عکس مربی + معرفی و فلسفه */}
            <div className="lg:col-span-6 flex flex-col items-start text-start">
              <div className="flex items-center gap-4 w-full">
                <div className="relative w-20 sm:w-24 md:w-28 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden border border-athar-lime/30 bg-[#0a1a12] shadow-[0_0_20px_rgba(167,217,87,0.15)] ring-1 ring-white/10">
                  <img
                    src={coachImage}
                    alt={t.coachCard.name}
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>

                <div className="leading-tight">
                  <span className="text-lg sm:text-2xl font-black text-white block">
                    {t.coachCard.name}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-athar-lime block mt-1">
                    {t.coachCard.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 mt-1.5">
                    <Compass className="w-3.5 h-3.5 text-athar-lime" />
                    <span>{t.coachCard.location}</span>
                  </span>
                </div>
              </div>

              {/* رویکرد تمرینی مربی */}
              <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/10 w-full text-start">
                <span className="text-[11px] font-bold text-athar-lime block mb-1">
                  {t.coachCard.bioTitle}
                </span>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {t.coachCard.bioText}
                </p>
              </div>

              {/* مانیفست مربی */}
              <div className="relative mt-3 p-3.5 sm:p-4 rounded-2xl bg-linear-to-r from-athar-lime/[0.08] via-white/[0.03] to-transparent border-s-2 border-athar-lime text-start w-full">
                <span className="text-[11px] font-bold text-athar-lime block mb-1">
                  {t.coachCard.missionTitle}
                </span>
                <p className="text-xs sm:text-sm text-athar-cream font-semibold leading-relaxed italic">
                  {t.coachCard.missionQuote}
                </p>
              </div>
            </div>

            {/* ستون دوم: ساختار جلسات */}
            <div className="lg:col-span-6 flex flex-col justify-center border-t lg:border-t-0 lg:border-r lg:rtl:border-r-0 lg:rtl:border-l border-white/10 pt-6 lg:pt-0 lg:px-6">
              <h3 className="text-base sm:text-lg font-black text-white mb-3.5 text-start">
                {isRtl
                  ? "تفاصيل الحصص التدريبية:"
                  : "Session Format & Execution:"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {t.coachCard.bulletPoints.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 text-start transition-colors"
                  >
                    <CheckCircle2 className="h-4 w-4 text-athar-lime shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-bold text-slate-100 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 border-t border-white/10 pt-4 text-start">
                <Target className="h-4 w-4 text-athar-lime shrink-0" />
                <span>{t.coachCard.footnote}</span>
              </div>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* نمای موبایل: رنگ دقیقاً برابر دسکتاپ (#08130e)، مات، شارپ و بدون تاری         */}
        {/* -------------------------------------------------------------------------- */}
        <div
          className="relative block md:hidden w-full select-none cursor-pointer"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={goToNextCard}
        >
          <div className="relative mx-auto h-[300px] w-full max-w-[330px]">
            {t.pillars.map((pillar, index) => {
              const count = t.pillars.length;
              let diff = (index - activeIndex) % count;
              if (diff < -Math.floor(count / 2)) diff += count;
              if (diff > Math.floor(count / 2)) diff -= count;

              const isActive = diff === 0;
              const isLead = pillar.highlight;

              let transformStyle = "";
              let zIndex = 10 - Math.abs(diff);
              let opacity = 1;
              const dirFactor = isRtl ? 1 : -1;

              if (isActive) {
                transformStyle = "translate3d(0px, 0px, 0px)";
                opacity = 1;
              } else if (diff === 1) {
                transformStyle = `translate3d(${-26 * dirFactor}px, 0px, 0px) scale(0.94)`;
                opacity = 0.85;
              } else if (diff === -1) {
                transformStyle = `translate3d(${26 * dirFactor}px, 0px, 0px) scale(0.94)`;
                opacity = 0.85;
              } else {
                transformStyle = `translate3d(${diff * 40 * dirFactor}px, 0px, 0px) scale(0.85)`;
                opacity = 0;
              }

              return (
                <div
                  key={pillar.id}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                    backgroundColor: "#08130e",
                    WebkitBackfaceVisibility: "hidden",
                    backfaceVisibility: "hidden",
                    WebkitFontSmoothing: "subpixel-antialiased",
                    transition:
                      "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
                  }}
                  className={`absolute inset-0 flex flex-col justify-between rounded-3xl border p-6 text-start antialiased shadow-2xl ${
                    isLead
                      ? "border-athar-lime/40 ring-1 ring-athar-lime/40 shadow-[0_15px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(167,217,87,0.12)]"
                      : "border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  <div
                    className={`transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="flex w-full items-center justify-between">
                      <MethodIcon type={pillar.id} />
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          isLead
                            ? "bg-athar-lime/20 text-athar-lime border border-athar-lime/30 shadow-xs"
                            : "bg-white/10 text-slate-300 border border-white/10"
                        }`}
                      >
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-lg font-black text-white leading-tight">
                      {pillar.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-slate-300 font-medium line-clamp-4">
                      {pillar.desc}
                    </p>
                  </div>

                  <div
                    className={`flex items-center gap-2 border-t border-white/10 pt-3 text-xs font-bold text-athar-lime transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4 text-athar-lime shrink-0" />
                    <span className="line-clamp-1">{pillar.proof}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex justify-center items-center gap-1.5">
            {t.pillars.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === idx
                    ? "w-6 bg-athar-lime shadow-[0_0_10px_rgba(167,217,87,0.5)]"
                    : "w-1.5 bg-white/20"
                }`}
                aria-label={`Pillar ${idx + 1}`}
              />
            ))}
          </div>

          <p className="mt-2 text-center text-[10px] font-semibold text-slate-400">
            {t.swipeHint}
          </p>
        </div>

        {/* -------------------------------------------------------------------------- */}
        {/* نمای دسکتاپ: ۳ ستون هماهنگ با رنگ #08130e                                    */}
        {/* -------------------------------------------------------------------------- */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {t.pillars.map((pillar) => {
            const isLead = pillar.highlight;

            return (
              <div
                key={pillar.id}
                className={`group relative flex flex-col justify-between rounded-3xl border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 text-start bg-[#08130e] ${
                  isLead
                    ? "border-athar-lime/40 ring-1 ring-athar-lime/40 shadow-[0_10px_30px_rgba(167,217,87,0.12)] hover:shadow-[0_15px_40px_rgba(167,217,87,0.2)]"
                    : "border-white/10 hover:border-white/20 shadow-xl"
                }`}
              >
                <div>
                  <div className="flex w-full items-center justify-between">
                    <MethodIcon type={pillar.id} />
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                        isLead
                          ? "bg-athar-lime/20 text-athar-lime border border-athar-lime/30 shadow-xs"
                          : "bg-white/10 text-slate-300 border border-white/10"
                      }`}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg lg:text-xl font-black text-white group-hover:text-athar-lime transition-colors leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-xs lg:text-sm leading-relaxed text-slate-300 font-medium">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-bold text-athar-lime">
                  <CheckCircle2 className="h-4 w-4 text-athar-lime shrink-0" />
                  <span>{pillar.proof}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
