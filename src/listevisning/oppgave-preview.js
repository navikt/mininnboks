import PT from 'prop-types';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { shortDate, safeHtml } from '../utils';
import { withRouter } from 'react-router-dom';
import Lenkepanel from '../utils/lenkepanel';
import {Normaltekst, Undertittel } from 'nav-frontend-typografi';

const cls = (props) => classNames('oppgave', props.ulestMeldingKlasse, {
    markert: props.aktiv
});

class OppgavePreview extends Component {
    componentDidMount() {
        if (this.props.aktiv) {
            this.props.history.replace(`oppgave/${this.props.traad.nyeste.id}`);
        }
    }

    render() {
        const { traad } = this.props;

        const melding = traad.nyeste;
        const dato = shortDate(melding.opprettet);
        const avsnitt = safeHtml(melding.fritekst);

        const avsender = traad.nyeste.fraNav ? (
            <span>/ Fra <span className="avsender-fra-nav"><FormattedMessage id="avsender.tekst.NAV" /></span></span>
        ) : null;

        return (
            <li className="traad blokk-xxxs" key={melding.traadId}>
                <Lenkepanel
                    href={`/oppgave/${melding.traadId}`}
                    className={cls(this.props)}
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
}

OppgavePreview.propTypes = {
    traad: PT.object,
    aktiv: PT.bool.isRequired,
    ulestMeldingKlasse: PT.string
};

export default withRouter(OppgavePreview);
