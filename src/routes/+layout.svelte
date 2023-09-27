<script lang="ts">
	import '../app.postcss';
	import { Drawer} from '@skeletonlabs/skeleton';
	import {User} from 'lucide-svelte'
	import { Toast, initializeStores } from '@skeletonlabs/skeleton';
	initializeStores();

	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';
	export let data;
	let { supabaseAuthClient, session } = data;
	$: ({ supabaseAuthClient, session } = data);
	onMount(() => {
		const {
			data: { subscription }
		} = supabaseAuthClient.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				console.log("======= invalidate auth =======")
				invalidate('supabase:auth');
			}
		});
		return () => subscription.unsubscribe();
	});
	

	// Highlight JS
	// import hljs from 'highlight.js';
	// import 'highlight.js/styles/github-dark.css';
	// import { storeHighlightJs } from '@skeletonlabs/skeleton';
	// storeHighlightJs.set(hljs);

	// // Floating UI for Popups
	// import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	// import { storePopup } from '@skeletonlabs/skeleton';
	// storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });


</script>

<Toast position="t" />

<Drawer >
	<div class="flex-none flex flex-col justify-center items-center space-y-2 p-4">
		
		{#if session?.user}
			<a class="btn-icon variant-ringed text-slate-900 dark:text-slate-50" href="/profile/settings"> <User/> </a>
		{:else}
			<a class="btn btn-sm md:btn-md variant-filled text-slate-900 dark:text-slate-50" href="/auth/signin"> Log in </a>
			<a class="btn btn-sm md:btn-md variant-filled-primary text-slate-900 dark:text-slate-50" href="/auth/signup"> Sign up </a>
		{/if}

		<a class="btn btn-sm md:btn-md variant-ringed text-slate-900 dark:text-slate-50" href="/payment/pricing">
			Pricing 
		</a>
	</div>
</Drawer>



<slot />