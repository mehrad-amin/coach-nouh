// src/app/api/booking/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // ۱. ایجاد شناسه یکتا برای پرونده ورزشی شاگرد
    const fileId = `Mohammed-${Math.floor(1000 + Math.random() * 9000)}`;

    // ۲. استخراج و فلت‌سازی داده‌های بیومکانیک و مفاصل
    const jointName =
      body.biomechanics?.shortNameAr ||
      body.biomechanics?.nameAr ||
      body.biomechanics?.name ||
      "غير محدد";

    const jointPriority =
      body.biomechanics?.screeningFocus ||
      body.biomechanics?.badgeAr ||
      "فحص عام";

    // ۳. استخراج داده‌های ماشین‌حساب کالری و بیومتریک
    const targetCalories =
      body.calculatedStats?.result?.targetCalories ||
      body.calculatedStats?.result?.calories ||
      "-";

    const currentWeight = body.calculatedStats?.weight
      ? `${body.calculatedStats.weight} kg`
      : "-";

    const currentHeight = body.calculatedStats?.height
      ? `${body.calculatedStats.height} cm`
      : "-";

    // ۴. ساختاردهی پلود تمیز برای وب‌هوک گوگل شیت
    const formattedPayload = {
      fileId,
      timestamp: new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Muscat",
      }),
      name: body.name || "-",
      phone: body.phone || "-",
      location: body.location || "-",
      selectedPlan: body.selectedPlan || "-",
      planPrice: body.planPrice || "-",
      planDuration: body.planDuration || "-",
      goal: body.goal || "-",
      experience: body.experience || "-",
      trainingDays: body.trainingDays ? `${body.trainingDays} أيام` : "-",
      jointFocus: jointName, // ستون جدید: مفصل انتخابی
      jointPriority: jointPriority, // ستون جدید: اولویت فحص
      targetCalories: targetCalories, // ستون جدید: کالری هدف
      weight: currentWeight, // ستون جدید: وزن شاگرد
      height: currentHeight, // ستون جدید: قد شاگرد
      notes: body.notes || "لا توجد ملاحظات",
      rawDetails: JSON.stringify({
        biomechanics: body.biomechanics || null,
        calculatedStats: body.calculatedStats || null,
      }),
    };

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // ۵. ارسال موازی با Timeout جهت جلوگیری از بلاک شدن پاسخ سرور
    if (webhookUrl) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);

      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedPayload),
          signal: controller.signal,
        });
      } catch (webhookErr) {
        console.warn(
          "Google Sheet Webhook Warning (Non-blocking):",
          webhookErr.message,
        );
      } finally {
        clearTimeout(timeoutId);
      }
    }

    return NextResponse.json({
      success: true,
      fileId,
      coachPhone: process.env.COACH_WHATSAPP_PHONE || "96894486154",
    });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json(
      { success: false, error: "تعذر تسجيل البيانات في الوقت الحالي." },
      { status: 500 },
    );
  }
}
