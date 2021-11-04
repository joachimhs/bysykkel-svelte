<script>
    export let stasjon;

    let showMap = false;
    let streetMapUrl = "";
    let streetMapLinkUrl = "";

    function doShowMap() {
        //https://www.openstreetmap.org/export/embed.html?bbox=10.73219418525696%2C59.93163776242038%2C10.737252831459047%2C59.933946459435035&amp;layer=mapnik&amp;marker=59.93279213101428%2C10.734723508358002" style="border: 1px solid black"></iframe><br/><small><a href="https://www.openstreetmap.org/?mlat=59.93279&amp;mlon=10.73472#map=18/59.93279/10.73472
        streetMapUrl = "https://www.openstreetmap.org/export/embed.html?bbox=" + stasjon.lon + "%2C" + stasjon.lat + "%2C" + (stasjon.lon - 0.0001) + "%2C" + (stasjon.lat - 0.0001) + "&mlat=" + stasjon.lat + "&mlon=" + stasjon.lon + "&layers=mapnik&marker=" + stasjon.lat + "%2C" + stasjon.lon + "#map=18/" + stasjon.lat + "/" + stasjon.lon;
        streetMapLinkUrl = "https://www.openstreetmap.org/?mlat=" + stasjon.lat + "&mlon=" + stasjon.lon + "#map=18/" + stasjon.lat + "/" + stasjon.lon;
        showMap = true;
    }

    function doHideMap() {
        streetMapUrl = "";
        streetMapLinkUrl = "";
        showMap = false;
    }
</script>

<div class="bysykkel-station">
    <h1>{stasjon.name}</h1>
    <h3>{stasjon.address}</h3>

    <div class="bysykkel-info">
        <img src="/bike_icon.png" /> {stasjon.num_bikes_available} ledige sykler
        <img src="/parking_icon.png" /> {stasjon.num_docks_available} ledige plasser
    </div>

    {#if showMap}
        <button on:click={doHideMap} class="btn">Skjul kart &#x2C4;</button>
        <a href={streetMapLinkUrl} target="_blank" class="btn btn-link pull-right text-right">Vis stort kart &rarr;</a>
        <iframe width="100%"
                height="400"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src="{streetMapUrl}"
                style="border: 1px solid black">
        </iframe>
    {:else}
        <button on:click={doShowMap} class="btn">Vis i kart &#709;</button>
    {/if}
</div>

<style>

</style>