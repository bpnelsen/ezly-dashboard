'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@ezly.co'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('authenticating')

  const redirectByRole = (role: string) => {
    if (role === 'contractor') {
      window.location.href = '/dashboard/contractor'
    } else if (role === 'admin') {
      window.location.href = '/dashboard/admin'
    } else {
      window.location.href = '/dashboard/homeowner'
    }
  }

  useEffect(() => {
    const handleCallback = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session?.user) {
          console.error('Auth error:', error)
          setStatus('error')
          router.push('/login')
          return
        }
        
        const user = session.user
        
        // Check if profile exists
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()
        
        let targetProfile = profile
        
        // Create profile if it doesn't exist
        if (!profile) {
          const searchParams = new URLSearchParams(window.location.search)
          const roleFromUrl = searchParams.get('role')
          
          let role = 'homeowner'
          if (user.email === ADMIN_EMAIL) {
            role = 'admin'
          } else if (roleFromUrl === 'contractor' || roleFromUrl === 'homeowner') {
            role = roleFromUrl
          }
          
          const { data: newProfile, error: insertError } = await supabase.from('profiles').insert({
            id: user.id,
            email: user.email,
            full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
            role: role,
          }).select().single()
          
          if (insertError) console.error('Insert error:', insertError)
          targetProfile = newProfile
        }
        
        setStatus('success')
        redirectByRole(targetProfile?.role || 'homeowner')
        
      } catch (err) {
        console.error('Callback error:', err)
        setStatus('error')
        router.push('/login')
      }
    }
    
    handleCallback()
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8">
        <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Authenticating...</h1>
        <p className="text-gray-500">Please wait while we set up your profile.</p>
      </div>
    </div>
  )
}
