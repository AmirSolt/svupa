<script lang="ts">
    import {Menu} from 'lucide-svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {User} from 'lucide-svelte'
	import { getDrawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';
	let {session} = $page.data
    $: ({ session } = $page.data);
    const drawerStore = getDrawerStore();
    const drawerSettings: DrawerSettings = {
		id: 'example-3',
        position:"right",
		bgDrawer: 'bg-slate-200 dark:bg-slate-800 text-white',
		bgBackdrop: 'bg-gradient-to-tr from-slate-500/50 via-slate-500/50 to-slate-500/50',
		width: 'w-[140px]',
		padding: 'p-4',
		rounded: 'rounded-xl',
	};
    function handleHamburger(){
        drawerStore.open(drawerSettings);
    }
</script>



<AppBar gap="gap-1" padding="p-3" slotTrail="space-x-2">
    <svelte:fragment slot="lead">
        <a href="/">
            <p class="text-3xl md:text-4xl font-bold"> Svupa</p>
        </a>

    </svelte:fragment>
    
    <svelte:fragment  slot="trail" >
        <div>
            <div class="md:hidden">
                <button class="btn-icon variant-filled" on:click={handleHamburger}>
                    <Menu/>
                </button>
            </div>
            <div class="hidden md:flex-none md:flex md:items-center md:space-x-2">
                <a class="btn btn-sm md:btn-md variant-ringed" href="/payment/pricing">
                    Pricing 
                </a>
                {#if session?.user}
                    <a class="btn-icon variant-ringed" href="/profile/dashboard"> <User/> </a>
                {:else}
                    <a class="btn btn-sm md:btn-md variant-filled" href="/auth/signin"> Log in </a>
                    <a class="btn btn-sm md:btn-md variant-filled-primary" href="/auth/signup"> Sign up </a>
                {/if}
            </div>
        </div>
    </svelte:fragment>
</AppBar>