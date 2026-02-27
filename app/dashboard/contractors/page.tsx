'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Filter, MapPin, Phone, Globe, Star, ChevronRight, Plus } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

interface Contractor {
  id: string
  business_name: string
  phone: string
  address: string
  website: string
}

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    fetchContractors()
  }, [])

  const fetchContractors = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contractors')
        .select('id, business_name, phone, address, website')
        .limit(100)

      if (error) throw error
      setContractors(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = contractors
    .filter(c => c.business_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.business_name.localeCompare(b.business_name)
      return 0
    })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contractors</h1>
              <p className="text-gray-600 mt-1">{filtered.length} contractors in your network</p>
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
              <Plus size={18} />
              Add Contractor
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, location, service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
          >
            <option value="name">Sort by Name</option>
            <option value="recent">Recently Added</option>
            <option value="active">Most Active</option>
          </select>
          <button className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-900 hover:bg-gray-50 transition flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Contractors Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-white rounded-lg border border-gray-200 animate-pulse"></div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg mb-4">No contractors found</p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Add your first contractor
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((contractor) => (
              <Link key={contractor.id} href={`/dashboard/contractors/${contractor.id}`}>
                <div className="group bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-lg transition h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition line-clamp-2">
                        {contractor.business_name}
                      </h3>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className={i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                        ))}
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 transition" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 space-y-3 mb-4 text-sm text-gray-600">
                    {contractor.address && (
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{contractor.address}</span>
                      </div>
                    )}
                    {contractor.phone && (
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400 flex-shrink-0" />
                        <span className="font-mono">{contractor.phone}</span>
                      </div>
                    )}
                    {contractor.website && (
                      <div className="flex items-center gap-2">
                        <Globe size={16} className="text-gray-400 flex-shrink-0" />
                        <a href={contractor.website} target="_blank" rel="noopener noreferrer" 
                           onClick={(e) => e.stopPropagation()}
                           className="text-blue-600 hover:text-blue-700 truncate">
                          Visit
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button className="flex-1 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition">
                      Message
                    </button>
                    <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition">
                      View
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
