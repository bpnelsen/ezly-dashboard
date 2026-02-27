import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rrpkokhjomvlumreknuq.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_L7gJaRj4UpH8UtsyC0GDHQ_6MV10N4u'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
