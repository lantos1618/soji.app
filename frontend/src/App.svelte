<script lang="ts">
  import AppBar from "./lib/AppBar.svelte";

  import SojiDefinition from "./lib/SojiDefinition.svelte";
  import Sojis from "./lib/Sojis.svelte";
</script>

<div class="w-full">
  <AppBar />
  <div class="container mx-auto py-5">
    <main class="w-full">
      <SojiDefinition />
      <Sojis />
    </main>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
