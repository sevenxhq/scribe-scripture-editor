import { useEffect, useState } from 'react';
import localforage from 'localforage';
import { isElectron } from '@/core/handleElectron';
import * as logger from '../../logger';
import { supabase } from '../../../../supabase';

// custom hook to fetch username from localforage
export const useGetUserName = () => {
    const [username, setUsername] = useState('');
    useEffect(() => {
        const fetchUserName = async () => {
            try {
                if (isElectron()) {
                    const value = await localforage.getItem('userProfile');
                    setUsername(value?.username);
                } else if (!isElectron()) {
                    const { data: { session }, error } = await supabase.auth.getSession();
                    if (error) {
                        // eslint-disable-next-line no-console
                        console.error(error);
                    }
                    if (session) {
                        setUsername(session?.user?.email);
                    }
                }
            } catch (error) {
                logger.error('useGetUserName.js', error);
            }
        };
        fetchUserName();
    }, [username]);
    return { username };
};
