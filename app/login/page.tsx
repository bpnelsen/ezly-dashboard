'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => setLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/20 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <div className="text-3xl font-bold text-gray-900">EZLY</div>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-gray-900">Password</label>
                <Link href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            {/* Remember Me */}
            <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
              <span className="text-sm">Remember me</span>
            </label>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
            >
              {loading ? 'Signing in...' : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition font-medium">
              Google
            </button>
            <button className="w-full py-3 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition font-medium">
              Facebook
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-gray-600 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
