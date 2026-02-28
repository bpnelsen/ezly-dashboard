'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  author: string
  image: string
}

const posts: BlogPost[] = [
  {
    slug: 'how-to-choose-right-contractor',
    title: 'How to Choose the Right Contractor for Your Home Project',
    excerpt: 'Finding a reliable contractor can be challenging. Learn the key factors to consider when selecting a professional for your next home improvement project.',
    date: '2026-02-15',
    readTime: '5 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'
  },
  {
    slug: 'contractor-red-flags',
    title: '10 Red Flags When Hiring a Contractor',
    excerpt: 'Protect yourself from unreliable contractors by knowing these warning signs before you sign any contract or hand over a deposit.',
    date: '2026-02-10',
    readTime: '7 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop'
  },
  {
    slug: 'questions-to-ask-contractors',
    title: '15 Essential Questions to Ask Before Hiring a Contractor',
    excerpt: 'Make sure you ask these critical questions to ensure your contractor is qualified, licensed, and the right fit for your project.',
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=500&fit=crop'
  },
  {
    slug: 'contractor-pricing-guide',
    title: 'Understanding Contractor Pricing: What You Should Expect to Pay',
    excerpt: 'Get insights into typical contractor rates, how pricing works, and tips to ensure you get fair quotes for your home improvement projects.',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'Pricing & Budgets',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=800&h=500&fit=crop'
  },
  {
    slug: 'seasonal-home-maintenance',
    title: 'Seasonal Home Maintenance Checklist: When to Call a Contractor',
    excerpt: 'Stay ahead of home repairs with this seasonal maintenance guide. Learn when DIY is enough and when to bring in a professional.',
    date: '2026-01-20',
    readTime: '6 min read',
    category: 'Maintenance',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium">
            ← Back to Home
          </Link>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">EZLY Blog</h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Tips, guides, and insights for homeowners and contractors. Learn how to find, hire, and work with the best professionals.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link 
              key={post.slug} 
              href={`/blog/${post.slug}`}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-200"
            >
              {/* Featured Image */}
              <div className="h-48 overflow-hidden bg-gray-200 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-blue-600 font-semibold mb-3">
                  <span className="px-3 py-1 bg-blue-100 rounded-full">{post.category}</span>
                </div>
                
                <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition line-clamp-2">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-blue-600 group-hover:translate-x-1 transition" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
