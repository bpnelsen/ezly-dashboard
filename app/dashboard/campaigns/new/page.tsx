'use client'

export const dynamic = 'force-dynamic'

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

export default function NewCampaignPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [template, setTemplate] = useState('default')
  const [recipientCount, setRecipientCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data: session } = await supabase.auth.getSession()
      if (!session.session) {
        setError('Not authenticated')
        return
      }

      const { error: insertError } = await supabase.from('campaigns').insert({
        owner_id: session.session.user.id,
        title,
        description,
        template,
        recipients_count: recipientCount,
        sent_count: 0,
        opened_count: 0,
        clicked_count: 0,
        status: 'draft',
      })

      if (insertError) {
        setError(insertError.message)
      } else {
        router.push('/dashboard/campaigns')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-900 text-sm mb-4"
        >
          ← Back to Campaigns
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Create New Campaign</h1>
      </div>

      <div className="bg-white rounded-lg shadow p-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleCreate} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Campaign Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="e.g., Spring Promotion 2024"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your campaign..."
            />
          </div>

          <div>
            <label htmlFor="template" className="block text-sm font-medium text-gray-700 mb-2">
              Email Template *
            </label>
            <select
              id="template"
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="default">Default Template</option>
              <option value="promotional">Promotional</option>
              <option value="newsletter">Newsletter</option>
              <option value="follow-up">Follow-up</option>
              <option value="custom">Custom HTML</option>
            </select>
          </div>

          <div>
            <label htmlFor="recipients" className="block text-sm font-medium text-gray-700 mb-2">
              Number of Recipients
            </label>
            <input
              id="recipients"
              type="number"
              value={recipientCount}
              onChange={(e) => setRecipientCount(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="0"
            />
            <p className="text-sm text-gray-600 mt-1">You can select recipients in the next step</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Campaign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
