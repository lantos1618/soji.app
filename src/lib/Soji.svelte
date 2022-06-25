<script lang="ts">
    import type {iSoji} from "./store";
    export let soji: iSoji;
    var audio = new Audio(soji.animation_url);

    function play() {
        audio.play();
    }

</script>


<div on:click={play}>
    <img src={soji.image} alt={soji.name} />
    <span>{soji.name}</span>
</div>