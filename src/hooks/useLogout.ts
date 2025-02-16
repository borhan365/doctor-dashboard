'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'

export const useLogout = () => {
  const router = useRouter()

  const logout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      // Redirect to login page after successful logout
      router.push('/auth/login')
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Failed to logout')
    }
  }

  return { logout }
}
