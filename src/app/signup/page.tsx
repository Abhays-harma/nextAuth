'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup success', response.data);
      setLoading(false);
      router.push('/login');
    } catch (error) {
      console.log('error', error);
      toast.error('Signup failed');
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat  bg-opacity-50 "  style={{backgroundImage: 'url(https://images.pexels.com/photos/3373054/pexels-photo-3373054.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="flex flex-col items-center space-y-6">
        {/* Logo */}
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <div className='text-3xl text-black font-extrabold mb-4 flex items-center justify-center '>NeuraChip</div>

          {/* Sign Up Form */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border border-gray-300 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded mb-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button
            className={`w-full p-2 text-white text-sm rounded ${buttonDisabled
                ? 'bg-blue-200 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
              }`}
            onClick={onSignup}
            disabled={buttonDisabled || loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* Terms of Service */}
          <p className="text-xs text-gray-500 text-center mt-4">
            By signing up, you agree to our <span className="text-blue-500">Terms</span>,{' '}
            <span className="text-blue-500">Privacy Policy</span>, and{' '}
            <span className="text-blue-500">Cookies Policy</span>.
          </p>
        </div>

        {/* Login Redirect */}
        <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-sm text-center">
          <p className="text-sm">
            Have an account?{' '}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
