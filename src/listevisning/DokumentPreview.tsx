import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { shortDate } from '../utils';
import {Normaltekst, Undertittel } from 'nav-frontend-typografi';
import classNames from 'classnames';
import {Traad} from "../Traad";
import Lenkepanel from "../utils/Lenkepanel";

interface Props {
    traad: Traad,
    aktiv: boolean,
    ulestMeldingKlasse: string
}

const cls = (props : Props) => classNames('blokk-xxxs dokument', props.ulestMeldingKlasse, {
    markert: props.aktiv
});

function DokumentPreview(props : Props) {
    const dokument = props.traad.nyeste;
    const avsender = <span className="avsender-fra-nav"><FormattedMessage id="avsender.tekst.NAV" /></span>;
    const dato = shortDate(dokument.opprettet);
    const temanavn = dokument.temaNavn;

    return (
        <li className="traad">
            <Lenkepanel
                href={`/dokument/${dokument.id}`}
                className={cls(props)}
            >
                <p className="vekk">
                    <FormattedMessage id="dokumentmelding.ikon" />
                </p>
                <Normaltekst>{dato} / Fra {avsender} </Normaltekst>
                <Undertittel tag="h3">{dokument.statusTekst}</Undertittel>
                <Normaltekst className="tema-avsnitt">{temanavn}</Normaltekst>
            </Lenkepanel>
        </li>
    );
}

export default DokumentPreview;
