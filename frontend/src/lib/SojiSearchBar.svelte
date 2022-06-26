<script lang="ts">
    import type { SojiType } from "./store";
    import { sojis, sojisSearchResult } from "./store";
    let search = "";
    function filterSojis(sojis: SojiType[], search: string) {
        if (search === "") {
            return sojis;
        }
        return sojis.filter((soji) => {
            return (
                soji.tags.some((tag) =>
                    tag.toLowerCase().includes(search.toLowerCase())
                ) ||
                soji.name.toLowerCase().includes(search.toLowerCase()) ||
                soji.description.toLowerCase().includes(search.toLowerCase())
            );
        });
    }
    let debounceInput;

    function handleSearch(e: Event) {
        e.preventDefault();
        search = (e.target as HTMLInputElement).value;
        clearTimeout(debounceInput);
        debounceInput = setTimeout(() => {
            let searchResults = filterSojis($sojis, search);
            console.info(searchResults);
            sojisSearchResult.set(searchResults);
        }, 200);
    }
</script>

<div>
    <label  for="search">Search</label>
    <input class="border" type="text" id="search" on:input={handleSearch} />
</div>
