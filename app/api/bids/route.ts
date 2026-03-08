import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.slice(7);
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get bids for homeowner's jobs
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
      .eq('job.homeowner_id', user.id);

    if (error) throw error;

    // Transform for frontend
    const transformedBids = bids?.map((bid: any) => ({
      ...bid,
      project_id: bid.job_id,
      project: bid.job,
      message: bid.proposal,
      timeline: bid.estimated_duration
    })) || [];

    return NextResponse.json(transformedBids);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
