'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { Users, TrendingUp, MessageSquare, Activity, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function DashboardPage() {
  const [metrics, setMetrics] = useState({
    totalContractors: 586,
    activeContractors: 342,
    campaignsRunning: 12,
    responseRate: 34.2,
    avgResponseTime: '2.4h',
    engagementTrend: 12
  })

  const [recentActivity] = useState([
    { id: 1, contractor: 'ABC Electrical', action: 'Opened email', time: '2 min ago', type: 'email' },
    { id: 2, contractor: 'Smith Roofing', action: 'Clicked link', time: '15 min ago', type: 'click' },
    { id: 3, contractor: 'Green HVAC', action: 'Replied to message', time: '1 hour ago', type: 'reply' },
    { id: 4, contractor: 'Elite Plumbing', action: 'Viewed profile', time: '3 hours ago', type: 'view' },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header */}
      <div className="border-b border-slate-200 sticky top-0 z-40 bg-white/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
            <p className="text-slate-600 mt-1">Welcome back. Here's your network activity.</p>
          </div>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition">
            + New Campaign
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: 'Total Contractors',
              value: metrics.totalContractors,
              icon: Users,
              change: '+2.4%',
              positive: true,
              color: 'blue'
            },
            {
              label: 'Active Contractors',
              value: metrics.activeContractors,
              icon: Activity,
              change: '+8.2%',
              positive: true,
              color: 'green'
            },
            {
              label: 'Response Rate',
              value: `${metrics.responseRate}%`,
              icon: TrendingUp,
              change: '+1.3%',
              positive: true,
              color: 'purple'
            },
            {
              label: 'Avg Response Time',
              value: metrics.avgResponseTime,
              icon: Calendar,
              change: '-0.2h',
              positive: true,
              color: 'orange'
            },
          ].map((card, i) => {
            const colorClasses = {
              blue: 'bg-blue-50 border-blue-200',
              green: 'bg-green-50 border-green-200',
              purple: 'bg-purple-50 border-purple-200',
              orange: 'bg-orange-50 border-orange-200'
            }
            const iconColorClasses = {
              blue: 'text-blue-600 bg-blue-100',
              green: 'text-green-600 bg-green-100',
              purple: 'text-purple-600 bg-purple-100',
              orange: 'text-orange-600 bg-orange-100'
            }

            return (
              <div key={i} className={`${colorClasses[card.color as keyof typeof colorClasses]} border rounded-xl p-6 hover:shadow-lg transition`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg ${iconColorClasses[card.color as keyof typeof iconColorClasses]}`}>
                    <card.icon size={24} />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-green-600">
                    <ArrowUpRight size={16} />
                    {card.change}
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-medium mb-1">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900">{card.value}</p>
              </div>
            )
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Activity</h2>
                <button className="text-slate-600 hover:text-slate-900 font-semibold text-sm">View All</button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-lg hover:bg-slate-50 transition">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold">
                        {item.contractor.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">{item.contractor}</p>
                        <p className="text-sm text-slate-600">{item.action}</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Campaigns */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Active Campaigns</h3>
              <p className="text-4xl font-bold text-slate-900 mb-2">{metrics.campaignsRunning}</p>
              <p className="text-sm text-slate-600">Campaigns currently running</p>
            </div>

            {/* Next Actions */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold mb-4">Next Actions</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  Review 5 pending responses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  Send follow-up emails
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  Schedule 3 meetings
                </li>
              </ul>
            </div>

            {/* Performance */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Performance</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Open Rate</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">68%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-2">Click Rate</p>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '34%' }}></div>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">34%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
