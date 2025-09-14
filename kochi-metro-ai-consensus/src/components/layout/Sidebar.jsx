import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Bot, 
  Train, 
  BarChart3, 
  Settings, 
  Database,
  MessageSquare,
  Activity,
  FileText,
  Users
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      description: 'System overview and metrics'
    },
    {
      name: 'AI Consensus',
      href: '/ai-consensus',
      icon: Bot,
      description: 'Multi-agent negotiations',
      badge: 'Live'
    },
    {
      name: 'Trainset Management',
      href: '/trainsets',
      icon: Train,
      description: 'Fleet status and planning'
    },
    {
      name: 'Analytics & Reports',
      href: '/analytics',
      icon: BarChart3,
      description: 'Performance insights'
    }
  ]

  const secondaryNavigation = [
    {
      name: 'Agent Monitoring',
      href: '/agents',
      icon: Users,
      description: 'AI agent status'
    },
    {
      name: 'Data Sources',
      href: '/data-sources',
      icon: Database,
      description: 'Maximo, IoT, UNS streams'
    },
    {
      name: 'System Logs',
      href: '/logs',
      icon: FileText,
      description: 'Audit trail and logs'
    },
    {
      name: 'Configuration',
      href: '/settings',
      icon: Settings,
      description: 'System settings'
    }
  ]

  const NavItem = ({ item, isActive }) => (
    <NavLink
      to={item.href}
      className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-kochi-blue-100 text-kochi-blue-900 border-r-2 border-kochi-blue-600'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <item.icon
        className={`mr-3 h-5 w-5 transition-colors ${
          isActive ? 'text-kochi-blue-600' : 'text-gray-500 group-hover:text-gray-700'
        }`}
      />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span>{item.name}</span>
          {item.badge && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 animate-pulse">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
      </div>
    </NavLink>
  )

  return (
    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg border-r border-gray-200 pt-16 z-40">
      <div className="h-full flex flex-col">
        
        {/* Main Navigation */}
        <div className="flex-1 px-4 py-6">
          <nav className="space-y-2">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Main Navigation
              </h3>
              {navigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.href}
                />
              ))}
            </div>

            {/* System Management */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                System Management
              </h3>
              {secondaryNavigation.map((item) => (
                <NavItem
                  key={item.name}
                  item={item}
                  isActive={location.pathname === item.href}
                />
              ))}
            </div>
          </nav>
        </div>

        {/* System Status Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="space-y-3">
            
            {/* AI Agent Status */}
            <div className="flex items-center space-x-2">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 bg-railway-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Bot className="w-3 h-3 text-white" />
                </div>
                <div className="w-6 h-6 bg-kochi-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <MessageSquare className="w-3 h-3 text-white" />
                </div>
                <div className="w-6 h-6 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Activity className="w-3 h-3 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-gray-900">6 AI Agents</p>
                <p className="text-xs text-gray-500">All systems operational</p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-white rounded p-2">
                <div className="text-railway-green-600 font-semibold">98.2%</div>
                <div className="text-gray-500">Uptime</div>
              </div>
              <div className="bg-white rounded p-2">
                <div className="text-kochi-blue-600 font-semibold">1.2s</div>
                <div className="text-gray-500">Avg Response</div>
              </div>
            </div>

            {/* Version Info */}
            <div className="text-xs text-gray-400 text-center">
              <p>Autogen 4.0+ Framework</p>
              <p>v1.0.0 - Build 2025.01</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar