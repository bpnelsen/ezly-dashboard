'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { DollarSign, Clock, CheckCircle, XCircle, MessageCircle, User, Star, Calendar } from 'lucide-react'

interface Bid {
  id: string
  projectId: string
  projectTitle: string
  contractor: {
    id: string
    name: string
    company: string
    rating: number
    completedProjects: number
    avatar?: string
  }
  amount: number
  timeline: string
  submittedDate: string
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn'
  message: string
  details: {
    startDate: string
    completionDate: string
    laborCost: number
    materialsCost: number
    warranty: string
  }
}

export default function HomeownerBidsPage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null)

  // Sample bid data - Replace with real data from Supabase
  const bids: Bid[] = [
    {
      id: '1',
      projectId: 'proj-1',
      projectTitle: 'Kitchen Remodel - Complete Renovation',
      contractor: {
        id: 'c1',
        name: 'John Martinez',
        company: 'Martinez Kitchen & Bath',
        rating: 4.9,
        completedProjects: 87
      },
      amount: 28500,
      timeline: '6-8 weeks',
      submittedDate: '2026-02-25',
      status: 'pending',
      message: 'I have over 15 years of experience with kitchen renovations. I can start within 2 weeks and guarantee quality work with a 2-year warranty.',
      details: {
        startDate: '2026-03-15',
        completionDate: '2026-05-01',
        laborCost: 18500,
        materialsCost: 10000,
        warranty: '2 years on labor, manufacturer warranty on materials'
      }
    },
    {
      id: '2',
      projectId: 'proj-1',
      projectTitle: 'Kitchen Remodel - Complete Renovation',
      contractor: {
        id: 'c2',
        name: 'Sarah Chen',
        company: 'Premium Home Renovations',
        rating: 4.8,
        completedProjects: 124
      },
      amount: 32000,
      timeline: '8-10 weeks',
      submittedDate: '2026-02-26',
      status: 'pending',
      message: 'We specialize in high-end kitchen renovations with custom cabinetry. Our team includes licensed electricians and plumbers.',
      details: {
        startDate: '2026-03-20',
        completionDate: '2026-05-15',
        laborCost: 22000,
        materialsCost: 10000,
        warranty: '5 years comprehensive warranty'
      }
    },
    {
      id: '3',
      projectId: 'proj-2',
      projectTitle: 'Bathroom Renovation - Master Bath',
      contractor: {
        id: 'c3',
        name: 'Mike Johnson',
        company: 'Johnson Plumbing & Remodel',
        rating: 4.7,
        completedProjects: 63
      },
      amount: 15750,
      timeline: '4-5 weeks',
      submittedDate: '2026-02-24',
      status: 'accepted',
      message: 'Licensed and insured with 20+ years experience. I can provide references from similar bathroom projects in your area.',
      details: {
        startDate: '2026-03-10',
        completionDate: '2026-04-15',
        laborCost: 9750,
        materialsCost: 6000,
        warranty: '3 years on labor'
      }
    },
    {
      id: '4',
      projectId: 'proj-1',
      projectTitle: 'Kitchen Remodel - Complete Renovation',
      contractor: {
        id: 'c4',
        name: 'David Lopez',
        company: 'Budget Kitchen Pros',
        rating: 4.3,
        completedProjects: 42
      },
      amount: 22500,
      timeline: '6-7 weeks',
      submittedDate: '2026-02-23',
      status: 'rejected',
      message: 'Affordable quality work. Can work with your budget and timeline.',
      details: {
        startDate: '2026-03-12',
        completionDate: '2026-04-30',
        laborCost: 14500,
        materialsCost: 8000,
        warranty: '1 year warranty'
      }
    }
  ]

  const filteredBids = selectedTab === 'all' 
    ? bids 
    : bids.filter(bid => bid.status === selectedTab)

  const stats = {
    total: bids.length,
    pending: bids.filter(b => b.status === 'pending').length,
    accepted: bids.filter(b => b.status === 'accepted').length,
    rejected: bids.filter(b => b.status === 'rejected').length
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      case 'withdrawn': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const handleAcceptBid = (bid: Bid) => {
    alert(`Accepting bid from ${bid.contractor.company} for $${bid.amount.toLocaleString()}`)
    // TODO: Update bid status in database
  }

  const handleRejectBid = (bid: Bid) => {
    alert(`Rejecting bid from ${bid.contractor.company}`)
    // TODO: Update bid status in database
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bids & Proposals</h1>
        <p className="text-gray-600">Review and manage contractor bids for your projects</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Bids</span>
            <DollarSign size={20} className="text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Pending</span>
            <Clock size={20} className="text-amber-500" />
          </div>
          <div className="text-3xl font-bold text-amber-600">{stats.pending}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Accepted</span>
            <CheckCircle size={20} className="text-green-500" />
          </div>
          <div className="text-3xl font-bold text-green-600">{stats.accepted}</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Rejected</span>
            <XCircle size={20} className="text-red-500" />
          </div>
          <div className="text-3xl font-bold text-red-600">{stats.rejected}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200 mb-6">
        <div className="flex border-b border-gray-200">
          {['all', 'pending', 'accepted', 'rejected'].map(tab => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab as any)}
              className={`flex-1 px-6 py-4 text-sm font-medium transition ${
                selectedTab === tab
                  ? 'text-navy-600 border-b-2 border-navy-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              <span className="ml-2 text-xs text-gray-500">
                ({tab === 'all' ? stats.total : stats[tab as keyof typeof stats]})
              </span>
            </button>
          ))}
        </div>

        {/* Bids List */}
        <div className="divide-y divide-gray-200">
          {filteredBids.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              <DollarSign size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium text-gray-900 mb-2">No {selectedTab} bids</p>
              <p>When contractors submit bids, they'll appear here.</p>
            </div>
          ) : (
            filteredBids.map(bid => (
              <div key={bid.id} className="p-6 hover:bg-gray-50 transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{bid.contractor.company}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bid.status)}`}>
                        {bid.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">For: {bid.projectTitle}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {bid.contractor.name}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={14} className="text-amber-500" />
                        {bid.contractor.rating} ({bid.contractor.completedProjects} projects)
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        Submitted {new Date(bid.submittedDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">${bid.amount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock size={14} />
                      {bid.timeline}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-700">{bid.message}</p>
                </div>

                <div className="flex items-center gap-3">
                  {bid.status === 'pending' && (
                    <>
                      <button
                        onClick={() => handleAcceptBid(bid)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center gap-2"
                      >
                        <CheckCircle size={18} />
                        Accept Bid
                      </button>
                      <button
                        onClick={() => handleRejectBid(bid)}
                        className="px-4 py-2 border border-red-600 text-red-600 rounded-lg font-medium hover:bg-red-50 transition flex items-center gap-2"
                      >
                        <XCircle size={18} />
                        Reject
                      </button>
                    </>
                  )}
                  
                  <button
                    onClick={() => setSelectedBid(bid)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
                  >
                    View Details
                  </button>

                  <Link
                    href="/dashboard/messages"
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition flex items-center gap-2"
                  >
                    <MessageCircle size={18} />
                    Message
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bid Detail Modal */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{selectedBid.contractor.company}</h2>
                  <p className="text-gray-600">{selectedBid.projectTitle}</p>
                </div>
                <button
                  onClick={() => setSelectedBid(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Contractor Info */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Contractor Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Contact</span>
                    <p className="font-medium">{selectedBid.contractor.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Rating</span>
                    <p className="font-medium flex items-center gap-1">
                      <Star size={16} className="text-amber-500" />
                      {selectedBid.contractor.rating} ({selectedBid.contractor.completedProjects} projects)
                    </p>
                  </div>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Pricing Breakdown</h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Labor Cost</span>
                    <span className="font-medium">${selectedBid.details.laborCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Materials Cost</span>
                    <span className="font-medium">${selectedBid.details.materialsCost.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">${selectedBid.amount.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Project Timeline</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-600">Start Date</span>
                    <p className="font-medium">{new Date(selectedBid.details.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Completion Date</span>
                    <p className="font-medium">{new Date(selectedBid.details.completionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Warranty */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Warranty</h3>
                <p className="text-gray-700">{selectedBid.details.warranty}</p>
              </div>

              {/* Message */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Contractor's Message</h3>
                <div className="bg-navy-50 rounded-lg p-4">
                  <p className="text-gray-700">{selectedBid.message}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            {selectedBid.status === 'pending' && (
              <div className="p-6 border-t border-gray-200 flex gap-3">
                <button
                  onClick={() => {
                    handleAcceptBid(selectedBid)
                    setSelectedBid(null)
                  }}
                  className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Accept This Bid
                </button>
                <button
                  onClick={() => {
                    handleRejectBid(selectedBid)
                    setSelectedBid(null)
                  }}
                  className="flex-1 px-6 py-3 border-2 border-red-600 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
                >
                  Reject Bid
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
