'use client';
import { useRouter } from 'next/navigation';

const Dashboard: React.FC = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 to-blue-500 text-white bg-cover bg-center bg-no-repeat bg-black bg-opacity-50 " style={{backgroundImage: 'url(https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)'}}>
      <h1 className="text-4xl font-bold mb-10">Welcome to the Dashboard</h1>
      <div className="flex gap-6">
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={handleSignup}
          className="px-6 py-3 bg-green-600 rounded-lg shadow-lg hover:bg-green-700 transition duration-300"
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
