import {getCustomerByEmail, getProducts, getSubscription} from '$lib/utils/stripeHelper.server.js'
import type {Stripe} from 'stripe';
import type { Session } from "@supabase/supabase-js";
import { redirect } from '@sveltejs/kit';
import { fetchProfile } from '$lib/funcs/server/database/index.js'

export const load = async ({locals: { getSession } }) => {
    const session:Session|null = await getSession()
    if(!session){
        throw redirect(305, "/")
    }
    const profile: Profile | null = await fetchProfile(session)

    // const customer:Stripe.Customer|undefined = await getCustomerByEmail(session.user.email)
    const subscription:Stripe.Subscription|undefined = await getSubscription(profile?.wallet.subscription_id)
    const products:Stripe.Product[] = await getProducts()

    return { products, subscription }
}

