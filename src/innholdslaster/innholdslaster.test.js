/* eslint-env mocha */
import { render } from '../test-config';
import React from 'react';
import { expect } from 'chai';
import Innholdslaster from './Innholdslaster';
import { STATUS } from '../ducks/ducks-utils';

const {PENDING, ERROR, OK} = STATUS;

describe('Innholdslaster', () => {
    it('skal vise laster om noen laster', () => {
        const laster1 = { status: PENDING, data: {} };
        const laster2 = { status: PENDING, data: {} };
        const lastet = { status: PENDING, data: {} };

        const wrapper = render(<Innholdslaster avhengigheter={[laster1, laster2, lastet]} />);
        expect(wrapper.find(".spinner").length).to.be.above(0);
    });

    it('skal vise feilmelding om noe feilet', () => {
        const feil = { status: ERROR, data: { response: { status: 500 } } };
        const lastet = { status: ERROR, data: {} };
        const lastet2 = { status: ERROR, data: {} };

        const wrapper = render(<Innholdslaster avhengigheter={[lastet, feil, lastet2]} />);
        expect(wrapper.find(".alertstripe").length).to.be.above(0);
    });

    it('skal vise child om alt gikk greit', () => {
        const lastet = { status: OK, data: {} };
        const lastet2 = { status: OK, data: {} };

        const wrapper = render(
            <Innholdslaster avhengigheter={[lastet, lastet2]}>
                DETTE SKAL VISES
            </Innholdslaster>
        );
        expect(wrapper.text()).to.equal('DETTE SKAL VISES');
    });
});
