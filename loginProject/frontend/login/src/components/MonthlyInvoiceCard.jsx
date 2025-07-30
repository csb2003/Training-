import React from 'react'

const MonthlyInvoiceCard = () => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Invoice Amount</h3>
      
      <div className="mb-4">
        <p className="text-gray-600 text-sm mb-2">This month</p>
        <div className="text-3xl font-bold text-gray-800">₹6,555,647</div>
        <p className="text-green-600 text-sm mt-1">42.98% ↗ From</p>
      </div>
      
      <div className="relative">
        <div className="w-24 h-24 mx-auto">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${42.98 * 2.51} 251`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-semibold text-gray-800">43%</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonthlyInvoiceCard
