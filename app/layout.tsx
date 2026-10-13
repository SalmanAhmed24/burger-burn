import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { BookingProvider } from "@/components/Booking";
import { MotionProvider } from "@/components/MotionProvider";
import { Header } from "@/components/Header";
import { FloatingNav } from "@/components/sections/Commerce";
import { Footer } from "@/components/sections/Static";

// Self-hosted (from Fontsource, OFL licensed): no third-party requests, no layout shift.
const display = localFont({
  src: "./fonts/Anton.woff2",
  weight: "400",
  variable: "--f-display",
  display: "swap",
  fallback: ["Impact", "Arial Narrow", "sans-serif"],
});
const body = localFont({
  src: "./fonts/Figtree-Variable.woff2",
  weight: "300 900",
  variable: "--f-body",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});
const script = localFont({
  src: "./fonts/Caveat-Bold.woff2",
  weight: "700",
  variable: "--f-script",
  display: "swap",
  preload: false,
  fallback: ["cursive"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://bunfire.example";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Bunfire Burger & Grill | Smash burgers and charcoal grill",
    template: "%s | Bunfire Burger & Grill",
  },
  description:
    "Smash burgers made with beef ground every morning, charcoal-grilled skewers, hand-cut fries and thick shakes. Order now or book a table at a Bunfire near you.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Bunfire Burger & Grill",
    description: "Smash burgers and charcoal grill. Beef ground fresh every morning.",
    url: siteUrl,
    siteName: "Bunfire",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Bunfire Burger & Grill" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2B4A42",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Bunfire Burger & Grill",
  servesCuisine: ["Burgers", "Grill"],
  priceRange: "$$",
  url: siteUrl,
  acceptsReservations: true,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {/* Header, footer, dock and booking dialog persist across page changes. */}
        <MotionProvider>
          <BookingProvider>
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <FloatingNav />
          </BookingProvider>
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
