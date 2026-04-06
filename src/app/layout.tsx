import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import { Lora } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "ChromaGrab | Fast & Free Multi-Format Color Picker",
  description:
    "Pick any color from images, websites, or your screen instantly. Get HEX, RGBA, HSL, CMYK, Tailwind and CSS variables with one click. No signup required.",
  keywords: [
    // 1. Brand Keywords (Navigational)
    "ChromaGrab", "Chroma Grab", "chroma-grab", "chromagrab color picker", "chroma grab app", "chromagrab tool",

    // 2. Broad / High-Traffic Terms
    "color picker", "colour picker", "online color picker", "color extractor", "color grabber", "eyedropper tool", "color identifier",

    // 3. Image & Screen Specific
    "image color picker", "extract color from image", "find color from picture", "what color is this", "screen color picker", "pick color from website", "color picker from url",

    // 4. Developer & Designer Formats
    "hex color picker", "rgb to hex converter", "hex to rgb", "rgba color picker", "hsl color picker", "cmyk color converter", "css color variables generator",

    // 5. Tailwind Specific (Huge niche!)
    "tailwind color picker", "tailwind css color matcher", "find nearest tailwind color", "tailwind palette generator",

    // 6. Feature/Intent Specific (Long-tail)
    "free online color picker", "local image color picker", "secure color extractor", "browser eyedropper", "fast color picker no upload"
  ],
  authors: [{ name: "ChromaGrab" }],
  creator: "ChromaGrab",
  metadataBase: new URL("https://chroma-grab.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chroma-grab.vercel.app",
    title: "ChromaGrab | Fast & Free Multi-Format Color Picker",
    description:
      "Extract precise colour values from any visual source instantly. 100% free, runs entirely in your browser.",
    siteName: "ChromaGrab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ChromaGrab Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChromaGrab | Fast & Free Multi-Format Color Picker",
    description:
      "Extract precise colour values from any visual source instantly. 100% free, runs entirely in your browser.",
    images: ["/og-image.png"],
  },
  verification: {
    google: "your-google-site-verification-code",
    yandex: "your-yandex-verification-code",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "scroll-smooth", inter.variable, lora.variable, jetbrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-text-primary">{children}</body>
    </html>
  );
}
