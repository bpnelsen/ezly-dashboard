'use client'

export const dynamic = 'force-dynamic'

'use client'

export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'

export default function DashboardPage() {
  const [stats, setStats] = useState({
    contractors: 0,
    campaigns: 0,
    messages: 0,
    analytics: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadStats = async () => {
      try {
        const { data: session } = await supabase.auth.getSession()
        if (!session.session) return

        // Get contractor count
        const { count: contractorCount } = await supabase
          .from('contractors')
          .select('*', { count: 'exact', head: true })

        // Get campaign count
        const { count: campaignCount } = await supabase
          .from('campaigns')
          .select('*', { count: 'exact', head: true })
          .eq('owner_id', session.session.user.id)

        setStats({
          contractors: contractorCount || 0,
          campaigns: campaignCount || 0,
          messages: 0,
          analytics: 0,
        })
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  const cards = [
    { label: 'Total Contractors', value: stats.contractors, icon: '👥', color: 'blue' },
    { label: 'Active Campaigns', value: stats.campaigns, icon: '📧', color: 'green' },
    { label: 'New Messages', value: stats.messages, icon: '💬', color: 'purple' },
    { label: 'Total Analytics', value: stats.analytics, icon: '📈', color: 'orange' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome to EZLY</h1>
        <p className="text-gray-600 mt-2">Manage your contractors and campaigns efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loading ? '...' : card.value}
                </p>
              </div>
              <span className="text-4xl">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors">
            <p className="font-medium text-blue-900">➕ Add New Contractor</p>
            <p className="text-sm text-blue-600">Import or manually add a contractor</p>
          </button>
          <button className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:bg-green-50 transition-colors">
            <p className="font-medium text-green-900">✉️ Create Campaign</p>
            <p className="text-sm text-green-600">Start a new email or SMS campaign</p>
          </button>
        </div>
      </div>
    </div>
  )
}
