'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase-client'

export default function ContractorSignup() {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
    ownerName: '',
    phone: '',
    serviceAreas: '',
    specialties: [] as string[],
    yearsExperience: '',
    licensed: '',
    insured: '',
    howDidYouHear: ''
  })

  const handleGoogleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback?role=contractor`,
        },
      })
      if (authError) setError(authError.message)
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
        specialties: checked
          ? [...prev.specialties, value]
          : prev.specialties.filter(t => t !== value)
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.ownerName,
            phone: formData.phone,
            role: 'contractor',
            business_name: formData.businessName
          }
        }
      })
      if (authError) throw authError
      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: formData.email,
          full_name: formData.ownerName,
          business_name: formData.businessName,
          role: 'contractor',
          metadata: {
            serviceAreas: formData.serviceAreas,
            specialties: formData.specialties,
            yearsExperience: formData.yearsExperience,
            licensed: formData.licensed,
            insured: formData.insured,
            howDidYouHear: formData.howDidYouHear
          }
        })
        if (profileError) throw profileError
      }
      window.location.href = '/dashboard/contractor'
    } catch (err: any) {
      setError(err.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  const specialties = [
    'Kitchen Remodeling', 'Bathroom Renovation', 'Roofing',
    'Electrical', 'HVAC', 'Plumbing', 'Flooring',
    'Painting', 'Carpentry', 'Landscaping', 'Masonry', 'General Contracting'
  ]

  const steps = [
    { num: 1, label: 'Account' },
    { num: 2, label: 'Business' },
    { num: 3, label: 'Expertise' }
  ]

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Clean Header */}
      <header className="bg-white border-b border-gray-100 py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[#0f3a7d] font-bold text-xl tracking-tight">Prolink</span>
            <span className="text-gray-300 text-xl font-light">by</span>
            <span className="text-[#14b8a6] font-bold text-xl tracking-tight">EZLY</span>
          </Link>
          <Link
            href="https://useezly.com"
            className="text-sm text-gray-400 hover:text-[#0f3a7d] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-xl mx-auto px-6 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-10">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  step > s.num
                    ? 'bg-[#14b8a6] border-[#14b8a6] text-white'
                    : step === s.num
                    ? 'bg-[#0f3a7d] border-[#0f3a7d] text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step > s.num ? <CheckCircle size={18} /> : s.num}
                </div>
                <span className={`text-xs mt-1.5 font-medium ${step >= s.num ? 'text-[#0f3a7d]' : 'text-gray-400'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-20 h-0.5 mx-2 mb-5 rounded transition-colors ${step > s.num ? 'bg-[#14b8a6]' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f3a7d] mb-1">Create Your Account</h1>
              <p className="text-gray-500 text-sm mb-7">Start your 14-day free trial. No credit card required.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleChange}
                    placeholder="you@yourcompany.com"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-gray-900 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                  <input
                    type="password" name="password" value={formData.password} onChange={handleChange}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-gray-900 text-sm"
                  />
                </div>
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.email || formData.password.length < 8}
                  className="w-full py-3 bg-[#0f3a7d] text-white rounded-xl font-semibold hover:bg-[#0c2e5c] disabled:bg-gray-200 disabled:text-gray-400 transition text-sm"
                >
                  Continue
                </button>
                <div className="relative flex items-center">
                  <div className="flex-1 border-t border-gray-200" />
                  <span className="mx-4 text-xs text-gray-400">or</span>
                  <div className="flex-1 border-t border-gray-200" />
                </div>
                <button
                  type="button" onClick={handleGoogleSignup}
                  disabled={loading}
                  className="w-full py-3 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition text-sm font-semibold text-gray-700 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f3a7d] mb-1">Your Business Details</h1>
              <p className="text-gray-500 text-sm mb-7">Tell us about your contracting business.</p>
              <div className="space-y-5">
                {[
                  { label: 'Business Name', name: 'businessName', placeholder: 'Smith Plumbing LLC', type: 'text' },
                  { label: 'Owner / Contact Name', name: 'ownerName', placeholder: 'John Smith', type: 'text' },
                  { label: 'Phone Number', name: 'phone', placeholder: '(555) 123-4567', type: 'tel' },
                  { label: 'Service Areas', name: 'serviceAreas', placeholder: 'Salt Lake City, Provo, etc.', type: 'text' },
                ].map(field => (
                  <div key={field.name}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">{field.label}</label>
                    <input
                      type={field.type} name={field.name} value={(formData as any)[field.name]} onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-gray-900 text-sm"
                    />
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(1)} className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition text-sm">
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!formData.businessName || !formData.ownerName || !formData.phone}
                    className="flex-1 py-3 bg-[#0f3a7d] text-white rounded-xl font-semibold hover:bg-[#0c2e5c] disabled:bg-gray-200 disabled:text-gray-400 transition text-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h1 className="text-2xl font-bold text-[#0f3a7d] mb-1">Your Expertise</h1>
              <p className="text-gray-500 text-sm mb-7">Help homeowners find you for the right projects.</p>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialties</label>
                  <div className="grid grid-cols-2 gap-2">
                    {specialties.map(s => (
                      <label key={s} className="flex items-center gap-2 p-3 bg-[#f8fafc] border border-gray-200 rounded-xl cursor-pointer hover:border-[#14b8a6] transition text-sm">
                        <input type="checkbox" name="specialties" value={s} checked={formData.specialties.includes(s)} onChange={handleChange} className="w-4 h-4 text-[#14b8a6] rounded" />
                        <span className="text-gray-700 text-xs">{s}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Years of Experience</label>
                    <select name="yearsExperience" value={formData.yearsExperience} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-sm text-gray-900">
                      <option value="">Select...</option>
                      <option value="0-2">0–2 years</option>
                      <option value="3-5">3–5 years</option>
                      <option value="6-10">6–10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Licensed?</label>
                    <select name="licensed" value={formData.licensed} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-sm text-gray-900">
                      <option value="">Select...</option>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Insured?</label>
                  <select name="insured" value={formData.insured} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-sm text-gray-900">
                    <option value="">Select...</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">How did you hear about us?</label>
                  <select name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} className="w-full px-4 py-3 bg-[#f8fafc] border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#14b8a6] focus:border-transparent outline-none transition text-sm text-gray-900">
                    <option value="">Select...</option>
                    <option value="google">Google</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">{error}</div>
                )}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setStep(2)} className="flex-1 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition text-sm">
                    Back
                  </button>
                  <button
                    onClick={handleSignup}
                    disabled={loading || formData.specialties.length === 0}
                    className="flex-1 py-3 bg-[#14b8a6] text-white rounded-xl font-semibold hover:bg-[#0d9e8c] disabled:bg-gray-200 disabled:text-gray-400 transition text-sm"
                  >
                    {loading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="https://app.useezly.com/login" className="text-[#14b8a6] hover:text-[#0d9e8c] font-semibold">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
