'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { BarChart3, Users, Mail, MessageSquare, Settings, LogOut, Menu, X, Home, Briefcase, FileText, Star } from 'lucide-react'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L7gJaRj4UpH8UtsyC0GDHQ_6MV10N4u'
)

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [actualRole, setActualRole] = useState<string>('admin')
  const [viewingAsRole, setViewingAsRole] = useState<string>('admin')

  useEffect(() => {
    fetchUserRole()
    // Load saved viewing preference
    const savedView = localStorage.getItem('admin_viewing_as')
    if (savedView) {
      setViewingAsRole(savedView)
    }
  }, [])

  const fetchUserRole = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()
        
        if (profile?.role) {
          setActualRole(profile.role)
          setViewingAsRole(profile.role)
        }
      }
    } catch (error) {
      console.error('Error fetching role:', error)
    }
  }

  const switchViewAs = (role: string) => {
    setViewingAsRole(role)
    localStorage.setItem('admin_viewing_as', role)
    // Redirect to appropriate dashboard
    if (role === 'homeowner') {
      window.location.href = '/dashboard/homeowner'
    } else if (role === 'contractor') {
      window.location.href = '/dashboard/contractor'
    } else {
      window.location.href = '/dashboard'
    }
  }

  const isAdmin = actualRole === 'admin'
  const userRole = viewingAsRole

  // Navigation based on role
  const getNavigation = () => {
    if (userRole === 'homeowner') {
      return [
        { name: 'Dashboard', href: '/dashboard/homeowner', icon: Home },
        { name: 'My Projects', href: '/dashboard/homeowner/projects', icon: FileText },
        { name: 'Find Contractors', href: '/dashboard/contractors', icon: Users },
        { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
      ]
    } else if (userRole === 'contractor') {
      return [
        { name: 'Dashboard', href: '/dashboard/contractor', icon: Briefcase },
        { name: 'Available Jobs', href: '/dashboard/contractor/jobs', icon: FileText },
        { name: 'My Bids', href: '/dashboard/contractor/bids', icon: Mail },
        { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
        { name: 'My Profile', href: '/dashboard/contractor/profile', icon: Star },
      ]
    } else {
      // Admin
      return [
        { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        { name: 'Contractors', href: '/dashboard/contractors', icon: Users },
        { name: 'Campaigns', href: '/dashboard/campaigns', icon: Mail },
        { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
      ]
    }
  }

  const navigation = getNavigation()

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
          <button 
            onClick={async () => {
              await supabase.auth.signOut()
              window.location.href = '/login'
            }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-slate-800 hover:text-white transition"
          >
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
            {/* Admin Role Switcher */}
            {isAdmin && (
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-lg">
                <span className="text-xs font-medium text-slate-600">View as:</span>
                <select
                  value={viewingAsRole}
                  onChange={(e) => switchViewAs(e.target.value)}
                  className="text-sm font-semibold text-slate-900 bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value="admin">👑 Admin</option>
                  <option value="homeowner">🏠 Homeowner</option>
                  <option value="contractor">🔨 Contractor</option>
                </select>
              </div>
            )}
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
