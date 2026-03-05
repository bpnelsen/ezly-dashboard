'use client';

import { MessageInput } from '@/components/messaging/MessageInput';
import { ConversationList } from '@/components/messaging/ConversationList';
import { MessageThread } from '@/components/messaging/MessageThread';
import {
  Conversation,
  useConversations,
  useMessages,
  useSendMessage,
} from '@/lib/hooks/useMessaging';
import { useState, useEffect } from 'react';

export default function ContractorMessagesPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [showMobileThread, setShowMobileThread] = useState(false);

  // Get current user from localStorage (in production, use auth session)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setUserName(user.name || user.email);
    }
  }, []);

  const { conversations, loading: convLoading } = useConversations(
    userId,
    'contractor'
  );

  const { messages, loading: msgLoading } = useMessages(
    selectedConversation?.id || ''
  );

  const { sendMessage, loading: sendLoading } = useSendMessage();

  const handleSendMessage = async (content: string) => {
    if (!selectedConversation || !userId) return;
    await sendMessage(
      selectedConversation.id,
      userId,
      'contractor',
      userName,
      content
    );
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg shadow">
      <div className="grid grid-cols-3 gap-0 h-full max-h-screen">
        {/* Conversation List */}
        <div className={`col-span-1 border-r border-gray-200 ${showMobileThread ? 'hidden md:block' : ''}`}>
          <ConversationList
            conversations={conversations}
            selectedId={selectedConversation?.id}
            onSelect={(conv) => {
              setSelectedConversation(conv);
              setShowMobileThread(true);
            }}
            loading={convLoading}
          />
        </div>

        {/* Message Thread */}
        <div className={`col-span-2 flex flex-col ${!showMobileThread ? 'hidden md:flex' : ''}`}>
          {selectedConversation ? (
            <>
              <div className="flex-1 flex flex-col overflow-hidden">
                <MessageThread
                  conversation={selectedConversation}
                  messages={messages}
                  currentUserId={userId}
                  loading={msgLoading}
                  onBack={() => setShowMobileThread(false)}
                />
              </div>
              <MessageInput
                onSend={handleSendMessage}
                loading={sendLoading}
                disabled={!selectedConversation}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <p className="text-lg font-semibold mb-2">No conversation selected</p>
                <p className="text-sm">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
