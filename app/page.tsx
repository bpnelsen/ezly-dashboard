'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Menu, X, CheckCircle, Star, Users, Wrench, BarChart3, Zap, Settings, TrendingUp, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import EzlyLogo from '@/components/EzlyLogo'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER - Dark Navy - Contractor Focused */}
      <nav className="sticky top-0 z-50 bg-[#0f3a7d] shadow-lg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 w-40 sm:w-48">
            <EzlyLogo className="w-full h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-between items-center px-8">
            <div className="flex items-center gap-8">
              <a href="#features" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                Features
              </a>
              <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                How It Works
              </a>
              <a href="#pricing" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                Pricing
              </a>
              <a href="#faq" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                FAQ
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-5">
              <Link href="/login" className="text-white font-semibold text-base tracking-wide hover:text-[#14b8a6] transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup/contractor"
                className="px-6 py-2.5 bg-[#14b8a6] text-white rounded-lg font-bold text-base hover:bg-[#0d9e8c] hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0c2e5c] border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              <a href="#features" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                How It Works
              </a>
              <a href="#pricing" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                Pricing
              </a>
              <a href="#faq" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                FAQ
              </a>
              <hr className="my-3 border-white/20" />
              <div className="flex items-center gap-3 px-2">
                <Link href="/login" className="flex-1 px-4 py-3 text-center text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#0f3a7d] transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/signup/contractor"
                  className="flex-1 px-4 py-3 text-center bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9e8c] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - Contractor Focused */}
      <section className="bg-gradient-to-br from-[#0f3a7d] via-[#0f3a7d] to-[#0c2e5c] pt-16 sm:pt-24 pb-20 sm:pb-32 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Zap className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-white/90 text-sm font-medium">Built for Contractors, by Contractors</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Run Your Contractor Business
            <br className="hidden sm:block" />
            <span className="text-[#14b8a6]"> on Autopilot</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 text-center mb-10 max-w-2xl mx-auto">
            CRM, job management, invoicing, and leads — all in one place. Prolink helps you focus on the work, not the paperwork.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link 
              href="/signup/contractor"
              className="px-8 py-4 bg-[#14b8a6] hover:bg-[#0d9e8c] text-white font-bold rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-lg flex items-center gap-2"
            >
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="#how-it-works"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              See How It Works
            </a>
          </div>

          <p className="text-white/60 text-sm">No credit card required • Free 14-day trial</p>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <div className="bg-red-50 rounded-2xl p-8 border border-red-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mb-6">
                <X className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Running a contracting business is chaos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-500 mt-1">✕</span>
                  Juggling multiple apps for CRM, invoicing, and scheduling
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-500 mt-1">✕</span>
                  Lost leads because you couldn't follow up fast enough
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-500 mt-1">✕</span>
                  Invoicing takes hours you could spend on jobs
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <span className="text-red-500 mt-1">✕</span>
                  Customers disappear after the first job
                </li>
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-green-50 rounded-2xl p-8 border border-green-100">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl mb-6">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Prolink brings it all together</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Everything in one dashboard — CRM, jobs, invoicing
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Leads from EZLY auto-populate into your pipeline
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Generate invoices in seconds, not hours
                </li>
                <li className="flex items-start gap-3 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  Built-in follow-ups keep customers coming back
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES - For Contractors */}
      <section id="features" className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Everything you need to grow</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">One platform. Every tool. Built specifically for contractors who want to scale.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                icon: Wrench, 
                title: 'Job Management', 
                desc: 'Track every job from lead to completion. Schedule, assign, and monitor progress in real-time.' 
              },
              { 
                icon: Users, 
                title: 'Customer CRM', 
                desc: 'Never lose a customer again. Built-in follow-ups, notes, and history for every client.' 
              },
              { 
                icon: BarChart3, 
                title: 'Invoicing & Payments', 
                desc: 'Generate professional invoices in seconds. Accept payments online with zero hassle.' 
              },
              { 
                icon: TrendingUp, 
                title: 'Leads from EZLY', 
                desc: 'New customer leads from useezly.com automatically appear in your Prolink dashboard.' 
              },
              { 
                icon: Settings, 
                title: 'Business Analytics', 
                desc: 'See what is working and what is not. Track revenue, jobs, and customer trends.' 
              },
              { 
                icon: Zap, 
                title: 'Easy Setup', 
                desc: 'Get started in minutes, not days. Import your existing customers with one click.' 
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0f3a7d]/10 rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-[#0f3a7d]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - For Contractors */}
      <section id="how-it-works" className="bg-[#0f3a7d] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get started in 3 simple steps</h2>
            <p className="text-white/70 text-lg">It is never been easier to run your business better.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#14b8a6] rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Create your account</h3>
              <p className="text-white/70">Sign up in 30 seconds. No credit card required to start your free trial.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#14b8a6] rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Import your data</h3>
              <p className="text-white/70">Bring your existing customers and jobs. We will help you get set up.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#14b8a6] rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Watch your business grow</h3>
              <p className="text-white/70">Start closing more jobs. Get more leads. Spend less time on paperwork.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600 text-lg">Start free. Scale when you are ready.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Starter</h3>
              <p className="text-gray-600 text-sm mb-4">For solo contractors just starting out.</p>
              <div className="text-4xl font-bold text-[#0f3a7d] mb-6">
                $29<span className="text-lg text-gray-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Up to 25 customers
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Basic invoicing
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Email support
                </li>
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center border-2 border-[#0f3a7d] text-[#0f3a7d] rounded-xl font-semibold hover:bg-[#0f3a7d] hover:text-white transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro - Featured */}
            <div className="bg-[#0f3a7d] rounded-2xl p-6 relative transform scale-105 shadow-xl">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-[#14b8a6] text-white text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Pro</h3>
              <p className="text-white/70 text-sm mb-4">For growing contractors who want more.</p>
              <div className="text-4xl font-bold text-white mb-6">
                $79<span className="text-lg text-white/60 font-normal">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Unlimited customers
                </li>
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Full invoicing + payments
                </li>
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Priority leads from EZLY
                </li>
                <li className="flex items-center gap-2 text-white text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Business analytics
                </li>
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center bg-[#14b8a6] text-white rounded-xl font-semibold hover:bg-[#0d9e8c] transition-colors">
                Get Started
              </Link>
            </div>

            {/* Business */}
            <div className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Business</h3>
              <p className="text-gray-600 text-sm mb-4">For teams with multiple crews.</p>
              <div className="text-4xl font-bold text-[#0f3a7d] mb-6">
                $149<span className="text-lg text-gray-500 font-normal">/mo</span>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Everything in Pro
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Multi-user access
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> API access
                </li>
                <li className="flex items-center gap-2 text-gray-700 text-sm">
                  <CheckCircle className="w-4 h-4 text-[#14b8a6]" /> Dedicated support
                </li>
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center border-2 border-[#0f3a7d] text-[#0f3a7d] rounded-xl font-semibold hover:bg-[#0f3a7d] hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Frequently asked questions</h2>
          </div>
          
          <div className="space-y-6">
            {[
              { q: 'What is Prolink?', a: 'Prolink is a CRM and workflow management tool built specifically for contractors. It helps you manage customers, jobs, invoicing, and leads — all in one place.' },
              { q: 'How does EZLY fit in?', a: 'EZLY is our consumer-facing platform where homeowners find contractors. When a homeowner submits a request through EZLY, the lead automatically appears in your Prolink dashboard — no extra work needed.' },
              { q: 'Can I import my existing customers?', a: 'Yes! Prolink allows you to import your existing customer list via CSV upload. Most contractors are up and running in under 15 minutes.' },
              { q: 'Is there a free trial?', a: 'Absolutely. Start with a 14-day free trial. No credit card required. Cancel anytime.' },
              { q: 'What happens after my trial ends?', a: 'You can choose the plan that fits your needs. Monthly or annual billing available with discounts for annual subscriptions.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-[#0f3a7d] to-[#14b8a6] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to run your business better?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">Join hundreds of contractors who have already made the switch to Prolink.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup/contractor"
              className="px-8 py-4 bg-white text-[#0f3a7d] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg text-lg flex items-center gap-2"
            >
              Start Your Free Trial <ArrowRight className="w-5 h-5" />
            </Link>
            <a 
              href="mailto:ezly.home@gmail.com"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Contractor Focused */}
      <footer className="bg-[#0c2e5c] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 sm:col-span-1">
              <EzlyLogo className="w-40 h-auto mb-4 opacity-90" />
              <p className="text-white/60 text-sm">CRM and workflow for contractors.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#features" className="hover:text-white transition">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition">Pricing</a></li>
                <li><Link href="/signup/contractor" className="hover:text-white transition">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><a href="mailto:ezly.home@gmail.com" className="hover:text-white transition">Contact</a></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
                <li><Link href="/signup/contractor" className="hover:text-white transition">Sign Up</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <p>&copy; 2026 Prolink by EZLY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
