/* eslint-env mocha */
import React from 'react';
import { expect } from 'chai';
import KulemenyListe from './hurtignavigering';

describe('KulemenyListe', () => {
    it('Gir noscript om listen er mindre enn 2', () => {
        const dokumentmetadata = [];
        const wrapper = render(<KulemenyListe dokumentmetadata={dokumentmetadata} />);

        const result = wrapper.find('noscript');

        expect(result.length).to.equal(1);
    });

    it('Gir liste hvis dokumentmetadata har to eller flere objekter', () => {
        const dokumentmetadataObjekt = {
            dokumentreferanse: '123',
            tittel: 'tittel'
        };
        const dokumentmetadata = [dokumentmetadataObjekt, dokumentmetadataObjekt];

        const wrapper = render(<KulemenyListe dokumentmetadata={dokumentmetadata} />);

        const result = wrapper.find('ul');

        expect(result.length).to.equal(1);
    });
});
