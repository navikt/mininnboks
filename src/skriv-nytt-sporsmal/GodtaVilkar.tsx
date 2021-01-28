import * as React from 'react';
import { FieldState, checkboxAdapter } from '@nutgaard/use-formstate';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import Betingelser from './Betingelser';
import { feilmelding } from '../utils/validationutil';
import './godta-vilkar.less';

interface Props extends CheckboxProps {
    visModal: boolean;
    actions: {
        visVilkarModal: () => void;
        skjulVilkarModal: () => void;
    };
    fieldstate: FieldState;
}

function GodtaVilkar(props: Props) {
    const { visModal, actions, fieldstate, ...rest } = props;
    const godkjennVilkaar = () => {
        fieldstate.setValue('true');
        actions.skjulVilkarModal();
    };

    const avbryt = () => {
        fieldstate.setValue('false');
        actions.skjulVilkarModal();
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
                <Lenke href="#" className="vilkar-link" onClick={actions.visVilkarModal}>
                    Vis vilkår
                </Lenke>
                <Betingelser
                    visModal={visModal}
                    godkjennVilkaar={godkjennVilkaar}
                    avbryt={avbryt}
                    lukkModal={actions.skjulVilkarModal}
                />
            </div>
        </div>
    );
}

export default GodtaVilkar;
