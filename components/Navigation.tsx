'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import EzlyLogo from './EzlyLogo'

interface NavigationProps {
  variant?: 'default' | 'minimal'
}

export default function Navigation({ variant = 'default' }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-[#0f3a7d] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 w-40 sm:w-48">
          <EzlyLogo className="w-full h-auto" />
        </Link>
        
        {/* Desktop Navigation */}
        {variant === 'default' && (
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
              <a href="/#how-it-works" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
                How it Works
              </a>
              <a href="/#contractors" className="text-white/90 hover:text-white transition-colors font-semibold text-base tracking-wide">
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
        )}

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
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
              How it Works
            </a>
            <a href="/#contractors" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-colors font-semibold">
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
  )
}