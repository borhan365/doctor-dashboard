'use client'

import { useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useSessionStore } from '@/store/slices/sessionSlice'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { session } = useAuth()
  const { setSession } = useSessionStore()

  useEffect(() => {
    if (session?.user) {
      setSession(session.user)
    }
  }, [session, setSession])

  return <>{children}</> 
} 