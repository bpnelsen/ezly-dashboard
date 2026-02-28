'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MapPin, Clock, DollarSign, User, Calendar, FileText, Star, MessageCircle } from 'lucide-react'

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const [bidAmount, setBidAmount] = useState('')
  const [bidTimeline, setBidTimeline] = useState('')
  const [bidMessage, setBidMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const job = {
    id: params.id,
    title: 'Kitchen Remodel',
    category: 'Kitchen',
    location: 'Salt Lake City, UT',
    budget: '$15,000 - $25,000',
    postedBy: 'John D.',
    postedByRating: 4.8,
    timeline: '1-2 months',
    description: 'I\'m looking to fully renovate my kitchen. This includes new cabinets, countertops, backsplash, new appliances, and flooring. The space is about 200 sq ft. I\'d like to start within the next month and have everything completed within 2 months.',
    details: [
      { label: 'Kitchen Size', value: '200 sq ft' },
      { label: 'Current Condition', value: 'Good structural condition, needs updates' },
      { label: 'Budget Range', value: '$15,000 - $25,000' },
      { label: 'Preferred Start Date', value: 'March 2026' },
      { label: 'Target Completion', value: 'May 2026' }
    ],
    requirements: [
      'Licensed and insured contractor',
      'Experience with full kitchen renovations',
      'References from similar projects',
      'Detailed timeline and breakdown',
      'Warranty on all work'
    ],
    bidsReceived: 5,
    createdAt: '2 days ago',
    status: 'Open'
  }

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit bid logic here
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <Link href="/dashboard/contractor/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Jobs
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{job.title}</h1>
          <p className="text-gray-600 mt-1">{job.location} • Posted {job.createdAt}</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Overview</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{job.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {job.details.map((detail, i) => (
                  <div key={i}>
                    <p className="text-sm text-gray-600 font-medium">{detail.label}</p>
                    <p className="text-gray-900 font-semibold">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Homeowner Requirements</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">✓</span>
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Homeowner */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">About the Homeowner</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User size={32} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900">{job.postedBy}</h3>
                  <div className="flex items-center gap-1 text-sm mt-1">
                    <span className="text-yellow-400">★</span>
                    <span className="font-semibold">{job.postedByRating}</span>
                    <span className="text-gray-600">(12 projects)</span>
                  </div>
                </div>
              </div>
              <button className="mt-4 w-full px-4 py-2 border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <MessageCircle size={18} />
                Message Homeowner
              </button>
            </div>
          </div>

          {/* Sidebar - Bid Form */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Budget Range</p>
                  <p className="text-2xl font-bold text-gray-900">{job.budget}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Timeline</p>
                  <p className="font-semibold text-gray-900">{job.timeline}</p>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-sm text-gray-600 mb-1">Bids Received</p>
                  <p className="font-semibold text-gray-900">{job.bidsReceived}</p>
                </div>
              </div>
            </div>

            {/* Submit Bid Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Submit Your Bid</h3>
              
              {submitted && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-700 font-medium">✓ Bid submitted successfully!</p>
                </div>
              )}

              <form onSubmit={handleSubmitBid} className="space-y-4">
                {/* Bid Amount */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Your Bid Amount *
                  </label>
                  <div className="relative">
                    <DollarSign size={18} className="absolute left-3 top-3.5 text-gray-400" />
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="18500"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Project Timeline *
                  </label>
                  <select
                    value={bidTimeline}
                    onChange={(e) => setBidTimeline(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select timeline</option>
                    <option value="3-4weeks">3-4 weeks</option>
                    <option value="1-2months">1-2 months</option>
                    <option value="2-3months">2-3 months</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                {/* Bid Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Cover Letter (Optional)
                  </label>
                  <textarea
                    value={bidMessage}
                    onChange={(e) => setBidMessage(e.target.value)}
                    placeholder="Tell the homeowner about your experience and why you're a great fit for this project..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Submit Bid
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By submitting, you agree to EZLY's terms
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
