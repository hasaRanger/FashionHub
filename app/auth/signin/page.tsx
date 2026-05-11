'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';

export default function SignInPage() {
  const router = useRouter();
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        // Set token in localStorage and cookie
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        // Set cookie for middleware
        document.cookie = `authToken=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        
        router.push('/home');
      } else {
        const data = await res.json();
        setError(data.error || 'Sign in failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="flex items-center justify-between px-5 pt-6 pb-4">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center"
        >
          <ChevronLeft size={20} className="text-gray-800" />
        </button>
        <span className="text-base font-semibold text-gray-900">Sign In</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col justify-center px-8 pb-20">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-sm text-gray-400">Sign in to access your cart and orders</p>
        </div>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Enter username"
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">Demo: testuser</p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 text-gray-900 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
              placeholder="Enter password"
              disabled={loading}
            />
            <p className="text-xs text-gray-400 mt-1">Demo: password123</p>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-full bg-brand text-white font-semibold text-sm hover:bg-orange-500 transition-colors disabled:opacity-70 mt-4"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={() => router.push('/auth/signup')}
              className="text-brand font-semibold hover:underline"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
