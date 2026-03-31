'use client'

export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react'

interface BlogContent {
  [key: string]: {
    title: string
    date: string
    readTime: string
    category: string
    author: string
    content: string
    image: string
  }
}

const blogPosts: BlogContent = {
  'how-to-choose-right-contractor': {
    title: 'How to Choose the Right Contractor for Your Home Project',
    date: '2026-02-15',
    readTime: '5 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&h=600&fit=crop',
    content: `# How to Choose the Right Contractor\n\nFinding the right contractor...`
  },
  'contractor-red-flags': {
    title: '10 Red Flags When Hiring a Contractor',
    date: '2026-02-10',
    readTime: '7 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    content: `# 10 Red Flags`
  },
  'questions-to-ask-contractors': {
    title: '15 Essential Questions to Ask Before Hiring a Contractor',
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&h=600&fit=crop',
    content: `# Questions...`
  },
  'contractor-pricing-guide': {
    title: 'Understanding Contractor Pricing',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'Pricing & Budgets',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop',
    content: `# Pricing...`
  },
  'seasonal-home-maintenance': {
    title: 'Seasonal Home Maintenance Checklist',
    date: '2026-01-20',
    readTime: '6 min read',
    category: 'Maintenance',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    content: `# Maintenance...`
  },
  'kitchen-remodel-cost-breakdown': {
    title: 'Kitchen Remodel Cost Breakdown',
    date: '2026-03-31',
    readTime: '7 min read',
    category: 'Pricing & Budgets',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    content: `# Kitchen Remodel...`
  },
  'bathroom-renovation-guide': {
    title: 'Complete Bathroom Renovation Guide',
    date: '2026-03-31',
    readTime: '8 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=600&fit=crop',
    content: `# Bathroom Renovation...`
  },
  'essential-tips-roofing': {
    title: '4 Essential Tips for Choosing a Reliable Roofing Contractor',
    date: '2026-03-31',
    readTime: '5 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1632752762296-6d73ac97b692?w=1200&h=600&fit=crop',
    content: `# Roofing...`
  },
  'why-we-vet-contractors': {
    title: 'Why We Vet Every Contractor',
    date: '2026-03-31',
    readTime: '4 min read',
    category: 'EZLY Insights',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a966512?w=1200&h=600&fit=crop',
    content: `# Vetting...`
  }
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  const post = blogPosts[slug]

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-navy-600 hover:text-navy-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-br from-navy-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/blog" className="inline-flex items-center text-navy-600 hover:text-navy-700 mb-8 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1 bg-navy-100 text-navy-700 rounded-full font-semibold flex items-center gap-1">
              <Tag size={14} />
              {post.category}
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600 flex-wrap">
            <span className="flex items-center gap-2">
              <Calendar size={18} />
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-2">
              <Clock size={18} />
              {post.readTime}
            </span>
            <span>By {post.author}</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-96 object-cover rounded-xl shadow-lg"
        />
      </div>

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-blue max-w-none">
           <p className="text-gray-700 leading-relaxed mb-4">{post.content}</p>
        </div>
      </article>
      
      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-navy-600 to-navy-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Contractor?</h2>
          <p className="text-xl text-navy-100 mb-8 max-w-2xl mx-auto">
            Join EZLY today and connect with verified, trusted contractors in your area.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-white text-navy-600 rounded-lg font-semibold hover:bg-navy-50 transition shadow-lg"
            >
              Get Started Free
            </Link>
            <Link 
              href="/blog"
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Read More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
