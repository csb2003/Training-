import React from 'react'
import Sidebar from './sidebar'

const Dashboard = ({name, onLogout}) => {
  return (
    <>
    <Sidebar></Sidebar>
        <div className="h-screen w-screen bg-gray-900 text-white flex justify-center px-3">
            <div>
                <h1 className="text-3xl font-bold">Welcome to CI Dashbaord, {name}!</h1>
                <button
                    onClick={onLogout}
                >Logout</button>
            </div>
    </div>
    </>
  )
}

export default Dashboard
