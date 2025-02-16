'use client'

import { useStore } from '@/store'
import { shallow } from 'zustand/shallow'

export const useAuth = () => {
  return useStore((state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated, 
    token: state.auth.token,
    setUser: state.setUser,
    setToken: state.setToken,
    logout: state.logout
  }))
}

export const useUI = () => {
  return useStore((state) => ({
    sidebarOpen: state.ui.sidebarOpen,
    theme: state.ui.theme,
    toggleSidebar: state.toggleSidebar,
    setTheme: state.setTheme
  }))
}