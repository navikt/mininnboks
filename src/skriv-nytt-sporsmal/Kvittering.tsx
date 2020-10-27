import * as React from 'react';
import { Link } from 'react-router-dom';
import FormattedHTMLMessage from '../utils/FormattedHTMLMessage';

function Kvittering() {
    return (
        <article className="panel text-center">
            <h1 className="hode hode-undertittel hode-dekorert hode-suksess">
                <FormattedHTMLMessage id="send-sporsmal.bekreftelse.antall-dager" />
            </h1>

            <p className="blokk-m">
                <FormattedHTMLMessage id="send-sporsmal.bekreftelse.varslingsinfo" />
            </p>

            <hr className="blokk-m" />

            <Link className="knapp-link-stor" to="/">
                <FormattedHTMLMessage id="send-sporsmal.bekreftelse.til-meldingsboksen" />
            </Link>
        </article>
    );
}

export default Kvittering;
