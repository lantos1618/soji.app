<script lang="ts">
  import { onMount } from "svelte";
  import { defaultEvmStores } from "svelte-ethers-store";

  import AppBar from "./lib/AppBar.svelte";

  import SojiDefinition from "./lib/SojiDefinition.svelte";
  import Sojis from "./lib/Sojis.svelte";
import SojiSearchBar from "./lib/SojiSearchBar.svelte";
  import SojiUpload from "./lib/SojiUpload.svelte";

  onMount((): void => {
    defaultEvmStores.setProvider();
  });
</script>

<div class="w-full flex flex-col">
  <AppBar />
  <div class="flex mx-auto py-5">
    <main class="flex flex-col space-y-3">
      <SojiDefinition />
      <SojiUpload />
      <SojiSearchBar />
      <Sojis />
    </main>
  </div>
</div>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
