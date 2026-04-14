'use client'

import Link from 'next/link'
import { FileText, Zap, BookOpen, Mail } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function SiteMapPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Sitemap</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0f3a7d] mb-12 tracking-tight">Site Map</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          {/* Public Pages */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-[#14b8a6]" />
              <h2 className="text-lg font-bold text-gray-900">Public Pages</h2>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About Prolink' },
                { href: '/blog', label: 'Blog' },
                { href: '/contractors', label: 'Find Contractors' },
                { href: '/resources', label: 'Resources' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/sitemap', label: 'Sitemap' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#0f3a7d] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-[#14b8a6]" />
              <h2 className="text-lg font-bold text-gray-900">Account</h2>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/login', label: 'Sign In' },
                { href: '/signup/contractor', label: 'Sign Up — Contractor' },
                { href: '/dashboard', label: 'Dashboard' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#0f3a7d] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Blog */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[#14b8a6]" />
              <h2 className="text-lg font-bold text-gray-900">Blog</h2>
            </div>
            <ul className="space-y-3 text-sm">
              {[
                { href: '/blog/how-to-grow-contractor-business', label: 'How to Grow Your Contractor Business in 2026' },
                { href: '/blog/contractor-invoicing-tips', label: '5 Invoicing Mistakes Contractors Make' },
                { href: '/blog/crm-for-contractors', label: 'Why Every Contractor Needs a CRM' },
                { href: '/blog/winning-more-bids', label: 'How to Win More Bids Without Lowering Your Price' },
                { href: '/blog/managing-contractor-teams', label: 'Managing Multiple Crews Without Losing Your Mind' },
                { href: '/blog/contractor-licensing-insurance', label: 'Licensing & Insurance: What Every Contractor Must Know' },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-gray-600 hover:text-[#0f3a7d] transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-5 h-5 text-[#14b8a6]" />
              <h2 className="text-lg font-bold text-gray-900">Contact</h2>
            </div>
            <ul className="space-y-3 text-sm">
              <li><a href="mailto:ezly.home@gmail.com" className="text-gray-600 hover:text-[#0f3a7d] transition-colors">ezly.home@gmail.com</a></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#0f3a7d] transition-colors">Contact Page</Link></li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">&copy; 2026 Prolink by EZLY. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-gray-600 transition">Privacy</Link>
            <Link href="/about" className="hover:text-gray-600 transition">About</Link>
            <a href="mailto:ezly.home@gmail.com" className="hover:text-gray-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
