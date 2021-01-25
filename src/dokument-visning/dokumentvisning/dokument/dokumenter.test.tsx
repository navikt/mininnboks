import Dokumenter from './Dokumenter';
import * as React from 'react';
import { render } from '../../../test-config';

const journalpostmetadata_test = {
    resultat: {
        retning: 'x',
        dato: 'x',
        navn: 'x',
        journalpostId: 'x',
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
describe('Vedleggliste', () => {
    it('Returnerer tom liste om ingen vedlegg', () => {
        const props = {
            journalpostmetadata: journalpostmetadata_test,
            dokumentmetadata: [],
            lastNedPdfOnClick: () => {},
            printPdfOnClick: () => {}
        };

        const wrapper = render(<Dokumenter {...props} />);
        const renderedVedleggListe = wrapper.find('.dokumentliste');

        expect(renderedVedleggListe.length).toEqual(1);

        const vedleggListe = wrapper.find('li');
        expect(vedleggListe.length).toEqual(0);
    });

    it('Returnerer listeelementer om det er vedlegg', () => {
        const props = {
            journalpostmetadata: journalpostmetadata_test,
            dokumentmetadata: [
                {
                    bildeurler: ['123'],
                    kanVises: true,
                    tittel: 'tittel',
                    feilmelding: 'feilmelding',
                    ekstrafeilinfo: {},
                    dokumentreferanse: '321'
                }
            ],
            lastNedPdfOnClick: () => {},
            printPdfOnClick: () => {}
        };

        const wrapper = render(<Dokumenter {...props} />);

        const renderedVedleggListe = wrapper.find('.dokumentliste');
        expect(renderedVedleggListe.length).toEqual(1);

        const vedleggListe = wrapper.find('li');
        expect(vedleggListe.length).toEqual(1);
    });
});
