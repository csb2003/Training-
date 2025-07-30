import React from 'react'

const StatsCard = ({ title, value, amount, icon: Icon, color }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      
      <div className="space-y-1">
        {value && (
          <div className="text-3xl font-bold text-gray-800">{value}</div>
        )}
        {amount && (
          <div className="text-2xl font-bold text-gray-800">{amount}</div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
