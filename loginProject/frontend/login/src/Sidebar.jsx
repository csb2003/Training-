import React from 'react'
import { Home, Users, FileText, CreditCard, Shield, Menu } from 'lucide-react'

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'User' },
    { icon: FileText, label: 'Entities' },
    { icon: CreditCard, label: 'Invoice' },
    { icon: Shield, label: 'Permissions' },
  ]

  return (
    <div className="bg-sidebar text-white w-64 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="text-xl font-semibold text-blue-400">Cashinvoice</span>
        </div>
        
        <div className="mb-6">
          <span className="text-gray-400 text-xs uppercase tracking-wider">MENU</span>
        </div>
        
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-sidebar-light text-white' 
                  : 'text-gray-300 hover:bg-sidebar-light hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
