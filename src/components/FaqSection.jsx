// src/components/FaqSection.jsx
"use client";

import React, { useState } from "react";
import {
  Plus,
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* محتوای رسمی سؤالات متداول بر اساس دست‌نوشته و شرایط مربی نوح در عُمان     */
/* -------------------------------------------------------------------------- */
const FAQ_DATA = {
  ar: {
    sectionBadge: "إجابات واضحة • كوتش نوح",
    sectionTitle: "الأسئلة الشائعة حول أسلوب التدريب",
    sectionSubtitle:
      "إجابات مباشرة من الكابتن نوح بن عيسى حول منهجية المرونة، مواعيد الحصص، وتحقيق استقلالية التمرين في سلطنة عُمان.",

    askMoreTitle: "لديك استفسار خاص لم تجد إجابته هنا؟",
    askMoreDesc:
      "تواصل مباشرة مع الكابتن نوح عبر واتساب لمناقشة أهدافك وجدول مواعيدك المتاحة.",
    whatsappBtn: "تحدث مع كوتش نوح عبر واتساب",
    whatsappMessage:
      "مرحباً كابتن نوح، أود الاستفسار عن تفاصيل جلسات التدريب الشخصي والمواعيد المتاحة.",

    faqs: [
      {
        question: "أين تُقام جلسات التدريب الشخصي المباشرة؟",
        answer:
          "تُقام الجلسات الحضورية في سلطنة عُمان داخل محافظة مسقط وولاية السويق، ويتم التنسيق في الصالة الرياضية أو المكان الأنسب للمشترك وفق جدول زمني متفق عليه مسبقاً.",
      },
      {
        question: "ماذا تعني بـ 'كسب مهارة التدريب المستقل بعد البرنامج'؟",
        answer:
          "غايتنا ليست ربطك بوجود المدرب بشكل دائم؛ بل تعليمك ميكانيكية حركتك، وتكنيك التمارين السليم، وكيفية تنظيم أحمالك التدريبية بنفسك لتواصل تمرينك مدى الحياة بثقة تامة ودون إصابات.",
      },
      {
        question: "هل أحتاج إلى أجهزة وماكينات معقدة لتحقيق النتيجة؟",
        answer:
          "إطلاقاً. نعتمد في منهجيتنا على عدة بسيطة وأدوات عملية خفيفة مع استغلال وزن الجسم. التركيز الحقيقي يكون على تحرير المفاصل، كفاءة التنفس، واكتساب المرونة والقوة الوظيفية.",
      },
      {
        question: "كيف يتم تنظيم وتحديد أوقات الحصص التدريبية؟",
        answer:
          "يتم حجز حصص فردية محددة باليوم والساعة بما يتلائم مع التزاماتك ومواعيد عملك في عُمان، مع مرونة كاملة في تعديل الخطة التدريبية وفق استجابتك وتطورك البدني.",
      },
      {
        question: "كيف يتم احتساب تكلفة التدريب بين ٣٥ إلى ٤٥ ر.ع؟",
        answer:
          "يعتمد تحديد السعر الشهري الدقيق لكل شخص على الباقة المختارة (برونزية، فضية، ذهبية) وبُعد المسافة والوقت المخصص للانتقال وجلسات التدريب بين مسقط والسويق.",
      },
      {
        question: "على من تقع رسوم دخول واشتراك الصالة الرياضية؟",
        answer:
          "رسوم دخول أو اشتراك الصالة الرياضية تكون على المشترك مباشرة، في حين تغطي رسوم التدريب الإشراف الحركي المباشر، وتخطيط التغذية، والمتابعة المستمرة طوال فترة البرنامج.",
      },
    ],
  },

  en: {
    sectionBadge: "CLEAR ANSWERS • COACH NOUH",
    sectionTitle: "Frequently Asked Questions",
    sectionSubtitle:
      "Direct insights from Coach Nouh Bin Issa regarding mobility methodology, scheduling, and training autonomy in Oman.",

    askMoreTitle: "Have a specific question not covered here?",
    askMoreDesc:
      "Connect directly with Coach Nouh via WhatsApp to discuss your goals and available slots.",
    whatsappBtn: "Chat with Coach Nouh on WhatsApp",
    whatsappMessage:
      "Hello Coach Nouh, I would like to inquire about your private coaching sessions and schedule.",

    faqs: [
      {
        question: "Where do the in-person private sessions take place?",
        answer:
          "Private 1-on-1 sessions take place across the Sultanate of Oman in Muscat and Al-Suwiq, coordinated at a convenient fitness facility suited to your schedule.",
      },
      {
        question: "What is meant by 'Mastering Independent Training'?",
        answer:
          "Our ultimate objective is not keeping you reliant on a coach. We equip you with movement mechanics, correct kinetic form, and exercise programming so you can train with complete confidence for life.",
      },
      {
        question: "Do I need complex gym machinery to achieve results?",
        answer:
          "Not at all. We utilize lean, functional gear paired with bodyweight drills. The true focus is joint decompression, respiratory capacity, functional flexibility, and injury resilience.",
      },
      {
        question: "How are session days and times scheduled?",
        answer:
          "Sessions are booked for specific days and hours tailored around your executive routine in Oman, offering complete adaptability as your performance progresses.",
      },
      {
        question: "How is the pricing calculated between 35 to 45 OMR?",
        answer:
          "Monthly investment varies based on the chosen tier (Bronze, Silver, Gold), travel distance, and committed session duration across Muscat & Al-Suwiq.",
      },
      {
        question: "Who covers the gym facility entry fees?",
        answer:
          "Gym membership or facility access fees are covered directly by the trainee, while coaching fees strictly cover personalized programming, direct hands-on instruction, and continuous guidance.",
      },
    ],
  },
};

export default function FaqSection({
  lang = "ar",
  coachWhatsapp = "96894486154",
}) {
  const isRtl = lang === "ar";
  const ui = FAQ_DATA[lang] || FAQ_DATA.ar;

  const [openIndex, setOpenIndex] = useState(0);

  const toggleFaq = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  const cleanPhone = coachWhatsapp.replace(/[^0-9]/g, "");
  const whatsappDirectUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
    ui.whatsappMessage,
  )}`;

  return (
    <section
      id="faq"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-[#06100b] selection:bg-athar-lime selection:text-athar-forest-deep"
    >
      {/* هاله‌های نوری استودیویی در پس‌زمینه */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* هاله بالایی */}
        <div className="absolute -top-24 left-1/4 w-80 sm:w-[600px] h-80 sm:h-[450px] rounded-full bg-radial from-athar-lime/10 via-emerald-500/5 to-transparent blur-[120px]" />

        {/* هاله میانی سمت راست */}
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-80 sm:w-[500px] h-80 sm:h-[500px] rounded-full bg-radial from-[#1e6347]/20 via-transparent to-transparent blur-[110px]" />

        {/* هاله پایینی */}
        <div className="absolute -bottom-24 left-1/3 w-80 sm:w-[550px] h-80 sm:h-[550px] rounded-full bg-radial from-athar-lime/10 via-transparent to-transparent blur-[130px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        {/* هدر بخش سؤالات متداول */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/15 shadow-athar-soft backdrop-blur-md mb-3.5">
            <HelpCircle className="h-3.5 w-3.5 text-athar-lime animate-pulse" />
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

        {/* لیست آکاردئونی سؤالات */}
        <div className="space-y-3.5">
          {ui.faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const formattedIdx = String(idx + 1).padStart(2, "0");

            return (
              <div
                key={idx}
                className={`relative overflow-hidden rounded-2xl border transition-all duration-300 antialiased ${
                  isOpen
                    ? "border-athar-lime/45 bg-[#0a1811] shadow-[0_15px_35px_rgba(0,0,0,0.7),0_0_20px_rgba(167,217,87,0.1)] ring-1 ring-athar-lime/30"
                    : "border-white/15 bg-[#08130e] shadow-md hover:border-white/25 hover:bg-[#0a1711]"
                }`}
              >
                {/* خط ظریف بالای کارت در وضعیت باز */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-athar-lime transition-opacity duration-300 ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="flex w-full cursor-pointer select-none items-center justify-between gap-4 p-5 text-start"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <span
                      className={`font-sans text-xs font-black shrink-0 transition-colors ${
                        isOpen ? "text-athar-lime" : "text-slate-400"
                      }`}
                    >
                      {formattedIdx}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-black transition-colors leading-snug ${
                        isOpen ? "text-white" : "text-slate-200"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-athar-lime bg-athar-lime text-athar-forest-deep shadow-[0_0_12px_rgba(167,217,87,0.35)]"
                        : "border-white/15 bg-white/[0.05] text-slate-300"
                    }`}
                  >
                    <Plus className="h-4 w-4 stroke-[2.5]" />
                  </div>
                </button>

                {/* پاسخ آکاردئون با انیمیشن روان ارتفاع */}
                <div
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 mx-5 pt-3.5 pb-5">
                      <p className="text-xs sm:text-sm leading-relaxed text-slate-300 font-medium text-start">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* کارت ارتباط مستقیم واتس‌اپ با کابتن نوح */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-white/15 bg-[#08130e] p-5 sm:p-6 text-center sm:text-start shadow-xl sm:flex-row antialiased">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-athar-lime/30 bg-athar-lime/15 text-athar-lime shadow-[0_0_15px_rgba(167,217,87,0.2)]">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="leading-tight text-start">
              <p className="text-xs sm:text-sm font-black text-white">
                {ui.askMoreTitle}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-slate-300 font-medium">
                {ui.askMoreDesc}
              </p>
            </div>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-athar-lime hover:bg-athar-lime-hover px-5 py-3 text-xs font-black text-athar-forest-deep shadow-[0_0_20px_rgba(167,217,87,0.35)] transition-all active:scale-95 cursor-pointer whitespace-nowrap group"
          >
            <span>{ui.whatsappBtn}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4 text-athar-forest-deep shrink-0 transition-transform duration-200 group-hover:-translate-x-1 stroke-[2.5]" />
            ) : (
              <ArrowRight className="h-4 w-4 text-athar-forest-deep shrink-0 transition-transform duration-200 group-hover:translate-x-1 stroke-[2.5]" />
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
