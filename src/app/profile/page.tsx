'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface UserData {
  _id: string;
  name?: string; // Optional fields
  email?: string;
}

function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/users/me');
      console.log('API Response:', response.data); // Log the API response
      setUserData(response.data.data); // Set user data from API response
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      toast.error('Failed to load user data. Redirecting to login.');
      router.push('/login');
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-opacity-50 bg-cover bg-no-repeat " style={{backgroundImage: 'url(https://images.pexels.com/photos/39811/pexels-photo-39811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        {userData ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <div className="mb-4">
              <p className="text-lg font-semibold">User ID:</p>
              <p className="text-gray-700">{userData._id}</p>
              <p className="text-lg font-semibold">Email:</p>
              <p className="text-gray-700">{userData.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full p-3 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-xl font-semibold">No user data found</div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
