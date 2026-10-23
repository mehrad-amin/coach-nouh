// src/components/PricingSection.jsx
"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles, Check, Info } from "lucide-react";

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
/* کارت با تراز خط‌کشی و باکس‌های کاملاً هم‌ارتفاع                             */
/* -------------------------------------------------------------------------- */
function PricingCard({ plan, ui, isSelected, onSelect }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerMove = (e) => {
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
      onPointerDown={() => setIsInteracting(true)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{
        transform: isInteracting
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-5px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border p-6 sm:p-8 bg-white transition-all duration-300 transform-gpu ${
        isSelected
          ? "border-athar-forest ring-2 ring-athar-lime shadow-athar-float"
          : plan.isPopular
            ? "border-athar-forest/40 ring-1 ring-athar-lime/60 shadow-athar-float"
            : "border-athar-border shadow-athar-soft hover:border-athar-forest/30"
      }`}
    >
      <div>
        {/* ۱. ردیف بالای کارت: با ارتفاع ثابت جهت تراز دقیق */}
        <div className="h-8 flex items-center justify-between">
          <div>
            {plan.isPopular ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-athar-forest px-3 py-1 text-xs font-black text-athar-lime shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-athar-lime" />
                <span>{ui.popularBadge}</span>
              </span>
            ) : (
              <span className="text-[11px] font-bold text-athar-muted tracking-wider uppercase font-sans">
                {plan.tier}
              </span>
            )}
          </div>

          <div>
            {isSelected && (
              <span className="inline-flex items-center gap-1 rounded-full bg-athar-lime text-athar-forest-deep font-black text-[11px] px-2.5 py-0.5 shadow-2xs">
                <Check className="w-3 h-3 stroke-[3]" />
                <span>{ui.selectedTag}</span>
              </span>
            )}
          </div>
        </div>

        {/* ۲. عنوان و برچسب دوره با ارتفاع مینیمم مساوی */}
        <div className="mt-4 flex items-center justify-between gap-2 min-h-[36px]">
          <h3 className="text-xl sm:text-2xl font-black text-athar-forest-deep leading-snug">
            {plan.title}
          </h3>
          <span className="shrink-0 rounded-full border border-athar-border bg-athar-cream px-3 py-1 text-[11px] font-bold text-athar-forest whitespace-nowrap">
            {plan.duration}
          </span>
        </div>

        {/* ۳. زیرنویس هدف بسته با حداقل ارتفاع یکسان در هر سه کارت */}
        <p className="mt-2 text-xs font-medium text-athar-muted leading-relaxed min-h-[38px] flex items-center text-start">
          {plan.subtitle}
        </p>

        {/* ۴. بخش نمایش قیمت: ساختار یکنواخت و ضد شکستگی خط */}
        <div
          className="mt-4 pt-1 flex items-baseline gap-1.5 min-h-[50px] text-start"
          dir="ltr"
        >
          <span className="text-4xl sm:text-5xl font-black tracking-tight text-athar-forest-deep font-sans">
            {plan.price}
          </span>
          <span className="text-sm font-bold text-athar-forest font-sans">
            {ui.currency}
          </span>
          <span className="text-xs font-semibold text-athar-muted ms-1 whitespace-nowrap">
            {ui.perPerson}
          </span>
        </div>

        {/* ۵. خط‌کشی تفکیک‌کننده (دقیقاً مماس و هم‌تراز در یک راستای افقی) */}
        <div className="w-full border-t border-athar-border/70 my-5" />

        {/* ۶. لیست ۶ ویژگی اختصاصی با تراز کاملاً همسان */}
        <ul className="space-y-3 text-start">
          {plan.features.map((feat, index) => (
            <li
              key={index}
              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed text-athar-forest-deep font-medium"
            >
              <div className="rounded-lg border border-athar-lime/60 bg-athar-lime/20 p-1 mt-0.5 shrink-0 text-athar-forest">
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
              ? "bg-athar-lime text-athar-forest-deep shadow-lime-sm"
              : plan.isPopular
                ? "bg-athar-forest text-white hover:bg-athar-forest-deep shadow-athar-soft"
                : "border border-athar-border bg-athar-cream text-athar-forest-deep hover:border-athar-forest/40 hover:bg-white"
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
      className="relative w-full py-16 md:py-24 overflow-hidden bg-athar-cream border-b border-athar-border transition-colors"
    >
      {/* دایره‌های هندسی استاتیک و مینیمال پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 sm:-top-32 sm:-left-32 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-athar-cream-dark" />
        <div className="absolute top-1/2 -right-24 sm:-right-36 -translate-y-1/2 w-56 h-56 sm:w-88 sm:h-88 rounded-full bg-athar-lime/20" />
        <div className="absolute -bottom-24 -left-16 sm:-bottom-32 sm:-left-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-forest/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش قیمت‌گذاری */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-athar-border shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-athar-forest" />
            <span className="text-xs font-bold text-athar-forest-deep">
              {ui.sectionBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-athar-forest-deep leading-tight">
            {ui.sectionTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-athar-muted leading-relaxed font-medium">
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

        {/* باکس شرایط شفافیت برگرفته از دست‌نوشته مربی */}
        <div className="mt-12 rounded-3xl border border-athar-border bg-white/90 p-5 sm:p-7 shadow-athar-soft">
          <div className="flex flex-col sm:flex-row items-start gap-4 text-start">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-athar-forest/20 bg-athar-cream text-athar-forest shadow-2xs">
              <Info className="h-5 w-5" />
            </div>

            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-black text-athar-forest-deep">
                {ui.transparencyNote.title}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs text-athar-muted font-medium">
                <div className="flex items-start gap-2 bg-athar-cream/40 p-3 rounded-xl border border-athar-border/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-forest mt-1.5 shrink-0" />
                  <span>{ui.transparencyNote.gymRule}</span>
                </div>
                <div className="flex items-start gap-2 bg-athar-cream/40 p-3 rounded-xl border border-athar-border/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-lime-hover mt-1.5 shrink-0" />
                  <span>{ui.transparencyNote.distanceRule}</span>
                </div>
                <div className="flex items-start gap-2 bg-athar-cream/40 p-3 rounded-xl border border-athar-border/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-athar-forest mt-1.5 shrink-0" />
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
