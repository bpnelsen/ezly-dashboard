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
    slug: 'why-we-vet-contractors',
    title: 'Why We Vet Every Contractor on Our Platform',
    excerpt: 'Trust is the foundation of home repair. We go behind the scenes to show you how our background-check process protects you and your property.',
    category: 'EZLY Insights',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a966512?w=1200&h=600&fit=crop',
    content: `
# Why We Vett Every Contractor on Our Platform

Trust is the foundation of home repair. We go behind the scenes to show you how our background-check process protects you and your property.

## Our Approach to Contractor Excellence
We don’t just open the doors to anyone with a business card. We require our contractors to meet high standards of service, safety, and reliability.

### The 3-Pillar Vetting Process
1. **Background Screening:** We verify professional licensure and business standing.
2. **Track-Record Verification:** We require verified references and confirm a positive history of project completion.
3. **Insurance Check:** Every contractor must provide current, active liability and worker's compensation insurance before joining EZLY.

## Why This Matters
When you welcome someone into your home, you deserve peace of mind. We believe vetted contractors lead to better project outcomes, fewer delays, and most importantly, your total satisfaction.

Use EZLY today to browse contractors that have already earned the trust of homeowners like you.
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
