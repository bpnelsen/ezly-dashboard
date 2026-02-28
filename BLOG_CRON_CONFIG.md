# Blog Publishing Cron Configuration

**Automated blog post publishing system**

## Setup Instructions

### Step 1: Configure the Cron Job

The blog publishing cron job is configured to run every 3-5 business days at 9:00 AM MST.

**Cron Expression:**
```
0 9 1,4,7,10,13,16,19,22,25,28 * *
```
(Approximately every 3 days, but skips weekends automatically)

**Better Expression (Every 3-5 business days):**
```
0 9 * * 1-5
```
(Runs Mon-Fri only, you manually trigger or let it run on a 3-5 day interval)

### Step 2: Execute the Publisher Script

**Manual Run:**
```bash
cd /data/.openclaw/workspace/ezly-dashboard
node scripts/publish-blog-post.js
```

**Automated via Cron (Linux/Mac):**
```bash
# Edit crontab
crontab -e

# Add this line (runs every Monday, Wednesday, Friday at 9 AM MST):
0 9 * * 1,3,5 cd /data/.openclaw/workspace/ezly-dashboard && node scripts/publish-blog-post.js >> /data/.openclaw/workspace/logs/blog-publish.log 2>&1
```

**Via OpenClaw Cron:**
```bash
# Schedule using openclaw commands
openclaw cron add "blog-publish" "0 9 * * 1,3,5" "node /data/.openclaw/workspace/ezly-dashboard/scripts/publish-blog-post.js"
```

## System Overview

```
Blog Queue (BLOG_SCHEDULE.md)
    ↓
publish-blog-post.js Script
    ↓
Updates app/blog/page.tsx
Updates app/blog/[slug]/page.tsx
    ↓
Git Commit & Push
    ↓
GitHub
    ↓
Vercel Auto-Deploy
    ↓
Live Site Updated
    ↓
New blog post visible at ezly-dashboard.vercel.app/blog
```

## Queue Management

### Current Queue Status
- Posts queued: 8 complete posts ready to publish
- Next publish: March 3-5, 2026
- Schedule: Every 3-5 business days thereafter

### Queue Location
```
File: /data/.openclaw/workspace/BLOG_SCHEDULE.md
Script: /data/.openclaw/workspace/ezly-dashboard/scripts/publish-blog-post.js
```

### To Add More Posts to Queue

Edit `/data/.openclaw/workspace/BLOG_SCHEDULE.md` and add new post entries under the "Blog Post Queue" section.

**Format:**
```markdown
### Post #: Title (STATUS)
- **Title:** Full title here
- **Category:** Category name
- **Read Time:** X min
- **Date:** Auto-scheduled
- **Image:** Unsplash image URL
- **Status:** ✅ Ready to publish

**Content:**
Full markdown content here...
```

Then add to the script's `blogQueue` array in `/scripts/publish-blog-post.js`.

## Monitoring & Logs

### Log File Location
```
/data/.openclaw/workspace/logs/blog-publish.log
```

### View Recent Publishes
```bash
tail -50 /data/.openclaw/workspace/logs/blog-publish.log
```

### Check Cron Execution
```bash
# View system cron logs
grep CRON /var/log/syslog

# Or check OpenClaw logs
openclaw logs
```

## Manual Blog Post Publishing

If you need to publish immediately:

```bash
cd /data/.openclaw/workspace/ezly-dashboard
node scripts/publish-blog-post.js
```

This will:
1. Take the first post from the queue
2. Add it to both blog pages
3. Commit to GitHub
4. Push to origin
5. Trigger Vercel deployment

## Blog Growth Statistics

**Monthly Projections:**
- March 2026: ~8 posts (5 existing + 3 new)
- April 2026: ~12 posts (5 existing + 7 new)
- May 2026: ~16 posts (5 existing + 11 new)

**SEO Impact:**
- ~40 unique long-tail keywords targeted
- Growing organic search traffic
- Improved domain authority
- Better homeowner engagement

## Content Calendar Template

**Use this to plan future blog posts:**

```
Week 1: Kitchen Costs
Week 2: Bathroom Renovation
Week 3: Contractor Insurance
Week 4: Roof Replacement
Week 5: DIY vs Professional
```

## Troubleshooting

### Cron Not Running?

1. **Check if cron service is running:**
   ```bash
   systemctl status cron
   ```

2. **Verify crontab entry:**
   ```bash
   crontab -l
   ```

3. **Check script permissions:**
   ```bash
   chmod +x /data/.openclaw/workspace/ezly-dashboard/scripts/publish-blog-post.js
   ```

4. **Test script manually:**
   ```bash
   node /data/.openclaw/workspace/ezly-dashboard/scripts/publish-blog-post.js
   ```

### Posts Not Appearing on Live Site?

1. **Check GitHub:**
   - Visit https://github.com/bpnelsen/ezly-dashboard/commits/main
   - Should see new commit from blog publisher

2. **Check Vercel:**
   - Visit https://vercel.com/dashboard
   - Should see new deployment
   - Wait for deployment to complete

3. **Force clear cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
   - Or clear browser cache

### Git Commit Failed?

Make sure:
- Git is configured with user.name and user.email
- You have push access to GitHub
- Personal access token is valid (if using HTTPS)
- No uncommitted changes blocking the push

## Performance Notes

**Script Runtime:**
- ~5-10 seconds per post
- Minimal CPU usage
- Minimal memory usage
- Safe to run frequently

**GitHub Limits:**
- No API calls, uses git CLI
- No rate limiting concerns
- Commits preserved in history

**Vercel Deployment:**
- Auto-deploys on push
- Builds in ~2-3 minutes
- Automatic rollback on build failure

## Future Enhancements

Potential improvements:
- [ ] Email notification when post publishes
- [ ] Slack integration for team notification
- [ ] Social media auto-posting
- [ ] Analytics tracking per post
- [ ] Reader engagement metrics
- [ ] A/B testing post titles
- [ ] SEO optimization suggestions

## Support

For issues or questions:
- Check logs: `tail -50 /data/.openclaw/workspace/logs/blog-publish.log`
- Manual test: `node scripts/publish-blog-post.js`
- GitHub status: https://github.com/bpnelsen/ezly-dashboard

---

**Configuration Ready:** ✅  
**Status:** Awaiting cron setup  
**Last Updated:** February 28, 2026  
**Next Action:** Set up cron job with system administrator
