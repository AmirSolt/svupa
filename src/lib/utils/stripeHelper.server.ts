
import {PRIVATE_STRIPE_KEY} from '$env/static/private';
import Stripe from 'stripe';
import type { Session } from "@supabase/supabase-js";


export const stripe = new Stripe(PRIVATE_STRIPE_KEY, {
    apiVersion: '2023-08-16',
});

const productIds:string[] = [
    "prod_OhWqSCpArSXN2Z",
    "prod_OhWsr7BjDZOKKQ",
    "prod_OhWtSFT2cyebud",
    "prod_OhWt2RO36S37ol",
]

export async function getProducts():Promise<Stripe.Product[]>{
    const productsApiList:Stripe.ApiList<Stripe.Product> = await stripe.products.list({
        ids: productIds,
        expand:['data.default_price']
    });
    
    const products:Stripe.Product[] = productsApiList.data

    return products
}


export async function createStripeCustomer(email:string|undefined, first_name:string|null, last_name:string|null):Promise<Stripe.Customer|undefined>{
    if(email==null){
        return undefined
    }
	const name:string|undefined = first_name!=null || last_name!=null? `${first_name??""} ${last_name??""}`.trim() : undefined
	const customer = await stripe.customers.create({
		name:name,
		email:email??undefined,
	})
	if(customer==null){
		return undefined
	}
	return customer
}

export async function getSubscription(subscription_id:string|undefined|null):Promise<Stripe.Subscription|undefined>{
    if(subscription_id==null)
        return undefined
    const subscription:Stripe.Response<Stripe.Subscription> = await stripe.subscriptions.retrieve(
        subscription_id,
    );
    return subscription
}

export async function getCustomerByEmail(email:string|undefined):Promise<Stripe.Customer|undefined>{
    if(email==null)
        return undefined

    const customerApiResult:Stripe.ApiSearchResult<Stripe.Customer> = await stripe.customers.search({
        query: `email:\'${email}\'`,
        limit:1,
    });

    const customer:Stripe.Customer = customerApiResult.data[0]
    return customer
}

// export async function getCustomerById(customerId:string|undefined):Promise<Stripe.Customer|undefined>{
//     if(customerId==null)
//         return undefined

//     const customerApiResult:Stripe.ApiSearchResult<Stripe.Customer> = await stripe.customers.retrieve(customerId);

//     const customer:Stripe.Customer = customerApiResult.data[0]
//     return customer
// }

