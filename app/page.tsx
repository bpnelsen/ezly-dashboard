'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Search, Home as HomeIcon, Menu, X } from 'lucide-react'
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
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200/50 backdrop-blur-xl bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center flex-shrink-0">
            <EzlyLogo className="w-48 sm:w-64 h-auto" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-1 items-center text-sm font-medium">
            <Link href="/about" className="px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-navy-500 transition-all">About</Link>
            <Link href="/blog" className="px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-navy-500 transition-all">Blog</Link>
            <a href="mailto:ezly.home@gmail.com" className="px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-navy-500 transition-all">Contact</a>
            <a href="#how-it-works" className="px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-navy-500 transition-all">How it Works</a>
            <a href="#contractors" className="px-3 py-2 rounded-lg hover:bg-gray-100/50 hover:text-navy-500 transition-all">Contractors</a>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex gap-3 items-center">
            <Link href="/login" className="px-5 py-2.5 text-navy-500 hover:text-navy-700 text-sm font-semibold transition">
              Sign In
            </Link>
            <Link 
              href="/signup"
              className="px-5 py-2.5 bg-navy-500 text-white rounded-full font-semibold text-sm hover:bg-navy-600 transition flex items-center justify-center min-h-[40px]"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg touch-none"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <div className="px-4 py-3 space-y-2">
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Blog
              </Link>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMenuOpen(false)}>
                How it Works
              </a>
              <a href="#contractors" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg" onClick={() => setMenuOpen(false)}>
                Contractors
              </a>
              <hr className="my-2" />
              <Link href="/login" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="block w-full px-3 py-3 bg-teal-500 text-white rounded-lg font-medium hover:bg-teal-600 text-center min-h-12 flex items-center justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - THUMBTACK STYLE */}
      <section className="relative overflow-hidden bg-white pt-16 sm:pt-24 pb-16 sm:pb-24">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-navy-50 rounded-full blur-3xl opacity-60"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-900 text-center mb-6 tracking-tight leading-tight">
            Find trusted contractors
            <br />
            <span className="text-[#0f3a7d] bg-clip-text">
              {' '}in <span className="text-[#14b8a6]">minutes</span>
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-600 text-center mb-10 max-w-2xl mx-auto px-2">
            Get multiple bids from vetted professionals. Compare rates, read reviews, and hire with confidence.
          </p>

          {/* Search Bar with enhanced shadow */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] p-4 sm:p-8 mb-16 border border-gray-100 relative group">
            <div className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-teal-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 items-end">
              {/* Search fields remain same functionality but cleaner */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-900">What do you need?</label>
                <select 
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition text-sm font-medium"
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
                <label className="block text-sm font-bold text-gray-900">Your location</label>
                <input 
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City or ZIP code"
                  className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 transition text-sm font-medium"
                />
              </div>

              <button 
                type="submit"
                className="w-full btn-teal py-4 text-base shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/40"
              >
                Find Pros
              </button>
            </div>
          </form>

          {/* Hero Image with stylish overlay */}
          <div className="relative rounded-3xl h-64 sm:h-96 overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop" 
              alt="Professional contractor"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      {/* TRUST & SOCIAL PROOF */}
      <section className="bg-white border-t border-gray-200 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-navy-500 mb-1 sm:mb-2">{contractorCount.toLocaleString()}+</div>
              <p className="text-xs sm:text-base text-gray-600">Verified Contractors</p>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-navy-500 mb-1 sm:mb-2">Utah</div>
              <p className="text-xs sm:text-base text-gray-600">Service Area</p>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-navy-500 mb-1 sm:mb-2">10+</div>
              <p className="text-xs sm:text-base text-gray-600">Trade Categories</p>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-bold text-navy-500 mb-1 sm:mb-2">Free</div>
              <p className="text-xs sm:text-base text-gray-600">To Get Started</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">How EZLY works</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { step: 1, title: 'Tell us what you need', desc: 'Describe your project in a few details' },
              { step: 2, title: 'Get quotes', desc: 'Receive bids from multiple contractors' },
              { step: 3, title: 'Compare & review', desc: 'View ratings, reviews, and pricing' },
              { step: 4, title: 'Hire with confidence', desc: 'Message, sign contract, and pay through EZLY' }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-teal-500 text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED CONTRACTORS */}
      <section id="contractors" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">Contractors you can trust</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredContractors.length > 0 ? featuredContractors.map((contractor, idx) => (
              <div key={contractor.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{contractor.business_name}</h3>
                    <p className="text-sm text-gray-600">{contractor.specialties || 'General Contractor'}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                    ✓ Verified
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm text-gray-600">{contractor.phone}</span>
                </div>
                <Link href="/contractors" className="block w-full bg-navy-500 hover:bg-navy-600 text-white font-bold py-3 rounded-lg transition min-h-12 text-sm sm:text-base text-center">
                  View Profile
                </Link>
              </div>
            )) : [1,2,3].map(i => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE EZLY */}
      <section className="bg-gray-50 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">Why choose EZLY?</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { icon: '✓', title: 'Verified Professionals', desc: 'Every contractor is background-checked and insured' },
              { icon: '💬', title: 'Direct Communication', desc: 'Message contractors instantly. No middleman.' },
              { icon: '🛡️', title: 'Protected Transactions', desc: 'Secure payments and contract management through EZLY' },
              { icon: '⭐', title: 'Real Reviews', desc: 'Read verified reviews from real homeowners' },
              { icon: '📊', title: 'Compare Easily', desc: 'View multiple bids side-by-side' },
              { icon: '⚡', title: 'Fast & Easy', desc: 'Get quotes in minutes, not weeks' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 sm:p-8 border border-gray-200">
                <div className="text-3xl sm:text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-base sm:text-lg text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-white py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-900 mb-8 sm:mb-16">What customers say</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { name: 'How It Works', text: 'Post your project, get matched with vetted contractors in your area, compare bids side-by-side, and hire with confidence — all in one place.', rating: 5 },
              { name: 'For Contractors', text: 'Join a growing network of professionals. Get discovered by homeowners looking for exactly what you offer. No cold calls needed.', rating: 5 },
              { name: 'Our Promise', text: 'Every contractor on EZLY is verified. We connect you with licensed, insured professionals so you can focus on your project, not your worries.', rating: 5 }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-4">{testimonial.text}</p>
                <p className="font-bold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-gradient-to-r from-navy-500 to-teal-500 py-12 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to find your contractor?</h2>
          <p className="text-base sm:text-xl text-white/90 mb-8">Join thousands of homeowners who've found trusted professionals through EZLY.</p>
          <Link 
            href="/signup"
            className="inline-block bg-white text-teal-500 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-100 transition text-base sm:text-lg min-h-12 flex items-center justify-center"
          >
            Get Started Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-white mb-4">EZLY</h3>
              <p className="text-sm">Find trusted contractors in minutes.</p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">For Homeowners</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/contractors" className="hover:text-white transition">Find Contractors</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/signup/homeowner" className="hover:text-white transition">Get Started</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">For Contractors</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/signup/contractor" className="hover:text-white transition">Join EZLY</Link></li>
                <li><Link href="/resources" className="hover:text-white transition">Resources</Link></li>
                <li><Link href="/login" className="hover:text-white transition">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><a href="mailto:ezly.home@gmail.com" className="hover:text-white transition">Contact</a></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
                <li><Link href="/sitemap" className="hover:text-white transition">Site Map</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <p>&copy; 2026 EZLY. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
