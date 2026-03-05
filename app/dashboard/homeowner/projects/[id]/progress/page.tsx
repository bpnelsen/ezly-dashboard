'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, MessageCircle, CheckCircle, AlertCircle, Camera, Phone, Zap } from 'lucide-react'

interface ProgressUpdate {
  id: string
  date: string
  title: string
  description: string
  status: 'completed' | 'in-progress' | 'upcoming'
  photos?: string[]
}

interface Message {
  id: string
  from: string
  role: 'homeowner' | 'contractor'
  message: string
  timestamp: string
  photo?: string
}

export default function ProjectProgressPage({ params }: { params: { id: string } }) {
  const [showPhotoUpload, setShowPhotoUpload] = useState(false)
  const [newMessage, setNewMessage] = useState('')

  // Mock project data
  const project = {
    id: params.id,
    title: 'Kitchen Remodel with Island',
    contractor: 'Elite Kitchen Renovations',
    startDate: '2026-03-10',
    endDate: '2026-04-14',
    budget: 12500,
    progress: 35,
    status: 'in-progress'
  }

  // Mock progress updates
  const progressUpdates: ProgressUpdate[] = [
    {
      id: '1',
      date: '2026-03-10',
      title: 'Project Started',
      description: 'Demolition and site preparation complete. All old cabinets and countertops removed.',
      status: 'completed',
      photos: ['demo1.jpg', 'demo2.jpg']
    },
    {
      id: '2',
      date: '2026-03-18',
      title: 'Electrical Work Complete',
      description: 'New electrical outlets and wiring installed. Ready for cabinetry.',
      status: 'completed',
      photos: ['electrical.jpg']
    },
    {
      id: '3',
      date: '2026-03-25',
      title: 'Cabinetry Installation',
      description: 'Custom cabinets and island installation in progress. Expected completion March 28.',
      status: 'in-progress',
      photos: ['cabinets1.jpg', 'cabinets2.jpg']
    },
    {
      id: '4',
      date: '2026-04-05',
      title: 'Countertop Installation',
      description: 'Granite countertops and tile backsplash installation.',
      status: 'upcoming'
    },
    {
      id: '5',
      date: '2026-04-14',
      title: 'Final Touches & Cleanup',
      description: 'Appliance installation, final inspections, and cleanup.',
      status: 'upcoming'
    }
  ]

  // Mock messages
  const messages: Message[] = [
    {
      id: '1',
      from: 'Elite Kitchen Renovations',
      role: 'contractor',
      message: 'Good morning! Demolition work is complete. We\'re on schedule. Check the project progress for photos.',
      timestamp: '2026-03-18 09:30'
    },
    {
      id: '2',
      from: 'You',
      role: 'homeowner',
      message: 'Looks great! Can you make sure the new island electrical is all properly grounded?',
      timestamp: '2026-03-18 10:15'
    },
    {
      id: '3',
      from: 'Elite Kitchen Renovations',
      role: 'contractor',
      message: 'Absolutely! All electrical work meets code requirements and has been inspected. You\'re all set.',
      timestamp: '2026-03-18 10:45'
    }
  ]

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      console.log('Message sent:', newMessage)
      setNewMessage('')
    }
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
          <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
          <p className="text-gray-600 mt-1">Contractor: {project.contractor}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Bar */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Project Progress</h2>
                <span className="text-2xl font-bold text-navy-600">{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-navy-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-600 font-medium">START DATE</p>
                  <p className="text-gray-900 font-semibold mt-1">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">END DATE</p>
                  <p className="text-gray-900 font-semibold mt-1">{new Date(project.endDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">BUDGET</p>
                  <p className="text-gray-900 font-semibold mt-1">${project.budget.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Project Timeline</h2>

              <div className="space-y-6">
                {progressUpdates.map((update, index) => {
                  const Icon = update.status === 'completed' ? CheckCircle : update.status === 'in-progress' ? AlertCircle : Zap
                  const color = update.status === 'completed' ? 'text-green-600' : update.status === 'in-progress' ? 'text-navy-600' : 'text-gray-400'

                  return (
                    <div key={update.id} className="relative pb-6">
                      {/* Timeline line */}
                      {index !== progressUpdates.length - 1 && (
                        <div className={`absolute left-6 top-12 w-0.5 h-12 ${
                          update.status === 'completed' ? 'bg-green-200' : 'bg-gray-200'
                        }`} />
                      )}

                      {/* Timeline item */}
                      <div className="flex gap-4">
                        <Icon className={`w-6 h-6 ${color} flex-shrink-0 mt-1`} />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900">{update.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">
                            {new Date(update.date).toLocaleDateString()}
                          </p>
                          <p className="text-gray-700 mt-2">{update.description}</p>

                          {/* Photos */}
                          {update.photos && update.photos.length > 0 && (
                            <div className="mt-3 grid grid-cols-2 gap-2">
                              {update.photos.map((photo, idx) => (
                                <div
                                  key={idx}
                                  className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-gray-500"
                                >
                                  <Camera size={24} />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Messages */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>

              {/* Message List */}
              <div className="space-y-4 mb-6 h-96 overflow-y-auto">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-lg ${
                      msg.role === 'homeowner'
                        ? 'bg-navy-50 border border-navy-200 ml-12'
                        : 'bg-gray-100 border border-gray-200 mr-12'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <p className="font-semibold text-gray-900">{msg.from}</p>
                      <p className="text-xs text-gray-600">{msg.timestamp}</p>
                    </div>
                    <p className="text-gray-700 mt-2">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex gap-3 mb-3">
                  <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition">
                    <Camera size={20} />
                  </button>
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent outline-none"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-navy-600 text-white rounded-lg font-medium hover:bg-navy-700 transition"
                  >
                    Send
                  </button>
                </div>
                <p className="text-xs text-gray-500">Attach photos with the camera icon</p>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Actions */}
          <div>
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="font-bold text-gray-900 mb-4">Project Status</h3>

              <div className="space-y-4">
                {/* Status Badge */}
                <div className="p-4 bg-navy-50 rounded-lg border border-navy-200">
                  <p className="text-sm text-navy-600 font-medium">IN PROGRESS</p>
                  <p className="text-2xl font-bold text-navy-700 mt-1">{project.progress}%</p>
                </div>

                {/* Contractor Contact */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="text-sm text-gray-600 font-medium mb-3">CONTRACTOR</p>
                  <p className="font-bold text-gray-900">{project.contractor}</p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 px-3 py-2 bg-navy-100 text-navy-700 rounded-lg text-sm font-medium hover:bg-navy-200 transition flex items-center justify-center gap-1">
                      <Phone size={16} />
                      Call
                    </button>
                    <button className="flex-1 px-3 py-2 bg-navy-100 text-navy-700 rounded-lg text-sm font-medium hover:bg-navy-200 transition flex items-center justify-center gap-1">
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="space-y-2 p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Budget Used</span>
                    <span className="font-bold text-gray-900">$4,375 / $12,500</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: '35%' }} />
                  </div>
                  <p className="text-xs text-gray-600 mt-2">35% of budget used</p>
                </div>

                {/* Actions */}
                <button className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg font-medium hover:bg-red-50 transition">
                  Report an Issue
                </button>
                <button className="w-full px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                  Leave Review (When Complete)
                </button>
              </div>

              {/* Help */}
              <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-900">
                  📸 <strong>Tip:</strong> Take photos of completed work and upload them here to track progress.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
