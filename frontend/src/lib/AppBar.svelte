<script lang="ts">
    import { connected, signer, signerAddress, defaultEvmStores } from 'svelte-ethers-store'

</script>

<nav class="flex items-center justify-between border bg-indigo-400 sticky p-2">
    <span>Soji</span>
    <ul class="flex ">
        <li class="mr-2">
            <a on:click={() => console.info("about!")}>about</a>
        </li>
        {#if $connected}
        <li class="mr-2 overflow-ellipsis">
            {$signerAddress}
        </li>
        {:else}
        <li class="mr-2">
            <a on:click={() => defaultEvmStores.setProvider()}>connect</a>
        </li>
        {/if}
    </ul>
</nav>
