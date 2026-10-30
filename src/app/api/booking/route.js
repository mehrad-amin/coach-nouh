// src/app/api/booking/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    // ایجاد یک شماره پرونده یکتا برای شاگرد
    const fileId = `Mohammed-${Math.floor(1000 + Math.random() * 9000)}`;
    const payload = {
      ...body,
      fileId,
    };

    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    // ارسال داده‌ها به وب‌هوک گوگل شیت
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
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
