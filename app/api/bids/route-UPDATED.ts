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

    // Get bids for homeowner's jobs (adapted for old schema)
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

    // Transform old schema to new schema for frontend consistency
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
