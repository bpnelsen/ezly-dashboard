'use client'

import { useState } from 'react'
import QuoteBuilder from '@/components/QuoteBuilder'
import { FileText, ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export default function NewQuotePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/dashboard/contractor/projects" 
          className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium mb-6 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1" />
          Back to Projects
        </Link>
        
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Quote</h1>
            <p className="text-gray-500 mt-2">Generate professional estimates straight from Ezly.</p>
        </div>

        <QuoteBuilder />
      </div>
    </div>
  )
}
