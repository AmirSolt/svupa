import { error, redirect } from '@sveltejs/kit';
import {stripe} from '$lib/utils/stripeHelper.server.js'
import { fetchProfile } from '$lib/funcs/server/database/index.js'
import {PUBLIC_DOMAIN} from '$env/static/public';
    

export const GET = async ({ locals: { getSession } }) => {
    const session = await getSession()
    if (!session) {
        throw error(400, {
            message: "Error: You are not logged in!",
        })
    }
    
    const profile: Profile | null = await fetchProfile(session)
    if (!profile) {
        throw error(400, {
            message: "Error: No profile",
        })
    }
    if (profile.wallet.customer_id==null) {
        throw error(400, {
            message: "Error: No customer id",
        })
    }
    
    const portalSession = await stripe.billingPortal.sessions.create({
        customer: profile.wallet.customer_id,
        return_url: `${PUBLIC_DOMAIN}/profile/settings`,
    });
    
    if (portalSession.url==null) {
        throw error(400, {
            message: "Error: Portal Creation",
        })
    }
    
    throw redirect(303, portalSession.url);
}


