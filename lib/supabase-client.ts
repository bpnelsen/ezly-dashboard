'use client'

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co'
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJycGtva2hqb212bHVtcmVrbnVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5MDk1OTEsImV4cCI6MjA4NzQ4NTU5MX0.YzU7qcsV3-un90QGEWcSj4J7-h8c2yae79LsbQOQRwg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
