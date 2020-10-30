import { render } from '../test-config';
import * as React from 'react';
import Innholdslaster from './Innholdslaster';
import { STATUS } from '../ducks/ducks-utils';
import { ErrorState, OkState, OtherState } from '../avhengigheter';

describe('Innholdslaster', () => {
    it('skal vise laster om noen laster', () => {
        const laster1: OtherState = { status: STATUS.PENDING };
        const laster2: OtherState = { status: STATUS.PENDING };
        const lastet: OtherState = { status: STATUS.PENDING };

        const wrapper = render(<Innholdslaster avhengigheter={[laster1, laster2, lastet]} />);
        expect(wrapper.find('.spinner').length).toBeGreaterThan(0);
    });

    it('skal vise feilmelding om noe feilet', () => {
        const feil: ErrorState = { status: STATUS.ERROR, error: Error() };
        const lastet: ErrorState = { status: STATUS.ERROR, error: Error() };
        const lastet2: ErrorState = { status: STATUS.ERROR, error: Error() };

        const wrapper = render(<Innholdslaster avhengigheter={[lastet, feil, lastet2]} />);
        expect(wrapper.find('.alertstripe').length).toBeGreaterThan(0);
    });

    it('skal vise child om alt gikk greit', () => {
        const lastet: OkState<unknown> = { status: STATUS.OK, data: {} };
        const lastet2: OkState<unknown> = { status: STATUS.OK, data: {} };

        const wrapper = render(<Innholdslaster avhengigheter={[lastet, lastet2]}>DETTE SKAL VISES</Innholdslaster>);
        expect(wrapper.text()).toEqual('DETTE SKAL VISES');
    });
});
