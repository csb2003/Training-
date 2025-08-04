import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { Link,useNavigate } from 'react-router-dom';


function Login({onLoginSuccess, onShowRegister}) {
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        // onLoginSuccess(data.user || email);
        localStorage.setItem('isLoggedIn', 'true')
        navigate('/dashboard')
      } else {
        setMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
        {/* Header Section with Illustration */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-6 py-6 relative">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">Welcome Back !</h1>
            <p className="text-gray-600 text-sm">
              Sign in to continue to<br />
              Cashinvoice.
            </p>
          </div>
          
          {/* Illustration */}
          <div className="absolute right-4 top-4">
            <div className="w-24 h-20 relative">
              {/* Desk */}
              <div className="absolute bottom-0 w-16 h-8 bg-gray-300 rounded-sm"></div>
              {/* Monitor */}
              <div className="absolute bottom-6 left-2 w-10 h-6 bg-blue-400 rounded-sm border-2 border-gray-400"></div>
              {/* Plant */}
              <div className="absolute bottom-8 right-2 w-2 h-4 bg-green-400 rounded-full"></div>
              <div className="absolute bottom-6 right-1 w-4 h-2 bg-orange-300 rounded-sm"></div>
              {/* Person */}
              <div className="absolute bottom-8 left-6 w-3 h-3 bg-orange-300 rounded-full"></div>
              <div className="absolute bottom-6 left-5 w-5 h-4 bg-yellow-200 rounded-sm"></div>
              {/* Chat bubble */}
              <div className="absolute top-0 right-0 w-3 h-2 bg-white rounded-full"></div>
              <div className="absolute top-1 right-2 w-1 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Logo */}
        <div className="px-6 pt-6 pb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-lg flex items-center justify-center mb-6">
            <div className="w-6 h-6 bg-white transform rotate-45"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="px-6 pb-6">
          <div className="space-y-4">
          
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
              <Lock size={16} />
              Forgot your password?
            </a>
          </div>

          {/* Register Link for New Users */}
          <div className="text-center mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up here
              </Link>
            </p>

          </div>

          {/* Message from server */}
          {message && (
            <div className="mt-4 p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="text-center text-sm text-blue-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;