
'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, TrendingUp, MessageSquare, Activity, ArrowUpRight, BarChart3 } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

export default function DashboardPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [contractorCount, setContractorCount] = useState(0)
  const [stats, setStats] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      // Get counts
      const { count } = await supabase.from('contractors').select('*', { count: 'exact', head: true })
      setContractorCount(count || 0)
      setStats([
        { label: 'Total Contractors', value: (count || 0).toLocaleString(), change: '+2.4%', icon: Users, color: 'blue' },
        { label: 'Active This Month', value: '342', change: '+8.2%', icon: Activity, color: 'green' },
        { label: 'Response Rate', value: '34.2%', change: '+1.3%', icon: TrendingUp, color: 'purple' },
        { label: 'Avg Response', value: '2.4h', change: '-0.2h', icon: BarChart3, color: 'orange' },
      ])
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-navy-50/30">
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <Link href="/" className="text-sm font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 mb-2">
                ← Back to Home
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your network activity.</p>
            </div>
            <button className="px-6 py-2.5 bg-navy-600 text-white rounded-lg font-semibold hover:bg-navy-700 transition shadow-sm">
              + New Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const colorMap = {
              blue: { bg: 'bg-navy-50', border: 'border-navy-200', icon: 'text-navy-600', iconBg: 'bg-navy-100' },
              green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', iconBg: 'bg-green-100' },
              purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', iconBg: 'bg-purple-100' },
              orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', iconBg: 'bg-orange-100' }
            }
            const colors = colorMap[stat.color as keyof typeof colorMap]

            return (
              <div key={i} className={`${colors.bg} border ${colors.border} rounded-xl p-6 hover:shadow-md transition`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`${colors.iconBg} ${colors.icon} p-3 rounded-lg`}>
                    <stat.icon size={24} />
                  </div>
                  <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                    <ArrowUpRight size={16} />
                    {stat.change}
                  </span>
                </div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
