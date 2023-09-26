<script lang="ts">
	import type { Session } from "@supabase/supabase-js";
	import { toastError } from '$lib/utils/toastHelper.js';
	import { getToastStore } from '@skeletonlabs/skeleton';
	let toastStore = getToastStore();

	export let session:Session|null=null;
    export let formAttrName:string;
    export let form:any;
    export let constraints:any;
    export let errors:any;
    export let isSessionOnly:boolean=false;
    export let placeholder:string=""
    export let rowsCount:number=4
    export let autocomplete:string="off"
</script>



<div class="w-full">
    <label class="label w-full" for="{formAttrName}">

        <slot name="head" />



           

        {#if session==null && isSessionOnly}
            <textarea
                class="textarea"
                rows="{rowsCount}"
                name="{formAttrName}"
                placeholder="{placeholder}"
                id="{formAttrName}"
                class:input-error={$errors[formAttrName]}
                data-invalid={$errors[formAttrName]}
                bind:value={$form[formAttrName]}
                {...$constraints[formAttrName]}
                autocomplete="{autocomplete}"
                on:focus={() => toastError('Please Sign in', toastStore)}
            />

        {:else}

            <textarea
                class="textarea"
                rows="{rowsCount}"
                name="{formAttrName}"
                placeholder="{placeholder}"
                id="{formAttrName}"
                class:input-error={$errors[formAttrName]}
                data-invalid={$errors[formAttrName]}
                bind:value={$form[formAttrName]}
                {...$constraints[formAttrName]}
                autocomplete="{autocomplete}"
            />

        {/if}

        {#if $errors[formAttrName]}
            <span class="text-red-400">{$errors[formAttrName]}</span>
        {:else}
            <span />
        {/if}
    </label>

</div>
