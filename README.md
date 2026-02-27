# EZLY Dashboard

A comprehensive contractor management and campaign platform built with Next.js, Supabase, and Tailwind CSS.

## Features

### 🔐 Authentication
- Email/Password authentication
- Google OAuth
- Facebook OAuth
- Role-based access control (Owner, Admin, Contractor)

### 👥 Contractor Management
- View and search contractor database (600+ contractors)
- Contractor detail pages with scraped business data
- Contact information and website data
- Business hours, services, team members, and social media links

### 📧 Campaign Management
- Create and manage email campaigns
- Campaign templates
- Track campaign performance (opens, clicks, replies)
- Campaign status management (draft, scheduled, sent)

### 💬 Messaging System
- Send and receive messages with contractors
- Message inbox and detail views
- Real-time message notifications
- Message history and tracking

### 📊 Analytics Dashboard
- Campaign performance metrics
- Contractor engagement statistics
- Open rates and click tracking
- Activity reports

### 🎨 Role-Based Dashboards
- **Owner Dashboard**: Full platform access, analytics, campaign management
- **Admin Dashboard**: Contractor management, campaign oversight
- **Contractor Dashboard**: Profile management, received messages, campaign tracking

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth with OAuth
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account and project

## Installation

1. **Clone/Extract the project**
   ```bash
   cd ezly-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase credentials:
     - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
     - `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key

4. **Set up the database**
   - Log in to your Supabase dashboard
   - Navigate to the SQL Editor
   - Copy the entire contents of `/supabase-schema.sql`
   - Paste and execute the SQL
   - This will create all necessary tables and security policies

5. **Set up OAuth (Optional)**
   - For Google OAuth:
     - Go to Google Cloud Console
     - Create OAuth 2.0 credentials
     - Set authorized redirect URI: `https://yourapp.com/auth/callback`
     - Add credentials to `.env.local`
   
   - For Facebook OAuth:
     - Go to Facebook Developer Dashboard
     - Create OAuth app
     - Set OAuth redirect URI
     - Add credentials to `.env.local`

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Navigate to `http://localhost:3000`
   - You'll be redirected to the login page
   - Create an account or log in

## Project Structure

```
ezly-dashboard/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Root page (redirects to login/dashboard)
│   ├── login/
│   │   └── page.tsx            # Login page
│   ├── signup/
│   │   └── page.tsx            # Signup page
│   ├── auth/
│   │   └── callback/
│   │       └── page.tsx        # OAuth callback handler
│   ├── dashboard/
│   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   ├── page.tsx            # Dashboard overview
│   │   ├── contractors/
│   │   │   ├── page.tsx        # Contractor list
│   │   │   └── [id]/
│   │   │       └── page.tsx    # Contractor detail
│   │   ├── campaigns/
│   │   │   ├── page.tsx        # Campaign list
│   │   │   └── new/
│   │   │       └── page.tsx    # Create campaign
│   │   ├── messages/
│   │   │   └── page.tsx        # Messaging inbox
│   │   └── analytics/
│   │       └── page.tsx        # Analytics dashboard
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts        # Auth API endpoints
│   │   └── setup/
│   │       └── route.ts        # Database setup endpoint
│   └── globals.css             # Global styles
├── lib/
│   ├── supabase-client.ts      # Client-side Supabase config
│   ├── supabase-server.ts      # Server-side Supabase config
│   └── types.ts                # TypeScript type definitions
├── public/                     # Static assets
├── .env.example                # Example environment variables
├── .env.local                  # Local environment variables (not committed)
├── package.json                # Project dependencies
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
└── next.config.js              # Next.js configuration
```

## Database Schema

The database includes the following main tables:

- **profiles**: User profiles with role information
- **contractors**: Contractor information
- **website_scrapes**: Scraped website data for contractors
- **campaigns**: Email/SMS campaign definitions
- **campaign_recipients**: Campaign delivery tracking
- **messages**: Direct messages between users and contractors
- **interactions**: Notes and history of contractor interactions
- **analytics_snapshots**: Daily analytics data

All tables have Row Level Security (RLS) policies to ensure users can only access their own data.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Deploy to Vercel

1. **Push your code to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel.com**
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

3. **Environment Variables on Vercel**
   - Add all variables from `.env.local` to Vercel project settings
   - Redeploy after adding variables

## Usage

### Creating an Account

1. Go to Sign Up page
2. Enter your email, password, and full name
3. Select your role (Owner, Admin, or Contractor)
4. Click Sign Up
5. You'll be redirected to the dashboard

### Searching Contractors

1. Go to Contractors page
2. Use the search box to find contractors by:
   - Business name
   - Email address
   - Phone number
3. Click on a contractor to view full details

### Creating a Campaign

1. Go to Campaigns page
2. Click "+ Create Campaign"
3. Fill in campaign details:
   - Title
   - Description
   - Email template
   - Number of recipients
4. Click "Create Campaign"
5. Select recipients and send!

### Sending Messages

1. Go to Messages page
2. Select a message or create a new one
3. Type your reply
4. Click "Send Reply"

## API Endpoints

### Authentication
- `POST /api/auth` - Create user profile

### Setup
- `POST /api/setup` - Database setup instructions

## Troubleshooting

### "Database tables not found"
- Make sure you've executed the SQL schema in Supabase
- Check that your service role key is correct

### "OAuth redirect URI mismatch"
- Ensure your redirect URI in OAuth provider settings matches `https://yourapp.com/auth/callback`
- Update the URL in your provider dashboard

### "Can't load contractors"
- Verify that the `contractors` table exists in your Supabase database
- Check that you've loaded the contractor data

## Contributing

This is a working MVP. Feel free to extend with:
- SMS campaign support
- Advanced filtering and segmentation
- Real-time notifications with Supabase Realtime
- Contractor ratings and reviews
- Team collaboration features
- API for third-party integrations

## License

MIT
