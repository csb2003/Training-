// Your actual Sidebar.jsx file with React Router
import React, { useState } from 'react'
import { Home, Users, FileText, CreditCard, Shield, ChevronDown, ChevronRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const [openDropdowns, setOpenDropdowns] = useState({
    user: false,
    entities: false,
    invoice: false, 
    permissions: false
  })

  const location = useLocation();
  const currPath = location.pathname

  const toggleDropdown = (section) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const menuItems = [
  { 
    icon: Home, 
    label: 'Dashboard', 
    path: '/dashboard', 
    type: 'single' 
  },
  { 
    icon: Users, 
    label: 'User', 
    path: '/dashboard/users', 
    type: 'dropdown',
    key: 'user',
    subItems: [
      { label: 'List Users', path: '/dashboard/users' },
    ]
  },
  { 
    icon: FileText, 
    label: 'Entities', 
    path: '/dashboard/entities', 
    type: 'dropdown',
    key: 'entities',
    subItems: [
      { label: 'Add Entity', path: '/dashboard/entities/add_entities' },
      { label: 'List Entity', path: '/dashboard/entities/list_entity' }
    ]
  },
  { 
    icon: CreditCard, 
    label: 'Invoice', 
    path: '/dashboard/invoice', 
    type: 'dropdown',
    key: 'invoice',
    subItems: [
      { label: 'Add Invoice', path: '/dashboard/invoice/Add_Invoice' },
      { label: 'List Invoice', path: '/dashboard/invoice/List_Invoice' }
    ]
  },
  { 
    icon: Shield, 
    label: 'Permissions', 
    path: '/dashboard/permissions', 
    type: 'dropdown',
    key: 'permissions',
    subItems: []
  }
]


  const isActiveItem = (item) => {
    if (item.type === 'single') {
      return item.path === currPath
    }
    
    if (item.subItems) {
      return item.subItems.some(subItem => subItem.path === currPath)
    }
    
    return item.path === currPath
  }

  const isActiveSubItem = (subItemPath) => {
    return subItemPath === currPath
  }

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">CI</span>
          </div>
          <span className="text-xl font-semibold text-blue-400">Cashinvoice</span>
        </div>
        
        <div className="mb-6">
          <span className="text-gray-400 text-xs uppercase tracking-wider">MENU</span>
        </div>
        
        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.type === 'single' ? (
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActiveItem(item)
                      ? 'text-white' 
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </Link>
              ) : (
                <div>
                  <button
                    onClick={() => toggleDropdown(item.key)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isActiveItem(item)
                        ? 'text-white' 
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    {openDropdowns[item.key] ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                  
                  {openDropdowns[item.key] && (
                    <div className="ml-6 mt-1 space-y-1">
                      {item.subItems.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          className={`block px-3 py-2 text-sm rounded-lg transition-colors ${
                            isActiveSubItem(subItem.path)
                              ? 'text-white' 
                              : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                          }`}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default Sidebar