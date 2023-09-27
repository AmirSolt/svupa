<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { resetPassSchema } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper.js';
	import SuperPassword from '$lib/comps/superForms/SuperPassword.svelte';
	import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let data;
	let {session} = data
	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		validators: resetPassSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
		taintedMessage: null
	});
</script>


<div class="card-mod">
	<h1>Update Password</h1>

	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full" use:enhance>
		<input type="email" name="email" value={session?.user?.email} class="hidden" autocomplete="email">
		<SuperPassword
			session={data.session}
			formAttrName="newPassword"
			{form}
			{constraints}
			{errors}
			autocomplete="new-password"
		>
			<div slot="head">
				<h3>New Password</h3>
			</div>
		</SuperPassword>
		<SuperPassword
			session={data.session}
			formAttrName="confirmPassword"
			{form}
			{constraints}
			{errors}
			autocomplete="new-password"
		>
			<div slot="head">
				<h3>Confirm Password</h3>
			</div>
		</SuperPassword>



		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>
