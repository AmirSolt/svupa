<script lang="ts">
    import type {Stripe} from 'stripe';

    export let data

    let profile:Profile|null = data.profile
    let products:Stripe.Product[] = data.products
    let subscription:Stripe.Subscription|undefined = data.subscription



    // const subscribedProductObject:string | Stripe.Product | Stripe.DeletedProduct | undefined = customer?.subscriptions?.data[0].items.data[0].price.product
    // console.log(customer)
    // const subscribedProductId:string|undefined = typeof subscribedProductObject === "string"? subscribedProductObject : undefined
    const subscribedProduct:Stripe.Product|undefined = products.find(product=> product.id === subscription?.plan.product)
</script>



<div class="card flex flex-col justify-center items-start gap-4 text-center">
	<h1>Wallet</h1>

    <div class="flex flex-col justify-center items-start gap-4 text-center">
        {#if profile!=null && profile.wallet.subscription_id!=null}
            <p >Current Plan: <span class="badge text-xl variant-filled-primary">{subscribedProduct?.name}</span></p>

            <a href="/payment/change" class="btn variant-filled-secondary"> Change Plan </a>
            <a href="/payment/cancel" class="btn variant-soft-error"> Cancel Subscription </a>
        {:else}
            <a href="/payment/pricing" class="btn variant-filled-secondary"> Choose a Plan </a>
        {/if}




    </div>	
</div>