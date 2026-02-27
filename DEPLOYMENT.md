# EZLY Dashboard - Deployment Guide

This guide walks through deploying the EZLY Dashboard to Vercel.

## Prerequisites

- [ ] Supabase project created and configured
- [ ] Database schema applied (via SQL editor)
- [ ] Environment variables configured locally
- [ ] GitHub account with repository
- [ ] Vercel account

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done)
   ```bash
   cd /data/.openclaw/workspace/ezly-dashboard
   git init
   git add .
   git commit -m "Initial commit: EZLY Dashboard"
   ```

2. **Add GitHub Remote**
   ```bash
   git remote add origin https://github.com/yourusername/ezly-dashboard.git
   git branch -M main
   git push -u origin main
   ```

3. **Verify `.gitignore`** includes `.env.local`
   ```bash
   cat .gitignore | grep env
   ```

## Step 2: Deploy to Vercel

### Option A: Via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Configure Project**
   - Project name: `ezly-dashboard`
   - Framework: `Next.js`
   - Root directory: `./`

5. **Add Environment Variables**
   ```bash
   vercel env add NEXT_PUBLIC_SUPABASE_URL
   vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
   vercel env add SUPABASE_SERVICE_ROLE_KEY
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add GOOGLE_CLIENT_ID
   vercel env add GOOGLE_CLIENT_SECRET
   vercel env add FACEBOOK_CLIENT_ID
   vercel env add FACEBOOK_CLIENT_SECRET
   ```

6. **Redeploy with Environment Variables**
   ```bash
   vercel --prod
   ```

### Option B: Via Vercel Dashboard

1. **Go to vercel.com**
2. **Click "New Project"**
3. **Select your GitHub repository**
4. **Configure:**
   - Framework: Next.js
   - Root Directory: ./
5. **Add Environment Variables:**
   - Go to Settings → Environment Variables
   - Add all variables from `.env.local`
6. **Click "Deploy"**

## Step 3: Configure OAuth Providers

### Google OAuth

1. **Go to Google Cloud Console** (console.cloud.google.com)

2. **Create a new project:**
   - Click the project dropdown
   - Click "NEW PROJECT"
   - Name: "EZLY"
   - Create

3. **Enable Google+ API:**
   - Search for "Google+ API"
   - Click "Enable"

4. **Create OAuth Credentials:**
   - Click "Create Credentials"
   - Choose "OAuth 2.0 Client IDs"
   - Application type: "Web application"
   - Add Authorized JavaScript origins:
     - `http://localhost:3000`
     - `https://yourdomain.com`
   - Add Authorized redirect URIs:
     - `http://localhost:3000/auth/callback`
     - `https://yourdomain.com/auth/callback`
   - Click "Create"
   - Copy Client ID and Secret
   - Add to Vercel environment variables:
     - `GOOGLE_CLIENT_ID`
     - `GOOGLE_CLIENT_SECRET`

5. **Update Supabase:**
   - Go to Supabase Dashboard
   - Click your project
   - Go to Authentication → Providers
   - Enable Google
   - Add Client ID and Secret
   - Save

### Facebook OAuth

1. **Go to Facebook Developers** (developers.facebook.com)

2. **Create a new app:**
   - Click "My Apps"
   - Click "Create App"
   - App Name: "EZLY"
   - App Purpose: Select appropriate category
   - Create

3. **Configure Facebook Login:**
   - In the app dashboard, click "Add Product"
   - Search for "Facebook Login"
   - Click "Set Up"
   - Choose "Web"
   - Skip the quick start

4. **Configure OAuth Redirect URI:**
   - Go to Settings → Basic
   - Copy App ID and App Secret
   - Add to Vercel environment variables:
     - `FACEBOOK_CLIENT_ID`
     - `FACEBOOK_CLIENT_SECRET`

5. **Update Supabase:**
   - Go to Supabase Authentication → Providers
   - Enable Facebook
   - Add App ID and Secret
   - Save

## Step 4: Set Up Database

1. **Apply Schema:**
   - Go to Supabase Dashboard
   - Click your project
   - Go to SQL Editor
   - Click "New Query"
   - Copy entire contents of `supabase-schema.sql`
   - Paste into SQL editor
   - Click "Run"
   - Confirm all tables created

2. **Load Initial Data:**
   - If you have contractor data (CSV/JSON), import via:
     - Supabase Dashboard → Table Editor
     - Click "Import Data"
     - Select your file

## Step 5: Test Deployment

1. **Visit your Vercel URL:**
   ```
   https://ezly-dashboard.vercel.app
   ```

2. **Test Authentication:**
   - [ ] Sign up with email
   - [ ] Sign in with email
   - [ ] Sign up/in with Google
   - [ ] Sign up/in with Facebook

3. **Test Core Features:**
   - [ ] View contractors list
   - [ ] View contractor details
   - [ ] Create campaign
   - [ ] View messages
   - [ ] View analytics

## Step 6: Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to Project Settings
   - Click "Domains"
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update OAuth Redirect URIs:**
   - Update all provider settings to use new domain
   - Update `NEXTAUTH_URL` in Vercel environment variables

## Production Checklist

- [ ] All environment variables set in Vercel
- [ ] Database schema applied
- [ ] OAuth providers configured
- [ ] Contractor data loaded
- [ ] Domain configured (if using custom)
- [ ] Authentication flow tested
- [ ] Core features tested
- [ ] Error handling verified
- [ ] Loading states checked
- [ ] Mobile responsiveness verified

## Monitoring & Maintenance

### Vercel Dashboard
- Monitor deployments
- Check analytics
- Set up error tracking
- Configure auto-deployment from GitHub

### Supabase Dashboard
- Monitor database usage
- Check for errors in logs
- Manage authentication events
- Monitor API usage

## Troubleshooting

### "OAuth redirect URI mismatch"
- Verify redirect URI matches in:
  - Google/Facebook provider settings
  - Supabase Authentication settings
  - Code (in OAuth callback page)

### "Database connection failed"
- Verify environment variables in Vercel:
  - `NEXT_PUBLIC_SUPABASE_URL` is correct
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
  - `SUPABASE_SERVICE_ROLE_KEY` is correct

### "Contractors not showing"
- Verify contractors table exists in Supabase
- Check that contractor data was loaded
- Verify RLS policies allow reading

### "Campaign creation failing"
- Check that campaigns table exists
- Verify RLS policies for campaigns
- Check environment variables are set

## Performance Optimization

1. **Enable Caching:**
   ```bash
   # In next.config.js
   headers: [
     {
       source: '/api/:path*',
       headers: [
         {
           key: 'Cache-Control',
           value: 'public, max-age=3600'
         }
       ]
     }
   ]
   ```

2. **Enable Image Optimization:**
   - Use `next/image` for contractor photos
   - Set proper dimensions

3. **Monitor Bundle Size:**
   ```bash
   npm run build
   # Check output bundle sizes
   ```

## Support & Documentation

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
