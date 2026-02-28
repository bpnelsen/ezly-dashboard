'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { ArrowLeft, Star, Award, MapPin, Phone, Globe, Mail, Plus, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function ContractorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    businessName: 'Premium Renovations LLC',
    email: 'john@premiumrenovations.com',
    phone: '(801) 555-0123',
    website: 'www.premiumrenovations.com',
    bio: 'We specialize in high-end kitchen and bathroom renovations with over 15 years of experience.',
    location: 'Salt Lake City, UT',
    licenseNumber: 'UT-12345',
    yearsExperience: 15,
    rating: 4.8,
    reviews: 47
  })

  const [services, setServices] = useState([
    { id: 1, name: 'Kitchen Remodel', hourlyRate: 85, projects: 23 },
    { id: 2, name: 'Bathroom Renovation', hourlyRate: 75, projects: 18 },
    { id: 3, name: 'Cabinet Installation', hourlyRate: 65, projects: 12 }
  ])

  const [portfolio, setPortfolio] = useState([
    { id: 1, title: 'Modern Kitchen Renovation', category: 'Kitchen', rating: 5, image: '🏠' },
    { id: 2, title: 'Master Bath Update', category: 'Bathroom', rating: 5, image: '🛁' },
    { id: 3, title: 'Custom Cabinet Design', category: 'Cabinetry', rating: 4.5, image: '🪜' }
  ])

  const [reviews, setReviews] = useState([
    { id: 1, author: 'John D.', rating: 5, text: 'Excellent work! Very professional and on time.', date: '1 month ago' },
    { id: 2, author: 'Sarah M.', rating: 5, text: 'Highly recommend. Great communication throughout.', date: '2 months ago' },
    { id: 3, author: 'Mike T.', rating: 4, text: 'Good quality work. Minor delays but finished well.', date: '3 months ago' }
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto px-8 py-6">
          <Link href="/dashboard/contractor" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
            >
              {isEditing ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{profile.businessName}</h2>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Star size={16} className="text-yellow-400" />
                  <span className="font-semibold">{profile.rating}</span>
                  <span>({profile.reviews} reviews)</span>
                </div>
                <span>•</span>
                <span>{profile.yearsExperience} years experience</span>
              </div>
            </div>
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
              <Award size={40} className="text-blue-600" />
            </div>
          </div>

          <p className="text-gray-700 mb-6">{profile.bio}</p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="font-semibold text-gray-900">{profile.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">License</p>
              <p className="font-semibold text-gray-900">{profile.licenseNumber}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{profile.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{profile.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Website</p>
              <p className="font-semibold text-gray-900">{profile.website}</p>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Services & Rates</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
              <Plus size={18} />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-center">
                <div>
                  <p className="font-semibold text-gray-900">{service.name}</p>
                  <p className="text-sm text-gray-600">{service.projects} projects completed</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-blue-600">${service.hourlyRate}/hr</p>
                  <button className="p-2 text-gray-500 hover:text-blue-600 transition">
                    <Edit size={18} />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-red-600 transition">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Portfolio</h3>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition flex items-center gap-2">
              <Plus size={18} />
              Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolio.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 h-40 flex items-center justify-center text-5xl">
                  {project.image}
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900 mb-1">{project.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{project.category}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} className={i < project.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                      ))}
                    </div>
                    <button className="p-2 text-gray-500 hover:text-red-600 transition">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h3>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-gray-900">{review.author}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
