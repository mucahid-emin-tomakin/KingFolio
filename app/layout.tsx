import "./globals.css";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import LOADER from './tsx/layout/LOADER';
import SCROLLBAR from './tsx/layout/SCROLLBAR';
import NAVBAR from './tsx/layout/NAVBAR';
import FOOTER from './tsx/layout/FOOTER';
import type { Metadata, Viewport } from "next";
export const metadata: Metadata = {
  metadataBase: new URL('https://mucahid-emin-tomakin.vercel.app'),
  title: {
    default: "Mücahid Emin Tomakin - RPA Developer & IT Manager | Kingfolio",
    template: "%s | Kingfolio"
  },
  description: "Mücahid Emin Tomakin - Verwandelt alltägliche Prozesse in effiziente KI-gestützte Lösungen und schafft Raum für mehr Innovation",
  keywords: "Mücahid, Emin, Tomakin, Mücahid Emin, Mücahid Tomakin, Emin Tomakin, Mücahid Emin Tomakin, KI, KI Developer, AI, AI Developer, Artificial Intelligence, RPA, Robotic Process Automation, RPA Developer, IT, IT Manager, IT Management, Informatik, Software Development, Software Engineer, Web Development, Portfolio, Kingfolio, Student, Universität Wien, Wien, Österreich, Prozessautomatisierung, Automation, Business Automation, Digital Transformation, Tech, Technology, Coding, Programmierer, Developer",
  manifest: "/manifest.json",
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: "Mücahid Emin Tomakin - RPA Developer & IT Manager | Kingfolio",
    description: "Mücahid Emin Tomakin - Verwandelt alltägliche Prozesse in effiziente KI-gestützte Lösungen und schafft Raum für mehr Innovation",
    images: ['/webp/Kingfolio.webp'],
    url: 'https://mucahid-emin-tomakin.vercel.app',
    type: 'website',
    locale: 'de_DE',
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Kingfolio"
  }
};
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  userScalable: true,
  themeColor: '#000000',
};
function ScrollbarWithSuspense() {
  return (
    <Suspense fallback={<div id="progressBar" style={{height: '0%'}} />}>
      <SCROLLBAR />
    </Suspense>
  );
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Ys0GrcMhraPkygVabeCJwMuVreuR05BV5JGAIX59mwc" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Kingfolio" />
        <link rel="apple-touch-startup-image" href="/apple-touch-icon.png" />
        <link rel="canonical" href="https://mucahid-emin-tomakin.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person", 
              "name": "Mücahid Emin Tomakin",
              "jobTitle": "RPA Developer & IT Manager",
              "description": "Mücahid Emin Tomakin - Verwandelt alltägliche Prozesse in effiziente KI-gestützte Lösungen und schafft Raum für mehr Innovation",
              "url": "https://mucahid-emin-tomakin.vercel.app",
              "sameAs": [
                "https://github.com/mucahid-emin-tomakin"
              ],
              "knowsAbout": [
                "IT",
                "IT Management", 
                "RPA",
                "Robotic Process Automation",
                "AI",
                "Artificial Intelligence",
                "KI",
                "Process Automation",
                "Business Automation",
                "Software Development",
                "Digital Transformation",
                "Coding",
                "Programming",
                "Informatik",
                "Tech",
                "Technology"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Universität Wien"
              },
              "homeLocation": {
                "@type": "City",
                "name": "Wien"
              },
              "hasOccupation": {
                "@type": "Occupation",
                "name": "RPA Developer",
                "occupationLocation": {
                  "@type": "City",
                  "name": "Wien"
                }
              }
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <LOADER />
        <ScrollbarWithSuspense />
        <NAVBAR />
        <main>{children}</main>
        <FOOTER />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}