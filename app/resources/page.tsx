'use client'

import Link from 'next/link'
import { BookOpen, ShieldCheck, BarChart3, Wrench } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="max-w-4xl mx-auto px-6 pt-24 pb-20">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#0f3a7d] mb-8 tracking-tight">
          Resources
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Tools and guides to help you grow your contractor business.
        </p>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition">
              <Wrench className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Getting Started</h3>
              <p className="text-gray-600 text-sm">Set up your account, import customers, and start managing jobs in under 15 minutes.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition">
              <BarChart3 className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business Growth</h3>
              <p className="text-gray-600 text-sm">Learn how to scale your operations with Prolink. Tips, tricks, and best practices.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition">
              <ShieldCheck className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Compliance Guide</h3>
              <p className="text-gray-600 text-sm">Stay ahead of local codes, insurance requirements, and best practices.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition">
              <BookOpen className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm">Step-by-step videos for every feature. Watch and learn at your own pace.</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#0c2e5c] text-white py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-white/60 text-sm">
            &copy; 2026 Prolink by EZLY. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
