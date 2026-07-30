import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Fraunces, Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { RouteScrollReset } from "@/components/layout/RouteScrollReset";
import { SitePreloader } from "@/components/layout/SitePreloader";
import { buildMetadata, getSiteJsonLdGraph } from "@/lib/seo";
import { ANALYTICS_ENABLED, GA_ID, GTM_ID } from "@/lib/constants";
import { getHomePreloadManifest } from "@/lib/preloadAssets";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
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
  themeColor: "#0A2740",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const preloadManifest = getHomePreloadManifest();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Keep charset the very first byte range of <head> so it lands within
            the first 1024 bytes even after critical-CSS inlining. */}
        <meta charSet="utf-8" />
        {/* Google Tag Manager — loaded as high in <head> as possible. */}
        {ANALYTICS_ENABLED && GTM_ID ? (
          <Script id="gtm-base" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        ) : null}
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
          <style>{`.zm-preloader{display:none!important}.motion-reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <script
          id="zm-preload-manifest"
          type="application/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(preloadManifest),
          }}
        />
      </head>
      <body className="font-inter">
        {/* Google Tag Manager (noscript) — immediately after <body>. */}
        {ANALYTICS_ENABLED && GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
              title="Google Tag Manager"
            />
          </noscript>
        ) : null}
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SitePreloader />
        <RouteScrollReset />
        <Header />
        <main
          id="main"
          tabIndex={-1}
          className="min-h-[calc(100vh-5rem)] pt-20 focus:outline-none lg:min-h-[calc(100vh-6rem)] lg:pt-24"
        >
          {children}
        </main>
        <Footer />
        <FloatingWhatsApp />
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
