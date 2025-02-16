'use client'

import { useStore } from '@/store'
import { createContext, useContext } from 'react'

const StoreContext = createContext<ReturnType<typeof useStore> | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  return (
    <StoreContext.Provider value={useStore}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStoreContext = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStoreContext must be used within StoreProvider')
  }
  return context
} 