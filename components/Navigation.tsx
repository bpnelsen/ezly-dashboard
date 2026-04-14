'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import EzlyLogo from './EzlyLogo'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2' 
          : 'bg-white shadow-sm py-4'
      }`}
    >
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-6 transition-all duration-300 ${
        scrolled ? 'py-0' : 'py-2'
      }`}>
        {/* Logo - Shrinks on scroll */}
        <Link href={scrolled ? '/' : '/'} className={`flex items-center flex-shrink-0 transition-all duration-300 ${
          scrolled ? 'w-32 sm:w-36' : 'w-40 sm:w-48'
        }`}>
          <EzlyLogo className={`w-full h-auto transition-all duration-300 ${
            scrolled ? 'py-1' : 'py-2'
          }`} />
        </Link>
        
        {/* Desktop Navigation */}
        <div className={`hidden lg:flex flex-1 justify-between items-center transition-all duration-300 ${
          scrolled ? 'px-4' : 'px-8'
        }`}>
          <div className={`flex items-center gap-8 transition-all duration-300 ${
            scrolled ? 'gap-6 text-sm' : 'gap-10 text-base'
          }`}>
            <a href={scrolled ? '/#features' : '/#features'} className={`transition-colors font-semibold ${
              scrolled 
                ? 'text-[#0f3a7d] hover:text-[#14b8a6]' 
                : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              Features
            </a>
            <a href={scrolled ? '/#how-it-works' : '/#how-it-works'} className={`transition-colors font-semibold ${
              scrolled 
                ? 'text-[#0f3a7d] hover:text-[#14b8a6]' 
                : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              How It Works
            </a>
            <a href={scrolled ? '/#pricing' : '/#pricing'} className={`transition-colors font-semibold ${
              scrolled 
                ? 'text-[#0f3a7d] hover:text-[#14b8a6]' 
                : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              Pricing
            </a>
            <a href={scrolled ? '/#faq' : '/#faq'} className={`transition-colors font-semibold ${
              scrolled 
                ? 'text-[#0f3a7d] hover:text-[#14b8a6]' 
                : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              FAQ
            </a>
          </div>

          {/* Auth Buttons - Shrink on scroll */}
          <div className={`flex items-center gap-4 transition-all duration-300 ${
            scrolled ? 'gap-4' : 'gap-5'
          }`}>
            <Link 
              href={scrolled ? '/login' : '/login'} 
              className={`font-semibold transition-colors ${
                scrolled 
                  ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm' 
                  : 'text-[#0f3a7d] hover:text-[#14b8a6]'
              }`}
            >
              Sign In
            </Link>
            <Link 
              href={scrolled ? '/signup/contractor' : '/signup/contractor'}
              className={`bg-[#14b8a6] text-white rounded-lg font-bold transition-all duration-300 ${
                scrolled 
                  ? 'px-4 py-2 text-sm hover:bg-[#0d9e8c]' 
                  : 'px-6 py-2.5 text-base hover:bg-[#0d9e8c] hover:shadow-lg'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            scrolled ? 'text-[#0f3a7d]' : 'text-[#0f3a7d]'
          }`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <div className={`lg:hidden border-t transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md' : 'bg-white'
        }`}>
          <div className={`max-w-6xl mx-auto px-4 py-4 space-y-1 ${
            scrolled ? 'py-3' : 'py-4'
          }`}>
            <a href={scrolled ? '/#features' : '/#features'} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 rounded-lg transition-colors font-semibold ${
              scrolled ? 'text-[#0f3a7d] hover:text-[#14b8a6]' : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              Features
            </a>
            <a href={scrolled ? '/#how-it-works' : '/#how-it-works'} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 rounded-lg transition-colors font-semibold ${
              scrolled ? 'text-[#0f3a7d] hover:text-[#14b8a6]' : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              How It Works
            </a>
            <a href={scrolled ? '/#pricing' : '/#pricing'} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 rounded-lg transition-colors font-semibold ${
              scrolled ? 'text-[#0f3a7d] hover:text-[#14b8a6]' : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              Pricing
            </a>
            <a href={scrolled ? '/#faq' : '/#faq'} onClick={() => setMenuOpen(false)} className={`block px-4 py-3 rounded-lg transition-colors font-semibold ${
              scrolled ? 'text-[#0f3a7d] hover:text-[#14b8a6]' : 'text-[#0f3a7d] hover:text-[#14b8a6]'
            }`}>
              FAQ
            </a>
            <hr className={`my-3 ${scrolled ? 'border-gray-200' : 'border-gray-100'}`} />
            <div className={`flex items-center gap-3 px-2 ${
              scrolled ? 'gap-2' : 'gap-3'
            }`}>
              <Link 
                href={scrolled ? '/login' : '/login'} 
                onClick={() => setMenuOpen(false)} 
                className={`flex-1 text-center border-2 rounded-lg font-semibold transition-colors ${
                  scrolled 
                    ? 'border-[#0f3a7d] text-[#0f3a7d] hover:bg-[#0f3a7d] hover:text-white py-2 text-sm' 
                    : 'border-[#0f3a7d] text-[#0f3a7d] hover:bg-[#0f3a7d] hover:text-white'
                }`}
              >
                Sign In
              </Link>
              <Link 
                href={scrolled ? '/signup/contractor' : '/signup/contractor'}
                onClick={() => setMenuOpen(false)} 
                className={`flex-1 text-center bg-[#14b8a6] text-white rounded-lg font-semibold transition-colors ${
                  scrolled ? 'hover:bg-[#0d9e8c] py-2 text-sm' : 'hover:bg-[#0d9e8c]'
                }`}
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