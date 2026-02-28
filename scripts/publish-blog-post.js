#!/usr/bin/env node

/**
 * Automated Blog Post Publisher
 * Publishes new blog posts from queue every 3-5 business days
 * 
 * Usage: node scripts/publish-blog-post.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Blog post queue
const blogQueue = [
  {
    slug: 'kitchen-remodel-cost-breakdown',
    title: 'Kitchen Remodel Cost Breakdown: What to Budget for 2026',
    excerpt: 'Learn the detailed breakdown of kitchen remodel costs in 2026, including labor, materials, appliances, and hidden expenses.',
    category: 'Pricing & Budgets',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=600&fit=crop',
    content: `
# Kitchen Remodel Cost Breakdown: What to Budget for 2026

Planning a kitchen remodel? Understanding the cost breakdown helps you budget effectively and avoid surprises.

## Average Kitchen Remodel Costs

The total cost of a kitchen remodel varies widely based on scope:

- **Minor update:** $10,000-$20,000 (new cabinets, counters, paint)
- **Mid-range remodel:** $30,000-$60,000 (some new appliances, layout changes)
- **Major remodel:** $75,000-$150,000+ (complete redesign, high-end materials)

## Cost Breakdown by Category

### Cabinets (30-40% of budget)
- Semi-custom cabinets: $5,000-$10,000
- Custom cabinets: $10,000-$25,000
- Stock cabinets: $2,000-$5,000

### Countertops (10-15% of budget)
- Laminate: $1,500-$3,000
- Granite: $3,000-$8,000
- Quartz: $4,000-$10,000
- Butcher block: $2,500-$6,000

### Appliances (10-15% of budget)
- Basic appliances: $2,000-$4,000
- Mid-range: $4,000-$8,000
- High-end: $8,000-$20,000+

### Flooring (10% of budget)
- Tile: $2,000-$4,000
- Hardwood: $3,000-$6,000
- Luxury vinyl: $1,500-$3,000

### Labor (25-30% of budget)
- Hourly rates: $50-$100+
- Project-based: 40-50% of material costs

### Other (plumbing, electrical, lighting, etc.)
- Allow 10-15% of total budget

## Money-Saving Tips

1. **Keep the layout:** Moving plumbing/electrical is expensive
2. **Prioritize visible elements:** Focus budget on what you see
3. **Mix materials:** Splurge on counters, save on backsplash
4. **DIY where possible:** Painting, simple demolition
5. **Get multiple quotes:** Find the best contractor value
6. **Consider timing:** Off-season may have better rates

## Hidden Costs to Plan For

- **Structural issues:** Discovered during renovation
- **Code upgrades:** New electrical/plumbing requirements
- **Permit fees:** Required by most jurisdictions
- **Design fees:** Professional kitchen design
- **Contingency:** Budget 10-20% extra

## Timeline Impact on Cost

- **Quick remodel (2-3 weeks):** 5-10% premium
- **Standard remodel (4-6 weeks):** No premium
- **Extended remodel (8+ weeks):** Potential savings

## Return on Investment

Kitchen remodels typically return:
- 60-80% of investment at resale
- High satisfaction for daily use
- Improved home value
- Modern efficiency and functionality

## Conclusion

A well-planned kitchen remodel budget ensures you get quality work without breaking the bank. Use EZLY to get detailed quotes from verified contractors for your specific project.
    `
  },
  {
    slug: 'bathroom-renovation-guide',
    title: 'Complete Bathroom Renovation Guide: Step-by-Step Process',
    excerpt: 'Everything you need to know about bathroom renovations, from planning to completion. Understand timelines, budgets, and what to expect.',
    category: 'Homeowner Tips',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&h=600&fit=crop',
    content: `
# Complete Bathroom Renovation Guide: Step-by-Step Process

A bathroom renovation is a significant investment. This guide walks you through the entire process.

## Phase 1: Planning (1-2 weeks)

### Define Your Goals
- What's the primary purpose? (Updated look, functionality, resale value)
- Budget range?
- Must-have features?
- Style preferences?

### Inspiration & Design
- Collect ideas from Pinterest, magazines, showrooms
- Consider current and future needs
- Plan layout (major move = higher cost)
- Choose fixtures and finishes

### Get Professional Design Help
- Bathroom designer: $1,000-$3,000
- Design consultation: $500-$1,500
- DIY design tools: Free-$100

## Phase 2: Budgeting (1 week)

### Estimate Costs
- Fixtures: $2,000-$8,000
- Materials (tiles, paint, etc.): $1,500-$5,000
- Labor: $3,000-$10,000+
- Contingency (15%): Add extra

### Total Budget Range
- Small bathroom: $8,000-$15,000
- Medium bathroom: $15,000-$30,000
- Large/master bath: $30,000-$60,000+

## Phase 3: Contractor Selection (1-2 weeks)

### Get Multiple Bids
- Get 3-5 quotes minimum
- Ensure equal scope
- Compare apples-to-apples
- Check references

### Verify Credentials
- License and insurance
- Experience with bathroom renovations
- Timeline and warranty
- Communication style

## Phase 4: Permits & Preparation (1 week)

### Obtain Permits
- Building permit (usually required)
- Plumbing permit
- Electrical permit
- Inspection fees

### Prepare Home
- Secure alternate bathroom access
- Protect adjacent areas
- Plan for dust and noise
- Establish project timeline

## Phase 5: Demolition (2-4 days)

### Remove Old Fixtures
- Disconnect plumbing
- Remove old tile, flooring
- Take out vanity, toilet, tub
- Protect walls and floors

### Structural Work
- Fix any underlying issues
- Adjust framing if needed
- Repair water damage
- Update rough plumbing/electrical

## Phase 6: Installation (2-4 weeks)

### Rough-In Work
- Plumbing installation
- Electrical wiring
- Ventilation ducts
- Inspections

### Wall & Floor Prep
- Install cement board
- Waterproofing
- Substrate preparation

### Finish Work
- Tile installation
- Paint application
- Fixture installation
- Hardware mounting

## Phase 7: Final Inspection & Touchups (1 week)

### Professional Inspection
- Building inspector approval
- Plumbing inspection
- Electrical inspection

### Contractor Walkthrough
- Check all work quality
- Make punch list items
- Test fixtures
- Verify cleanliness

## Total Timeline

- Small bathroom: 3-4 weeks
- Medium bathroom: 4-6 weeks
- Large bathroom: 6-8 weeks

## Common Mistakes to Avoid

1. **Underestimating budget** - Add 15-20% contingency
2. **Rushing the design** - Plan thoroughly first
3. **Ignoring ventilation** - Proper exhaust prevents mold
4. **Cheap fixtures** - Quality lasts longer
5. **DIY plumbing/electrical** - Hire professionals
6. **Poor waterproofing** - Critical in bathrooms

## Conclusion

A well-planned bathroom renovation transforms your daily routine and adds home value. Use EZLY to find experienced contractors who specialize in bathroom renovations.
    `
  }
];

// Function to convert title to slug
function titleToSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

// Function to publish a blog post
function publishBlogPost(post) {
  console.log(`\n📝 Publishing: ${post.title}`);
  
  const blogPagePath = path.join(__dirname, '../app/blog/page.tsx');
  const blogDetailPath = path.join(__dirname, '../app/blog/[slug]/page.tsx');
  
  // Read existing files
  let blogPageContent = fs.readFileSync(blogPagePath, 'utf-8');
  let blogDetailContent = fs.readFileSync(blogDetailPath, 'utf-8');
  
  // Add to blog listing page
  const newPostEntry = `  {
    slug: '${post.slug}',
    title: '${post.title}',
    excerpt: '${post.excerpt}',
    date: '${new Date().toISOString().split('T')[0]}',
    readTime: '${post.readTime}',
    category: '${post.category}',
    author: 'EZLY Team',
    image: '${post.image}'
  },`;
  
  // Insert before closing bracket of posts array
  blogPageContent = blogPageContent.replace(
    /](\s+)export default/,
    `,\n${newPostEntry}\n]$1export default`
  );
  
  fs.writeFileSync(blogPagePath, blogPageContent);
  console.log('✅ Added to blog listing page');
  
  // Add to blog detail page
  const newPostDetail = `  '${post.slug}': {
    title: '${post.title}',
    date: '${new Date().toISOString().split('T')[0]}',
    readTime: '${post.readTime}',
    category: '${post.category}',
    author: 'EZLY Team',
    image: '${post.image}',
    content: \`${post.content}\`
  },`;
  
  // Insert before closing bracket of blogPosts object
  blogDetailContent = blogDetailContent.replace(
    /}(\s+)export default/,
    `,\n${newPostDetail}\n}$1export default`
  );
  
  fs.writeFileSync(blogDetailPath, blogDetailContent);
  console.log('✅ Added to blog detail page');
  
  // Commit and push
  try {
    execSync('git add app/blog/', { cwd: path.join(__dirname, '..') });
    execSync(`git commit -m "Publish blog post: ${post.title}"`, { cwd: path.join(__dirname, '..') });
    execSync('git push origin main', { cwd: path.join(__dirname, '..') });
    console.log('✅ Committed and pushed to GitHub');
    console.log('✅ Vercel will auto-deploy');
  } catch (error) {
    console.error('❌ Git error:', error.message);
  }
}

// Main execution
function main() {
  if (blogQueue.length === 0) {
    console.log('❌ No blog posts in queue');
    process.exit(1);
  }
  
  const nextPost = blogQueue[0];
  console.log('🚀 EZLY Blog Post Publisher');
  console.log(`📅 Date: ${new Date().toISOString()}`);
  console.log(`📌 Next post: ${nextPost.title}`);
  
  publishBlogPost(nextPost);
  
  console.log('\n✨ Blog post published successfully!');
  console.log(`🌐 View: https://ezly-dashboard.vercel.app/blog/${nextPost.slug}`);
}

main();
