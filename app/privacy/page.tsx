'use client'

import Link from 'next/link'
import { ArrowLeft, Lock, FileText, Eye } from 'lucide-react'

export default function PrivacyPage() {
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
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg prose-navy max-w-none text-gray-700">
          <p className="text-xl mb-8">EZLY is committed to your privacy. Here's how we protect it.</p>
          <div className="grid gap-6">
            <div className="flex gap-4">
              <Lock className="text-teal-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-navy-900">Data Encryption</h3>
                <p>Your sensitive data is encrypted using industry-standard protocols.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Eye className="text-teal-600 mt-1" size={24} />
              <div>
                <h3 className="font-bold text-navy-900">Zero Selling</h3>
                <p>We never sell your contact information to third parties. Your data is used strictly for connecting you with verified professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
