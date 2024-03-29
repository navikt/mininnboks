import * as React from 'react';
import classNames from 'classnames';
import Lenkepanel from '../utils/Lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Traad } from '../Traad';
import Tekstomrade from 'nav-frontend-tekstomrade';
import { useHistory } from 'react-router';
import { formaterDato } from '../utils/date-utils';
import { useOnMount } from '../utils/custom-hooks';

interface Props {
    traad: Traad;
    aktiv: boolean;
    ulestMeldingKlasse: string;
}

const cls = (props: Props) =>
    classNames('oppgave', props.ulestMeldingKlasse, {
        markert: props.aktiv
    });

function OppgavePreview(props: Props) {
    const history = useHistory();
    useOnMount(() => {
        if (props.aktiv) {
            history.replace(`oppgave/${props.traad.nyeste.id}`);
        }
    });

    const melding = props.traad.nyeste;
    const dato = formaterDato(melding.opprettet);

    const avsender = props.traad.nyeste.fraNav ? (
        <span>
            / Fra <span className="avsender-fra-nav">NAV</span>
        </span>
    ) : null;

    return (
        <li className="traad blokk-xxxs" key={melding.traadId}>
            <Lenkepanel href={`/oppgave/${melding.traadId}`} className={cls(props)}>
                <p className="vekk">Sykmeldings-ikon</p>
                <Normaltekst>
                    <span>{dato}</span>
                    {avsender}
                </Normaltekst>
                <Undertittel tag="h3">{melding.statusTekst}</Undertittel>
                <Tekstomrade className="tema-avsnitt">{melding.fritekst}</Tekstomrade>
            </Lenkepanel>
        </li>
    );
}

export default OppgavePreview;
