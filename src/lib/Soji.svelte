<script lang="ts">
import { onMount } from "svelte";

    import type {iSoji} from "./store";
    export let soji: iSoji;
    var audio = new Audio(soji.animation_url);

    function play() {
        audio.play();
    }

</script>


<div on:click={play} class="border max-w-xs	">
    <img src={soji.image} alt={soji.name} />
    <span>{soji.name}</span>
</div>