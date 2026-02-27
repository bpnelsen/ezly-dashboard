'use client'

export const dynamic = 'force-dynamic'

'use client'

export const dynamic = 'force-dynamic'

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'
import type { Contractor } from '@/lib/types'

interface WebsiteScrape {
  id: string
  contractor_id: string
  business_hours?: string
  services?: string
  team_members?: string
  contact_info?: string
  social_media?: string
  pricing?: string
  scraped_at: string
}

export default function ContractorDetailPage() {
  const params = useParams()
  const router = useRouter()
  const contractorId = params.id as string

  const [contractor, setContractor] = useState<Contractor | null>(null)
  const [scrapeData, setScrapeData] = useState<WebsiteScrape | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadContractorData()
  }, [contractorId])

  const loadContractorData = async () => {
    try {
      setLoading(true)
      
      // Load contractor
      const { data: contractorData, error: contractorError } = await supabase
        .from('contractors')
        .select('*')
        .eq('id', contractorId)
        .single()

      if (contractorError) {
        setError('Contractor not found')
        return
      }

      setContractor(contractorData as Contractor)

      // Load website scrape data
      const { data: scrapeData } = await supabase
        .from('website_scrapes')
        .select('*')
        .eq('contractor_id', contractorId)
        .order('scraped_at', { ascending: false })
        .limit(1)
        .single()

      if (scrapeData) {
        setScrapeData(scrapeData as WebsiteScrape)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Loading...</p>
      </div>
    )
  }

  if (error || !contractor) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-800">{error || 'Error loading contractor'}</p>
        <button
          onClick={() => router.back()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-900 mb-4 text-sm"
          >
            ← Back to Contractors
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{contractor.business_name}</h1>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Edit
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Send Campaign
          </button>
        </div>
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{contractor.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900">{contractor.phone || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Website</p>
              {contractor.website ? (
                <a
                  href={contractor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {contractor.website}
                </a>
              ) : (
                <p className="text-gray-900">Not provided</p>
              )}
            </div>
            <div>
              <p className="text-sm text-gray-600">Address</p>
              <p className="text-gray-900">
                {contractor.address && contractor.city
                  ? `${contractor.address}, ${contractor.city}, ${contractor.state} ${contractor.zip_code}`
                  : 'Not provided'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Business Type</p>
              <p className="text-gray-900">{contractor.business_type || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {scrapeData && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Website Data</h2>
            <div className="space-y-3 text-sm">
              {scrapeData.business_hours && (
                <div>
                  <p className="text-gray-600 font-medium">Business Hours</p>
                  <p className="text-gray-900">{scrapeData.business_hours}</p>
                </div>
              )}
              {scrapeData.services && (
                <div>
                  <p className="text-gray-600 font-medium">Services</p>
                  <p className="text-gray-900">{scrapeData.services}</p>
                </div>
              )}
              {scrapeData.pricing && (
                <div>
                  <p className="text-gray-600 font-medium">Pricing</p>
                  <p className="text-gray-900">{scrapeData.pricing}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Team Members */}
      {scrapeData?.team_members && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Team Members</h2>
          <p className="text-gray-900">{scrapeData.team_members}</p>
        </div>
      )}

      {/* Social Media */}
      {scrapeData?.social_media && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Social Media</h2>
          <p className="text-gray-900">{scrapeData.social_media}</p>
        </div>
      )}

      {/* Scrape Info */}
      {scrapeData && (
        <div className="text-xs text-gray-600 text-center">
          Data last updated: {new Date(scrapeData.scraped_at).toLocaleString()}
        </div>
      )}
    </div>
  )
}
