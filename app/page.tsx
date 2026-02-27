'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ArrowRight, CheckCircle, Users, Zap, BarChart3, MessageCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-xl bg-white/80">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">EZLY</div>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium transition">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition shadow-sm hover:shadow-md"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <div className="space-y-6 mb-12">
          <div className="inline-block px-4 py-2 bg-blue-100/60 text-blue-700 rounded-full text-sm font-semibold border border-blue-200/50">
            ✨ The modern way to manage contractors
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 leading-tight">
            Connect. Engage.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-600">
              Scale Faster.
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Manage 500+ verified contractors, run smart campaigns, and track engagement—all in one beautiful platform built for modern teams.
          </p>

          <div className="flex gap-4 justify-center pt-6">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start for Free <ArrowRight size={20} />
            </Link>
            <Link 
              href="/contractor-signup"
              className="px-8 py-4 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition"
            >
              I'm a Contractor
            </Link>
          </div>
        </div>

        {/* Mock Dashboard Preview */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
          <div className="relative bg-white rounded-2xl border border-gray-200/50 p-1 shadow-2xl">
            <div className="bg-gradient-to-b from-gray-50 to-white rounded-xl p-8 space-y-4">
              <div className="flex gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gradient-to-br from-blue-100/50 to-cyan-100/50 rounded-lg p-4 h-24"></div>
                ))}
              </div>
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-12 bg-gray-100 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Everything you need to succeed</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: 'Verified Contractors',
              description: 'Access 500+ pre-screened contractors ready to engage'
            },
            {
              icon: Zap,
              title: 'Smart Campaigns',
              description: 'Launch and track campaigns with AI-powered insights'
            },
            {
              icon: BarChart3,
              title: 'Real Analytics',
              description: 'Monitor engagement, responses, and ROI in real-time'
            },
            {
              icon: MessageCircle,
              title: 'Direct Messaging',
              description: 'Communicate with contractors instantly and effectively'
            },
            {
              icon: CheckCircle,
              title: 'Easy Onboarding',
              description: 'Get started in minutes with our intuitive interface'
            },
            {
              icon: BarChart3,
              title: 'Enterprise Grade',
              description: 'Security, reliability, and support you can trust'
            }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/50 hover:to-cyan-50/50 transition">
              <div className="inline-block p-3 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition mb-4">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gradient-to-r from-blue-50 to-cyan-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">Why teams choose EZLY</h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            {[
              'Save 10+ hours per week on contractor management',
              'Track every interaction and measure ROI',
              'Build lasting business relationships',
              'Automate repetitive outreach tasks',
              'Access real-time analytics and insights',
              'Scale without limits or complications'
            ].map((benefit, i) => (
              <div key={i} className="flex gap-4 items-start">
                <CheckCircle className="text-green-600 flex-shrink-0 mt-1" size={24} />
                <p className="text-lg text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to transform your contractor network?</h2>
        <p className="text-xl text-gray-600 mb-8">Join forward-thinking teams using EZLY to scale faster.</p>
        <Link 
          href="/signup"
          className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg"
        >
          Start Your Free Trial Today
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 text-center text-gray-600">
        <p>&copy; 2026 EZLY. Building the future of contractor management.</p>
      </footer>
    </div>
  )
}
