import PT from 'prop-types';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { FormattedMessage } from 'react-intl';
import Lenkepanel from '../utils/lenkepanel';
import { shortDate } from '../utils';
import {Normaltekst, Undertittel } from 'nav-frontend-typografi';

import classNames from 'classnames';

const cls = (props) => classNames('blokk-xxxs dokument', props.ulestMeldingKlasse, {
    markert: props.aktiv
});

class DokumentPreview extends Component {
    componentDidMount() {
        if (this.props.aktiv) {
            findDOMNode(this.refs.lenke).focus();
        }
    }

    render() {
        const { traad } = this.props;
        const dokument = traad.nyeste;
        const avsender = <span className="avsender-fra-nav"><FormattedMessage id="avsender.tekst.NAV" /></span>;
        const dato = shortDate(dokument.opprettet);
        const temanavn = dokument.temaNavn;

        return (
            <li className="traad">
                <Lenkepanel
                    href={`/dokument/${dokument.id}`}
                    className={cls(this.props)}
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
}

DokumentPreview.propTypes = {
    traad: PT.object,
    aktiv: PT.bool.isRequired,
    ulestMeldingKlasse: PT.string
};

export default DokumentPreview;
