<script lang="ts">
    import {
        connected,
        signer,
        signerAddress,
        defaultEvmStores,
    } from "svelte-ethers-store";
</script>

<nav class="flex bg-indigo-400 sticky p-2">
    <div class="flex justify-between mx-auto w-3/4">
        <span>Soji</span>
        <ul class="flex ">
            <li class="mr-2">
                <button on:click={() => console.info("about!")}>about</button>
            </li>
            {#if $connected}
                <li class="mr-2 truncate">
                    {$signerAddress}
                </li>
            {:else}
                <li class="mr-2">
                    <button on:click={() => defaultEvmStores.setProvider()}
                        >connect</button
                    >
                </li>
            {/if}
        </ul>
    </div>
</nav>

<style>
    li {
        max-width: 100px;
    }
</style>
