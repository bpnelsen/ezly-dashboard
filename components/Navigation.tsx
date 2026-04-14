'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import EzlyLogo from './EzlyLogo'

interface NavigationProps {
  /** true = transparent over a dark hero (home page). false = solid white bg from start */
  transparent?: boolean
}

export default function Navigation({ transparent = false }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // When NOT transparent mode OR when scrolled, use dark text on white bg
  const isDark = !transparent || scrolled

  return (
    <nav
      className={[
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isDark
          ? 'bg-white/95 backdrop-blur-md border-b-2 border-[#14b8a6]'
          : 'bg-transparent border-b-2 border-transparent',
        scrolled ? 'shadow-sm' : '',
      ].join(' ')}
    >
      <div
        className={[
          'max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center transition-all duration-500',
          scrolled ? 'py-2.5' : 'py-5',
        ].join(' ')}
      >
        {/* Logo — shrinks on scroll */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div
            className={[
              'transition-all duration-500',
              scrolled ? 'w-28 sm:w-32' : 'w-36 sm:w-44',
            ].join(' ')}
          >
            <EzlyLogo className="w-full h-auto" />
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex flex-1 justify-between items-center pl-10">
          <div
            className={[
              'flex items-center transition-all duration-500',
              scrolled ? 'gap-6' : 'gap-8',
            ].join(' ')}
          >
<a href={scrolled ? '/#features' : '/#features'} className={[
                  'font-semibold tracking-wide transition-all duration-500',
                  scrolled
                    ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm'
                    : 'text-white/90 hover:text-white text-base',
                ].join(' ')}>
              Features
            </a>
            <a href={scrolled ? '/#how-it-works' : '/#how-it-works'} className={[
                  'font-semibold tracking-wide transition-all duration-500',
                  scrolled
                    ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm'
                    : 'text-white/90 hover:text-white text-base',
                ].join(' ')}>
              How It Works
            </a>
            <a href={scrolled ? '/#pricing' : '/#pricing'} className={[
                  'font-semibold tracking-wide transition-all duration-500',
                  scrolled
                    ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm'
                    : 'text-white/90 hover:text-white text-base',
                ].join(' ')}>
              Pricing
            </a>
            <a href={scrolled ? '/#faq' : '/#faq'} className={[
                  'font-semibold tracking-wide transition-all duration-500',
                  scrolled
                    ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm'
                    : 'text-white/90 hover:text-white text-base',
                ].join(' ')}>
              FAQ
            </a>
          </div>

          {/* Auth */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className={[
                'font-semibold transition-all duration-500',
                isDark
                  ? 'text-[#0f3a7d] hover:text-[#14b8a6] text-sm'
                  : 'text-white/90 hover:text-white text-base',
              ].join(' ')}
            >
              Sign In
            </Link>
            <Link
              href="/signup/contractor"
              className={[
                'bg-[#14b8a6] text-white rounded-lg font-bold hover:bg-[#0d9e8c] transition-all duration-500',
                scrolled
                  ? 'px-4 py-2 text-sm hover:shadow-md'
                  : 'px-6 py-2.5 text-base hover:shadow-lg',
              ].join(' ')}
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={[
            'lg:hidden p-2 rounded-lg transition-colors',
            isDark ? 'text-[#0f3a7d] hover:bg-gray-100' : 'text-white hover:bg-white/10',
          ].join(' ')}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={[
          'lg:hidden border-t transition-all duration-300',
          isDark
            ? 'bg-white/95 backdrop-blur-md border-gray-100'
            : 'bg-[#0f3a7d]/95 backdrop-blur-md border-white/10',
        ].join(' ')}>
          <div className="max-w-6xl mx-auto px-4 py-4 space-y-1">
            {['Features', 'How It Works', 'Pricing', 'FAQ'].map((label) => (
              <a
                key={label}
                href={`/#${label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMenuOpen(false)}
                className={[
                  'block px-4 py-3 rounded-lg font-semibold',
                  isDark ? 'text-[#0f3a7d] hover:bg-gray-50' : 'text-white hover:bg-white/10',
                ].join(' ')}
              >
                {label}
              </a>
            ))}
            <hr className={isDark ? 'my-3 border-gray-200' : 'my-3 border-white/20'} />
            <div className="flex items-center gap-3 px-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className={[
                  'flex-1 px-4 py-3 text-center border-2 rounded-lg font-semibold transition-colors',
                  isDark
                    ? 'border-[#0f3a7d] text-[#0f3a7d] hover:bg-[#0f3a7d] hover:text-white'
                    : 'border-white text-white hover:bg-white hover:text-[#0f3a7d]',
                ].join(' ')}
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
