'use client';

import React, { useState } from 'react';
import { supabase } from '../../supabase';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/passwordReset`,
    });
    console.log(data);
    if (data) {
      setStatus('Password reset link has been sent to your email');
    }
  };

  return (
    <div className="flex flex-col items-center p-4 justify-center gap-2">
      <h1 className="font-semibold text-lg">Reset Password</h1>
      <input
        type="email"
        placeholder="Enter your email"
        className="rounded-md text-sm focus:outline-none"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="bg-primary text-white rounded-md py-2 px-4"
        type="button"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {status && <p className="text-sm text-green-500">{status}</p>}
    </div>
  );
};

export default ForgotPassword;
