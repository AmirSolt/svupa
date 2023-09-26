

import { error } from '@sveltejs/kit'
import { PUBLIC_SUPABASE_URL } from '$env/static/public'
import { PRIVATE_SERVICE_ROLE_KEY_SUPABASE } from '$env/static/private'
import { createClient, type Session } from '@supabase/supabase-js'



// Create a single supabase client for interacting with your database
export const supabaseAdmin = createClient(
    PUBLIC_SUPABASE_URL,
    PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
    {
        auth: { persistSession: false },
    }
)


export async function fetchProfile(session:Session|null):Promise<Profile|null>{
    let profile:Profile
    if (session) {
        const { data, error: err } = await supabaseAdmin
            .from('profiles')
            .select(`
                wallets(product_id)
            `)
            .eq('id', session?.user.id)
            .single()
            
        if (err != null) {
            console.log(err.message)
            throw error(400, {
                message: err.message,
            })
        }else{
            const wallet:Wallet=data["wallets"][0]
            profile = {
                wallet,
            }
        }
        return profile
    }
    return null
}