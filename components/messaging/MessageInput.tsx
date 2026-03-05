'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';

interface MessageInputProps {
  onSend: (content: string) => Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

export function MessageInput({
  onSend,
  loading = false,
  disabled = false,
}: MessageInputProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || loading || disabled) return;

    try {
      setError(null);
      await onSend(content.trim());
      setContent('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4">
      {error && (
        <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
          {error}
        </div>
      )}
      <div className="flex gap-3">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          disabled={loading || disabled}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ezly-teal disabled:bg-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!content.trim() || loading || disabled}
          className="px-4 py-2 bg-ezly-teal text-white rounded-lg hover:bg-teal-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Send className="w-4 h-4" />
          {loading ? '...' : 'Send'}
        </button>
      </div>
    </form>
  );
}
