'use client'

import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-navy-600 hover:text-navy-700 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">About EZLY</h1>
        
        <div className="prose prose-lg prose-navy max-w-none text-gray-700">
          <p className="text-xl text-gray-600 mb-8">
            EZLY was born from a simple realization: finding, vetting, and managing home projects should feel as seamless as any other modern digital experience.
          </p>

          <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-6">The Problem with Traditional Platforms</h2>
          <p>
            For years, homeowners have faced a fragmented and often frustrating process when trying to improve their homes. You've likely experienced the common pitfalls of legacy platforms:
          </p>
          <ul className="space-y-4">
            <li><strong>The Lead-Gen Black Hole:</strong> Endless platforms where you're just a "lead" sold to multiple contractors, leading to a barrage of unwanted calls instead of curated, relevant help.</li>
            <li><strong>Lack of Transparency:</strong> Inflated review systems, questionable contractor history, and a lack of real-time project oversight.</li>
            <li><strong>Communication Barriers:</strong> Friction between the homeowner and the contractor, with platforms acting more as a barrier than a bridge.</li>
            <li><strong>Financial Uncertainty:</strong> Ambiguous billing, difficult payment tracking, and no clear way to verify the scope of work before money changes hands.</li>
          </ul>

          <h2 className="text-3xl font-bold text-navy-600 mt-16 mb-8">The EZLY Advantage</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-navy-50 p-6 rounded-xl border border-navy-100">
              <h3 className="font-bold text-navy-900 mb-2">Curated, Not Sold</h3>
              <p className="text-sm">We don't "sell leads." We connect you with a hand-picked, vetted network of pros who are ready to listen to your specific needs.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
              <h3 className="font-bold text-teal-900 mb-2">Transparency First</h3>
              <p className="text-sm">From licensing verification to detailed, line-item bidding, we bring clarity where there used to be guesswork.</p>
            </div>
            <div className="bg-navy-50 p-6 rounded-xl border border-navy-100">
              <h3 className="font-bold text-navy-900 mb-2">Integrated Workflow</h3>
              <p className="text-sm">Our platform isn't just a list—it's a tool. Manage messaging, track contracts, and settle payments securely in one place.</p>
            </div>
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100">
              <h3 className="font-bold text-teal-900 mb-2">True Vetting</h3>
              <p className="text-sm">We handle the background research, license verification, and insurance confirmation so you only focus on the best professionals.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mt-16 mb-6">Our Mission</h2>
          <p>
            At EZLY, our goal is to empower homeowners and contractors to build better together. By reducing the noise and friction inherent in older systems, we foster direct, professional relationships built on transparency and trust.
          </p>
          <p className="mt-6 font-bold text-gray-900 italic">
            Your home is your biggest investment. Use EZLY to treat it that way.
          </p>
        </div>

        <div className="mt-16 text-center">
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 bg-navy-600 text-white rounded-full font-bold hover:bg-navy-700 transition shadow-lg"
          >
            Get Started with EZLY
          </Link>
        </div>
      </div>
    </div>
  )
}
