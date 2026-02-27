'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { BarChart3, Users, Mail, MessageSquare, Settings, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Contractors', href: '/dashboard/contractors', icon: Users },
    { name: 'Campaigns', href: '/dashboard/campaigns', icon: Mail },
    { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  ]

  const bottomNavigation = [
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-900 text-white transition-all duration-300 flex flex-col border-r border-slate-800`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          {sidebarOpen && <span className="text-2xl font-bold">EZLY</span>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 hover:bg-slate-800 rounded">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition group"
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium group-hover:text-white">{item.name}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Navigation */}
        <nav className="px-3 py-6 border-t border-slate-800 space-y-2">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
            >
              <item.icon size={20} />
              {sidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          ))}
          <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition">
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Sign Out</span>}
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div>
            <h2 className="text-slate-900 text-sm font-semibold">EZLY Platform</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold hover:bg-slate-200 transition">
              A
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
