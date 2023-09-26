<script lang="ts">
    import {MailCheck} from 'lucide-svelte'
	import { superForm } from 'sveltekit-superforms/client';
	import { tokenSchema } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper.js';
    import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import {tokenConfirmEvent} from '$lib/utils/authHelper.js'
    import { onMount } from 'svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let data;
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: tokenSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
		taintedMessage: null
	});

	onMount(() => {
        

		if($tokenConfirmEvent!=null){
			$form.email = $tokenConfirmEvent.email ?? undefined;
			$form.redirectPath = $tokenConfirmEvent.redirectPath ?? undefined;
            
		}
	});

</script>




<div class="card">

    <MailCheck color="#15CE48" size={100} />

	<h1>Check your email</h1>
    <p>
        Please check your inbox for a confirmation code. Please, check your spam if you did not find the email after <strong>5 minutes</strong>.
    </p>

	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full" use:enhance>

        <input type="email" name="email" bind:value={$form.email} class="hidden" autocomplete="email">
        <input type="hidden" name="redirectPath" bind:value={$form.redirectPath}>

        <SuperTextInput
            session={data.session}
            formAttrName="token"
            {form}
			{constraints}
			{errors}
            isSessionOnly={false}
            autocomplete="one-time-code"

            >
            <div slot="head">
				<h3>Code</h3>
			</div>
        </SuperTextInput>



		<button class="btn variant-filled" type="submit">Submit</button>
	</form>

</div>

