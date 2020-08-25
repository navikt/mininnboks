import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { shortDate, safeHtml } from '../utils';
import { withRouter } from 'react-router-dom';
import Lenkepanel from '../utils/Lenkepanel';
import {Normaltekst, Undertittel } from 'nav-frontend-typografi';
import {Traad} from "../Traad";
import {useEffect} from "react";

interface Props {
    traad: Traad,
    aktiv: boolean,
    ulestMeldingKlasse: string
}

const cls = (props : Props) => classNames('oppgave', props.ulestMeldingKlasse, {
    markert: props.aktiv
});

function OppgavePreview(props : Props) {
    useEffect(() => {
        if (props.aktiv) {
            props.history.replace(`oppgave/${props.traad.nyeste.id}`);
        }
    }, [])

    const melding = props.traad.nyeste;
    const dato = shortDate(melding.opprettet);
    const avsnitt = safeHtml(melding.fritekst);

    const avsender = props.traad.nyeste.fraNav ? (
        <span>/ Fra <span className="avsender-fra-nav"><FormattedMessage id="avsender.tekst.NAV" /></span></span>
    ) : null;

    return (
        <li className="traad blokk-xxxs" key={melding.traadId}>
            <Lenkepanel
                href={`/oppgave/${melding.traadId}`}
                className={cls(props)}
            >
                <p className="vekk">
                    <FormattedMessage id="oppgavemelding.ikon" />
                </p>
                <Normaltekst>
                    <span>{dato}</span>
                    {avsender}
                </Normaltekst>
                <Undertittel tag="h3">
                    {melding.statusTekst}
                </Undertittel>
                <Normaltekst className="tema-avsnitt">{avsnitt}</Normaltekst>
            </Lenkepanel>
        </li>
    );
}

export default withRouter(OppgavePreview);
