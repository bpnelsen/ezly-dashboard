'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Users, Mail, MessageSquare, BarChart3, ArrowRight, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            EZLY
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-slate-300 hover:text-white transition">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center space-y-8 mb-16">
          <h1 className="text-6xl sm:text-7xl font-bold leading-tight">
            Manage Contractors.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Scale Faster.
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Connect with 500+ verified contractors, manage campaigns, and track engagement all in one platform.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition flex items-center gap-2"
            >
              Start Free <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contractor-signup"
              className="px-8 py-4 border border-slate-600 rounded-lg font-bold text-lg hover:border-slate-400 transition"
            >
              I'm a Contractor
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {[
            { icon: Users, title: '586+ Contractors', desc: 'Pre-verified & ready' },
            { icon: Mail, title: 'Smart Campaigns', desc: 'Email tracking & analytics' },
            { icon: MessageSquare, title: 'Real-time Chat', desc: 'Direct communication' },
            { icon: BarChart3, title: 'Analytics', desc: 'Track every interaction' }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/50 transition group">
              <feature.icon size={32} className="text-blue-400 mb-4 group-hover:scale-110 transition" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-slate-800/30 border-y border-slate-700/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">Why EZLY?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Save 10+ hours per week on outreach',
              'Track responses and engagement in real-time',
              'Build relationships with quality contractors',
              'Automate your campaign workflow',
              'Get detailed performance analytics',
              'Scale your contractor network'
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle size={24} className="text-green-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-slate-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to scale your network?</h2>
        <p className="text-xl text-slate-300 mb-8">Join hundreds of businesses connecting with contractors.</p>
        <Link 
          href="/signup"
          className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg font-bold text-lg hover:shadow-2xl hover:shadow-blue-500/50 transition"
        >
          Start Your Free Trial
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-8 text-center text-slate-400">
        <p>&copy; 2026 EZLY. All rights reserved.</p>
      </footer>
    </div>
  )
}
