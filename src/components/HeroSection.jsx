// src/components/HeroSection.jsx
"use client";

import React, { useRef, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Activity,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Zap,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.73 14.82 12.18 15.87C12.76 16.12 13.22 16.27 13.57 16.38C14.16 16.57 14.7 16.54 15.12 16.48C15.59 16.41 16.57 15.89 16.77 15.31C16.98 14.73 16.98 14.24 16.92 14.13C16.86 14.03 16.7 13.97 16.46 13.85C16.22 13.73 15.04 13.15 14.82 13.07C14.6 12.99 14.44 12.95 14.28 13.19C14.12 13.43 13.66 13.97 13.52 14.13C13.38 14.29 13.24 14.31 13 14.19C12.76 14.07 11.98 13.82 11.06 13C10.34 12.36 9.85 11.57 9.71 11.33C9.57 11.09 9.7 10.96 9.82 10.84C9.93 10.73 10.06 10.55 10.18 10.41C10.3 10.27 10.34 10.17 10.42 10.01C10.5 9.85 10.46 9.71 10.4 9.59C10.34 9.47 9.88 8.33 9.68 7.87C9.49 7.42 9.29 7.48 9.15 7.47C9.02 7.46 8.86 7.46 8.7 7.46L8.53 7.33Z" />
    </svg>
  );
}

const HERO_CONTENT = {
  ar: {
    badgeRole: "مدرب شخصي • نمط حياة صحي",
    mainHook: "تدرّب بأسلوب ذكي،",
    mainHookHighlight: "واكتسب مهارة الاستقلالية",
    subtext:
      "أسلوب تدريب مرن ومباشر يتلائم تماماً مع كافة ظروفك ومواعيدك اليومية. لا ندرّبك لتبقى بحاجة دائمة لتواجد المدرب، بل لتمتلك الوعي الحركي والقدرة على مواصلة التدريب بنفسك وبثقة كاملة بعد انتهاء البرنامج.",
    feature1: "التركيز التام على المرونة واللياقة",
    feature2: "عدة بسيطة وبرنامج يتكيف معك",
    ctaPrimary: "تواصل مع كوتش نوح",
    ctaSecondary: "الحاسبة",
    footerLocation: "جلسات تدريب شخصية حضورية ومخصصة في سلطنة عُمان",
    whatsappUrl:
      "https://wa.me/96894486154?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D8%A7%D8%A8%D8%AA%D9%86%20%D9%86%D9%88%D8%AD%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A",
    cards: [
      {
        title: "المرونة واللياقة",
        desc: "الاهتمام والتركيز الأساسي",
        icon: Activity,
        accent: "text-athar-lime",
      },
      {
        title: "استقلالية التدريب",
        desc: "تتدرب بنفسك بعد البرنامج",
        icon: ShieldCheck,
        accent: "text-athar-lime",
      },
      {
        title: "مرونة في البرنامج",
        desc: "حصص محددة باليوم والوقت",
        icon: Calendar,
        accent: "text-athar-lime", // تغییر از text-athar-cream به text-athar-lime
      },
      {
        title: "عدة بسيطة وفعالة",
        desc: "تدريب عملي بدون تعقيد",
        icon: Zap,
        accent: "text-athar-lime",
      },
    ],
  },
  en: {
    badgeRole: "Personal Trainer • Healthy Lifestyle",
    mainHook: "Train with Purpose,",
    mainHookHighlight: "Master Independent Fitness",
    subtext:
      "A flexible and direct coaching methodology tailored around your daily routine. We don't train you to remain reliant on a coach, but to equip you with the skill and confidence to train on your own for life.",
    feature1: "Focused on mobility & physical fitness",
    feature2: "Minimal gear with an adaptable routine",
    ctaPrimary: "Chat with Coach Nouh",
    ctaSecondary: "Calculator",
    footerLocation: "Private In-Person Personal Coaching Sessions in Oman",
    whatsappUrl:
      "https://wa.me/96894486154?text=Hello%20Coach%20Nouh,%20I'd%20like%20to%20inquire%20about%20your%20personal%20coaching%20sessions",
    cards: [
      {
        title: "Mobility & Fitness",
        desc: "Core focus & conditioning",
        icon: Activity,
        accent: "text-athar-lime",
      },
      {
        title: "Self-Reliance",
        desc: "Train independently post-program",
        icon: ShieldCheck,
        accent: "text-athar-lime",
      },
      {
        title: "Flexible Schedule",
        desc: "Custom day & time sessions",
        icon: Calendar,
        accent: "text-athar-lime", // تغییر از text-athar-cream به text-athar-lime
      },
      {
        title: "Minimal Gear",
        desc: "Effective & uncomplicated workouts",
        icon: Zap,
        accent: "text-athar-lime",
      },
    ],
  },
};

export default function HeroSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const t = HERO_CONTENT[lang] || HERO_CONTENT.ar;

  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const triggerTouch = () => {
          video.play().catch(() => {});
          window.removeEventListener("touchstart", triggerTouch);
          window.removeEventListener("click", triggerTouch);
        };
        window.addEventListener("touchstart", triggerTouch, {
          once: true,
          passive: true,
        });
        window.addEventListener("click", triggerTouch, {
          once: true,
          passive: true,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([".hero-anim-item", cardsRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        ".hero-anim-badge",
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.3,
      );

      tl.fromTo(
        ".hero-anim-title",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.0, ease: "power4.out" },
        0.55,
      );

      tl.fromTo(
        [".hero-anim-desc", ".hero-anim-pill"],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.75 },
        0.85,
      );

      tl.fromTo(
        ".hero-anim-cta",
        { opacity: 0, y: 20, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: "back.out(1.5)",
        },
        1.1,
      );

      tl.fromTo(
        cardsRef.current.filter(Boolean),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
        },
        1.35,
      );

      gsap.to(videoContainerRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: 40,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#06100b] flex flex-col justify-between selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* ======================================================== */}
      {/* ۱. ویدیوی تمام‌صفحه با نورپردازی طبیعی و یکنواخت          */}
      {/* ======================================================== */}
      <div
        ref={videoContainerRef}
        className="absolute inset-0 z-0 w-full h-full pointer-events-none overflow-hidden"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/images/coach-hero-poster.jpg"
          className="w-full h-full object-cover object-[50%_12%] sm:object-[50%_15%] lg:object-[62%_20%] opacity-100"
        >
          <source
            media="(max-width: 768px)"
            src="/videos/coach-hero-mobile.mp4"
            type="video/mp4"
          />
          <source
            media="(min-width: 769px)"
            src="/videos/coach-hero.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* ======================================================== */}
      {/* ۲. پوشش تیرگی یکدست سینمایی (بدون هیچ خط، پرده یا ترک)    */}
      {/* ======================================================== */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        {/* ۱. لایه تیره یکنواخت استودیویی روی کل تصویر (روشنایی یکسان در سراسر مانیتور) */}
        <div className="absolute inset-0 bg-black/30" />

        {/* ۲. وینیت نرم لنز دوربین سینمایی در گوشه‌ها بدون نصف کردن کادر مربی */}
        <div className="hidden lg:block absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(6,16,11,0.55)_100%)]" />

        {/* ۳. گرادیان عمودی موبایل (دقیقاً نسخه تأییدشده قبلی) */}
        <div className="block lg:hidden absolute inset-0 bg-gradient-to-t from-[#06100b] via-[#06100b]/40 to-transparent" />

        {/* ۴. اتصال محو و بدون درز به سکشن متدولوژی */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-b from-transparent to-[#06100b]" />
      </div>

      {/* ======================================================== */}
      {/* ۳. محتوای متنی، تیترها و دکمه‌های اقدام                    */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-56 sm:pt-60 lg:pt-36 pb-4 my-auto flex flex-col justify-end lg:justify-center">
        <div className="max-w-2xl text-center lg:text-start flex flex-col items-center lg:items-start mx-auto lg:mx-0">
          {/* نشان هویت مربی */}
          <div className="hero-anim-badge mb-2.5 sm:mb-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/55 border border-white/15 shadow-athar-soft backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-athar-lime animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold text-athar-cream tracking-wide">
              {t.badgeRole}
            </span>
          </div>

          {/* تیتر اصلی با سایه شارپ سینمایی (خوانایی کامل بدون نیاز به کادر تیره مجزا) */}
          <h1 className="hero-anim-title text-2xl sm:text-4xl lg:text-[3.5rem] font-black leading-[1.25] sm:leading-[1.18] tracking-tight">
            <span className="text-white block mb-0.5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {t.mainHook}
            </span>
            <span className="inline-block bg-linear-to-l from-athar-lime via-[#c7f47e] to-white bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              {t.mainHookHighlight}
            </span>
          </h1>

          {/* توضیحات با سایه باکیفیت و خوانا */}
          <p className="hero-anim-desc mt-2.5 sm:mt-4 text-xs sm:text-base text-slate-100 leading-relaxed font-medium max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] line-clamp-3 sm:line-clamp-none">
            {t.subtext}
          </p>

          {/* ویژگی‌ها */}
          <div className="mt-3 sm:mt-5 flex flex-wrap items-center justify-center lg:justify-start gap-2 max-w-lg">
            <div className="hero-anim-pill inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 border border-white/15 backdrop-blur-md text-[10.5px] sm:text-xs font-bold text-white shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-athar-lime shrink-0" />
              <span>{t.feature1}</span>
            </div>
            <div className="hero-anim-pill inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/55 border border-white/15 backdrop-blur-md text-[10.5px] sm:text-xs font-bold text-white shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-athar-lime shrink-0" />
              <span>{t.feature2}</span>
            </div>
          </div>

          {/* دکمه‌های اکشن */}
          <div className="hero-anim-cta mt-5 sm:mt-7 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-2.5 sm:gap-3.5 w-full sm:w-auto">
            {/* دکمه واتس‌اپ */}
            <a
              href={t.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-athar-lime hover:bg-athar-lime-hover text-athar-forest-deep font-black text-sm sm:text-base shadow-[0_0_24px_rgba(167,217,87,0.4)] active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap group"
            >
              <WhatsAppIcon className="w-5 h-5 text-athar-forest-deep fill-current shrink-0" />
              <span>{t.ctaPrimary}</span>
              {isRtl ? (
                <ArrowLeft className="w-4 h-4 text-athar-forest-deep transition-transform group-hover:-translate-x-1 shrink-0 stroke-[2.5]" />
              ) : (
                <ArrowRight className="w-4 h-4 text-athar-forest-deep transition-transform group-hover:translate-x-1 shrink-0 stroke-[2.5]" />
              )}
            </a>

            {/* دکمه محاسبه‌گر */}
            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold text-xs sm:text-sm backdrop-blur-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>{t.ctaSecondary}</span>
              <ChevronDown className="w-4 h-4 text-white shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* ۴. کارت‌های شیشه‌ای پایین صفحه                             */}
      {/* ======================================================== */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          {t.cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                ref={(el) => (cardsRef.current[idx] = el)}
                className="p-2.5 sm:p-3 rounded-xl bg-black/60 hover:bg-black/80 border border-white/15 backdrop-blur-md shadow-md text-start transition-all"
              >
                <div className="flex items-center gap-2 mb-0.5">
                  <div
                    className={`p-1 rounded-md bg-white/10 ${card.accent} shrink-0`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-black text-white truncate">
                    {card.title}
                  </span>
                </div>
                <p className="text-[9px] sm:text-[10.5px] text-slate-300 font-medium truncate">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* موقعیت مکانی مربی */}
        <div className="mt-2.5 text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-semibold text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-athar-lime inline-block" />
            <span>{t.footerLocation}</span>
          </span>
        </div>
      </div>
    </section>
  );
}
