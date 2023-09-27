<script lang="ts">
	import {ExternalLink, ArrowRight} from 'lucide-svelte'
	import { superForm } from 'sveltekit-superforms/client';
	import { nameSchema } from '$lib/utils/schema';
	import { toastError, toastSuccess } from '$lib/utils/toastHelper.js';
	import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import SuperOptions from '$lib/comps/superForms/SuperOptions.svelte';
	import { onMount } from 'svelte';

	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let data;
	let { session, profile } = data;
	$: ({ profile } = data);

	const { form, errors, constraints, tainted } = superForm(data.form, {
		taintedMessage: 'Make sure to save your progress!!!',
		validators: nameSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
		onSubmit: (result) => {
			toastSuccess('Saved', toastStore);
		}
	});

	onMount(() => {
		if(profile!=null){
			$form.first_name = profile.first_name ?? undefined;
			$form.last_name = profile.last_name ?? undefined;
			if ($tainted != null) {
				$tainted.first_name = false;
				$tainted.last_name = false;
			}
		}
	});
	import LoadingButton from '$lib/comps/tools/LoadingButton.svelte';

</script>


<div class="card-mod flex flex-col justify-center items-start gap-4">
	<h1>Settings</h1>

	<div class="p-2 space-y-4">
		<h2>
			Wallet
		</h2>

		{#if profile!=null && profile.wallet.subscription_id!=null}
		
			<form method="POST" action="?/createPortal" target="_blank" rel="noopener">
				<button class="btn variant-filled-primary" type="submit"> <span>Manage Your Subscription</span> <ExternalLink size={20}/></button>
			</form>
		
		{:else}
			<a href="/payment/pricing" class="btn variant-filled-primary"> <span>Choose a Plan</span> <ArrowRight size={20}/></a>
		{/if}
	</div>

	<div class="card-mod p-2 space-y-4">
		<h2>
			Profile
		</h2>
		<form method="POST" action="?/changeName">
			<div class="flex flex-col justify-center items-start gap-4 w-full text-start">
					<SuperTextInput
						session={data.session}
						isSessionOnly={true}
						formAttrName="first_name"
						{form}
						{constraints}
						{errors}
						placeholder="(optional)"
						autocomplete="given-name"
					>
						<div slot="head">
							<p>First Name</p>
						</div>
					</SuperTextInput>
					<SuperTextInput
						session={data.session}
						isSessionOnly={true}
						formAttrName="last_name"
						{form}
						{constraints}
						{errors}
						placeholder="(optional)"
						autocomplete="family-name"
					>
						<div slot="head">
							<p>Last Name</p>
						</div>
					</SuperTextInput>
				<button type="submit" class="btn variant-ghost-secondary w-full"> Save </button>
			</div>
		</form>
	</div>

	<div class="p-2 space-y-4">
		<h2>
			Authentication
		</h2>
		<div class="flex flex-col justify-center items-start gap-2 text-center">
			<LoadingButton url="/auth/signout" color="btn variant-soft">
				<span slot="text" >
					Sign Out
				</span>
			</LoadingButton>
			<a href="/auth/resetPassword/update" class="btn variant-soft"> Reset Password </a>
			<a href="/auth/deleteAccount" class="btn variant-soft"> Delete Account </a>
		</div>	
	</div>
</div>
	
