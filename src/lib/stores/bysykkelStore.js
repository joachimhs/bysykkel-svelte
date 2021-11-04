import { writable, derived, get } from 'svelte/store';

let sortOrder = writable(1);
let sortColName = writable('name');
export let filterString = writable("");
export const stasjoner = writable([]);
export const stasjonerError = writable("");

export async function fetchStasjoner() {
    const stasjonerResponse = await fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_information.jsona', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const tilgjengelighetResponse = await fetch('https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (stasjonerResponse.ok && tilgjengelighetResponse.ok) {
        let stasjonerContent = await stasjonerResponse.json();
        let tilgjengelighetContent = await tilgjengelighetResponse.json();

        if (stasjonerContent?.data?.stations && tilgjengelighetContent?.data?.stations) {
            let res = stasjonerContent.data.stations.map(x => Object.assign(x, tilgjengelighetContent.data.stations.find(y => y.station_id == x.station_id)));

            stasjoner.set(res);
        }
    } else {
        stasjonerError.set("Kunne ikke hente data fra APIet");
    }
}