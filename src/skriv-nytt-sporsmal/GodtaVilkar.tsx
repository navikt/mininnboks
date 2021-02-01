import * as React from 'react';
import { useState } from 'react';
import { FieldState, checkboxAdapter } from '@nutgaard/use-formstate';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import Betingelser from './Betingelser';
import { feilmelding } from '../utils/validationutil';
import './godta-vilkar.less';

interface Props extends CheckboxProps {
    fieldstate: FieldState;
}

function GodtaVilkar(props: Props) {
    const [visVilkarModal, setVisVilkarModal] = useState<boolean>(false);
    const { fieldstate, ...rest } = props;
    const godkjennVilkaar = () => {
        fieldstate.setValue('true');
        setVisVilkarModal(false);
    };

    const avbryt = () => {
        fieldstate.setValue('false');
        setVisVilkarModal(false);
    };

    return (
        <div className="godtavilkaar-panel blokk-m">
            <div className="nav-input">
                <Checkbox
                    {...rest}
                    {...checkboxAdapter(fieldstate)}
                    feil={feilmelding(fieldstate)}
                    className="checkbox"
                    aria-describedby="checkbox-feilmelding"
                />
                <Lenke href="#" className="vilkar-link" onClick={() => setVisVilkarModal(true)}>
                    Vis vilkår
                </Lenke>
                <Betingelser
                    visModal={visVilkarModal}
                    godkjennVilkaar={godkjennVilkaar}
                    avbryt={avbryt}
                    lukkModal={() => setVisVilkarModal(false)}
                />
            </div>
        </div>
    );
}

export default GodtaVilkar;
