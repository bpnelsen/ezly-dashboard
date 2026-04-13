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
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#0f3a7d] via-[#14b8a6] to-[#0f3a7d]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center flex-shrink-0 w-40 sm:w-48">
          <EzlyLogo className="w-full h-auto" />
        </Link>
        
        {/* Desktop Navigation - Elegant, distributed */}
        {variant === 'default' && (
          <div className="hidden lg:flex flex-1 justify-between items-center px-8">
            <div className="flex items-center gap-12">
              <Link href="/about" className="relative text-gray-700 hover:text-[#0f3a7d] transition-all duration-300 font-semibold tracking-wide group">
                About
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#0f3a7d] transition-all duration-300 group-hover:w-full rounded-full shadow-lg shadow-[#0f3a7d]/30"></span>
              </Link>
              <Link href="/blog" className="relative text-gray-700 hover:text-[#0f3a7d] transition-all duration-300 font-semibold tracking-wide group">
                Blog
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#0f3a7d] transition-all duration-300 group-hover:w-full rounded-full shadow-lg shadow-[#0f3a7d]/30"></span>
              </Link>
              <a href="mailto:ezly.home@gmail.com" className="relative text-gray-700 hover:text-[#0f3a7d] transition-all duration-300 font-semibold tracking-wide group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#0f3a7d] transition-all duration-300 group-hover:w-full rounded-full shadow-lg shadow-[#0f3a7d]/30"></span>
              </a>
              <a href="/#how-it-works" className="relative text-gray-700 hover:text-[#0f3a7d] transition-all duration-300 font-semibold tracking-wide group">
                How it Works
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#0f3a7d] transition-all duration-300 group-hover:w-full rounded-full shadow-lg shadow-[#0f3a7d]/30"></span>
              </a>
              <a href="/#contractors" className="relative text-gray-700 hover:text-[#0f3a7d] transition-all duration-300 font-semibold tracking-wide group">
                Contractors
                <span className="absolute -bottom-1 left-0 w-0 h-[3px] bg-[#0f3a7d] transition-all duration-300 group-hover:w-full rounded-full shadow-lg shadow-[#0f3a7d]/30"></span>
              </a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center gap-6">
              <Link href="/login" className="text-base font-bold text-[#0f3a7d] hover:text-[#14b8a6] transition-colors tracking-wide">
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="px-7 py-2.5 bg-[#0f3a7d] text-white rounded-lg font-bold text-base hover:bg-[#0c2e5c] hover:shadow-xl hover:shadow-[#0f3a7d]/20 hover:-translate-y-0.5 transition-all duration-300 tracking-wide"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg touch-none transition-colors"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation Menu - Refined */}
      {menuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <div className="px-4 py-4 space-y-1">
            <Link href="/about" className="block px-4 py-3 text-base text-gray-700 hover:text-[#0f3a7d] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              About
            </Link>
            <Link href="/blog" className="block px-4 py-3 text-base text-gray-700 hover:text-[#0f3a7d] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              Blog
            </Link>
            <a href="mailto:ezly.home@gmail.com" className="block px-4 py-3 text-base text-gray-700 hover:text-[#0f3a7d] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              Contact
            </a>
            <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-base text-gray-700 hover:text-[#0f3a7d] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              How it Works
            </a>
            <a href="/#contractors" onClick={() => setMenuOpen(false)} className="block px-4 py-3 text-base text-gray-700 hover:text-[#0f3a7d] hover:bg-gray-50 rounded-lg transition-colors font-medium">
              Contractors
            </a>
            <hr className="my-3 border-gray-100" />
            <div className="flex items-center gap-3 px-2">
              <Link href="/login" className="flex-1 px-4 py-3 text-center text-[#0f3a7d] border-2 border-[#0f3a7d] rounded-lg font-medium hover:bg-[#0f3a7d] hover:text-white transition-colors">
                Sign In
              </Link>
              <Link 
                href="/signup"
                className="flex-1 px-4 py-3 text-center bg-[#0f3a7d] text-white rounded-lg font-medium hover:bg-[#0c2e5c] transition-colors"
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
