import * as React from 'react';
import Betingelser from './Betingelser';
import { Checkbox, CheckboxProps } from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';

import './godta-vilkar.less';
import useFormstate from "@nutgaard/use-formstate";
import {feilmelding} from "../utils/validationutil";

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
type Vilkaar = {
    godkjennVilkaar: string;
};
const validator = useFormstate<Vilkaar>((values) => {
    console.log(values);
    const godkjennVilkaar = values.godkjennVilkaar === '' ? 'Du må godta vilkårene for å sende beskjeden' : undefined;

    return {godkjennVilkaar };
});

const initialValues : Vilkaar= {
    godkjennVilkaar: ''
};

function GodtaVilkar(props: Props) {
    const godkjennVilkaar = () => {
        props.setVilkaarGodtatt(true);
        props.actions.skjulVilkarModal();
    };

    const avbryt = () => {
        props.setVilkaarGodtatt(false);
        props.actions.skjulVilkarModal();
    };

    const initialValues : Vilkaar= {
        godkjennVilkaar: ''
    };

    const state = validator(initialValues);

    return (
        <div className="godtavilkaar-panel blokk-m">
            <div className="nav-input">
                <Checkbox
                    className="checkbox"
                    aria-describedby="checkbox-feilmelding"
                    label={props.label}
                    {...state.fields.godkjennVilkaar.input}
                    feil={feilmelding(state.fields.godkjennVilkaar)}
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
