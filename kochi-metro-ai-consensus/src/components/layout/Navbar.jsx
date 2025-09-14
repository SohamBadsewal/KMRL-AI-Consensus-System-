import React, { useState, useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Bell, Settings, LogOut, User, Clock } from 'lucide-react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [currentTime, setCurrentTime] = useState(new Date())
  const [showUserMenu, setShowUserMenu] = useState(false)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout()
    }
  }

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-kochi-blue-600 rounded-lg flex items-center justify-center mr-3">
                <span className="text-white font-bold text-sm">KM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kochi Metro AI System</h1>
                <p className="text-xs text-gray-500">Intelligent Consensus Engine</p>
              </div>
            </div>
          </div>

          {/* Center - System Status */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-railway-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-railway-green-500 rounded-full animate-pulse"></div>
              <span className="text-railway-green-700 text-sm font-medium">AI Agents Active</span>
            </div>
            
            <div className="flex items-center space-x-2 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-mono">
                {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
              </span>
            </div>
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center space-x-4">
            
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* Settings */}
            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <div className="w-8 h-8 bg-kochi-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-kochi-blue-600" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.role || 'Administrator'}</p>
                </div>
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <p className="text-xs text-gray-400 mt-1">{user?.department}</p>
                  </div>
                  
                  <div className="py-1">
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <User className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Settings className="w-4 h-4 mr-3" />
                      System Preferences
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 py-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Time Display */}
      <div className="md:hidden bg-gray-50 border-t border-gray-200 px-4 py-2">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-railway-green-500 rounded-full animate-pulse"></div>
            <span>AI System Online</span>
          </div>
          <div className="font-mono">
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar