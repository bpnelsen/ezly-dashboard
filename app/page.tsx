import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">EZLY Dashboard</h1>
          <p className="text-xl text-blue-100">Contractor Management & Campaign Platform</p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-2xl font-bold mb-2">Contractor Database</h3>
            <p className="text-gray-600">Manage 586+ contractors with complete profiles and scraped data</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-4xl mb-4">📧</div>
            <h3 className="text-2xl font-bold mb-2">Campaigns</h3>
            <p className="text-gray-600">Create, send, and track email campaigns with real-time analytics</p>
          </div>
          
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-2xl font-bold mb-2">Messaging</h3>
            <p className="text-gray-600">Real-time communication with contractors and team members</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Link 
            href="/login"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
          >
            Sign In
          </Link>
          <Link 
            href="/signup"
            className="bg-blue-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-400 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}
