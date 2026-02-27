'use client'

export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

interface AnalyticsData {
  total_campaigns: number
  total_sent: number
  total_opened: number
  average_open_rate: number
  total_contractors: number
  active_contractors: number
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    total_campaigns: 0,
    total_sent: 0,
    total_opened: 0,
    average_open_rate: 0,
    total_contractors: 0,
    active_contractors: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) return

      // Load campaign stats
      const { data: campaigns } = await supabase
        .from('campaigns')
        .select('*')
        .eq('owner_id', session.session.user.id)

      // Load contractor stats
      const { count: totalContractors } = await supabase
        .from('contractors')
        .select('*', { count: 'exact', head: true })

      const totalSent = campaigns?.reduce((acc, c) => acc + (c.sent_count || 0), 0) || 0
      const totalOpened = campaigns?.reduce((acc, c) => acc + (c.opened_count || 0), 0) || 0
      const averageOpenRate = totalSent > 0 ? (totalOpened / totalSent) * 100 : 0

      setAnalytics({
        total_campaigns: campaigns?.length || 0,
        total_sent: totalSent,
        total_opened: totalOpened,
        average_open_rate: averageOpenRate,
        total_contractors: totalContractors || 0,
        active_contractors: Math.ceil((totalContractors || 0) * 0.7), // Estimate
      })
    } finally {
      setLoading(false)
    }
  }

  const cards = [
    { label: 'Total Campaigns', value: analytics.total_campaigns, icon: '📧' },
    { label: 'Total Emails Sent', value: analytics.total_sent, icon: '✉️' },
    { label: 'Total Emails Opened', value: analytics.total_opened, icon: '👁️' },
    { label: 'Average Open Rate', value: `${analytics.average_open_rate.toFixed(1)}%`, icon: '📊' },
    { label: 'Total Contractors', value: analytics.total_contractors, icon: '👥' },
    { label: 'Active Contractors', value: analytics.active_contractors, icon: '✅' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600 mt-2">Track your campaigns and contractor engagement</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.label} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm">{card.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                  </div>
                  <span className="text-4xl">{card.icon}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Campaign Performance</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Campaigns:</span>
                  <span className="font-medium">{analytics.total_campaigns}</span>
                </div>
                <div className="flex justify-between">
                  <span>Emails Sent:</span>
                  <span className="font-medium">{analytics.total_sent}</span>
                </div>
                <div className="flex justify-between">
                  <span>Opened:</span>
                  <span className="font-medium">{analytics.total_opened}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${Math.min(analytics.average_open_rate, 100)}%`,
                    }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  Open Rate: {analytics.average_open_rate.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contractor Insights</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Total Contractors:</span>
                  <span className="font-medium">{analytics.total_contractors}</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Contractors:</span>
                  <span className="font-medium">{analytics.active_contractors}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${
                        analytics.total_contractors > 0
                          ? (analytics.active_contractors / analytics.total_contractors) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-gray-600">
                  Activity Rate:{' '}
                  {analytics.total_contractors > 0
                    ? (
                        (analytics.active_contractors / analytics.total_contractors) *
                        100
                      ).toFixed(1)
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
