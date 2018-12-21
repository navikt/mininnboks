/* eslint-env mocha */
import { render } from '../../../test-config';
import React from 'react';
import { expect } from 'chai';
import Dokumenter from './dokumenter';

describe('Vedleggliste', () => {
    it('Returnerer tom liste om ingen vedlegg', () => {
        const props = {
            journalpostId: 'x',
            dokumentmetadata: []
        };

        const wrapper = render(<Dokumenter {...props} />);
        const renderedVedleggListe = wrapper.find('.dokumentliste');

        expect(renderedVedleggListe.length).to.equal(1);

        const vedleggListe = wrapper.find('li');
        expect(vedleggListe.length).to.equal(0);
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
            ]
        };

        const wrapper = render(<Dokumenter {...props}/>);

        const renderedVedleggListe = wrapper.find('.dokumentliste');
        expect(renderedVedleggListe.length).to.equal(1);

        const vedleggListe = wrapper.find('li');
        expect(vedleggListe.length).to.equal(1);
    });
});
