# EZLY Bid Management - Old Schema API Routes

## Schema Mapping
Old columns → How to use:
- `job_id` → Use like `project_id`
- `proposal` → Use like `message`
- `estimated_duration` → Use like `timeline`

---

## ROUTE 1: Get All Bids
**File:** `app/api/bids/route.ts`

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get bids for homeowner's jobs (uses job_id)
    const { data: bids, error } = await supabase
      .from('bids')
      .select(`
        id,
        job_id,
        contractor_id,
        amount,
        proposal,
        estimated_duration,
        status,
        created_at,
        updated_at,
        job:jobs(id, title, category),
        contractor:auth.users(id, email)
      `)
      .eq('job.homeowner_id', session.user.id);

    if (error) throw error;

    // Transform for frontend consistency
    const transformedBids = bids?.map((bid: any) => ({
      ...bid,
      project_id: bid.job_id,
      project: bid.job,
      message: bid.proposal,
      timeline: bid.estimated_duration
    })) || [];

    return NextResponse.json(transformedBids);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## ROUTE 2: Accept Bid (Create Contract)
**File:** `app/api/bids/[bidId]/accept/route.ts`

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { bidId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get bid with job details (uses job_id)
    const { data: bid, error: bidError } = await supabase
      .from('bids')
      .select('*, job:jobs(homeowner_id)')
      .eq('id', params.bidId)
      .single();

    if (bidError || !bid) {
      return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
    }

    // Verify homeowner owns this job
    if (bid.job.homeowner_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update bid status to accepted
    const { error: updateError } = await supabase
      .from('bids')
      .update({ status: 'accepted' })
      .eq('id', params.bidId);

    if (updateError) throw updateError;

    // Create contract from accepted bid
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .insert({
        bid_id: params.bidId,
        job_id: bid.job_id,
        homeowner_id: session.user.id,
        contractor_id: bid.contractor_id,
        amount: bid.amount,
        status: 'pending'
      })
      .select()
      .single();

    if (contractError) throw contractError;

    return NextResponse.json({
      message: 'Bid accepted and contract created',
      contract
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## ROUTE 3: Reject Bid
**File:** `app/api/bids/[bidId]/reject/route.ts`

```typescript
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { bidId: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get bid with job details (uses job_id)
    const { data: bid, error: bidError } = await supabase
      .from('bids')
      .select('*, job:jobs(homeowner_id)')
      .eq('id', params.bidId)
      .single();

    if (bidError || !bid) {
      return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
    }

    // Verify homeowner owns this job
    if (bid.job.homeowner_id !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Update bid status to rejected
    const { error: updateError } = await supabase
      .from('bids')
      .update({ status: 'rejected' })
      .eq('id', params.bidId);

    if (updateError) throw updateError;

    return NextResponse.json({
      message: 'Bid rejected',
      bid_id: params.bidId
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

---

## Frontend Component (Works with Both)

The frontend component from earlier still works! It uses:
- `project_id` (mapped from `job_id`)
- `message` (mapped from `proposal`)
- `timeline` (mapped from `estimated_duration`)

The API routes transform the data automatically, so the frontend doesn't know about the old schema.

---

## Deployment Steps

1. **Run SQL to create contracts table:**
   ```sql
   CREATE TABLE IF NOT EXISTS contracts (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     bid_id uuid NOT NULL REFERENCES bids(id) ON DELETE CASCADE UNIQUE,
     job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
     homeowner_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     contractor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     amount decimal(10,2) NOT NULL,
     start_date date,
     completion_date date,
     status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
     contract_document_url text,
     created_at timestamp DEFAULT now(),
     updated_at timestamp DEFAULT now()
   );
   
   CREATE INDEX idx_contracts_job ON contracts(job_id);
   CREATE INDEX idx_contracts_homeowner ON contracts(homeowner_id);
   CREATE INDEX idx_contracts_contractor ON contracts(contractor_id);
   CREATE INDEX idx_contracts_status ON contracts(status);
   
   ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
   
   CREATE POLICY "Homeowners can read own contracts"
     ON contracts FOR SELECT
     USING (homeowner_id = auth.uid());
   
   CREATE POLICY "Contractors can read own contracts"
     ON contracts FOR SELECT
     USING (contractor_id = auth.uid());
   
   CREATE POLICY "Homeowners can create contracts"
     ON contracts FOR INSERT
     WITH CHECK (homeowner_id = auth.uid());
   
   CREATE POLICY "Homeowners can update own contracts"
     ON contracts FOR UPDATE
     USING (homeowner_id = auth.uid());
   ```

2. **Update API routes:**
   - Replace content of `app/api/bids/route.ts` with Route 1 above
   - Replace content of `app/api/bids/[bidId]/accept/route.ts` with Route 2 above
   - Replace content of `app/api/bids/[bidId]/reject/route.ts` with Route 3 above

3. **Keep frontend component as-is** (works with both schemas)

4. **Deploy to Vercel:**
   ```bash
   git add .
   git commit -m "feat: EZLY bid management with old schema support"
   git push origin main
   ```

---

## What Works Now

✅ Fetch all bids for homeowner's jobs
✅ Accept bids → auto-create contracts
✅ Reject bids with status updates
✅ Frontend component unchanged
✅ Real-time data from Supabase
✅ Auth-protected API routes
✅ Works with existing jobs/bids table
