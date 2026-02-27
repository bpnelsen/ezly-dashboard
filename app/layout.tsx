import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'EZLY Dashboard',
  description: 'Contractor management and campaign platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
