'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Search, Menu, X, CheckCircle, Star, Shield, MessageCircle, DollarSign, Clock, Users, MapPin, Phone } from 'lucide-react'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase-client'
import EzlyLogo from '@/components/EzlyLogo'

export default function Home() {
  const [serviceType, setServiceType] = useState('')
  const [location, setLocation] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [contractorCount, setContractorCount] = useState(0)
  const [featuredContractors, setFeaturedContractors] = useState<any[]>([])

  useEffect(() => {
    async function fetchData() {
      const { count } = await supabase.from('contractors').select('*', { count: 'exact', head: true })
      setContractorCount(count || 0)

      const { data } = await supabase
        .from('contractors')
        .select('id, business_name, specialties, phone, email, website')
        .not('email', 'is', null)
        .limit(3)
      setFeaturedContractors(data || [])
    }
    fetchData()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (serviceType && location) {
      window.location.href = `/contractors?service=${serviceType}&location=${location}`
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* HEADER - Dark Navy Solid Background */}
      <nav className="sticky top-0 z-50 bg-[#0f3a7d] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 w-40 sm:w-48">
            <EzlyLogo className="w-full h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-between items-center px-8">
            <div className="flex items-center gap-10">
              <Link href="/about" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                About
              </Link>
              <Link href="/blog" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                Blog
              </Link>
              <a href="mailto:ezly.home@gmail.com" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                Contact
              </a>
              <a href="#how-it-works" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                How it Works
              </a>
              <a href="#contractors" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                Contractors
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-5">
              <Link href="/login" className="text-white font-semibold text-base tracking-wide hover:text-[#14b8a6] transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-2.5 bg-[#14b8a6] text-white rounded-lg font-bold text-base hover:bg-[#0d9e8c] hover:shadow-lg transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-[#0c2e5c] border-t border-white/10">
            <div className="px-4 py-4 space-y-1">
              <Link href="/about" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                About
              </Link>
              <Link href="/blog" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                Blog
              </Link>
              <a href="mailto:ezly.home@gmail.com" className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                Contact
              </a>
              <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                How it Works
              </a>
              <a href="#contractors" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
                Contractors
              </a>
              <hr className="my-3 border-white/20" />
              <div className="flex items-center gap-3 px-2">
                <Link href="/login" className="flex-1 px-4 py-3 text-center text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#0f3a7d] transition-colors">
                  Sign In
                </Link>
                <Link 
                  href="/signup"
                  className="flex-1 px-4 py-3 text-center bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9e8c] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - Clean & Professional */}
      <section className="bg-gradient-to-br from-[#0f3a7d] via-[#0f3a7d] to-[#0c2e5c] pt-16 sm:pt-24 pb-20 sm:pb-32 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#14b8a6] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Trust badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <Shield className="w-4 h-4 text-[#14b8a6]" />
            <span className="text-white/90 text-sm font-medium">Trusted by homeowners across Utah</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            Find trusted contractors
            <br className="hidden sm:block" />
            <span className="text-[#14b8a6]"> in minutes</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-white/80 text-center mb-12 max-w-2xl mx-auto">
            Get multiple bids from vetted professionals. Compare rates, read reviews, and hire with confidence.
          </p>

          {/* Search Bar - Dark glass effect */}
          <form onSubmit={handleSearch} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-end">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">What do you need?</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-4 bg-white text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-[#14b8a6] transition text-base font-medium"
                >
                  <option value="">Select service...</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="roofing">Roofing</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="hvac">HVAC</option>
                  <option value="painting">Painting</option>
                  <option value="landscaping">Landscaping</option>
                  <option value="remodeling">Remodeling</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-white/90">Your location</label>
                <input 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or ZIP code"
                  className="w-full px-4 py-4 bg-white text-gray-900 border-0 rounded-xl focus:ring-2 focus:ring-[#14b8a6] transition text-base font-medium placeholder-gray-500"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-[#14b8a6] hover:bg-[#0d9e8c] text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl text-base"
              >
                Find Pros
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* TRUST STATS - Clean cards */}
      <section className="bg-white py-12 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0f3a7d]/10 rounded-xl mb-3">
                <Users className="w-6 h-6 text-[#0f3a7d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0f3a7d] mb-1">{contractorCount}+</div>
              <p className="text-sm text-gray-600">Verified Contractors</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0f3a7d]/10 rounded-xl mb-3">
                <MapPin className="w-6 h-6 text-[#0f3a7d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0f3a7d] mb-1">Utah</div>
              <p className="text-sm text-gray-600">Service Area</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#0f3a7d]/10 rounded-xl mb-3">
                <Star className="w-6 h-6 text-[#0f3a7d]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0f3a7d] mb-1">10+</div>
              <p className="text-sm text-gray-600">Trade Categories</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#14b8a6]/10 rounded-xl mb-3">
                <CheckCircle className="w-6 h-6 text-[#14b8a6]" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-[#0f3a7d] mb-1">Free</div>
              <p className="text-sm text-gray-600">To Get Started</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Clean numbered steps */}
      <section id="how-it-works" className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">How EZLY works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">Simple, transparent, and designed to save you time.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Tell us what you need', desc: 'Describe your project in a few details', icon: Search },
              { step: 2, title: 'Get quotes', desc: 'Receive bids from multiple contractors', icon: DollarSign },
              { step: 3, title: 'Compare & review', desc: 'View ratings, reviews, and pricing', icon: Star },
              { step: 4, title: 'Hire with confidence', desc: 'Message, sign contract, and pay through EZLY', icon: Shield }
            ].map((item, idx) => (
              <div key={item.step} className="relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-[#0f3a7d] text-white rounded-xl flex items-center justify-center text-xl font-bold mb-5">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE EZLY - Feature cards */}
      <section className="bg-[#0f3a7d] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why choose EZLY?</h2>
            <p className="text-white/70 text-lg">Everything you need to make the right choice.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Verified Professionals', desc: 'Every contractor is background-checked and insured' },
              { icon: MessageCircle, title: 'Direct Communication', desc: 'Message contractors instantly. No middleman.' },
              { icon: DollarSign, title: 'Protected Transactions', desc: 'Secure payments and contract management through EZLY' },
              { icon: Star, title: 'Real Reviews', desc: 'Read verified reviews from real homeowners' },
              { icon: CheckCircle, title: 'Compare Easily', desc: 'View multiple bids side-by-side' },
              { icon: Clock, title: 'Fast & Easy', desc: 'Get quotes in minutes, not weeks' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-colors">
                <div className="w-12 h-12 bg-[#14b8a6] rounded-xl flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CONTRACTORS */}
      <section id="contractors" className="bg-[#f8fafc] py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">Contractors you can trust</h2>
            <p className="text-gray-600 text-lg">Verified professionals ready to help with your project.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredContractors.length > 0 ? featuredContractors.map((contractor) => (
              <div key={contractor.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{contractor.business_name}</h3>
                    <p className="text-sm text-gray-600">{contractor.specialties || 'General Contractor'}</p>
                  </div>
                  <div className="bg-[#14b8a6]/10 text-[#14b8a6] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Verified
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-5 text-sm text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{contractor.phone}</span>
                </div>
                <Link href="/contractors" className="block w-full bg-[#0f3a7d] hover:bg-[#0c2e5c] text-white font-bold py-3 rounded-xl transition text-center">
                  View Profile
                </Link>
              </div>
            )) : [1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Clean cards */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0f3a7d] mb-4">What customers say</h2>
            <div className="flex items-center justify-center gap-1">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="text-gray-600 ml-2">5.0 average rating</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { title: 'For Homeowners', text: 'Post your project, get matched with vetted contractors in your area, compare bids side-by-side, and hire with confidence — all in one place.' },
              { title: 'For Contractors', text: 'Join a growing network of professionals. Get discovered by homeowners looking for exactly what you offer. No cold calls needed.' },
              { title: 'Our Promise', text: 'Every contractor on EZLY is verified. We connect you with licensed, insured professionals so you can focus on your project, not your worries.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-[#f8fafc] rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{item.text}</p>
                <p className="font-bold text-[#0f3a7d]">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA - Teal accent */}
      <section className="bg-gradient-to-r from-[#0f3a7d] to-[#14b8a6] py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to find your contractor?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">Join thousands of homeowners who've found trusted professionals through EZLY.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-white text-[#0f3a7d] font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg"
            >
              Get Started Free
            </Link>
            <a 
              href="mailto:ezly.home@gmail.com"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Footer - Dark professional */}
      <footer className="bg-[#0c2e5c] text-white py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <EzlyLogo className="w-40 h-auto mb-4 opacity-90" />
              <p className="text-white/60 text-sm">Find trusted contractors in minutes.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Homeowners</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/contractors" className="hover:text-white transition">Find Contractors</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/signup/homeowner" className="hover:text-white transition">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">For Contractors</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/signup/contractor" className="hover:text-white transition">Join EZLY</Link></li>
                <li><Link href="/resources" className="hover:text-white transition">Resources</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><a href="mailto:ezly.home@gmail.com" className="hover:text-white transition">Contact</a></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/sitemap" className="hover:text-white transition">Site Map</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm text-white/50">
            <p>&copy; 2026 EZLY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}