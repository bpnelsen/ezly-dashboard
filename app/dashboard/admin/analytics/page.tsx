'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { ArrowLeft, TrendingUp, Users, Briefcase, CheckCircle, Clock, DollarSign, BarChart3, PieChart } from 'lucide-react'

export default function AnalyticsPage() {
  // Mock analytics data
  const analytics = {
    revenue: {
      total: 247500,
      thisMonth: 45000,
      thisWeek: 12500,
      avgPerProject: 3200,
      trend: '+12%'
    },
    projects: {
      total: 77,
      active: 12,
      completed: 62,
      paused: 3,
      completionRate: 81,
      avgValue: 3212,
      avgTimeline: '3.2 weeks'
    },
    contractors: {
      total: 586,
      verified: 432,
      verified_percent: 74,
      active: 156,
      newThisMonth: 23,
      avgRating: 4.6
    },
    homeowners: {
      total: 89,
      active: 23,
      newThisMonth: 8,
      totalProjectsPosted: 77,
      avgProjectsPerUser: 0.86
    },
    bids: {
      total: 287,
      accepted: 77,
      pending: 45,
      rejected: 165,
      acceptanceRate: 27,
      avgBidsPerProject: 3.7
    },
    messaging: {
      totalMessages: 2341,
      activeConversations: 34,
      avgResponseTime: '2.3 hours',
      resolution: '94%'
    }
  }

  const topContractors = [
    { name: 'Elite Kitchen Renovations', rating: 4.9, reviews: 52, projects: 8, revenue: 28500 },
    { name: 'Summit Roofing Co', rating: 4.8, reviews: 38, projects: 6, revenue: 19200 },
    { name: 'Modern Home Solutions', rating: 4.6, reviews: 28, projects: 5, revenue: 15800 },
    { name: 'Budget Kitchen Works', rating: 4.2, reviews: 15, projects: 3, revenue: 8600 },
    { name: 'Premium Kitchen Design', rating: 4.9, reviews: 42, projects: 7, revenue: 24850 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <Link href="/dashboard/admin" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Admin
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">📊 Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Real-time insights into EZLY platform performance</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Revenue Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <DollarSign size={28} className="text-green-600" />
            Revenue Overview
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${(analytics.revenue.total / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">All time</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">This Month</p>
              <p className="text-3xl font-bold text-green-600 mt-2">${(analytics.revenue.thisMonth / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">{analytics.revenue.trend} vs last month</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">This Week</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${(analytics.revenue.thisWeek / 1000).toFixed(0)}K</p>
              <p className="text-xs text-gray-600 mt-1">7 day total</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Avg Project Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${analytics.revenue.avgPerProject.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-1">Per completed project</p>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Briefcase size={28} className="text-blue-600" />
            Project Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Projects</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.projects.total}</p>
              <div className="mt-2 space-y-1 text-xs text-gray-600">
                <p>✅ Completed: {analytics.projects.completed}</p>
                <p>⏳ Active: {analytics.projects.active}</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{analytics.projects.completionRate}%</p>
              <p className="text-xs text-gray-600 mt-1">{analytics.projects.completed} of {analytics.projects.total} completed</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Avg Timeline</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.projects.avgTimeline}</p>
              <p className="text-xs text-gray-600 mt-1">From start to completion</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Avg Project Value</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">${(analytics.projects.avgValue / 1000).toFixed(1)}K</p>
              <p className="text-xs text-gray-600 mt-1">Average bid amount</p>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Users size={28} className="text-purple-600" />
            User Statistics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Contractors</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.contractors.total}</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Verified:</span>
                  <span className="font-semibold">{analytics.contractors.verified_percent}% ({analytics.contractors.verified})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active:</span>
                  <span className="font-semibold">{analytics.contractors.active}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Rating:</span>
                  <span className="font-semibold text-yellow-600">⭐ {analytics.contractors.avgRating}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Homeowners</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.homeowners.total}</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active:</span>
                  <span className="font-semibold">{analytics.homeowners.active}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New this month:</span>
                  <span className="font-semibold text-green-600">+{analytics.homeowners.newThisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg projects:</span>
                  <span className="font-semibold">{analytics.homeowners.avgProjectsPerUser.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Bids</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.bids.total}</p>
              <div className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Acceptance Rate:</span>
                  <span className="font-semibold text-green-600">{analytics.bids.acceptanceRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Pending:</span>
                  <span className="font-semibold">{analytics.bids.pending}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg per project:</span>
                  <span className="font-semibold">{analytics.bids.avgBidsPerProject}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Contractors */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp size={28} className="text-teal-600" />
            Top Performing Contractors
          </h2>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Contractor</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Rating</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Reviews</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Projects</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topContractors.map((contractor, idx) => (
                  <tr key={idx} className={idx !== topContractors.length - 1 ? 'border-b border-gray-200' : ''}>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{contractor.name}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-yellow-600 font-semibold">⭐ {contractor.rating}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{contractor.reviews}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{contractor.projects}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-green-600">${contractor.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Messaging Stats */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 Communication Metrics</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Total Messages</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.messaging.totalMessages.toLocaleString()}</p>
              <p className="text-xs text-gray-600 mt-1">All time</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Active Conversations</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.messaging.activeConversations}</p>
              <p className="text-xs text-gray-600 mt-1">Right now</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.messaging.avgResponseTime}</p>
              <p className="text-xs text-gray-600 mt-1">Homeowner to contractor</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <p className="text-sm text-gray-600 font-medium">Resolution Rate</p>
              <p className="text-3xl font-bold text-green-600 mt-2">{analytics.messaging.resolution}</p>
              <p className="text-xs text-gray-600 mt-1">Issues resolved successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
