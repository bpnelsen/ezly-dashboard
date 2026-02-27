'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Users, Mail, MessageSquare, BarChart3, ArrowRight, CheckCircle, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-3xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              EZLY
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 text-gray-300 hover:text-white transition">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-500 hover:to-pink-500 hover:shadow-xl hover:shadow-purple-500/50 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
        <div className="text-center space-y-8 mb-16">
          <div className="inline-block">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-full text-sm font-semibold text-purple-300">
              ✨ The future of contractor management
            </span>
          </div>
          <h1 className="text-7xl sm:text-8xl font-bold leading-tight">
            Scale your
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              contractor network
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Connect with 500+ verified contractors, manage campaigns, and track engagement with enterprise-grade tools built for modern teams.
          </p>
          <div className="flex gap-4 justify-center pt-4 flex-wrap">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50 transition flex items-center gap-2"
            >
              Start Free <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contractor-signup"
              className="px-8 py-4 border border-purple-500/50 rounded-xl font-bold text-lg hover:bg-purple-500/10 hover:border-purple-400 transition"
            >
              I'm a Contractor
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
          {[
            { icon: Users, title: '586+ Contractors', desc: 'Pre-verified & ready to engage', color: 'purple' },
            { icon: Zap, title: 'AI-Powered', desc: 'Smart matching & automation' , color: 'pink'},
            { icon: MessageSquare, title: 'Real-time Chat', desc: 'Direct communication channel', color: 'cyan' },
            { icon: BarChart3, title: 'Analytics', desc: 'Track every interaction', color: 'purple' }
          ].map((feature, i) => {
            const colorClass = {
              purple: 'from-purple-500 to-pink-500',
              pink: 'from-pink-500 to-purple-500',
              cyan: 'from-cyan-500 to-purple-500'
            }[feature.color as keyof typeof colorClass]
            
            return (
              <div key={i} className="p-6 rounded-xl bg-white/5 border border-purple-500/30 hover:border-purple-500/60 hover:bg-white/10 transition group backdrop-blur-sm">
                <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${colorClass} mb-4 group-hover:scale-110 transition`}>
                  <feature.icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-y border-purple-500/20 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Why teams choose EZLY
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              'Save 10+ hours per week on outreach',
              'Track responses in real-time',
              'Build lasting contractor relationships',
              'Automate your entire workflow',
              'Get AI-powered insights',
              'Scale without limits'
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 items-start p-6 rounded-lg bg-white/5 border border-purple-500/20 hover:border-purple-500/40 transition backdrop-blur-sm">
                <CheckCircle size={24} className="text-cyan-400 flex-shrink-0 mt-1" />
                <p className="text-lg text-gray-300">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
        <h2 className="text-5xl font-bold mb-6">Ready to transform your business?</h2>
        <p className="text-xl text-gray-400 mb-8">Join forward-thinking teams already using EZLY.</p>
        <Link 
          href="/signup"
          className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-bold text-lg hover:from-purple-500 hover:to-pink-500 hover:shadow-2xl hover:shadow-purple-500/50 transition"
        >
          Start Your Free Trial
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-purple-500/20 py-8 text-center text-gray-500 relative z-10">
        <p>&copy; 2026 EZLY. Building the future of contractor management.</p>
      </footer>
    </div>
  )
}
