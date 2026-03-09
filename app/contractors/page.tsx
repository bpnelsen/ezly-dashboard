'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Star, MapPin, Briefcase, MessageCircle, Filter } from 'lucide-react'
import { useState } from 'react'

// Mock contractor data
const CONTRACTORS = [
  {
    id: 1,
    name: "Smith's Construction",
    service: 'Electrical',
    location: 'Denver, CO',
    rating: 4.8,
    reviews: 127,
    verified: true,
    responseTime: '< 1 hour',
    minBid: '$500',
    description: 'Licensed electrician with 15+ years experience',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop'
  },
  {
    id: 2,
    name: 'Premium Roofing Co',
    service: 'Roofing',
    location: 'Denver, CO',
    rating: 4.9,
    reviews: 89,
    verified: true,
    responseTime: '2-4 hours',
    minBid: '$1,200',
    description: 'Specialized in residential roof replacement and repair',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695b952952?w=400&h=300&fit=crop'
  },
  {
    id: 3,
    name: 'Master Plumbing',
    service: 'Plumbing',
    location: 'Denver, CO',
    rating: 4.7,
    reviews: 156,
    verified: true,
    responseTime: '< 1 hour',
    minBid: '$300',
    description: 'Emergency plumbing services, repairs, and installations',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695b952951?w=400&h=300&fit=crop'
  },
  {
    id: 4,
    name: 'Elite Carpentry',
    service: 'Carpentry',
    location: 'Denver, CO',
    rating: 4.6,
    reviews: 92,
    verified: true,
    responseTime: '4-8 hours',
    minBid: '$400',
    description: 'Custom woodwork, deck building, and interior finishing',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  },
  {
    id: 5,
    name: 'HVAC Pro',
    service: 'HVAC',
    location: 'Denver, CO',
    rating: 4.5,
    reviews: 74,
    verified: true,
    responseTime: '< 2 hours',
    minBid: '$600',
    description: 'Heating, cooling, and ventilation system specialists',
    image: 'https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&h=300&fit=crop'
  },
  {
    id: 6,
    name: 'Fresh Paint Studio',
    service: 'Painting',
    location: 'Denver, CO',
    rating: 4.8,
    reviews: 203,
    verified: true,
    responseTime: '1-2 hours',
    minBid: '$250',
    description: 'Interior and exterior painting with premium finishes',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop'
  }
]

export default function ContractorsPage() {
  const searchParams = useSearchParams()
  const service = searchParams.get('service') || ''
  const location = searchParams.get('location') || ''
  const [sortBy, setSortBy] = useState('rating')

  // Filter contractors
  const filtered = CONTRACTORS.filter(c => {
    const matchService = !service || c.service.toLowerCase().includes(service.toLowerCase())
    const matchLocation = !location || c.location.toLowerCase().includes(location.toLowerCase())
    return matchService && matchLocation
  })

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'reviews') return b.reviews - a.reviews
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-navy-500">EZLY</Link>
          <div className="flex gap-3">
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-navy-500 font-medium">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-4 py-2 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {service ? `${service} Contractors` : 'All Contractors'}
          </h1>
          {location && <p className="text-gray-600">in {location}</p>}
          <p className="text-gray-600 mt-2">{sorted.length} professionals available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-8">
          {/* Sidebar - Filters */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
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
              <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                <p className="text-gray-600 text-lg mb-4">No contractors found matching your criteria.</p>
                <Link 
                  href="/"
                  className="inline-block px-6 py-2 bg-navy-500 text-white rounded-lg hover:bg-navy-600"
                >
                  Back to Home
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {sorted.map(contractor => (
                  <div key={contractor.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition">
                    <div className="flex">
                      {/* Image */}
                      <div className="w-48 h-48 flex-shrink-0">
                        <img 
                          src={contractor.image}
                          alt={contractor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div>
                          {/* Header */}
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{contractor.name}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mt-1">
                                <Briefcase size={16} />
                                <span className="text-sm">{contractor.service}</span>
                                <span className="text-gray-400">•</span>
                                <MapPin size={16} />
                                <span className="text-sm">{contractor.location}</span>
                              </div>
                            </div>
                            {contractor.verified && (
                              <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                ✓ Verified
                              </div>
                            )}
                          </div>

                          {/* Description */}
                          <p className="text-gray-600 mb-4">{contractor.description}</p>

                          {/* Stats */}
                          <div className="flex items-center gap-6 text-sm">
                            <div>
                              <div className="flex items-center gap-1">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-bold text-gray-900">{contractor.rating}</span>
                              </div>
                              <span className="text-gray-600">{contractor.reviews} reviews</span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-900">⚡ {contractor.responseTime}</span>
                              <p className="text-gray-600">response time</p>
                            </div>
                            <div>
                              <span className="font-bold text-gray-900">{contractor.minBid}</span>
                              <p className="text-gray-600">starting bid</p>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">
                          <Link 
                            href={`/contractors/${contractor.id}`}
                            className="flex-1 px-4 py-2 border-2 border-navy-500 text-navy-500 font-bold rounded-lg hover:bg-navy-50 transition text-center"
                          >
                            View Profile
                          </Link>
                          <Link 
                            href={`/contractors/${contractor.id}?tab=message`}
                            className="flex-1 px-4 py-2 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-2"
                          >
                            <MessageCircle size={18} />
                            Message
                          </Link>
                        </div>
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
