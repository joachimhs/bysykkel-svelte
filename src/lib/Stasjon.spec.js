/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, fireEvent } from "@testing-library/svelte";
import Stasjon from "./Stasjon.svelte";

describe("Stasjon Komponent", () => {
    test("Skal vise riktig overskrifter", () => {
        let stasjonTestData = {
            name: "Test Stasjon",
            address: "Test Addresse",
            num_bikes_available: 5,
            num_docks_available: 3,
        }
        const { container } = render(Stasjon, {stasjon: stasjonTestData});
        expect(container).toContainHTML("<h1>Test Stasjon</h1>");
        expect(container).toContainHTML("<h3>Test Addresse</h3>");
    });

    test("Skal vise rett antall plasser", () => {
        let stasjonTestData = {
            name: "Test Stasjon",
            address: "Test Addresse",
            num_bikes_available: 5,
            num_docks_available: 3,
        }
        const { container } = render(Stasjon, {stasjon: stasjonTestData});
        expect(container).toContainHTML("<img src=\"/bike_icon.png\" /> 5 ledige sykler");
        expect(container).toContainHTML("<img src=\"/parking_icon.png\" /> 3 ledige plasser");
    });

    test("Skal vise kart når knapp trykkes på", async () => {
        let stasjonTestData = {
            name: "Test Stasjon",
            address: "Test Addresse",
            num_bikes_available: 5,
            num_docks_available: 3,
            lat: 500,
            lon: 300
        }

        let url = 'https://www.openstreetmap.org/?mlat=500&mlon=400#map=18/500/3400';

        const { container, getByText } = render(Stasjon, {stasjon: stasjonTestData});
        const button = getByText(/Vis i kart/);
        await fireEvent.click(button);
        expect(container).toContainHTML("<button class=\"btn\">Skjul kart &#x2C4;</button>");
        expect(container).toContainHTML('<iframe width="100%" height="400" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="' + url + '" style="border: 1px solid black>');
    });
});