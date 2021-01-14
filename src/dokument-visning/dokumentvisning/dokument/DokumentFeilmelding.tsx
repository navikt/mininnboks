import * as React from 'react';
import Feilmelding from '../../../feilmelding/Feilmelding';
import { Undertittel } from 'nav-frontend-typografi';

import './dokument-feilmelding.less';
import { ReactNode } from 'react';

interface Props {
    url: string;
    ekstrafeilinfo: { [key: string]: string };
    feilmelding: string;
}
type DokumentFeilTittel = { [key: string]: () => ReactNode };
type DokumentFeilTekst = { [key: string]: (extra: any) => ReactNode };

const dokumentFeilTittel: DokumentFeilTittel = {
    'feilmelding.dokumentikkefunnet.tittel': () => 'Dokument ikke funnet',
    'feilmelding.dokumentslettet.tittel': () =>
        'Du kan ikke se innholdet i dokumentet fordi det er slettet fra NAVs arkiv',
    'feilmelding.dokumentikketilgjengelig.tittel': () => 'Dokumentet ikke tilgjengelig',
    'feilmelding.sikkerhetsbegrensning.tittel': () => 'Sikkerhetsbegrensning',
    'feilmelding.journalfortfeil.tittel': () => 'Kan ikke vise dokumentet',
    'feilmelding.korruptpdf.tittel': () => 'Korrupt PDF',
    'feilmelding.teknisk.tittel': () => 'Teknisk feil',
    'feilmelding.manglermetadata.tittel': () => 'Teknisk feil',
    'feilmelding.journalfortannettema.tittel': () => 'Journalført annet tema'
};

const dokumentFeilTekst: DokumentFeilTekst = {
    'feilmelding.journalfortannettema.tekst': (extra: any) => (
        <>
            Dokumentet ligger på {extra.temanavn}. Gå til dokumentet på teamet
            <a
                href={`https://tjenester.nav.no/saksoversikt/app/dokument/${extra.journalpostId}/${extra.dokumentreferanse}`}
            >
                {extra.temanavn}
            </a>
        </>
    ),
    'feilmelding.ukjent': () => 'Det skjedde en uventet feil.',
    'feilmelding.dokumentikketilgjengelig.tekst': () => 'Dokumentet er ikke tilgjengelig. Vennligst prøv igjen senere.',
    'feilmelding.dokumentslettet.tekst': () => 'Vedlegget er slettet',
    'feilmelding.sikkerhetsbegrensning.tekst': () =>
        'NAV kan ikke vise deg dokumentet av tekniske årsaker. Vi fortsetter å utvikle denne løsningen slik at du skal få innsyn i flere dokumenter på Ditt NAV. Husk: sender du søknader/dokumenter elektronisk via nav.no, får du automatisk innsyn i dokumenter på Ditt NAV.',
    'feilmelding.manglermetadata.tekst': () => 'Kunne ikke hente ut metadata om dokumentet',
    'feilmelding.journalfortfeil.tekst': () => (
        <>
            NAV kan ikke vise deg dokumentet av tekniske årsaker. Vi fortsetter å utvikle denne løsningen slik at du
            skal få innsyn i flere dokumenter på Ditt NAV. Husk: sender du søknader/dokumenter elektronisk via
            <a href="https://www.nav.no">nav.no</a>, får du automatisk innsyn i dokumenter på Ditt NAV.
        </>
    ),
    'feilmelding.korruptpdf.tekst': () => 'Vi klarte ikke å vise PDF&apos;en.',
    'feilmelding.teknisk.tekst': () =>
        'Dokumentet er utilgjengelig for øyeblikket. Vennligst forsøk å åpne dokumentet igjen'
};

function DokumentFeilmelding(props: Props) {
    const feilmeldingTittel = dokumentFeilTittel[props.feilmelding.concat('.tittel')];
    const feilmeldingTekst = dokumentFeilTekst[props.feilmelding.concat('.tekst')];

    return (
        <div className="dokument-feilmelding feilmelding-container ">
            <img src={props.url} alt="" />
            <Feilmelding className="feilmelding">
                <Undertittel tag="h1">{feilmeldingTittel()}</Undertittel>
                <p>{feilmeldingTekst(props.ekstrafeilinfo)}</p>
            </Feilmelding>
        </div>
    );
}

export default DokumentFeilmelding;
