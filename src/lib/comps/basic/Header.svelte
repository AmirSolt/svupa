<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {User} from 'lucide-svelte'
	
	let {session} = $page.data


</script>



<AppBar gap="gap-1" padding="p-3" slotTrail="space-x-2">
    <svelte:fragment slot="lead">
        <a href="/">
            <p class="text-3xl md:text-4xl font-bold"> Svupa</p>
        </a>

    </svelte:fragment>
    
    <svelte:fragment  slot="trail" >
        <div class="flex-none flex items-center space-x-2">

            <a class="btn btn-sm md:btn-md variant-ringed" href="/payment/pricing">
                 Pricing 
            </a>
            
            {#if session?.user}
                <a class="btn-icon variant-ringed" href="/profile/settings"> <User/> </a>
            {:else}
                <a class="btn btn-sm md:btn-md variant-filled" href="/auth/signin"> Log in </a>
                <a class="btn btn-sm md:btn-md variant-filled-primary" href="/auth/signup"> Sign up </a>
            {/if}
        </div>
    </svelte:fragment>
</AppBar>