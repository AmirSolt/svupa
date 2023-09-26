import {getCustomer, getProducts} from '$lib/utils/stripeHelper.server.js'
import type {Stripe} from 'stripe';
import type { Session } from "@supabase/supabase-js";
import { redirect } from '@sveltejs/kit';

export const load = async ({locals: { getSession } }) => {
    const session:Session|null = await getSession()
    if(!session){
        throw redirect(305, "/")
    }

    const customer:Stripe.Customer = await getCustomer(session)
    const products:Stripe.Product[] = await getProducts()

    console.log("customer",customer)
    return { customer, products }
}

