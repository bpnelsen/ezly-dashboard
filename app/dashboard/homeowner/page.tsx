'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus, Home, MessageCircle, FileText, DollarSign, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function HomeownerDashboard() {
  const stats = {
    activeProjects: 3,
    completedProjects: 12,
    activeContracts: 2,
    totalSpent: 45650
  }

  const recentProjects = [
    {
      id: '1',
      title: 'Kitchen Remodel',
      category: 'Kitchen',
      budget: '$15,000 - $25,000',
      status: 'Active',
      bids: 5,
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Bathroom Renovation',
      category: 'Bathroom',
      budget: '$8,000 - $12,000',
      status: 'Pending',
      bids: 3,
      createdAt: '5 days ago'
    },
    {
      id: '3',
      title: 'Roof Repair',
      category: 'Roofing',
      budget: '$3,000 - $5,000',
      status: 'Completed',
      bids: 7,
      createdAt: '2 weeks ago'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your projects</p>
            </div>
            <Link
              href="/dashboard/homeowner/post-project"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm hover:shadow-md flex items-center gap-2"
            >
              <Plus size={20} />
              Post New Project
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Projects */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Home size={24} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-blue-600">+2</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Active Projects</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
          </div>

          {/* Completed Projects */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle size={24} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold text-green-600">+3</span>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Completed</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.completedProjects}</p>
          </div>

          {/* Active Contracts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <FileText size={24} className="text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Active Contracts</h3>
            <p className="text-3xl font-bold text-gray-900">{stats.activeContracts}</p>
          </div>

          {/* Total Spent */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <DollarSign size={24} className="text-orange-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Spent</h3>
            <p className="text-3xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Link
            href="/dashboard/homeowner/post-project"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-blue-100 rounded-lg">
              <Plus size={20} className="text-blue-600" />
            </div>
            <span className="font-semibold text-gray-900">Post Project</span>
          </Link>

          <Link
            href="/dashboard/contractors"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-green-100 rounded-lg">
              <Home size={20} className="text-green-600" />
            </div>
            <span className="font-semibold text-gray-900">Find Contractors</span>
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
            href="/dashboard/homeowner/contracts"
            className="bg-white border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:shadow-md transition flex items-center gap-3"
          >
            <div className="p-2 bg-orange-100 rounded-lg">
              <FileText size={20} className="text-orange-600" />
            </div>
            <span className="font-semibold text-gray-900">Contracts</span>
          </Link>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Projects</h2>
            <Link href="/dashboard/homeowner/projects" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Link
                key={project.id}
                href={`/dashboard/homeowner/projects/${project.id}`}
                className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-gray-900">{project.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                        project.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Home size={14} />
                        {project.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={14} />
                        {project.budget}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText size={14} />
                        {project.bids} bids
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {project.createdAt}
                      </span>
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
