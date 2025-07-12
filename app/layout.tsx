import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Open_Sans } from "next/font/google"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import WhatsAppButton from "@/components/WhatsAppButton"

// Configure Montserrat for headings
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: '--font-montserrat',
  display: 'swap',
})

// Configure Open Sans for body text
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: '--font-opensans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: "SRI SANARI SHANKARA INFRA AND MARKETING - Premium Real Estate",
    template: "%s | SRI SANARI SHANKARA INFRA"
  },
  description: "Premium plots at affordable prices in Telangana. Your trusted partner in real estate development with RERA approved projects.",
  keywords: ["real estate", "plots", "Telangana", "RERA approved", "residential plots", "commercial plots", "real estate Hyderabad", "plots in Hyderabad", "affordable housing"],
  authors: [{ name: "SRI SANARI SHANKARA INFRA" }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://srisanari.com',
    siteName: 'SRI SANARI SHANKARA INFRA',
    title: 'SRI SANARI SHANKARA INFRA - Premium Real Estate',
    description: 'Premium plots at affordable prices in Telangana. Your trusted partner in real estate development.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRI SANARI SHANKARA INFRA - Premium Real Estate',
    description: 'Your trusted partner in real estate development in Telangana',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${openSans.variable}`}>
      <body className={`min-h-screen flex flex-col bg-white font-sans`}>
        <WhatsAppButton />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
