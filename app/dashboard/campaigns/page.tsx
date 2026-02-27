'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Plus, Mail, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function CampaignsPage() {
  const campaigns = [
    {
      id: 1,
      name: 'Spring Outreach 2026',
      type: 'email',
      status: 'active',
      sent: 342,
      opened: 234,
      clicked: 89,
      progress: 68,
      startDate: 'Feb 1, 2026'
    },
    {
      id: 2,
      name: 'Q1 Partnership Drive',
      type: 'email',
      status: 'active',
      sent: 156,
      opened: 98,
      clicked: 34,
      progress: 45,
      startDate: 'Feb 15, 2026'
    },
    {
      id: 3,
      name: 'New Year Outreach',
      type: 'email',
      status: 'completed',
      sent: 500,
      opened: 340,
      clicked: 145,
      progress: 100,
      startDate: 'Jan 2, 2026'
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Campaigns</h1>
              <p className="text-gray-600 mt-1">Create and manage your outreach campaigns</p>
            </div>
            <Link href="/dashboard/campaigns/new" className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm flex items-center gap-2">
              <Plus size={18} />
              New Campaign
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Campaign List */}
        <div className="space-y-4">
          {campaigns.map((campaign) => (
            <div key={campaign.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-3 rounded-lg bg-blue-100">
                    <Mail className="text-blue-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{campaign.name}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {campaign.startDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={14} />
                        {campaign.sent} sent
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {campaign.status === 'active' && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      Active
                    </span>
                  )}
                  {campaign.status === 'completed' && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded-full">
                      Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Progress</span>
                  <span className="text-sm font-bold text-gray-900">{campaign.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${campaign.progress}%` }}></div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-4 mb-6 pb-6 border-b border-gray-100">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Open Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaign.sent > 0 ? Math.round((campaign.opened / campaign.sent) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Click Rate</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {campaign.sent > 0 ? Math.round((campaign.clicked / campaign.sent) * 100) : 0}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Opens</p>
                  <p className="text-2xl font-bold text-gray-900">{campaign.opened}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition">
                  View Details
                </button>
                <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition">
                  Edit
                </button>
                {campaign.status === 'active' && (
                  <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded transition">
                    Pause
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {campaigns.length === 0 && (
          <div className="text-center py-16">
            <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-6">No campaigns yet</p>
            <Link href="/dashboard/campaigns/new" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Create your first campaign
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
