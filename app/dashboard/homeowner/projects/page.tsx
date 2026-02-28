'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Home, DollarSign, FileText, Clock, ChevronRight } from 'lucide-react'

interface Project {
  id: string
  title: string
  category: string
  budget: string
  status: 'Active' | 'Pending' | 'Completed' | 'Cancelled'
  bids: number
  createdAt: string
  location: string
}

export default function MyProjectsPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const projects: Project[] = [
    {
      id: '1',
      title: 'Kitchen Remodel',
      category: 'Kitchen',
      budget: '$15,000 - $25,000',
      status: 'Active',
      bids: 5,
      createdAt: '2 days ago',
      location: 'Salt Lake City, UT'
    },
    {
      id: '2',
      title: 'Bathroom Renovation',
      category: 'Bathroom',
      budget: '$8,000 - $12,000',
      status: 'Pending',
      bids: 3,
      createdAt: '5 days ago',
      location: 'Provo, UT'
    },
    {
      id: '3',
      title: 'Roof Repair',
      category: 'Roofing',
      budget: '$3,000 - $5,000',
      status: 'Completed',
      bids: 7,
      createdAt: '2 weeks ago',
      location: 'Ogden, UT'
    },
    {
      id: '4',
      title: 'HVAC System Upgrade',
      category: 'HVAC',
      budget: '$5,000 - $8,000',
      status: 'Active',
      bids: 4,
      createdAt: '1 week ago',
      location: 'Sandy, UT'
    }
  ]

  const filtered = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.category.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || p.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: projects.length,
    active: projects.filter(p => p.status === 'Active').length,
    pending: projects.filter(p => p.status === 'Pending').length,
    completed: projects.filter(p => p.status === 'Completed').length
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
              <p className="text-gray-600 mt-1">{filtered.length} project{filtered.length !== 1 ? 's' : ''} found</p>
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
        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center gap-2">
              <Filter size={18} />
              More Filters
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                statusFilter === 'all'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All ({statusCounts.all})
            </button>
            <button
              onClick={() => setStatusFilter('active')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                statusFilter === 'active'
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Active ({statusCounts.active})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                statusFilter === 'pending'
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                statusFilter === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed ({statusCounts.completed})
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="space-y-4">
          {filtered.map((project) => (
            <Link
              key={project.id}
              href={`/dashboard/homeowner/projects/${project.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'Active' ? 'bg-blue-100 text-blue-700' :
                      project.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      project.status === 'Completed' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Home size={16} className="text-gray-400" />
                      <span>{project.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign size={16} className="text-gray-400" />
                      <span>{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <FileText size={16} className="text-gray-400" />
                      <span>{project.bids} bids</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} className="text-gray-400" />
                      <span>{project.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="ml-4">
                  <ChevronRight size={24} className="text-blue-600" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Home size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-6">
              {search ? 'Try adjusting your search filters' : 'Get started by posting your first project'}
            </p>
            {!search && (
              <Link
                href="/dashboard/homeowner/post-project"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                <Plus size={20} />
                Post Your First Project
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
