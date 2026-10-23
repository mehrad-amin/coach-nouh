// src/components/FitnessCalculator.jsx
"use client";

import React, {
  useState,
  useEffect,
  useId,
  useSyncExternalStore,
  useMemo,
  useRef,
} from "react";
import {
  Flame,
  Scale,
  Zap,
  RotateCcw,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  User,
  Check,
  Calculator,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* محتوای سلیس و بومی عربی سفید منطبق بر هویت مربی نوح                        */
/* -------------------------------------------------------------------------- */
const CALCULATOR_DATA = {
  ar: {
    sectionBadge: "التقييم البدني الذاتي • كوتش نوح",
    sectionTitle: "احسب احتياجك اليومي واكتشف مسار تطورك",
    sectionSubtitle:
      "أداة تحليل حركي وأيضي ذكية لتحديد سعراتك واحتياجك الفعلي وخارطة تحولك التقديرية مع الكابتن نوح خلال ١٢ أسبوعاً.",

    badge: "المحرك الأيضي والبدني",
    resetBtn: "إعادة ضبط",
    calculateBtn: "تحليل المؤشرات وتوليد خطة التحول",
    recalculateBtn: "تحديث مؤشرات الخطة والمسار",
    calculatingText: "جاري تحليل الاستجابة الحركية والاحتياج الأيضي...",
    resultsTitle: "خارطة التغير البدني والمسار الحركي (١٢ أسبوعاً)",
    targetLabel: "الهدف اليومي المقترح من السعرات:",
    kcalUnit: "سعرة / يوم",
    bmrLabel: "معدل الأيض BMR:",
    tdeeLabel: "الاحتياج اليومي TDEE:",

    profileSection: "البيانات الشخصية الأساسية:",
    genderMale: "رجل",
    genderFemale: "امرأة",
    weightLabel: "الوزن الحالي",
    heightLabel: "الطول",
    ageLabel: "العمر",
    yearsUnit: "سنة",
    kgUnit: "كجم",
    cmUnit: "سم",

    activitySection: "مستوى النشاط الحركي اليومي في عُمان:",
    activityLevels: [
      {
        id: "sedentary",
        factor: "1.2",
        label: "خامل أو مكتبي",
        desc: "جلوس طويل وقلة في الحركة",
      },
      {
        id: "light",
        factor: "1.375",
        label: "نشاط خفيف",
        desc: "مشي خفيف ١-٢ يوم أسبوعياً",
      },
      {
        id: "moderate",
        factor: "1.55",
        label: "نشاط معتدل",
        desc: "تمارين منتظمة ٣-٤ أيام أسبوعياً",
      },
      {
        id: "high",
        factor: "1.725",
        label: "نشاط مكثف",
        desc: "مجهود حركي عالٍ معظم الأيام",
      },
    ],

    goalSection: "الهدف البدني والحركي المنشود:",
    goals: {
      cut: "خسارة دهون ومرونة",
      maintain: "إعادة تشكيل القوام",
      bulk: "بناء قوة ولياقة",
    },

    nutritionSection: "طبيعة النمط الغذائي الحالي:",
    nutritionOptions: [
      {
        id: "home",
        label: "أكل منزلي واقعي بدون تعقيد",
        desc: "وجبات بيت معتدلة بدون ميزان غرامات دقيق",
      },
      {
        id: "coached",
        label: "نظام غذائي محدد ومرن",
        desc: "توزيع مدروس للعناصر لدعم المفاصل والنشاط",
      },
    ],

    gearSection: "طبيعة بيئة ومعدات التمرين:",
    gearOptions: [
      {
        id: "minimal",
        label: "أدوات بسيطة وتمارين وظيفية",
        desc: "حبال، أوزان خفيفة ووزن الجسم (أسلوب كوتش نوح الأساسي)",
      },
      {
        id: "gym",
        label: "تمارين شاملة داخل النادي",
        desc: "دمج الأدوات الحرة مع أجهزة الصالة المتاحة",
      },
    ],

    macros: {
      protein: "بروتين",
      carbs: "كارب",
      fats: "دهون",
    },

    forecastBadge: "المسار الزمني التقديري",
    forecastTitle: "توقعات التطور الحركي والجسدي",
    tabWeek4: "الأسبوع ٤",
    tabWeek8: "الأسبوع ٨",
    tabWeek12: "الأسبوع ١٢",
    targetWeightLabel: "الوزن التقديري المتوقع:",
    deltaLabel: "صافي التغير التراكمي:",
    compositionLabel: "جودة التغير البدني:",

    disclaimer:
      "تنبيه علمي: هذه الأرقام تقديرية مدروسة وفق توازن الطاقة والميكانيكا الحركية؛ تتأثر سرعة استجابة الجسم بجودة النوم، الانتظام في الحصص ونمط الحياة اليومي في سلطنة عُمان.",

    ctaPrefix: "اعتماد خطة الـ",
    ctaSuffix: "سعرة وحفظها في التقييم",
    ctaPinnedPrefix: "تم حفظ خطة الـ",
    ctaPinnedSuffix: "سعرة لملف تدريبك مع كوتش نوح ✓",
  },

  en: {
    sectionBadge: "SELF ASSESSMENT • COACH NOUH",
    sectionTitle: "Calculate Your Needs & Discover Your Trajectory",
    sectionSubtitle:
      "Smart metabolic and kinetic assessment engine to identify your optimal calories and 12-week transformation blueprint with Coach Nouh.",

    badge: "METABOLIC & KINETIC ENGINE",
    resetBtn: "Reset",
    calculateBtn: "Analyze Biometrics & Generate Roadmap",
    recalculateBtn: "Update Roadmap Projections",
    calculatingText: "Analyzing movement kinetics and caloric expenditure...",
    resultsTitle: "12-Week Kinetic & Physical Transformation Blueprint",
    targetLabel: "Recommended Daily Caloric Intake:",
    kcalUnit: "KCAL / DAY",
    bmrLabel: "Basal Metabolism BMR:",
    tdeeLabel: "Total Maintenance TDEE:",

    profileSection: "Primary Biometric Profile:",
    genderMale: "Male",
    genderFemale: "Female",
    weightLabel: "Current Weight",
    heightLabel: "Height",
    ageLabel: "Age",
    yearsUnit: "Years",
    kgUnit: "kg",
    cmUnit: "cm",

    activitySection: "Daily Activity Cadence in Oman:",
    activityLevels: [
      {
        id: "sedentary",
        factor: "1.2",
        label: "Desk / Sedentary",
        desc: "Prolonged sitting with minimal movement",
      },
      {
        id: "light",
        factor: "1.375",
        label: "Light Activity",
        desc: "Walking or light exercise 1-2 days/week",
      },
      {
        id: "moderate",
        factor: "1.55",
        label: "Moderate Activity",
        desc: "Regular workouts 3-4 days/week",
      },
      {
        id: "high",
        factor: "1.725",
        label: "Intense Cadence",
        desc: "High daily physical and training load",
      },
    ],

    goalSection: "Primary Kinetic Objective:",
    goals: {
      cut: "Fat Loss & Mobility",
      maintain: "Body Recomposition",
      bulk: "Strength & Conditioning",
    },

    nutritionSection: "Current Dietary Discipline:",
    nutritionOptions: [
      {
        id: "home",
        label: "Realistic Home Cooking",
        desc: "Mindful whole foods without rigid gram-weighing",
      },
      {
        id: "coached",
        label: "Tailored Flexible Nutrition",
        desc: "Engineered macro ratios supporting joints & recovery",
      },
    ],

    gearSection: "Training Environment & Gear:",
    gearOptions: [
      {
        id: "minimal",
        label: "Minimal Functional Gear",
        desc: "Ropes, calisthenics & light gear (Coach Nouh's core method)",
      },
      {
        id: "gym",
        label: "Full Gym Facility",
        desc: "Integrating free weights with commercial machines",
      },
    ],

    macros: {
      protein: "Protein",
      carbs: "Carbs",
      fats: "Fats",
    },

    forecastBadge: "Estimated Milestone Forecast",
    forecastTitle: "Physical & Movement Progression",
    tabWeek4: "Week 4",
    tabWeek8: "Week 8",
    tabWeek12: "Week 12",
    targetWeightLabel: "Projected Target Weight:",
    deltaLabel: "Net Projected Change:",
    compositionLabel: "Kinetic & Tissue Transformation:",

    disclaimer:
      "Scientific Notice: Projections are biometric estimations based on energy balance. Results adapt according to sleep quality, session consistency, and daily routine in Oman.",

    ctaPrefix: "Lock In",
    ctaSuffix: "KCAL Protocol & Save",
    ctaPinnedPrefix: "Saved",
    ctaPinnedSuffix: "KCAL Protocol to Coach Nouh Profile ✓",
  },
};

const subscribeSessionStorage = (callback) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSessionSnapshot = () => {
  if (typeof window === "undefined") return "";
  try {
    return sessionStorage.getItem("user_fitness_data") || "";
  } catch {
    return "";
  }
};

const getServerSnapshot = () => "";

export default function FitnessCalculator({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const t = CALCULATOR_DATA[lang] || CALCULATOR_DATA.ar;
  const activityLevels = t.activityLevels;

  const resultsRef = useRef(null);

  const sessionRaw = useSyncExternalStore(
    subscribeSessionStorage,
    getSessionSnapshot,
    getServerSnapshot,
  );

  const parsedInitial = useMemo(() => {
    if (!sessionRaw) return null;
    try {
      return JSON.parse(sessionRaw);
    } catch {
      return null;
    }
  }, [sessionRaw]);

  // پارامترهای ورودی
  const [gender, setGender] = useState("male");
  const [weight, setWeight] = useState(82);
  const [height, setHeight] = useState(178);
  const [age, setAge] = useState(28);
  const [activityIdx, setActivityIdx] = useState(1);
  const [goal, setGoal] = useState("cut");
  const [nutrition, setNutrition] = useState("coached");
  const [gear, setGear] = useState("minimal");

  const [showResults, setShowResults] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedWeek, setSelectedWeek] = useState(12);
  const [isPinned, setIsPinned] = useState(false);

  const isHydratedFromStore = useRef(false);
  useEffect(() => {
    if (!isHydratedFromStore.current && parsedInitial) {
      isHydratedFromStore.current = true;
      if (parsedInitial.gender) setGender(parsedInitial.gender);
      if (parsedInitial.weight) setWeight(Number(parsedInitial.weight));
      if (parsedInitial.height) setHeight(Number(parsedInitial.height));
      if (parsedInitial.age) setAge(Number(parsedInitial.age));
      if (parsedInitial.nutrition) setNutrition(parsedInitial.nutrition);
      if (parsedInitial.gear) setGear(parsedInitial.gear);
      if (parsedInitial.result?.goalKey) setGoal(parsedInitial.result.goalKey);
      if (parsedInitial.activity) {
        const idx = activityLevels.findIndex(
          (a) => a.factor === String(parsedInitial.activity),
        );
        if (idx !== -1) setActivityIdx(idx);
      }
      if (parsedInitial.result) {
        setShowResults(true);
      }
    }
  }, [parsedInitial, activityLevels]);

  // محاسبات علمی BMR و TDEE
  const bmrBase = 10 * weight + 6.25 * height - 5 * age;
  const bmr = Math.round(gender === "male" ? bmrBase + 5 : bmrBase - 161);
  const currentActivity = activityLevels[activityIdx] || activityLevels[1];
  const activityFactor = parseFloat(currentActivity.factor);
  const tdee = Math.round(bmr * activityFactor);

  const targetCaloriesDiff =
    goal === "cut"
      ? nutrition === "coached"
        ? 450
        : 350
      : goal === "bulk"
        ? nutrition === "coached"
          ? 350
          : 250
        : 0;

  const targets = {
    cut: Math.round(tdee - targetCaloriesDiff),
    maintain: tdee,
    bulk: Math.round(tdee + targetCaloriesDiff),
  };

  const activeTarget = targets[goal];

  const proteinRatio = goal === "bulk" ? 0.28 : 0.32;
  const protein = Math.round((activeTarget * proteinRatio) / 4);
  const carbs = Math.round((activeTarget * 0.42) / 4);
  const fats = Math.round((activeTarget * (1 - proteinRatio - 0.42)) / 9);

  // پیش‌بینی ۱۲ هفته‌ای
  const projectionData = useMemo(() => {
    const exerciseEfficiency = (activityFactor - 1.0) / 0.725;
    const dietMultiplier = nutrition === "coached" ? 1.0 : 0.7;

    const calculateForWeek = (wk) => {
      if (goal === "cut") {
        const baseWeeklyLoss =
          weight * 0.0055 * (0.6 + exerciseEfficiency * 0.4) * dietMultiplier;
        const totalLoss = baseWeeklyLoss * wk;

        const minL = Math.max(0.8, totalLoss * 0.88).toFixed(1);
        const maxL = (totalLoss * 1.12).toFixed(1);

        const wMin = (weight - Number(maxL)).toFixed(1);
        const wMax = (weight - Number(minL)).toFixed(1);

        const composition =
          exerciseEfficiency > 0.5 && nutrition === "coached"
            ? lang === "ar"
              ? "حرق دهون صافي مع تحرر المفاصل وحماية تامة للكتلة العضلية"
              : "Pure fat reduction with enhanced joint mobility and zero muscle loss"
            : lang === "ar"
              ? "نزول تدريجي في الوزن مع تحسن عام في الخفة اليومية والنشاط"
              : "Gradual weight loss with steady daily kinetic lightness";

        return {
          weightRange: `${wMin} ~ ${wMax} kg`,
          delta: `-${minL} ~ -${maxL} kg`,
          composition,
        };
      } else if (goal === "bulk") {
        const muscleBuildRate = 0.2 * exerciseEfficiency * dietMultiplier;
        const totalGain = muscleBuildRate * wk + (wk >= 4 ? 0.4 : 0.1);

        const minG = Math.max(0.4, totalGain * 0.85).toFixed(1);
        const maxG = (totalGain * 1.15).toFixed(1);

        const wMin = (weight + Number(minG)).toFixed(1);
        const wMax = (weight + Number(maxG)).toFixed(1);

        const composition =
          exerciseEfficiency > 0.5
            ? lang === "ar"
              ? "بناء قوة وظيفية وكثافة عضلية حقيقية خالية من الدهون الزائدة"
              : "Functional strength and clean athletic density without excess fat"
            : lang === "ar"
              ? "زيادة تدريجية في القوة البدنية والتحمل العام"
              : "Progressive physical strength and overall stamina increase";

        return {
          weightRange: `${wMin} ~ ${wMax} kg`,
          delta: `+${minG} ~ +${maxG} kg`,
          composition,
        };
      }

      const wMin = (weight - 0.4).toFixed(1);
      const wMax = (weight + 0.4).toFixed(1);

      return {
        weightRange: `${wMin} ~ ${wMax} kg`,
        delta: "± 0.5 kg",
        composition:
          lang === "ar"
            ? "إعادة تشكيل القوام (حرق دهون موضعي، كسب مرونة واكتساب وعي حركي)"
            : "Body recomposition (localized fat reduction & kinetic mobility mastery)",
      };
    };

    return {
      4: calculateForWeek(4),
      8: calculateForWeek(8),
      12: calculateForWeek(12),
    };
  }, [weight, goal, activityFactor, nutrition, lang]);

  const currentWeekMetrics = projectionData[selectedWeek];

  const handleCalculateClick = () => {
    setIsCalculating(true);
    setIsPinned(false);

    setTimeout(() => {
      setIsCalculating(false);
      setShowResults(true);

      const goalTitle = t.goals[goal] || goal;
      const calcResult = {
        tdee: activeTarget,
        targetCalories: activeTarget,
        calories: activeTarget,
        selectedGoalCalories: activeTarget,
        goal: goalTitle,
        goalKey: goal,
        maintenance: tdee,
        cutting: targets.cut,
        bulking: targets.bulk,
        bmr,
        nutritionType: nutrition,
        gearType: gear,
        projection: {
          targetWeeks: 12,
          estimatedWeight: projectionData[12].weightRange,
          expectedDelta: projectionData[12].delta,
          composition: projectionData[12].composition,
        },
      };

      const payload = {
        gender,
        weight: String(weight),
        height: String(height),
        age: String(age),
        activity: currentActivity.factor,
        nutrition,
        gear,
        goal: goalTitle,
        result: calcResult,
      };

      try {
        sessionStorage.setItem("user_fitness_data", JSON.stringify(payload));
        window.dispatchEvent(
          new CustomEvent("fitness_calc_updated", { detail: payload }),
        );
      } catch (err) {
        console.error("Storage dispatch error", err);
      }

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }, 400);
  };

  const handleReset = () => {
    setGender("male");
    setWeight(82);
    setHeight(178);
    setAge(28);
    setActivityIdx(1);
    setGoal("cut");
    setNutrition("coached");
    setGear("minimal");
    setSelectedWeek(12);
    setShowResults(false);
    setIsPinned(false);

    try {
      sessionStorage.removeItem("user_fitness_data");
      window.dispatchEvent(
        new CustomEvent("fitness_calc_updated", { detail: null }),
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePinAction = () => {
    setIsPinned(true);
    try {
      const stored = sessionStorage.getItem("user_fitness_data");
      if (stored) {
        window.dispatchEvent(
          new CustomEvent("fitness_calc_updated", {
            detail: JSON.parse(stored),
          }),
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  const weightInputId = useId();
  const heightInputId = useId();
  const ageInputId = useId();

  return (
    <section
      id="calculator"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-athar-cream border-b border-athar-border transition-colors"
    >
      {/* -------------------------------------------------------------------------- */}
      {/* فرم‌های هندسی پس‌زمینه (انتقال دایره پایینی به گوشه سمت راست و پایین)       */}
      {/* -------------------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* ۱. دایره کرم تیره در بالا - راست */}
        <div className="absolute -top-16 -right-16 sm:-top-28 sm:-right-28 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-cream-dark" />

        {/* ۲. دایره لیمویی در حاشیه سمت چپ */}
        <div className="absolute top-1/2 -left-20 sm:-left-32 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-athar-lime/25" />

        {/* ۳. دایره سبز ملایم در گوشه پایین - راست سکشن (جایگاه اصلاح‌شده) */}
        <div className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-forest/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش ماشین‌حساب */}
        <div className="mb-10 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-athar-border shadow-2xs mb-3">
            <Calculator className="h-3.5 w-3.5 text-athar-forest" />
            <span className="text-xs font-bold text-athar-forest-deep">
              {t.sectionBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-athar-forest-deep leading-tight max-w-3xl mx-auto">
            {t.sectionTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-athar-muted max-w-xl mx-auto leading-relaxed font-medium">
            {t.sectionSubtitle}
          </p>
        </div>

        {/* کانتینر کارت ماشین‌حساب */}
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-athar-border bg-white p-5 sm:p-8 md:p-10 shadow-athar-soft text-start">
          {/* سربرگ کارت و دکمه ریست */}
          <div className="flex items-center justify-between border-b border-athar-border/70 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-athar-forest opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-athar-lime" />
              </span>
              <span className="text-xs font-black tracking-wide text-athar-forest-deep">
                {t.badge}
              </span>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-athar-border bg-athar-cream/70 px-3 py-1 text-[11px] font-bold text-athar-muted transition-colors hover:border-red-400/50 hover:bg-red-50 hover:text-red-600"
              title={t.resetBtn}
            >
              <RotateCcw className="h-3 w-3" />
              <span>{t.resetBtn}</span>
            </button>
          </div>

          {/* ۱. فرم ورودی شاخص‌ها */}
          <div className="mt-6 space-y-5">
            {/* انتخاب جنسیت */}
            <div>
              <span className="mb-2 block text-xs font-bold text-athar-forest-deep">
                {t.profileSection}
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setGender("male");
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border py-3 text-xs font-black transition-all ${
                    gender === "male"
                      ? "border-athar-forest bg-athar-forest text-white shadow-athar-soft"
                      : "border-athar-border bg-athar-cream/40 text-athar-muted hover:border-athar-forest/30 hover:text-athar-forest"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{t.genderMale}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGender("female");
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border py-3 text-xs font-black transition-all ${
                    gender === "female"
                      ? "border-athar-forest bg-athar-forest text-white shadow-athar-soft"
                      : "border-athar-border bg-athar-cream/40 text-athar-muted hover:border-athar-forest/30 hover:text-athar-forest"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{t.genderFemale}</span>
                </button>
              </div>
            </div>

            {/* اسلایدر وزن: با هماهنگی ۱۰۰٪ جهت اعداد در عربی و انگلیسی */}
            <div className="rounded-2xl border border-athar-border bg-athar-cream/40 p-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={weightInputId}
                  className="text-xs font-bold text-athar-forest-deep"
                >
                  {t.weightLabel}
                </label>
                <div
                  className="flex items-baseline gap-1"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <span className="font-sans text-2xl font-black text-athar-forest">
                    {weight}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-athar-muted">
                    {t.kgUnit}
                  </span>
                </div>
              </div>
              <input
                id={weightInputId}
                type="range"
                dir={isRtl ? "rtl" : "ltr"}
                min="35"
                max="200"
                step="1"
                value={weight}
                onChange={(e) => {
                  setWeight(Number(e.target.value));
                  setIsPinned(false);
                }}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-athar-cream-dark accent-athar-forest"
              />
              {/* ردیف اعداد با چیدمان اصولی و هماهنگ با جهت لغزنده */}
              <div
                className="mt-1 flex justify-between font-sans text-[10px] font-semibold text-athar-muted"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <span>35 {t.kgUnit}</span>
                <span>115 {t.kgUnit}</span>
                <span>200 {t.kgUnit}</span>
              </div>
            </div>

            {/* اسلایدر قد */}
            <div className="rounded-2xl border border-athar-border bg-athar-cream/40 p-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={heightInputId}
                  className="text-xs font-bold text-athar-forest-deep"
                >
                  {t.heightLabel}
                </label>
                <div
                  className="flex items-baseline gap-1"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <span className="font-sans text-2xl font-black text-athar-forest-deep">
                    {height}
                  </span>
                  <span className="text-[10px] font-sans font-bold text-athar-muted">
                    {t.cmUnit}
                  </span>
                </div>
              </div>
              <input
                id={heightInputId}
                type="range"
                dir={isRtl ? "rtl" : "ltr"}
                min="130"
                max="220"
                step="1"
                value={height}
                onChange={(e) => {
                  setHeight(Number(e.target.value));
                  setIsPinned(false);
                }}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-athar-cream-dark accent-athar-forest"
              />
              <div
                className="mt-1 flex justify-between font-sans text-[10px] font-semibold text-athar-muted"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <span>130 {t.cmUnit}</span>
                <span>175 {t.cmUnit}</span>
                <span>220 {t.cmUnit}</span>
              </div>
            </div>

            {/* اسلایدر سن */}
            <div className="rounded-2xl border border-athar-border bg-athar-cream/40 p-4">
              <div className="flex items-center justify-between">
                <label
                  htmlFor={ageInputId}
                  className="text-xs font-bold text-athar-forest-deep"
                >
                  {t.ageLabel}
                </label>
                <div
                  className="flex items-baseline gap-1"
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  <span className="font-sans text-2xl font-black text-athar-forest-deep">
                    {age}
                  </span>
                  <span className="text-[10px] font-bold text-athar-muted">
                    {t.yearsUnit}
                  </span>
                </div>
              </div>
              <input
                id={ageInputId}
                type="range"
                dir={isRtl ? "rtl" : "ltr"}
                min="14"
                max="80"
                step="1"
                value={age}
                onChange={(e) => {
                  setAge(Number(e.target.value));
                  setIsPinned(false);
                }}
                className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-athar-cream-dark accent-athar-forest"
              />
              <div
                className="mt-1 flex justify-between font-sans text-[10px] font-semibold text-athar-muted"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <span>14 {t.yearsUnit}</span>
                <span>45 {t.yearsUnit}</span>
                <span>80 {t.yearsUnit}</span>
              </div>
            </div>

            {/* سطح فعالیت روزانه */}
            <div>
              <span className="mb-2 block text-xs font-bold text-athar-forest-deep">
                {t.activitySection}
              </span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {activityLevels.map((lvl, idx) => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => {
                      setActivityIdx(idx);
                      setIsPinned(false);
                    }}
                    className={`flex cursor-pointer flex-col items-center rounded-2xl border p-3 text-center transition-all ${
                      activityIdx === idx
                        ? "border-athar-forest bg-athar-forest/10 shadow-2xs"
                        : "border-athar-border bg-athar-cream/40 hover:border-athar-forest/20"
                    }`}
                  >
                    <span
                      className={`text-xs font-black ${
                        activityIdx === idx
                          ? "text-athar-forest"
                          : "text-athar-forest-deep"
                      }`}
                    >
                      {lvl.label}
                    </span>
                    <span className="mt-1 text-[10px] leading-tight text-athar-muted">
                      {lvl.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* هدف ورزشی */}
            <div>
              <span className="mb-2 block text-xs font-bold text-athar-forest-deep">
                {t.goalSection}
              </span>
              <div className="grid grid-cols-3 gap-2 rounded-2xl border border-athar-border bg-athar-cream/50 p-1.5">
                <button
                  type="button"
                  onClick={() => {
                    setGoal("cut");
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black transition-all ${
                    goal === "cut"
                      ? "bg-athar-forest text-white shadow-athar-soft"
                      : "text-athar-muted hover:text-athar-forest"
                  }`}
                >
                  <Flame className="h-3.5 w-3.5 text-athar-lime" />
                  <span className="truncate">{t.goals.cut}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoal("maintain");
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black transition-all ${
                    goal === "maintain"
                      ? "bg-athar-forest text-white shadow-athar-soft"
                      : "text-athar-muted hover:text-athar-forest"
                  }`}
                >
                  <Scale className="h-3.5 w-3.5 text-athar-lime" />
                  <span className="truncate">{t.goals.maintain}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGoal("bulk");
                    setIsPinned(false);
                  }}
                  className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-black transition-all ${
                    goal === "bulk"
                      ? "bg-athar-forest text-white shadow-athar-soft"
                      : "text-athar-muted hover:text-athar-forest"
                  }`}
                >
                  <Zap className="h-3.5 w-3.5 text-athar-lime" />
                  <span className="truncate">{t.goals.bulk}</span>
                </button>
              </div>
            </div>

            {/* رویکرد تغذیه‌ای */}
            <div>
              <span className="mb-2 block text-xs font-bold text-athar-forest-deep">
                {t.nutritionSection}
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {t.nutritionOptions.map((opt) => {
                  const isSelected = nutrition === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setNutrition(opt.id);
                        setIsPinned(false);
                      }}
                      className={`flex cursor-pointer flex-col rounded-2xl border p-3.5 text-start transition-all ${
                        isSelected
                          ? "border-athar-forest bg-athar-forest/10 shadow-2xs"
                          : "border-athar-border bg-athar-cream/40 hover:border-athar-forest/20"
                      }`}
                    >
                      <span
                        className={`text-xs font-black ${
                          isSelected
                            ? "text-athar-forest"
                            : "text-athar-forest-deep"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="mt-1 text-[10px] leading-relaxed text-athar-muted">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* محیط و وسایل تمرین */}
            <div>
              <span className="mb-2 block text-xs font-bold text-athar-forest-deep">
                {t.gearSection}
              </span>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {t.gearOptions.map((opt) => {
                  const isSelected = gear === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => {
                        setGear(opt.id);
                        setIsPinned(false);
                      }}
                      className={`flex cursor-pointer flex-col rounded-2xl border p-3.5 text-start transition-all ${
                        isSelected
                          ? "border-athar-forest bg-athar-forest/10 shadow-2xs"
                          : "border-athar-border bg-athar-cream/40 hover:border-athar-forest/20"
                      }`}
                    >
                      <span
                        className={`text-xs font-black ${
                          isSelected
                            ? "text-athar-forest"
                            : "text-athar-forest-deep"
                        }`}
                      >
                        {opt.label}
                      </span>
                      <span className="mt-1 text-[10px] leading-relaxed text-athar-muted">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* دکمه اصلی تحلیل */}
          <div className="mt-8 border-t border-athar-border/80 pt-6">
            <button
              type="button"
              onClick={handleCalculateClick}
              disabled={isCalculating}
              className="relative flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-athar-forest py-4 text-center text-sm font-black text-white shadow-athar-float transition-all hover:bg-athar-forest-deep active:scale-[0.98] disabled:opacity-75"
            >
              {isCalculating ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>{t.calculatingText}</span>
                </>
              ) : (
                <>
                  <span>{showResults ? t.recalculateBtn : t.calculateBtn}</span>
                  {isRtl ? (
                    <ArrowLeft className="h-4 w-4 text-athar-lime" />
                  ) : (
                    <ArrowRight className="h-4 w-4 text-athar-lime" />
                  )}
                </>
              )}
            </button>
          </div>

          {/* ۲. بخش نمایش نتایج */}
          {showResults && (
            <div
              ref={resultsRef}
              className="mt-8 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500"
            >
              <div className="relative flex items-center justify-center py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-athar-border" />
                </div>
                <span className="relative rounded-full border border-athar-border bg-athar-cream px-4 py-1 text-xs font-black text-athar-forest-deep shadow-2xs">
                  {t.resultsTitle}
                </span>
              </div>

              {/* کارت کالری و ماکروها */}
              <div className="relative overflow-hidden rounded-3xl border border-athar-border bg-athar-cream/60 p-5 sm:p-6 shadow-athar-soft">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div className="text-center sm:text-start">
                    <span className="text-xs font-bold text-athar-muted">
                      {t.targetLabel}
                    </span>
                    <div className="mt-1 flex items-baseline justify-center gap-2 sm:justify-start">
                      <span className="font-sans text-4xl sm:text-5xl font-black tracking-tight text-athar-forest-deep">
                        {activeTarget}
                      </span>
                      <span className="font-sans text-xs font-black text-athar-forest">
                        {t.kcalUnit}
                      </span>
                    </div>

                    <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-athar-border bg-white px-2.5 py-1 text-athar-muted font-semibold whitespace-nowrap">
                        <span>{t.bmrLabel}</span>
                        <strong className="text-athar-forest-deep font-sans font-bold">
                          {bmr}
                        </strong>
                      </span>

                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-athar-border bg-white px-2.5 py-1 text-athar-muted font-semibold whitespace-nowrap">
                        <span>{t.tdeeLabel}</span>
                        <strong className="text-athar-forest-deep font-sans font-bold">
                          {tdee}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center sm:justify-start gap-2 rounded-2xl border border-athar-border bg-white p-3 shadow-2xs self-center lg:self-auto">
                    <div className="flex flex-col items-center px-2.5 min-w-[58px]">
                      <span className="text-[11px] font-bold text-athar-muted whitespace-nowrap">
                        {t.macros.protein}
                      </span>
                      <span className="font-sans text-xs font-black text-athar-forest-deep mt-1 whitespace-nowrap">
                        {protein}g
                      </span>
                    </div>
                    <div className="h-8 w-px bg-athar-border self-center" />
                    <div className="flex flex-col items-center px-2.5 min-w-[58px]">
                      <span className="text-[11px] font-bold text-athar-muted whitespace-nowrap">
                        {t.macros.carbs}
                      </span>
                      <span className="font-sans text-xs font-black text-athar-forest-deep mt-1 whitespace-nowrap">
                        {carbs}g
                      </span>
                    </div>
                    <div className="h-8 w-px bg-athar-border self-center" />
                    <div className="flex flex-col items-center px-2.5 min-w-[58px]">
                      <span className="text-[11px] font-bold text-athar-muted whitespace-nowrap">
                        {t.macros.fats}
                      </span>
                      <span className="font-sans text-xs font-black text-athar-forest-deep mt-1 whitespace-nowrap">
                        {fats}g
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* تایم‌لاین پیش‌بینی */}
              <div className="rounded-3xl border border-athar-border bg-white p-5 sm:p-6 shadow-athar-soft">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-athar-border pb-4">
                  <div>
                    <span className="inline-block text-[10px] font-bold tracking-wider text-athar-forest uppercase">
                      {t.forecastBadge}
                    </span>
                    <h4 className="text-sm font-black text-athar-forest-deep">
                      {t.forecastTitle}
                    </h4>
                  </div>

                  <div className="flex gap-1.5 rounded-xl border border-athar-border bg-athar-cream/70 p-1">
                    {[4, 8, 12].map((wk) => (
                      <button
                        key={wk}
                        type="button"
                        onClick={() => setSelectedWeek(wk)}
                        className={`cursor-pointer rounded-lg px-3 py-1 font-sans text-xs font-black transition-all ${
                          selectedWeek === wk
                            ? "bg-athar-forest text-white shadow-2xs"
                            : "text-athar-muted hover:text-athar-forest-deep"
                        }`}
                      >
                        {wk === 4
                          ? t.tabWeek4
                          : wk === 8
                            ? t.tabWeek8
                            : t.tabWeek12}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-3.5">
                  <div className="flex flex-col gap-2 rounded-2xl border border-athar-border bg-athar-cream/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-athar-muted block">
                        {t.targetWeightLabel}
                      </span>
                      <p
                        className="font-sans text-xl font-black text-athar-forest-deep mt-0.5"
                        dir="ltr"
                      >
                        {currentWeekMetrics.weightRange}
                      </p>
                    </div>
                    <div className="sm:text-end">
                      <span className="text-[10px] font-bold text-athar-muted block">
                        {t.deltaLabel}
                      </span>
                      <p
                        className="font-sans text-sm font-black text-athar-forest mt-0.5"
                        dir="ltr"
                      >
                        {currentWeekMetrics.delta}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-athar-lime/40 bg-athar-lime/15 p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-athar-forest-deep">
                      {t.compositionLabel}
                    </span>
                    <p className="mt-1 text-xs font-bold text-athar-forest-deep leading-relaxed">
                      {currentWeekMetrics.composition}
                    </p>
                  </div>

                  <p className="text-[10.5px] leading-relaxed text-athar-muted">
                    {t.disclaimer}
                  </p>
                </div>
              </div>

              {/* دکمه پین کردن نتیجه */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handlePinAction}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-full py-4 text-center text-xs sm:text-sm font-black transition-all shadow-md active:scale-[0.98] ${
                    isPinned
                      ? "bg-athar-lime text-athar-forest-deep shadow-lime-sm"
                      : "bg-athar-forest hover:bg-athar-forest-deep text-white shadow-athar-soft"
                  }`}
                >
                  {isPinned ? (
                    <>
                      <Check className="h-4 w-4 stroke-[3] text-athar-forest-deep" />
                      <span>
                        {t.ctaPinnedPrefix} {activeTarget} {t.ctaPinnedSuffix}
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-athar-lime" />
                      <span>
                        {t.ctaPrefix} {activeTarget} {t.ctaSuffix}
                      </span>
                      {isRtl ? (
                        <ArrowLeft className="h-4 w-4 text-athar-lime" />
                      ) : (
                        <ArrowRight className="h-4 w-4 text-athar-lime" />
                      )}
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
