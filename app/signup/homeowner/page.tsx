'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

export default function HomeownerSignup() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    homeLocation: '',
    projectType: [] as string[],
    homeType: '',
    howDidYouHear: ''
  })

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')

    try {
      const { data, error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=homeowner`,
        },
      })

      if (authError) {
        setError(authError.message)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up with Google')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        projectType: checked 
          ? [...prev.projectType, value]
          : prev.projectType.filter(t => t !== value)
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')

    try {
      // Sign up with Supabase Auth
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            phone: formData.phone,
            role: 'homeowner'
          }
        }
      })

      if (authError) {
        setError(authError.message)
        return
      }

      // Redirect to dashboard
      window.location.href = '/dashboard/homeowner'
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const projectTypes = [
    'Kitchen Remodel',
    'Bathroom Renovation',
    'Roofing',
    'Electrical',
    'HVAC',
    'Flooring',
    'Painting',
    'Landscaping',
    'Plumbing',
    'General Maintenance'
  ]

  const homeTypes = [
    'Single Family Home',
    'Condo/Apartment',
    'Townhouse',
    'Multi-Family',
    'Commercial Property'
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-lg mx-auto px-6 py-4">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-lg mx-auto px-6 py-16">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">EZLY</h1>
          <p className="text-gray-600 mt-1">Find & hire verified contractors</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex gap-2">
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          </div>
          <p className="text-sm text-gray-600 mt-4">Step {step} of 3</p>
        </div>

        {/* Step 1: Email & Password */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h2>
              <p className="text-gray-600">Enter your email and create a password</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
              <p className="text-xs text-gray-500 mt-2">At least 8 characters</p>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.email || formData.password.length < 8}
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Personal Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600">Help us personalize your experience</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Smith"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Home Location</label>
              <input
                type="text"
                name="homeLocation"
                value={formData.homeLocation}
                onChange={handleChange}
                placeholder="City, State"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.fullName}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Project Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What Projects Interest You?</h2>
              <p className="text-gray-600">This helps us find the right contractors for you</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">Types of Projects (Select any that apply)</label>
              <div className="grid grid-cols-2 gap-3">
                {projectTypes.map(type => (
                  <label key={type} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="checkbox"
                      name="projectType"
                      value={type}
                      checked={formData.projectType.includes(type)}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type of Property</label>
              <select
                name="homeType"
                value={formData.homeType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              >
                <option value="">Select property type...</option>
                {homeTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">How did you hear about us?</label>
              <select
                name="howDidYouHear"
                value={formData.howDidYouHear}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
              >
                <option value="">Select...</option>
                <option value="google">Google Search</option>
                <option value="social">Social Media</option>
                <option value="referral">Friend Referral</option>
                <option value="contractor">Contractor Referred</option>
                <option value="other">Other</option>
              </select>
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:border-gray-400 transition"
              >
                Back
              </button>
              <button
                onClick={handleSignup}
                disabled={loading}
                className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </div>
        )}

        {/* OAuth Divider */}
        {step > 1 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-600">Or continue with</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignup}
              disabled={loading}
              className="w-full py-3 border border-gray-300 rounded-lg text-gray-900 hover:bg-gray-50 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Already have an account? <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}
