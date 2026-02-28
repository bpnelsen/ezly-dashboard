'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Briefcase, DollarSign, Star, MessageCircle, FileText, TrendingUp } from 'lucide-react'

export default function ContractorDashboard() {
  const stats = {
    activeJobs: 5,
    pendingBids: 8,
    rating: 4.8,
    monthlyEarnings: 12450
  }

  const availableJobs = [
    {
      id: '1',
      title: 'Kitchen Remodel',
      homeowner: 'John D.',
      location: 'Salt Lake City, UT',
      budget: '$15,000 - $25,000',
      posted: '2 days ago',
      category: 'Kitchen'
    },
    {
      id: '2',
      title: 'Bathroom Renovation',
      homeowner: 'Sarah M.',
      location: 'Provo, UT',
      budget: '$8,000 - $12,000',
      posted: '5 days ago',
      category: 'Bathroom'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contractor Dashboard</h1>
              <p className="text-gray-600 mt-1">Find new jobs and manage your business</p>
            </div>
            <Link
              href="/dashboard/contractor/profile"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Briefcase size={24} className="text-blue-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Active Jobs</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeJobs}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <FileText size={24} className="text-yellow-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Pending Bids</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.pendingBids}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star size={24} className="text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Rating</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.rating} ⭐</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign size={24} className="text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-600">+15%</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">This Month</h3>
            <p className="text-3xl font-bold text-gray-900">${stats.monthlyEarnings.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/contractor/jobs"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Briefcase size={20} className="text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">Browse Jobs</span>
          </Link>

          <Link
            href="/dashboard/contractor/bids"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText size={20} className="text-yellow-600" />
            </div>
            <span className="font-semibold text-gray-900">My Bids</span>
          </Link>

          <Link
            href="/dashboard/messages"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-purple-100 rounded-lg">
              <MessageCircle size={20} className="text-purple-600" />
            </div>
            <span className="font-semibold text-gray-900">Messages</span>
          </Link>

          <Link
            href="/dashboard/contractor/profile"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Star size={20} className="text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">My Profile</span>
          </Link>
        </div>

        {/* Available Jobs */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Available Jobs</h2>
            <Link href="/dashboard/contractor/jobs" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {availableJobs.map((job) => (
              <Link
                key={job.id}
                href={`/dashboard/contractor/jobs/${job.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{job.title}</h3>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <span>By {job.homeowner}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.posted}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {job.category}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-900">Budget: {job.budget}</span>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition">
                    Submit Bid
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
