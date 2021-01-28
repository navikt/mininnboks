import * as React from 'react';
import { Link } from 'react-router-dom';

function Kvittering() {
    return (
        <article className="panel text-center">
            <h1 className="hode hode-undertittel hode-dekorert hode-suksess">Takk, din beskjed er mottatt.</h1>

            <p className="blokk-m">
                Når vi har behandlet beskjeden vil du få melding på sms og/eller epost til kontaktinformasjon som du har
                oppgitt i{' '}
                <a
                    href="https://brukerprofil.difi.no/minprofil"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Lenke som åpner din brukerprofil hos DIFI"
                >
                    Difis sentrale kontaktregister
                </a>
                .
            </p>

            <hr className="blokk-m" />

            <Link className="knapp-link-stor" to="/">
                Til Innboks
            </Link>
        </article>
    );
}

export default Kvittering;
