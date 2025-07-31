// import React from 'react'
// import Sidebar from './sidebar'
// import Header from './Header'

// const Dashboard = ({name, onLogout}) => {
//   return (
//     <div className="h-screen w-screen bg-gray-900 text-white">
//       <div className="flex h-full">
//         <Sidebar />
        
//         <div className="flex-1 flex flex-col">
//           <Header />
          
//           <div className="flex-1 flex justify-center items-center px-3">
//             <div>
//               <h1 className="text-3xl font-bold">Welcome to CI Dashboard, {name}!</h1>
//               <button
//                 onClick={onLogout}
//                 className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard

import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/dashboard'
import { Routes, Route } from 'react-router'
// import { Users } from 'lucide-react'
import Users from './components/Users'
import Add_Entities from './components/Entities/Add_Entities'
import List_entity from './components/Entities/List_entity'
import Add_Invoice from './components/Invoice/Add_Invoice'
import List_Invoice from './components/Invoice/List_Invoice'

function MainDashboard({name,onLogout}) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/users' element={<Users />}/>
            <Route path='/entities/Add_Entities' element = {<Add_Entities/> }/>
            <Route path='/entities/List_entity' element = {<List_entity/>}/>
            <Route path='/invoice/Add_Invoice' element = {<Add_Invoice/>}/>
            <Route path='/invoice/List_Invoice' element = {<List_Invoice/>}/>
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default MainDashboard
