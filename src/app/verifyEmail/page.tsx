'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function VerifyEmailPage() {
  const [token, setToken] = useState('');
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false); // To track the loading state

  const verifyUserEmail = async () => {
    setLoading(true); // Start loading when the button is clicked
    try {
      await axios.post('/api/users/verifyEmail', { token });
      setVerified(true);
      setLoading(false); // Stop loading after success
    } catch (error: any) {
      setError(true);
      setLoading(false); // Stop loading after failure
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split('=')[1];
    setToken(urlToken || '');
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <div className="bg-white shadow-md p-6 rounded-lg text-center w-full max-w-md">
        {verified ? (
          <div className="text-2xl font-semibold text-green-600">
            Email Verified Successfully! 🎉
          </div>
        ) : error ? (
          <div className="text-2xl font-semibold text-red-500">
            Verification Failed. Please try again.
          </div>
        ) : (
          <div>
            <p className="text-xl font-semibold text-gray-700 mb-4">
              Click the button below to verify your email.
            </p>
            <button
              onClick={verifyUserEmail}
              disabled={loading} // Disable the button while loading
              className={`w-full p-3 text-white rounded ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
