import React, { useState, useEffect } from 'react'
import { useData } from '../../context/DataContext'
import { 
  Train, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Activity,
  Bot,
  Zap
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const Dashboard = () => {
  const { trainsets, loading } = useData()
  const [systemMetrics, setSystemMetrics] = useState({
    totalTrainsets: 25,
    activeTrainsets: 18,
    underMaintenance: 4,
    outOfService: 3,
    aiConfidence: 94.2,
    lastUpdate: new Date().toLocaleString()
  })

  // Calculate real metrics from data
  useEffect(() => {
    if (trainsets.length > 0) {
      const active = trainsets.filter(t => t.status === 'Valid' && t.openJobCards === 0).length
      const maintenance = trainsets.filter(t => t.openJobCards > 0).length
      const outOfService = trainsets.filter(t => t.status === 'Expired').length
      
      setSystemMetrics(prev => ({
        ...prev,
        totalTrainsets: trainsets.length,
        activeTrainsets: active,
        underMaintenance: maintenance,
        outOfService: outOfService
      }))
    }
  }, [trainsets])

  // Sample performance data
  const performanceData = [
    { time: '00:00', consensus: 89, efficiency: 92 },
    { time: '04:00', consensus: 91, efficiency: 94 },
    { time: '08:00', consensus: 94, efficiency: 96 },
    { time: '12:00', consensus: 96, efficiency: 98 },
    { time: '16:00', consensus: 94, efficiency: 95 },
    { time: '20:00', consensus: 92, efficiency: 93 },
    { time: '24:00', consensus: 94, efficiency: 94 }
  ]

  const trainsetStatusData = [
    { name: 'Active', value: systemMetrics.activeTrainsets, color: '#22c55e' },
    { name: 'Maintenance', value: systemMetrics.underMaintenance, color: '#f59e0b' },
    { name: 'Out of Service', value: systemMetrics.outOfService, color: '#ef4444' }
  ]

  const StatCard = ({ title, value, subtitle, icon: Icon, color, trend }) => (
    <div className="card hover:shadow-xl transition-all duration-300">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
            {trend && (
              <span className="text-xs text-railway-green-600 flex items-center">
                <TrendingUp className="w-3 h-3 mr-1" />
                {trend}
              </span>
            )}
          </div>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kochi-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Operations Dashboard</h1>
          <p className="text-gray-600 mt-1">Real-time system overview and AI consensus metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-railway-green-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-railway-green-500 rounded-full animate-pulse"></div>
            <span className="text-railway-green-700 text-sm font-medium">All Systems Operational</span>
          </div>
          <button className="btn btn-primary">
            <Bot className="w-4 h-4 mr-2" />
            Start AI Analysis
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Fleet"
          value={systemMetrics.totalTrainsets}
          subtitle="Trainsets managed"
          icon={Train}
          color="bg-kochi-blue-500"
        />
        <StatCard
          title="Active Service"
          value={systemMetrics.activeTrainsets}
          subtitle={`${Math.round((systemMetrics.activeTrainsets / systemMetrics.totalTrainsets) * 100)}% operational`}
          icon={CheckCircle}
          color="bg-railway-green-500"
          trend="+2.3%"
        />
        <StatCard
          title="Under Maintenance"
          value={systemMetrics.underMaintenance}
          subtitle="Scheduled repairs"
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="AI Confidence"
          value={`${systemMetrics.aiConfidence}%`}
          subtitle="Consensus accuracy"
          icon={Bot}
          color="bg-purple-500"
          trend="+1.8%"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Performance Trends */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Performance</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-kochi-blue-500 rounded-full mr-2"></div>
                <span>AI Consensus</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-railway-green-500 rounded-full mr-2"></div>
                <span>Efficiency</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis domain={[80, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="consensus" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="efficiency" 
                  stroke="#22c55e" 
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fleet Status Distribution */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Fleet Status Distribution</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={trainsetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {trainsetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {trainsetStatusData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Agents Status */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">AI Agent Consensus Status</h3>
          <div className="flex items-center space-x-2 text-sm text-railway-green-600">
            <Activity className="w-4 h-4" />
            <span>6 agents active</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'Fitness Agent', status: 'Active', confidence: 96, icon: '🛡️', focus: 'Certificate validation' },
            { name: 'Job Card Agent', status: 'Active', confidence: 94, icon: '🔧', focus: 'Maintenance scheduling' },
            { name: 'Branding Agent', status: 'Active', confidence: 92, icon: '🎨', focus: 'Contract compliance' },
            { name: 'Mileage Agent', status: 'Active', confidence: 89, icon: '📊', focus: 'Usage optimization' },
            { name: 'Cleaning Agent', status: 'Active', confidence: 95, icon: '✨', focus: 'Hygiene standards' },
            { name: 'Stabling Agent', status: 'Active', confidence: 98, icon: '🚊', focus: 'Bay optimization' }
          ].map((agent) => (
            <div key={agent.name} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{agent.icon}</span>
                  <span className="font-medium text-gray-900">{agent.name}</span>
                </div>
                <span className="badge badge-success">{agent.status}</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">{agent.confidence}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-kochi-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${agent.confidence}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{agent.focus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent System Activity</h3>
          <button className="text-sm text-kochi-blue-600 hover:text-kochi-blue-800">
            View All
          </button>
        </div>
        
        <div className="space-y-3">
          {[
            {
              time: '2 minutes ago',
              event: 'AI consensus completed for trainset KM-16',
              type: 'success',
              icon: CheckCircle
            },
            {
              time: '5 minutes ago', 
              event: 'Maintenance alert triggered for KM-02',
              type: 'warning',
              icon: AlertTriangle
            },
            {
              time: '8 minutes ago',
              event: 'Branding compliance check completed',
              type: 'info',
              icon: Activity
            },
            {
              time: '12 minutes ago',
              event: 'System performance optimized (+3% efficiency)',
              type: 'success',
              icon: Zap
            }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-3 py-2">
              <div className={`p-1 rounded-full ${
                activity.type === 'success' ? 'bg-railway-green-100' :
                activity.type === 'warning' ? 'bg-yellow-100' :
                'bg-kochi-blue-100'
              }`}>
                <activity.icon className={`w-4 h-4 ${
                  activity.type === 'success' ? 'text-railway-green-600' :
                  activity.type === 'warning' ? 'text-yellow-600' :
                  'text-kochi-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{activity.event}</p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard