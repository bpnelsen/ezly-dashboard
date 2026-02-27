'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Phone, Globe, Filter, ChevronRight } from 'lucide-react'
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
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchContractors()
  }, [])

  const fetchContractors = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('contractors')
        .select('id, business_name, phone, address, website')
        .limit(50)

      if (error) throw error
      setContractors(data || [])
    } catch (error) {
      console.error('Error fetching contractors:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredContractors = contractors.filter(c =>
    c.business_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Contractors</h1>
          <p className="text-slate-600">{filteredContractors.length} contractors found</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search contractors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="px-6 py-3 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition flex items-center gap-2">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Contractors Grid */}
        {loading ? (
          <div className="grid gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : filteredContractors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No contractors found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContractors.map((contractor) => (
              <Link key={contractor.id} href={`/dashboard/contractors/${contractor.id}`}>
                <div className="bg-white rounded-lg border border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition group cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition mb-3">
                        {contractor.business_name}
                      </h3>
                      <div className="space-y-2 text-slate-600">
                        {contractor.address && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-slate-400" />
                            <span className="text-sm">{contractor.address}</span>
                          </div>
                        )}
                        {contractor.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-slate-400" />
                            <span className="text-sm">{contractor.phone}</span>
                          </div>
                        )}
                        {contractor.website && (
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-slate-400" />
                            <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-700">
                              {contractor.website}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-slate-400 group-hover:text-blue-600 transition flex-shrink-0" />
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
