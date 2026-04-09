'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, MapPin, Calendar, DollarSign, X, Eye, Send } from 'lucide-react'

export default function PostProjectPage() {
  const [step, setStep] = useState<'form' | 'preview'>('form')
  const [currentSection, setCurrentSection] = useState(1)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    propertyType: '',
    sizeSqft: '',
    budgetMin: '',
    budgetMax: '',
    urgency: '',
    timeline: '',
    location: '',
    photos: [] as string[]
  })
  const [marketPriceEstimate, setMarketPriceEstimate] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const calculateEstimate = async () => {
    if (!formData.category || !formData.description) return
    
    setIsCalculating(true)
    try {
      // Simulate AI market price estimation API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      const mockEstimate = Math.floor(Math.random() * 5000) + 10000
      setMarketPriceEstimate(mockEstimate.toLocaleString())
    } catch (e) {
      console.error(e)
    } finally {
      setIsCalculating(false)
    }
  }

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

  const timelineOptions = [
    { value: 'asap', label: 'ASAP (Within 1 week)' },
    { value: '1-2weeks', label: '1-2 weeks' },
    { value: '2-4weeks', label: '2-4 weeks' },
    { value: '1-2months', label: '1-2 months' },
    { value: 'flexible', label: 'Flexible' }
  ]

  const validate = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Project title is required'
    if (!formData.category) newErrors.category = 'Category is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.urgency) newErrors.urgency = 'Urgency is required'
    if (!formData.timeline) newErrors.timeline = 'Timeline is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const target = event.target as FileReader
          if (target?.result) {
            setFormData(prev => ({
              ...prev,
              photos: [...prev.photos, target.result as string]
            }))
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }))
  }

  const handlePreview = () => {
    if (validate()) {
      setStep('preview')
    }
  }

  const handleSubmit = () => {
    // Save to database
    console.log('Project posted:', formData)
    alert('Project posted successfully! Contractors will start submitting bids.')
    // Redirect to projects page
    window.location.href = '/dashboard/homeowner/projects'
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-8 py-6">
            <button 
              onClick={() => setStep('form')}
              className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4 font-medium"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to Edit
            </button>
            <h1 className="text-3xl font-bold text-gray-900">Review Your Project</h1>
            <p className="text-gray-600 mt-1">Make sure everything looks good before posting</p>
          </div>
        </div>

        {/* Preview */}
        <div className="max-w-4xl mx-auto px-8 py-8">
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
            {/* Title & Category */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900">{formData.title}</h2>
                <span className="px-4 py-1 bg-navy-100 text-navy-700 rounded-full font-semibold text-sm">
                  {formData.category}
                </span>
              </div>
              <div className="flex items-center gap-4 text-gray-600 mb-6">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {formData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {timelineOptions.find(t => t.value === formData.timeline)?.label}
                </span>
              </div>
            </div>

            {/* Budget */}
            <div className="bg-navy-50 rounded-lg p-6 mb-8">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign size={20} />
                Budget Range
              </h3>
              <p className="text-2xl font-bold text-navy-600">
                ${parseInt(formData.budgetMin).toLocaleString()} - ${parseInt(formData.budgetMax).toLocaleString()}
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3">Project Details</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{formData.description}</p>
            </div>

            {/* Photos */}
            {formData.photos.length > 0 && (
              <div className="mb-8">
                <h3 className="font-bold text-gray-900 mb-4">Project Photos ({formData.photos.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-40 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <Send size={18} />
              Post Project & Get Bids
            </button>
            <button
              onClick={() => setStep('form')}
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-navy-50/20">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-8 py-6">
          <Link href="/dashboard/homeowner" className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Post a New Project</h1>
          <p className="text-gray-600 mt-1">Tell contractors about your project and get competitive bids</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-8 py-8">
        <form className="bg-white rounded-xl border border-gray-200 p-8 space-y-6">
          {/* Project Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Title <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Kitchen Remodel with Island"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Category <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                errors.category ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Project Description <span className="text-red-600">*</span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe your project: size, specific requirements, materials, what you're hoping to achieve, any challenges, timeline expectations..."
              rows={6}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition resize-none ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <p className="text-sm text-gray-500 mt-1">Detailed descriptions get more and better bids</p>
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Property Type & Size */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Property Type (Residential)
              </label>
              <select
                value={formData.propertyType}
                onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition"
              >
                <option value="">Select property type</option>
                <option value="single-family">Single Family Home</option>
                <option value="condo">Condo</option>
                <option value="townhome">Townhome</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Size (sq ft)
              </label>
              <input
                type="number"
                value={formData.sizeSqft}
                onChange={(e) => setFormData({...formData, sizeSqft: e.target.value})}
                placeholder="e.g., 1500"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition"
              />
            </div>
          </div>

          {/* Urgency */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              How urgent is this project? <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.urgency}
              onChange={(e) => setFormData({...formData, urgency: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                errors.urgency ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select urgency</option>
              <option value="standard">Standard - Not time sensitive</option>
              <option value="flexible">Flexible - Within a few weeks</option>
              <option value="soon">Soon - Need it done this month</option>
              <option value="urgent">Urgent - Need contractor ASAP</option>
              <option value="emergency">Emergency - Immediate need</option>
            </select>
            {errors.urgency && <p className="text-red-600 text-sm mt-1">{errors.urgency}</p>}
          </div>

          {/* Budget Range and AI Estimate */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Minimum Budget <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={formData.budgetMin}
                onChange={(e) => setFormData({...formData, budgetMin: e.target.value})}
                onBlur={calculateEstimate}
                placeholder="5000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                  errors.budgetMin ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.budgetMin && <p className="text-red-600 text-sm mt-1">{errors.budgetMin}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <DollarSign size={16} className="inline mr-1" />
                Maximum Budget <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                value={formData.budgetMax}
                onChange={(e) => setFormData({...formData, budgetMax: e.target.value})}
                onBlur={calculateEstimate}
                placeholder="15000"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                  errors.budgetMax ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.budgetMax && <p className="text-red-600 text-sm mt-1">{errors.budgetMax}</p>}
            </div>
          </div>
          
          {/* Market Intelligence AI Box */}
          {marketPriceEstimate && (
            <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-teal-100 p-2 rounded-full text-teal-700">
                <DollarSign size={24} />
              </div>
              <div>
                <h4 className="font-bold text-teal-800">AI Market Price Estimate</h4>
                <p className="text-teal-700 text-sm">
                  Based on similar projects in your area, the estimated market price is approximately 
                  <span className="font-bold ml-1">${marketPriceEstimate}</span>.
                </p>
              </div>
            </div>
          )}
          {isCalculating && (
            <div className="text-sm text-gray-500 italic animate-pulse">Calculating market estimate...</div>
          )}

          {/* Timeline */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Calendar size={16} className="inline mr-1" />
              Desired Timeline <span className="text-red-600">*</span>
            </label>
            <select
              value={formData.timeline}
              onChange={(e) => setFormData({...formData, timeline: e.target.value})}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                errors.timeline ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select timeline</option>
              {timelineOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.timeline && <p className="text-red-600 text-sm mt-1">{errors.timeline}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <MapPin size={16} className="inline mr-1" />
              Project Location <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              placeholder="City, State or ZIP code"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none transition ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.location && <p className="text-red-600 text-sm mt-1">{errors.location}</p>}
          </div>

          {/* Photos Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Upload size={16} className="inline mr-1" />
              Project Photos (Optional)
            </label>
            
            {/* Photo Preview */}
            {formData.photos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="relative">
                    <img
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-navy-400 transition">
              <Upload size={40} className="mx-auto text-gray-400 mb-3" />
              <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
              <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB each (upload up to 5 photos)</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label
                htmlFor="photo-upload"
                className="inline-block px-6 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 cursor-pointer transition"
              >
                Choose Files
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePreview}
              className="flex-1 py-3 bg-navy-600 text-white rounded-lg font-semibold hover:bg-navy-700 transition flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              <Eye size={18} />
              Preview & Post
            </button>
            <Link
              href="/dashboard/homeowner"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              Cancel
            </Link>
          </div>
        </form>

        {/* Help Section */}
        <div className="mt-8 bg-navy-50 rounded-xl p-6 border border-navy-200">
          <h3 className="font-bold text-navy-700 mb-3">💡 Tips for Getting Great Bids</h3>
          <ul className="text-sm text-navy-600 space-y-2">
            <li>✅ Be specific about what you need - details attract quality contractors</li>
            <li>✅ Upload photos if possible - visuals help contractors understand the scope</li>
            <li>✅ Set a realistic budget range - contractors are more likely to bid</li>
            <li>✅ Mention any constraints or preferences (materials, style, color, etc.)</li>
            <li>✅ The more information you provide, the better quotes you'll receive</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
