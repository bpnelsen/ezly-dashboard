import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const role = searchParams.get('role'); // 'homeowner' or 'contractor'

    if (!userId || !role) {
      return NextResponse.json(
        { error: 'Missing userId and role' },
        { status: 400 }
      );
    }

    let query = supabase
      .from('conversations')
      .select('*')
      .order('updated_at', { ascending: false });

    // Filter by role
    if (role === 'homeowner') {
      query = query.eq('homeowner_id', userId);
    } else if (role === 'contractor') {
      query = query.eq('contractor_id', userId);
    }

    const { data: conversations, error } = await query;

    if (error) {
      console.error('Fetch conversations error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch conversations' },
        { status: 500 }
      );
    }

    // Get last message for each conversation
    const conversationsWithMessages = await Promise.all(
      conversations.map(async (conv) => {
        const { data: messages } = await supabase
          .from('messages')
          .select('*')
          .eq('conversation_id', conv.id)
          .order('created_at', { ascending: false })
          .limit(1)
          .single();

        // Get unread count
        const { count: unreadCount } = await supabase
          .from('messages')
          .select('*', { count: 'exact' })
          .eq('conversation_id', conv.id)
          .eq('is_read', false)
          .neq('sender_id', userId);

        return {
          ...conv,
          lastMessage: messages,
          unreadCount: unreadCount || 0,
        };
      })
    );

    return NextResponse.json(conversationsWithMessages, { status: 200 });
  } catch (error) {
    console.error('Get conversations error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { homeownerId, contractorId, projectId, homeownerName, contractorName } =
      await req.json();

    if (!homeownerId || !contractorId) {
      return NextResponse.json(
        { error: 'Missing homeownerId or contractorId' },
        { status: 400 }
      );
    }

    // Check if conversation exists
    const { data: existingConv } = await supabase
      .from('conversations')
      .select('id')
      .eq('homeowner_id', homeownerId)
      .eq('contractor_id', contractorId)
      .eq('project_id', projectId || null)
      .single();

    if (existingConv) {
      return NextResponse.json(existingConv, { status: 200 });
    }

    // Create new conversation
    const { data: conversation, error } = await supabase
      .from('conversations')
      .insert({
        homeowner_id: homeownerId,
        contractor_id: contractorId,
        project_id: projectId,
        homeowner_name: homeownerName,
        contractor_name: contractorName,
      })
      .select()
      .single();

    if (error) {
      console.error('Create conversation error:', error);
      return NextResponse.json(
        { error: 'Failed to create conversation' },
        { status: 500 }
      );
    }

    return NextResponse.json(conversation, { status: 201 });
  } catch (error) {
    console.error('Create conversation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
