import PT from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import Betingelser from './betingelser';
import {Checkbox} from 'nav-frontend-skjema';
import Lenke from 'nav-frontend-lenker';
import Alertstripe from 'nav-frontend-alertstriper'
import {visibleIfHOC} from "../utils/hocs/visible-if";

import './godta-vilkar.less'

const AlertstripeVisibleIf = visibleIfHOC(Alertstripe);

class GodtaVilkar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            vilkarGodtatt: false
        };
    }

    render() {
        const {visModal, actions, inputName, skalViseFeilmelding} = this.props;
        //const ariaCheckboxState = config.checked ? 'Checkbox avkrysset' : 'Checkbox ikke avkrysset';

        const godkjennVilkaar = () => {
            this.setState({
                vilkarGodtatt: true
            });
            actions.skjulVilkarModal();
        };

        const avbryt = () => {
            this.setState({
                vilkarGodtatt: false
            });
            actions.skjulVilkarModal();
        };

        const label = <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.sjekkboks"/>;

        /* eslint-disable jsx-a11y/no-onchange, no-script-url */
        let vilkarGodtatt = this.state.vilkarGodtatt;
        return (
            <div className="godtavilkaar-panel blokk-m">
                <div className="nav-input">
                    <Checkbox
                        name={inputName}
                        className="checkbox"
                        aria-describedby="checkbox-feilmelding"
                        checked={vilkarGodtatt}
                        onChange={() => vilkarGodtatt ? avbryt() : godkjennVilkaar() }
                        label={label}
                    />
                    <Lenke
                        href="javascript:void(0)"
                        className="vilkar-link"
                        onClick={actions.visVilkarModal}
                    >
                        <FormattedMessage id="send-sporsmal.still-sporsmal.betingelser.vis"/>
                    </Lenke>
                    <Betingelser
                        visModal={visModal}
                        godkjennVilkaar={godkjennVilkaar}
                        avbryt={avbryt}
                        lukkModal={actions.skjulVilkarModal}
                        name="betingelser-panel"
                    />
                    <AlertstripeVisibleIf type="advarsel" id="checkbox-feilmelding" visibleIf={skalViseFeilmelding}>
                        <FormattedMessage id="feilmelding.godkjennVilkaar.required"/>
                    </AlertstripeVisibleIf>
                </div>
            </div>
        );
    }
}

GodtaVilkar.propTypes = {
    visModal: PT.bool.isRequired,
    config: PT.object.isRequired,
    actions: PT.shape({
        visVilkarModal: PT.func.isRequired,
        skjulVilkarModal: PT.func.isRequired
    }).isRequired
};

export default GodtaVilkar;
