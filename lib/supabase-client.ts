'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let instance: SupabaseClient | null = null

function init() {
  if (instance) return instance
  
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co'
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L7gJaRj4UpH8UtsyC0GDHQ_6MV10N4u'
    
    instance = createClient(url, key)
    return instance
  } catch (e) {
    console.error('Supabase initialization error:', e)
    return null
  }
}

export const supabase = new Proxy({} as unknown as SupabaseClient, {
  get(target, prop) {
    const client = init()
    if (!client) return undefined
    return (client as any)[prop]
  }
})
