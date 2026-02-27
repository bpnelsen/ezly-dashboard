'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Search, Send, MoreVertical, Paperclip, Smile } from 'lucide-react'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(0)
  const [messageText, setMessageText] = useState('')

  const conversations = [
    {
      id: 1,
      name: 'ABC Electrical',
      lastMessage: 'Thanks for reaching out! We\'d be interested.',
      timestamp: '2 min ago',
      unread: true,
      avatar: 'A'
    },
    {
      id: 2,
      name: 'Smith Roofing',
      lastMessage: 'Can you send more details about the project?',
      timestamp: '1 hour ago',
      unread: false,
      avatar: 'S'
    },
    {
      id: 3,
      name: 'Green HVAC',
      lastMessage: 'We\'ll need to review our schedule.',
      timestamp: '3 hours ago',
      unread: false,
      avatar: 'G'
    },
    {
      id: 4,
      name: 'Elite Plumbing',
      lastMessage: 'Absolutely, let\'s set up a call.',
      timestamp: 'Yesterday',
      unread: false,
      avatar: 'E'
    },
  ]

  const messages = [
    {
      id: 1,
      sender: 'them',
      text: 'Hi! Thanks for reaching out about the partnership opportunity.',
      timestamp: '10:30 AM'
    },
    {
      id: 2,
      sender: 'you',
      text: 'Great to connect with you! I think there could be some good synergy between our teams.',
      timestamp: '10:35 AM'
    },
    {
      id: 3,
      sender: 'them',
      text: 'Thanks for reaching out! We\'d be interested. Can you tell me more about what you have in mind?',
      timestamp: '10:42 AM'
    },
    {
      id: 4,
      sender: 'you',
      text: 'Absolutely! I\'ll send over a proposal by end of week.',
      timestamp: '10:45 AM'
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Conversation List */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
          <div className="relative">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv, i) => (
            <button
              key={conv.id}
              onClick={() => setSelectedConversation(i)}
              className={`w-full text-left p-4 border-b border-gray-100 hover:bg-gray-50 transition ${
                selectedConversation === i ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold flex-shrink-0">
                  {conv.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className={`font-semibold text-gray-900 ${conv.unread ? 'font-bold' : ''}`}>
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0">{conv.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                </div>
                {conv.unread && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 flex-shrink-0"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-gray-200 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
              {conversations[selectedConversation].avatar}
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">{conversations[selectedConversation].name}</h2>
              <p className="text-sm text-gray-600">Active now</p>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition">
            <MoreVertical size={20} className="text-gray-600" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === 'you' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2.5 rounded-lg ${
                  msg.sender === 'you'
                    ? 'bg-blue-600 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <p className="text-sm">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.sender === 'you' ? 'text-blue-100' : 'text-gray-500'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-end gap-3">
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition text-gray-600">
              <Paperclip size={20} />
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button className="p-2.5 hover:bg-gray-100 rounded-lg transition text-gray-600">
              <Smile size={20} />
            </button>
            <button className="p-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
