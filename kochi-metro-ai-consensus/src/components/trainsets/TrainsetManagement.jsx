import React, { useState } from 'react'
import { useData } from '../../context/DataContext'
import { 
  Train, 
  Filter, 
  Search, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Eye,
  Settings,
  Download
} from 'lucide-react'

const TrainsetManagement = () => {
  const { trainsets, loading } = useData()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [selectedTrainset, setSelectedTrainset] = useState(null)

  // Filter and sort trainsets
  const filteredTrainsets = trainsets
    .filter(trainset => {
      const matchesSearch = trainset.id.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || trainset.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'fitness':
          return b.fitnessScore - a.fitnessScore
        case 'status':
          return a.status.localeCompare(b.status)
        case 'mileage':
          return b.totalKM - a.totalKM
        default:
          return a.id.localeCompare(b.id)
      }
    })

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'valid':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'expired':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'valid':
        return <CheckCircle className="w-4 h-4" />
      case 'expired':
        return <XCircle className="w-4 h-4" />
      case 'pending':
        return <Clock className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-kochi-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading trainset data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trainset Management</h1>
          <p className="text-gray-600 mt-1">Fleet overview, status monitoring, and maintenance planning</p>
        </div>
        <div className="flex space-x-3">
          <button className="btn btn-secondary flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="btn btn-primary flex items-center">
            <Train className="w-4 h-4 mr-2" />
            Add Trainset
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search trainsets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="valid">Valid</option>
              <option value="expired">Expired</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input"
            >
              <option value="id">Sort by ID</option>
              <option value="fitness">Sort by Fitness Score</option>
              <option value="status">Sort by Status</option>
              <option value="mileage">Sort by Mileage</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trainset Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTrainsets.map((trainset) => (
          <div
            key={trainset.id}
            className="card hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => setSelectedTrainset(trainset)}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-kochi-blue-100 rounded-lg flex items-center justify-center">
                  <Train className="w-5 h-5 text-kochi-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{trainset.id}</h3>
                  <p className="text-sm text-gray-500">{trainset.certificateType} Certificate</p>
                </div>
              </div>
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(trainset.status)}`}>
                {getStatusIcon(trainset.status)}
                <span>{trainset.status}</span>
              </div>
            </div>

            {/* Fitness Score */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Fitness Score</span>
                <span className="text-lg font-bold text-gray-900">{trainset.fitnessScore}/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    trainset.fitnessScore >= 80 ? 'bg-green-500' :
                    trainset.fitnessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${trainset.fitnessScore}%` }}
                ></div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Total KM</p>
                <p className="text-lg font-bold text-gray-900">{trainset.totalKM?.toLocaleString() || 'N/A'}</p>
              </div>
              <div className="text-center bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Avg Daily</p>
                <p className="text-lg font-bold text-gray-900">{trainset.avgDailyKM || 'N/A'} km</p>
              </div>
            </div>

            {/* Open Job Cards */}
            {trainset.openJobCards > 0 && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    {trainset.openJobCards} Open Work Order{trainset.openJobCards !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            )}

            {/* Branding Info */}
            {trainset.brandingType !== 'None' && (
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Branding:</span>
                  <span className="font-medium">{trainset.brandingType}</span>
                </div>
                {trainset.remainingHours > 0 && (
                  <div className="flex justify-between items-center text-sm mt-1">
                    <span className="text-gray-600">Remaining Hours:</span>
                    <span className="font-medium text-purple-600">{trainset.remainingHours}h</span>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 btn btn-secondary text-sm py-2">
                <Eye className="w-3 h-3 mr-1" />
                Details
              </button>
              <button className="flex-1 btn btn-primary text-sm py-2">
                <Settings className="w-3 h-3 mr-1" />
                Manage
              </button>
            </div>

            {/* Last Update */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Last updated: {new Date(trainset.lastUpdate).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTrainsets.length === 0 && (
        <div className="text-center py-12">
          <Train className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No trainsets found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* Trainset Detail Modal */}
      {selectedTrainset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTrainset.id}</h2>
                  <p className="text-gray-600">Detailed trainset information</p>
                </div>
                <button
                  onClick={() => setSelectedTrainset(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                
                {/* Status Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Certificate Status</h3>
                    <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getStatusColor(selectedTrainset.status)}`}>
                      {getStatusIcon(selectedTrainset.status)}
                      <span className="font-medium">{selectedTrainset.status}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Expires: {selectedTrainset.validityExpiry}</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Fitness Score</h3>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{selectedTrainset.fitnessScore}/100</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedTrainset.fitnessScore >= 80 ? 'bg-green-500' :
                          selectedTrainset.fitnessScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${selectedTrainset.fitnessScore}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Operational Metrics */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Operational Metrics</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 mb-1">Total KM</p>
                      <p className="text-lg font-bold">{selectedTrainset.totalKM?.toLocaleString()}</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 mb-1">Daily Average</p>
                      <p className="text-lg font-bold">{selectedTrainset.avgDailyKM} km</p>
                    </div>
                    <div className="text-center bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500 mb-1">Open Jobs</p>
                      <p className="text-lg font-bold">{selectedTrainset.openJobCards}</p>
                    </div>
                  </div>
                </div>

                {/* Branding Information */}
                {selectedTrainset.brandingType !== 'None' && (
                  <div>
                    <h3 className="font-medium text-gray-900 mb-3">Branding & Commercial</h3>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-purple-900">Branding Type:</span>
                        <span className="text-purple-700">{selectedTrainset.brandingType}</span>
                      </div>
                      {selectedTrainset.remainingHours > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-purple-900">Remaining Hours:</span>
                          <span className="text-purple-700 font-bold">{selectedTrainset.remainingHours}h</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 btn btn-secondary">
                    View Maintenance History
                  </button>
                  <button className="flex-1 btn btn-primary">
                    Schedule Maintenance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainsetManagement