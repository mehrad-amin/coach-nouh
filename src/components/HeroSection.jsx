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
import { motion } from "framer-motion";

function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.04 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.68C7.02 10.88 7.9 12.04 8.02 12.2C8.14 12.37 9.73 14.82 12.18 15.87C12.76 16.12 13.22 16.27 13.57 16.38C14.16 16.57 14.7 16.54 15.12 16.48C15.59 16.41 16.57 15.89 16.77 15.31C16.98 14.73 16.98 14.24 16.92 14.13C16.86 14.03 16.7 13.97 16.46 13.85C16.22 13.73 15.04 13.15 14.82 13.07C14.6 12.99 14.44 12.95 14.28 13.19C14.12 13.43 13.66 13.97 13.52 14.13C13.38 14.29 13.24 14.31 13 14.19C12.76 14.07 11.98 13.82 11.06 13C10.34 12.36 9.85 11.57 9.71 11.33C9.57 11.09 9.7 10.96 9.82 10.84C9.93 10.73 10.06 10.55 10.18 10.41C10.3 10.27 10.34 10.17 10.42 10.01C10.5 9.85 10.46 9.71 10.4 9.59C10.34 9.47 9.88 8.33 9.68 7.87C9.49 7.42 9.29 7.48 9.15 7.47C9.02 7.46 8.86 7.46 8.7 7.46L8.53 7.33Z" />
    </svg>
  );
}

function FloatingParticlesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = [
      "rgba(167, 217, 87, ", // لیمویی شب‌تاب
      "rgba(27, 77, 58, ", // سبز جنگلی
      "rgba(52, 199, 123, ", // زمردی پویا
      "rgba(214, 198, 155, ", // کرم طلایی
      "rgba(110, 206, 148, ", // سبز روشن
    ];

    const particleCount = width < 768 ? 35 : 65;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 5 + 2.5,
      baseRadius: Math.random() * 5 + 2.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.45 + 0.25,
      vx: (Math.random() - 0.5) * 0.45,
      vy: -Math.random() * 0.55 - 0.15,
      pulseSpeed: Math.random() * 0.03 + 0.015,
      pulseAngle: Math.random() * Math.PI * 2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        p.pulseAngle += p.pulseSpeed;
        p.radius = p.baseRadius + Math.sin(p.pulseAngle) * 1.5;

        if (p.y < -20) p.y = height + 20;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowBlur = p.radius * 2.2;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full"
    />
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
    // تم إضافة رقم كوتش نوح (+968 9448 6154) مباشرة في الرابط
    whatsappUrl:
      "https://wa.me/96894486154?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%83%D8%A7%D8%A8%D8%AA%D9%86%20%D9%86%D9%88%D8%AD%D8%8C%20%D8%A3%D9%88%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AC%D9%84%D8%B3%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AA%D8%AF%D8%B1%D9%8A%D8%A8%20%D8%A7%D9%84%D8%B4%D8%AE%D8%B5%D9%8A",
    cards: {
      leftTop: {
        title: "المرونة واللياقة",
        desc: "الاهتمام والتركيز الأساسي",
        icon: Activity,
        accentBg: "bg-athar-forest text-athar-lime",
      },
      leftBottom: {
        title: "مرونة في البرنامج",
        desc: "حصص محددة باليوم والوقت",
        icon: Calendar,
        accentBg: "bg-athar-cream-dark text-athar-forest",
      },
      rightTop: {
        title: "استقلالية التدريب",
        desc: "تتدرب بنفسك بعد البرنامج",
        icon: ShieldCheck,
        accentBg: "bg-athar-lime text-athar-forest-deep",
      },
      rightBottom: {
        title: "عدة بسيطة وفعالة",
        desc: "تدريب عملي بدون تعقيد",
        icon: Zap,
        accentBg: "bg-athar-forest text-athar-cream",
      },
    },
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
    // تم إضافة رقم كوتش نوح في النسخة الإنجليزية أيضاً
    whatsappUrl:
      "https://wa.me/96894486154?text=Hello%20Coach%20Nouh,%20I'd%20like%20to%20inquire%20about%20your%20personal%20coaching%20sessions",
    cards: {
      leftTop: {
        title: "Mobility & Fitness",
        desc: "Core focus & conditioning",
        icon: Activity,
        accentBg: "bg-athar-forest text-athar-lime",
      },
      leftBottom: {
        title: "Flexible Schedule",
        desc: "Custom day & time sessions",
        icon: Calendar,
        accentBg: "bg-athar-cream-dark text-athar-forest",
      },
      rightTop: {
        title: "Self-Reliance",
        desc: "Train independently post-program",
        icon: ShieldCheck,
        accentBg: "bg-athar-lime text-athar-forest-deep",
      },
      rightBottom: {
        title: "Minimal Gear",
        desc: "Effective & uncomplicated workouts",
        icon: Zap,
        accentBg: "bg-athar-forest text-athar-cream",
      },
    },
  },
};
export default function HeroSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const t = HERO_CONTENT[lang] || HERO_CONTENT.ar;

  return (
    <section
      dir={isRtl ? "rtl" : "ltr"}
      className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-athar-cream flex flex-col justify-between items-center py-4 sm:py-6 border-b border-athar-border "
    >
      {/* دانه‌های رنگی پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <FloatingParticlesCanvas />
        <div className="absolute top-1/4 -right-16 w-80 h-80 rounded-full bg-athar-lime/20 blur-[100px]" />
        <div className="absolute bottom-1/4 -left-16 w-80 h-80 rounded-full bg-athar-forest/10 blur-[110px]" />
      </div>

      {/* کانتینر اصلی محتوا */}
      <div className="relative z-20 w-full max-w-6xl mx-auto px-3 sm:px-6 my-auto py-2 sm:py-4 flex flex-col items-center text-center">
        {/* ردیف کارت‌های بالایی با شیفت ملایم ارتفاع */}
        <div
          style={{ direction: "ltr" }}
          className="w-full max-w-md lg:max-w-none flex justify-between items-center gap-2.5 mb-2.5 lg:mb-0 lg:contents"
        >
          {/* کارت چپ - بالا: المرونة واللياقة */}
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            animate={{ y: [0, -7, 0], x: [0, -2, 0] }}
            transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
            className="w-[48%] lg:w-auto p-2 sm:p-2.5 lg:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-athar-border shadow-athar-float flex items-center gap-2 lg:gap-3 text-start lg:absolute lg:top-4 lg:left-3 xl:lg:left-8 lg:max-w-[215px] -translate-y-1 lg:translate-y-0"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${t.cards.leftTop.accentBg}`}
            >
              <Activity className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10.5px] sm:text-xs lg:text-sm font-black text-athar-forest-deep block leading-tight">
                {t.cards.leftTop.title}
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-semibold text-athar-muted block mt-0.5 line-clamp-1">
                {t.cards.leftTop.desc}
              </span>
            </div>
          </motion.div>

          {/* کارت راست - بالا: استقلالية التدريب */}
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            animate={{ y: [0, 7, 0], x: [0, 2, 0] }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            className="w-[48%] lg:w-auto p-2 sm:p-2.5 lg:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-athar-border shadow-athar-float flex items-center gap-2 lg:gap-3 text-start lg:absolute lg:top-10 lg:right-3 xl:lg:right-8 lg:max-w-[220px] translate-y-2 lg:translate-y-0"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${t.cards.rightTop.accentBg}`}
            >
              <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10.5px] sm:text-xs lg:text-sm font-black text-athar-forest-deep block leading-tight">
                {t.cards.rightTop.title}
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-bold text-athar-forest block mt-0.5 line-clamp-1">
                {t.cards.rightTop.desc}
              </span>
            </div>
          </motion.div>
        </div>

        {/* ستون متن و دکمه‌های اصلی */}
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center my-1 sm:my-2">
          <div className="mb-2 sm:mb-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-athar-border shadow-xs backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-athar-lime animate-pulse" />
            <span className="text-[10px] sm:text-xs font-bold text-athar-forest-deep">
              {t.badgeRole}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-black leading-[1.3] tracking-tight">
            <span className="text-athar-forest-deep block">{t.mainHook}</span>
            <span className="inline-block mt-1 bg-gradient-to-l from-athar-forest via-[#1e6347] to-[#88c538] bg-clip-text text-transparent">
              {t.mainHookHighlight}
            </span>
          </h1>

          <p className="mt-3 sm:mt-4 text-xs sm:text-sm lg:text-base text-athar-muted leading-relaxed font-medium px-2 max-w-xl">
            {t.subtext}
          </p>

          <div className="mt-4 sm:mt-5 flex flex-wrap items-center justify-center gap-2 max-w-lg">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-athar-border text-[10px] sm:text-xs font-bold text-athar-forest-deep shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-athar-forest" />
              <span>{t.feature1}</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-athar-border text-[10px] sm:text-xs font-bold text-athar-forest-deep shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-athar-forest" />
              <span>{t.feature2}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <a
              href={t.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-athar-forest hover:bg-athar-forest-deep text-white font-bold text-xs sm:text-sm shadow-md shadow-athar-forest/20 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap group"
            >
              <WhatsAppIcon className="w-5 h-5 text-athar-lime fill-current shrink-0" />
              <span>{t.ctaPrimary}</span>
              {isRtl ? (
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-athar-lime transition-transform group-hover:-translate-x-1 shrink-0" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-athar-lime transition-transform group-hover:translate-x-1 shrink-0" />
              )}
            </a>

            <a
              href="#calculator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-6 py-3 rounded-full bg-athar-lime hover:bg-athar-lime-hover text-athar-forest-deep font-extrabold text-xs sm:text-sm shadow-xs transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <span>{t.ctaSecondary}</span>
              <ChevronDown className="w-4 h-4 text-athar-forest-deep shrink-0" />
            </a>
          </div>
        </div>

        {/* ردیف کارت‌های پایینی با شیفت ملایم ارتفاع */}
        <div
          style={{ direction: "ltr" }}
          className="w-full max-w-md lg:max-w-none flex justify-between items-center gap-2.5 mt-5 lg:mt-0 lg:contents"
        >
          {/* کارت چپ - پایین: مرونة في البرنامج */}
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            animate={{ y: [0, 6, 0], x: [0, -1, 0] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
            className="w-[48%] lg:w-auto p-2 sm:p-2.5 lg:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-athar-border shadow-athar-float flex items-center gap-2 lg:gap-3 text-start lg:absolute lg:bottom-7 lg:left-4 xl:lg:left-9 lg:max-w-[215px] translate-y-1 lg:translate-y-0"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 border border-athar-border ${t.cards.leftBottom.accentBg}`}
            >
              <Calendar className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10.5px] sm:text-xs lg:text-sm font-black text-athar-forest-deep block leading-tight">
                {t.cards.leftBottom.title}
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-semibold text-athar-muted block mt-0.5 line-clamp-1">
                {t.cards.leftBottom.desc}
              </span>
            </div>
          </motion.div>

          {/* کارت راست - پایین: عدة بسيطة وفعالة */}
          <motion.div
            dir={isRtl ? "rtl" : "ltr"}
            animate={{ y: [0, -6, 0], x: [0, 1, 0] }}
            transition={{
              duration: 5.0,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2,
            }}
            className="w-[48%] lg:w-auto p-2 sm:p-2.5 lg:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-athar-border shadow-athar-float flex items-center gap-2 lg:gap-3 text-start lg:absolute lg:bottom-11 lg:right-4 xl:lg:right-9 lg:max-w-[215px] -translate-y-1.5 lg:translate-y-0"
          >
            <div
              className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${t.cards.rightBottom.accentBg}`}
            >
              <Zap className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5" />
            </div>
            <div className="overflow-hidden">
              <span className="text-[10.5px] sm:text-xs lg:text-sm font-black text-athar-forest-deep block leading-tight">
                {t.cards.rightBottom.title}
              </span>
              <span className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] font-semibold text-athar-muted block mt-0.5 line-clamp-1">
                {t.cards.rightBottom.desc}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* پانوشت موقعیت مکانی مربی نوح */}
      <footer className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-8 text-center pt-1 sm:pt-2">
        <span className="text-[10px] sm:text-[11px] font-bold text-athar-muted inline-flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-athar-lime inline-block" />
          <span>{t.footerLocation}</span>
        </span>
      </footer>
    </section>
  );
}
