import WelcomeCard from './WelcomeCard'
import StatsCard from './StatsCard'
import MonthlyInvoiceCard from './MonthlyInvoiceCard'
import InvoiceStatsCard from './InvoiceStatsCard'
import { Building2, FileText, Clock, CheckCircle, XCircle, DollarSign, IndianRupee } from 'lucide-react'

const Dashboard = () => {
  const statsData = [
    {
      title: 'Total No. of Entities',
      value: '62',
      icon: Building2,
      color: 'bg-blue-500'
    },
    {
      title: 'Pending Invoices',
      value: '09',
      amount: '₹ 636,675',
      icon: Clock,
      color: 'bg-blue-500'
    },
    {
      title: 'Approved Invoices',
      value: '32',
      amount: '₹ 1,940,950',
      icon: CheckCircle,
      color: 'bg-blue-500'
    },
    {
      title: 'Rejected Invoices',
      value: '09',
      amount: '₹ 1,432,072',
      icon: XCircle,
      color: 'bg-blue-500'
    },
    {
      title: 'Disbursed Invoices',
      value: '201',
      amount: '₹ 26,687,754',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Invoice Amount',
      value: '',
      amount: '₹ 30,697,451',
      icon: IndianRupee,
      color: 'bg-blue-500'
    }
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">DASHBOARD</h1>
        <p className="text-gray-600">Welcome to Dashboard</p>

        
        <div className="text-right">
          {/* <span className="text-sm text-gray-600">Date Range:</span> */}
          <div className="flex items-center space-x-2 mt-1">
            <input
              type="text"
              placeholder="Enter Date Range"
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button className="p-1 border border-gray-300 rounded hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
              Reset
            </button>
          </div>
        </div>


      </div>

      
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <WelcomeCard />
        <MonthlyInvoiceCard />
        <InvoiceStatsCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsData.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            amount={stat.amount}
            icon={stat.icon}
            color={stat.color}
          />
        ))}
      </div>
    </div>
  )
}

export default Dashboard
