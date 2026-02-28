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
  }
}

const blogPosts: BlogContent = {
  'how-to-choose-right-contractor': {
    title: 'How to Choose the Right Contractor for Your Home Project',
    date: '2026-02-15',
    readTime: '5 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    content: `
# How to Choose the Right Contractor for Your Home Project

Finding the right contractor for your home improvement project is crucial for success. Here's a comprehensive guide to help you make the best choice.

## 1. Check Licensing and Insurance

Before you even consider hiring a contractor, verify they have:
- Valid contractor's license for your state
- General liability insurance
- Workers' compensation insurance

Ask to see copies of these documents and verify them with your state's licensing board.

## 2. Get Multiple Quotes

Never settle for the first quote. Get at least 3-5 estimates from different contractors:
- Compare pricing and scope of work
- Look for detailed breakdowns
- Beware of quotes that seem too low (quality concerns) or too high

## 3. Check References and Reviews

Don't skip this step:
- Ask for at least 3 recent references
- Call those references and ask specific questions
- Check online reviews on Google, Yelp, and specialized sites
- Look at their portfolio of completed projects

## 4. Verify Experience with Your Type of Project

Make sure the contractor has specific experience with your project type:
- Kitchen remodels
- Bathroom renovations
- Roofing work
- HVAC installation
- Electrical work

## 5. Communication is Key

Pay attention to how the contractor communicates:
- Do they respond promptly to calls and emails?
- Do they listen to your concerns?
- Do they explain things clearly?
- Are they professional and respectful?

## 6. Get Everything in Writing

A detailed written contract should include:
- Scope of work
- Materials to be used (brands and quality levels)
- Timeline with start and completion dates
- Payment schedule
- Warranty information
- Cleanup responsibilities

## 7. Trust Your Gut

If something feels off, it probably is. Trust your instincts:
- High-pressure sales tactics are a red flag
- Vague answers to important questions
- Reluctance to provide references or documentation

## Conclusion

Taking the time to properly vet contractors will save you stress, money, and potential legal issues down the road. Use EZLY to find verified, trusted contractors in your area with transparent reviews and credentials.
    `
  },
  'contractor-red-flags': {
    title: '10 Red Flags When Hiring a Contractor',
    date: '2026-02-10',
    readTime: '7 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    content: `
# 10 Red Flags When Hiring a Contractor

Protect yourself from unreliable or fraudulent contractors by watching out for these warning signs.

## 1. No Physical Address or Phone Number

Legitimate contractors have:
- A physical business address (not just a P.O. box)
- A working phone number
- A professional website or online presence

**Red flag:** They only communicate via cell phone or email.

## 2. Requires Full Payment Upfront

Standard practice is to pay:
- 10-30% deposit to start
- Progress payments as work is completed
- Final payment upon completion and your satisfaction

**Red flag:** Demanding 50% or more before starting work.

## 3. No Written Contract or Vague Terms

Every job should have a detailed written contract. Avoid contractors who:
- Offer verbal agreements only
- Provide vague or incomplete contracts
- Pressure you to sign without reading

## 4. Unverifiable License or Insurance

Be wary if they:
- Can't provide license numbers
- Claim they "don't need" insurance
- Get defensive when you ask to verify credentials

## 5. Pressure to Sign Immediately

High-pressure tactics include:
- "This price is only good today"
- "I have materials left from another job"
- "Sign now or I can't guarantee availability"

Take your time to make decisions.

## 6. Suspiciously Low Bids

If a quote is significantly lower than others:
- They might be cutting corners on quality
- Using subpar materials
- Planning to add hidden costs later
- Not properly insured

## 7. Cash-Only Payments

Legitimate contractors accept multiple payment methods:
- Checks
- Credit cards
- Bank transfers

**Red flag:** Insisting on cash only (often to avoid taxes).

## 8. No References or Bad Reviews

Warning signs:
- Refuses to provide references
- Can't show examples of previous work
- Multiple negative reviews online
- Recent complaints with the Better Business Bureau

## 9. Subcontracting Without Disclosure

Issues to watch for:
- Says they'll do the work but plans to subcontract
- Doesn't disclose who will actually be on-site
- Can't answer technical questions about the work

## 10. Poor Communication from the Start

If they're hard to reach or unprofessional before you hire them:
- Don't return calls or emails
- Miss scheduled appointments
- Provide vague or evasive answers

It will only get worse once you've paid them.

## Protect Yourself

Use platforms like EZLY that verify contractors' credentials, provide transparent reviews, and help you find trusted professionals for your project.
    `
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
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8 font-medium">
            <ArrowLeft size={18} className="mr-2" />
            Back to Blog
          </Link>
          
          <div className="flex items-center gap-2 text-sm mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold flex items-center gap-1">
              <Tag size={14} />
              {post.category}
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center gap-6 text-gray-600">
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

      {/* Content */}
      <article className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg prose-blue max-w-none">
          {post.content.split('\n').map((line, i) => {
            if (line.startsWith('# ')) {
              return <h1 key={i} className="text-4xl font-bold text-gray-900 mt-12 mb-6">{line.replace('# ', '')}</h1>
            } else if (line.startsWith('## ')) {
              return <h2 key={i} className="text-3xl font-bold text-gray-900 mt-10 mb-4">{line.replace('## ', '')}</h2>
            } else if (line.startsWith('### ')) {
              return <h3 key={i} className="text-2xl font-bold text-gray-900 mt-8 mb-3">{line.replace('### ', '')}</h3>
            } else if (line.startsWith('- ')) {
              return <li key={i} className="text-gray-700 ml-6">{line.replace('- ', '')}</li>
            } else if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={i} className="text-gray-900 font-bold mt-6">{line.replace(/\*\*/g, '')}</p>
            } else if (line.trim()) {
              return <p key={i} className="text-gray-700 leading-relaxed mb-4">{line}</p>
            }
            return null
          })}
        </div>
      </article>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Contractor?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join EZLY today and connect with verified, trusted contractors in your area.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition shadow-lg"
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
