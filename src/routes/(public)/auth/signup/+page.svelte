<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client'
    import { signupSchema } from '$lib/utils/schema'
    import {toastError} from '$lib/utils/toastHelper.js'
	import SuperTextInput from '$lib/comps/superForms/SuperTextInput.svelte';
	import SuperEmail from '$lib/comps/superForms/SuperEmail.svelte';
	import {tokenConfirmEvent} from '$lib/utils/authHelper.js'
	import SuperPassword from '$lib/comps/superForms/SuperPassword.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore()

	export let data
	const { form, errors, constraints, enhance } = superForm(data.form, {
		validators:signupSchema,
		onError: (result)=>{toastError(result.result.error.message, toastStore)},
		taintedMessage:null
	})


	$:if($form.email){
		tokenConfirmEvent.set({
			email:$form.email,
			redirectPath:"/",
		})
	}

</script>





<div class="card">
	<h1>Sign up</h1>


	<form method="POST" class="flex flex-col justify-center items-start gap-4 w-full" use:enhance>


		<div class="flex flex-col justify-center items-start gap-4 w-full">
			<div>
				<SuperTextInput
					session={data.session} 
					formAttrName="first_name"
					form={form}
					constraints={constraints}
					errors={errors}
					placeholder="(optional)"
					autocomplete="given-name"
				>
					<div slot="head">
						<h3>First Name</h3>
					</div>
				</SuperTextInput>
			</div>
			<div>
				<SuperTextInput 
					session={data.session} 
					formAttrName="last_name"
					form={form}
					constraints={constraints}
					errors={errors}
					placeholder="(optional)"
					autocomplete="family-name"
				>
					<div slot="head">
						<h3>Last Name</h3>
					</div>
				</SuperTextInput>
			</div>
		</div>
	
        


		<SuperEmail 
			session={data.session} 
			formAttrName="email"
			form={form}
			constraints={constraints}
			errors={errors}
			autocomplete="email"
		>
			<div slot="head">
				<h3>Email</h3>
			</div>
		</SuperEmail>
		<SuperPassword 
			session={data.session} 
			formAttrName="password"
			form={form}
			constraints={constraints}
			errors={errors}
			autocomplete="new-password"
		>
			<div slot="head">
				<h3>Password</h3>
			</div>
		</SuperPassword>



		<button class="btn variant-filled" type="submit">Sign up</button>	
			
	</form>
</div>

<br>

<p class="text-center">
	Have an account?
	<a href="/auth/signin" class="underline ">Sign in</a>
</p>