<script lang="ts">
    import Soji from "./Soji.svelte";
    import {sojis } from "./store";
</script>

<div>
    {#each $sojis as soji}
       <Soji bind:soji></Soji>
    {/each}
</div>