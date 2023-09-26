<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {PenLine, PersonStanding, Search, Wallet, Settings} from 'lucide-svelte'

	import Header from '$lib/comps/basic/Header.svelte'
	import Footer from '$lib/comps/basic/Footer.svelte'

</script>



<AppShell>
	<svelte:fragment  slot="header">
		<Header />
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		
		<div class="flex justify-end items-start p-2">
				<LightSwitch />
		</div>
	</svelte:fragment>



	<svelte:fragment slot="sidebarLeft">
		<AppRail regionTrail="md:pb-24">
			<AppRailAnchor href="/profile/generate" selected={$page.url.pathname === '/profile/page'}>
				<svelte:fragment slot="lead"><PenLine/></svelte:fragment>
				<span>page</span>
			</AppRailAnchor>
			<AppRailAnchor href="/profile/humanize" selected={$page.url.pathname === '/profile/page'}>
				<svelte:fragment slot="lead"><PersonStanding/></svelte:fragment>
				<span>page</span>
			</AppRailAnchor>
			<AppRailAnchor href="/profile/detect" selected={$page.url.pathname === '/profile/page'}>
				<svelte:fragment slot="lead"><Search/></svelte:fragment>
				<span>page</span>
			</AppRailAnchor>
			<hr>
			<AppRailAnchor href="/profile/wallet" selected={$page.url.pathname === '/profile/wallet'}>
				<svelte:fragment slot="lead"><Wallet/></svelte:fragment>
				<span>Wallet</span>
			</AppRailAnchor>
			<AppRailAnchor href="/profile/settings" selected={$page.url.pathname === '/profile/settings'}>
				<svelte:fragment slot="lead"><Settings/></svelte:fragment>
				<span>Settings</span>
			</AppRailAnchor>
		</AppRail>
	</svelte:fragment>

	<div class="flex justify-center w-full p-4 pt-2">
		<div class="md:max-w-4xl w-full">
			<slot />
		</div>
	</div>


	<div class="px-4 md:px-24 pt-52 md:pt-96 pb-8">
		<hr>
	</div>

	<svelte:fragment slot="pageFooter">
		<Footer />
	</svelte:fragment>


</AppShell>
