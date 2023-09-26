import { error, redirect, fail } from "@sveltejs/kit";
import {PUBLIC_DOMAIN} from '$env/static/public';
import { superValidate } from 'sveltekit-superforms/server'
import { pricingSchema } from '$lib/utils/schema'
import {stripe, getProducts} from '$lib/utils/stripeHelper.server.js'
import type {Stripe} from 'stripe';

export const load = async (event) => {
    const form = await superValidate(event, pricingSchema)
    const products:Stripe.Product[] = await getProducts()
    return { form, products}
}


export const actions = {
	default: async (event) => {

		
        const session = await event.locals.getSession()
        if (!session) {
            throw redirect(303, "/auth/signup");
        }

        const form = await superValidate(event, pricingSchema)
        if (!form.valid) {
			return fail(400, { form })
		}

        const checkoutSession = await stripe.checkout.sessions.create({
            line_items: [
              {
                price:form.data.priceId,
                quantity: 1,
              },
            ],
            mode: 'subscription',
            success_url: `${PUBLIC_DOMAIN}/payment/success`,
            cancel_url: `${PUBLIC_DOMAIN}/payment/pricing`,
            customer_email:session.user.email,
        });

        

        if (checkoutSession.url==null) {
            throw error(400, {
                message: "Sorry there was an issue",
            })
        }
    
        throw redirect(303, checkoutSession.url);
    }
}