<script lang="ts">
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

	const { form, errors, constraints, enhance, tainted } = superForm(data.form, {
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


<div class="card flex flex-col justify-center items-start gap-4 text-center">
	<h1>Settings</h1>


	<form method="POST" use:enhance>
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
			<button type="submit" class="btn variant-filled-primary w-full"> Save </button>
		</div>
	</form>

	<hr>

	<div class="flex flex-col justify-center items-start gap-4 text-center">
		<LoadingButton url="/auth/signout" color="variant-ghost-error" text="Sign Out" />
		<a href="/auth/resetPassword/update" class="btn variant-soft-warning"> Reset Password </a>
		<a href="/auth/deleteAccount" class="btn variant-soft-error"> Delete Account </a>
	</div>	
</div>
	
