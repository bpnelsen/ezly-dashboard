'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle, Wrench, Users, TrendingUp, Shield } from 'lucide-react'
import Navigation from '@/components/Navigation'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <section className="max-w-4xl mx-auto px-6 pt-28 pb-20">
        <h1 className="text-5xl sm:text-6xl font-bold text-[#0f3a7d] mb-8 tracking-tight">
          About Prolink
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed max-w-2xl">
          We built Prolink because we saw contractors struggling with the same problems every day. Too many apps. Not enough time. We thought there had to be a better way.
        </p>
      </section>

      <section className="bg-[#f8fafc] py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0f3a7d] mb-8">Our Story</h2>
          <div className="text-lg text-gray-600 max-w-none">
            <p className="mb-6">
              Running a contractor business is hard enough without juggling a dozen different tools just to stay organized. We created Prolink to solve that.
            </p>
            <p className="mb-6">
              Prolink brings CRM, job management, invoicing, and customer communication into one simple platform. No more switching between apps. No more lost leads. No more paperwork headaches.
            </p>
            <p>
              We believe contractors should spend their time doing what they do best — great work — not wrestling with software.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#0f3a7d] mb-12 text-center">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <Wrench className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Built for Contractors</h3>
              <p className="text-gray-600">Every feature designed with real contractors in mind. We asked, we listened, we built.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <Shield className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Transparency</h3>
              <p className="text-gray-600">No hidden fees. No surprises. Simple pricing for a simple product.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <Users className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Real Support</h3>
              <p className="text-gray-600">Talk to real people who understand your business. Not a chatbot. Not a ticket system.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100">
              <TrendingUp className="w-8 h-8 text-[#14b8a6] mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Always Improving</h3>
              <p className="text-gray-600">We ship updates weekly. Your feedback shapes the product.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0f3a7d] py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to simplify your business?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of contractors who have made the switch to Prolink.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/signup/contractor"
              className="px-8 py-4 bg-[#14b8a6] text-white font-bold rounded-xl hover:bg-[#0d9e8c] transition text-lg"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition text-lg"
            >
              Sign In
            </Link>
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
