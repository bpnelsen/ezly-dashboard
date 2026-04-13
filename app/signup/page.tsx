'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'
import EzlyLogo from '@/components/EzlyLogo'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#0f3a7d] py-4 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="w-40">
            <EzlyLogo className="w-full h-auto" />
          </Link>
          <Link href="/" className="text-white/80 hover:text-white text-sm font-medium">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Role Selection */}
      <section className="max-w-2xl mx-auto px-6 py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0f3a7d] mb-4 text-center">
          Get Started with Prolink
        </h1>
        <p className="text-xl text-gray-600 text-center mb-12">
          Choose how you want to use Prolink
        </p>

        <div className="grid gap-6">
          {/* Contractor Option */}
          <button
            onClick={() => window.location.href = '/signup/contractor'}
            className="group text-left p-8 rounded-xl border-2 border-gray-200 hover:border-[#14b8a6] hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Contractor</h3>
                <p className="text-gray-600 mb-6">
                  CRM, job management, invoicing — everything you need to run your business.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                    CRM & customer management
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                    Job tracking & scheduling
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#14b8a6]" />
                    Invoicing & payments
                  </li>
                </ul>
              </div>
              <ArrowRight className="w-8 h-8 text-[#14b8a6] group-hover:translate-x-2 transition-transform" />
            </div>
          </button>

          {/* Homeowner Option - Secondary */}
          <button
            onClick={() => window.location.href = '/signup/homeowner'}
            className="group text-left p-8 rounded-xl border-2 border-gray-200 hover:border-[#0f3a7d] hover:shadow-lg transition-all duration-300 bg-white"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">I'm a Homeowner</h3>
                <p className="text-gray-600 mb-6">
                  Find trusted contractors for your home projects.
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0f3a7d]" />
                    Post projects and get bids
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0f3a7d]" />
                    Verified contractors
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#0f3a7d]" />
                    Secure payments
                  </li>
                </ul>
              </div>
              <ArrowRight className="w-8 h-8 text-[#0f3a7d] group-hover:translate-x-2 transition-transform" />
            </div>
          </button>
        </div>

        <p className="text-center text-gray-600 mt-10 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-[#14b8a6] hover:text-[#0d9e8c] font-semibold">
            Sign In
          </Link>
        </p>
      </section>
    </div>
  )
}
