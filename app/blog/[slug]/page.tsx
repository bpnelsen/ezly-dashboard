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
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop',
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
  },
  'questions-to-ask-contractors': {
    title: '15 Essential Questions to Ask Before Hiring a Contractor',
    date: '2026-02-05',
    readTime: '6 min read',
    category: 'Homeowner Tips',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop',
    content: `
# 15 Essential Questions to Ask Before Hiring a Contractor

Before you commit to hiring a contractor, make sure you ask these critical questions to ensure they're the right fit for your project.

## Experience & Credentials

### 1. How long have you been in business?
Look for at least 5+ years of experience. This shows stability and proven success.

### 2. Are you licensed and insured?
Ask to see current licenses and insurance certificates. Verify them with your state's licensing board.

### 3. Can you provide references?
Request at least 3-5 recent references from similar projects completed in the last 1-2 years.

### 4. Do you specialize in my type of project?
Ensure they have specific experience with kitchens, bathrooms, roofing, electrical, or whatever your project entails.

## Project Details

### 5. Can you provide a detailed written estimate?
The estimate should include materials, labor, timeline, and payment schedule - not just a total price.

### 6. What is the timeline for my project?
Know the start date, expected completion date, and what happens if there are delays.

### 7. Who will be working on my project?
Will the owner oversee it, or will subcontractors be used? Ask about their credentials too.

### 8. What happens if something unexpected is discovered?
How will change orders be handled? What's the process for additional costs?

## Payment & Contracts

### 9. What is your payment schedule?
Standard practice: 10-30% deposit, progress payments, final payment upon completion. Be suspicious of higher upfront fees.

### 10. Can you provide a detailed written contract?
Never work without one. It should cover scope of work, timeline, payment terms, and warranty information.

### 11. What is your cancellation policy?
What happens if either party needs to cancel? What fees apply?

## Quality & Communication

### 12. Do you provide a warranty on your work?
Most reputable contractors offer 1-2 year warranties on labor and materials.

### 13. How do you handle change orders?
Will they be in writing? How much notice will you give for additional costs?

### 14. What is your communication style?
How often will you receive updates? How can you reach them with questions?

### 15. Can you provide examples of your recent work?
Ask for photos, videos, or permission to visit a current or recently completed project.

## Red Flags to Watch For

If they:
- Pressure you to decide immediately
- Want cash payments only
- Won't provide references or documentation
- Can't answer questions clearly
- Seem unprofessional or disorganized

**Walk away.**

## Final Thoughts

Taking time to ask these questions will help you find a quality contractor and avoid costly mistakes. Trust your instincts - if something feels off, it probably is.
    `
  },
  'contractor-pricing-guide': {
    title: 'Understanding Contractor Pricing: What You Should Expect to Pay',
    date: '2026-01-28',
    readTime: '8 min read',
    category: 'Pricing & Budgets',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=1200&h=600&fit=crop',
    content: `
# Understanding Contractor Pricing: What You Should Expect to Pay

Contractor pricing can be confusing, but understanding how it works helps you get fair quotes and budget effectively.

## Common Pricing Models

### 1. Time & Materials (T&M)
- You pay hourly labor rates plus material costs
- Best for: Projects where scope isn't fully defined
- Pro: Flexible, no surprises
- Con: Costs can exceed budget

### 2. Fixed Price/Lump Sum
- Contractor provides one price for the entire job
- Best for: Well-defined projects with clear scope
- Pro: Budget certainty
- Con: Less flexibility for changes

### 3. Cost Plus
- Contractor charges actual costs plus a markup (10-20%)
- Best for: Complex or custom work
- Pro: Transparent pricing
- Con: Requires trust in documentation

## Typical Contractor Rates

### Hourly Rates (varies by location and specialty)
- Entry-level/helpers: $25-$45/hour
- Skilled trades: $50-$100/hour
- Specialists (electricians, plumbers): $75-$150/hour
- Contractors with crews: $100-$200+/hour

### Project Costs
- Minor repairs: $500-$2,000
- Kitchen remodel: $20,000-$75,000
- Bathroom renovation: $10,000-$35,000
- Roof replacement: $8,000-$25,000
- HVAC system: $4,000-$12,000

## Factors That Affect Price

### 1. Complexity
Complex work takes longer and costs more.

### 2. Materials Quality
Using premium materials costs more than standard options.

### 3. Timeline
Rush jobs often cost 20-30% more.

### 4. Location
Urban areas typically cost more than rural areas.

### 5. Experience Level
More experienced contractors command higher rates.

## Getting Fair Quotes

### 1. Get Multiple Quotes
Always get 3-5 quotes from different contractors. This shows the market range.

### 2. Compare Apples to Apples
Ensure all quotes include the same scope of work, materials, and timeline.

### 3. Watch for Red Flags
- Quotes significantly higher than others
- Quotes significantly lower than others
- Vague descriptions of work included

### 4. Understand What's Included
Does the quote include:
- All materials?
- Permits and inspections?
- Cleanup and debris removal?
- Warranty?

## Budget Tips

### 1. Build in a Contingency
Plan for 10-20% extra for unexpected issues.

### 2. Prioritize Your Spending
Allocate more budget to visible, high-impact areas.

### 3. Consider Long-term Value
Paying more for quality now saves money on repairs later.

### 4. Question Unusually Low Bids
If it seems too cheap, it probably is. Quality costs money.

## Payment Terms

Standard payment schedule:
- 10-30% upfront deposit
- 50% upon reaching midpoint
- 20-30% upon completion and your approval

## Conclusion

Understanding contractor pricing helps you budget effectively and negotiate fairly. Use EZLY to compare quotes from multiple verified contractors and find the best value for your project.
    `
  },
  'seasonal-home-maintenance': {
    title: 'Seasonal Home Maintenance Checklist: When to Call a Contractor',
    date: '2026-01-20',
    readTime: '6 min read',
    category: 'Maintenance',
    author: 'EZLY Team',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    content: `
# Seasonal Home Maintenance Checklist: When to Call a Contractor

Maintaining your home seasonally prevents costly repairs and keeps everything running smoothly year-round.

## Spring Maintenance

### Exterior
- [ ] Inspect roof for winter damage
- [ ] Clean gutters and downspouts
- [ ] Check for foundation cracks
- [ ] Power wash siding and deck
- [ ] Inspect and repair driveway/walkway

### HVAC
- [ ] Have AC system serviced before cooling season
- [ ] Replace furnace filter
- [ ] Check refrigerant levels

### When to Call a Contractor
- Roof damage or missing shingles
- Foundation cracks or water damage
- HVAC not cooling properly
- Gutter system damage

## Summer Maintenance

### Exterior
- [ ] Water landscaping as needed
- [ ] Check windows and caulking
- [ ] Inspect exterior paint
- [ ] Check door seals and weatherstripping

### Interior
- [ ] Inspect bathroom and kitchen for leaks
- [ ] Check plumbing
- [ ] Test smoke and carbon monoxide detectors

### When to Call a Contractor
- Water stains on ceilings or walls
- Plumbing issues
- Electrical problems
- Bathroom or kitchen issues

## Fall Maintenance

### Exterior
- [ ] Clean gutters and downspouts (again)
- [ ] Inspect and seal windows
- [ ] Check weatherstripping
- [ ] Trim tree branches away from house
- [ ] Drain exterior faucets

### Heating
- [ ] Have furnace inspected and serviced
- [ ] Check heating ducts for leaks
- [ ] Have chimney cleaned if applicable
- [ ] Inspect fireplace

### When to Call a Contractor
- Furnace not working
- Chimney issues
- Window or door seals damaged
- Roof damage from storms

## Winter Maintenance

### Interior
- [ ] Monitor heating system performance
- [ ] Check insulation in attic and basement
- [ ] Look for ice damming on roof
- [ ] Check basement for water seepage

### Safety
- [ ] Keep gutters clear of ice/snow buildup
- [ ] Ensure proper drainage away from foundation
- [ ] Check basement for moisture issues

### When to Call a Contractor
- Heating system malfunctioning
- Basement flooding or moisture
- Ice dams forming on roof
- Frozen pipes

## Year-Round Maintenance Tasks

### Monthly
- [ ] Test smoke/CO detectors
- [ ] Check for water leaks under sinks
- [ ] Inspect visible foundation

### Quarterly
- [ ] Walk around exterior perimeter
- [ ] Check basement for moisture
- [ ] Inspect attic
- [ ] Check HVAC filters

### Annually
- [ ] Full roof inspection
- [ ] Gutter cleaning
- [ ] HVAC service
- [ ] Plumbing inspection
- [ ] Electrical inspection

## DIY vs. When to Call a Contractor

### DIY Tasks
- Changing filters
- Cleaning gutters (if comfortable with heights)
- Caulking
- Painting
- Minor repairs

### Call a Contractor
- Roof work
- Electrical work
- Plumbing issues
- HVAC problems
- Structural concerns
- Gas system issues
- Permit-required work

## Budget-Friendly Tips

1. **Be Proactive** - Small maintenance now prevents big repairs later
2. **Keep Records** - Document maintenance and repairs
3. **Plan Ahead** - Schedule contractors in off-season for better rates
4. **Bundle Services** - Get one contractor to handle multiple issues
5. **Quality Over Price** - Paying for quality work saves money long-term

## Conclusion

Following a seasonal maintenance schedule helps you catch problems early, maintain your home's value, and avoid emergency repairs. Use EZLY to find trusted contractors for maintenance and repairs when you need professional help.
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
