'use client'

export const dynamic = 'force-dynamic'

'use client'

export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase-client'
import type { ContractorMessage } from '@/lib/types'

export default function MessagesPage() {
  const [messages, setMessages] = useState<ContractorMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMessage, setSelectedMessage] = useState<ContractorMessage | null>(null)
  const [reply, setReply] = useState('')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    try {
      setLoading(true)
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) return

      const { data, error } = await supabase
        .from('contractor_messages')
        .select('*')
        .eq('to_user_id', session.session.user.id)
        .order('created_at', { ascending: false })

      if (error) console.error('Error loading messages:', error)
      else setMessages(data || [])
    } finally {
      setLoading(false)
    }
  }

  const handleSendReply = async () => {
    if (!reply.trim() || !selectedMessage) return

    try {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) return

      await supabase.from('contractor_messages').insert({
        from_user_id: session.session.user.id,
        to_user_id: selectedMessage.from_user_id,
        message: reply,
        read: false,
      })

      setReply('')
      loadMessages()
    } catch (error) {
      console.error('Error sending reply:', error)
    }
  }

  return (
    <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
      {/* Messages List */}
      <div className="col-span-1 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">Loading...</div>
          ) : messages.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No messages</div>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`w-full text-left p-4 border-b hover:bg-gray-50 ${
                  selectedMessage?.id === msg.id ? 'bg-blue-50' : ''
                }`}
              >
                <p className="font-medium text-gray-900 truncate">Message</p>
                <p className="text-sm text-gray-600 truncate">{msg.message}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.created_at).toLocaleDateString()}
                </p>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Message Detail */}
      <div className="col-span-2 bg-white rounded-lg shadow overflow-hidden flex flex-col">
        {selectedMessage ? (
          <>
            <div className="p-4 border-b">
              <h3 className="text-lg font-bold text-gray-900">Message Detail</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-900">{selectedMessage.message}</p>
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="border-t p-4">
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendReply}
                disabled={!reply.trim()}
                className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Send Reply
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Select a message to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
