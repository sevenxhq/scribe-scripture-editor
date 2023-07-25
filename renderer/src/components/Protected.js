'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import supabase from '../../../supabase';

const ProtectedRoute = ({ children }) => {
    const router = useRouter();
    const checkUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        console.log('user', user);
        if (!user) {
            router.push('/login'); // Redirect to the sign in page if user is not signed in
        }
    };
    useEffect(() => {
        checkUser();
    }, [router]);
    return <div>{children}</div>;
};
export default ProtectedRoute;
