'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Star, MapPin, Briefcase, MessageCircle, Filter } from 'lucide-react'
import { useState, useEffect, Suspense } from 'react'
import { supabase } from '@/lib/supabase-client'

function ContractorsContent() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || ''
  const location = searchParams.get('location') || ''
  const [sortBy, setSortBy] = useState('name')
  const [contractors, setContractors] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContractors() {
      let query = supabase
        .from('contractors')
        .select('id, business_name, specialties, phone, email, city, state, website')
        .order('business_name')
        .limit(50)

      if (service) {
        query = query.or(`specialties.ilike.%${service}%,business_name.ilike.%${service}%`)
      }
      if (location) {
        query = query.or(`city.ilike.%${location}%,state.ilike.%${location}%,zip.ilike.%${location}%`)
      }

      const { data } = await query
      setContractors(data || [])
      setLoading(false)
    }
    fetchContractors()
  }, [service, location])

  const sorted = [...contractors].sort((a, b) => {
    if (sortBy === 'name') return (a.business_name || '').localeCompare(b.business_name || '')
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-navy-500">EZLY</Link>
          <div className="hidden md:flex gap-3">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-navy-500 font-medium text-sm">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 text-sm"
            >
              Get Started
            </Link>
          </div>
          <Link 
            href="/signup"
            className="md:hidden px-3 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 text-sm min-h-10 flex items-center"
          >
            Sign Up
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {service ? `${service} Contractors` : 'All Contractors'}
          </h1>
          {location && <p className="text-gray-600 text-sm sm:text-base">in {location}</p>}
          <p className="text-gray-600 mt-2 text-sm sm:text-base">{sorted.length} professionals available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Filters */}
          <div className="w-full lg:w-64 lg:flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 sticky top-20">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} />
                <h3 className="font-bold text-lg text-gray-900">Filters</h3>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* Service Types */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Services</label>
                <div className="space-y-2">
                  {['Electrical', 'Plumbing', 'Roofing', 'Carpentry', 'HVAC', 'Painting'].map(s => (
                    <label key={s} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-gray-700">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content - Contractor Cards */}
          <div className="flex-1">
            {sorted.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 sm:p-12 text-center">
                <p className="text-gray-600 text-base sm:text-lg mb-4">No contractors found matching your criteria.</p>
                <Link 
                  href="/"
                  className="inline-block px-6 py-2 bg-navy-500 text-white rounded-lg hover:bg-navy-600 min-h-10 flex items-center"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center py-12 text-gray-500">Loading contractors...</div>
                ) : sorted.map(contractor => (
                  <div key={contractor.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
                    <div className="flex-1 p-4 sm:p-6">
                      <div className="flex items-start justify-between mb-3 flex-col sm:flex-row gap-2">
                        <div className="flex-1">
                          <h3 className="text-lg sm:text-xl font-bold text-gray-900">{contractor.business_name}</h3>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-600 mt-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Briefcase size={16} />
                              <span>{contractor.specialties || 'General'}</span>
                            </div>
                            {contractor.city && (
                              <>
                                <span className="hidden sm:inline text-gray-400">•</span>
                                <div className="flex items-center gap-1">
                                  <MapPin size={16} />
                                  <span>{contractor.city}{contractor.state ? `, ${contractor.state}` : ''}</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                          ✓ Verified
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:flex sm:gap-6 gap-4 text-xs sm:text-sm mb-4">
                        {contractor.phone && (
                          <div>
                            <span className="font-bold text-gray-900 block">📞 {contractor.phone}</span>
                          </div>
                        )}
                        {contractor.email && (
                          <div>
                            <span className="font-bold text-gray-900 block">✉️ {contractor.email}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-3 mt-4 flex-col sm:flex-row">
                        {contractor.website && (
                          <a 
                            href={contractor.website.startsWith('http') ? contractor.website : `https://${contractor.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 sm:px-4 py-2 border-2 border-navy-500 text-navy-500 font-bold rounded-lg hover:bg-navy-50 transition text-center min-h-10 flex items-center justify-center text-sm sm:text-base"
                          >
                            Visit Website
                          </a>
                        )}
                        {contractor.phone && (
                          <a 
                            href={`tel:${contractor.phone}`}
                            className="flex-1 px-3 sm:px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-2 min-h-10 text-sm sm:text-base"
                          >
                            <MessageCircle size={18} />
                            Call Now
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContractorsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ContractorsContent />
    </Suspense>
  )
}
