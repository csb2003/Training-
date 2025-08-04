// App.jsx
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './login'
import Register from './Register'
import MainDashboard from './mainDashboard'

function App() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route 
        path="/dashboard/*" 
        element={isLoggedIn ? <MainDashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default App;
