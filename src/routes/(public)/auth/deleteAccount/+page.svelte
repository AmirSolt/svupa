<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { deleteUserSchema, deletePromptConst } from '$lib/utils/schema';
	import { toastError } from '$lib/utils/toastHelper.js';
	import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
    let toastStore = getToastStore();

    export let data

	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators: deleteUserSchema,
		onError: (result) => {
			toastError(result.result.error.message, toastStore);
		},
	});
</script>

<div class="card-mod">
    <h1 >Delete Account</h1>

    <form method="POST" class="flex flex-col justify-center items-start gap-4 w-full" use:enhance >
        
        <SuperTextInput 
            session={data.session} 
            formAttrName="deletePrompt"
            form={form}
            constraints={constraints}
            errors={errors}
            autocomplete="off"
            isSessionOnly={true}
        >
            <div slot="head">
                <p>
                    <b class="text-error-500 text-lg" >Warrning:</b> This action is not reversible.
                </p>
                <p>
                    If you want to delete your account, type the bold text into the field.
                </p>
                <b class="text-lg">{deletePromptConst}</b>
            </div>
        </SuperTextInput>
            

        <button class="btn variant-filled" type="submit">Submit</button>
    </form>
</div>