<script lang="ts">
    import Soji from "./Soji.svelte";
    import { sojis } from "./store";
</script>

<div class="grid  md:grid-cols-4 gap-4 grid-flow-row-dense">
    {#each $sojis as soji}
        <Soji bind:soji />
    {/each}
</div>
