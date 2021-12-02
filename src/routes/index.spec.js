/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {render, screen, waitFor, fireEvent} from "@testing-library/svelte";
import Index from "./index.svelte";
import { tick } from 'svelte';

jest.mock('$app/navigation.js', () => ({
    goto: jest.fn()
}));

describe("Index Route", () => {
    beforeEach(() => {
        //Set sample data - Mock Fetch API
        fetchMock.mockResponseOnce(stasjoner_info_json);
        fetchMock.mockResponseOnce(stasjoner_status_json);
    });

    test("skal være 2 stasjoner fra mock Fetch", async () => {
        const {getByText} = render(Index);
        await waitFor(() => expect(getByText("Viser 2 stasjoner av 2")).toBeInTheDocument());
    });

    test("skal filtrere på string", async () => {
        const {component, getByText} = render(Index);

        const input = screen.getByPlaceholderText('Søk etter bysykkel stasjon!');

        await fireEvent.input(input, { target: { value: "hub" } });

        await tick();

        await waitFor(() => expect(getByText("Viser 1 stasjoner av 2")).toBeInTheDocument());
    });
});

const stasjoner_info_json = JSON.stringify({
    "last_updated": 1638468586,
    "ttl": 10,
    "version": "2.2",
    "data": {
        "stations": [{
            "station_id": "2328",
            "name": "The Hub",
            "address": "Biskop Gunnerus Gate 3",
            "rental_uris": {
                "android": "oslobysykkel://stations/2328",
                "ios": "oslobysykkel://stations/2328"
            },
            "lat": 59.912522370233745,
            "lon": 10.750910185807754,
            "capacity": 21
        },
            {
                "station_id": "2315",
                "name": "Rostockgata",
                "address": "Rostockgata 5",
                "rental_uris": {
                    "android": "oslobysykkel://stations/2315",
                    "ios": "oslobysykkel://stations/2315"
                },
                "lat": 59.90691970255054,
                "lon": 10.760311802881915,
                "capacity": 18
            }
        ]
    }
});

const stasjoner_status_json = JSON.stringify({
    "last_updated": 1638468917,
    "ttl": 10,
    "version": "2.2",
    "data": {
        "stations": [{
            "station_id": "2328",
            "is_installed": 1,
            "is_renting": 1,
            "is_returning": 1,
            "last_reported": 1638468917,
            "num_bikes_available": 1,
            "num_docks_available": 20
        },
            {
                "station_id": "2315",
                "is_installed": 1,
                "is_renting": 1,
                "is_returning": 1,
                "last_reported": 1638468917,
                "num_bikes_available": 1,
                "num_docks_available": 17
            }
        ]
    }
});

/*
Under her har jeg forsøkt å spesifisere retur fra Fetch basert på URL.

async function mockFetch(url, config) {
    switch (url) {
        case 'https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json': {
            console.log("returning from station_information!");
            return jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: {
                        "last_updated": 1638468586,
                        "ttl": 10,
                        "version": "2.2",
                        "data": {
                            "stations": [{
                                "station_id": "2328",
                                "name": "The Hub",
                                "address": "Biskop Gunnerus Gate 3",
                                "rental_uris": {
                                    "android": "oslobysykkel://stations/2328",
                                    "ios": "oslobysykkel://stations/2328"
                                },
                                "lat": 59.912522370233745,
                                "lon": 10.750910185807754,
                                "capacity": 21
                            },
                                {
                                    "station_id": "2315",
                                    "name": "Rostockgata",
                                    "address": "Rostockgata 5",
                                    "rental_uris": {
                                        "android": "oslobysykkel://stations/2315",
                                        "ios": "oslobysykkel://stations/2315"
                                    },
                                    "lat": 59.90691970255054,
                                    "lon": 10.760311802881915,
                                    "capacity": 18
                                }
                            ]
                        }
                    }
                })
            )
        }
        case 'https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json': {
            console.log("returning station status");
            jest.fn().mockImplementation(() =>
                Promise.resolve({
                    ok: true,
                    json: {
                        "last_updated": 1638468917,
                        "ttl": 10,
                        "version": "2.2",
                        "data": {
                            "stations": [{
                                "station_id": "2328",
                                "is_installed": 1,
                                "is_renting": 1,
                                "is_returning": 1,
                                "last_reported": 1638468917,
                                "num_bikes_available": 1,
                                "num_docks_available": 20
                            },
                                {
                                    "station_id": "2315",
                                    "is_installed": 1,
                                    "is_renting": 1,
                                    "is_returning": 1,
                                    "last_reported": 1638468917,
                                    "num_bikes_available": 1,
                                    "num_docks_available": 17
                                }
                            ]
                        }
                    }
                }));
        }
        default: {
            throw new Error(`Unhandled request: ${url}`)
        }
    }
}
*/

/*fetchMock.mockIf(/^https?:\/\/gbfs.urbansharing.com.*$/, req => {
            console.log(req.url);
            if (req.url.endsWith('/oslobysykkel.no/station_information.json')) {
                return JSON.stringify({
                    "last_updated": 1638468586,
                    "ttl": 10,
                    "version": "2.2",
                    "data": {
                        "stations": [{
                            "station_id": "2328",
                            "name": "The Hub",
                            "address": "Biskop Gunnerus Gate 3",
                            "rental_uris": {
                                "android": "oslobysykkel://stations/2328",
                                "ios": "oslobysykkel://stations/2328"
                            },
                            "lat": 59.912522370233745,
                            "lon": 10.750910185807754,
                            "capacity": 21
                        },
                            {
                                "station_id": "2315",
                                "name": "Rostockgata",
                                "address": "Rostockgata 5",
                                "rental_uris": {
                                    "android": "oslobysykkel://stations/2315",
                                    "ios": "oslobysykkel://stations/2315"
                                },
                                "lat": 59.90691970255054,
                                "lon": 10.760311802881915,
                                "capacity": 18
                            }
                        ]
                    }
                })
            } else if (req.url.endsWith('/oslobysykkel.no/station_status.json')) {
                return JSON.stringify({
                    "last_updated": 1638468917,
                    "ttl": 10,
                    "version": "2.2",
                    "data": {
                        "stations": [{
                            "station_id": "2328",
                            "is_installed": 1,
                            "is_renting": 1,
                            "is_returning": 1,
                            "last_reported": 1638468917,
                            "num_bikes_available": 1,
                            "num_docks_available": 20
                        },
                            {
                                "station_id": "2315",
                                "is_installed": 1,
                                "is_renting": 1,
                                "is_returning": 1,
                                "last_reported": 1638468917,
                                "num_bikes_available": 1,
                                "num_docks_available": 17
                            }
                        ]
                    }
                })
            } else {
                return {
                    status: 404,
                    body: 'Not Found'
                }
            }
        });*/