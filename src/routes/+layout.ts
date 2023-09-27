import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit';
import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public';

export const load = async ({ fetch, data, depends }) => {
    depends('supabase:auth', 'data:profile');


    const supabaseAuthClient = createSupabaseLoadClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PUBLIC_SUPABASE_ANON_KEY,
        event: { fetch },
        serverSession: data.session
    });

    // // ===============================
    const {
        data: { session }
    } = await supabaseAuthClient.auth.getSession();


    // // ===============================


    
    return { 
        supabaseAuthClient,
        session,
        profile:data.profile,
    };
};