<script lang="ts">
    import DataList from "$lib/comps/tools/DataList.svelte";
    import type {Stripe} from 'stripe';
	export let product: Stripe.Product|undefined;
    export let specialText:string|null=null
    export let specialColor:string|null=null
    let price: Stripe.Price | undefined = typeof product?.default_price === 'string' || product?.default_price === null? undefined:product?.default_price
    let currencySymbol:string = "$"


</script>



<div class="card flex flex-col  text-center p-4  border-2 {specialColor ? `border-${specialColor}-500` : 'border-slate-400'}" >

    

    <div class="relative w-full ">

        <div class="border-primary-500 border-secondary-500 border-slate-400 hidden">
        </div>

        {#if specialText!=null}
            <span class="badge absolute -top-8 -right-0 z-10 text-md p-2 {specialColor?`variant-filled-${specialColor}`:"variant-filled"}" >
                {specialText}
            </span>
        {/if}

        <div class="flex flex-col gap-4 p-4">
    
            <h3 class="text-3xl font-semibold">
                {product?.name}
            </h3>
            
            <div class="flex justify-center items-baseline">
                <span class="mr-2">
                    {currencySymbol}{price?.unit_amount?Math.floor(price.unit_amount/100):null}
                </span>
                <span >{price?.currency}</span>
            </div>
        
            <p class="font-light text-gray-500 sm:text-lg dark:text-gray-400">Monthly</p>
    
        </div>
        <br>
        <DataList list={product?.features.map(feature=>feature.name)} />

        <div class="flex justify-between items-center ">
            <div class="flex justify-center items-baseline">
        </div>
    
            <form method="post" >
                <input type="hidden" name="priceId" value={price?.id} />
                <button class="btn text-lg md:text-2x w-24 {specialColor ? `variant-filled-${specialColor}` : 'variant-filled'}" type="submit"> 
                    {currencySymbol}{price?.unit_amount?Math.floor(price.unit_amount/100):null}
                </button>
            </form>
    
        </div>

    </div>



</div>
