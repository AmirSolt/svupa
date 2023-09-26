<script lang="ts">
	import { AppShell } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';


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
