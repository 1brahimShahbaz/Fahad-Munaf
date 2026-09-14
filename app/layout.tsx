import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Instrument_Sans, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { TalkWithFMP } from "@/components/layout/TalkWithFMP";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { SitePreloader } from "@/components/layout/SitePreloader";
import { buildMetadata, getSiteJsonLdGraph } from "@/lib/seo";
import { ANALYTICS_ENABLED, GA_ID } from "@/lib/constants";

/**
 * Display face. The brand stack asks for "Anthropic Sans" first — that is a
 * proprietary typeface with no public webfont, so it only resolves for people
 * who have it installed locally. Instrument Sans is the loadable fallback
 * everyone else gets: same contemporary geometric-humanist feel.
 * See `fontFamily.display` in tailwind.config.ts.
 */
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = buildMetadata();

export const viewport: Viewport = {
  themeColor: "#1B2145",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${instrumentSans.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="48x48" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getSiteJsonLdGraph()),
          }}
        />
        <noscript>
          <style>{`.fmp-preloader{display:none!important}.motion-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-inter">
        <SitePreloader />
        <Header />
        <main className="min-h-[calc(100vh-5rem)] pt-20 lg:min-h-[calc(100vh-6rem)] lg:pt-24">
          {children}
        </main>
        <Footer />
        <TalkWithFMP />
        <CustomCursor />
        <ScrollToTop />
        {ANALYTICS_ENABLED && GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
