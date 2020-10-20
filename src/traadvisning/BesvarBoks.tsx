import * as React from 'react';
import {validate} from '../utils/validationutil';
import {STATUS} from '../ducks/ducks-utils';
import {FormattedMessage} from 'react-intl';
import {TextareaControlled} from 'nav-frontend-skjema';
import {Hovedknapp, Flatknapp} from 'nav-frontend-knapper';
import {visibleIfHOC} from "../utils/hocs/visible-if";
import Feilmelding from "../feilmelding/Feilmelding";

import './besvar-boks.less'
import {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {skjulBesvarBoks} from "../ducks/ui";
import {sendSvar} from "../ducks/traader";

interface Props {
    innsendingStatus: STATUS,
    traadId: string,
}

function BesvarBoks(props : Props) {
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const [fritekst, setFritekst] = useState('');
    const dispatch = useDispatch();
    
    const onSubmit = (e : FormEvent) => {
        e.preventDefault();

        const errors = validate({
            fritekst: fritekst
        }, {
            maxLength: 2500
        });
        const ids = Object.entries(errors).map(([field, errorType]) => `feilmelding.${field}.${errorType}`);

        setErrorIds(ids);

        if (!errorIds.length) {
            dispatch(sendSvar(props.traadId, fritekst));
        }
    };

    const feilmeldinger = errorIds && errorIds.map(errorId => (
        <Feilmelding>
            <FormattedMessage id={errorId}/>
        </Feilmelding>
    ));

    const avbryt = () => {
        dispatch(skjulBesvarBoks());
    }

    return (
        <form className="besvar-boks text-center blokk-center blokk-l" onSubmit={onSubmit}>
            <TextareaControlled
                textareaClass="fritekst"
                name="fritekst"
                label={""}
                maxLength={2500}
                defaultValue={""}
                onChange={(e) => setFritekst(e.currentTarget.value)}
            />
            {feilmeldinger}
            <div className="blokk-xs">
                <Hovedknapp htmlType="submit" spinner={props.innsendingStatus === STATUS.PENDING}>
                    <FormattedMessage id="traadvisning.besvar.send"/>
                </Hovedknapp>
            </div>
            <Flatknapp onClick={avbryt}>
                <FormattedMessage id="traadvisning.besvar.avbryt"/>
            </Flatknapp>
        </form>
    );
}


export default visibleIfHOC(BesvarBoks);
