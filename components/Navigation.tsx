'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import EzlyLogo from './EzlyLogo'

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#0f3a7d] shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 w-40 sm:w-48">
          <EzlyLogo className="w-full h-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden lg:flex flex-1 justify-between items-center">
          <div className="flex items-center gap-10">
            <a href="/#features" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
              Features
            </a>
            <a href="/#how-it-works" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
              How It Works
            </a>
            <a href="/#pricing" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
              Pricing
            </a>
            <a href="/#faq" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
              FAQ
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-5">
            <Link href="/login" className="text-white font-semibold text-base tracking-wide hover:text-[#14b8a6] transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signup/contractor"
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
            <a href="/#features" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
              Features
            </a>
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
              How It Works
            </a>
            <a href="/#pricing" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
              Pricing
            </a>
            <a href="/#faq" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
              FAQ
            </a>
            <hr className="my-3 border-white/20" />
            <div className="flex items-center gap-3 px-2">
              <Link href="/login" className="flex-1 px-4 py-3 text-center text-white border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-[#0f3a7d] transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup/contractor"
                className="flex-1 px-4 py-3 text-center bg-[#14b8a6] text-white rounded-lg font-semibold hover:bg-[#0d9e8c] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
