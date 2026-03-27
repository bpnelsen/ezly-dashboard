'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let instance: SupabaseClient | null = null

function init() {
  if (instance) return instance
  
  try {
    // Use env vars with hardcoded fallback
    const url = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_URL : undefined) || 'https://rrpkokhjomvlumreknuq.supabase.co'
    const key = (typeof window !== 'undefined' ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY : undefined) || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDk1OTEsImV4cCI6MjA4NzQ4NTU5MX0.YzU7qcsV3-un90QGEWcSj4J7-h8c2yae79LsbQOQRwg'
    
    if (!url || url === 'undefined' || !key || key === 'undefined') {
      console.error('Supabase config missing, using fallback')
      instance = createClient('https://rrpkokhjomvlumreknuq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDk1OTEsImV4cCI6MjA4NzQ4NTU5MX0.YzU7qcsV3-un90QGEWcSj4J7-h8c2yae79LsbQOQRwg')
    } else {
      instance = createClient(url, key)
    }
    return instance
  } catch (e) {
    console.error('Supabase initialization error:', e)
    // Return client with fallback credentials anyway
    try {
      instance = createClient('https://rrpkokhjomvlumreknuq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDk1OTEsImV4cCI6MjA4NzQ4NTU5MX0.YzU7qcsV3-un90QGEWcSj4J7-h8c2yae79LsbQOQRwg')
      return instance
    } catch (e2) {
      console.error('Fallback also failed:', e2)
      return null
    }
  }
}

export const supabase = new Proxy({} as unknown as SupabaseClient, {
  get(target, prop) {
    const client = init()
    if (!client) return undefined
    return (client as any)[prop]
  }
})
