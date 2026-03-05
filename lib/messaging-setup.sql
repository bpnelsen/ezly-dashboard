-- EZLY Messaging System - Complete Setup
-- Created: 2026-03-04

-- 1. CONVERSATIONS TABLE
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homeowner_id UUID NOT NULL,
  contractor_id UUID NOT NULL,
  project_id UUID,
  homeowner_name TEXT,
  contractor_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(homeowner_id, contractor_id, project_id)
);

-- 2. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('homeowner', 'contractor')),
  sender_name TEXT,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 3. CREATE INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(is_read) WHERE is_read = false;
CREATE INDEX IF NOT EXISTS idx_conversations_homeowner ON conversations(homeowner_id);
CREATE INDEX IF NOT EXISTS idx_conversations_contractor ON conversations(contractor_id);
CREATE INDEX IF NOT EXISTS idx_conversations_updated ON conversations(updated_at DESC);

-- 4. ENABLE ROW LEVEL SECURITY
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 5. RLS POLICIES FOR CONVERSATIONS

-- Policy 1: Users can see conversations they're part of
CREATE POLICY "Users see own conversations"
  ON conversations
  FOR SELECT
  USING (
    homeowner_id::text = auth.uid()::text 
    OR contractor_id::text = auth.uid()::text
  );

-- Policy 2: Homeowners can create conversations
CREATE POLICY "Homeowners create conversations"
  ON conversations
  FOR INSERT
  WITH CHECK (homeowner_id::text = auth.uid()::text);

-- Policy 3: Update conversations (both can)
CREATE POLICY "Users update own conversations"
  ON conversations
  FOR UPDATE
  USING (
    homeowner_id::text = auth.uid()::text 
    OR contractor_id::text = auth.uid()::text
  );

-- 6. RLS POLICIES FOR MESSAGES

-- Policy 1: Users can read messages in their conversations
CREATE POLICY "Users read own messages"
  ON messages
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (
        c.homeowner_id::text = auth.uid()::text 
        OR c.contractor_id::text = auth.uid()::text
      )
    )
  );

-- Policy 2: Users can insert messages in their conversations
CREATE POLICY "Users send messages in own conversations"
  ON messages
  FOR INSERT
  WITH CHECK (
    sender_id::text = auth.uid()::text
    AND EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (
        c.homeowner_id::text = auth.uid()::text 
        OR c.contractor_id::text = auth.uid()::text
      )
    )
  );

-- Policy 3: Users can update their own messages (read status)
CREATE POLICY "Users update own messages"
  ON messages
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM conversations c
      WHERE c.id = messages.conversation_id
      AND (
        c.homeowner_id::text = auth.uid()::text 
        OR c.contractor_id::text = auth.uid()::text
      )
    )
  );

-- 7. REALTIME REPLICATION
ALTER PUBLICATION supabase_realtime ADD TABLE conversations;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- 8. GRANT PERMISSIONS
GRANT ALL ON conversations TO authenticated;
GRANT ALL ON messages TO authenticated;
GRANT ALL ON conversations TO anon;
GRANT ALL ON messages TO anon;
