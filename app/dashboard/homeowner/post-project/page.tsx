'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, MapPin, Calendar, DollarSign } from 'lucide-react'

export default function PostProjectPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    budgetMin: '',
    budgetMax: '',
    timeline: '',
    location: '',
    photos: [] as File[]
  })

  const categories = [
    'Kitchen Remodel',
    'Bathroom Renovation',
    'Roofing',
    'HVAC',
    'Electrical',
    'Plumbing',
    'Painting',
    'Flooring',
    'Landscaping',
    'Other'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Project posted:', formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <Link href="/dashboard/homeowner" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Project</h1>
          <p className="text-gray-600 mt-1">Tell contractors about your project and get bids</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-8">
          {/* Project Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Kitchen Remodel in Downtown Area"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your project in detail. Include size, specific requirements, materials, timeline expectations, etc."
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Budget Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Min Budget *
              </label>
              <input
                type="number"
                value={formData.budgetMin}
                onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                placeholder="5000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Max Budget *
              </label>
              <input
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                placeholder="15000"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Desired Timeline *
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select timeline</option>
              <option value="asap">ASAP (Within 1 week)</option>
              <option value="1-2weeks">1-2 weeks</option>
              <option value="2-4weeks">2-4 weeks</option>
              <option value="1-2months">1-2 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Project Location *
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="City, State or ZIP code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          {/* Photos Upload */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Upload size={16} className="inline mr-1" />
              Project Photos (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
              <Upload size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB each</p>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="inline-block mt-4 px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 cursor-pointer transition"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm hover:shadow-md"
            >
              Post Project & Get Bids
            </button>
            <Link
              href="/dashboard/homeowner"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
