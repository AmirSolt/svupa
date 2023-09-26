<script lang="ts">
	import type { Session } from '@supabase/supabase-js';
	import { toastError } from '$lib/utils/toastHelper.js';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let options: string[] = [];
	export let session: Session | null = null;
	export let formAttrName: string;
	export let form: any;
	export let constraints: any;
	export let errors: any;
	export let isSessionOnly: boolean = false;
</script>

<div class="w-full">
	<label class="label w-full" for={formAttrName}>
		<slot name="head" />

		{#if session == null && isSessionOnly}
			<select
				id={formAttrName}
				name={formAttrName}
				class="select"
				class:input-error={$errors[formAttrName]}
				data-invalid={$errors[formAttrName]}
				bind:value={$form[formAttrName]}
				{...$constraints[formAttrName]}
				on:focus={() => toastError('Please Sign in', toastStore)}
			>
				{#each options as option}
					<option value={option} selected={$form[formAttrName] === option ? true : false}
						>{option}</option
					>
				{/each}
			</select>
		{:else}
			<select
				id={formAttrName}
				name={formAttrName}
				class="select"
				class:input-error={$errors[formAttrName]}
				data-invalid={$errors[formAttrName]}
				bind:value={$form[formAttrName]}
				{...$constraints[formAttrName]}
			>
				{#each options as option}
					<option value={option} selected={$form[formAttrName] === option ? true : false}
						>{option}</option
					>
				{/each}
			</select>
		{/if}

		{#if $errors[formAttrName]}
			<span class="text-red-400">{$errors[formAttrName]}</span>
		{:else}
			<span />
		{/if}
	</label>
</div>
