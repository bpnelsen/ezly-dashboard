'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { BarChart3, Users, TrendingUp, Settings, Lock } from 'lucide-react'

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy to-teal text-white">
        <div className="max-w-7xl mx-auto px-8 py-12">
          <h1 className="text-4xl font-bold mb-2">🔧 Admin Dashboard</h1>
          <p className="text-lg text-gray-100">Platform management & analytics</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">$247.5K</p>
            <p className="text-xs text-gray-600 mt-1">All time</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 font-medium">Active Projects</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
            <p className="text-xs text-gray-600 mt-1">Currently in progress</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 font-medium">Contractors</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">586</p>
            <p className="text-xs text-gray-600 mt-1">Registered & verified</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm text-gray-600 font-medium">Homeowners</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">89</p>
            <p className="text-xs text-gray-600 mt-1">Active users</p>
          </div>
        </div>

        {/* Admin Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Tools</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Analytics */}
            <Link href="/dashboard/admin/analytics" className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition">
                    <BarChart3 size={24} className="text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">Analytics</h3>
                </div>
                <p className="text-sm text-gray-600">View detailed platform metrics, revenue, and user statistics</p>
                <p className="text-xs text-blue-600 font-semibold mt-3">View Dashboard →</p>
              </div>
            </Link>

            {/* User Management */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Users size={24} className="text-purple-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">User Management</h3>
                </div>
                <p className="text-sm text-gray-600">Manage contractors and homeowners, verify accounts</p>
                <p className="text-xs text-gray-500 font-semibold mt-3">Coming Soon</p>
              </div>
            </div>

            {/* System Settings */}
            <div className="group">
              <div className="bg-white rounded-xl border border-gray-200 p-6 opacity-50 cursor-not-allowed">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <Settings size={24} className="text-gray-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Settings</h3>
                </div>
                <p className="text-sm text-gray-600">Configure platform settings and preferences</p>
                <p className="text-xs text-gray-500 font-semibold mt-3">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Documentation */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📚 Admin Documentation</h2>

          <div className="space-y-4">
            <div className="border-l-4 border-teal-500 pl-4">
              <h3 className="font-bold text-gray-900">Blog Automation</h3>
              <p className="text-sm text-gray-600 mt-1">Set up cron jobs for automated blog publishing</p>
              <div className="mt-2 p-3 bg-gray-100 rounded font-mono text-xs">
                bash scripts/setup-blog-cron.sh
              </div>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-bold text-gray-900">Social Media Automation</h3>
              <p className="text-sm text-gray-600 mt-1">Auto-post blog to LinkedIn & Facebook</p>
              <Link href="/SOCIAL_MEDIA_SETUP.md" className="text-teal-600 text-sm font-semibold hover:underline">
                View Setup Guide →
              </Link>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-bold text-gray-900">Platform Metrics</h3>
              <p className="text-sm text-gray-600 mt-1">Monitor revenue, projects, and user engagement</p>
              <Link href="/dashboard/admin/analytics" className="text-teal-600 text-sm font-semibold hover:underline">
                View Analytics →
              </Link>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-bold text-gray-900">Project Management</h3>
              <p className="text-sm text-gray-600 mt-1">Manage projects, bids, and contractor assignments</p>
              <p className="text-teal-600 text-sm font-semibold mt-1">✅ Live on dashboard</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
