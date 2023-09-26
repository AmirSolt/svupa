
import {stripe} from '$lib/utils/stripeHelper.server.js'
import type { Session } from "@supabase/supabase-js";
import { fetchProfile } from '$lib/funcs/server/database/index.js'
import { redirect, error } from '@sveltejs/kit'



export const actions = {
	default: async ({locals:{getSession}}) => {
        const session: Session|null = await getSession()
        const profile: Profile | null = await fetchProfile(session)
    
        if(profile!=null && profile.wallet.subscription_id!=null){
            profile.wallet.subscription_id
            await stripe.subscriptions.cancel(profile.wallet.subscription_id);
        }else{
            throw error(400, {
				message: "This action is not authorized",
			})
        }
        throw redirect(302, '/payment/cancel/confirm')
    }
}


