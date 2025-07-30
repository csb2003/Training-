import React from 'react'

const WelcomeCard = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg p-6 relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Welcome Back !</h3>
        
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Ajay Ja...</p>
            <p className="text-gray-600 text-sm">Super Ad...</p>
          </div>
          
          <div className="ml-auto text-right">
            <div className="text-2xl font-bold text-gray-800">00</div>
            <div className="text-sm text-gray-600">Total Invoice</div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-800">₹ 00</div>
            <div className="text-sm text-gray-600">Total Disbursed amount</div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4">
        <svg className="w-20 h-20 text-blue-200 opacity-50" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z"/>
        </svg>
      </div>
    </div>
  )
}

export default WelcomeCard
