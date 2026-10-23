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
  coachWhatsapp = "96894486154", // شماره رسمی واتس‌اپ کابتن نوح
}) {
  const isRtl = lang === "ar";
  const ui = FAQ_DATA[lang] || FAQ_DATA.ar;

  const [openIndex, setOpenIndex] = useState(0); // باز بودن نخستین سؤال به صورت پیش‌فرض برای تجربه کاربری بهتر

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
      className="relative w-full py-16 md:py-24 overflow-hidden bg-athar-cream border-b border-athar-border transition-colors"
    >
      {/* -------------------------------------------------------------------------- */}
      {/* دایره‌های هندسی استاتیک و مینیمال پس‌زمینه (چیدمان بدون همپوشانی)            */}
      {/* -------------------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* ۱. دایره کرم تیره در گوشه بالا - راست (متضاد با دایره پایین چپِ سکشن قیمت‌گذاری) */}
        <div className="absolute -top-16 -right-16 sm:-top-28 sm:-right-28 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-cream-dark" />

        {/* ۲. دایره لیمویی در حاشیه سمت چپ */}
        <div className="absolute top-1/2 -left-20 sm:-left-32 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-athar-lime/25" />

        {/* ۳. دایره سبز ملایم در پایین - راست */}
        <div className="absolute -bottom-24 -right-16 sm:-bottom-32 sm:-right-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-forest/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        {/* هدر بخش سؤالات متداول */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-athar-border shadow-2xs mb-3">
            <HelpCircle className="h-3.5 w-3.5 text-athar-forest" />
            <span className="text-xs font-bold text-athar-forest-deep">
              {ui.sectionBadge}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-black tracking-tight text-athar-forest-deep leading-tight">
            {ui.sectionTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm md:text-base text-athar-muted max-w-xl mx-auto leading-relaxed font-medium">
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
                className={`relative overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                  isOpen
                    ? "border-athar-forest/40 shadow-athar-soft ring-1 ring-athar-lime/50"
                    : "border-athar-border shadow-2xs hover:border-athar-forest/30"
                }`}
              >
                {/* خط ظریف بالای کارت در وضعیت باز */}
                <div
                  className={`pointer-events-none absolute inset-x-0 top-0 h-[2.5px] bg-athar-lime transition-opacity duration-300 ${
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
                        isOpen ? "text-athar-forest" : "text-athar-muted"
                      }`}
                    >
                      {formattedIdx}
                    </span>
                    <span
                      className={`text-sm sm:text-base font-black transition-colors leading-snug ${
                        isOpen
                          ? "text-athar-forest-deep"
                          : "text-athar-forest-deep/90"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 border-athar-forest bg-athar-forest text-athar-lime shadow-2xs"
                        : "border-athar-border bg-athar-cream/70 text-athar-forest"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
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
                    <div className="border-t border-athar-border/70 mx-5 pt-3.5 pb-5">
                      <p className="text-xs sm:text-sm leading-relaxed text-athar-muted font-medium text-start">
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
        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-3xl border border-athar-border bg-white p-5 sm:p-6 text-center sm:text-start shadow-athar-soft sm:flex-row">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-athar-forest text-athar-lime shadow-2xs">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div className="leading-tight text-start">
              <p className="text-xs sm:text-sm font-black text-athar-forest-deep">
                {ui.askMoreTitle}
              </p>
              <p className="mt-1 text-[11px] sm:text-xs text-athar-muted font-medium">
                {ui.askMoreDesc}
              </p>
            </div>
          </div>

          <a
            href={whatsappDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-athar-forest hover:bg-athar-forest-deep px-5 py-3 text-xs font-bold text-white shadow-athar-soft transition-all active:scale-95 cursor-pointer whitespace-nowrap group"
          >
            <span>{ui.whatsappBtn}</span>
            {isRtl ? (
              <ArrowLeft className="h-4 w-4 text-athar-lime shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="h-4 w-4 text-athar-lime shrink-0 transition-transform duration-200 group-hover:translate-x-1" />
            )}
          </a>
        </div>
      </div>
    </section>
  );
}
