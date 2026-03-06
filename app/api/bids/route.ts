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

    // Get bids for homeowner's projects
    const { data: bids, error } = await supabase
      .from('bids')
      .select(`
        *,
        project:projects(id, title, category),
        contractor:auth.users(id, email)
      `)
      .eq('project.homeowner_id', session.user.id);

    if (error) throw error;

    return NextResponse.json(bids);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
