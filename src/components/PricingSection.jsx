// src/components/PricingSection.jsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Check, Info, Layers } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* محتوای رسمی بسته‌ها با تعداد کاملاً برابر ۶ ویژگی جهت تراز هندسی کامل      */
/* -------------------------------------------------------------------------- */
const PRICING_CONTENT = {
  ar: {
    sectionBadge: "خطط الاستثمار البدني • كوتش نوح",
    sectionTitle: "باقات التدريب المباشر ونمط الحياة",
    sectionSubtitle:
      "حصص فردية محددة باليوم والوقت في سلطنة عُمان (مسقط والسويق)، تهدف لتمكينك من مهارة التدريب المستقل مدى الحياة.",

    popularBadge: "الخيار الأكثر طلباً",
    selectedTag: "تم التحديد",
    selectBtn: "اختيار هذه الباقة",
    selectedBtn: "تم اختيار الباقة ✓",
    currency: "ر.ع",
    perPerson: "/ شهرياً للشخص",

    transparencyNote: {
      title: "ملاحظات هامة حول الجلسات والرسوم:",
      gymRule: "رسوم الاشتراك ودخول الصالة الرياضية تكون على المشترك مباشرة.",
      distanceRule:
        "تتراوح التسعيرة بين ٣٥ إلى ٤٥ ر.ع وفق بُعد المسافة والوقت المخصص للحصص بين مسقط والسويق.",
      goalRule:
        "تركز جميع الباقات على المرونة واللياقة باستخدام أدوات بسيطة لتحقيق استقلالية تامة في التمرين.",
    },

    plans: [
      {
        id: "bronze_plan",
        title: "الباقة البرونزية",
        tier: "BRONZE TIER",
        price: "٣٥",
        duration: "اشتراك شهري",
        subtitle: "تأسيس الميكانيكا الحركية واستعادة مرونة المفاصل",
        isPopular: false,
        features: [
          "حصص فردية محددة باليوم والوقت بدقة",
          "التركيز الأساسي على مرونة المفاصل واللياقة العامة",
          "اعتماد كامل على عدة بسيطة بدون تعقيد الماكينات",
          "توجيهات غذائية واقعية متوافقة مع نمط وجبات البيت",
          "متابعة دورية لتطور التكنيك والاستجابة الحركية",
          "تأسيس قاعدة حركية صحيحة للانطلاق نحو التدريب الذاتي",
        ],
      },
      {
        id: "silver_plan",
        title: "الباقة الفضية",
        tier: "SILVER TIER",
        price: "٤٠",
        duration: "اشتراك شهري",
        subtitle: "التطوير البدني الشامل وبناء اللياقة الوظيفية",
        isPopular: true,
        features: [
          "حصص فردية مباشرة ومكثفة مع كابتن نوح",
          "برنامج تدريبي مرن يتكيف تماماً مع ظروفك ومواعيدك",
          "رفع كفاءة التنفس وتحرير المفاصل وحمايتها من الإصابات",
          "خطة تغذية متوازنة محسوبة العناصر لدعم النشاط اليومي",
          "إشراف مباشر ومستمر عبر واتساب طوال فترة البرنامج",
          "البدء في تعلم قيادة وتصميم التمرين المستقل",
        ],
      },
      {
        id: "gold_plan",
        title: "الباقة الذهبية",
        tier: "GOLD TIER",
        price: "٤٥",
        duration: "اشتراك شهري",
        subtitle: "التمكين التام والوصول إلى الاستقلالية الحركية الكاملة",
        isPopular: false,
        features: [
          "أولوية مطلقة في حجز وتنسيق المواعيد والأيام المناسبة لك",
          "إشراف دقيق وشامل على الأداء الحركي والقوة الوظيفية",
          "برنامج تدريب ونمط حياة متكامل للأشخاص كثيري السفر والتنقل",
          "تعليم ميكانيكية الحركة المتقدمة لتدير تمارينك بنفسك بعد البرنامج",
          "خطة تدريب وتغذية ممتدة تطبقها بمفردك بعد انتهاء الاشتراك",
          "متابعة مباشرة ومفتوحة لضمان الاستمرارية مدى الحياة",
        ],
      },
    ],
  },

  en: {
    sectionBadge: "COACHING PLANS • COACH NOUH",
    sectionTitle: "1-on-1 In-Person Training & Lifestyle Tiers",
    sectionSubtitle:
      "Private sessions scheduled by day and time in Oman (Muscat & Al-Suwiq), engineered for lifelong training autonomy.",

    popularBadge: "Most Recommended",
    selectedTag: "Selected",
    selectBtn: "Select This Plan",
    selectedBtn: "Plan Selected ✓",
    currency: "OMR",
    perPerson: "/ Month per person",

    transparencyNote: {
      title: "Essential Session & Pricing Terms:",
      gymRule:
        "Gym entry/facility subscription fees are borne directly by the trainee.",
      distanceRule:
        "Rates range between 35 to 45 OMR based on commuting distance and session timing across Muscat & Al-Suwiq.",
      goalRule:
        "All tiers focus on mobility, conditioning, and minimal gear to foster total workout self-reliance.",
    },

    plans: [
      {
        id: "bronze_plan",
        title: "Bronze Package",
        tier: "BRONZE TIER",
        price: "35",
        duration: "Monthly Plan",
        subtitle: "Joint mobility foundation and kinetic movement reset",
        isPopular: false,
        features: [
          "Dedicated 1-on-1 sessions scheduled by day and time",
          "Core focus on joint mobility and functional fitness",
          "Lean, practical tools without cumbersome machines",
          "Mindful nutritional guidance tailored to home meals",
          "Periodic kinetic progress reviews and form correction",
          "Solid kinetic foundation built for workout independence",
        ],
      },
      {
        id: "silver_plan",
        title: "Silver Package",
        tier: "SILVER TIER",
        price: "40",
        duration: "Monthly Plan",
        subtitle: "Comprehensive physical conditioning & adaptive lifestyle",
        isPopular: true,
        features: [
          "Direct hands-on coaching sessions with Coach Nouh",
          "Adaptive programming structured around your busy schedule",
          "Optimized breathing, joint decompression, and injury prevention",
          "Balanced nutrition protocol supporting daily vitality",
          "Continuous WhatsApp mentorship throughout the month",
          "Guided transition into self-managed workouts",
        ],
      },
      {
        id: "gold_plan",
        title: "Gold Package",
        tier: "GOLD TIER",
        price: "45",
        duration: "Monthly Plan",
        subtitle: "Complete empowerment & full post-program autonomy",
        isPopular: false,
        features: [
          "Top-tier priority scheduling for preferred day & time slots",
          "In-depth kinetic assessment and advanced functional strength",
          "Bespoke routine engineered for executives with frequent travel",
          "Mastery of exercise biomechanics to train independently for life",
          "Extended roadmap to execute confidently post-program",
          "Direct ongoing communication ensuring lifelong consistency",
        ],
      },
    ],
  },
};

/* -------------------------------------------------------------------------- */
/* کارت قیمت‌گذاری با رندر شارپ، شفاف و بدون تاری در موبایل                    */
/* -------------------------------------------------------------------------- */
function PricingCard({ plan, ui, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // غیرفعال کردن کج‌شدن سه‌بعدی روی تاچ موبایل برای جلوگیری از افت فریم و تاری
  const handlePointerMove = (e) => {
    if (e.pointerType === "touch") return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -5;
    const rotateY = (x / rect.width - 0.5) * 5;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setIsInteracting(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onPointerDown={(e) => {
        if (e.pointerType !== "touch") setIsInteracting(true);
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      /* در حالت عادی استایل اینلاین undefined است تا فونت‌ها کاملاً شارپ و طبیعی رندر شوند */
      style={
        isInteracting
          ? {
              transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-5px)`,
              transition: "none",
            }
          : undefined
      }
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border p-6 sm:p-8 transition-all duration-300 antialiased ${
        isSelected
          ? "border-athar-lime bg-[#0d1f16] ring-2 ring-athar-lime/60 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(167,217,87,0.2)]"
          : plan.isPopular
            ? "border-athar-lime/45 bg-[#0a1811] ring-1 ring-athar-lime/30 shadow-[0_20px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(167,217,87,0.12)] hover:border-athar-lime/60"
            : "border-white/15 bg-[#08130e] shadow-xl hover:border-white/25 hover:bg-[#0a1711]"
      }`}
    >
      <div>
        {/* ۱. ردیف بالای کارت */}
        <div className="h-8 flex items-center justify-between">
          <div>
            {plan.isPopular ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-athar-lime px-3 py-1 text-xs font-black text-athar-forest-deep shadow-[0_0_12px_rgba(167,217,87,0.35)]">
                <Layers className="w-3.5 h-3.5 fill-current" />
                <span>{ui.popularBadge}</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-slate-400 tracking-wider uppercase font-sans">
                {plan.tier}
              </span>
            )}
          </div>

          <div>
            {isSelected && (
              <span className="inline-flex items-center gap-1 rounded-full bg-athar-lime text-athar-forest-deep font-black text-[11px] px-2.5 py-0.5 shadow-xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>{ui.selectedTag}</span>
              </span>
            )}
          </div>
        </div>

        {/* ۲. عنوان و برچسب دوره */}
        <div className="mt-4 flex items-center justify-between gap-2 min-h-[36px]">
          <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
            {plan.title}
          </h3>
          <span className="shrink-0 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[11px] font-bold text-slate-200 whitespace-nowrap">
            {plan.duration}
          </span>
        </div>

        {/* ۳. زیرنویس هدف بسته */}
        <p className="mt-2 text-xs font-medium text-slate-300 leading-relaxed min-h-[38px] flex items-center text-start">
          {plan.subtitle}
        </p>

        {/* ۴. بخش نمایش قیمت با کنتراست شفاف و دقیق */}
        <div
          className="mt-4 pt-1 flex items-baseline gap-1.5 min-h-[50px] text-start"
          dir="ltr"
        >
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-white font-sans drop-shadow-sm">
            {plan.price}
          </span>
          <span className="text-sm font-bold text-athar-lime font-sans">
            {ui.currency}
          </span>
          <span className="text-xs font-semibold text-slate-400 ms-1 whitespace-nowrap">
            {ui.perPerson}
          </span>
        </div>

        {/* ۵. خط تفکیک‌کننده مماس */}
        <div className="w-full border-t border-white/15 my-5" />

        {/* ۶. لیست ۶ ویژگی اختصاصی با رندر شفاف */}
        <ul className="space-y-3 text-start">
          {plan.features.map((feat, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-slate-200 font-medium"
            >
              <div className="rounded-lg border border-athar-lime/40 bg-athar-lime/15 p-1 mt-0.5 shrink-0 text-athar-lime">
                <Check className="w-3 h-3 stroke-[2.5]" />
              </div>
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* ۷. دکمه انتخاب بسته */}
      <div className="mt-8 pt-2">
        <button
          type="button"
          onClick={() => onSelect(plan)}
          className={`w-full cursor-pointer rounded-full py-3.5 text-center text-xs sm:text-sm font-black transition-all active:scale-[0.98] shadow-md ${
            isSelected
              ? "bg-athar-lime text-athar-forest-deep shadow-[0_0_20px_rgba(167,217,87,0.4)]"
              : plan.isPopular
                ? "bg-athar-lime hover:bg-athar-lime-hover text-athar-forest-deep shadow-[0_0_18px_rgba(167,217,87,0.3)]"
                : "border border-white/20 bg-white/[0.06] text-white hover:border-athar-lime/50 hover:bg-white/[0.12]"
          }`}
        >
          {isSelected ? ui.selectedBtn : ui.selectBtn}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* کامپوننت اصلی سکشن قیمت‌گذاری                                              */
/* -------------------------------------------------------------------------- */
export default function PricingSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = PRICING_CONTENT[lang] || PRICING_CONTENT.ar;

  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("user_selected_plan");
      if (stored) {
        setSelectedPlan(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }

    const handleExternalPlanChange = (e) => {
      setSelectedPlan(e.detail || null);
    };

    window.addEventListener("plan_selected", handleExternalPlanChange);
    window.addEventListener("fitness_plan_selected", handleExternalPlanChange);

    return () => {
      window.removeEventListener("plan_selected", handleExternalPlanChange);
      window.removeEventListener(
        "fitness_plan_selected",
        handleExternalPlanChange,
      );
    };
  }, []);

  const handleSelectPlan = useCallback(
    (plan) => {
      const payload = {
        id: plan.id,
        title: plan.title,
        price: `${plan.price} ${ui.currency}`,
        duration: plan.duration,
        lang: lang,
        timestamp: new Date().toISOString(),
      };

      setSelectedPlan(payload);

      try {
        sessionStorage.setItem("user_selected_plan", JSON.stringify(payload));
        const encoded = encodeURIComponent(JSON.stringify(payload));
        document.cookie = `user_selected_plan=${encoded}; path=/; max-age=604800; SameSite=Lax`;

        window.dispatchEvent(
          new CustomEvent("plan_selected", { detail: payload }),
        );
        window.dispatchEvent(
          new CustomEvent("fitness_plan_selected", { detail: payload }),
        );
      } catch (err) {
        console.error("Storage error:", err);
      }
    },
    [lang, ui.currency],
  );

  return (
    <section
      id="pricing"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* هاله‌های نوری استودیویی در پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[450px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />
        <div className="absolute -bottom-24 left-1/3 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش قیمت‌گذاری */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <Layers className="h-3.5 w-3.5 text-athar-lime animate-pulse" />
            <span className="text-xs font-bold text-athar-cream tracking-wide">
              {ui.sectionBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {ui.sectionTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-medium">
            {ui.sectionSubtitle}
          </p>
        </div>

        {/* شبکه ۳ کارته کاملاً متقارن و هم‌تراز */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {ui.plans.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              ui={ui}
              isSelected={selectedPlan?.id === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>

        {/* باکس شرایط شفافیت برگرفته از یادداشت مربی */}
        <div className="mt-12 rounded-3xl border border-white/15 bg-[#08130e] p-5 sm:p-7 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start gap-4 text-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-athar-lime/30 bg-athar-lime/15 text-athar-lime shadow-[0_0_15px_rgba(167,217,87,0.2)]">
              <Info className="h-5 w-5" />
            </div>

            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-black text-white">
                {ui.transparencyNote.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs text-slate-300 font-medium">
                <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-lime mt-1.5 shrink-0" />
                  <span>{ui.transparencyNote.gymRule}</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-lime mt-1.5 shrink-0" />
                  <span>{ui.transparencyNote.distanceRule}</span>
                </div>
                <div className="flex items-start gap-2 bg-black/40 p-3 rounded-xl border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-lime mt-1.5 shrink-0" />
                  <span>{ui.transparencyNote.goalRule}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
