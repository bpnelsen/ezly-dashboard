'use client'

export const dynamic = 'force-dynamic'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">EZLY</h2>
        <nav className="space-y-4">
          <a href="/dashboard" className="block hover:text-blue-400">Dashboard</a>
          <a href="/dashboard/contractors" className="block hover:text-blue-400">Contractors</a>
          <a href="/dashboard/campaigns" className="block hover:text-blue-400">Campaigns</a>
          <a href="/dashboard/messages" className="block hover:text-blue-400">Messages</a>
          <a href="/dashboard/analytics" className="block hover:text-blue-400">Analytics</a>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  )
}
