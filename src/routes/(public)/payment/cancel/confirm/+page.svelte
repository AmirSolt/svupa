

<script lang="ts">
	import { invalidate } from "$app/navigation";
    invalidate('data:profile')
</script>

<div class="card flex flex-col justify-center items-center gap-4">


    <div class="flex flex-col justify-center items-center gap-2">
        <h1 class="text-4xl">
            Your subscription has been cancelled
        </h1>
        <p>
            We are sad to see you go.
        </p>
    </div>

    <a href="/profile/wallet" class="btn variant-ringed" >
        ← Wallet
    </a>	
</div>