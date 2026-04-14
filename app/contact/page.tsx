'use client'

import Link from 'next/link'
import { Mail, MessageSquare, Clock, ArrowRight } from 'lucide-react'
import Navigation from '@/components/Navigation'
import { useState } from 'react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Contact</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0f3a7d] mb-4 tracking-tight">
          Get in Touch
        </h1>
        <p className="text-xl text-gray-600 max-w-xl">
          Have a question about Prolink? Want to see a demo? We&apos;re here to help.
        </p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0f3a7d]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-[#0f3a7d]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Email Us</h3>
                <a href="mailto:ezly.home@gmail.com" className="text-[#14b8a6] hover:text-[#0d9e8c] transition font-medium">
                  ezly.home@gmail.com
                </a>
                <p className="text-gray-500 text-sm mt-1">We reply within 24 hours.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0f3a7d]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-5 h-5 text-[#0f3a7d]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                <p className="text-gray-600 text-sm">Monday – Friday</p>
                <p className="text-gray-600 text-sm">8:00 AM – 6:00 PM MST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#0f3a7d]/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5 text-[#0f3a7d]" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Ready to Get Started?</h3>
                <p className="text-gray-500 text-sm mb-3">Try Prolink free for 14 days.</p>
                <Link
                  href="/signup/contractor"
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-[#14b8a6] px-4 py-2 rounded-lg hover:bg-[#0d9e8c] transition"
                >
                  Start Free Trial <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#f8fafc] rounded-2xl p-8 border border-gray-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-[#14b8a6]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-[#14b8a6]" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-600">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us how we can help..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition bg-white resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#14b8a6] text-white rounded-lg font-bold hover:bg-[#0d9e8c] transition flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
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
