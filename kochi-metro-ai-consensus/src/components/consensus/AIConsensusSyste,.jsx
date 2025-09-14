import React, { useState, useEffect, useRef } from 'react'
import { useData } from '../../context/DataContext'
import { 
  Bot, 
  MessageSquare, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Zap,
  Brain,
  Target
} from 'lucide-react'

const AIConsensusSystem = () => {
  const { trainsets, loading } = useData()
  const [isNegotiating, setIsNegotiating] = useState(false)
  const [currentRound, setCurrentRound] = useState(0)
  const [agentMessages, setAgentMessages] = useState([])
  const [consensusProgress, setConsensusProgress] = useState(0)
  const [selectedTrainset, setSelectedTrainset] = useState('KM-01')
  const [finalDecision, setFinalDecision] = useState(null)
  const messagesEndRef = useRef(null)

  // AI Agents Configuration
  const agents = {
    fitness: {
      name: 'Fitness Assessment Agent',
      icon: '🛡️',
      color: 'text-red-600',
      bg: 'bg-red-50',
      specialty: 'Safety & Compliance',
      personality: 'Strict safety enforcer who prioritizes regulatory compliance'
    },
    jobcard: {
      name: 'Maintenance Coordinator',
      icon: '🔧', 
      color: 'text-green-600',
      bg: 'bg-green-50',
      specialty: 'Work Order Management',
      personality: 'Practical scheduler focused on efficient maintenance workflows'
    },
    branding: {
      name: 'Commercial Compliance Agent',
      icon: '🎨',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      specialty: 'Revenue Optimization',
      personality: 'Contract-focused agent ensuring advertising commitments'
    },
    mileage: {
      name: 'Fleet Optimization Agent',
      icon: '📊',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
      specialty: 'Usage Balancing',
      personality: 'Data-driven optimizer for component longevity'
    },
    cleaning: {
      name: 'Service Quality Agent',
      icon: '✨',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      specialty: 'Passenger Experience',
      personality: 'Quality-focused agent ensuring hygiene standards'
    },
    stabling: {
      name: 'Logistics Coordinator',
      icon: '🚊',
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      specialty: 'Operational Efficiency',
      personality: 'Strategic planner optimizing bay assignments'
    },
    mediator: {
      name: 'Consensus Mediator',
      icon: '⚖️',
      color: 'text-gray-700',
      bg: 'bg-gray-50',
      specialty: 'Decision Synthesis',
      personality: 'Impartial facilitator building group consensus'
    }
  }

  // Simulation messages for different phases
  const negotiationScripts = {
    round1: [
      { agent: 'mediator', message: '🎯 Initiating consensus evaluation for trainset ' + selectedTrainset + '. All agents please provide initial assessments.', type: 'system' },
      { agent: 'fitness', message: '⚠️ Safety analysis: Certificate status is VALID until 2026-10-01. No compliance issues detected. Recommending APPROVE for service.', type: 'assessment' },
      { agent: 'jobcard', message: '🔧 Maintenance review: 0 open work orders, last service completed successfully. Ready for operational deployment.', type: 'assessment' },
      { agent: 'branding', message: '🎨 Commercial analysis: 53 hours remaining on BR-2025-01 contract. Priority deployment recommended for revenue optimization.', type: 'assessment' },
      { agent: 'mileage', message: '📊 Usage metrics: 226 km/day average, well within optimal range. Component wear patterns are acceptable.', type: 'assessment' },
      { agent: 'cleaning', message: '✨ Service quality: Deep cleaning completed 2 days ago. Passenger comfort standards maintained.', type: 'assessment' },
      { agent: 'stabling', message: '🚊 Logistics assessment: Bay-16 assignment optimal with 0 shunting moves required. High priority score 8.8.', type: 'assessment' }
    ],
    round2: [
      { agent: 'mediator', message: '⚖️ All initial assessments positive. Checking for conflicts and edge cases. Any concerns from specialized agents?', type: 'mediation' },
      { agent: 'branding', message: '🎨 PRIORITY ALERT: Contract deadline approaching fast. This trainset MUST be prioritized for maximum exposure hours.', type: 'concern' },
      { agent: 'mileage', message: '📊 Agreed. Usage data supports deployment. Component condition allows for extended service without maintenance intervention.', type: 'support' },
      { agent: 'fitness', message: '🛡️ Safety protocols satisfied. No additional inspections required. Clearing for immediate service.', type: 'approval' },
      { agent: 'cleaning', message: '✨ Passenger experience metrics excellent. Recent cleaning maintains our quality standards.', type: 'confirmation' },
      { agent: 'stabling', message: '🚊 Optimal positioning confirmed. Morning deployment will be seamless with current bay assignment.', type: 'logistics' }
    ],
    round3: [
      { agent: 'mediator', message: '⚖️ Strong consensus emerging. Final recommendation synthesis in progress...', type: 'synthesis' },
      { agent: 'jobcard', message: '🔧 Maintenance schedule clear. Next service not due for 2 weeks. Full operational window available.', type: 'confirmation' },
      { agent: 'branding', message: '🎨 Revenue impact: Deploying this trainset will generate optimal contract fulfillment. Commercial priority HIGH.', type: 'business' },
      { agent: 'mediator', message: '⚖️ CONSENSUS REACHED: All agents agree on IMMEDIATE INDUCTION. Confidence score: 96.8%. Decision finalized.', type: 'decision' }
    ]
  }

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [agentMessages])

  // Start AI negotiation simulation
  const startNegotiation = async () => {
    setIsNegotiating(true)
    setCurrentRound(0)
    setAgentMessages([])
    setConsensusProgress(0)
    setFinalDecision(null)

    // Simulate multi-round negotiation
    const rounds = ['round1', 'round2', 'round3']
    
    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
      setCurrentRound(roundIndex + 1)
      const roundMessages = negotiationScripts[rounds[roundIndex]]
      
      for (let messageIndex = 0; messageIndex < roundMessages.length; messageIndex++) {
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))
        
        const message = {
          ...roundMessages[messageIndex],
          id: Date.now() + Math.random(),
          timestamp: new Date().toLocaleTimeString(),
          round: roundIndex + 1
        }
        
        setAgentMessages(prev => [...prev, message])
        setConsensusProgress(((roundIndex * roundMessages.length + messageIndex + 1) / 
                             (rounds.length * roundMessages.reduce((sum, round) => sum + roundMessages.length, 0) / rounds.length)) * 100)
      }
      
      // Pause between rounds
      if (roundIndex < rounds.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }

    // Set final decision
    setFinalDecision({
      trainsetId: selectedTrainset,
      decision: 'APPROVED_FOR_INDUCTION',
      confidence: 96.8,
      reasoning: 'All agents reached unanimous agreement. Safety, maintenance, commercial, and operational requirements satisfied.',
      timestamp: new Date().toLocaleString(),
      agentVotes: {
        fitness: 'APPROVE',
        jobcard: 'APPROVE', 
        branding: 'APPROVE',
        mileage: 'APPROVE',
        cleaning: 'APPROVE',
        stabling: 'APPROVE'
      }
    })

    setIsNegotiating(false)
  }

  const getMessageStyle = (type) => {
    switch (type) {
      case 'system': return 'border-l-4 border-l-gray-400 bg-gray-50'
      case 'assessment': return 'border-l-4 border-l-blue-400 bg-blue-50'
      case 'concern': return 'border-l-4 border-l-yellow-400 bg-yellow-50'
      case 'approval': return 'border-l-4 border-l-green-400 bg-green-50'
      case 'support': return 'border-l-4 border-l-green-400 bg-green-50'
      case 'confirmation': return 'border-l-4 border-l-blue-400 bg-blue-50'
      case 'mediation': return 'border-l-4 border-l-purple-400 bg-purple-50'
      case 'synthesis': return 'border-l-4 border-l-indigo-400 bg-indigo-50'
      case 'decision': return 'border-l-4 border-l-green-500 bg-green-100 font-semibold'
      case 'business': return 'border-l-4 border-l-purple-400 bg-purple-50'
      case 'logistics': return 'border-l-4 border-l-pink-400 bg-pink-50'
      default: return 'border-l-4 border-l-gray-400 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Consensus Engine</h1>
          <p className="text-gray-600 mt-1">Multi-agent trainset evaluation and decision making</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500">
            Status: <span className={`font-medium ${isNegotiating ? 'text-orange-600' : 'text-green-600'}`}>
              {isNegotiating ? 'NEGOTIATING' : 'READY'}
            </span>
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Consensus Control Panel</h3>
          <div className="flex items-center space-x-2">
            {isNegotiating && (
              <div className="flex items-center space-x-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                <span className="text-sm">Round {currentRound}/3</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          
          {/* Trainset Selection */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Trainset for Evaluation
            </label>
            <select
              value={selectedTrainset}
              onChange={(e) => setSelectedTrainset(e.target.value)}
              disabled={isNegotiating}
              className="input"
            >
              {trainsets.slice(0, 5).map((trainset) => (
                <option key={trainset.id} value={trainset.id}>
                  {trainset.id} - {trainset.status} ({trainset.fitnessScore}/100)
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={startNegotiation}
              disabled={isNegotiating}
              className="btn btn-primary flex items-center"
            >
              {isNegotiating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Negotiating...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start Consensus
                </>
              )}
            </button>
            
            <button
              onClick={() => {
                setAgentMessages([])
                setConsensusProgress(0)
                setFinalDecision(null)
                setCurrentRound(0)
              }}
              disabled={isNegotiating}
              className="btn btn-secondary flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {(isNegotiating || consensusProgress > 0) && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Consensus Progress</span>
              <span className="font-medium">{Math.round(consensusProgress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-kochi-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${consensusProgress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Agent Status Overview */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Agent Network Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(agents).map(([key, agent]) => (
            <div key={key} className={`p-4 rounded-lg border-2 transition-all duration-300 ${
              isNegotiating ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-gray-50'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{agent.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 text-sm">{agent.name}</h4>
                  <p className="text-xs text-gray-600">{agent.specialty}</p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  isNegotiating ? 'bg-orange-400 animate-pulse' : 'bg-green-400'
                }`}></div>
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">{agent.personality}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Negotiation Feed */}
      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Live Agent Communication
            {agentMessages.length > 0 && (
              <span className="ml-2 text-sm text-gray-500">({agentMessages.length} messages)</span>
            )}
          </h3>
          {isNegotiating && (
            <div className="flex items-center space-x-2 text-sm text-orange-600">
              <Brain className="w-4 h-4 animate-pulse" />
              <span>AI agents are thinking...</span>
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto font-mono text-sm">
          {agentMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <Bot className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Waiting for AI consensus to begin...</p>
                <p className="text-xs mt-2">Click "Start Consensus" to initiate agent negotiations</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {agentMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-3 rounded-lg animate-fade-in ${getMessageStyle(message.type)}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{agents[message.agent]?.icon || '🤖'}</span>
                      <span className={`font-medium ${agents[message.agent]?.color || 'text-gray-700'}`}>
                        {agents[message.agent]?.name || 'System'}
                      </span>
                      <span className="text-xs bg-white bg-opacity-50 px-2 py-1 rounded">
                        Round {message.round}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-800 leading-relaxed">{message.message}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Final Decision Panel */}
      {finalDecision && (
        <div className="card border-2 border-green-200 bg-green-50">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-green-900 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2" />
              Consensus Decision Reached
            </h3>
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">
                {finalDecision.confidence}% Confidence
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Decision Details */}
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Final Recommendation</h4>
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">APPROVED FOR INDUCTION</p>
                      <p className="text-sm text-gray-600">Trainset {finalDecision.trainsetId}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{finalDecision.reasoning}</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Decision Metadata</h4>
                <div className="bg-white rounded-lg p-4 border space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Decision Time:</span>
                    <span className="font-medium">{finalDecision.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Processing Duration:</span>
                    <span className="font-medium">2.5 minutes</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Consensus Method:</span>
                    <span className="font-medium">Unanimous Agreement</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Votes */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Individual Agent Votes</h4>
              <div className="bg-white rounded-lg p-4 border">
                <div className="space-y-3">
                  {Object.entries(finalDecision.agentVotes).map(([agentKey, vote]) => (
                    <div key={agentKey} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{agents[agentKey]?.icon}</span>
                        <span className="text-sm font-medium text-gray-900">
                          {agents[agentKey]?.name}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="badge badge-success">{vote}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <button className="btn btn-secondary">
              View Detailed Report
            </button>
            <button className="btn btn-success">
              <Zap className="w-4 h-4 mr-2" />
              Execute Decision
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIConsensusSystem