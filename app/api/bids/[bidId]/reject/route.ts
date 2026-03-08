import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;

export async function POST(
  request: NextRequest,
  { params }: { params: { bidId: string } }
) {
  try {
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

    // Get the bid
    const { data: bid, error: bidError } = await supabase
      .from('bids')
      .select('*, job:jobs(homeowner_id)')
      .eq('id', params.bidId)
      .single();

    if (bidError || !bid) {
      return NextResponse.json({ error: 'Bid not found' }, { status: 404 });
    }

    // Verify ownership
    if (bid.job.homeowner_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update bid status
    const { data: updatedBid, error: updateError } = await supabase
      .from('bids')
      .update({ 
        status: 'rejected',
        updated_at: new Date().toISOString()
      })
      .eq('id', params.bidId)
      .select()
      .single();

    if (updateError) throw updateError;

    return NextResponse.json(updatedBid);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
