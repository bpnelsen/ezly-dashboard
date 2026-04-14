'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import EzlyLogo from './EzlyLogo'

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
      scrolled ? 'shadow-md border-b border-gray-100 py-0' : 'shadow-sm py-0'
    }`}>
      <div className={`max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-300 ${
        scrolled ? 'py-1' : 'py-2'
      }`}>

        {/* Logo — shrinks on scroll */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div className={`transition-all duration-300 ${scrolled ? 'w-20 sm:w-24' : 'w-28 sm:w-32'}`}>
            <EzlyLogo className="w-full h-auto" />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex flex-1 justify-between items-center pl-10">
          <div className={`flex items-center transition-all duration-300 ${scrolled ? 'gap-6' : 'gap-8'}`}>
            {[{label:'Features',href:'/#features'},{label:'How It Works',href:'/#how-it-works'},{label:'Pricing',href:'/#pricing'},{label:'Blog',href:'/blog'},{label:'Contact',href:'/contact'}].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-[#0f3a7d] hover:text-[#14b8a6] font-semibold transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={`text-[#0f3a7d] hover:text-[#14b8a6] font-semibold transition-all duration-300 ${scrolled ? 'text-sm' : 'text-base'}`}
            >
              Sign In
            </Link>
            <Link
              href="/signup/contractor"
              className={`bg-[#14b8a6] text-white rounded-lg font-bold hover:bg-[#0d9e8c] transition-all duration-300 ${
                scrolled ? 'px-4 py-1.5 text-sm' : 'px-6 py-2.5 text-base'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 text-[#0f3a7d] hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {[{label:'Features',href:'/#features'},{label:'How It Works',href:'/#how-it-works'},{label:'Pricing',href:'/#pricing'},{label:'Blog',href:'/blog'},{label:'Contact',href:'/contact'}].map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-[#0f3a7d] hover:bg-gray-50 rounded-lg font-semibold"
              >
                {item.label}
              </a>
            ))}
            <hr className="my-3 border-gray-200" />
            <div className="flex items-center gap-3 px-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 px-4 py-3 text-center border-2 border-[#0f3a7d] text-[#0f3a7d] rounded-lg font-semibold hover:bg-[#0f3a7d] hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup/contractor"
                onClick={() => setMenuOpen(false)}
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
