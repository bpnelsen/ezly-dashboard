import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EZLY — CRM for Contractors',
  description: 'Prolink helps contractors manage customers, jobs, invoicing, and leads — all in one place.',
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'YOUR_GOOGLE_SITE_VERIFICATION_CODE',
  },
  openGraph: {
    title: 'EZLY — Prolink for Contractors',
    description: 'CRM, job management, invoicing, and leads — built for contractors.',
    url: 'https://useezly.com',
    siteName: 'EZLY',
    locale: 'en_US',
    type: 'website',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EZLY',
  url: 'https://useezly.com',
  logo: 'https://github.com/bpnelsen/ezly-dashboard/raw/main/public/ezly-logo.png',
  sameAs: [
    'https://www.facebook.com/ezlyhome',
    'https://www.instagram.com/ezlyhome',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </html>
  )
}
