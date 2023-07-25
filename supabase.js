import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export default createClient(
    supabaseUrl,
    supabaseAnonKey,
    // {
    //     auth: {
    //         persistSession: false,
    //     },
    // },
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
