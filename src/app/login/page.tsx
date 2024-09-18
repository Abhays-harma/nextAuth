'use client';
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // Importing router

function LoginPage() {
  const router = useRouter(); // Initializing router
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('/api/users/login', { email, password });
      console.log('Login successful:', response.data);
      toast.success('Login successful!');
      router.push('/profile'); // Redirect to profile after successful login
    } catch (err) {
      console.log('Login error:', err);
      setError('Invalid email or password.');
      toast.error('Login failed.');
    }
    setLoading(false);
  };

  const goToSignup = () => {
    router.push('/signup'); // Navigate to the sign-up page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat bg-black bg-opacity-50" style={{backgroundImage: 'url(https://images.pexels.com/photos/3373054/pexels-photo-3373054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <div className='text-3xl text-black font-extrabold mb-4 flex items-center justify-center '>NeuraChip</div>
        {error && (
          <div className="mb-4 text-red-500 text-center">
            {error}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded mb-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full p-3 text-white rounded ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {/* Sign Up Option */}
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <button
            onClick={goToSignup} // Handle Sign Up navigation
            className="text-blue-500 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
