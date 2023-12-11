/* eslint-disable no-restricted-syntax */

'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { supabase } from '../../supabase';

const UpdatePassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errors, setErrors] = useState({
    password: null,
    passwordConfirm: null,
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const [hash, setHash] = useState(null);
  const router = useRouter();

  async function updatePassword(e) {
    e.preventDefault();
    if ((password.length || passwordConfirm.length) < 8) {
      setErrors({
        password: {
          message: 'Password must be at least 8 characters',
        },
        passwordConfirm: {
          message: 'Password confirmation must be at least 8 characters',
        },
      });
      return;
    }
    setErrors({
      password: null,
      passwordConfirm: null,
    });

    if (password !== passwordConfirm) {
      setErrorMsg('Passwords do not match');
      return;
    }

    try {
      // if the user doesn't have access token
      if (!hash) {
        setErrorMsg('Invalid access token or type');
        return;
      }

      const hashArr = hash
        .substring(1)
        .split('&')
        .map((param) => param.split('='));

      let type;
      let accessToken;

      for (const [key, value] of hashArr) {
        if (key === 'type') {
          type = value;
        } else if (key === 'access_token') {
          accessToken = value;
        }
      }
      if (
        type !== 'recovery'
        || !accessToken
        || typeof accessToken === 'object'
      ) {
        setErrorMsg('Invalid access token or type');
        return;
      }

      // Update the password
      const { data, error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      } else if (data) {
        router.push('/');
      }
    } catch (error) {
      setErrorMsg(error);
    }
  }

  useEffect(() => {
    setHash(window.location.hash);
  }, []);
  console.log({ hash });
  return (
    <div className="flex min-h-screen flex-col items-center">
      <h2 className="mb-8 text-2xl font-bold text-gray-800">Update Password</h2>
      <form
        onSubmit={updatePassword}
        className="w-full max-w-md rounded-md bg-white p-8 shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            New Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 w-full rounded-md border p-2 text-black ${errors.passwordConfirm && 'border-red-500'
              }`}
            id="password"
            type="password"
          />
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password.message}
            </span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="passwordConfirm"
            className="block text-sm font-medium text-gray-600"
          >
            Confirm Password
          </label>

          <input
            className={`mt-1 w-full rounded-md border p-2 text-black ${errors.passwordConfirm && 'border-red-500'
              }`}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            type="password"
          />

          {errors.passwordConfirm && (
            <span className="text-sm text-red-500">
              {errors.passwordConfirm.message}
            </span>
          )}
          {errorMsg && <p className="mt-4 text-sm text-red-500">{errorMsg}</p>}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full rounded-md bg-primary p-2 text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Update Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
