// src/components/ContactSection.jsx
"use client";

import React, { useRef, useState } from "react";
import {
  Phone,
  MessageSquare,
  MapPin,
  ExternalLink,
  Clock,
  Sparkles,
  Mail,
  Compass,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* آیکون‌های وکتوری رسمی و دقیق شبکه‌های اجتماعی                              */
/* -------------------------------------------------------------------------- */
function WhatsAppIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

// وکتور دقیق و رسمی اسنپ‌چت (Snapchat Official Ghost Silhouette)
function SnapchatIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M12 3.2c-3.3 0-5.8 2.4-5.8 5.75 0 .48.07.97.19 1.46-.45.17-.92.46-.92.96 0 .43.36.77.87.82-.02.17-.04.35-.04.53 0 1.06.52 2.02 1.35 2.65-.36.47-.95.8-1.74.97-.43.1-.68.38-.68.73 0 .43.38.74.97.83 1 .14 1.95.59 2.76 1.29.49.42 1.09.64 1.91.64.8 0 1.4-.2 1.88-.63.82-.7 1.77-1.15 2.76-1.29.6-.09.97-.4.97-.83 0-.35-.25-.63-.68-.73-.8-.17-1.39-.5-1.74-.97.83-.63 1.35-1.59 1.35-2.65 0-.18-.02-.36-.04-.53.51-.05.87-.39.87-.82 0-.5-.47-.79-.92-.96.12-.49.19-.98.19-1.46 0-3.35-2.5-5.75-5.8-5.75z"
        fill="#FFFFFF"
        stroke="#000000"
        strokeWidth="1.35"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
/* -------------------------------------------------------------------------- */
/* کارت با چرخش سه‌بعدی نرم ژورنالی (Light Luxury 3D Card)                     */
/* -------------------------------------------------------------------------- */
function Contact3DCard({ children, className = "" }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = (y / rect.height - 0.5) * -6;
    const rotateY = (x / rect.width - 0.5) * 6;
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
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateY(-4px)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: isInteracting
          ? "none"
          : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-[2.2rem] border border-athar-border bg-white p-6 sm:p-8 shadow-athar-soft transition-all hover:border-athar-forest/30 hover:shadow-athar-float [transform-style:preserve-3d] ${className}`}
    >
      <div className="relative z-10 flex h-full flex-col justify-between [transform:translateZ(15px)] text-start">
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* دیتای رسمی اطلاعات تماس کابتن نوح بن عیسی در عمان                          */
/* -------------------------------------------------------------------------- */
const CONTACT_DATA = {
  ar: {
    sectionBadge: "قنوات التواصل المباشر • كوتش نوح",
    sectionTitle: "معلومات التواصل ومواقع التدريب",
    sectionSubtitle:
      "لحجز الحصص الفردية، استشارات المفاصل والمرونة، والتنسيق الميداني في سلطنة عُمان (مسقط والسويق).",

    phoneRaw: "+96894486154",
    phoneDisplay: "+968 9448 6154",
    email: "nouh7878@gmail.com",
    instagramUsername: "nouh_m95",
    instagramUrl: "https://instagram.com/nouh_m95",
    snapchatUrl: "https://t.snapchat.com/h0TL38t9",
    snapchatHandle: "h0TL38t9",
    whatsappUrl:
      "https://wa.me/96894486154?text=مرحباً%20كابتن%20نوح،%20أود%20الاستفسار%20عن%20جلسات%20التدريب%20الشخصي",

    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Muscat,+Oman",
    appleMapsUrl: "https://maps.apple.com/?q=Muscat,+Oman",

    card1: {
      title: "الاتصال والاستشارة الهاتفية",
      desc: "للتواصل الهاتفي المباشر والاستفسار عن المواعيد والشواغر المتاحة:",
      hoursLabel: "ساعات التنسيق والتواصل المباشر:",
      hoursValue: "السبت - الخميس: ٨:٠٠ ص - ٩:٠٠ م",
    },
    card2: {
      title: "المحادثة والمنصات الرسمية",
      desc: "قنوات التواصل الفوري والمتابعة المباشرة مع الكابتن نوح بن عيسى:",
      whatsappTitle: "واتساب كوتش نوح",
      instagramTitle: "إنستغرام الرسمي",
      snapchatTitle: "سناب شات",
      emailTitle: "البريد الإلكتروني",
      note: "استجابة مباشرة من الكابتن نوح لتنسيق أهدافك الحركية والبدنية.",
    },
    card3: {
      status: "متاح حضورياً في مسقط والسويق",
      title: "مواقع التدريب الحضوري والميداني",
      locationDesc:
        "تُقام الجلسات التدريبية الفردية في سلطنة عُمان داخل محافظة مسقط وولاية السويق بالتنسيق المسبق، اضغط على الموقع لعرضه على الخريطة:",
      regions: [
        {
          name: "محافظة مسقط",
          detail: "جلسات مخصصة باليوم والساعة",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Muscat,+Oman",
        },
        {
          name: "ولاية السويق",
          detail: "تنسيق مسبق وفق جدول الأعمال",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Al+Suwaiq,+Oman",
        },
      ],
      googleMaps: "Google Maps",
      appleMaps: "Apple Maps",
    },
  },

  en: {
    sectionBadge: "DIRECT CHANNELS • COACH NOUH",
    sectionTitle: "Get in Touch & Training Locations",
    sectionSubtitle:
      "For 1-on-1 private coaching sessions, kinetic mobility inquiries, and scheduling in Oman (Muscat & Al-Suwiq).",

    phoneRaw: "+96894486154",
    phoneDisplay: "+968 9448 6154",
    email: "nouh7878@gmail.com",
    instagramUsername: "nouh_m95",
    instagramUrl: "https://instagram.com/nouh_m95",
    snapchatUrl: "https://t.snapchat.com/h0TL38t9",
    snapchatHandle: "h0TL38t9",
    whatsappUrl:
      "https://wa.me/96894486154?text=Hello%20Coach%20Nouh,%20I%20would%20like%20to%20inquire%20about%20personal%20coaching",

    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Muscat,+Oman",
    appleMapsUrl: "https://maps.apple.com/?q=Muscat,+Oman",

    card1: {
      title: "Direct Phone & Consultation",
      desc: "For pre-booking inquiries and session slot coordination in Oman:",
      hoursLabel: "Direct Coordination Hours:",
      hoursValue: "Saturday - Thursday: 8:00 AM - 9:00 PM",
    },
    card2: {
      title: "Direct Chat & Digital Channels",
      desc: "Official channels for immediate updates and consultation with Coach Nouh:",
      whatsappTitle: "Direct WhatsApp",
      instagramTitle: "Official Instagram",
      snapchatTitle: "Official Snapchat",
      emailTitle: "Direct Email",
      note: "Prompt direct response from Coach Nouh tailored around your goals.",
    },
    card3: {
      status: "Active in Muscat & Al-Suwiq",
      title: "Private In-Person Training Locations",
      locationDesc:
        "1-on-1 functional sessions held across Oman in Muscat and Al-Suwiq. Click a location below to view on Map:",
      regions: [
        {
          name: "Muscat Governorate",
          detail: "Scheduled by day & time",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Muscat,+Oman",
        },
        {
          name: "Al-Suwiq Wilayat",
          detail: "Coordinated around your routine",
          mapUrl:
            "https://www.google.com/maps/search/?api=1&query=Al+Suwaiq,+Oman",
        },
      ],
      googleMaps: "Google Maps",
      appleMaps: "Apple Maps",
    },
  },
};

export default function ContactSection({ lang = "ar" }) {
  const isRtl = lang === "ar";
  const ui = CONTACT_DATA[lang] || CONTACT_DATA.ar;

  return (
    <section
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative w-full py-16 md:py-24 overflow-hidden bg-athar-cream border-b border-athar-border transition-colors"
    >
      {/* -------------------------------------------------------------------------- */}
      {/* دایره‌های هندسی استاتیک و مینیمال پس‌زمینه                                 */}
      {/* -------------------------------------------------------------------------- */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* ۱. دایره کرم تیره در بالا - چپ */}
        <div className="absolute -top-16 -left-16 sm:-top-28 sm:-left-28 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-cream-dark" />

        {/* ۲. دایره لیمویی در حاشیه سمت راست */}
        <div className="absolute top-1/2 -right-20 sm:-right-32 -translate-y-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-athar-lime/25" />

        {/* ۳. دایره سبز ملایم در پایین - چپ */}
        <div className="absolute -bottom-24 -left-16 sm:-bottom-32 sm:-left-24 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-athar-forest/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* هدر بخش اطلاعات تماس */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-athar-border shadow-2xs mb-3">
            <Sparkles className="h-3.5 w-3.5 text-athar-forest" />
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

        {/* شبکه ۳ کارته اطلاعات تماس */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 items-stretch">
          {/* کارت ۱: تماس مستقیم و ساعات کاری */}
          <Contact3DCard>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-athar-forest text-athar-lime shadow-2xs">
                <Phone className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg sm:text-xl font-black text-athar-forest-deep">
                {ui.card1.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-athar-muted font-medium">
                {ui.card1.desc}
              </p>

              <div className="mt-5">
                <a
                  href={`tel:${ui.phoneRaw}`}
                  dir="ltr"
                  className="inline-flex items-center gap-2.5 rounded-full border border-athar-forest/20 bg-athar-cream px-4 py-2.5 font-sans text-sm sm:text-base font-black tracking-wider text-athar-forest shadow-2xs transition-all hover:bg-athar-forest hover:text-white cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-athar-lime-hover" />
                  <span>{ui.phoneDisplay}</span>
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-athar-border/70 pt-4">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-athar-forest">
                <Clock className="h-3.5 w-3.5 text-athar-forest" />
                <span>{ui.card1.hoursLabel}</span>
              </div>
              <p className="mt-1 text-xs font-bold text-athar-forest-deep">
                {ui.card1.hoursValue}
              </p>
            </div>
          </Contact3DCard>

          {/* کارت ۲: شبکه‌های اجتماعی رسمی مربی نوح */}
          <Contact3DCard>
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-athar-forest text-athar-lime shadow-2xs">
                <MessageSquare className="h-5 w-5" />
              </div>

              <h3 className="mt-5 text-lg sm:text-xl font-black text-athar-forest-deep">
                {ui.card2.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-athar-muted font-medium">
                {ui.card2.desc}
              </p>

              <div className="mt-4 space-y-2">
                {/* واتس‌اپ رسمی کابتن نوح */}
                <a
                  href={ui.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-athar-border bg-athar-cream/40 p-2.5 transition-all hover:border-athar-forest/30 hover:bg-white cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-emerald-100 p-1.5 text-emerald-800">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-black text-athar-forest-deep">
                      {ui.card2.whatsappTitle}
                    </span>
                  </div>
                  <span
                    className="font-sans text-[11px] font-bold text-athar-muted group-hover/item:text-athar-forest flex items-center gap-1"
                    dir="ltr"
                  >
                    <span>{ui.phoneDisplay}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                {/* اینستاگرام نوح بن عیسی */}
                <a
                  href={ui.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-athar-border bg-athar-cream/40 p-2.5 transition-all hover:border-athar-forest/30 hover:bg-white cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-pink-100 p-1.5 text-pink-700">
                      <InstagramIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-black text-athar-forest-deep">
                      {ui.card2.instagramTitle}
                    </span>
                  </div>
                  <span
                    className="font-sans text-[11px] font-bold text-athar-muted group-hover/item:text-athar-forest flex items-center gap-1"
                    dir="ltr"
                  >
                    <span>@{ui.instagramUsername}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                {/* اسنپ‌چت مربی با آیکون اورجینال شبح */}
                <a
                  href={ui.snapchatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex items-center justify-between rounded-xl border border-athar-border bg-athar-cream/40 p-2.5 transition-all hover:border-athar-forest/30 hover:bg-white cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    {/* باکس زرد رسمی اسنپ‌چت با تراز وسط کامل */}
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FFFC00] shadow-2xs border border-black/10">
                      <SnapchatIcon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-black text-athar-forest-deep">
                      {ui.card2.snapchatTitle}
                    </span>
                  </div>
                  <span
                    className="font-sans text-[11px] font-bold text-athar-muted group-hover/item:text-athar-forest flex items-center gap-1"
                    dir="ltr"
                  >
                    <span>{ui.snapchatHandle}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>

                {/* ایمیل رسمی مربی نوح */}
                <a
                  href={`mailto:${ui.email}`}
                  className="group/item flex items-center justify-between rounded-xl border border-athar-border bg-athar-cream/40 p-2.5 transition-all hover:border-athar-forest/30 hover:bg-white cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="rounded-lg bg-athar-forest/10 p-1.5 text-athar-forest">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-black text-athar-forest-deep">
                      {ui.card2.emailTitle}
                    </span>
                  </div>
                  <span
                    className="font-sans text-[11px] font-bold text-athar-muted group-hover/item:text-athar-forest flex items-center gap-1"
                    dir="ltr"
                  >
                    <span>{ui.email}</span>
                    <ExternalLink className="h-3 w-3" />
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-5 border-t border-athar-border/70 pt-3 text-[11px] text-athar-muted font-medium">
              {ui.card2.note}
            </div>
          </Contact3DCard>

          {/* کارت ۳: موقعیت‌های جغرافیایی و دکمه‌های مسیریابی Google Maps و Apple Maps */}
          <Contact3DCard>
            <div>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-athar-forest text-athar-lime shadow-2xs">
                  <MapPin className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-athar-forest/15 bg-athar-cream px-3 py-1 text-[11px] font-bold text-athar-forest shadow-2xs">
                  <span className="h-2 w-2 rounded-full bg-athar-lime animate-pulse" />
                  <span>{ui.card3.status}</span>
                </span>
              </div>

              <h3 className="mt-5 text-lg sm:text-xl font-black text-athar-forest-deep">
                {ui.card3.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-athar-muted font-medium">
                {ui.card3.locationDesc}
              </p>

              {/* باکس‌های تعاملی دو منطقه با امکان کلیک مستقیم و باز شدن نقشه */}
              <div className="mt-5 space-y-2.5">
                {ui.card3.regions.map((reg, idx) => (
                  <a
                    key={idx}
                    href={reg.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-athar-cream/50 border border-athar-border hover:bg-white hover:border-athar-forest/30 transition-all cursor-pointer group/reg"
                  >
                    <div className="flex items-center gap-2">
                      <Compass className="h-4 w-4 text-athar-forest group-hover/reg:rotate-45 transition-transform" />
                      <span className="text-xs font-black text-athar-forest-deep">
                        {reg.name}
                      </span>
                    </div>
                    <span className="text-[10.5px] font-bold text-athar-muted flex items-center gap-1">
                      <span>{reg.detail}</span>
                      <ExternalLink className="h-3 w-3 opacity-60" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* بخش مسیریابی با Google Maps و Apple Maps مطابق نمونه اصلی */}
            <div className="mt-8 border-t border-athar-border/70 pt-4">
              <div className="flex items-center gap-2.5">
                <a
                  href={ui.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-athar-border bg-athar-cream/70 py-3 text-center text-xs font-black text-athar-forest-deep transition-all hover:bg-athar-forest hover:text-white cursor-pointer shadow-2xs"
                >
                  {ui.card3.googleMaps}
                </a>
                <a
                  href={ui.appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-athar-border bg-athar-cream/70 py-3 text-center text-xs font-black text-athar-forest-deep transition-all hover:bg-athar-forest hover:text-white cursor-pointer shadow-2xs"
                >
                  {ui.card3.appleMaps}
                </a>
              </div>
            </div>
          </Contact3DCard>
        </div>
      </div>
    </section>
  );
}
