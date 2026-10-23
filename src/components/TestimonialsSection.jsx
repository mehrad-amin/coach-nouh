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
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* کامپوننت ستاره‌های امتیازدهی لوکس                                          */
/* -------------------------------------------------------------------------- */
function RatingStars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(count)].map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-athar-lime text-athar-forest drop-shadow-[0_1px_3px_rgba(27,77,58,0.15)]"
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
        "أهم ما كسبته مع كابتن نوح ليس مجرد لياقة عابرة، بل أنني بعد انتهاء البرنامج أصبحت قادراً على تصميم وتطبيق تماريني بنفسي أينما كنت دون الحاجة لتواجد مدرب.",
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
        "ساعات الجلوس الطويلة كانت تسبب لي تيبساً مزمناً في الظهر. تركيز نوح على تحرير المفاصل وتمارين التنفس أعاد لجسدي الخفة والنشاط المستدام.",
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
        "كنت أعتقد أن النتيجة تتطلب أجهزة معقدة؛ أثبت لي كابتن نوح أن أدوات بسيطة مع فهم ميكانيكية الحركة الصحيحة كافية جداً لتحقيق أعلى مستوى لياقة.",
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
        "بسبب كثرة التنقل بين العمل والمنزل كان الالتزام أمراً مستحيلاً. أسلوب نوح يتكيف بسلاسة مع كل ظروفي، وجعل التدريب جزءاً ثابتاً من يومي.",
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
        "The greatest takeaway from Coach Nouh was not just fitness, but the complete ability to design and execute my own workouts anywhere without needing a trainer post-program.",
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
        "Long desk hours gave me chronic lower back stiffness. Nouh's emphasis on joint mobility and diaphragmatic breathing restored lasting lightness and daily energy.",
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
        "I thought real conditioning required complex gym machinery. Coach Nouh proved that lean tools paired with biomechanical precision deliver superior functional strength.",
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
        "With frequent commuting, consistency was previously impossible. Nouh's approach effortlessly adapts around my schedule, turning fitness into a seamless lifestyle.",
      duration: "4-Month Program",
    },
  ],
};

const SECTION_HEADER = {
  ar: {
    badge: "تجارب واقعية • كوتش نوح",
    title: "نتائج موثوقة في استعادة الحركة والاستقلالية",
    subtitle:
      "تجارب متدربين خاضوا مسار التطوير الحركي والمرونة مع الكابتن نوح بن عيسى في مسقط والسويق.",
  },
  en: {
    badge: "REAL JOURNEYS • COACH NOUH",
    title: "Proven Outcomes in Mobility & Independence",
    subtitle:
      "Authentic experiences of trainees who mastered movement mechanics with Coach Nouh Bin Issa in Muscat & Al-Suwiq.",
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
      className="relative w-full overflow-hidden bg-athar-cream py-16 md:py-24 border-b border-athar-border"
    >
      {/* دایره‌های هندسی استاتیک و مینیمال پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 sm:-top-28 sm:-left-28 w-60 h-60 sm:w-96 sm:h-96 rounded-full bg-athar-cream-dark" />
        <div className="absolute top-1/2 -right-20 sm:-right-32 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-athar-lime/20" />
        <div className="absolute -bottom-24 -left-16 sm:-bottom-32 sm:-left-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-forest/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش نظرات */}
        <div className="mb-10 text-center md:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-athar-border shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-athar-forest" />
            <span className="text-xs font-bold text-athar-forest-deep">
              {header.badge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-athar-forest-deep leading-tight max-w-3xl mx-auto">
            {header.title}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-athar-muted max-w-xl mx-auto leading-relaxed font-medium">
            {header.subtitle}
          </p>
        </div>
      </div>

      {/* اسلایدر مرکزی */}
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
                opacity: isActive ? 1 : 0.6,
              }}
              className="shrink-0 cursor-pointer transition-all duration-300 ease-out will-change-transform w-[84vw] sm:w-[480px] md:w-[540px] text-start"
            >
              <div
                className={`relative flex flex-col justify-between rounded-3xl border p-6 sm:p-8 bg-white transition-all duration-300 transform-gpu ${
                  isActive
                    ? "border-athar-forest/30 ring-1 ring-athar-lime/50 shadow-athar-float"
                    : "border-athar-border shadow-athar-soft hover:border-athar-forest/20"
                }`}
              >
                {/* ردیف ستاره‌ها و بج موضوع */}
                <div className="flex items-center justify-between gap-2 border-b border-athar-border/70 pb-4">
                  <RatingStars count={review.rating || 5} />
                  <span
                    className={`rounded-full px-3 py-0.5 text-[11px] font-bold shrink-0 whitespace-nowrap ${
                      isActive
                        ? "bg-athar-forest text-athar-lime shadow-2xs"
                        : "bg-athar-cream-dark text-athar-forest"
                    }`}
                  >
                    {review.tag}
                  </span>
                </div>

                {/* شاخص پیشرفت */}
                <div className="mt-5 flex items-baseline gap-2">
                  <span className="font-sans text-2xl font-black text-athar-forest-deep sm:text-3xl">
                    {review.statNumber}
                  </span>
                  <span className="text-xs font-bold text-athar-muted">
                    {review.statLabel}
                  </span>
                </div>

                {/* متن نظر شاگرد */}
                <div className="relative my-4">
                  <Quote className="pointer-events-none absolute -top-3 -start-2 -z-0 h-7 w-7 text-athar-cream-dark" />
                  <p className="relative z-10 text-xs sm:text-sm leading-relaxed text-athar-forest font-semibold">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                {/* ردیف پایین: مشخصات شاگرد + بج دوره با تضمین ۱۰۰٪ تک‌خطی ماندن در موبایل */}
                <div className="flex items-center justify-between gap-2.5 sm:gap-4 border-t border-athar-border/70 pt-4">
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border border-athar-forest/15 bg-athar-forest text-athar-lime font-black text-xs sm:text-sm shadow-2xs">
                      {review.clientName?.charAt(0) || "م"}
                    </div>
                    <div className="leading-tight min-w-0 flex-1">
                      <h4 className="text-xs sm:text-sm font-black text-athar-forest-deep truncate">
                        {review.clientName}
                      </h4>
                      <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-athar-muted mt-0.5 truncate">
                        <span className="truncate">{review.role}</span>
                        <span className="shrink-0">•</span>
                        <span className="inline-flex items-center gap-0.5 font-semibold text-athar-forest shrink-0">
                          <MapPin className="w-2.5 h-2.5" />
                          {review.city}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* بج طول دوره: کاملاً تک‌خطی با shrink-0 و whitespace-nowrap */}
                  {review.duration && (
                    <span className="shrink-0 whitespace-nowrap inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-athar-border bg-athar-cream/70 px-2.5 py-1 text-[10.5px] sm:text-[11px] font-bold text-athar-forest-deep shadow-2xs">
                      <ShieldCheck className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-athar-lime-hover shrink-0" />
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
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 flex items-center justify-between">
        {/* شمارنده اسلاید */}
        <div className="flex items-center gap-1.5 font-sans text-xs sm:text-sm font-black">
          <span className="text-athar-forest-deep">
            {String(activeIndex + 1).padStart(2, "0")}
          </span>
          <span className="text-athar-border font-normal">/</span>
          <span className="text-athar-muted">
            {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* دکمه‌های ناوبری با تفکیک صحیح جهت در RTL */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handlePrev}
            aria-label={isRtl ? "السابق" : "Previous"}
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-athar-border bg-white text-athar-forest shadow-2xs transition-all hover:bg-athar-forest hover:text-white active:scale-95 cursor-pointer"
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
            className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl border border-athar-border bg-white text-athar-forest shadow-2xs transition-all hover:bg-athar-forest hover:text-white active:scale-95 cursor-pointer"
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
