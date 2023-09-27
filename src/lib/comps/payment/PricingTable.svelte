<script lang="ts">
    import ProductCard from '$lib/comps/payment/ProductCard.svelte';
    import type {Stripe} from 'stripe';
    export let products:Stripe.Product[]

</script>




<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

    <ProductCard product={products[0]}/>
    
    <ProductCard product={products[1]}  specialText="Most Popular" specialColor="primary"/>

    <ProductCard product={products[2]}/>

    <ProductCard product={products[3]} specialText="Best Value" specialColor="secondary"/>

</div>


