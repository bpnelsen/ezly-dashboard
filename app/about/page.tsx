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
        {/* Hero Section */}
        <div className="relative mb-16 rounded-3xl overflow-hidden shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1581094794329-c8112a966512?w=1600&h=600&fit=crop" 
            alt="Modern home renovation" 
            className="w-full h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent flex flex-col justify-end p-12">
            <h1 className="text-5xl font-bold text-white mb-4">About EZLY</h1>
            <p className="text-xl text-teal-300 font-medium tracking-wide">Building the Future of Home Improvement</p>
          </div>
        </div>
        
        <div className="prose prose-lg prose-navy max-w-none text-gray-700">
          <p className="text-2xl text-gray-800 mb-12 font-medium leading-relaxed italic text-center">
            "EZLY was born from a simple realization: finding, vetting, and managing home projects should feel as seamless as any other modern digital experience."
          </p>

          <h2 className="text-4xl font-bold text-gray-900 mt-16 mb-8 text-center">The Problem with Traditional Platforms</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100 shadow-inner">
               <p className="mb-4 text-lg text-gray-700">For years, homeowners have faced a fragmented and often frustrating process. Traditional systems often act as:</p>
               <ul className="space-y-4 text-gray-600">
                 <li><span className="text-teal-600 font-bold">●</span> The Lead-Gen Black Hole</li>
                 <li><span className="text-teal-600 font-bold">●</span> Opaque Review Systems</li>
                 <li><span className="text-teal-600 font-bold">●</span> Broken Communication Bridges</li>
                 <li><span className="text-teal-600 font-bold">●</span> Unclear Financial Tracking</li>
               </ul>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" 
              alt="Frustrated homeowner" 
              className="rounded-2xl shadow-lg"
            />
          </div>

          <h2 className="text-4xl font-bold text-navy-800 mt-20 mb-10 text-center">The EZLY Advantage</h2>
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
