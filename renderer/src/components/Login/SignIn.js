import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as localforage from 'localforage';
import supabase from '../../../../supabase';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (data.session) {
            console.log('sign in success', data);
            await localforage.setItem('userProfile', data);
            router.push('/projects');
        } else {
            setError(signInError);
            console.log('sign in error', signInError);
        }
    };

    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign In</h2>
          {error && <p className="text-red-600 mb-2">{error.toString()}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="border-gray-400 border-2 p-2 w-full rounded"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="border-gray-400 border-2 p-2 w-full rounded"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-blue-400"
            >
              Sign In
            </button>
          </form>
          <p className="text-gray-600 text-sm mt-4">
            Don't have an account?
            {' '}
            <Link href="/signUp" className="text-blue-500 hover:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    );
};

export default SignInPage;
