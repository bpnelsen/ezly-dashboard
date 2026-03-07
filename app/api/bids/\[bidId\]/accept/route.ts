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
