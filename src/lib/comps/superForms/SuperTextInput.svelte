<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { toastError } from '$lib/utils/toastHelper.js';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let session: Session | null = null;
	export let formAttrName: string;
	export let form: any;
	export let constraints: any;
	export let errors: any;
	export let isSessionOnly: boolean = false;
	export let placeholder: string = '';
	export let autocomplete: string = 'off';
</script>

<div class="w-full">
	<label class="label w-full" for={formAttrName}>
		<slot name="head" />

		{#if session == null && isSessionOnly}
			<input
				class="input"
				type="text"
				name={formAttrName}
				{placeholder}
				id={formAttrName}
				class:input-error={$errors[formAttrName]}
				data-invalid={$errors[formAttrName]}
				bind:value={$form[formAttrName]}
				{...$constraints[formAttrName]}
				{autocomplete}
				on:focus={() => toastError('Please Sign in', toastStore)}
			/>
		{:else}
			<input
				class="input"
				type="text"
				name={formAttrName}
				{placeholder}
				id={formAttrName}
				class:input-error={$errors[formAttrName]}
				data-invalid={$errors[formAttrName]}
				bind:value={$form[formAttrName]}
				{...$constraints[formAttrName]}
				{autocomplete}
			/>
		{/if}

		{#if $errors[formAttrName]}
			<span class="text-red-400">{$errors[formAttrName]}</span>
		{:else}
			<span />
		{/if}
	</label>
</div>
