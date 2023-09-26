<script lang="ts">
	import LoadingButton from '$lib/comps/tools/LoadingButton.svelte';

</script>


<div class="card flex flex-col justify-center items-start gap-4 text-center">
	<h1>Settings</h1>

	<div class="flex flex-col justify-center items-start gap-4 text-center">
		<LoadingButton url="/auth/signout" color="variant-filled-error" text="Sign Out" />
		<a href="/auth/resetPassword/update" class="btn variant-ghost-warning"> Reset Password </a>
		<a href="/auth/deleteAccount" class="btn variant-ghost-error"> Delete Account </a>
	</div>	
</div>
	
