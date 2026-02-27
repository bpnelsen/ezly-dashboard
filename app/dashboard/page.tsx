'use client'

export const dynamic = 'force-dynamic'

import { Users, TrendingUp, MessageSquare, Activity, ArrowUpRight, BarChart3 } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    { label: 'Total Contractors', value: '586', change: '+2.4%', icon: Users, color: 'blue' },
    { label: 'Active This Month', value: '342', change: '+8.2%', icon: Activity, color: 'green' },
    { label: 'Response Rate', value: '34.2%', change: '+1.3%', icon: TrendingUp, color: 'purple' },
    { label: 'Avg Response', value: '2.4h', change: '-0.2h', icon: BarChart3, color: 'orange' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's your network activity.</p>
            </div>
            <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm">
              + New Campaign
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => {
            const colorMap = {
              blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', iconBg: 'bg-blue-100' },
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Activity Feed */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                <button className="text-gray-600 hover:text-gray-900 text-sm font-semibold">View All</button>
              </div>

              <div className="space-y-4">
                {[
                  { name: 'ABC Electrical', action: 'Opened email campaign', time: '2 min ago', icon: '⚡' },
                  { name: 'Smith Roofing', action: 'Clicked campaign link', time: '15 min ago', icon: '🔗' },
                  { name: 'Green HVAC', action: 'Replied to message', time: '1 hour ago', icon: '💬' },
                  { name: 'Elite Plumbing', action: 'Viewed your profile', time: '3 hours ago', icon: '👁️' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                    <div className="text-2xl">{item.icon}</div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-600">{item.action}</p>
                    </div>
                    <p className="text-sm text-gray-500">{item.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Campaigns */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Active Campaigns</h3>
              <p className="text-4xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600 mt-2">Campaigns running</p>
            </div>

            {/* Performance */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Open Rate</span>
                    <span className="text-sm font-bold text-gray-900">68%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '68%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Click Rate</span>
                    <span className="text-sm font-bold text-gray-900">34%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-600" style={{ width: '34%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Next Actions</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                  Review 5 pending replies
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                  Send follow-up emails
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                  Schedule 3 meetings
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
