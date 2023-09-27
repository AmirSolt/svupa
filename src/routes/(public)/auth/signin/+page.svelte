<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { signinSchema } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper.js';
	import SuperEmail from '$lib/comps/superForms/SuperEmail.svelte';
	import SuperPassword from '$lib/comps/superForms/SuperPassword.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: signinSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
		taintedMessage: null
	});
</script>


<div class="card-mod">
	<h1>Sign in</h1>

	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full" use:enhance>
		<SuperEmail
			session={data.session}
			formAttrName="email"
			{form}
			{constraints}
			{errors}
			autocomplete="email"
		>
			<div slot="head">
				<h3>Email</h3>
			</div>
		</SuperEmail>
		<SuperPassword
			session={data.session}
			formAttrName="password"
			{form}
			{constraints}
			{errors}
			autocomplete="current-password"
		>
			<div slot="head">
				<h3>Password</h3>
			</div>
		</SuperPassword>


		<button class="btn variant-filled" type="submit">Sign in</button>
	</form>

</div>

<br />

<div class="flex flex-col justify-center items-center">
	<p class="text-center">
		Forgot password?
		<a href="/auth/resetPassword/init" class="underline">Reset Password</a>
	</p>

	<p class="text-center">Or</p>

	<p class="text-center">
		Don't have an account?
		<a href="/auth/signup" class="underline">Sign up</a>
	</p>
</div>
