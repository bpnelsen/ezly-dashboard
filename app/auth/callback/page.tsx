'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase-client'

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@ezly.co'

export default function AuthCallback() {
  const router = useRouter()
  const [status, setStatus] = useState('authenticating')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Wait for any URL hash params (OAuth tokens) to be processed
        await new Promise(resolve => setTimeout(resolve, 500))
        
        // Try to get the session - Supabase handles the hash params automatically
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth error:', error)
          setStatus('error')
          router.push('/login')
          return
        }
        
        if (session?.user) {
          const user = session.user
          
          // Check if profile exists
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()
          
          // Create profile if it doesn't exist (new OAuth user)
          if (!profile) {
            const searchParams = new URLSearchParams(window.location.search)
            const roleFromUrl = searchParams.get('role')
            
            let role = 'homeowner'
            if (user.email === ADMIN_EMAIL) {
              role = 'admin'
            } else if (roleFromUrl === 'contractor' || roleFromUrl === 'homeowner') {
              role = roleFromUrl
            }
            
            await supabase.from('profiles').insert({
              id: user.id,
              email: user.email,
              full_name: user.user_metadata?.full_name || user.email?.split('@')[0],
              role: role,
            })
          }
          
          setStatus('success')
          // Use window.location for reliable redirect
          window.location.href = '/dashboard'
          return
        }
        
        // No session - check if maybe we need to wait longer
        // Try one more time after a delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        const { data: { session: retrySession } } = await supabase.auth.getSession()
        
        if (retrySession?.user) {
          window.location.href = '/dashboard'
          return
        }
        
        // No valid session found
        setStatus('no_session')
        router.push('/login')
        
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
        {status === 'authenticating' && (
          <>
            <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Authenticating...</h1>
            <p className="text-gray-500">Please wait while we verify your account.</p>
          </>
        )}
        {status === 'error' && (
          <>
            <h1 className="text-xl font-bold text-red-600 mb-2">Authentication Failed</h1>
            <p className="text-gray-500">Redirecting to login...</p>
          </>
        )}
        {status === 'no_session' && (
          <>
            <h1 className="text-xl font-bold text-gray-900 mb-2">No Session Found</h1>
            <p className="text-gray-500">Please try logging in again.</p>
          </>
        )}
        {status === 'success' && (
          <>
            <h1 className="text-xl font-bold text-green-600 mb-2">Success!</h1>
            <p className="text-gray-500">Redirecting to dashboard...</p>
          </>
        )}
      </div>
    </div>
  )
}