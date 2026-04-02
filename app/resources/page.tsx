'use client'

import Link from 'next/link'
import { ArrowLeft, BookOpen, ShieldCheck, Zap } from 'lucide-react'

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-navy-600 hover:text-navy-700 font-medium">
            <ArrowLeft size={18} className="mr-2" /> Back to Home
          </Link>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Contractor Resources</h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 bg-navy-50 rounded-2xl border border-navy-100">
            <BookOpen className="text-navy-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Business Growth</h3>
            <p className="text-gray-600">Scale your operations with EZLY's suite of management tools.</p>
          </div>
          <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100">
            <ShieldCheck className="text-teal-600 mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Compliance & Safety</h3>
            <p className="text-gray-600">Stay ahead of local codes and insurance requirements.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
