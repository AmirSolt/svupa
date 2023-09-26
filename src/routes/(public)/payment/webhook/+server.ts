import type { Stripe } from 'stripe'
import { stripe } from '$lib/utils/stripeHelper.server.js'
import { PRIVATE_WEBHOOK_SECRET } from '$env/static/private';
import {updateWalletSubscriptionId, removeWalletSubscriptionId} from '$lib/funcs/server/database/index.js'

function toBuffer(ab: ArrayBuffer): Buffer {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; i++) {
        buf[i] = view[i];
    }
    return buf;
}

export const POST = async ({ request }) => {
    let data: Stripe.Event.Data | null = null;
    let eventType: string | null = null;
    if (PRIVATE_WEBHOOK_SECRET) {

        const _rawBody = await request.arrayBuffer();
        const payload = toBuffer(_rawBody);

        // SvelteKit may sometimes modify the incoming request body
        // However, Stripe requires the exact body it sends to construct an Event
        // To avoid unintended SvelteKit modifications, we can use this workaround:
        // const payload = Buffer.from(req.rawBody);

        const signature: string | null = request.headers.get('stripe-signature');
        try {
            const event = stripe.webhooks.constructEvent(payload, signature ?? "", PRIVATE_WEBHOOK_SECRET);
            data = event.data;
            eventType = event.type;
        } catch (err) {
            return new Response(JSON.stringify({
                error: err
            }),
                {
                    status: 500,
                    headers: {},

                })
        }
    } else {
        eventType = (await request.formData()).get('type')?.toString() ?? null;
    }
    if (data == null || eventType == null) {
        return new Response(JSON.stringify({
            error: `No data or eventType was found. data: ${data} ||||| eventType: ${eventType}`
        }),
            {
                status: 500,
                headers: {},
        })
    }


    

    switch (eventType) {
        case 'customer.subscription.created':{
                // console.log('=====================================')
                // console.log('customer.subscription.created')
                // console.log(data.object)
                // console.log('=====================================')
            }
            break;
        case 'customer.subscription.updated':{
                console.log('=====================================')
                console.log('customer.subscription.updated')

                const subscriptionId:string|undefined = data.object.id
                const customerId:string|undefined = data.object.customer??undefined

                const subscriptionIdUpdateSuccess:boolean = await updateWalletSubscriptionId(customerId, subscriptionId)

                if(!subscriptionIdUpdateSuccess){
                    console.log('====== Failed Update =======')
                    return new Response(JSON.stringify({
                        error: `Updating wallet with the new product id was unsuccessful`
                    }),
                        {
                            status: 500,
                            headers: {},
                    })
                }
                
                console.log('====== Successful Update =======')
                console.log('=====================================')
            }
            break;
        case 'customer.subscription.deleted':{
                console.log('=====================================')
                console.log('customer.subscription.deleted')

                const subscriptionId:string|undefined = data.object.id
                const customerId:string|undefined = data.object.customer??undefined

                const subscriptionIdCancelledSuccess:boolean = await removeWalletSubscriptionId(customerId)

                if(!subscriptionIdCancelledSuccess){
                    console.log('====== Failed Cancel =======')
                    return new Response(JSON.stringify({
                        error: `Updating wallet with the new product id was unsuccessful`
                    }),
                        {
                            status: 500,
                            headers: {},
                    })
                }
                
                console.log('====== Successful Cancel =======')
                console.log('=====================================')
            }
            break;
      
        default:
    }


    return new Response(JSON.stringify({
        message: 'Success'
    }),
        {
            status: 200,
            headers: {},

        })
};

