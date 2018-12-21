/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import Dokument from './dokument';

describe('Vedlegg', () => {
    it('Viser ikke tittel og url til pdf hvis dokumentet ikke kan vises, ' +
        'og feilen ikke skyldes at Konverteringstjenesten ikke klarer å konvertere til bilder', () => {
        const props = {
            journalpostId: '1234',
            dokref: '5678',
            dokumentmetadata: {
                bildeurler: [],
                kanVises: false,
                tittel: 'en tittel',
                feilmelding: '',
                ekstrafeilinfo: { } // Ikke noe korruptPdf: 'true' i ekstrafeilinfo her
            }
        };

        const wrapper = render(<Dokument {...props}/>);

        const renderedVedleggListe = wrapper.find('.lokal-linker');
        expect(renderedVedleggListe.length).to.equal(0);

        const vedleggListe = wrapper.find('h2');
        expect(vedleggListe.length).to.equal(0);
    });

    it('Viser tittel og url til pdf hvis Konverteringstjenesten ikke klarer å konvertere til bilder', () => {
        const props = {
            journalpostId: '1234',
            dokref: '5678',
            dokumentmetadata: {
                bildeurler: [],
                kanVises: false,
                tittel: 'en tittel',
                feilmelding: '',
                ekstrafeilinfo: { korruptPdf: 'true' } // Konverteringstjenesten melder om korrupt pdf
            }
        };
        const wrapper = render(<Dokument {...props}/>);

        const renderedVedleggListe = wrapper.find('.lokal-linker');
        expect(renderedVedleggListe.length).to.equal(1);

        const vedleggListe = wrapper.find('h1');
        expect(vedleggListe.length).to.equal(1);
    });
});
