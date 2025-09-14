import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem('kochi_metro_auth')
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth)
        setUser(authData.user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Error parsing saved auth:', error)
        localStorage.removeItem('kochi_metro_auth')
      }
    }
    setLoading(false)
  }, [])

  const login = async (credentials) => {
    try {
      // Simulate API call - replace with actual authentication
      if (credentials.username === 'admin' && credentials.password === 'admin123') {
        const userData = {
          id: '1',
          username: 'admin',
          name: 'System Administrator',
          email: 'admin@kochimetro.org',
          role: 'admin',
          department: 'Operations Control',
          avatar: '/static/admin-avatar.png'
        }
        
        setUser(userData)
        setIsAuthenticated(true)
        
        // Save to localStorage
        localStorage.setItem('kochi_metro_auth', JSON.stringify({
          user: userData,
          timestamp: Date.now()
        }))
        
        return { success: true, user: userData }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('kochi_metro_auth')
  }

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}