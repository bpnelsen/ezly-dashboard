'use client'

import Link from 'next/link'
import { ArrowLeft, Home, FileText, Zap } from 'lucide-react'

export default function SiteMapPage() {
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
        <h1 className="text-5xl font-bold text-gray-900 mb-8">Site Map</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Home className="text-teal-600" size={24} /> Public Pages
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/" className="hover:text-teal-600">Home</Link></li>
              <li><Link href="/about" className="hover:text-teal-600">About EZLY</Link></li>
              <li><Link href="/blog" className="hover:text-teal-600">Blog</Link></li>
              <li><Link href="/contractors" className="hover:text-teal-600">Find Contractors</Link></li>
              <li><Link href="/login" className="hover:text-teal-600">Sign In</Link></li>
              <li><Link href="/signup" className="hover:text-teal-600">Sign Up</Link></li>
              <li><Link href="/privacy" className="hover:text-teal-600">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-navy-900 mb-6 flex items-center gap-2">
              <Zap className="text-teal-600" size={24} /> Dashboard
            </h2>
            <ul className="space-y-4 text-gray-600">
              <li><Link href="/dashboard" className="hover:text-teal-600">Main Dashboard</Link></li>
              <li><Link href="/dashboard/contractor" className="hover:text-teal-600">Contractor Portal</Link></li>
              <li><Link href="/dashboard/homeowner" className="hover:text-teal-600">Homeowner Portal</Link></li>
              <li><Link href="/dashboard/messages" className="hover:text-teal-600">Messages</Link></li>
              <li><Link href="/dashboard/settings" className="hover:text-teal-600">Settings</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
