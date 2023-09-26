import {getCustomerByEmail, getProducts} from '$lib/utils/stripeHelper.server.js'
import type {Stripe} from 'stripe';
import type { Session } from "@supabase/supabase-js";
import { redirect } from '@sveltejs/kit';

export const load = async ({locals: { getSession } }) => {
    const session:Session|null = await getSession()
    if(!session){
        throw redirect(305, "/")
    }

    const customer:Stripe.Customer|undefined = await getCustomerByEmail(session.user.email)
    const products:Stripe.Product[] = await getProducts()

    return { customer, products }
}

