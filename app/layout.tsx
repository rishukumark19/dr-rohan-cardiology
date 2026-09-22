import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import EmergencyBanner from "@/components/layout/EmergencyBanner";
import { doctor } from "@/config/doctor";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(doctor.seo.domain),
  title: {
    default: doctor.seo.siteName,
    template: `%s | ${doctor.name} — Cardiologist`,
  },
  description: doctor.seo.description,
  keywords: doctor.seo.keywords,
  authors: [{ name: doctor.name }],
  creator: doctor.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: doctor.seo.domain,
    siteName: doctor.seo.siteName,
    title: doctor.seo.siteName,
    description: doctor.seo.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${doctor.name} — ${doctor.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: doctor.seo.siteName,
    description: doctor.seo.description,
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: doctor.name,
    description: doctor.seo.description,
    medicalSpecialty: {
      "@type": "MedicalSpecialty",
      name: doctor.speciality,
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: doctor.institution,
    },
    hasCredential: doctor.nmc,
    telephone: doctor.phone,
    url: doctor.seo.domain,
    image: `${doctor.seo.domain}/doctor-photo.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: "E-24 Main Market Road, Greater Kailash 1",
      addressLocality: "New Delhi",
      addressRegion: "Delhi",
      postalCode: "110048",
      addressCountry: "IN",
    },
    availableService: doctor.clinics.map((c) => ({
      "@type": "MedicalClinic",
      name: c.name,
      address: c.address,
    })),
  };

  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${inter.variable}`}>
      <head>
        {/* Material Symbols Outlined */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Physician Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="bg-surface text-on-surface antialiased"
        style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:rounded-full focus:text-label-md"
        >
          Skip to main content
        </a>

        <Header />
        <EmergencyBanner />

        <main id="main-content" className="pt-20">
          {children}
        </main>

        <Footer />
        <MobileBottomBar />
      </body>
    </html>
  );
}
