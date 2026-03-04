'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, CheckCircle, AlertCircle, MessageCircle, Eye } from 'lucide-react'

interface Project {
  id: string
  title: string
  category: string
  status: 'open' | 'in-progress' | 'completed'
  location: string
  budgetMin: number
  budgetMax: number
  bidsReceived: number
  createdAt: string
  acceptedBid?: {
    contractorName: string
    amount: number
    startDate: string
  }
}

export default function MyProjectsPage() {
  const [filter, setFilter] = useState<'all' | 'open' | 'in-progress' | 'completed'>('all')

  // Mock data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Kitchen Remodel with Island',
      category: 'Kitchen Remodel',
      status: 'open',
      location: 'Denver, CO',
      budgetMin: 8000,
      budgetMax: 15000,
      bidsReceived: 5,
      createdAt: '2026-03-01'
    },
    {
      id: '2',
      title: 'Bathroom Renovation',
      category: 'Bathroom',
      status: 'in-progress',
      location: 'Denver, CO',
      budgetMin: 5000,
      budgetMax: 12000,
      bidsReceived: 3,
      createdAt: '2026-02-20',
      acceptedBid: {
        contractorName: 'Elite Renovations LLC',
        amount: 9500,
        startDate: '2026-02-25'
      }
    },
    {
      id: '3',
      title: 'Roof Replacement',
      category: 'Roofing',
      status: 'completed',
      location: 'Denver, CO',
      budgetMin: 4000,
      budgetMax: 8000,
      bidsReceived: 4,
      createdAt: '2026-01-10',
      acceptedBid: {
        contractorName: 'Summit Roofing Co',
        amount: 6500,
        startDate: '2026-01-15'
      }
    }
  ]

  const filtered = projects.filter(p => filter === 'all' || p.status === filter)

  const statusConfig = {
    open: {
      icon: Clock,
      label: 'Open for Bids',
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-100 text-blue-800'
    },
    'in-progress': {
      icon: AlertCircle,
      label: 'In Progress',
      color: 'amber',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    completed: {
      icon: CheckCircle,
      label: 'Completed',
      color: 'green',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      badgeColor: 'bg-green-100 text-green-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
          <p className="text-gray-600 mt-1">Manage your home improvement projects</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        {/* Filters */}
        <div className="mb-8 flex gap-3">
          {['all', 'open', 'in-progress', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <Clock size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600 text-lg">No projects found</p>
            <Link
              href="/dashboard/homeowner/post-project"
              className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Post a New Project
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(project => {
              const config = statusConfig[project.status]
              const Icon = config.icon
              return (
                <div
                  key={project.id}
                  className={`${config.bgColor} border ${config.borderColor} rounded-xl p-6 hover:shadow-md transition`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${config.badgeColor}`}>
                          <Icon size={16} className="inline mr-1" />
                          {config.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>{project.category}</span>
                        <span>📍 {project.location}</span>
                        <span>📅 {new Date(project.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Project Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-current border-opacity-10">
                    <div>
                      <p className="text-xs text-gray-600 font-medium">BUDGET</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-medium">BIDS RECEIVED</p>
                      <p className="text-lg font-bold text-gray-900">{project.bidsReceived}</p>
                    </div>
                    {project.acceptedBid && (
                      <div>
                        <p className="text-xs text-gray-600 font-medium">ACCEPTED BID</p>
                        <p className="text-lg font-bold text-gray-900">${project.acceptedBid.amount.toLocaleString()}</p>
                      </div>
                    )}
                  </div>

                  {/* Contractor Info (if accepted) */}
                  {project.acceptedBid && (
                    <div className="bg-white bg-opacity-50 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 font-medium">CONTRACTOR</p>
                      <p className="text-lg font-bold text-gray-900">{project.acceptedBid.contractorName}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        Start Date: {new Date(project.acceptedBid.startDate).toLocaleDateString()}
                      </p>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-3">
                    <Link
                      href={`/dashboard/homeowner/projects/${project.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
                    >
                      <Eye size={18} />
                      View Details
                    </Link>
                    {project.status !== 'completed' && (
                      <button className="flex-1 px-4 py-2 border border-current border-opacity-30 rounded-lg font-medium hover:bg-white hover:bg-opacity-50 transition flex items-center justify-center gap-2">
                        <MessageCircle size={18} />
                        Message
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
