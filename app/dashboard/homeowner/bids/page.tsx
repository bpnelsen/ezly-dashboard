'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { DollarSign, Clock, CheckCircle, XCircle, MessageCircle, User, Star, Calendar, AlertCircle, Loader } from 'lucide-react'

interface Contractor {
  id: string
  email: string
}

interface Project {
  id: string
  title: string
  category: string
}

interface Bid {
  id: string
  projectId: string
  project: Project
  contractor: Contractor
  amount: number
  timeline: string
  submitted_at: string
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
  const [bids, setBids] = useState<Bid[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  // Fetch bids on mount
  useEffect(() => {
    fetchBids()
  }, [])

  async function fetchBids() {
    try {
      setLoading(true)
      const response = await fetch('/api/bids')
      
      if (!response.ok) {
        throw new Error('Failed to fetch bids')
      }

      const data = await response.json()
      setBids(data || [])
      setError(null)
    } catch (err: any) {
      setError(err.message)
      console.error('Error fetching bids:', err)
    } finally {
      setLoading(false)
    }
  }

  async function handleAcceptBid(bid: Bid) {
    try {
      setActionLoading(bid.id)
      const response = await fetch(`/api/bids/${bid.id}/accept`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to accept bid')
      }

      // Refresh bids
      await fetchBids()
      setSelectedBid(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

  async function handleRejectBid(bid: Bid) {
    try {
      setActionLoading(bid.id)
      const response = await fetch(`/api/bids/${bid.id}/reject`, {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to reject bid')
      }

      // Refresh bids
      await fetchBids()
      setSelectedBid(null)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setActionLoading(null)
    }
  }

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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Bids & Proposals</h1>
        <p className="text-gray-600">Review and manage contractor bids for your projects</p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
          <AlertCircle size={20} className="text-red-600" />
          <div>
            <p className="font-semibold text-red-900">Error</p>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

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
      <div className="mb-8 flex gap-4 border-b border-gray-200">
        {(['all', 'pending', 'accepted', 'rejected'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 font-medium text-sm border-b-2 transition ${
              selectedTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12">
          <Loader className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
          <p className="text-gray-600">Loading bids...</p>
        </div>
      ) : filteredBids.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No {selectedTab !== 'all' ? selectedTab : ''} bids yet</p>
        </div>
      ) : (
        /* Bids List */
        <div className="space-y-4">
          {filteredBids.map(bid => (
            <div
              key={bid.id}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedBid(bid)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-1">{bid.project.title}</h3>
                  <p className="text-sm text-gray-600">From: {bid.contractor.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(bid.status)}`}>
                  {bid.status.charAt(0).toUpperCase() + bid.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-lg font-bold text-gray-900">${bid.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="text-lg font-semibold text-gray-900">{bid.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Submitted</p>
                  <p className="text-sm text-gray-900">{new Date(bid.submitted_at).toLocaleDateString()}</p>
                </div>
              </div>

              <p className="text-sm text-gray-700 mb-4 line-clamp-2">{bid.message}</p>

              {bid.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAcceptBid(bid)
                    }}
                    disabled={actionLoading === bid.id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {actionLoading === bid.id ? 'Accepting...' : 'Accept Bid'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleRejectBid(bid)
                    }}
                    disabled={actionLoading === bid.id}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {actionLoading === bid.id ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Bid Detail Modal */}
      {selectedBid && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-4">{selectedBid.project.title}</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Contractor</p>
                  <p className="font-semibold">{selectedBid.contractor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Amount</p>
                  <p className="text-2xl font-bold text-green-600">${selectedBid.amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Timeline</p>
                  <p className="font-semibold">{selectedBid.timeline}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBid.status)}`}>
                    {selectedBid.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Message</h3>
                <p className="text-gray-700">{selectedBid.message}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Start Date</p>
                  <p className="font-semibold">{selectedBid.details?.startDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Completion Date</p>
                  <p className="font-semibold">{selectedBid.details?.completionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Labor Cost</p>
                  <p className="font-semibold">${selectedBid.details?.laborCost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Materials Cost</p>
                  <p className="font-semibold">${selectedBid.details?.materialsCost.toLocaleString()}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600">Warranty</p>
                <p className="font-semibold">{selectedBid.details?.warranty}</p>
              </div>

              {selectedBid.status === 'pending' && (
                <div className="flex gap-4 mb-4">
                  <button
                    onClick={() => handleAcceptBid(selectedBid)}
                    disabled={actionLoading === selectedBid.id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {actionLoading === selectedBid.id ? 'Accepting...' : 'Accept This Bid'}
                  </button>
                  <button
                    onClick={() => handleRejectBid(selectedBid)}
                    disabled={actionLoading === selectedBid.id}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50"
                  >
                    {actionLoading === selectedBid.id ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              )}

              <button
                onClick={() => setSelectedBid(null)}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 py-2 rounded-lg font-medium transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
