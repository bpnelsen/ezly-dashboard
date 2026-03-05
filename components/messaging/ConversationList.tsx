'use client';

import { Conversation } from '@/lib/hooks/useMessaging';
import { MessageCircle, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

interface ConversationListProps {
  conversations: Conversation[];
  selectedId?: string;
  onSelect: (conversation: Conversation) => void;
  loading?: boolean;
}

export function ConversationList({
  conversations,
  selectedId,
  onSelect,
  loading,
}: ConversationListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = useMemo(() => {
    return conversations.filter((conv) =>
      conv.contractor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.homeowner_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [conversations, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin">⏳</div>
      </div>
    );
  }

  return (
    <div className="border-r border-gray-200 h-full flex flex-col">
      {/* Search */}
      <div className="p-4 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ezly-teal"
          />
        </div>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 text-gray-500">
            <MessageCircle className="w-8 h-8 mb-2 opacity-50" />
            <p className="text-sm">No conversations</p>
          </div>
        ) : (
          filtered.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onSelect(conv)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                selectedId === conv.id ? 'bg-ezly-teal/5 border-l-4 border-l-ezly-teal' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {conv.contractor_name || 'Unknown Contractor'}
                </h3>
                {conv.unreadCount! > 0 && (
                  <span className="bg-ezly-teal text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
              {conv.lastMessage && (
                <p className="text-xs text-gray-500 truncate">
                  {conv.lastMessage.content}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">
                {new Date(conv.updated_at).toLocaleDateString()}
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
