'use client'

import Link from 'next/link'
import { Star, MapPin, Phone, Mail, MessageCircle, Award, DollarSign, Clock } from 'lucide-react'
import { useState } from 'react'

// Mock contractor data
const CONTRACTORS: Record<number, any> = {
  1: {
    id: 1,
    name: "Smith's Construction",
    service: 'Electrical',
    location: 'Denver, CO',
    rating: 4.8,
    reviewCount: 127,
    verified: true,
    responseTime: '< 1 hour',
    minBid: '$500',
    description: 'Licensed electrician with 15+ years experience specializing in residential electrical work.',
    phone: '(303) 555-0101',
    email: 'contact@smithsconstruction.com',
    website: 'www.smithsconstruction.com',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    services: ['Electrical Wiring', 'Panel Installation', 'Lighting Design', 'Troubleshooting', 'Code Compliance'],
    yearsInBusiness: 15,
    completedProjects: 342,
    portfolio: [
      { title: 'Kitchen Renovation Wiring', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop' },
      { title: 'Basement Finishing', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop' },
      { title: 'Outdoor Lighting', image: 'https://images.unsplash.com/photo-1565183897294-1f5f1f1f1f1f?w=300&h=200&fit=crop' }
    ],
    reviews: [
      { author: 'John D.', rating: 5, text: 'Professional, punctual, and did excellent work. Highly recommend!', date: '2 weeks ago' },
      { author: 'Sarah M.', rating: 5, text: 'Great communication throughout the project. Very satisfied with results.', date: '1 month ago' },
      { author: 'Mike T.', rating: 4, text: 'Quality work. Could have been slightly cheaper but overall very good.', date: '2 months ago' }
    ]
  },
  2: {
    id: 2,
    name: 'Premium Roofing Co',
    service: 'Roofing',
    location: 'Denver, CO',
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    responseTime: '2-4 hours',
    minBid: '$1,200',
    description: 'Specialized in residential roof replacement and repair with 20+ years of experience.',
    phone: '(303) 555-0102',
    email: 'info@premiumroofing.com',
    website: 'www.premiumroofing.com',
    image: 'https://images.unsplash.com/photo-1581078727243-c3fb0baeda32?w=600&h=400&fit=crop',
    services: ['Roof Replacement', 'Roof Repair', 'Gutter Installation', 'Inspection & Assessment', 'Emergency Repair'],
    yearsInBusiness: 20,
    completedProjects: 512,
    portfolio: [
      { title: 'Residential Shingle Roof', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop' },
      { title: 'Metal Roof Installation', image: 'https://images.unsplash.com/photo-1581078727243-c3fb0baeda32?w=300&h=200&fit=crop' },
      { title: 'Emergency Repair', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop' }
    ],
    reviews: [
      { author: 'Robert H.', rating: 5, text: 'Excellent roofing work. Crew was clean and professional.', date: '3 weeks ago' },
      { author: 'Jennifer L.', rating: 5, text: 'Fast service and great quality. Saved me from water damage!', date: '1 month ago' },
      { author: 'David K.', rating: 5, text: 'Top-notch professionals. Warranty is excellent.', date: '2 months ago' }
    ]
  }
}

export default function ContractorPage({ params }: { params: { id: string } }) {
  const contractorId = parseInt(params.id)
  const contractor = CONTRACTORS[contractorId] || CONTRACTORS[1]
  const [activeTab, setActiveTab] = useState('overview')
  const [messageText, setMessageText] = useState('')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-navy-500">EZLY</Link>
          <div className="hidden md:flex gap-3">
            <Link href="/contractors" className="px-4 py-2 text-gray-700 hover:text-navy-500 font-medium text-sm">
              Back to Results
            </Link>
            <Link href="/login" className="px-4 py-2 text-gray-700 hover:text-navy-500 font-medium text-sm">
              Sign In
            </Link>
          </div>
          <Link href="/contractors" className="md:hidden px-3 py-2 text-gray-700 hover:text-navy-500 font-medium text-sm">
            Back
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
            {/* Image */}
            <div className="w-full sm:w-64 h-48 sm:h-64 flex-shrink-0">
              <img 
                src={contractor.image}
                alt={contractor.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">{contractor.name}</h1>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-gray-600 mb-4">
                    <span className="font-semibold text-navy-500 text-base sm:text-lg">{contractor.service}</span>
                    <span className="hidden sm:inline">•</span>
                    <div className="flex items-center gap-1">
                      <MapPin size={18} />
                      <span>{contractor.location}</span>
                    </div>
                  </div>
                </div>
                {contractor.verified && (
                  <div className="bg-green-100 text-green-700 px-3 sm:px-4 py-2 rounded-full font-bold text-xs sm:text-sm whitespace-nowrap">
                    ✓ Verified Professional
                  </div>
                )}
              </div>

              <p className="text-gray-700 text-lg mb-6">{contractor.description}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-yellow-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={18} className="text-yellow-400 fill-yellow-400" />
                    <span className="font-bold text-gray-900">{contractor.rating}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">{contractor.reviews} reviews</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Award size={18} className="text-blue-600" />
                    <span className="font-bold text-gray-900">{contractor.yearsInBusiness}+</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Years in Business</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign size={18} className="text-purple-600" />
                    <span className="font-bold text-gray-900">{contractor.completedProjects}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Projects Completed</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock size={18} className="text-green-600" />
                    <span className="font-bold text-gray-900 text-xs sm:text-base">{contractor.responseTime}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">Avg. Response</p>
                </div>
              </div>

              {/* Contact & Action */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <a 
                  href={`mailto:${contractor.email}`}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base min-h-10"
                >
                  <Mail size={16} />
                  <span className="hidden sm:inline">Email</span>
                </a>
                <a 
                  href={`tel:${contractor.phone}`}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-gray-400 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base min-h-10"
                >
                  <Phone size={16} />
                  <span className="hidden sm:inline">Call</span>
                </a>
                <button 
                  onClick={() => setActiveTab('message')}
                  className="flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-base min-h-10"
                >
                  <MessageCircle size={16} />
                  <span>Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 flex">
            {['overview', 'portfolio', 'reviews', 'message'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-6 py-4 font-semibold transition ${
                  activeTab === tab 
                    ? 'bg-navy-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h3>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {(contractor.services as string[]).map((service: string) => (
                    <div key={service} className="bg-gray-50 rounded-lg p-4 flex items-center gap-3">
                      <span className="text-teal-500 text-xl">✓</span>
                      <span className="text-gray-700">{service}</span>
                    </div>
                  ))}
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-6">About This Professional</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {contractor.description}
                  </p>
                  <p className="text-gray-600">
                    With {contractor.yearsInBusiness} years of experience and {contractor.completedProjects} completed projects, 
                    we pride ourselves on quality work and excellent customer service.
                  </p>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Projects</h3>
                <div className="grid grid-cols-3 gap-6">
                  {(contractor.portfolio as {title: string, image: string}[]).map((project: {title: string, image: string}, idx: number) => (
                    <div key={idx} className="rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-bold text-gray-900">{project.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews ({contractor.reviews.length})</h3>
                <div className="space-y-6">
                  {(contractor.reviews as {author: string, rating: number, text: string, date: string}[]).map((review: {author: string, rating: number, text: string, date: string}, idx: number) => (
                    <div key={idx} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-bold text-gray-900">{review.author}</p>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Message Tab */}
            {activeTab === 'message' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Project Description</label>
                    <textarea 
                      rows={6}
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Tell this professional about your project..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition"
                  >
                    Send Message
                  </button>
                  <p className="text-sm text-gray-600 text-center">
                    You'll be able to message directly after creating an account
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
