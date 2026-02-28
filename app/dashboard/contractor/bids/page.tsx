'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { DollarSign, Clock, MapPin, TrendingUp, Home } from 'lucide-react'

interface Bid {
  id: string
  jobTitle: string
  homeowner: string
  bidAmount: number
  timeline: string
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Expired'
  submittedDate: string
  location: string
  category: string
}

export default function MyBidsPage() {
  const bids: Bid[] = [
    {
      id: '1',
      jobTitle: 'Kitchen Remodel',
      homeowner: 'John D.',
      bidAmount: 18500,
      timeline: '1-2 months',
      status: 'Pending',
      submittedDate: '2 days ago',
      location: 'Salt Lake City, UT',
      category: 'Kitchen'
    },
    {
      id: '2',
      jobTitle: 'Bathroom Renovation',
      homeowner: 'Sarah M.',
      bidAmount: 9800,
      timeline: '2-4 weeks',
      status: 'Accepted',
      submittedDate: '1 week ago',
      location: 'Provo, UT',
      category: 'Bathroom'
    },
    {
      id: '3',
      jobTitle: 'Roof Repair',
      homeowner: 'Mike T.',
      bidAmount: 4200,
      timeline: 'ASAP',
      status: 'Pending',
      submittedDate: '3 days ago',
      location: 'Ogden, UT',
      category: 'Roofing'
    },
    {
      id: '4',
      jobTitle: 'Electrical Panel Upgrade',
      homeowner: 'Robert K.',
      bidAmount: 2800,
      timeline: '1 week',
      status: 'Rejected',
      submittedDate: '5 days ago',
      location: 'Draper, UT',
      category: 'Electrical'
    }
  ]

  const stats = {
    totalBids: bids.length,
    pending: bids.filter(b => b.status === 'Pending').length,
    accepted: bids.filter(b => b.status === 'Accepted').length,
    totalValue: bids.reduce((sum, b) => sum + b.bidAmount, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-700'
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700'
      case 'Rejected':
        return 'bg-red-100 text-red-700'
      case 'Expired':
        return 'bg-gray-100 text-gray-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bids</h1>
          <p className="text-gray-600 mt-1">Track all your submitted bids and their status</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Bids</p>
            <p className="text-3xl font-bold text-gray-900">{stats.totalBids}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Accepted</p>
            <p className="text-3xl font-bold text-green-600">{stats.accepted}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 text-sm font-medium mb-2">Total Value</p>
            <p className="text-3xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</p>
          </div>
        </div>

        {/* Bids List */}
        <div className="space-y-4">
          {bids.map((bid) => (
            <Link
              key={bid.id}
              href={`/dashboard/contractor/jobs/${bid.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{bid.jobTitle}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bid.status)}`}>
                      {bid.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">Homeowner: {bid.homeowner}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">${bid.bidAmount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{bid.submittedDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <Home size={16} className="text-gray-400" />
                  <span className="text-gray-600">{bid.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{bid.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-600">{bid.timeline}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-gray-600 font-semibold">${bid.bidAmount}</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                {bid.status === 'Pending' && (
                  <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg font-medium hover:bg-blue-100 transition">
                    Edit Bid
                  </button>
                )}
                {bid.status === 'Accepted' && (
                  <button className="px-4 py-2 text-sm bg-green-50 text-green-600 rounded-lg font-medium hover:bg-green-100 transition">
                    View Contract
                  </button>
                )}
                {bid.status === 'Rejected' && (
                  <button className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg font-medium hover:bg-gray-200 transition">
                    View Feedback
                  </button>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
