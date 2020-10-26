import Dokumenter from './Dokumenter';
import * as React from 'react';
import { render } from '../../../test-config';

describe('Vedleggliste', () => {
    it('Returnerer tom liste om ingen vedlegg', () => {
        const props = {
            journalpostId: 'x',
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
            journalpostId: '98944',
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

        const wrapper = render(<Dokumenter {...props}/>);

        const renderedVedleggListe = wrapper.find('.dokumentliste');
        expect(renderedVedleggListe.length).toEqual(1);

        const vedleggListe = wrapper.find('li');
        expect(vedleggListe.length).toEqual(1);
    });
});
