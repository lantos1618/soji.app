<script lang="ts">
    import VolumeHigh from "svelte-material-icons/VolumeHigh.svelte";
    import sojiSound from "../assets/soji.mp3";

    const sojiAudio = new Audio(sojiSound);
    let sojiAudioPlaying = false;
    sojiAudio.onplaying = () => {
        sojiAudioPlaying = true;
    };
    sojiAudio.onpause = () => {
        sojiAudioPlaying = false;
    };
    function handleSojiSoundClick() {
        sojiAudio.play();
    }
</script>

<div class="flex flex-col border rounded p-2">
    <div class="flex">
        <div>
            <div
                class="p-2 rounded-full border {sojiAudioPlaying
                    ? 'bg-blue-200'
                    : 'bg-white-100'}"
                on:click={handleSojiSoundClick}
            >
                <VolumeHigh size={"1.5em"} color={"dodgerblue"} />
            </div>
        </div>
        <div class="p-2">
            <h1 class="text-xl">Soji</h1>
            <p class="text-sm">/səʊdʒi/</p>
        </div>
    </div>
    <p class="italic text-gray-500">noun</p>
    <p>
        <span class="text-gray-500">noun:</span>
        <span>soji</span>
        <span class="text-gray-500">plural noun:</span>
        <span>sojis;</span>
    </p>
    <div class="px-4">
        <p>sound + emoji = Soji</p>
        <p class="text-gray-500">
            "Send a Soji to someone to express an idea or emotion with a smiley
            face and sound."
        </p>
    </div>
    <p>2020s: Soji is a Japanese word for sound + emoji</p>
</div>

