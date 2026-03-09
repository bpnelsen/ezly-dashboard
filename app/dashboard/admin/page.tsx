'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BarChart3, Users, TrendingUp, Settings, Edit2, Save, X, AlertCircle, CheckCircle } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L7gJaRj4UpH8UtsyC0GDHQ_6MV10N4u'
)

interface PlatformStat {
  id: string
  stat_key: string
  stat_value: number
  stat_type: string
  description: string
}

interface PlatformSetting {
  id: string
  setting_key: string
  setting_value: string
  value_type: string
  description: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<PlatformStat[]>([])
  const [settings, setSettings] = useState<PlatformSetting[]>([])
  const [editingStats, setEditingStats] = useState<{ [key: string]: number }>({})
  const [editingSettings, setEditingSettings] = useState<{ [key: string]: string }>({})
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    
    const { data: statsData } = await supabase
      .from('platform_stats')
      .select('*')
    
    const { data: settingsData } = await supabase
      .from('platform_settings')
      .select('*')
    
    if (statsData) {
      setStats(statsData)
      const statEdits: { [key: string]: number } = {}
      statsData.forEach(stat => {
        statEdits[stat.stat_key] = stat.stat_value
      })
      setEditingStats(statEdits)
    }

    if (settingsData) {
      setSettings(settingsData)
      const settingEdits: { [key: string]: string } = {}
      settingsData.forEach(setting => {
        settingEdits[setting.setting_key] = setting.setting_value
      })
      setEditingSettings(settingEdits)
    }

    setLoading(false)
  }

  const saveChanges = async () => {
    try {
      // Update stats
      for (const stat of stats) {
        const newValue = editingStats[stat.stat_key]
        if (newValue !== stat.stat_value) {
          await supabase
            .from('platform_stats')
            .update({ stat_value: newValue, updated_at: new Date().toISOString() })
            .eq('id', stat.id)
        }
      }

      // Update settings
      for (const setting of settings) {
        const newValue = editingSettings[setting.setting_key]
        if (newValue !== setting.setting_value) {
          await supabase
            .from('platform_settings')
            .update({ setting_value: newValue, updated_at: new Date().toISOString() })
            .eq('id', setting.id)
        }
      }

      setIsEditMode(false)
      setMessage({ type: 'success', text: 'Changes saved successfully!' })
      setTimeout(() => setMessage(null), 3000)
      
      // Refresh data
      fetchData()
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save changes' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const cancelChanges = () => {
    setIsEditMode(false)
    fetchData()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value)
  }

  if (loading) {
    return <div className="p-8 text-center">Loading admin dashboard...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-500 to-teal-500 text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">🔧 Admin Dashboard</h1>
              <p className="text-lg text-gray-100">Platform management & editable analytics</p>
            </div>
            {!isEditMode && (
              <button
                onClick={() => setIsEditMode(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white text-navy-500 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                <Edit2 size={20} />
                Edit Data
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Message Alerts */}
      {message && (
        <div className={`max-w-7xl mx-auto px-8 py-4 mt-4 rounded-lg flex items-center gap-3 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-800' 
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Edit Controls */}
        {isEditMode && (
          <div className="bg-navy-50 border-2 border-navy-200 rounded-xl p-6 mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle size={24} className="text-navy-600" />
              <span className="font-semibold text-navy-700">Edit Mode Enabled - Changes will be saved to Supabase</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={saveChanges}
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition"
              >
                <Save size={20} />
                Save All Changes
              </button>
              <button
                onClick={cancelChanges}
                className="flex items-center gap-2 px-6 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Platform Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📊 Platform Statistics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {stats.map(stat => (
              <div key={stat.id} className={`rounded-xl border p-6 transition ${
                isEditMode ? 'bg-navy-50 border-navy-200' : 'bg-white border-gray-200'
              }`}>
                <p className="text-sm text-gray-600 font-medium">{stat.description}</p>
                {isEditMode ? (
                  <input
                    type="number"
                    value={editingStats[stat.stat_key]}
                    onChange={(e) => setEditingStats({
                      ...editingStats,
                      [stat.stat_key]: parseFloat(e.target.value) || 0
                    })}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500"
                  />
                ) : (
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.stat_type === 'currency' 
                      ? formatCurrency(stat.stat_value)
                      : stat.stat_type === 'number'
                      ? stat.stat_value
                      : stat.stat_value}
                    {stat.stat_type === 'number' && stat.description.includes('%') ? '%' : ''}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Platform Settings */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">⚙️ Platform Settings</h2>
          
          <div className="space-y-4">
            {settings.map(setting => (
              <div key={setting.id} className={`rounded-xl border p-6 transition ${
                isEditMode ? 'bg-navy-50 border-navy-200' : 'bg-white border-gray-200'
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 font-semibold">{setting.description}</p>
                    <p className="text-xs text-gray-500 mt-1">Key: {setting.setting_key}</p>
                  </div>
                  {isEditMode ? (
                    <input
                      type={setting.value_type === 'number' ? 'number' : 'text'}
                      value={editingSettings[setting.setting_key]}
                      onChange={(e) => setEditingSettings({
                        ...editingSettings,
                        [setting.setting_key]: e.target.value
                      })}
                      className="ml-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 min-w-[200px]"
                    />
                  ) : (
                    <p className="ml-4 text-lg font-semibold text-navy-500">{setting.setting_value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">🛠️ Admin Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Analytics */}
            <Link href="/dashboard/admin/analytics" className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-navy-100 rounded-lg group-hover:bg-navy-200 transition">
                    <BarChart3 size={24} className="text-navy-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-navy-600 transition">Analytics</h3>
                </div>
                <p className="text-sm text-gray-600">View detailed platform metrics, revenue, and user statistics</p>
                <p className="text-xs text-navy-600 font-semibold mt-3">View Dashboard →</p>
              </div>
            </Link>

            {/* Market Intelligence */}
            <Link href="/dashboard/admin/market-intelligence" className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition">
                    <TrendingUp size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition">Market Intelligence</h3>
                </div>
                <p className="text-sm text-gray-600">Manage market data, pricing, and contractor insights</p>
                <p className="text-xs text-purple-600 font-semibold mt-3">View Data →</p>
              </div>
            </Link>

            {/* System Settings */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Settings size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Platform Settings</h3>
                </div>
                <p className="text-sm text-gray-600">Edit above ↑ or use the Edit Data button</p>
                <p className="text-xs text-green-600 font-semibold mt-3">Configured</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
