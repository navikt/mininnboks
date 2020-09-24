/* eslint-env mocha */
import React from 'react';
import { render } from '../../../test-config';
import { expect } from 'chai';
import DokumentSide from './DokumentSide';

describe('DokumentBilde', () => {
    const messages = {
        'dokumentinnsyn.side.alttekst': 'alt-tekst',
        'feilmelding.tekst': 'feilmeldingtekst',
        'feilmelding.tittel': 'feilmeldingtittel',
        'ikon.feilmelding.aria-label': 'aria-label',
        'dokumentvisning.bildelasting.feilet': 'bildelasting feilet'
    };
    it('Viser feilmelding om bildet ikke kan vises', () => {
        const props = {
            kanVises: false,
            url: '/saksoversikt/img/dokumenter/mockside/1',
            ekstrafeilinfo: {},
            feilmelding: 'feilmelding'
        };

        const wrapper = render(<DokumentSide {...props} />);

        const renderedFeilmelding = wrapper.find('.feilmelding-container');
        expect(renderedFeilmelding.length).to.equal(1);

        const renderedDokumentlaster = wrapper.find('.dokument-laster');
        expect(renderedDokumentlaster.length).to.equal(0);
    });

    it('Viser dokumentlasting om bildet kan vises', () => {
        const props = {
            url: 'http://localhost:9876/saksoversikt/img/dokumenter/mockside/1',
            kanVises: true,
            ekstrafeilinfo: {},
            feilmelding: 'feilmelding'
        };

        const wrapper = render(<DokumentSide {...props} />);

        const renderedDokumentlaster = wrapper.find('.dokument-laster');
        expect(renderedDokumentlaster.length).to.be.above(0);
    });
});
