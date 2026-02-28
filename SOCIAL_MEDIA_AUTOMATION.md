# EZLY Social Media Automation Guide

**LinkedIn & Facebook Integration for Automated Posting & Engagement**

---

## Overview

Three approaches to social media automation:

1. **Simple Solution:** Use Buffer/Hootsuite (easiest, no code)
2. **Medium Solution:** API integration (more control, requires setup)
3. **Advanced Solution:** Full automation (custom workflows)

---

## Option 1: Buffer (Recommended - Easiest)

**What it does:** Schedule posts, auto-post from your blog, analytics

### Setup Steps

1. **Sign up for Buffer**
   - Go to: https://buffer.com
   - Create free account (limited) or Pro ($15/month for unlimited)
   - Connect your LinkedIn & Facebook profiles

2. **Install Buffer Browser Extension**
   - Easy sharing from any website
   - https://buffer.com/browser-extension

3. **Auto-Post Your Blog**
   - Buffer can automatically post when you publish blog posts
   - Set up "RSS Feed Integration" → your blog feed
   - Configure post template

4. **Schedule Posts**
   - Write posts → let Buffer schedule them
   - Buffer has smart scheduling (best times to post)
   - Queue them up in advance

### Buffer Configuration for EZLY

**LinkedIn Posts:**
```
[Post Title]

[2-3 sentence excerpt]

👉 Read the full guide: [Link to blog]

#Contractors #HomeImprovement #EZLY
```

**Facebook Posts:**
```
[Post Title] 🏠

[Short, engaging excerpt - 100 chars max]

→ Learn more [Link]

#HomeImprovement #Contractors #EZLY
```

### Cost
- Free: 3 social accounts, 10 posts/month
- Pro: $15/month - unlimited posts, analytics
- Business: $99/month - team collaboration

**My Recommendation:** Start with Pro ($15/month)

---

## Option 2: Hootsuite (More Features)

**What it does:** Scheduling, analytics, team collaboration, auto-engagement

### Setup Steps

1. **Create Hootsuite Account**
   - https://hootsuite.com
   - Free plan or paid ($49+/month)

2. **Connect Social Accounts**
   - LinkedIn business page
   - Facebook page
   - Twitter/X (optional)
   - Instagram (optional)

3. **Schedule Content**
   - Calendar view
   - Team collaboration
   - Auto-post at optimal times

4. **Monitor Engagement**
   - Inbox: centralized messages
   - Analytics: track performance
   - Auto-respond to messages

### Hootsuite Configuration

**Content Calendar:**
```
Every 3-5 days: New blog post
- LinkedIn post
- Facebook post
- Optional: Twitter/X
```

**Content Mix:**
- 50% Blog promotion
- 30% Contractor spotlight/success stories
- 20% Educational tips/how-tos

**Auto-Publishing from RSS:**
1. Add your blog RSS feed
2. Customize post template
3. Auto-posts when blog updates
4. Automatic LinkedIn & Facebook

### Cost
- Free: 3 social accounts, basic scheduling
- Professional: $49/month - advanced features
- Business: $739/month - team management

**My Recommendation:** Free plan to start, upgrade to Professional as you grow

---

## Option 3: Native API Integration (Custom)

**What it does:** Complete control, custom automation, direct posting

### LinkedIn API Setup

1. **Create LinkedIn App**
   ```
   https://www.linkedin.com/developers/apps
   ```

2. **Get Credentials**
   - Client ID
   - Client Secret
   - Redirect URI: https://ezly-dashboard.vercel.app/auth/linkedin/callback

3. **Request Access**
   - LinkedIn requires approval for API access
   - Takes 3-5 business days
   - Apply for: Share on LinkedIn, Sign In with LinkedIn

4. **Install Node.js LinkedIn Package**
   ```bash
   npm install linkedin-api-v2
   ```

5. **Create Auto-Post Function**
   ```javascript
   // Example: Auto-post blog to LinkedIn
   const LinkedInAPI = require('linkedin-api-v2');

   async function postToLinkedIn(title, excerpt, imageUrl, blogUrl) {
     const urn = 'urn:li:person:YOUR_PERSON_URN';
     
     const post = {
       author: urn,
       lifecycleState: 'PUBLISHED',
       specificContent: {
         'com.linkedin.ugc.share': {
           shareCommentary: {
             text: `${title}\n\n${excerpt}\n\n👉 Read more: ${blogUrl}`
           },
           shareMediaCategory: 'ARTICLE',
           media: [
             {
               status: 'READY',
               description: {
                 text: title
               },
               media: imageUrl,
               title: {
                 text: title
               }
             }
           ]
         }
       },
       visibility: {
         'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
       }
     };

     return linkedin.posts.create(post);
   }
   ```

### Facebook API Setup

1. **Create Facebook App**
   ```
   https://developers.facebook.com/apps
   ```

2. **Get Access Token**
   - Facebook Graph API v18.0
   - Page Access Token (not user token)

3. **Install Facebook SDK**
   ```bash
   npm install facebook-sdk
   ```

4. **Create Auto-Post Function**
   ```javascript
   const axios = require('axios');

   async function postToFacebook(title, excerpt, imageUrl, blogUrl) {
     const pageId = 'YOUR_PAGE_ID';
     const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

     const postData = {
       message: `${title}\n\n${excerpt}`,
       link: blogUrl,
       picture: imageUrl,
       name: title,
       description: excerpt,
       access_token: accessToken
     };

     return axios.post(
       `https://graph.facebook.com/v18.0/${pageId}/feed`,
       postData
     );
   }
   ```

### Integrate with Blog Publisher

**Update `scripts/publish-blog-post.js`:**

```javascript
// Auto-post to social media when blog publishes
const LinkedInAPI = require('linkedin-api-v2');
const facebook = require('facebook-sdk');

async function publishBlogPost(post) {
  // ... existing blog publishing code ...
  
  // Auto-post to LinkedIn
  await postToLinkedIn(
    post.title,
    post.excerpt,
    post.image,
    `https://ezly-dashboard.vercel.app/blog/${post.slug}`
  );
  
  // Auto-post to Facebook
  await postToFacebook(
    post.title,
    post.excerpt,
    post.image,
    `https://ezly-dashboard.vercel.app/blog/${post.slug}`
  );
  
  console.log('✅ Posted to LinkedIn & Facebook');
}
```

### Cost
- Free (API calls included with platform accounts)
- Only pay for: hosting, optional CDN
- LinkedIn: May require premium for business use

---

## Option 4: Zapier (No-Code Integration)

**What it does:** Connect apps without coding**

### Setup

1. **Create Zapier Account**
   - https://zapier.com
   - Free tier available

2. **Create Zap: Blog → LinkedIn**
   - Trigger: RSS by Zapier (your blog feed)
   - Action: LinkedIn - Create a share
   - Template posts automatically

3. **Create Zap: Blog → Facebook**
   - Trigger: RSS by Zapier (your blog feed)
   - Action: Facebook Pages - Create a post
   - Auto-posts to your page

### Cost
- Free: 100 tasks/month (usually enough)
- Professional: $19.99/month - unlimited
- Business: $99+/month - advanced features

**My Recommendation:** Free tier for 3-5 blog posts per month

---

## Comparison Chart

| Solution | Setup Time | Cost | Control | Ease |
|----------|-----------|------|---------|------|
| **Buffer** | 15 min | $15/mo | Medium | ⭐⭐⭐⭐⭐ |
| **Hootsuite** | 20 min | $49/mo | High | ⭐⭐⭐⭐ |
| **LinkedIn API** | 2 hours | Free | Full | ⭐⭐⭐ |
| **Facebook API** | 2 hours | Free | Full | ⭐⭐⭐ |
| **Zapier** | 10 min | Free/19 | Medium | ⭐⭐⭐⭐ |

---

## Recommended Strategy for EZLY

### Phase 1: Quick Start (This Week)
```
1. Sign up for Buffer (Free or Pro)
2. Connect LinkedIn business page
3. Connect Facebook page
4. Set up RSS feed from blog
5. Start scheduling posts manually
```

**Time Investment:** 30 minutes
**Cost:** $0-15/month
**Result:** New blog posts auto-shared to both platforms

### Phase 2: Full Automation (Next 2 Weeks)
```
1. Set up Zapier (or Buffer's RSS automation)
2. Test automated posting
3. Create post templates
4. Schedule optimal times
5. Monitor engagement
```

**Time Investment:** 1-2 hours
**Cost:** $0-19/month
**Result:** Completely hands-off social posting

### Phase 3: API Integration (Optional - Later)
```
1. Create LinkedIn & Facebook apps
2. Integrate with blog publisher
3. Auto-post when blog publishes
4. Track engagement metrics
5. Optimize based on data
```

**Time Investment:** 4-6 hours
**Cost:** Free (hosting only)
**Result:** Integrated social media workflow

---

## Content Strategy for Social Media

### Posting Schedule (Using Buffer/Zapier)

**Monday 9 AM:**
- New blog post announcement
- LinkedIn: Professional angle
- Facebook: Community angle

**Wednesday 2 PM:**
- Contractor spotlight/success story
- LinkedIn: "Meet our contractors"
- Facebook: "Success stories"

**Friday 10 AM:**
- Weekly tip/advice
- LinkedIn: Industry insights
- Facebook: Homeowner tips

### Post Templates

**LinkedIn Post (Blog Announcement):**
```
Just published: [Blog Title] 📚

Quick takeaway: [One key insight from blog]

This is important because [Why homeowners care]

Read the full guide → [Blog Link]

#Contractors #HomeImprovement #EZLY
```

**Facebook Post (Blog Announcement):**
```
🏠 New Blog Post Alert!

[Blog Title]

Learn [Main benefit from post] 👇

Get the full guide (link in comments)

Like & share if this helps! ✨
```

**LinkedIn Post (Contractor Spotlight):**
```
Meet [Contractor Name] 🏆

Specialty: [Services]
Experience: [Years]
Rating: [⭐⭐⭐⭐⭐]
Projects: [# Completed]

[One sentence testimonial from homeowner]

Ready to find vetted contractors like [Name]? 
→ Join EZLY

#ContractorSpotlight #HomeImprovement
```

---

## Engagement Strategy

### Monitor Mentions
**With Buffer/Hootsuite:**
- Set up alerts for "EZLY", "contractor", "home improvement"
- Reply to comments within 2 hours
- Respond to messages same-day

### Respond to Comments
- **LinkedIn:** Professional, detailed responses
- **Facebook:** Friendly, conversational tone
- Thank people for shares
- Answer questions helpfully

### Share User Content
- **Contractor success stories** (with permission)
- **Before/after home projects**
- **Customer testimonials**
- **Homeowner reviews**

---

## Analytics & Tracking

### What to Monitor

**LinkedIn Analytics:**
- Impressions (how many see posts)
- Engagement (comments, likes, shares)
- Click-through rate (people visiting blog)
- Follower growth

**Facebook Analytics:**
- Reach (people who see posts)
- Engagement (reactions, comments, shares)
- Click-through rate
- Page likes growth

**Traffic to Blog:**
- Use UTM parameters in links
- Track: `utm_source=linkedin` or `utm_source=facebook`
- Monitor blog analytics
- See which platforms drive most traffic

### Sample UTM Links

```
Blog link: https://ezly-dashboard.vercel.app/blog/kitchen-remodel-cost-breakdown

LinkedIn: 
https://ezly-dashboard.vercel.app/blog/kitchen-remodel-cost-breakdown?utm_source=linkedin&utm_medium=social&utm_campaign=blog

Facebook:
https://ezly-dashboard.vercel.app/blog/kitchen-remodel-cost-breakdown?utm_source=facebook&utm_medium=social&utm_campaign=blog
```

---

## Quick Start (30 Minutes)

### Step 1: Choose Platform
- **Easiest:** Buffer (5-15 min to set up)
- **Most features:** Hootsuite (10-20 min to set up)
- **No-code:** Zapier (5-10 min to set up)

**My recommendation:** Buffer Pro ($15/month)

### Step 2: Sign Up
- Buffer.com
- Connect your LinkedIn & Facebook profiles
- Authorize access

### Step 3: Set Up Blog Feed
- Add your blog RSS feed to Buffer
- https://ezly-dashboard.vercel.app/blog/feed.xml
- Or manually add blogs as they publish

### Step 4: Create Templates
- Buffer lets you save "templates"
- Create LinkedIn template
- Create Facebook template
- Auto-apply to future posts

### Step 5: Test & Launch
- Schedule a test post (your latest blog)
- Check it appears on LinkedIn
- Check it appears on Facebook
- Then let it run automatically!

---

## Implementation Timeline

**This Week (Feb 28 - Mar 5):**
- [ ] Sign up for Buffer Pro ($15/month)
- [ ] Connect LinkedIn business page
- [ ] Connect Facebook page
- [ ] Set up blog RSS feed
- [ ] Create post templates
- [ ] Share existing 5 blog posts manually

**Next Week (Mar 6-12):**
- [ ] Start auto-sharing new blog posts
- [ ] Monitor engagement
- [ ] Respond to comments
- [ ] Track click-through rates

**By March 31:**
- [ ] 8 new blog posts published & shared
- [ ] Consistent social media presence
- [ ] Growing engagement on both platforms
- [ ] Traffic data from social channels

---

## Cost Breakdown

**Recommended Setup:**
```
Buffer Pro: $15/month
(Handles LinkedIn + Facebook auto-posting)

Blog automation: Free
(Already set up)

Total: $15/month
ROI: Worth it for ~20 new blog posts/quarter
```

**Alternative (Even Cheaper):**
```
Zapier Free: $0/month
(100 tasks/month = ~3-4 blog posts)

Buffer Free: $0/month
(3 accounts, 10 posts/month = manual only)

Total: $0/month
Less automated, more manual work
```

---

## Next Steps

### Immediate (Today)
1. Choose platform (recommend: Buffer Pro)
2. Sign up
3. Connect your profiles

### This Week
1. Create post templates
2. Set up blog RSS feed
3. Test with manual posts

### Going Forward
1. Auto-share new blog posts
2. Monitor engagement
3. Respond to comments
4. Track what works
5. Optimize posting times

---

## Files & Resources

**Create these files once you choose a platform:**

- `SOCIAL_MEDIA_STRATEGY.md` - Your content calendar
- `SOCIAL_MEDIA_TEMPLATES.md` - Post templates by platform
- `SOCIAL_MEDIA_ANALYTICS.md` - Tracking & reporting

---

## Support & Questions

- **Buffer support:** https://support.buffer.com
- **Hootsuite support:** https://hootsuite.com/help
- **Zapier support:** https://zapier.com/help
- **LinkedIn API docs:** https://developers.linkedin.com
- **Facebook API docs:** https://developers.facebook.com

---

**Next Action:** Choose Buffer Pro → Set up this week → Auto-posts by March 5th! 🚀

---

**Status:** Ready for implementation  
**Recommendation:** Buffer Pro ($15/month)  
**Time to set up:** 30 minutes  
**Benefit:** All blog posts auto-shared to LinkedIn & Facebook
