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

    // Get the bid
    const { data: bid, error: bidError } = await supabase
      .from('bids')
      .select('*, projects(homeowner_id)')
      .eq('id', params.bidId)
      .single();

    if (bidError || !bid) {
      return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
    }

    // Verify ownership
    if (bid.projects.homeowner_id !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update bid status
    const { data: updatedBid, error: updateError } = await supabase
      .from('bids')
      .update({ 
        status: 'accepted',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.bidId)
      .select()
      .single();

    if (updateError) throw updateError;

    // Create contract from bid
    const { data: contract, error: contractError } = await supabase
      .from('contracts')
      .insert({
        bid_id: bid.id,
        project_id: bid.project_id,
        homeowner_id: session.user.id,
        contractor_id: bid.contractor_id,
        amount: bid.amount,
        start_date: bid.details?.startDate,
        completion_date: bid.details?.completionDate,
        status: 'pending'
      })
      .select()
      .single();

    if (contractError) throw contractError;

    // Reject all other bids for this project
    await supabase
      .from('bids')
      .update({ 
        status: 'rejected',
        updated_at: new Date().toISOString()
      })
      .eq('project_id', bid.project_id)
      .neq('id', params.bidId)
      .eq('status', 'pending');

    return NextResponse.json({
      bid: updatedBid,
      contract
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
