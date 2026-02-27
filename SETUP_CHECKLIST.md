# EZLY Dashboard - Setup Checklist

Use this checklist to complete the EZLY Dashboard setup.

## Local Development Setup

### Environment Configuration
- [ ] Copy `.env.example` to `.env.local`
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` from Supabase dashboard
- [ ] Add `NEXT_PUBLIC_SUPABASE_ANON_KEY` from Supabase
- [ ] Add `SUPABASE_SERVICE_ROLE_KEY` from Supabase
- [ ] Set `NEXTAUTH_URL` to `http://localhost:3000`
- [ ] Generate `NEXTAUTH_SECRET` (use `openssl rand -base64 32`)
- [ ] Add placeholder OAuth credentials (can be empty for now)

### Dependencies
- [ ] Run `npm install`
- [ ] Verify no errors during installation
- [ ] Check that `node_modules` created successfully

### Database Setup
- [ ] Log in to Supabase dashboard
- [ ] Open SQL Editor
- [ ] Create new query
- [ ] Copy entire `supabase-schema.sql` file
- [ ] Paste into SQL editor
- [ ] Execute the query
- [ ] Verify all tables created successfully

### Test Local Development
- [ ] Run `npm run dev`
- [ ] Open `http://localhost:3000`
- [ ] Verify redirect to login page
- [ ] Try signing up with email
- [ ] Verify user created in Supabase auth
- [ ] Verify profile created in profiles table
- [ ] Log out and sign back in
- [ ] Verify contractor list loads
- [ ] Check contractor detail page

## OAuth Setup (Optional but Recommended)

### Google OAuth
- [ ] Go to Google Cloud Console
- [ ] Create new project named "EZLY"
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
- [ ] Add localhost and production origins
- [ ] Add localhost and production redirect URIs
- [ ] Copy Client ID and Secret to `.env.local`
- [ ] Add credentials to Supabase Google provider
- [ ] Test Google sign-up locally
- [ ] Test Google sign-up on production

### Facebook OAuth
- [ ] Go to Facebook Developers
- [ ] Create new app
- [ ] Add Facebook Login product
- [ ] Configure OAuth redirect URI
- [ ] Copy App ID and Secret to `.env.local`
- [ ] Add credentials to Supabase Facebook provider
- [ ] Test Facebook sign-up locally
- [ ] Test Facebook sign-up on production

## Initial Data Loading

### Contractors
- [ ] Get contractor data (CSV/JSON)
- [ ] Verify data format matches contractors table schema
- [ ] Import via Supabase table editor
- [ ] Verify 600+ contractors loaded
- [ ] Spot-check a few records

### Website Scrapes
- [ ] Get scraped website data
- [ ] Verify data format matches website_scrapes table schema
- [ ] Import via Supabase
- [ ] Test contractor detail page with scrape data

## Feature Testing

### Authentication
- [ ] Email/password sign-up works
- [ ] Email/password sign-in works
- [ ] Google OAuth works (if configured)
- [ ] Facebook OAuth works (if configured)
- [ ] Sign-out works
- [ ] Role-based redirects work

### Contractors
- [ ] Contractor list loads (600+ contractors)
- [ ] Search functionality works
- [ ] Pagination works
- [ ] Contractor detail page shows all info
- [ ] Website scrape data displays correctly

### Campaigns
- [ ] Campaign list loads
- [ ] Create new campaign works
- [ ] Campaign form validation works
- [ ] Campaign status filtering works

### Messages
- [ ] Message list loads
- [ ] Message detail view works
- [ ] Reply composition works
- [ ] Send reply works

### Analytics
- [ ] Analytics dashboard loads
- [ ] Stats display correctly
- [ ] Charts/progress bars render
- [ ] Data is accurate

### Role-Based Features
- [ ] Owner sees full dashboard
- [ ] Admin sees contractor management
- [ ] Contractor sees limited view
- [ ] Logout works for all roles

## Code Quality

- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All imports are correct
- [ ] No unused variables
- [ ] Code is formatted consistently

## Performance Checklist

- [ ] Build completes without errors
- [ ] Build output is reasonable size
- [ ] Pages load quickly (< 2s)
- [ ] No unnecessary re-renders
- [ ] Images load properly
- [ ] Mobile responsive (test on mobile)

## Deployment Preparation

### Code Repository
- [ ] Initialize Git repository
- [ ] Add all files except `.env.local`
- [ ] Create initial commit
- [ ] Push to GitHub
- [ ] Verify all files on GitHub (except `.env.local`)

### Vercel Setup
- [ ] Connect GitHub repository to Vercel
- [ ] Select Next.js framework
- [ ] Set root directory to `./`
- [ ] Add all environment variables to Vercel
- [ ] Deploy to Vercel
- [ ] Get production URL

### Production Testing
- [ ] Visit production URL
- [ ] Test sign-up with email
- [ ] Test sign-in
- [ ] Test contractor list
- [ ] Test contractor detail
- [ ] Test campaign creation
- [ ] Test messaging
- [ ] Test analytics

### Post-Deployment
- [ ] Update OAuth redirect URIs to production URL
- [ ] Update `NEXTAUTH_URL` to production URL
- [ ] Re-deploy to Vercel
- [ ] Test OAuth flows on production
- [ ] Monitor Vercel analytics
- [ ] Check Supabase logs for errors

## Documentation

- [ ] README.md is complete and accurate
- [ ] DEPLOYMENT.md is complete
- [ ] SETUP_CHECKLIST.md (this file) is done
- [ ] Comments added to complex code sections
- [ ] API endpoints documented

## Security Review

- [ ] `.env.local` is in `.gitignore`
- [ ] No hardcoded secrets in code
- [ ] RLS policies enabled on all tables
- [ ] CORS properly configured
- [ ] Authentication required on protected routes
- [ ] No sensitive data in logs

## Final Verification

- [ ] All checklist items completed
- [ ] No critical bugs found
- [ ] Performance is acceptable
- [ ] Mobile responsive works well
- [ ] All features tested
- [ ] Documentation is complete
- [ ] Code is production-ready
- [ ] Ready for user launch

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| Dependencies fail to install | Clear npm cache: `npm cache clean --force` then reinstall |
| Build fails with TypeScript errors | Check all imports and types in affected files |
| Database tables not found | Ensure schema was executed in Supabase SQL editor |
| Contractors not loading | Verify contractors table has data, check RLS policies |
| OAuth not working | Verify credentials, redirect URIs, and Supabase provider settings |
| Vercel deployment fails | Check environment variables, git commits, and build logs |
| Mobile layout broken | Check Tailwind responsive classes, test with browser dev tools |

---

## Next Phase Ideas (Future)

- [ ] SMS campaign support
- [ ] Contractor ratings/reviews
- [ ] Advanced filtering and segmentation
- [ ] Team collaboration features
- [ ] API for third-party integrations
- [ ] Real-time Supabase subscriptions
- [ ] Email template builder
- [ ] Bulk import/export
- [ ] Custom branding/white-label
- [ ] Advanced analytics/reporting

---

**Last Updated:** Feb 27, 2026  
**Status:** Ready for deployment  
**Next Step:** Follow DEPLOYMENT.md for production launch
