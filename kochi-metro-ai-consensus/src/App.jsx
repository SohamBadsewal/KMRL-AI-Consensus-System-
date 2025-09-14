import React, { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './components/auth/LoginPage'
import Dashboard from './components/dashboard/Dashboard'
import AIConsensusSystem from './components/consensus/AIConsensusSystem'
import TrainsetManagement from './components/trainsets/TrainsetManagement'
import Analytics from './components/analytics/Analytics'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DataProvider } from './context/DataContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}

// Main App Layout
const AppLayout = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/ai-consensus" 
        element={
          <ProtectedRoute>
            <AIConsensusSystem />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/trainsets" 
        element={
          <ProtectedRoute>
            <TrainsetManagement />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute>
            <Analytics />
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

// Main App Component
function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="App">
          <AppLayout />
        </div>
      </DataProvider>
    </AuthProvider>
  )
}

export default App