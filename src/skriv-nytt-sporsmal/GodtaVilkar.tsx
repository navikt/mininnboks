import * as React from 'react';
import Betingelser from './Betingelser';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';

import './godta-vilkar.less';

interface Props extends CheckboxProps {
    actions: {
        visVilkarModal: () => void;
        skjulVilkarModal: () => void;
    };
    visModal: boolean;
    inputName: string;
    setVilkaarGodtatt: (godtatt: boolean) => void;
    villkaarGodtatt: boolean;
}
function GodtaVilkar(props: Props) {
    const godkjennVilkaar = () => {
        props.setVilkaarGodtatt(true);
        props.actions.skjulVilkarModal();
    };

    const avbryt = () => {
        props.setVilkaarGodtatt(false);
        props.actions.skjulVilkarModal();
    };

    return (
        <div className="godtavilkaar-panel blokk-m">
            <div className="nav-input">
                <Checkbox
                    name={props.inputName}
                    className="checkbox"
                    aria-describedby="checkbox-feilmelding"
                    label={props.label}
                    {...props}
                />
                <Lenke href="javascript:void(0)" className="vilkar-link" onClick={props.actions.visVilkarModal}>
                    Vis vilkår
                </Lenke>
                <Betingelser
                    visModal={props.visModal}
                    godkjennVilkaar={godkjennVilkaar}
                    avbryt={avbryt}
                    lukkModal={props.actions.skjulVilkarModal}
                />
            </div>
        </div>
    );
}

export default GodtaVilkar;
