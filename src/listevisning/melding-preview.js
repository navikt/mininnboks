import PT from 'prop-types';
import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import Lenkepanel from '../utils/Lenkepanel';
import {shortDate, safeHtml} from '../utils';
import AntallMeldinger from './AntallMeldinger';
import classNames from 'classnames';
import {Link, withRouter} from 'react-router-dom';
import {Normaltekst, Undertekst, Undertittel} from 'nav-frontend-typografi'

const cls = (props) => classNames('dialog', props.ulestMeldingKlasse, {
    markert: props.aktiv,
    'flere-meldinger': props.traad.meldinger.length > 1
});

class MeldingPreview extends Component {
    componentDidMount() {
        if (this.props.aktiv) {
            this.props.history.push(`traad/${this.props.traad.nyeste.id}`);
        }
    }

    render() {
        const {traad} = this.props;

        const melding = traad.nyeste;
        const dato = shortDate(melding.opprettet);
        const fritekst = safeHtml(melding.fritekst);

        const antallMeldinger = traad.meldinger.length;

        const maBesvares = melding.type === 'SPORSMAL_MODIA_UTGAAENDE' && !melding.kassert ?
            <span>/ <strong className="purring"><FormattedMessage id="purre.svar"/></strong></span> : null;

        const avsender = traad.nyeste.fraNav ? (
            <span>/ Fra <span className="avsender-fra-nav"><FormattedMessage id="avsender.tekst.NAV"/></span></span>
        ) : null;
        const flereMeldinger = antallMeldinger > 1 ? `(${antallMeldinger})` : null;

        return (
            <li className="traad blokk-xxxs" key={melding.traadId}>
                <Lenkepanel
                    href={`/traad/${melding.traadId}`}
                    className={cls(this.props)}
                >
                    <p className="vekk">
                        <FormattedMessage id="meldinger.ikon"/>
                    </p>
                    <AntallMeldinger antall={antallMeldinger}/>
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
                    <Undertekst className="tema-avsnitt">{fritekst}</Undertekst>
                </Lenkepanel>
            </li>
        );
    }
}

MeldingPreview.propTypes = {
    traad: PT.object,
    aktiv: PT.bool.isRequired,
    ulestMeldingKlasse: PT.string
};

export default withRouter(MeldingPreview);


