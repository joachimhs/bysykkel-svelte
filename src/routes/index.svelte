<script>
    import {fetchStasjoner, filterString, stasjoner, stasjonerError} from "$lib/stores/bysykkelStore";
    import { onMount } from 'svelte';
    import {goto} from '$app/navigation';
    import Stasjon from '$lib/Stasjon.svelte';

    let stasjonFilter = "";

    onMount(async () => {
       await fetchStasjoner();

       if ($stasjonerError.length > 0) {
           goto("/error");
       }
    });

    $: filteredStasjoner = $stasjoner.filter(stasjon => stasjon?.name?.toLowerCase().includes(stasjonFilter ? stasjonFilter.toLowerCase(): ''))
        .sort((a, b) => (a['name'] > b['name']) ? 1 : -1);

</script>

<div class="pageArea">
    <div class="filter-stations">
        <input bind:value={stasjonFilter}  type="text" class="fill-width" placeholder="Søk etter bysykkel stasjon!" autofocus />
    </div>

    <div class="bysykkel-count">Viser {filteredStasjoner.length} stasjoner av {$stasjoner.length}</div>

    <div class="bysykkel-stations">
        {#each filteredStasjoner as stasjon}
            <Stasjon bind:stasjon={stasjon} />
        {/each}
    </div>
</div>

<style>
    .bysykkel-count {
        text-align: right;
        margin-right: 24px;
    }
</style>