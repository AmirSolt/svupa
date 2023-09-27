<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
    import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'
    import { initResetPassSchema } from '$lib/utils/schema'
    import {toastError} from '$lib/utils/toastHelper.js'
	import { getToastStore } from '@skeletonlabs/skeleton';
	import {tokenConfirmEvent} from '$lib/utils/authHelper.js'
	import SuperEmail from '$lib/comps/superForms/SuperEmail.svelte';
	let toastStore = getToastStore()

	export let data
	const { form, errors, constraints, enhance, message } = superForm(data.form, {
		validators:initResetPassSchema,
		onError: (result)=>{toastError(result.result.error.message, toastStore)},
		taintedMessage:null
	})

	$:if($form.email){
		tokenConfirmEvent.set({
			email:$form.email,
			redirectPath:"/auth/resetPassword/update",
		})
	}

</script>



<div class="card-mod">
	<h1>Reset Password</h1>

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
	

        <button class="btn variant-filled" type="submit" >Submit</button>

	</form>
</div>