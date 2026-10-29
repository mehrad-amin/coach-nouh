// src/components/BookingForm.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Activity,
  Flame,
  Sparkles,
  ShieldCheck,
  Check,
  X,
  User,
  Phone,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  AlertCircle,
  Clock,
  Compass,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* لیست کشورهای حوزه خلیج و منطقه با پیش‌فرض سلطنت عُمان                      */
/* -------------------------------------------------------------------------- */
const ARAB_COUNTRIES = [
  { code: "+968", flag: "🇴🇲", nameAr: "عُمان", nameEn: "Oman" },
  { code: "+971", flag: "🇦🇪", nameAr: "الإمارات", nameEn: "UAE" },
  { code: "+966", flag: "🇸🇦", nameAr: "السعودية", nameEn: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", nameAr: "قطر", nameEn: "Qatar" },
  { code: "+965", flag: "🇰🇼", nameAr: "الكويت", nameEn: "Kuwait" },
  { code: "+973", flag: "🇧🇭", nameAr: "البحرين", nameEn: "Bahrain" },
  { code: "+20", flag: "🇪🇬", nameAr: "مصر", nameEn: "Egypt" },
  { code: "+962", flag: "🇯🇴", nameAr: "الأردن", nameEn: "Jordan" },
];

/* -------------------------------------------------------------------------- */
/* بسته‌های سه‌گانه رسمی کابتن نوح                                              */
/* -------------------------------------------------------------------------- */
const DEFAULT_NOUH_PLANS = {
  ar: [
    {
      id: "bronze_plan",
      title: "الباقة البرونزية",
      price: "٣٥ ر.ع",
      duration: "اشتراك شهري",
    },
    {
      id: "silver_plan",
      title: "الباقة الفضية",
      price: "٤٠ ر.ع",
      duration: "اشتراك شهري",
      isPopular: true,
    },
    {
      id: "gold_plan",
      title: "الباقة الذهبية",
      price: "٤٥ ر.ع",
      duration: "اشتراك شهري",
    },
  ],
  en: [
    {
      id: "bronze_plan",
      title: "Bronze Package",
      price: "35 OMR",
      duration: "Monthly Plan",
    },
    {
      id: "silver_plan",
      title: "Silver Package",
      price: "40 OMR",
      duration: "Monthly Plan",
      isPopular: true,
    },
    {
      id: "gold_plan",
      title: "Gold Package",
      price: "45 OMR",
      duration: "Monthly Plan",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* محتوای متنی استعلام و ثبت‌نام به زبان عربی سفید و سلیس                     */
/* -------------------------------------------------------------------------- */
const BOOKING_UI_TEXT = {
  ar: {
    sectionBadge: "الخطوة النهائية • كوتش نوح",
    sectionTitle: "استمارة التسجيل وتأكيد الحجز المباشر",
    sectionSubtitle:
      "تم ربط بياناتك الحيوية واحتياجك الأيضي تلقائياً بهذه الاستمارة ليتسلمها الكابتن نوح بن عيسى كاملة لبدء التنسيق معك.",

    badgesContainerTitle: "البيانات المسجلة تلقائياً من جولتك في الموقع:",
    badgeBiomechanicsTitle: "تقييم المرونة والحركة",
    badgeCalculatorTitle: "الاحتياج الأيضي المقترح",
    badgePlanTitle: "الباقة التدريبية",
    screeningFocusLabel: "أولوية التركيز:",
    targetKcalLabel: "السعرات المبرمجة:",
    forecastLabel: "الهدف التقديري:",
    dismissBadge: "إلغاء الإرفاق",

    planSectionTitle: "تأكيد الباقة التدريبية المطلوبة",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "مثال: سالم المعمري",
    phoneLabel: "رقم الواتساب (للتنسيق واستلام الجدول)",
    phonePlaceholder: "9448 6154",
    locationLabel: "المنطقة المفضلة للتدريب في عُمان",
    goalLabel: "الهدف الأساسي من التدريب",
    experienceLabel: "مستوى الخبرة في التدريب",
    trainingDaysLabel: "كم يوماً تفضل الحصص التدريبية أسبوعياً؟",
    trainingDaysUnit: "أيام",
    notesLabel: "أي ملاحظات صحية أو إصابات سابقة في المفاصل والظهر (اختياري)",
    notesPlaceholder:
      "اذكر أي آلام سابقة، تيبس في الظهر أو المفاصل، أو طبيعة عملك اليومي ليتم مراعاتها بدقة في خطتك التدريبية...",

    submitLoading: "جاري ربط الملف وإرسال البيانات...",
    submitPrefix: "تأكيد التسجيل في",
    submitSuffix: "والتواصل مع كوتش نوح",
    defaultError: "حدث خطأ أثناء معالجة الطلب، يرجى المحاولة لاحقاً.",
    unexpectedError: "تعذر الاتصال بالخادم، يرجى المحاولة مجدداً.",
    calcRequiredError:
      "يرجى إكمال حساب السعرات والنشاط في الحاسبة البدنية أعلاه أولاً ليتمكن الكابتن نوح من تقييم خطتك بدقة.",
    goToCalcBtn: "الانتقال للحاسبة الآن",

    locations: [
      { id: "muscat", label: "محافظة مسقط" },
      { id: "al_suwiq", label: "ولاية السويق" },
      { id: "flexible", label: "مرن / يتم الاتفاق عليه مسبقاً" },
    ],

    goals: [
      { id: "cut", label: "خسارة الدهون وتحرير المفاصل" },
      { id: "maintain", label: "إعادة تشكيل القوام والمرونة الحركية" },
      { id: "bulk", label: "بناء القوة الوظيفية واللياقة الشاملة" },
      { id: "autonomy", label: "تعلم مهارة وتكنيك التدريب المستقل" },
    ],

    experienceLevels: [
      { id: "beginner", label: "مبتدئ (أقل من ٦ أشهر)" },
      { id: "intermediate", label: "متوسط (١ إلى ٣ سنوات)" },
      { id: "advanced", label: "متقدم (أكثر من ٣ سنوات)" },
    ],

    trainingDaysOptions: [
      { id: "3", label: "٣ أيام", sub: "بداية متوازنة" },
      { id: "4", label: "٤ أيام", sub: "الخيار الأفضل" },
      { id: "5", label: "٥ أيام", sub: "نشاط مكثف" },
      { id: "6", label: "٦ أيام", sub: "التزام كامل" },
    ],

    success: {
      title: "تم استلام طلبك وملفك البدني بنجاح!",
      confirmed: "الباقة المختارة:",
      desc: "تم تسجيل كافة بياناتك الحيوية وأولويات تدريبك. يمكنك الآن فتح محادثة واتساب المباشرة مع الكابتن نوح لتأكيد الموعد الأول.",
      whatsappBtn: "فتح محادثة واتساب المباشرة مع كوتش نوح",
      newFormBtn: "تسجيل استمارة جديدة",
      fileIdLabel: "رقم الملف الرياضي:",
      waHello: "مرحباً كابتن نوح بن عيسى 👋",
      waIm: "أنا",
      waRegistered: "أتممت التسجيل عبر موقعك الرسمي في:",
      waBiometricsHeader: "📊 ملخص تقييمي البدني:",
      waTargetCal: "السعرات المستهدفة:",
      waWeight: "الوزن الحالي:",
      waTrainingDays: "أيام التمرين المفضلة:",
      waLocation: "منطقة التدريب:",
      waReady: "بانتظار مراجعتك وتنسيق موعد الحصة الأولى معك إن شاء الله.",
    },
  },

  en: {
    sectionBadge: "FINAL STEP • COACH NOUH",
    sectionTitle: "Application & Session Onboarding",
    sectionSubtitle:
      "All your dynamic biometric inputs and kinetic priorities are synced to this form directly for Coach Nouh Bin Issa.",

    badgesContainerTitle: "Auto-Captured Metrics & Choices from Your Session:",
    badgeBiomechanicsTitle: "Mobility & Kinetic Screening",
    badgeCalculatorTitle: "Metabolic Caloric Target",
    badgePlanTitle: "Selected Coaching Plan",
    screeningFocusLabel: "Screening Focus:",
    targetKcalLabel: "Target Calories:",
    forecastLabel: "Estimated Goal:",
    dismissBadge: "Remove",

    planSectionTitle: "Confirm Coaching Package",
    nameLabel: "Full Name",
    namePlaceholder: "e.g. Salim Al Maamari",
    phoneLabel: "WhatsApp Number (For Direct Scheduling)",
    phonePlaceholder: "9448 6154",
    locationLabel: "Preferred In-Person Training Location in Oman",
    goalLabel: "Primary Training Objective",
    experienceLabel: "Training Experience",
    trainingDaysLabel: "Preferred Workout Sessions Per Week",
    trainingDaysUnit: "Days",
    notesLabel:
      "Health Conditions, Joint Stiffness, or Past Injuries (Optional)",
    notesPlaceholder:
      "Mention any previous joint issues, back stiffness, or daily routine highlights to tailor your plan...",

    submitLoading: "Syncing file and delivering biometrics...",
    submitPrefix: "Confirm Registration in",
    submitSuffix: "and Connect with Coach Nouh",
    defaultError: "Error submitting assessment. Please try again.",
    unexpectedError: "Unexpected server error. Please try again.",
    calcRequiredError:
      "Please complete the Biometric Calculator above first so Coach Nouh can evaluate your profile accurately.",
    goToCalcBtn: "Go to Calculator Now",

    locations: [
      { id: "muscat", label: "Muscat Governorate" },
      { id: "al_suwiq", label: "Al-Suwiq Wilayat" },
      { id: "flexible", label: "Flexible / To be agreed" },
    ],

    goals: [
      { id: "cut", label: "Fat Loss & Joint Longevity" },
      { id: "maintain", label: "Body Recomposition & Kinetic Mobility" },
      { id: "bulk", label: "Functional Strength & Conditioning" },
      { id: "autonomy", label: "Mastering Independent Training" },
    ],

    experienceLevels: [
      { id: "beginner", label: "Beginner (< 6 months)" },
      { id: "intermediate", label: "Intermediate (1–3 years)" },
      { id: "advanced", label: "Advanced (> 3 years)" },
    ],

    trainingDaysOptions: [
      { id: "3", label: "3 Days", sub: "Balanced Start" },
      { id: "4", label: "4 Days", sub: "Optimal Cadence" },
      { id: "5", label: "5 Days", sub: "High Activity" },
      { id: "6", label: "6 Days", sub: "Full Commitment" },
    ],

    success: {
      title: "Profile Successfully Received!",
      confirmed: "Selected Plan:",
      desc: "Your complete kinetic screening profile and target metrics have been delivered. You can now chat directly with Coach Nouh via WhatsApp to confirm your first session.",
      whatsappBtn: "Open WhatsApp Chat with Coach Nouh",
      newFormBtn: "Submit Another Request",
      fileIdLabel: "Client File ID:",
      waHello: "Hello Coach Nouh Bin Issa 👋",
      waIm: "I am",
      waRegistered: "I completed my registration on your platform for:",
      waBiometricsHeader: "📊 My Physical Profile Summary:",
      waTargetCal: "Target Calories:",
      waWeight: "Current Weight:",
      waTrainingDays: "Target Days/Week:",
      waLocation: "Preferred Location:",
      waReady: "Looking forward to coordinating our first session schedule.",
    },
  },
};

export default function BookingForm({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = BOOKING_UI_TEXT[lang] || BOOKING_UI_TEXT.ar;
  const availablePlans = DEFAULT_NOUH_PLANS[lang] || DEFAULT_NOUH_PLANS.ar;

  // ۱. پیش‌شماره عمان به عنوان پیش‌فرض
  const [countryCode, setCountryCode] = useState("+968");

  // ۲. استیت فرم
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "muscat",
    selectedPlanId: "silver_plan",
    goal: "cut",
    experience: "beginner",
    trainingDays: "4",
    notes: "",
  });

  // ۳. استیت‌های ذخیره‌شده از سایر سکشن‌ها
  const [calcData, setCalcData] = useState(null);
  const [biomechanicsData, setBiomechanicsData] = useState(null);
  const [selectedPlanMeta, setSelectedPlanMeta] = useState(null);

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: "",
    isCalcMissing: false,
  });
  const [resultMeta, setResultMeta] = useState({
    coachPhone: "96894486154",
    fileId: "",
  });

  useEffect(() => {
    try {
      const storedCalc = sessionStorage.getItem("user_fitness_data");
      if (storedCalc) setCalcData(JSON.parse(storedCalc));

      const storedBio = sessionStorage.getItem("user_biomechanics_audit");
      if (storedBio) setBiomechanicsData(JSON.parse(storedBio));

      const storedPlan = sessionStorage.getItem("user_selected_plan");
      if (storedPlan) {
        const parsed = JSON.parse(storedPlan);
        setSelectedPlanMeta(parsed);
        if (parsed.id)
          setFormData((prev) => ({ ...prev, selectedPlanId: parsed.id }));
      }
    } catch (e) {
      console.warn("Storage sync error:", e);
    }

    const handleCalcUpdate = (e) => {
      if (e?.detail) {
        setCalcData(e.detail);
        setStatus((prev) => ({ ...prev, isCalcMissing: false, error: "" }));
        if (e.detail.result?.goalKey) {
          setFormData((prev) => ({ ...prev, goal: e.detail.result.goalKey }));
        }
      } else {
        setCalcData(null);
      }
    };

    const handleBioUpdate = (e) => {
      if (e?.detail) setBiomechanicsData(e.detail);
    };

    const handlePlanSelect = (e) => {
      const plan = e?.detail;
      if (plan) {
        setSelectedPlanMeta(plan);
        const planId = plan.id || plan.planId;
        if (planId) {
          setFormData((prev) => ({ ...prev, selectedPlanId: planId }));
        }
      }
    };

    window.addEventListener("fitness_calc_updated", handleCalcUpdate);
    window.addEventListener("biomechanics_audit_updated", handleBioUpdate);
    window.addEventListener("plan_selected", handlePlanSelect);
    window.addEventListener("fitness_plan_selected", handlePlanSelect);

    return () => {
      window.removeEventListener("fitness_calc_updated", handleCalcUpdate);
      window.removeEventListener("biomechanics_audit_updated", handleBioUpdate);
      window.removeEventListener("plan_selected", handlePlanSelect);
      window.removeEventListener("fitness_plan_selected", handlePlanSelect);
    };
  }, []);

  const handleRemoveBiomechanics = useCallback(() => {
    try {
      sessionStorage.removeItem("user_biomechanics_audit");
    } catch (_) {}
    setBiomechanicsData(null);
  }, []);

  const handleRemoveCalculator = useCallback(() => {
    try {
      sessionStorage.removeItem("user_fitness_data");
    } catch (_) {}
    setCalcData(null);
  }, []);

  const handleRemovePlan = useCallback(() => {
    try {
      sessionStorage.removeItem("user_selected_plan");
    } catch (_) {}
    setSelectedPlanMeta(null);
  }, []);

  const currentPlan =
    availablePlans.find((p) => p.id === formData.selectedPlanId) ||
    availablePlans[1];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scrollToCalculator = () => {
    const calcEl = document.getElementById("calculator");
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // سابمیت فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({
      loading: true,
      success: false,
      error: "",
      isCalcMissing: false,
    });

    let currentStats = calcData;
    if (!currentStats) {
      try {
        const stored = sessionStorage.getItem("user_fitness_data");
        if (stored) currentStats = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }
    }

    if (!currentStats || !currentStats.result || !currentStats.weight) {
      setStatus({
        loading: false,
        success: false,
        error: ui.calcRequiredError,
        isCalcMissing: true,
      });
      return;
    }

    let currentBio = biomechanicsData;
    if (!currentBio) {
      try {
        const storedBio = sessionStorage.getItem("user_biomechanics_audit");
        if (storedBio) currentBio = JSON.parse(storedBio);
      } catch (_) {}
    }

    let currentStoredPlan = selectedPlanMeta;
    if (!currentStoredPlan) {
      try {
        const storedPlan = sessionStorage.getItem("user_selected_plan");
        if (storedPlan) currentStoredPlan = JSON.parse(storedPlan);
      } catch (_) {}
    }

    const finalPlanTitle = currentStoredPlan?.title || currentPlan.title;
    const finalPlanPrice = currentStoredPlan?.price || currentPlan.price;
    const finalPlanDuration =
      currentStoredPlan?.duration || currentPlan.duration;

    const currentGoalLabel =
      ui.goals.find((g) => g.id === formData.goal)?.label || formData.goal;
    const currentExpLabel =
      ui.experienceLevels.find((exp) => exp.id === formData.experience)
        ?.label || formData.experience;
    const currentLocationLabel =
      ui.locations.find((l) => l.id === formData.location)?.label ||
      formData.location;

    const cleanLocalPhone = formData.phone.trim().replace(/^0+/, "");
    const fullPhoneNumber = `${countryCode}${cleanLocalPhone}`;

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coachName: "Coach Nouh",
          name: formData.name,
          phone: fullPhoneNumber,
          location: currentLocationLabel,
          selectedPlan: finalPlanTitle,
          planPrice: finalPlanPrice,
          planDuration: finalPlanDuration,
          goal: currentGoalLabel,
          goalKey: formData.goal,
          experience: currentExpLabel,
          trainingDays: formData.trainingDays,
          notes: formData.notes,
          calculatedStats: currentStats,
          biomechanics: currentBio || null,
          locale: lang,
        }),
      });

      const data = await res.json().catch(() => ({}));

      const generatedFileId =
        data.fileId || `NOUH-${Math.floor(1000 + Math.random() * 9000)}`;

      setResultMeta({
        coachPhone: "96894486154",
        fileId: generatedFileId,
      });

      setStatus({
        loading: false,
        success: true,
        error: "",
        isCalcMissing: false,
      });
    } catch (err) {
      const fallbackFileId = `NOUH-${Math.floor(1000 + Math.random() * 9000)}`;
      setResultMeta({
        coachPhone: "96894486154",
        fileId: fallbackFileId,
      });
      setStatus({
        loading: false,
        success: true,
        error: "",
        isCalcMissing: false,
      });
    }
  };

  // کارت نتیجه موفقیت‌آمیز
  if (status.success) {
    const cleanCoachPhone = "96894486154";
    const currentLocationLabel =
      ui.locations.find((l) => l.id === formData.location)?.label ||
      formData.location;

    const calText = calcData?.result?.targetCalories
      ? `\n${ui.success.waTargetCal} *${calcData.result.targetCalories} kcal*`
      : "";

    const weightText = calcData?.weight
      ? `\n${ui.success.waWeight} *${calcData.weight} kg*`
      : "";

    const trainingDaysText = formData.trainingDays
      ? `\n${ui.success.waTrainingDays} *${formData.trainingDays} ${ui.trainingDaysUnit}*`
      : "";

    const locationText = `\n${ui.success.waLocation} *${currentLocationLabel}*`;

    const waMessage = `${ui.success.waHello}\n${ui.success.waIm} *${formData.name}*، ${ui.success.waRegistered}\n📌 *${currentPlan.title} (${currentPlan.price} - ${currentPlan.duration})*\n📋 ${ui.success.fileIdLabel} \`\`\`${resultMeta.fileId}\`\`\`\n\n${ui.success.waBiometricsHeader}${locationText}${weightText}${calText}${trainingDaysText}\n\n${ui.success.waReady}`;

    const waLink = `https://wa.me/${cleanCoachPhone}?text=${encodeURIComponent(
      waMessage,
    )}`;

    return (
      <section
        id="booking"
        dir={isRtl ? "rtl" : "ltr"}
        className="relative w-full py-16 md:py-24 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep"
      >
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-24 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[450px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />
          <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />
          <div className="absolute -bottom-24 left-1/3 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08120d]/95 p-8 sm:p-12 text-center shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl antialiased">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-athar-lime/30 bg-athar-lime/15 text-athar-lime shadow-[0_0_20px_rgba(167,217,87,0.3)]">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <span className="mt-5 inline-block font-sans text-xs font-black text-athar-lime bg-athar-lime/15 px-3.5 py-1 rounded-full border border-athar-lime/30">
              {ui.success.fileIdLabel} {resultMeta.fileId}
            </span>

            <h3 className="mt-3 text-2xl sm:text-3xl font-black text-white">
              {ui.success.title}
            </h3>

            <p className="mx-auto mt-2 text-sm font-bold text-athar-lime">
              {ui.success.confirmed} {currentPlan.title} ({currentPlan.price})
            </p>

            <p className="mx-auto mt-3 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-300 font-medium">
              {ui.success.desc}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-athar-lime hover:bg-athar-lime-hover px-8 py-4 text-xs sm:text-sm font-black text-athar-forest-deep shadow-[0_0_25px_rgba(167,217,87,0.4)] transition-all active:scale-[0.98] sm:w-auto"
              >
                <span>{ui.success.whatsappBtn}</span>
                <ExternalLink className="h-4 w-4 stroke-[2.5]" />
              </a>

              <button
                type="button"
                onClick={() => {
                  setFormData({
                    name: "",
                    phone: "",
                    location: "muscat",
                    selectedPlanId: "silver_plan",
                    goal: "cut",
                    experience: "beginner",
                    trainingDays: "4",
                    notes: "",
                  });
                  setCalcData(null);
                  setBiomechanicsData(null);
                  setSelectedPlanMeta(null);
                  setStatus({
                    loading: false,
                    success: false,
                    error: "",
                    isCalcMissing: false,
                  });
                }}
                className="w-full cursor-pointer rounded-full border border-white/15 bg-white/[0.05] px-6 py-4 text-xs font-bold text-slate-200 transition-colors hover:bg-white/[0.1] sm:w-auto"
              >
                {ui.success.newFormBtn}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const hasAnyBadge = Boolean(biomechanicsData || calcData || selectedPlanMeta);

  return (
    <section
      id="booking"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* هاله‌های نوری استودیویی در پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[450px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />
        <div className="absolute -bottom-24 left-1/3 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش فرم */}
        <div className="mb-10 text-center md:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <Sparkles className="h-3.5 w-3.5 text-athar-lime animate-pulse" />
            <span className="text-xs font-bold text-athar-cream tracking-wide">
              {ui.sectionBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-white leading-tight">
            {ui.sectionTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300/90 max-w-xl mx-auto leading-relaxed font-medium">
            {ui.sectionSubtitle}
          </p>
        </div>

        {/* کارت اصلی فرم (دارک گلس‌مورفیسم لوکس) */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#08120d]/95 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-start antialiased">
          {/* بخش بج‌های زنده الصاق‌شده */}
          {hasAnyBadge && (
            <div className="mb-8 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-bold text-athar-lime">
                <Sparkles className="h-4 w-4" />
                <span>{ui.badgesContainerTitle}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
                {/* ۱. بج بیومکانیک */}
                {biomechanicsData && (
                  <div className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-sm">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-athar-lime">
                          <Activity className="h-3.5 w-3.5" />
                          <span>{ui.badgeBiomechanicsTitle}</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveBiomechanics}
                          className="cursor-pointer rounded-lg p-0.5 text-slate-400 hover:text-red-400"
                          title={ui.dismissBadge}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <h4 className="mt-1 text-xs font-bold text-white">
                        {isRtl
                          ? biomechanicsData.nameAr || biomechanicsData.name
                          : biomechanicsData.nameEn || biomechanicsData.name}
                      </h4>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5 text-[10px]">
                      <span className="text-slate-400">
                        {ui.screeningFocusLabel}
                      </span>
                      <span className="font-bold text-athar-lime truncate max-w-[65%] text-end">
                        {biomechanicsData.riskReduction || "معتمد"}
                      </span>
                    </div>
                  </div>
                )}

                {/* ۲. بج ماشین‌حساب نوح */}
                {calcData && (
                  <div className="relative flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3 shadow-sm">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-amber-400">
                          <Flame className="h-3.5 w-3.5 fill-current" />
                          <span>{ui.badgeCalculatorTitle}</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleRemoveCalculator}
                          className="cursor-pointer rounded-lg p-0.5 text-slate-400 hover:text-red-400"
                          title={ui.dismissBadge}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="mt-1 flex items-baseline gap-1.5">
                        <span className="font-sans text-lg font-black text-white">
                          {calcData.result?.targetCalories ||
                            calcData.result?.calories}
                        </span>
                        <span className="font-sans text-[10px] font-bold text-athar-lime">
                          {isRtl ? "سعرة" : "KCAL"}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium ms-auto truncate">
                          {calcData.weight}kg • {calcData.height}cm
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5 text-[10px]">
                      <span className="text-slate-400">{ui.forecastLabel}</span>
                      <span className="font-bold text-athar-lime truncate">
                        {calcData.result?.goal || calcData.goal}
                      </span>
                    </div>
                  </div>
                )}

                {/* ۳. بج پلن قیمتی */}
                {selectedPlanMeta && (
                  <div className="relative flex flex-col justify-between rounded-xl border border-athar-lime/40 bg-athar-lime/10 p-3 shadow-sm">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-black text-athar-lime">
                          <ShieldCheck className="h-3.5 w-3.5" />
                          <span>{ui.badgePlanTitle}</span>
                        </span>
                        <button
                          type="button"
                          onClick={handleRemovePlan}
                          className="cursor-pointer rounded-lg p-0.5 text-slate-400 hover:text-red-400"
                          title={ui.dismissBadge}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <h4 className="mt-1 text-xs font-black text-white">
                        {selectedPlanMeta.title}
                      </h4>
                    </div>

                    <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-1.5 text-[10px]">
                      <span className="text-slate-300">
                        {selectedPlanMeta.duration}
                      </span>
                      <span className="font-sans text-xs font-black text-athar-lime">
                        {selectedPlanMeta.price}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* فرم ثبت اطلاعات */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ۱. انتخاب بسته تمرینی */}
            <div>
              <label className="mb-2.5 block text-xs font-bold text-slate-200">
                {ui.planSectionTitle} <span className="text-red-400">*</span>
              </label>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
                {availablePlans.map((plan) => {
                  const isSelected = formData.selectedPlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          selectedPlanId: plan.id,
                        }))
                      }
                      className={`relative flex flex-col justify-between rounded-2xl border p-3.5 text-start transition-all cursor-pointer ${
                        isSelected
                          ? "border-athar-lime/60 bg-athar-lime/15 ring-1 ring-athar-lime/50 shadow-[0_0_15px_rgba(167,217,87,0.15)]"
                          : "border-white/10 bg-white/[0.03] hover:border-white/25 hover:bg-white/[0.06]"
                      }`}
                    >
                      <div className="flex w-full items-center justify-between">
                        <span
                          className={`text-xs font-black ${
                            isSelected ? "text-athar-lime" : "text-white"
                          }`}
                        >
                          {plan.title}
                        </span>
                        <span
                          className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? "border-athar-lime bg-athar-lime"
                              : "border-white/20 bg-black/40"
                          }`}
                        >
                          {isSelected && (
                            <span className="h-1.5 w-1.5 rounded-full bg-athar-forest-deep" />
                          )}
                        </span>
                      </div>
                      <div className="mt-2.5 flex items-baseline justify-between border-t border-white/10 pt-2 text-[11px]">
                        <span className="text-slate-400">{plan.duration}</span>
                        <span className="font-sans font-bold text-athar-lime">
                          {plan.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ۲. نام و شماره تلفن */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-name"
                  className="mb-2 block text-xs font-bold text-slate-200"
                >
                  {ui.nameLabel} <span className="text-red-400">*</span>
                </label>
                <input
                  id="booking-name"
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={ui.namePlaceholder}
                  className="w-full rounded-2xl border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all focus:border-athar-lime focus:bg-black/60"
                />
              </div>

              <div>
                <label
                  htmlFor="booking-phone"
                  className="mb-2 block text-xs font-bold text-slate-200"
                >
                  {ui.phoneLabel} <span className="text-red-400">*</span>
                </label>
                <div className="relative flex rounded-2xl border border-white/15 bg-black/40 transition-all focus-within:border-athar-lime focus-within:bg-black/60">
                  <div className="relative flex items-center border-e border-white/15 bg-white/[0.06] rounded-s-2xl px-2.5">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="cursor-pointer appearance-none bg-transparent pe-5 text-xs font-sans font-bold text-white outline-none"
                      dir="ltr"
                    >
                      {ARAB_COUNTRIES.map((c) => (
                        <option
                          key={c.code}
                          value={c.code}
                          className="bg-[#08120d] text-white"
                        >
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute end-2 text-[10px] text-slate-400">
                      ▼
                    </span>
                  </div>

                  <input
                    id="booking-phone"
                    type="tel"
                    name="phone"
                    required
                    dir="ltr"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={ui.phonePlaceholder}
                    className="w-full bg-transparent p-3.5 font-sans text-sm text-white placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* ۳. انتخاب لوکیشن در عمان و هدف */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="booking-location"
                  className="mb-2 block text-xs font-bold text-slate-200 flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-athar-lime" />
                  <span>{ui.locationLabel}</span>
                </label>
                <select
                  id="booking-location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-white/15 bg-black/40 p-3.5 text-sm text-white outline-none transition-colors focus:border-athar-lime focus:bg-black/60"
                >
                  {ui.locations.map((loc) => (
                    <option
                      key={loc.id}
                      value={loc.id}
                      className="bg-[#08120d] text-white"
                    >
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="booking-goal"
                  className="mb-2 block text-xs font-bold text-slate-200"
                >
                  {ui.goalLabel}
                </label>
                <select
                  id="booking-goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full rounded-2xl border border-white/15 bg-black/40 p-3.5 text-sm text-white outline-none transition-colors focus:border-athar-lime focus:bg-black/60"
                >
                  {ui.goals.map((g) => (
                    <option
                      key={g.id}
                      value={g.id}
                      className="bg-[#08120d] text-white"
                    >
                      {g.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ۴. سابقه تمرینی و روزهای تمرین در هفته */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-2 block text-xs font-bold text-slate-200">
                  {ui.experienceLabel}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {ui.experienceLevels.map((exp) => (
                    <button
                      key={exp.id}
                      type="button"
                      onClick={() =>
                        setFormData((p) => ({ ...p, experience: exp.id }))
                      }
                      className={`cursor-pointer rounded-xl border p-2.5 text-center text-[11px] font-bold transition-all ${
                        formData.experience === exp.id
                          ? "border-athar-lime bg-athar-lime text-athar-forest-deep shadow-xs"
                          : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                      }`}
                    >
                      {exp.label.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-athar-lime" />
                    <span>{ui.trainingDaysLabel}</span>
                  </label>
                  <span className="font-sans text-xs font-black text-athar-lime">
                    {formData.trainingDays} {ui.trainingDaysUnit}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5">
                  {ui.trainingDaysOptions.map((opt) => {
                    const isSelected = formData.trainingDays === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            trainingDays: opt.id,
                          }))
                        }
                        className={`cursor-pointer flex flex-col items-center justify-center rounded-xl border p-2.5 transition-all ${
                          isSelected
                            ? "border-athar-lime bg-athar-lime text-athar-forest-deep shadow-xs"
                            : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <span className="font-sans text-xs font-black">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ۵. ملاحظات سلامت و آسیب‌دیدگی‌ها */}
            <div>
              <label
                htmlFor="booking-notes"
                className="mb-2 block text-xs font-bold text-slate-200"
              >
                {ui.notesLabel}
              </label>
              <textarea
                id="booking-notes"
                rows="3"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder={ui.notesPlaceholder}
                className="w-full rounded-2xl border border-white/15 bg-black/40 p-3.5 text-sm text-white placeholder-slate-400 outline-none transition-all focus:border-athar-lime focus:bg-black/60"
              />
            </div>

            {/* کادر هشدار تکمیل ماشین‌حساب */}
            {status.error && (
              <div
                className={`rounded-2xl border p-4 text-xs transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 ${
                  status.isCalcMissing
                    ? "border-amber-400/50 bg-amber-500/10 text-amber-300"
                    : "border-red-400/50 bg-red-500/10 text-red-300"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <AlertCircle className="h-5 w-5 shrink-0 text-amber-400" />
                  <span className="font-semibold leading-relaxed">
                    {status.error}
                  </span>
                </div>
                {status.isCalcMissing && (
                  <button
                    type="button"
                    onClick={scrollToCalculator}
                    className="cursor-pointer shrink-0 rounded-full bg-athar-lime px-4 py-2 text-[11px] font-black text-athar-forest-deep transition-transform hover:bg-athar-lime-hover active:scale-95"
                  >
                    {ui.goToCalcBtn}
                  </button>
                )}
              </div>
            )}

            {/* دکمه ثبت نهایی */}
            <button
              type="submit"
              disabled={status.loading}
              className="relative flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-athar-lime hover:bg-athar-lime-hover py-4 text-center text-xs sm:text-sm font-black text-athar-forest-deep shadow-[0_0_28px_rgba(167,217,87,0.4)] transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {status.loading ? (
                <div className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-athar-forest-deep border-t-transparent" />
                  <span>{ui.submitLoading}</span>
                </div>
              ) : (
                <>
                  <span>
                    {ui.submitPrefix} {currentPlan.title} {ui.submitSuffix}
                  </span>
                  {isRtl ? (
                    <ArrowLeft className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <ArrowRight className="h-4 w-4 stroke-[2.5]" />
                  )}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
