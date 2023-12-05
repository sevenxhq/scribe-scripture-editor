import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import * as localforage from 'localforage';
// import { supabaseSignIn } from '../../../../supabase';

const SignIn = () => (
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [error, setError] = useState('');
// const [loading, setLoading] = useState(false);
// const router = useRouter();

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   const { data, error: signInError } = await supabaseSignIn({
//     email,
//     password,
//   });
//   if (data.session) {
//     await localforage.setItem('userProfile', data);
//     router.push('/projects');
//     setLoading(false);
//   } else {
//     setError(signInError);
//     setLoading(false);
//   }
// };
  <div className="flex flex-col gap-4 items-center justify-center py-4">
    <form action="/auth/login" method="post" className="flex flex-col gap-4 items-center justify-center py-4">
      <label htmlFor="email">Email</label>
      <input className="rounded-md focus:outline-none p-2 text-sm" name="email" />
      <label htmlFor="password">Password</label>
      <input className="rounded-md focus:outline-none p-2 text-sm" type="password" name="password" />
      <button type="submit" className="bg-primary text-white rounded-md py-2 px-4">Sign In</button>
    </form>
    <span className="text-gray-600 text-sm mt-4">
      Don&apos;t have an account?
      {' '}
      <Link href="/signup" className="text-blue-500 hover:text-blue-400 underline">
        Sign Up
      </Link>
    </span>
  </div>
);
export default SignIn;
