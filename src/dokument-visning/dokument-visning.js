import PT from 'prop-types';
import React from 'react';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage } from 'react-intl';
import Personalia from './dokumentvisning/personalia/personalia';
import Dokumenter from './dokumentvisning/dokument/dokumenter';
import IntlLenke from "../utils/IntlLenke";
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
            lastNedPdfOnClick,
            printPdfOnClick
        } = this.props;
        const { temakode } = journalpostmetadata.resultat;

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
                            <IntlLenke href="skriv.ny.link" className="lenke">
                                <FormattedMessage id="dokumentvisning.kontakt.nav" />
                            </IntlLenke>
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
    journalpostmetadata: PT.object.isRequired
};

export default DokumentVisning;
