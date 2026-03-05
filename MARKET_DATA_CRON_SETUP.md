# Market Data Auto-Update Setup Guide

## Overview

This guide explains how to set up automatic monthly updates to the Market Intelligence data.

**What it does:**
- ✅ Runs on the **1st of every month at 9 AM UTC** (2 AM MST)
- ✅ Updates market data in Supabase
- ✅ **Auto-deploys to Vercel** after update
- ✅ Can be manually triggered anytime

---

## 🔧 Setup Instructions

### Step 1: Add GitHub Secrets

The workflow needs two secrets to access Supabase and Vercel.

**Go to:** https://github.com/bpnelsen/ezly-dashboard/settings/secrets/actions

**Add these secrets:**

1. **NEXT_PUBLIC_SUPABASE_URL**
   - Value: `https://rrpkokhjomvlumreknuq.supabase.co`

2. **SUPABASE_SERVICE_KEY**
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTkwOTU5MSwiZXhwIjoyMDg3NDg1NTkxfQ.kFTdS-I7SnPPkgqYu0amlzLQgnGJppb4ZKkfIyCy0JA`

3. **VERCEL_TOKEN** (Optional but recommended)
   - Get from: https://vercel.com/account/tokens
   - Create a new token with "Full Access"

### Step 2: Verify Workflow

Go to: https://github.com/bpnelsen/ezly-dashboard/actions

You should see **"Update Market Data Monthly"** workflow listed.

### Step 3: Test Manually (Optional)

Click the workflow → **"Run workflow"** → **"Run workflow"**

This will trigger the update immediately for testing.

---

## 📅 Schedule

**Default:** First day of every month at 9 AM UTC (2 AM MST)

**Change the schedule:**

Edit `.github/workflows/update-market-data.yml`:

```yaml
on:
  schedule:
    - cron: '0 9 1 * *'  # Change this line
```

**Cron syntax:** `minute hour day month day-of-week`

**Examples:**
- `0 9 * * 0` = Every Sunday at 9 AM
- `0 0 1 * *` = 1st of month at midnight UTC
- `0 12 * * *` = Every day at noon UTC

---

## 🔄 What Happens During Update

1. **GitHub Actions runs** the schedule
2. **Checkout** the latest code
3. **Install dependencies** (@supabase/supabase-js)
4. **Update market data** by running `scripts/update-market-data.js`
5. **Commit changes** (if any) back to GitHub
6. **Trigger Vercel deployment** via API
7. **Vercel builds & deploys** with fresh data

---

## 📊 Market Data Source

The script uses data from: `market-intelligence/data/homeadvisor-slc.json`

**Current data:**
- 72 records (12 trades × 6 locations)
- Salt Lake County area
- Average prices with ranges
- Seasonal adjustments

**To update the source data:**
1. Update `market-intelligence/data/homeadvisor-slc.json`
2. Push to GitHub
3. Next scheduled run will use new data

---

## 🚀 Manual Deployment

**Run the update script locally:**

```bash
npm run update-market-data
```

**Requirements:**
- NEXT_PUBLIC_SUPABASE_URL set in `.env.local`
- SUPABASE_SERVICE_KEY set in `.env.local`

---

## 📝 Monitoring

### Check Workflow Status

Visit: https://github.com/bpnelsen/ezly-dashboard/actions

Look for **"Update Market Data Monthly"** runs.

Green checkmark ✅ = Success  
Red X ❌ = Failed (check logs)

### View Deployment

Visit: https://vercel.com/bpnelsen/ezly-dashboard

Check the deployments timeline to see when updates triggered.

### Verify Data Updated

Visit: https://ezly-dashboard.vercel.app/dashboard/contractor/market-intelligence

Check if the "Last Updated" timestamp reflects the latest run.

---

## 🐛 Troubleshooting

### Workflow not running

- Check that GitHub Actions is enabled in repo settings
- Verify secrets are set correctly
- Check workflow file syntax

### Supabase update fails

- Verify SUPABASE_SERVICE_KEY is correct
- Check Supabase table exists
- Check RLS policies allow service role writes

### Vercel not deploying

- Verify VERCEL_TOKEN is set
- Check token has correct permissions
- Try manual deploy via Vercel dashboard

### Data not updating

- Check workflow ran successfully
- Verify Supabase received new data (check database)
- Check app is pulling from Supabase (not cached)

---

## 💡 Tips

**Disable temporarily:**
- Go to workflow file, comment out the `schedule:` section
- Push to GitHub
- Re-enable by uncommenting

**Manual runs are faster:**
- GitHub Actions cron can be ~5 min late
- For urgent updates, manually trigger via Actions tab

**Monitor logs:**
- Click on a workflow run to see detailed logs
- Check for errors and timestamps

---

## 🔐 Security Notes

- Service keys should NEVER be in code (only in secrets)
- Tokens rotate every 90 days (set a reminder)
- Supabase RLS still applies (good security)
- GitHub Actions logs don't show secrets (secure)

---

## 📧 Status Updates

The workflow logs will show:
- When update started
- How many records updated
- Update timestamp
- Deployment trigger status

Check these in GitHub Actions logs for verification.

---

## 🎯 Next Steps

1. ✅ Add the 3 GitHub secrets above
2. ✅ Verify workflow is enabled
3. ✅ Optionally test with manual run
4. ✅ Sit back and let it auto-update monthly!

---

**Status:** ✅ Ready to Deploy  
**Frequency:** Monthly (1st at 9 AM UTC)  
**Last Updated:** 2026-03-05
