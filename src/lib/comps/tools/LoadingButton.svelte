<script lang="ts">
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let isLoading: boolean = false;

	export let color: string = 'variant-filled';
	export let url: string | null = null;
	export let buttonType: 'button' | 'submit' | 'reset' | null | undefined = 'submit';
	export let clickCallback:any|undefined=undefined
	export let loadingTimed:boolean = false


    async function clicked(){
		if(clickCallback!=null){
			clickCallback()
		}
        isLoading = true
		if(loadingTimed){
			setTimeout(()=>{isLoading = false}, 2000)
		}
    }

</script>

{#if url}
	{#if !isLoading}
		<a on:click={clicked} href={url} class="btn {color} w-24">
			<slot name="text" />
		</a>
	{:else}
		<div class="btn {color}">
			<ProgressRadial width="w-6" stroke={100} />
		</div>
	{/if}
{:else}
	<button on:click={clicked} type={buttonType} class="btn {color} w-24">
		{#if !isLoading}
			<slot name="text" />
		{:else}
			<ProgressRadial width="w-6" stroke={100} />
		{/if}
	</button>
{/if}
