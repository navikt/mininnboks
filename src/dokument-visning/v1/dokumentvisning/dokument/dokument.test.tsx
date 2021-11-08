import * as React from 'react';
import Dokument from './Dokument';
import { render } from '../../../../test-config';

const journalpostmetadata_test = {
    resultat: {
        retning: 'x',
        dato: 'x',
        navn: 'x',
        journalpostId: '1234',
        hoveddokument: {
            tittel: 'x',
            dokumentreferanse: 'x',
            kanVises: true,
            logiskDokument: false
        },
        vedlegg: [],
        avsender: 'x',
        mottaker: 'x',
        tilhorendeSakid: 'x',
        baksystem: ['x'],
        temakode: 'x',
        temakodeVisning: 'x',
        ettersending: false,
        erJournalfort: true,
        feilWrapper: {
            inneholderFeil: false
        }
    }
};
describe('Vedlegg', () => {
    it(
        'Viser ikke tittel og url til pdf hvis dokumentet ikke kan vises, ' +
            'og feilen ikke skyldes at Konverteringstjenesten ikke klarer å konvertere til bilder',
        () => {
            const props = {
                journalpostmetadata: journalpostmetadata_test,
                dokref: '5678',
                dokumentmetadata: {
                    bildeurler: [],
                    kanVises: false,
                    tittel: 'en tittel',
                    feilmelding: '',
                    ekstrafeilinfo: {} // Ikke noe korruptPdf: 'true' i ekstrafeilinfo her
                },
                first: false
            };

            const wrapper = render(<Dokument {...props} />);

            const renderedVedleggListe = wrapper.find('.lokal-linker');
            expect(renderedVedleggListe.length).toEqual(0);

            const vedleggListe = wrapper.find('h2');
            expect(vedleggListe.length).toEqual(0);
        }
    );

    it('Viser tittel og url til pdf hvis Konverteringstjenesten ikke klarer å konvertere til bilder', () => {
        const props = {
            journalpostmetadata: journalpostmetadata_test,
            dokref: '5678',
            dokumentmetadata: {
                bildeurler: [],
                kanVises: false,
                tittel: 'en tittel',
                feilmelding: '',
                ekstrafeilinfo: { korruptPdf: 'true' } // Konverteringstjenesten melder om korrupt pdf
            },
            first: false
        };
        const wrapper = render(<Dokument {...props} />);

        const renderedVedleggListe = wrapper.find('.lokal-linker');
        expect(renderedVedleggListe.length).toEqual(1);

        const vedleggListe = wrapper.find('h1');
        expect(vedleggListe.length).toEqual(1);
    });
});
