import * as React from 'react';
import {useState} from 'react';
import {FormattedMessage} from 'react-intl';
import Betingelser from './Betingelser';
import {Checkbox} from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper'
import {visibleIfHOC} from "../utils/hocs/visible-if";

import './godta-vilkar.less'

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);
interface Props{
    visModal: boolean;
    visVilkarModal: () => void;
    skjulVilkarModal: () => void;
    skalViseFeilmelding: boolean;
    inputName: string;
}
function GodtaVilkar(props: Props) {

    const [vilkarGodtatt, setVilkarGodtatt] = useState(false)

    const godkjennVilkaar = () => {
        setVilkarGodtatt(true);
        props.skjulVilkarModal();
    };

    const avbryt = () => {
        setVilkarGodtatt(false);
        props.skjulVilkarModal();
    };

        const label = <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.sjekkboks"/>;
        return (
            <div className="godtavilkaar-panel blokk-m">
                <div className="nav-input">
                    <Checkbox
                        name={props.inputName}
                        className="checkbox"
                        aria-describedby="checkbox-feilmelding"
                        checked={vilkarGodtatt}
                        onChange={() => vilkarGodtatt ? avbryt() : godkjennVilkaar() }
                        label={label}
                    />
                    <Lenke
                        href="javascript:void(0)"
                        className="vilkar-link"
                        onClick={props.visVilkarModal}
                    >
                        <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.vis"/>
                    </Lenke>
                    <Betingelser
                        visModal={props.visModal}
                        godkjennVilkaar={godkjennVilkaar}
                        avbryt={avbryt}
                        lukkModal={props.skjulVilkarModal}
                    />
                    <AlertstripeVisibleIf type="advarsel" id="checkbox-feilmelding" visibleIf={props.skalViseFeilmelding}>
                        <FormattedMessage id="feilmelding.godkjennVilkaar.required"/>
                    </AlertstripeVisibleIf>
                </div>
            </div>
        );
}



export default GodtaVilkar;
