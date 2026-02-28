'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase-client'
import { useRouter, useSearchParams } from 'next/navigation'

type UserRole = 'homeowner' | 'contractor'

function SignupPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<UserRole>('homeowner')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for role query parameter and redirect to segment-specific signup
  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam === 'homeowner') {
      router.push('/signup/homeowner')
    } else if (roleParam === 'contractor') {
      router.push('/signup/contractor')
    }
  }, [searchParams, router])

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      
      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google')
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      })

      if (authError) {
        setError(authError.message)
        setLoading(false)
        return
      }

      // Create profile
      if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: authData.user.id,
          email,
          full_name: fullName,
          role,
        })

        if (profileError) {
          setError('Failed to create profile')
        } else {
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError('An error occurred during signup')
    } finally {
      setLoading(false)
    }
  }

  // Show role selection screen first
  const showRoleSelection = true

  if (showRoleSelection) {
    return (
      <div className="min-h-screen bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-lg mx-auto px-6 py-4">
            <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              ← Back to Home
            </Link>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-lg text-gray-600">First, let's set up your account for the right role</p>
          </div>

          <div className="grid gap-6">
            {/* Homeowner Option */}
            <button
              onClick={() => router.push('/signup/homeowner')}
              className="group text-left p-6 rounded-xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Homeowner</h3>
                  <p className="text-gray-600 mb-4">
                    Find and hire verified contractors for your home projects
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Post unlimited projects</li>
                    <li>✓ Get multiple bids</li>
                    <li>✓ Message contractors directly</li>
                  </ul>
                </div>
                <div className="text-blue-600 group-hover:text-blue-700 transition">→</div>
              </div>
            </button>

            {/* Contractor Option */}
            <button
              onClick={() => router.push('/signup/contractor')}
              className="group text-left p-6 rounded-xl border-2 border-gray-200 hover:border-teal-600 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">I'm a Contractor</h3>
                  <p className="text-gray-600 mb-4">
                    Grow your business and connect with quality home projects
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✓ Browse available projects</li>
                    <li>✓ Submit competitive bids</li>
                    <li>✓ Build your reputation</li>
                  </ul>
                </div>
                <div className="text-teal-600 group-hover:text-teal-700 transition">→</div>
              </div>
            </button>
          </div>

          <div className="mt-12 text-center text-sm text-gray-600">
            <p>Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link></p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">EZLY</h1>
          <p className="text-gray-600 text-center mb-6">Create an Account</p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                I am a:
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="homeowner">Homeowner</option>
                <option value="contractor">Contractor</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-500 font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3">
            <button 
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue with Google
            </button>
          </div>

          <p className="text-center text-gray-600 text-sm mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SignupPageContent />
    </Suspense>
  )
}
