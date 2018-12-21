import PT from 'prop-types';
import React from 'react';
import Personalia from './dokumentvisning/personalia/personalia';
import Dokumenter from './dokumentvisning/dokument/dokumenter';
import { FormattedMessage, injectIntl } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

import './dokument-visning.less';

class DokumentVisning extends React.Component {
    componentDidMount() {
        document.body.scrollTop = 1;
        document.documentElement.scrollTop = 1;
    }

    render() {
        const {
            dokumentmetadata,
            journalpostmetadata,
            intl,
            lastNedPdfOnClick,
            printPdfOnClick
        } = this.props;
        const { temakode } = journalpostmetadata.resultat;
        const kontaktNavUrl = intl.messages['dokumentvisning.kontakt.nav.link'];


        return (
            <div className="dokinnsyn">
                <section className="dokumentvisning-header blokk-m">
                    <Personalia journalpostmetadata={journalpostmetadata.resultat} hode={false} className="blokk-m" />
                    <ul className="ustilet">
                        <li>
                            <Lenke href={`/saksoversikt/app/tema/${temakode}`}>
                                <FormattedMessage id="dokumentvisning.gatil.saksoversikt" />
                            </Lenke>
                        </li>
                        <li>
                            <Lenke href={kontaktNavUrl}><FormattedMessage id="dokumentvisning.kontakt.nav" /></Lenke>
                        </li>
                    </ul>
                </section>
                <section className="dokumenter">
                    <Dokumenter
                        journalpostId={journalpostmetadata.resultat.journalpostId}
                        dokumentmetadata={dokumentmetadata}
                        lastNedPdfOnClick={lastNedPdfOnClick}
                        printPdfOnClick={printPdfOnClick}
                    />
                </section>
            </div>
        );
    }
}

DokumentVisning.propTypes = {
    dokumentmetadata: PT.array.isRequired,
    lastNedPdfOnClick: PT.func.isRequired,
    printPdfOnClick: PT.func.isRequired,
    journalpostmetadata: PT.object.isRequired,
    intl: PT.object.isRequired
};

export default injectIntl(DokumentVisning);
