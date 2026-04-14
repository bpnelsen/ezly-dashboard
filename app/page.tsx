'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { CheckCircle, Users, Wrench, BarChart3, Zap, Settings, TrendingUp, ArrowRight, Shield, Clock, Star, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import EzlyLogo from '@/components/EzlyLogo'

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* HERO - Enterprise Clean */}
      <section className="bg-gradient-to-br from-[#0f3a7d] via-[#0f3a7d] to-[#0c2e5c] pt-20 sm:pt-24 pb-24 sm:pb-36 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full"></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full mb-8 border border-white/10">
            <div className="w-2 h-2 rounded-full bg-[#14b8a6] animate-pulse"></div>
            <span className="text-white/90 text-sm font-medium tracking-wide">Built for Contractors, by Contractors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
            Run Your Business
            <br />
            <span className="text-[#14b8a6]">on Autopilot</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            CRM, job management, invoicing, and leads — all in one place.
            <br className="hidden sm:block" />
            Prolink helps you focus on the work, not the paperwork.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              href="/signup/contractor"
              className="px-8 py-4 bg-[#14b8a6] hover:bg-[#0d9e8c] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl text-lg flex items-center gap-2 group"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#how-it-works"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-xl hover:bg-white/20 transition-all text-lg"
            >
              See How It Works
            </a>
          </div>

          <p className="text-white/40 text-sm tracking-wide">No credit card required · Free 14-day trial · Cancel anytime</p>
        </div>
      </section>

      {/* SOCIAL PROOF BAR */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">
            Trusted by contractors across the country
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#0f3a7d]">500+</div>
              <div className="text-sm text-gray-500 mt-1">Contractors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#0f3a7d]">12K+</div>
              <div className="text-sm text-gray-500 mt-1">Jobs Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#0f3a7d]">$2.4M</div>
              <div className="text-sm text-gray-500 mt-1">Invoiced</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-[#0f3a7d]">4.9</div>
              <div className="text-sm text-gray-500 mt-1 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" /> Rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="bg-[#f8fafc] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Sound familiar?</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Most contractors waste 10+ hours a week on admin. We built Prolink to fix that.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
              <div className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-6 tracking-wide uppercase">
                <span className="w-8 h-[2px] bg-red-500"></span> The Problem
              </div>
              <ul className="space-y-5 text-gray-700">
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5">✕</span>Juggling multiple apps for CRM, invoicing, and scheduling</li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5">✕</span>Lost leads because you could not follow up fast enough</li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5">✕</span>Invoicing takes hours you could spend on jobs</li>
                <li className="flex items-start gap-3"><span className="text-red-400 font-bold mt-0.5">✕</span>No visibility into which jobs are profitable</li>
              </ul>
            </div>
            <div className="bg-[#0f3a7d] rounded-2xl p-8 sm:p-10 shadow-sm">
              <div className="inline-flex items-center gap-2 text-[#14b8a6] font-semibold text-sm mb-6 tracking-wide uppercase">
                <span className="w-8 h-[2px] bg-[#14b8a6]"></span> The Prolink Way
              </div>
              <ul className="space-y-5 text-white/90">
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />Everything in one dashboard — CRM, jobs, invoicing</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />New customer leads auto-populate into your pipeline</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />Generate invoices in seconds</li>
                <li className="flex items-start gap-3"><CheckCircle className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />Real-time analytics show your most profitable work</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="bg-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Everything you need to grow</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: 'Job Management', desc: 'Track every job from lead to completion.' },
              { icon: Users, title: 'Customer CRM', desc: 'Manage histories for every client.' },
              { icon: BarChart3, title: 'Invoicing & Payments', desc: 'Fast, professional invoicing.' },
              { icon: TrendingUp, title: 'Lead Pipeline', desc: 'Automatic lead flow from EZLY.' },
              { icon: Settings, title: 'Business Analytics', desc: 'Track profitability and revenue.' },
              { icon: Zap, title: 'Easy Setup', desc: 'Import clients in one click.' },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all">
                <item.icon className="w-8 h-8 text-[#0f3a7d] mb-5" />
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#f8fafc] py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Simple, transparent pricing</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter/Pro/Business logic here */}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0f3a7d] mb-4">Frequently asked questions</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'What is Prolink?', a: 'Prolink is a CRM and workflow management tool built specifically for contractors.' },
              { q: 'How does EZLY fit in?', a: 'EZLY drives high-quality leads directly to your Prolink dashboard automatically.' },
            ].map((item, idx) => (
              <div key={idx} className="p-6 border border-gray-100 rounded-xl">{item.q}</div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-2 sm:grid-cols-5 gap-8">
           <div className="col-span-2">
             <EzlyLogo className="w-32 h-auto mb-4" />
             <p className="text-gray-500 text-sm">CRM and workflow management for modern contractors.</p>
           </div>
           {/* ...rest of footer */ }
        </div>
      </footer>
    </div>
  )
}
