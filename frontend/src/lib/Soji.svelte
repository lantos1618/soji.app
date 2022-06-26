<script lang="ts">
    import type { SojiType } from "./store";
    export let soji: SojiType;
    
    var sojiAudio = new Audio(soji.animation_url);

    let sojiAudioPlaying = false;
    sojiAudio.onplaying = () => {
        sojiAudioPlaying = true;
    };
    sojiAudio.onpause = () => {
        sojiAudioPlaying = false;
    };

    function play() {
        sojiAudio.play();
    }
</script>

<div
    on:click={play}
    class="border flex items-center p-2 
    {sojiAudioPlaying
        ? 'bg-blue-300'
        : 'bg-transparent'}
    rounded"
>
    <img
        class="rounded"
        width="50px"
        height="50px"
        src={soji.image}
        alt={soji.name}
    />
    <span class="px-2">{soji.name}</span>
</div>
