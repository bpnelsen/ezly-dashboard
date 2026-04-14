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
      <Navigation transparent />

      {/* HERO - Enterprise Clean */}
      <section className="bg-gradient-to-br from-[#0f3a7d] via-[#0f3a7d] to-[#0c2e5c] pt-32 sm:pt-40 pb-24 sm:pb-36 relative overflow-hidden">
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
            {/* Problem */}
            <div className="bg-white rounded-2xl p-8 sm:p-10 border border-gray-200 shadow-sm">
              <div className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm mb-6 tracking-wide uppercase">
                <span className="w-8 h-[2px] bg-red-500"></span> The Problem
              </div>
              <ul className="space-y-5">
                {[
                  'Juggling multiple apps for CRM, invoicing, and scheduling',
                  'Lost leads because you could not follow up fast enough',
                  'Invoicing takes hours you could spend on jobs',
                  'No visibility into which jobs are profitable',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <span className="text-red-400 font-bold mt-0.5">✕</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Solution */}
            <div className="bg-[#0f3a7d] rounded-2xl p-8 sm:p-10 shadow-sm">
              <div className="inline-flex items-center gap-2 text-[#14b8a6] font-semibold text-sm mb-6 tracking-wide uppercase">
                <span className="w-8 h-[2px] bg-[#14b8a6]"></span> The Prolink Way
              </div>
              <ul className="space-y-5">
                {[
                  'Everything in one dashboard — CRM, jobs, invoicing',
                  'Leads auto-populate into your pipeline instantly',
                  'Generate invoices in seconds, not hours',
                  'Real-time analytics show your most profitable work',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-white/90">
                    <CheckCircle className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
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
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">One platform. Every tool. Built specifically for contractors who want to scale.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Wrench, title: 'Job Management', desc: 'Track every job from lead to completion. Schedule, assign, and monitor progress in real-time.' },
              { icon: Users, title: 'Customer CRM', desc: 'Never lose a customer again. Built-in follow-ups, notes, and history for every client.' },
              { icon: BarChart3, title: 'Invoicing & Payments', desc: 'Generate professional invoices in seconds. Accept payments online with zero hassle.' },
              { icon: TrendingUp, title: 'Lead Pipeline', desc: 'New customer leads flow into your dashboard automatically. Never miss an opportunity.' },
              { icon: Settings, title: 'Business Analytics', desc: 'See what is working and what is not. Track revenue, jobs, and customer trends.' },
              { icon: Zap, title: 'Easy Setup', desc: 'Get started in minutes, not days. Import your existing customers with one click.' },
            ].map((item, idx) => (
              <div key={idx} className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#14b8a6]/30 hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-[#0f3a7d]/5 group-hover:bg-[#14b8a6]/10 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <item.icon className="w-6 h-6 text-[#0f3a7d] group-hover:text-[#14b8a6] transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-[#f8fafc] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Get started in 3 simple steps</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden sm:block absolute top-8 left-1/6 right-1/6 h-[2px] bg-gray-200"></div>
            {[
              { step: '1', title: 'Create your account', desc: 'Sign up in 30 seconds. No credit card required to start your free trial.' },
              { step: '2', title: 'Import your data', desc: 'Bring your existing customers and jobs. We will help you get set up.' },
              { step: '3', title: 'Watch your business grow', desc: 'Start closing more jobs. Get more leads. Spend less time on paperwork.' },
            ].map((item, idx) => (
              <div key={idx} className="text-center relative">
                <div className="w-16 h-16 bg-[#0f3a7d] rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 relative z-10 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Testimonials</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">What contractors are saying</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: 'Mike R.', role: 'General Contractor', text: 'Prolink cut my admin time in half. I used to spend Sunday nights doing invoices — now it takes 10 minutes.' },
              { name: 'Sarah K.', role: 'Plumbing Company Owner', text: 'The lead pipeline is a game changer. Customers come in, I follow up same day, and close more jobs than ever.' },
              { name: 'David L.', role: 'Roofing Contractor', text: 'Finally, one tool that does everything. No more juggling QuickBooks, spreadsheets, and sticky notes.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">&ldquo;{item.text}&rdquo;</p>
                <div>
                  <div className="font-bold text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="bg-[#f8fafc] py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-600 text-lg">Start free. Scale when you are ready.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Starter */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Starter</h3>
              <p className="text-gray-500 text-sm mb-6">For solo contractors just starting out.</p>
              <div className="text-4xl font-bold text-[#0f3a7d] mb-1">
                $29<span className="text-base text-gray-400 font-normal">/mo</span>
              </div>
              <p className="text-xs text-gray-400 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-8">
                {['Up to 25 customers', 'Basic invoicing', 'Email support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#14b8a6] flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center border-2 border-[#0f3a7d] text-[#0f3a7d] rounded-xl font-semibold hover:bg-[#0f3a7d] hover:text-white transition-colors">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#0f3a7d] rounded-2xl p-8 relative shadow-xl ring-2 ring-[#14b8a6]/30">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#14b8a6] text-white text-xs font-bold px-4 py-1 rounded-full tracking-wide">
                MOST POPULAR
              </div>
              <h3 className="text-lg font-bold text-white mb-1">Pro</h3>
              <p className="text-white/60 text-sm mb-6">For growing contractors who want more.</p>
              <div className="text-4xl font-bold text-white mb-1">
                $49<span className="text-base text-white/40 font-normal">/mo</span>
              </div>
              <p className="text-xs text-white/40 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-8">
                {['Unlimited customers', 'Full invoicing + payments', 'Job management + scheduling', 'Business analytics'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-white text-sm">
                    <CheckCircle className="w-4 h-4 text-[#14b8a6] flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center bg-[#14b8a6] text-white rounded-xl font-semibold hover:bg-[#0d9e8c] transition-colors">
                Get Started
              </Link>
            </div>

            {/* Business */}
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-1">Business</h3>
              <p className="text-gray-500 text-sm mb-6">For teams with multiple crews.</p>
              <div className="text-4xl font-bold text-[#0f3a7d] mb-1">
                $149<span className="text-base text-gray-400 font-normal">/mo</span>
              </div>
              <p className="text-xs text-gray-400 mb-8">Billed monthly</p>
              <ul className="space-y-3 mb-8">
                {['Everything in Pro', 'Multi-user access', 'API access', 'Dedicated support'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-700 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#14b8a6] flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link href="/signup/contractor" className="block w-full py-3 text-center border-2 border-[#0f3a7d] text-[#0f3a7d] rounded-xl font-semibold hover:bg-[#0f3a7d] hover:text-white transition-colors">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-[#0f3a7d] mb-3" />
              <div className="font-bold text-gray-900 mb-1">Bank-Level Security</div>
              <p className="text-gray-500 text-sm">256-bit SSL encryption on all data</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="w-8 h-8 text-[#0f3a7d] mb-3" />
              <div className="font-bold text-gray-900 mb-1">99.9% Uptime</div>
              <p className="text-gray-500 text-sm">Your business never stops, neither do we</p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-8 h-8 text-[#0f3a7d] mb-3" />
              <div className="font-bold text-gray-900 mb-1">24/7 Support</div>
              <p className="text-gray-500 text-sm">Real humans, real help, real fast</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-[#f8fafc] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Frequently asked questions</h2>
          </div>

          <div className="space-y-3">
            {[
              { q: 'What is Prolink?', a: 'Prolink is a CRM and workflow management tool built specifically for contractors. It helps you manage customers, jobs, invoicing, and leads — all in one place.' },
              { q: 'How does EZLY fit in?', a: 'EZLY is our consumer-facing platform where homeowners find contractors. When a homeowner submits a request through EZLY, the lead automatically appears in your Prolink dashboard — no extra work needed.' },
              { q: 'Can I import my existing customers?', a: 'Yes! Prolink allows you to import your existing customer list via CSV upload. Most contractors are up and running in under 15 minutes.' },
              { q: 'Is there a free trial?', a: 'Absolutely. Start with a 14-day free trial. No credit card required. Cancel anytime.' },
              { q: 'What happens after my trial ends?', a: 'You can choose the plan that fits your needs. Monthly or annual billing available with discounts for annual subscriptions.' },
              { q: 'Is my data secure?', a: 'Yes. We use bank-level 256-bit SSL encryption, daily backups, and SOC-2 compliant hosting to keep your data safe.' },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900">{item.q}</h3>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0 ml-4 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </div>
                {openFaq === idx && (
                  <p className="text-gray-600 text-sm mt-3 leading-relaxed">{item.a}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-[#0f3a7d] py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#14b8a6]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">Ready to run your business better?</h2>
          <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of contractors who have already made the switch to Prolink.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/signup/contractor"
              className="px-8 py-4 bg-[#14b8a6] text-white font-bold rounded-xl hover:bg-[#0d9e8c] transition-all shadow-lg hover:shadow-2xl text-lg flex items-center gap-2 group"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="mailto:ezly.home@gmail.com"
              className="px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              Talk to Sales
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER - Clean White Professional */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Main Footer */}
          <div className="py-16 grid grid-cols-2 sm:grid-cols-5 gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <EzlyLogo className="w-32 h-auto mb-4" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mb-6">
                CRM and workflow management built for modern contractors.
              </p>
              <a
                href="mailto:ezly.home@gmail.com"
                className="text-[#14b8a6] text-sm font-semibold hover:text-[#0d9e8c] transition"
              >
                ezly.home@gmail.com
              </a>
            </div>

            {/* Product */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm mb-4">Product</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="text-gray-500 hover:text-[#0f3a7d] transition">Features</a></li>
                <li><a href="#pricing" className="text-gray-500 hover:text-[#0f3a7d] transition">Pricing</a></li>
                <li><a href="#how-it-works" className="text-gray-500 hover:text-[#0f3a7d] transition">How It Works</a></li>
                <li><a href="#faq" className="text-gray-500 hover:text-[#0f3a7d] transition">FAQ</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/about" className="text-gray-500 hover:text-[#0f3a7d] transition">About</Link></li>
                <li><Link href="/privacy" className="text-gray-500 hover:text-[#0f3a7d] transition">Privacy Policy</Link></li>
                <li><Link href="/resources" className="text-gray-500 hover:text-[#0f3a7d] transition">Resources</Link></li>
                <li><a href="mailto:ezly.home@gmail.com" className="text-gray-500 hover:text-[#0f3a7d] transition">Contact</a></li>
              </ul>
            </div>

            {/* Account */}
            <div>
              <h4 className="text-gray-900 font-semibold text-sm mb-4">Account</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="/login" className="text-gray-500 hover:text-[#0f3a7d] transition">Sign In</Link></li>
                <li><Link href="/signup/contractor" className="text-gray-500 hover:text-[#0f3a7d] transition">Sign Up</Link></li>
                <li><Link href="/dashboard" className="text-gray-500 hover:text-[#0f3a7d] transition">Dashboard</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-100 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">&copy; 2026 Prolink by EZLY. All rights reserved.</p>
            <div className="flex items-center gap-6 text-gray-400 text-sm">
              <Link href="/privacy" className="hover:text-gray-600 transition">Privacy</Link>
              <Link href="/about" className="hover:text-gray-600 transition">About</Link>
              <a href="mailto:ezly.home@gmail.com" className="hover:text-gray-600 transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
