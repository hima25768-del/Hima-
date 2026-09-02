import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HIM BAZ | Digital Growth & Technology",
  description: "Websites, apps, e-commerce, marketing, Google Ads, social media and content services for businesses in the UAE.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased">{children}</body>
    </html>
  );
}
