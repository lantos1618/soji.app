<script lang="ts">
  import SojiDefinition from "./lib/SojiDefinition.svelte";
  import Sojis from "./lib/Sojis.svelte";

</script>

<main>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
  <SojiDefinition></SojiDefinition>
  <Sojis />
</main>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
