'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, AlertCircle, X, MessageCircle, Download, Star, Flag } from 'lucide-react'

interface ProjectReview {
  id: string
  title: string
  contractor: string
  contractorRating: number
  status: 'ready-for-review' | 'approved' | 'paid'
  completionDate: string
  invoiceAmount: number
  finalPhotos: string[]
  finalNotes: string
  completionChecklist: Array<{
    item: string
    completed: boolean
  }>
}

export default function ProjectReviewPage({ params }: { params: { id: string } }) {
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const project: ProjectReview = {
    id: params.id,
    title: 'Kitchen Remodel with Island',
    contractor: 'Elite Kitchen Renovations',
    contractorRating: 4.8,
    status: 'ready-for-review',
    completionDate: '2026-04-14',
    invoiceAmount: 12500,
    finalPhotos: ['photo1.jpg', 'photo2.jpg', 'photo3.jpg', 'photo4.jpg'],
    finalNotes: 'Your kitchen is now complete! Here are some maintenance tips: Clean and condition wood monthly. Use pH-neutral cleaners on granite. Check grout lines quarterly for moisture. Your appliances come with 1-year warranties. Thank you for choosing us!',
    completionChecklist: [
      { item: 'Demolition Complete', completed: true },
      { item: 'Electrical Work Done', completed: true },
      { item: 'Cabinetry Installed', completed: true },
      { item: 'Countertops & Backsplash', completed: true },
      { item: 'Appliances Installed', completed: true },
      { item: 'Final Inspection', completed: true },
      { item: 'Cleanup & Walkthrough', completed: true }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/dashboard/homeowner/projects" className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-4 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Review Completed Work</h1>
          <p className="text-gray-600 mt-1">{project.title} • {project.contractor}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Status Alert */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6 flex items-start gap-3">
              <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <h2 className="font-bold text-green-900">Project Marked Complete</h2>
                <p className="text-sm text-green-800 mt-1">
                  {project.contractor} has completed all work. Please review the photos and work quality below.
                </p>
              </div>
            </div>

            {/* Project Photos */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Final Photos</h2>
              
              {selectedPhoto && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
                  <div className="relative max-w-2xl w-full">
                    <img src={selectedPhoto} alt="Full size" className="w-full rounded-lg" />
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100"
                    >
                      <X size={24} />
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                {project.finalPhotos.map((photo, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedPhoto(photo)}
                    className="relative group overflow-hidden rounded-lg"
                  >
                    <div className="bg-gray-300 h-48 flex items-center justify-center">
                      <span className="text-gray-600">Photo {index + 1}</span>
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-25 transition flex items-center justify-center">
                      <span className="text-white opacity-0 group-hover:opacity-100 font-semibold">Click to view</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Completion Checklist */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Work Completion Checklist</h2>
              
              <div className="space-y-2">
                {project.completionChecklist.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 px-3 hover:bg-gray-50 rounded">
                    {item.completed ? (
                      <CheckCircle size={20} className="text-green-600" />
                    ) : (
                      <AlertCircle size={20} className="text-red-600" />
                    )}
                    <span className={item.completed ? 'text-gray-900' : 'text-red-900'}>
                      {item.item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contractor Notes */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contractor Notes</h2>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-700">{project.finalNotes}</p>
              </div>
            </div>

            {/* Quality Assessment */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quality Assessment</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    How would you rate the quality of work? <span className="text-red-600">*</span>
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`px-4 py-2 rounded-lg font-semibold transition ${
                          rating >= star
                            ? 'bg-yellow-400 text-white'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                      >
                        {'★'.repeat(star)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Leave a review (optional)
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="Tell other homeowners about your experience..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Issues Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Any Issues?</h2>
              
              <p className="text-sm text-gray-600 mb-4">
                If there are any issues with the completed work, please let us know before approving payment.
              </p>

              <button
                onClick={() => setShowDisputeModal(true)}
                className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center gap-2"
              >
                <Flag size={18} />
                Report an Issue
              </button>
            </div>
          </div>

          {/* Right Column - Payment Summary */}
          <div>
            {/* Invoice Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6 mb-6">
              <h3 className="font-bold text-gray-900 mb-4">Invoice Review</h3>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Contractor</p>
                  <p className="font-semibold text-gray-900 mt-1">{project.contractor}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < Math.floor(project.contractorRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">{project.contractorRating}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="font-semibold text-gray-900 mt-1">
                    {new Date(project.completionDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">Invoice Amount</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    ${project.invoiceAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Approval Status */}
              <div className="p-4 bg-green-50 rounded-lg border border-green-200 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={18} className="text-green-600" />
                  <p className="font-semibold text-green-900">Ready for Payment</p>
                </div>
                <p className="text-xs text-green-800">
                  All work is complete and ready for approval
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
                >
                  Approve & Pay ${project.invoiceAmount.toLocaleString()}
                </button>

                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <MessageCircle size={18} />
                  Message Contractor
                </button>

                <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2">
                  <Download size={18} />
                  Download Invoice
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-navy-50 rounded-xl border border-navy-200 p-6">
              <h3 className="font-bold text-navy-700 mb-3">Payment Security</h3>
              <ul className="text-sm text-navy-700 space-y-2">
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Your payment is secure & encrypted</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Review work before payment</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>Contractor paid after approval</span>
                </li>
                <li className="flex gap-2">
                  <span>✓</span>
                  <span>You can report issues anytime</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Approve & Process Payment</h3>

            <div className="space-y-4 mb-6">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Project</p>
                <p className="font-bold text-gray-900">{project.title}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Contractor</p>
                <p className="font-bold text-gray-900">{project.contractor}</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-gray-600">Amount to Pay</p>
                <p className="text-2xl font-bold text-green-600">${project.invoiceAmount.toLocaleString()}</p>
              </div>

              <div className="p-4 bg-navy-50 rounded-lg">
                <p className="text-sm text-navy-700">
                  ✓ By approving, you confirm the work is complete and satisfactory.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Payment approved! Proceeding to payment method selection.')
                  setShowPaymentModal(false)
                }}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Approve & Pay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dispute Modal */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Report an Issue</h3>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  What's the issue? <span className="text-red-600">*</span>
                </label>
                <textarea
                  placeholder="Describe the issue in detail..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900">
                  Our support team will contact both you and the contractor to resolve this issue.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDisputeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Issue reported! Support team has been notified.')
                  setShowDisputeModal(false)
                }}
                className="flex-1 px-4 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
