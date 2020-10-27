import * as React from 'react';
import Lenkepanel from '../utils/Lenkepanel';
import { shortDate } from '../utils';
import AntallMeldinger from './AntallMeldinger';
import classNames from 'classnames';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { Traad } from '../Traad';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import Tekstomrade, { defaultRules } from 'nav-frontend-tekstomrade';

interface Props {
    traad: Traad;
    aktiv: boolean;
    ulestMeldingKlasse: string;
}

const cls = (props: Props) =>
    classNames('dialog', props.ulestMeldingKlasse, {
        markert: props.aktiv,
        'flere-meldinger': props.traad.meldinger.length > 1
    });

function MeldingPreview(props: Props) {
    const history = useHistory();

    useEffect(() => {
        if (props.aktiv) {
            history.push(`traad/${props.traad.nyeste.id}`);
        }
    }, []);

    const melding = props.traad.nyeste;
    const dato = shortDate(melding.opprettet);

    const antallMeldinger = props.traad.meldinger.length;

    const maBesvares =
        melding.type === 'SPORSMAL_MODIA_UTGAAENDE' && !melding.kassert ? (
            <span>
                / <strong className="purring">Må besvares</strong>
            </span>
        ) : null;

    const avsender = props.traad.nyeste.fraNav ? (
        <span>
            / Fra <span className="avsender-fra-nav">NAV</span>
        </span>
    ) : null;
    const flereMeldinger = antallMeldinger > 1 ? `(${antallMeldinger})` : null;

    return (
        <li className="traad blokk-xxxs" key={melding.traadId}>
            <Lenkepanel href={`/traad/${melding.traadId}`} className={cls(props)}>
                <p className="vekk">Samtale-ikon</p>
                <AntallMeldinger antall={antallMeldinger} />
                <Normaltekst className="blokk-xxxs">
                    <span>{dato}</span>
                    {avsender}
                    {maBesvares}
                </Normaltekst>
                <Undertittel tag="h3">
                    {melding.statusTekst}
                    <span className="vekk">
                        {flereMeldinger}
                        {maBesvares}
                    </span>
                </Undertittel>
                <Tekstomrade rules={[...defaultRules]} className="tema-avsnitt">
                    {melding.fritekst}
                </Tekstomrade>
            </Lenkepanel>
        </li>
    );
}

export default MeldingPreview;
