import * as React from 'react';
import {validate} from '../utils/validationutil';
import {STATUS} from './../ducks/utils';
import {FormattedMessage} from 'react-intl';
import {TextareaControlled} from 'nav-frontend-skjema';
import {Hovedknapp, Flatknapp} from 'nav-frontend-knapper';
import {visibleIfHOC} from "../utils/hocs/visible-if";
import Feilmelding from "../feilmelding/feilmelding";

import './besvar-boks.less'
import {ChangeEvent, FormEvent, FormEventHandler, useState} from "react";

interface Props {
    innsendingStatus: string,
    traadId: string,
    submit: (traadId : string, fritekst? : string) => void,
    avbryt: () => void
}

function BesvarBoks(props : Props) {
    const [errorIds, setErrorIds] = useState<string[]>([]);
    const onSubmit = (e : ChangeEvent) => {
        e.preventDefault();

        const fritekst = e.target.nodeValue;
        const errors = validate({
            fritekst: fritekst
        }, {
            maxLength: 2500
        });
        const ids = Object.entries(errors).map(([field, errorType]) => `feilmelding.${field}.${errorType}`);

        setErrorIds(ids);

        if (!errorIds.length) {
            props.submit(props.traadId, fritekst);
        }
    };

    const feilmeldinger = errorIds && errorIds.map(errorId => (
        <Feilmelding>
            <FormattedMessage id={errorId}/>
        </Feilmelding>
    ));

    return (
        <form className="besvar-boks text-center blokk-center blokk-l" onSubmit={onSubmit}>
            <TextareaControlled
                textareaClass="fritekst"
                name="fritekst"
                label={""}
                maxLength={2500}
                defaultValue={""}
            />
            {feilmeldinger}
            <div className="blokk-xs">
                <Hovedknapp htmlType="submit" spinner={props.innsendingStatus === STATUS.PENDING}>
                    <FormattedMessage id="traadvisning.besvar.send"/>
                </Hovedknapp>
            </div>
            <Flatknapp onClick={props.avbryt}>
                <FormattedMessage id="traadvisning.besvar.avbryt"/>
            </Flatknapp>
        </form>
    );
}


export default visibleIfHOC(BesvarBoks);
