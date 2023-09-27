import { error, redirect, fail } from "@sveltejs/kit";
import {PUBLIC_DOMAIN} from '$env/static/public';
import { superValidate } from 'sveltekit-superforms/server'
import { pricingSchema } from '$lib/utils/schema'
import {updateWalletCustomerId} from '$lib/funcs/server/database/index.js'
import {stripe, getProducts, createStripeCustomer} from '$lib/utils/stripeHelper.server.js'
import type {Stripe} from 'stripe';
import { fetchProfile } from '$lib/funcs/server/database/index.js'


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


        let customerId:string|undefined|null;

		const profile: Profile | null = await fetchProfile(session)
        customerId = profile?.wallet.customer_id

        if(customerId==null){
            const customer:Stripe.Customer|undefined = await createStripeCustomer(
                session.user.email, 
                session.user.user_metadata["first_name"], 
                session.user.user_metadata["last_name"])
            if(customer==null){
                throw error(400, {
                    message: "Error: Customer Creation",
                })
            }
            customerId = customer.id

            const updateSuccess = await updateWalletCustomerId(session, customerId)
            if(!updateSuccess){
                throw error(400, {
                    message: "Error: Customer Creation in Database",
                })
            }

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
            customer:customerId,
        });
        if (checkoutSession.url==null) {
            throw error(400, {
                message: "Error: Checkout Creation",
            })
        }

    
        throw redirect(303, checkoutSession.url);
    }
}