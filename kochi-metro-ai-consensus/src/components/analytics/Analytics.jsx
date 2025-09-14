import React, { useState } from 'react'
import { useData } from '../../context/DataContext'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Clock, 
  DollarSign, 
  Activity,
  Calendar,
  Download
} from 'lucide-react'

const Analytics = () => {
  const { trainsets, loading } = useData()
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('all')

  // Sample analytics data - in production, this would come from your analytics API
  const performanceData = [
    { date: '2025-01-01', consensus: 89.2, efficiency: 91.4, accuracy: 94.1 },
    { date: '2025-01-02', consensus: 90.1, efficiency: 92.1, accuracy: 93.8 },
    { date: '2025-01-03', consensus: 88.9, efficiency: 90.8, accuracy: 95.2 },
    { date: '2025-01-04', consensus: 91.3, efficiency: 93.2, accuracy: 94.7 },
    { date: '2025-01-05', consensus: 92.1, efficiency: 94.1, accuracy: 96.1 },
    { date: '2025-01-06', consensus: 91.8, efficiency: 93.8, accuracy: 95.4 },
    { date: '2025-01-07', consensus: 93.2, efficiency: 95.1, accuracy: 96.8 }
  ]

  const agentPerformanceData = [
    { agent: 'Fitness', performance: 96, reliability: 98, speed: 92 },
    { agent: 'Job Card', performance: 94, reliability: 95, speed: 88 },
    { agent: 'Branding', performance: 92, reliability: 90, speed: 94 },
    { agent: 'Mileage', performance: 89, reliability: 92, speed: 91 },
    { agent: 'Cleaning', performance: 90, reliability: 88, speed: 89 },
    { agent: 'Stabling', performance: 95, reliability: 96, speed: 93 }
  ]

  const decisionBreakdownData = [
    { name: 'Approved', value: 68, color: '#22c55e' },
    { name: 'Maintenance', value: 22, color: '#f59e0b' },
    { name: 'Blocked', value: 10, color: '#ef4444' }
  ]

  const costSavingsData = [
    { month: 'Jul', manual: 145000, automated: 89000 },
    { month: 'Aug', manual: 152000, automated: 91000 },
    { month: 'Sep', manual: 148000, automated: 87000 },
    { month: 'Oct', manual: 159000, automated: 92000 },
    { month: 'Nov', manual: 163000, automated: 94000 },
    { month: 'Dec', manual: 156000, automated: 89000 },
    { month: 'Jan', manual: 161000, automated: 91000 }
  ]

  const MetricCard = ({ title, value, change, changeType, icon: Icon, color }) => (
    <div className="card hover:shadow-lg transition-all duration-300">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${color} mr-4`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">{title}</h3>
          <div className="flex items-center space-x-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {change && (
              <div className={`flex items-center space-x-1 ${
                changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {changeType === 'increase' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{change}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kochi-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics & Performance</h1>
          <p className="text-gray-600 mt-1">AI consensus system performance insights and metrics</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="input w-32"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <button className="btn btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="AI Accuracy"
          value="94.2%"
          change="+2.1%"
          changeType="increase"
          icon={Target}
          color="bg-green-500"
        />
        <MetricCard
          title="Avg Response Time"
          value="1.8s"
          change="-0.3s"
          changeType="increase"
          icon={Clock}
          color="bg-blue-500"
        />
        <MetricCard
          title="Cost Savings"
          value="₹2.3M"
          change="+12%"
          changeType="increase"
          icon={DollarSign}
          color="bg-purple-500"
        />
        <MetricCard
          title="System Uptime"
          value="99.8%"
          change="+0.2%"
          changeType="increase"
          icon={Activity}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* System Performance Over Time */}
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">System Performance Trends</h3>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span>AI Consensus</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Efficiency</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span>Accuracy</span>
              </div>
            </div>
          </div>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
                <YAxis domain={[85, 100]} />
                <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} />
                <Line type="monotone" dataKey="consensus" stroke="#3b82f6" strokeWidth={3} />
                <Line type="monotone" dataKey="efficiency" stroke="#22c55e" strokeWidth={3} />
                <Line type="monotone" dataKey="accuracy" stroke="#8b5cf6" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Decision Breakdown */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Decision Distribution (Last 30 Days)</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={decisionBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {decisionBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {decisionBreakdownData.map((item) => (
              <div key={item.name} className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-1">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <p className="text-lg font-bold text-gray-900">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Agent Performance Comparison */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">AI Agent Performance Comparison</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={agentPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="agent" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#3b82f6" name="Performance" />
                <Bar dataKey="reliability" fill="#22c55e" name="Reliability" />
                <Bar dataKey="speed" fill="#f59e0b" name="Speed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Savings Analysis */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Savings: Manual vs AI-Automated</h3>
          <div style={{ width: '100%', height: '300px' }}>
            <ResponsiveContainer>
              <BarChart data={costSavingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`₹${(value / 1000).toFixed(0)}K`, '']} />
                <Legend />
                <Bar dataKey="manual" fill="#ef4444" name="Manual Process" />
                <Bar dataKey="automated" fill="#22c55e" name="AI Automated" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Agent Analytics */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Individual Agent Performance Details</h3>
          <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Agent</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Decisions Made</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Accuracy</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Avg Response</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Conflicts Resolved</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '🛡️ Fitness Agent', decisions: 1247, accuracy: 96.2, response: '0.8s', conflicts: 23, status: 'Optimal' },
                { name: '🔧 Job Card Agent', decisions: 1189, accuracy: 94.1, response: '1.2s', conflicts: 31, status: 'Good' },
                { name: '🎨 Branding Agent', decisions: 892, accuracy: 92.7, response: '1.1s', conflicts: 45, status: 'Good' },
                { name: '📊 Mileage Agent', decisions: 1156, accuracy: 89.3, response: '1.5s', conflicts: 18, status: 'Fair' },
                { name: '✨ Cleaning Agent', decisions: 1034, accuracy: 90.1, response: '1.3s', conflicts: 28, status: 'Good' },
                { name: '🚊 Stabling Agent', decisions: 1298, accuracy: 95.8, response: '0.9s', conflicts: 12, status: 'Optimal' }
              ].map((agent, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium">{agent.name}</td>
                  <td className="py-3 px-4">{agent.decisions.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="mr-2">{agent.accuracy}%</span>
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${agent.accuracy}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">{agent.response}</td>
                  <td className="py-3 px-4">{agent.conflicts}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      agent.status === 'Optimal' ? 'bg-green-100 text-green-800' :
                      agent.status === 'Good' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ROI Summary */}
      <div className="card bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Return on Investment Summary</h3>
            <p className="text-gray-600">AI consensus system impact over the last 6 months</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-green-600 mb-1">₹2.3M</div>
            <div className="text-sm text-gray-600">Total Savings</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">43%</div>
            <div className="text-sm text-gray-600">Faster Decisions</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">89%</div>
            <div className="text-sm text-gray-600">Error Reduction</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">156%</div>
            <div className="text-sm text-gray-600">Efficiency Gain</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">24/7</div>
            <div className="text-sm text-gray-600">Availability</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics