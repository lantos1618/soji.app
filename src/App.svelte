<script lang="ts">
  import SojiDefinition from "./lib/SojiDefinition.svelte";
  import Sojis from "./lib/Sojis.svelte";
</script>

<div class="md:container md:mx-auto">

  <main class="w-full">
    <SojiDefinition />
    <Sojis />
    
  </main >
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
