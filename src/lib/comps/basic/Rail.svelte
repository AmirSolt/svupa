<script lang="ts">
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {PenLine, PersonStanding, Search, Wallet, Settings} from 'lucide-svelte'

</script>

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
    <AppRailAnchor href="/profile/settings" selected={$page.url.pathname === '/profile/settings'}>
        <svelte:fragment slot="lead"><Settings/></svelte:fragment>
        <span>Settings</span>
    </AppRailAnchor>
</AppRail>