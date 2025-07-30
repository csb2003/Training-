import React from 'react'

const InvoiceStatsCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Invoice stats Of last six Months</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Approved</span>
          </div>
          <span className="text-sm font-medium text-gray-800">65%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Disbursed</span>
          </div>
          <span className="text-sm font-medium text-gray-800">25%</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-sm text-gray-600">Rejected</span>
          </div>
          <span className="text-sm font-medium text-gray-800">10%</span>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 via-green-500 to-red-500 h-2 rounded-full" style={{width: '100%'}}></div>
        </div>
      </div>
    </div>
  )
}

export default InvoiceStatsCard
