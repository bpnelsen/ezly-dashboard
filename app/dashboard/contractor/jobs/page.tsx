'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, DollarSign, Clock, Home, ChevronRight, Briefcase } from 'lucide-react'

interface Job {
  id: string
  title: string
  category: string
  location: string
  budget: string
  postedBy: string
  timeline: string
  description: string
  status: 'Open' | 'In Progress' | 'Closed'
  bidsReceived: number
  createdAt: string
}

export default function BrowseJobsPage() {
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [budgetFilter, setBudgetFilter] = useState('all')

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Kitchen Remodel',
      category: 'Kitchen',
      location: 'Salt Lake City, UT',
      budget: '$15,000 - $25,000',
      postedBy: 'John D.',
      timeline: '1-2 months',
      description: 'Full kitchen renovation including cabinets, counters, appliances, and flooring',
      status: 'Open',
      bidsReceived: 5,
      createdAt: '2 days ago'
    },
    {
      id: '2',
      title: 'Bathroom Renovation',
      category: 'Bathroom',
      location: 'Provo, UT',
      budget: '$8,000 - $12,000',
      postedBy: 'Sarah M.',
      timeline: '2-4 weeks',
      description: 'Master bathroom update with new fixtures, tiles, and vanity',
      status: 'Open',
      bidsReceived: 3,
      createdAt: '5 days ago'
    },
    {
      id: '3',
      title: 'Roof Repair & Replacement',
      category: 'Roofing',
      location: 'Ogden, UT',
      budget: '$3,000 - $5,000',
      postedBy: 'Mike T.',
      timeline: 'ASAP',
      description: 'Roof inspection and replacement of damaged sections',
      status: 'Open',
      bidsReceived: 7,
      createdAt: '1 week ago'
    },
    {
      id: '4',
      title: 'HVAC System Upgrade',
      category: 'HVAC',
      location: 'Sandy, UT',
      budget: '$5,000 - $8,000',
      postedBy: 'Lisa P.',
      timeline: '1-2 weeks',
      description: 'Replace existing HVAC system with modern high-efficiency unit',
      status: 'Open',
      bidsReceived: 4,
      createdAt: '3 days ago'
    },
    {
      id: '5',
      title: 'Electrical Panel Upgrade',
      category: 'Electrical',
      location: 'Draper, UT',
      budget: '$2,000 - $3,500',
      postedBy: 'Robert K.',
      timeline: '1 week',
      description: 'Upgrade 100amp panel to 200amp for new additions',
      status: 'Open',
      bidsReceived: 6,
      createdAt: '4 days ago'
    }
  ]

  const categories = ['all', 'Kitchen', 'Bathroom', 'Roofing', 'HVAC', 'Electrical', 'Plumbing', 'Painting']
  const budgetRanges = ['all', 'Under $5K', '$5K - $10K', '$10K - $20K', 'Over $20K']

  const filtered = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.location.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || job.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
            <p className="text-gray-600 mt-1">Find projects that match your expertise</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by job title or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* More Filters Button */}
            <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <Filter size={18} />
              More Filters
            </button>
          </div>

          {/* Category Filter */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-4 py-2 rounded-lg font-medium transition ${
                    categoryFilter === cat
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat === 'all' ? 'All Categories' : cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Jobs List */}
        <div className="space-y-4">
          {filtered.map((job) => (
            <Link
              key={job.id}
              href={`/dashboard/contractor/jobs/${job.id}`}
              className="block bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {job.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{job.description}</p>
                </div>
                <ChevronRight size={24} className="text-blue-600 flex-shrink-0" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <Home size={16} className="text-gray-400" />
                  <span className="text-gray-600">{job.category}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin size={16} className="text-gray-400" />
                  <span className="text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign size={16} className="text-gray-400" />
                  <span className="text-gray-600 font-semibold">{job.budget}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-600">{job.timeline}</span>
                </div>
                <div className="text-sm text-gray-500">
                  <span>{job.bidsReceived} bids</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
            <Briefcase size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
