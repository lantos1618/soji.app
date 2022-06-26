<script lang="ts">
    import Soji from "./Soji.svelte";
    import { sojis } from "./store";
</script>

<div class="container mx-auto">
    <div class="grid py-2 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4 grid-flow-row-dense">
        {#each $sojis as soji}
        <Soji bind:soji />
        {/each}
    </div>
</div>
