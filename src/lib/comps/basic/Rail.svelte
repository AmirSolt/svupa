<script lang="ts">
    import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import {Square, Settings, Gauge} from 'lucide-svelte'

</script>

<AppRail regionTrail="md:pb-24">
    <AppRailAnchor href="/profile/dashboard" selected={$page.url.pathname === '/profile/dashboard'}>
        <svelte:fragment slot="lead"><Gauge/></svelte:fragment>
        <span>Dashboard</span>
    </AppRailAnchor>
    <AppRailAnchor href="/profile/page1" selected={$page.url.pathname === '/profile/page1'}>
        <svelte:fragment slot="lead"><Square/></svelte:fragment>
        <span>page 1</span>
    </AppRailAnchor>
    <AppRailAnchor href="/profile/page2" selected={$page.url.pathname === '/profile/page2'}>
        <svelte:fragment slot="lead"><Square/></svelte:fragment>
        <span>page 2</span>
    </AppRailAnchor>
    <hr>
    <AppRailAnchor href="/profile/settings" selected={$page.url.pathname === '/profile/settings'}>
        <svelte:fragment slot="lead"><Settings/></svelte:fragment>
        <span>Settings</span>
    </AppRailAnchor>
</AppRail>