'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, MapPin, Phone, Globe, Filter, ChevronRight, Zap } from 'lucide-react'
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
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-black">
      {/* Header */}
      <div className="bg-white/5 border-b border-purple-500/20 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="text-purple-400" size={28} />
            <h1 className="text-3xl font-bold text-white">Contractors</h1>
          </div>
          <p className="text-gray-400">Access your network of {filteredContractors.length} verified contractors</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-4 top-3 text-purple-400" />
            <input
              type="text"
              placeholder="Search contractors, services, location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-purple-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition backdrop-blur-sm"
            />
          </div>
          <button className="px-6 py-3 border border-purple-500/30 rounded-lg font-semibold text-white hover:bg-purple-500/10 hover:border-purple-400 transition flex items-center gap-2 backdrop-blur-sm">
            <Filter size={18} />
            Filter
          </button>
        </div>

        {/* Contractors Grid */}
        {loading ? (
          <div className="grid gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-white/5 rounded-lg border border-purple-500/20 animate-pulse"></div>
            ))}
          </div>
        ) : filteredContractors.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No contractors found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredContractors.map((contractor, index) => (
              <Link key={contractor.id} href={`/dashboard/contractors/${contractor.id}`}>
                <div className="group bg-white/5 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/60 hover:bg-white/10 transition cursor-pointer backdrop-blur-sm">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                          {contractor.business_name.charAt(0).toUpperCase()}
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition">
                          {contractor.business_name}
                        </h3>
                      </div>
                      <div className="space-y-2 text-gray-400 ml-13">
                        {contractor.address && (
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-400 flex-shrink-0" />
                            <span className="text-sm">{contractor.address}</span>
                          </div>
                        )}
                        {contractor.phone && (
                          <div className="flex items-center gap-2">
                            <Phone size={16} className="text-pink-400 flex-shrink-0" />
                            <span className="text-sm font-mono">{contractor.phone}</span>
                          </div>
                        )}
                        {contractor.website && (
                          <div className="flex items-center gap-2">
                            <Globe size={16} className="text-cyan-400 flex-shrink-0" />
                            <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-sm text-purple-400 hover:text-pink-400 transition">
                              {contractor.website.replace(/^https?:\/\/(www\.)?/, '')}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={24} className="text-purple-400/50 group-hover:text-pink-400 transition flex-shrink-0" />
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
