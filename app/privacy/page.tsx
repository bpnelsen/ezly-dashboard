'use client'

import Link from 'next/link'
import { Lock, FileText, Eye } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#0f3a7d] mb-8 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          At Prolink, we take your privacy seriously. Here&apos;s how we protect your data.
        </p>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <Lock className="w-6 h-6 text-[#14b8a6] mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Data Encryption</h3>
              <p className="text-gray-600">Your sensitive data is encrypted using industry-standard protocols. We invest in security so you don&apos;t have to worry.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <Eye className="w-6 h-6 text-[#14b8a6] mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">We Never Sell Your Data</h3>
              <p className="text-gray-600">Your business data is yours. We never sell customer information to third parties or advertisers.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <FileText className="w-6 h-6 text-[#14b8a6] mb-3" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparent Practices</h3>
              <p className="text-gray-600">We are upfront about what data we collect and why. No hidden clauses. No surprises.</p>
            </div>
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
