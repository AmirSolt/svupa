<script lang="ts">
	import {HelpCircle} from 'lucide-svelte'
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import PricingTable from '$lib/comps/payment/PricingTable.svelte';
	import { superForm } from 'sveltekit-superforms/client'
    import { pricingSchema } from '$lib/utils/schema'
    import {toastError} from '$lib/utils/toastHelper.js'
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore()


	export let data
	const { form } = superForm(data.form, {
		validators:pricingSchema,
		onError: (result)=>{toastError(result.result.error.message, toastStore)},
		taintedMessage:null
	})

</script> 

<div class="space-y-24">
	<div class="flex flex-col justify-center gap-8">
    
		<div class="flex flex-col justify-center text-center gap-4">
			<h2 class="text-4xl md:text-5xl font-extrabold ">
				[Text]
			</h2>
			<p class="text-lg">
				[Text]
			</p>
			
		</div>
		<PricingTable products={data.products}/>
	</div>
	

	<div class="space-y-4">
		<h1>
			FAQ's
		</h1>	
		<Accordion>
			<AccordionItem>
				<svelte:fragment slot="lead"><HelpCircle /></svelte:fragment>
				<svelte:fragment slot="summary">
					What is your refund policy?
				</svelte:fragment>
				<svelte:fragment slot="content">
					You can request a refund within 30 days of purchase.
					Email our support: <span class="badge variant-ghost">support@svupa.com</span>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>

