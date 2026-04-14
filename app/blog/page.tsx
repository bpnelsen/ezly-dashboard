'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
}

const posts: BlogPost[] = [
  {
    slug: 'how-to-grow-contractor-business',
    title: 'How to Grow Your Contractor Business in 2026',
    excerpt: 'From lead generation to repeat customers — the strategies top contractors use to scale without burning out.',
    date: '2026-04-10',
    readTime: '6 min read',
    category: 'Business Growth',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=500&fit=crop'
  },
  {
    slug: 'contractor-invoicing-tips',
    title: '5 Invoicing Mistakes Contractors Make (And How to Fix Them)',
    excerpt: 'Late payments, unclear line items, and no follow-up — these invoicing mistakes cost contractors thousands every year.',
    date: '2026-04-05',
    readTime: '5 min read',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop'
  },
  {
    slug: 'crm-for-contractors',
    title: 'Why Every Contractor Needs a CRM in 2026',
    excerpt: 'Spreadsheets and sticky notes won\'t cut it anymore. Here\'s how a CRM transforms your customer relationships and closes more jobs.',
    date: '2026-03-28',
    readTime: '7 min read',
    category: 'Tools & Tech',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop'
  },
  {
    slug: 'winning-more-bids',
    title: 'How to Win More Bids Without Lowering Your Price',
    excerpt: 'Price is rarely the only factor. Learn how to present your bids professionally and stand out from the competition.',
    date: '2026-03-20',
    readTime: '8 min read',
    category: 'Sales',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=500&fit=crop'
  },
  {
    slug: 'managing-contractor-teams',
    title: 'Managing Multiple Crews Without Losing Your Mind',
    excerpt: 'Scheduling, communication, and accountability — a practical guide for contractors running more than one job at a time.',
    date: '2026-03-12',
    readTime: '6 min read',
    category: 'Operations',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb192408c?w=800&h=500&fit=crop'
  },
  {
    slug: 'contractor-licensing-insurance',
    title: 'Licensing & Insurance: What Every Contractor Must Know',
    excerpt: 'Operating without the right credentials isn\'t just risky — it\'s costly. Here\'s what you need to stay protected and professional.',
    date: '2026-03-05',
    readTime: '5 min read',
    category: 'Legal & Compliance',
    image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop'
  },
  {
    slug: 'follow-up-strategy-contractors',
    title: 'The Follow-Up Strategy That Doubles Your Close Rate',
    excerpt: 'Most contractors give up after one follow-up. Here\'s the simple system that keeps leads warm and wins more jobs.',
    date: '2026-02-25',
    readTime: '4 min read',
    category: 'Sales',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=500&fit=crop'
  },
  {
    slug: 'contractor-customer-retention',
    title: 'How to Turn One-Time Clients Into Repeat Business',
    excerpt: 'Acquiring a new customer costs 5x more than keeping an existing one. Here\'s how to build loyalty that pays off long-term.',
    date: '2026-02-18',
    readTime: '5 min read',
    category: 'Business Growth',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop'
  },
]

const categoryColors: Record<string, string> = {
  'Business Growth': 'bg-blue-50 text-blue-700',
  'Finance': 'bg-green-50 text-green-700',
  'Tools & Tech': 'bg-purple-50 text-purple-700',
  'Sales': 'bg-orange-50 text-orange-700',
  'Operations': 'bg-teal-50 text-teal-700',
  'Legal & Compliance': 'bg-red-50 text-red-700',
}

export default function BlogPage() {
  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-12">
        <p className="text-[#14b8a6] font-semibold text-sm tracking-widest uppercase mb-3">Blog</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-[#0f3a7d] mb-4 tracking-tight">
          Resources for Contractors
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl">
          Practical advice on growing your business, managing jobs, and running a more profitable operation.
        </p>
      </section>

      {/* Featured Post */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
        <Link href={`/blog/${featured.slug}`} className="group block">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="h-64 lg:h-auto overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="bg-white p-8 sm:p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-[#0f3a7d]/10 text-[#0f3a7d] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Featured
                </span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[featured.category] || 'bg-gray-100 text-gray-600'}`}>
                  {featured.category}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 group-hover:text-[#0f3a7d] transition-colors">
                {featured.title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{featured.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                </div>
                <span className="text-[#14b8a6] font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </section>

      {/* Post Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category] || 'bg-gray-100 text-gray-600'}`}>
                    {post.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-3 mb-2 group-hover:text-[#0f3a7d] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc] border-t border-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0f3a7d] mb-4">Ready to run your business better?</h2>
          <p className="text-gray-600 mb-8">Join hundreds of contractors already using Prolink.</p>
          <Link
            href="/signup/contractor"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#14b8a6] text-white font-bold rounded-xl hover:bg-[#0d9e8c] transition-all shadow-lg text-lg"
          >
            Start Free Trial <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">&copy; 2026 Prolink by EZLY. All rights reserved.</p>
          <div className="flex items-center gap-6 text-gray-400 text-sm">
            <Link href="/privacy" className="hover:text-gray-600 transition">Privacy</Link>
            <Link href="/about" className="hover:text-gray-600 transition">About</Link>
            <a href="mailto:ezly.home@gmail.com" className="hover:text-gray-600 transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
