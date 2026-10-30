// src/components/TestimonialsSection.jsx
"use client";

import React, { useState, useRef } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
  ShieldCheck,
  MapPin,
  TargetIcon,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* کامپوننت ستاره‌های امتیازدهی با درخشش نئونی لیمویی                         */
/* -------------------------------------------------------------------------- */
function RatingStars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-athar-lime text-athar-lime drop-shadow-[0_0_8px_rgba(167,217,87,0.45)]"
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* دیتای نظرات شاگردان با لوکیشن رسمی بایو (مسقط والسويق)                     */
/* -------------------------------------------------------------------------- */
const ATHAR_REVIEWS = {
  ar: [
    {
      id: 1,
      clientName: "م. هيثم المعمري",
      role: "مهندس مشاريع",
      city: "مسقط",
      rating: 5,
      tag: "استقلالية التدريب",
      statNumber: "١٠٠٪",
      statLabel: "قدرة على التمرين الذاتي",
      quote:
        "أهم ما كسبته مع كابتن محمد ليس مجرد لياقة عابرة، بل أنني بعد انتهاء البرنامج أصبحت قادراً على تصميم وتطبيق تماريني بنفسي أينما كنت دون الحاجة لتواجد مدرب.",
      duration: "برنامج ٣ أشهر",
    },
    {
      id: 2,
      clientName: "سالم البلوشي",
      role: "موظف قطاع خاص",
      city: "السويق",
      rating: 5,
      tag: "المرونة وصحة المفاصل",
      statNumber: "+٨٥٪",
      statLabel: "تحرر في مدى الحركة اليومي",
      quote:
        "ساعات الجلوس الطويلة كانت تسبب لي تيبساً مزمناً في الظهر. تركيز محمد على تحرير المفاصل وتمارين التنفس أعاد لجسدي الخفة والنشاط المستدام.",
      duration: "برنامج شهرين",
    },
    {
      id: 3,
      clientName: "حمد الحارثي",
      role: "رائد أعمال",
      city: "مسقط",
      rating: 5,
      tag: "عدة بسيطة وفعالة",
      statNumber: "صفر",
      statLabel: "تعقيد في الأجهزة والماكينات",
      quote:
        "كنت أعتقد أن النتيجة تتطلب أجهزة معقدة؛ أثبت لي كابتن محمد أن أدوات بسيطة مع فهم ميكانيكية الحركة الصحيحة كافية جداً لتحقيق أعلى مستوى لياقة.",
      duration: "برنامج ٣ أشهر",
    },
    {
      id: 4,
      clientName: "فيصل السعدي",
      role: "استشاري إداري",
      city: "السويق",
      rating: 5,
      tag: "مرونة البرنامج والمواعيد",
      statNumber: "١٠٠٪",
      statLabel: "التزام واستمرارية مستمرة",
      quote:
        "بسبب كثرة التنقل بين العمل والمنزل كان الالتزام أمراً مستحيلاً. أسلوب محمد يتكيف بسلاسة مع كل ظروفي، وجعل التدريب جزءاً ثابتاً من يومي.",
      duration: "برنامج ٤ أشهر",
    },
  ],
  en: [
    {
      id: 1,
      clientName: "Eng. Haitham Al Maamari",
      role: "Project Engineer",
      city: "Muscat",
      rating: 5,
      tag: "Training Autonomy",
      statNumber: "100%",
      statLabel: "Self-reliant workout capability",
      quote:
        "The greatest takeaway from Coach Mohammed was not just fitness, but the complete ability to design and execute my own workouts anywhere without needing a trainer post-program.",
      duration: "3-Month Program",
    },
    {
      id: 2,
      clientName: "Salim Al Balushi",
      role: "Private Sector Specialist",
      city: "Al-Suwiq",
      rating: 5,
      tag: "Mobility & Joint Longevity",
      statNumber: "+85%",
      statLabel: "Daily kinetic freedom",
      quote:
        "Long desk hours gave me chronic lower back stiffness. Mohammed's emphasis on joint mobility and diaphragmatic breathing restored lasting lightness and daily energy.",
      duration: "2-Month Program",
    },
    {
      id: 3,
      clientName: "Hamad Al Harthy",
      role: "Entrepreneur",
      city: "Muscat",
      rating: 5,
      tag: "Minimal Gear, Peak Impact",
      statNumber: "Zero",
      statLabel: "Reliance on complex machines",
      quote:
        "I thought real conditioning required complex gym machinery. Coach Mohammed proved that lean tools paired with biomechanical precision deliver superior functional strength.",
      duration: "3-Month Program",
    },
    {
      id: 4,
      clientName: "Faisal Al Saadi",
      role: "Management Consultant",
      city: "Al-Suwiq",
      rating: 5,
      tag: "Adaptive Routine",
      statNumber: "100%",
      statLabel: "Consistency without burnout",
      quote:
        "With frequent commuting, consistency was previously impossible. Mohammed's approach effortlessly adapts around my schedule, turning fitness into a seamless lifestyle.",
      duration: "4-Month Program",
    },
  ],
};

const SECTION_HEADER = {
  ar: {
    badge: "تجارب واقعية • كوتش محمد",
    title: "نتائج موثوقة في استعادة الحركة والاستقلالية",
    subtitle:
      "تجارب متدربين خاضوا مسار التطوير الحركي والمرونة مع الكابتن محمد بن عيسى في مسقط والسويق.",
  },
  en: {
    badge: "REAL JOURNEYS • Coach Mohammed",
    title: "Proven Outcomes in Mobility & Independence",
    subtitle:
      "Authentic experiences of trainees who mastered movement mechanics with Coach Mohammed Bin Issa in Muscat & Al-Suwiq.",
  },
};

export default function TestimonialsSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const reviews = ATHAR_REVIEWS[lang] || ATHAR_REVIEWS.ar;
  const header = SECTION_HEADER[lang] || SECTION_HEADER.ar;

  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);
  const isProgrammaticScroll = useRef(false);
  const scrollTimeout = useRef(null);

  const total = reviews.length;

  const scrollToCard = (index) => {
    const container = scrollContainerRef.current;
    const card = cardRefs.current[index];
    if (!container || !card) return;

    isProgrammaticScroll.current = true;
    setActiveIndex(index);

    const containerRect = container.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const offset =
      cardRect.left +
      cardRect.width / 2 -
      (containerRect.left + containerRect.width / 2);

    container.scrollBy({
      left: offset,
      behavior: "smooth",
    });

    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 650);
  };

  const handleNext = () => {
    const nextIdx = (activeIndex + 1) % total;
    scrollToCard(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (activeIndex - 1 + total) % total;
    scrollToCard(prevIdx);
  };

  const handleScroll = () => {
    if (isProgrammaticScroll.current || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;

    let closestIndex = activeIndex;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, idx) => {
      if (!card) return;
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  return (
    <section
      id="testimonials"
      dir={isRtl ? "rtl" : "ltr"}
      /* یکدست با رنگ زمینه پیوسته #06100b بدون هیچ خط مرزی کدر */
      className="relative w-full overflow-hidden bg-[#06100b] py-16 md:py-24 selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* هاله‌های نوری سینمایی امتداد یافته از سکشن متدولوژی */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* هاله اتصال در بالا */}
        <div className="absolute -top-24 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[450px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />

        {/* هاله زمردی در مرکز سمت راست */}
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />

        {/* هاله پایینی برای اتصال به سکشن بعدی */}
        <div className="absolute -bottom-24 left-1/3 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش نظرات */}
        <div className="mb-10 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <TargetIcon className="h-3.5 w-3.5 text-athar-lime animate-pulse" />
            <span className="text-xs font-bold text-athar-cream tracking-wide">
              {header.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-white leading-tight max-w-3xl mx-auto">
            {header.title}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-slate-300/90 max-w-xl mx-auto leading-relaxed font-medium">
            {header.subtitle}
          </p>
        </div>
      </div>

      {/* اسلایدر مرکزی با عمق سینمایی */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 flex w-full items-center gap-4 sm:gap-6 overflow-x-auto py-6 px-[8vw] sm:px-[18vw] md:px-[24vw] scroll-smooth no-scrollbar select-none"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {reviews.map((review, index) => {
          const isActive = index === activeIndex;

          return (
            <div
              key={review.id || index}
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => scrollToCard(index)}
              style={{
                scrollSnapAlign: "center",
                WebkitBackfaceVisibility: "hidden",
                transform: isActive ? "scale(1)" : "scale(0.93)",
                opacity: isActive ? 1 : 0.55,
              }}
              className="shrink-0 cursor-pointer transition-all duration-300 ease-out will-change-transform w-[85vw] sm:w-[480px] md:w-[540px] text-start antialiased"
            >
              {/* بدنه کارت با گلس‌مورفیسم لوکس تیره */}
              <div
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 transition-all duration-300 transform-gpu ${
                  isActive
                    ? "bg-[#0b1611] border-athar-lime/45 ring-1 ring-athar-lime/40 shadow-[0_20px_45px_rgba(0,0,0,0.8),0_0_25px_rgba(167,217,87,0.15)]"
                    : "bg-[#08120d]/90 border-white/10 shadow-xl hover:border-white/20"
                }`}
              >
                {/* ردیف ستاره‌ها و بج موضوع */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <RatingStars count={review.rating || 5} />
                  <span
                    className={`rounded-full px-3 py-1 text-[11px] font-bold shrink-0 whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-athar-lime/20 text-athar-lime border border-athar-lime/30 shadow-xs"
                        : "bg-white/10 text-slate-300 border border-white/10"
                    }`}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* شاخص پیشرفت با کنتراست شفاف */}
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-sans text-2xl sm:text-3xl font-black text-white drop-shadow-xs">
                    {review.statNumber}
                  </span>
                  <span className="text-xs font-bold text-slate-300">
                    {review.statLabel}
                  </span>
                </div>

                {/* متن نظر شاگرد */}
                <div className="relative my-4">
                  <Quote className="pointer-events-none absolute -top-3 -start-2 -z-0 h-8 w-8 text-white/[0.04]" />
                  <p className="relative z-10 text-xs sm:text-sm leading-relaxed text-slate-200 font-medium">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* ردیف پایین: مشخصات شاگرد + بج دوره */}
                <div className="flex items-center justify-between gap-2.5 sm:gap-4 border-t border-white/10 pt-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    {/* آواتار با حاشیه درخشان */}
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-athar-lime/30 bg-[#0a1a12] text-athar-lime font-black text-xs sm:text-sm shadow-[0_0_12px_rgba(167,217,87,0.2)]">
                      {review.clientName?.charAt(0) || "م"}
                    </div>
                    <div className="leading-tight min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-black text-white truncate">
                        {review.clientName}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-slate-300 mt-0.5 truncate">
                        <span className="truncate">{review.role}</span>
                        <span className="shrink-0">•</span>
                        <span className="inline-flex items-center gap-0.5 font-semibold text-athar-lime shrink-0">
                          <MapPin className="w-2.5 h-2.5" />
                          {review.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* بج طول دوره */}
                  {review.duration && (
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2.5 py-1 text-[10.5px] sm:text-[11px] font-bold text-slate-200 shadow-2xs">
                      <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-athar-lime shrink-0" />
                      <span>{review.duration}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* بخش کنترلر: شمارنده و دکمه‌های ناوبری چپ و راست */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between">
        {/* شمارنده اسلاید */}
        <div className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-black">
          <span className="text-white drop-shadow-xs">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-white/20 font-normal">/</span>
          <span className="text-slate-400">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* دکمه‌های ناوبری مدرن با افکت شیشه‌ای */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={isRtl ? "السابق" : "Previous"}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-slate-200 backdrop-blur-md shadow-md transition-all hover:bg-athar-lime hover:text-athar-forest-deep active:scale-95 cursor-pointer"
          >
            {isRtl ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label={isRtl ? "التالي" : "Next"}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-slate-200 backdrop-blur-md shadow-md transition-all hover:bg-athar-lime hover:text-athar-forest-deep active:scale-95 cursor-pointer"
          >
            {isRtl ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
