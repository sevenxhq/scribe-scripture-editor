import { createClient } from '@supabase/supabase-js';

export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export const supabaseStorage = () => createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  ).storage.from('autographa-web');

export const filePath = 'autographa/users/samuel';
