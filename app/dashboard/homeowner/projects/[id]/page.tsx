'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, X, MessageCircle, Download, MapPin, Calendar, DollarSign, Star, AlertCircle } from 'lucide-react'

interface Bid {
  id: string
  contractorId: string
  contractorName: string
  contractorRating: number
  contractorReviews: number
  amount: number
  timeline: string
  description: string
  timeline_start: string
  timeline_end: string
  license: string
  insured: boolean
  experience: number
  status: 'pending' | 'accepted' | 'rejected'
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [selectedBid, setSelectedBid] = useState<string | null>(null)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [projectStatus, setProjectStatus] = useState<'open' | 'in-progress' | 'completed'>('open')

  // Mock project data
  const project = {
    id: params.id,
    title: 'Kitchen Remodel with Island',
    category: 'Kitchen Remodel',
    description: 'Looking to remodel my kitchen with a new island. Needs new cabinets, countertops, tile backsplash, and updated appliances. Kitchen is approximately 250 sq ft.',
    location: 'Denver, CO',
    budgetMin: 8000,
    budgetMax: 15000,
    timeline: '4-6 weeks',
    photos: ['photo1.jpg', 'photo2.jpg'],
    createdAt: '2026-03-01',
    status: 'open'
  }

  // Mock bids
  const bids: Bid[] = [
    {
      id: '1',
      contractorId: 'c1',
      contractorName: 'Elite Kitchen Renovations',
      contractorRating: 4.8,
      contractorReviews: 34,
      amount: 12500,
      timeline: '5 weeks',
      description: 'Complete kitchen remodel including island installation, new cabinetry, granite countertops, and tile backsplash.',
      timeline_start: '2026-03-10',
      timeline_end: '2026-04-14',
      license: 'CCB #12345',
      insured: true,
      experience: 12,
      status: 'pending'
    },
    {
      id: '2',
      contractorId: 'c2',
      contractorName: 'Modern Home Solutions',
      contractorRating: 4.6,
      contractorReviews: 28,
      amount: 10800,
      timeline: '6 weeks',
      description: 'Professional kitchen renovation with high-quality finishes. We handle all permits and inspections.',
      timeline_start: '2026-03-15',
      timeline_end: '2026-04-26',
      license: 'CCB #67890',
      insured: true,
      experience: 8,
      status: 'pending'
    },
    {
      id: '3',
      contractorId: 'c3',
      contractorName: 'Budget Kitchen Works',
      contractorRating: 4.2,
      contractorReviews: 15,
      amount: 9200,
      timeline: '6 weeks',
      description: 'Quality kitchen remodel at competitive price. Using quality materials and experienced team.',
      timeline_start: '2026-03-20',
      timeline_end: '2026-05-01',
      license: 'CCB #11111',
      insured: true,
      experience: 5,
      status: 'pending'
    },
    {
      id: '4',
      contractorId: 'c4',
      contractorName: 'Premium Kitchen Design',
      contractorRating: 4.9,
      contractorReviews: 52,
      amount: 14800,
      timeline: '4 weeks',
      description: 'Premium kitchen remodel with custom design. Top-quality materials and craftsmanship.',
      timeline_start: '2026-03-08',
      timeline_end: '2026-04-05',
      license: 'CCB #99999',
      insured: true,
      experience: 18,
      status: 'pending'
    }
  ]

  const handleAcceptBid = (bidId: string) => {
    const bid = bids.find(b => b.id === bidId)
    if (bid) {
      alert(`Project accepted with ${bid.contractorName} for $${bid.amount.toLocaleString()}!`)
      setProjectStatus('in-progress')
      setShowAcceptModal(false)
    }
  }

  const pendingBids = bids.filter(b => b.status === 'pending')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/dashboard/homeowner/projects" className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600 mt-1">{project.category} • {project.location}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Project Details */}
          <div className="lg:col-span-2">
            {/* Project Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Project Details</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 font-medium">DESCRIPTION</p>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b border-gray-200">
                  <div>
                    <p className="text-xs text-gray-600 font-medium">BUDGET</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${project.budgetMin.toLocaleString()}-${project.budgetMax.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">TIMELINE</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">{project.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">STATUS</p>
                    <p className="text-lg font-bold text-navy-600 mt-1">Open for Bids</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 font-medium">POSTED</p>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bids Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Bids Received ({pendingBids.length})
              </h2>

              <div className="space-y-4">
                {bids.map(bid => (
                  <div
                    key={bid.id}
                    onClick={() => setSelectedBid(selectedBid === bid.id ? null : bid.id)}
                    className={`border rounded-lg p-4 cursor-pointer transition ${
                      selectedBid === bid.id
                        ? 'border-navy-500 bg-navy-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {/* Bid Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{bid.contractorName}</h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                            <span>{bid.contractorRating} ({bid.contractorReviews} reviews)</span>
                          </div>
                          <span>•</span>
                          <span>{bid.experience} years experience</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          ${bid.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">{bid.timeline}</p>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {selectedBid === bid.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                        {/* Description */}
                        <div>
                          <p className="text-sm text-gray-600 font-medium mb-1">PROPOSAL</p>
                          <p className="text-gray-700">{bid.description}</p>
                        </div>

                        {/* Timeline */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600 font-medium">START DATE</p>
                            <p className="text-gray-900 font-semibold mt-1">
                              {new Date(bid.timeline_start).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 font-medium">COMPLETION DATE</p>
                            <p className="text-gray-900 font-semibold mt-1">
                              {new Date(bid.timeline_end).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {/* License & Insurance */}
                        <div className="grid grid-cols-2 gap-4 py-4 bg-gray-50 rounded-lg px-3">
                          <div>
                            <p className="text-sm text-gray-600 font-medium">LICENSE</p>
                            <p className="text-gray-900 font-semibold mt-1">{bid.license}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Check size={20} className="text-green-600" />
                            <div>
                              <p className="text-sm text-gray-600 font-medium">INSURED</p>
                              <p className="text-gray-900 font-semibold">Yes</p>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <button
                            onClick={() => setShowAcceptModal(true)}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2"
                          >
                            <Check size={18} />
                            Accept Bid
                          </button>
                          <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                            <MessageCircle size={18} />
                            Message
                          </button>
                          <button className="px-4 py-2 border border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition">
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Quick Stats */}
          <div>
            {/* Bid Comparison */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Bid Summary</h3>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600 font-medium">LOWEST BID</p>
                  <p className="text-lg font-bold text-green-600">
                    ${Math.min(...bids.map(b => b.amount)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">HIGHEST BID</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${Math.max(...bids.map(b => b.amount)).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">AVERAGE BID</p>
                  <p className="text-lg font-bold text-gray-900">
                    ${Math.round(bids.reduce((sum, b) => sum + b.amount, 0) / bids.length).toLocaleString()}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-600 font-medium">YOUR BUDGET</p>
                  <p className="text-sm text-gray-900 mt-1">
                    ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-navy-50 rounded-lg border border-navy-200">
                <div className="flex gap-3">
                  <AlertCircle size={18} className="text-navy-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-navy-700">
                    <p className="font-semibold mb-1">Tip: Compare carefully</p>
                    <p className="text-xs">Look beyond price - consider experience, timeline, and reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accept Bid Modal */}
      {showAcceptModal && selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Accept This Bid?</h3>

            {(() => {
              const bid = bids.find(b => b.id === selectedBid)
              return bid ? (
                <div className="space-y-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Contractor</p>
                    <p className="font-bold text-gray-900">{bid.contractorName}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Amount</p>
                    <p className="text-2xl font-bold text-gray-900">${bid.amount.toLocaleString()}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Timeline</p>
                    <p className="font-bold text-gray-900">
                      {new Date(bid.timeline_start).toLocaleDateString()} - {new Date(bid.timeline_end).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="p-4 bg-navy-50 rounded-lg border border-navy-200">
                    <p className="text-sm text-navy-700">
                      ✅ Once accepted, the contractor will be notified and you'll both be able to communicate about next steps.
                    </p>
                  </div>
                </div>
              ) : null
            })()}

            <div className="flex gap-3">
              <button
                onClick={() => {
                  if (selectedBid) handleAcceptBid(selectedBid)
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Yes, Accept
              </button>
              <button
                onClick={() => setShowAcceptModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
