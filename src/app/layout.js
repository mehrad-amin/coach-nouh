import "./globals.css";
import { Cairo, Plus_Jakarta_Sans } from "next/font/google";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "كوتش نوح | مدرب شخصي للّياقة والمرونة ونمط الحياة",
  description:
    "أسلوب تدريب وظيفي مرن يتلائم مع ظروفك. حصص شخصية مخصصة لتحقيق أعلى مستوى من اللياقة والمرونة واكتساب مهارة التدريب المستقل مع الكابتن نوح بن عيسى في سلطنة عُمان (مسقط والسويق).",
  keywords: [
    "كوتش نوح",
    "نوح بن عيسى",
    "مدرب شخصي عمان",
    "مدرب شخصي مسقط",
    "مدرب شخصي السويق",
    "تدريب وظيفي ومرونة مفاصل",
    "لياقة حركية واستقلالية بدنية",
  ],
  openGraph: {
    title: "كوتش نوح | مدرب شخصي ونمط حياة صحي",
    description:
      "تدرّب بذكاء، حرر مفاصلك، واكتسب مهارة التدريب المستقل مدى الحياة مع الكابتن نوح بن عيسى في سلطنة عُمان.",
    locale: "ar_OM",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${jakarta.variable}`}
    >
      <body className="min-h-screen bg-athar-cream text-athar-forest antialiased selection:bg-athar-lime selection:text-athar-forest-deep font-arabic">
        {/* گرادیان نوری پس‌زمینه برای ایجاد عمق مدرن ورزشی */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
          <div className="absolute -top-48 right-1/4 w-[600px] h-[600px] bg-athar-forest/20 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] bg-athar-lime/5 rounded-full blur-[160px]" />
        </div>

        {/* محفظه اصلی صفحات */}
        <main className="relative flex flex-col min-h-screen">{children}</main>
      </body>
    </html>
  );
}
