<script lang="ts">
    import type {Stripe} from 'stripe';

    export let data

    let profile:Profile|null = data.profile
    let products:Stripe.Product[] = data.products
    let customer:Stripe.Customer|undefined = data.customer



    // const subscribedProductObject:string | Stripe.Product | Stripe.DeletedProduct | undefined = customer.subscriptions?.data[0].items.data[0].price.product
    // const subscribedProductId:string|undefined = typeof subscribedProductObject === "string"? subscribedProductObject : undefined
    // const subscribedProduct:Stripe.Product|undefined = products.find(product=> product.id === subscribedProductId)
</script>



<div class="card flex flex-col justify-center items-start gap-4 text-center">
	<h1>Wallet</h1>

    <div class="flex flex-col justify-center items-start gap-4 text-center">
        {#if profile!=null && profile.wallet.subscription_id!=null}
            <p>Current Plan: {profile.wallet.subscription_id}</p>

            <a href="/payment/change" class="btn variant-ghost-secondary"> Change Plan </a>
            <a href="/payment/cancel" class="btn variant-ghost-error"> Cancel Subscription </a>
        {:else}
            <a href="/payment/pricing" class="btn variant-filled-secondary"> Choose a Plan </a>
        {/if}




    </div>	
</div>