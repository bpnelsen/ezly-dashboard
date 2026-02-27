'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Save, Bell, Lock, Users, CreditCard, Trash2, ChevronRight } from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  const tabs = [
    { id: 'account', label: 'Account', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-semibold border-b-2 transition ${
                activeTab === tab.id
                  ? 'text-blue-600 border-blue-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Account Settings */}
        {activeTab === 'account' && (
          <div className="space-y-8">
            {/* Profile */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Brian Nelson"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue="brian@example.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                  <input
                    type="text"
                    defaultValue="Your Company Name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            </div>

            {/* Workspace */}
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Workspace</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Workspace Name</label>
                  <input
                    type="text"
                    defaultValue="My Workspace"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Timezone</label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900">
                    <option>America/Phoenix (MST)</option>
                    <option>America/Denver (MDT)</option>
                    <option>America/Chicago</option>
                    <option>America/New_York</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Settings */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { title: 'Email Notifications', desc: 'Receive updates via email' },
                { title: 'Campaign Updates', desc: 'Get notified when campaigns launch or complete' },
                { title: 'Message Alerts', desc: 'Alerts when you receive new messages' },
                { title: 'Weekly Digest', desc: 'Summary email of your activity' },
              ].map((notif, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{notif.title}</p>
                    <p className="text-sm text-gray-600">{notif.desc}</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Billing */}
        {activeTab === 'billing' && (
          <div className="bg-white rounded-xl border border-gray-200 p-8">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Billing & Subscription</h2>
            <div className="mb-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Current Plan</p>
                  <p className="text-2xl font-bold text-gray-900">Pro Plan</p>
                  <p className="text-sm text-gray-600 mt-2">$99/month • Renews Mar 27, 2026</p>
                </div>
                <button className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold">
                  Change Plan
                </button>
              </div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-4">Billing History</h3>
            <div className="space-y-2">
              {[
                { date: 'Feb 27, 2026', amount: '$99.00', status: 'Paid' },
                { date: 'Jan 27, 2026', amount: '$99.00', status: 'Paid' },
                { date: 'Dec 27, 2025', amount: '$99.00', status: 'Paid' },
              ].map((invoice, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                  <div>
                    <p className="font-medium text-gray-900">{invoice.date}</p>
                    <p className="text-sm text-gray-600">Invoice • {invoice.amount}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                      {invoice.status}
                    </span>
                    <button className="text-gray-600 hover:text-gray-900">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Security */}
        {activeTab === 'security' && (
          <div className="space-y-8">
            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Password</h2>
              <button className="px-6 py-2.5 border border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50 transition">
                Change Password
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Two-Factor Authentication</h2>
              <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
              <button className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Enable 2FA
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Delete Account</h2>
              <p className="text-gray-600 mb-4">Permanently delete your account and all associated data</p>
              <button className="px-6 py-2.5 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition flex items-center gap-2">
                <Trash2 size={18} />
                Delete Account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
