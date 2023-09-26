
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

export async function getCustomer(session:Session):Promise<Stripe.Customer>{
    const customerApiResult:Stripe.ApiSearchResult<Stripe.Customer> = await stripe.customers.search({
        query: `email:\'${session.user.email}\'`,
        limit:1,
        expand:["data[0].subscriptions"]
    });

    const customer:Stripe.Customer = customerApiResult.data[0]
    return customer
}