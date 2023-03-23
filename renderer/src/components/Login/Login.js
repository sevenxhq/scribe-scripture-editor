'use client';

import React from 'react';
// import LeftLogin from './LeftLogin';
import RightLogin from './RightLogin';
import SignInPage from './SignIn';

export default function Login() {
  return (
    <div className="grid grid-cols-7 h-screen">
      <div className="col-span-3 justify-center items-center h-full relative">
        <SignInPage />
      </div>
      <RightLogin />
    </div>
  );
}
