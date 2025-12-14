import type { Metadata, Viewport } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "LumiGreen - นวัตกรรมแสงสว่างอัจฉริยะ จากวัสดุรีไซเคิล",
  description: "ผสานพลังงานสะอาดและเทคโนโลยี IoT ลดค่าไฟ เพิ่มประสิทธิภาพการเรียนรู้ เปลี่ยนขยะให้เป็นแสงสว่างที่ยั่งยืน",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "LumiGreen",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "th_TH",
    url: "https://lumigreen.app",
    title: "LumiGreen - Smart Light Pipe System",
    description: "ระบบท่อแสงอัจฉริยะเพื่ออาคารยั่งยืน",
    siteName: "LumiGreen",
    images: [
      {
        url: "/hero-image.png",
        width: 1200,
        height: 630,
        alt: "LumiGreen Smart Light Pipe",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LumiGreen - Smart Light Pipe System",
    description: "ระบบท่อแสงอัจฉริยะเพื่ออาคารยั่งยืน",
    images: ["/hero-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${prompt.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
