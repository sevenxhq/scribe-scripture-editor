import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pejhebbmwgaprpwclghd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBlamhlYmJtd2dhcHJwd2NsZ2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzc0NzcyOTksImV4cCI6MTk5MzA1MzI5OX0.yjDH-BS80Y69UKGhjN26VzMtm0zmabcraRqYcr4uGR8';

export default createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            persistSession: false,
        },
    },
);

export const supabaseStorage = () => createClient(
    supabaseUrl,
    supabaseAnonKey,
).storage.from('scribe');

export async function createDirectory(path, data) {
    const { data: folder } = await supabaseStorage().list(path);
    if (folder.length > 0) {
        console.log('folder already exists', folder);
    } else {
        if (data) {
            await supabaseStorage().upload(path, data);
        }
        const fileName = '.keep';
        const filePath = `${path}/${fileName}`;
        const fileContent = new Blob([], { type: 'text/plain' });
        const { data: createdDirectory } = await supabaseStorage().upload(filePath, fileContent, {
            cacheControl: '3600',
            upsert: false,
        });
        console.log('created directory', createdDirectory);
        return data;
    }
}

export const newPath = 'scribe/users';
