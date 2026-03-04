'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Camera } from 'lucide-react'

interface CompletionChecklist {
  id: string
  title: string
  description: string
  completed: boolean
}

export default function ProjectCompletionPage({ params }: { params: { id: string } }) {
  const [checklist, setChecklist] = useState<CompletionChecklist[]>([
    {
      id: '1',
      title: 'Demolition Complete',
      description: 'All old fixtures and materials removed',
      completed: true
    },
    {
      id: '2',
      title: 'Electrical Work Done',
      description: 'New wiring and outlets installed and inspected',
      completed: true
    },
    {
      id: '3',
      title: 'Cabinetry Installed',
      description: 'All cabinets and island installed',
      completed: true
    },
    {
      id: '4',
      title: 'Countertops & Backsplash',
      description: 'Granite counters and tile backsplash installed',
      completed: true
    },
    {
      id: '5',
      title: 'Appliances Installed',
      description: 'All new appliances connected and tested',
      completed: false
    },
    {
      id: '6',
      title: 'Final Inspection',
      description: 'All work inspected and code compliant',
      completed: false
    },
    {
      id: '7',
      title: 'Cleanup & Walkthrough',
      description: 'Final cleanup and walkthrough with homeowner',
      completed: false
    }
  ])

  const [finalNotes, setFinalNotes] = useState('')
  const [photos, setPhotos] = useState<string[]>([])
  const [invoiceAmount, setInvoiceAmount] = useState('12500')
  const [showSubmitModal, setShowSubmitModal] = useState(false)

  const completedCount = checklist.filter(c => c.completed).length
  const completionPercentage = Math.round((completedCount / checklist.length) * 100)

  const toggleChecklist = (id: string) => {
    setChecklist(checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const target = event.target as FileReader
          if (target?.result) {
            setPhotos(prev => [...prev, target.result as string])
          }
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index))
  }

  const handleSubmitCompletion = () => {
    if (completionPercentage < 100) {
      alert('Please complete all checklist items before submitting.')
      return
    }
    alert('Project marked as complete! Homeowner has been notified and will review your work.')
    setShowSubmitModal(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/dashboard/contractor/projects" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Complete Project</h1>
          <p className="text-gray-600 mt-1">Kitchen Remodel with Island • Denver, CO</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Completion Progress */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Completion Progress</h2>
                <span className="text-3xl font-bold text-blue-600">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full rounded-full transition-all duration-300"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {completedCount} of {checklist.length} items completed
              </p>
            </div>

            {/* Completion Checklist */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Work Completion Checklist</h2>
              <p className="text-sm text-gray-600 mb-6">Check off each item as it's completed. All items must be done before final submission.</p>

              <div className="space-y-3">
                {checklist.map(item => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                  >
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleChecklist(item.id)}
                      className="w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500 mt-1 cursor-pointer"
                    />
                    <div className="flex-1">
                      <p className={`font-semibold ${item.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    {item.completed && (
                      <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-1" />
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* Final Photos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Final Project Photos</h2>
              <p className="text-sm text-gray-600 mb-6">Upload before and after photos of your completed work</p>

              {/* Photo Preview */}
              {photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                  {photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition opacity-0 group-hover:opacity-100"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition">
                <Camera size={40} className="mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600 mb-2">Drag and drop photos here, or click to browse</p>
                <p className="text-sm text-gray-500 mb-4">PNG, JPG up to 10MB each</p>
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

            {/* Final Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Final Notes for Homeowner</h2>
              <p className="text-sm text-gray-600 mb-4">Any final details, maintenance tips, or warranty information</p>
              <textarea
                value={finalNotes}
                onChange={(e) => setFinalNotes(e.target.value)}
                placeholder="E.g., Maintenance schedule, warranty details, care instructions..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>

          {/* Right Column - Invoice & Summary */}
          <div>
            {/* Invoice Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Invoice Summary</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">Contract Amount:</span>
                  <span className="font-semibold text-gray-900">${invoiceAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Work Completed:</span>
                  <span className="font-semibold text-green-600">{completionPercentage}%</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span className="font-bold text-gray-900">Final Invoice:</span>
                  <span className="font-bold text-gray-900">${invoiceAmount}</span>
                </div>
              </div>

              {/* Warning if not 100% */}
              {completionPercentage < 100 && (
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 mb-6">
                  <div className="flex gap-2">
                    <AlertCircle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold">Not complete yet</p>
                      <p className="text-xs mt-1">Complete all checklist items before submitting</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Status */}
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
                <p className="text-sm text-blue-900">
                  <strong>Status:</strong> Ready for homeowner review{completionPercentage === 100 ? '.' : ' once all items are checked.'}
                </p>
              </div>

              {/* Submit Button */}
              <button
                onClick={() => setShowSubmitModal(true)}
                disabled={completionPercentage < 100}
                className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                  completionPercentage === 100
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                <CheckCircle size={18} />
                Mark as Complete
              </button>

              {/* Info */}
              <p className="text-xs text-gray-600 mt-4 text-center">
                Homeowner will review your work before approving payment
              </p>
            </div>

            {/* Payment Info */}
            <div className="bg-green-50 rounded-xl border border-green-200 p-6">
              <h3 className="font-bold text-green-900 mb-3">Payment Process</h3>
              <ol className="text-sm text-green-900 space-y-2">
                <li className="flex gap-2">
                  <span className="font-bold">1.</span>
                  <span>You mark project complete</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">2.</span>
                  <span>Homeowner reviews your work</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">3.</span>
                  <span>Homeowner approves & processes payment</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-bold">4.</span>
                  <span>Funds deposited to your account</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Mark Project as Complete?</h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Project</p>
                <p className="font-bold text-gray-900">Kitchen Remodel with Island</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Completion Progress</p>
                <p className="text-2xl font-bold text-green-600">{completionPercentage}%</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Invoice Amount</p>
                <p className="text-2xl font-bold text-gray-900">${invoiceAmount}</p>
              </div>

              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-900">
                  ✅ Once submitted, the homeowner will review your work and approve payment.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSubmitCompletion}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Yes, Mark Complete
              </button>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
