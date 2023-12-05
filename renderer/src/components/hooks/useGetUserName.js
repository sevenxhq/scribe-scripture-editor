'use client';

import { useEffect, useState } from 'react';
import localforage from 'localforage';
// import { supabase } from '../../../../supabase';

const IsElectron = process.env.NEXT_PUBLIC_IS_ELECTRON;

// custom hook to fetch username from localforage
export const useGetUserName = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchUserName = async () => {
            const value = await localforage.getItem('userProfile');
            if (IsElectron) {
                setUsername(value?.username);
            } else if (!IsElectron) {
                setUsername(value?.user?.email);
            }
        };
        fetchUserName();
    }, [username]);
    return { username };
};
