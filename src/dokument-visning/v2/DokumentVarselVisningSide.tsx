import * as React from 'react';
import { useEffect } from "react";
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import useFetch, { hasData, hasError, isPending } from '@nutgaard/use-fetch';
import { useAppState, useScrollToTop } from '../../utils/custom-hooks';
import { useBreadcrumbs } from '../../brodsmuler/Brodsmuler';
import { getTraaderSafe, markerBehandlingsIdSomLest } from '../../ducks/traader';
import Feilmelding from '../../feilmelding/Feilmelding';
import Spinner from '../../utils/Spinner';
import Lenke from 'nav-frontend-lenker';
import { getNAVBaseUrl, getPersonNAVBaseUrl } from '../../environment';
import { Melding } from '../../Traad';
import JournalpostInfo from './JournalpostInfo';
import { Journalpost } from './domain';
import Dokument from './Dokument';
import { urls as dokumentUrls } from './dokument-api';
import './dokument-varsel-visning-side.less';

const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;
const fetchOptions = {};

function lagJournalpostUrl(melding: Melding | undefined): string {
    if (!melding) {
        return '';
    }
    return dokumentUrls.journalpost(melding.journalpostId);
}

function DokumentVarselVisningSide() {
    useScrollToTop();
    const params = useParams<{ id: string }>();
    useBreadcrumbs([{ title: 'Dokumentvisning', url: `/dokument/${params.id}` }]);
    const dispatch = useDispatch();
    const traaderResource = useAppState((state) => state.traader);
    const dokumentVarsel: Melding | undefined = getTraaderSafe(traaderResource)
        .find((trad) => trad.traadId === params.id)
        ?.meldinger?.at(0);

    const journalpostResource = useFetch<Journalpost>(
        lagJournalpostUrl(dokumentVarsel),
        fetchOptions,
        { lazy: !dokumentVarsel}
    );
    useEffect(() => {
        if (dokumentVarsel && !dokumentVarsel.lest && hasData(journalpostResource)) {
            dispatch(markerBehandlingsIdSomLest(dokumentVarsel.id));
        }
    }, [dispatch, journalpostResource, dokumentVarsel])

    if (!dokumentVarsel) {
        return <Feilmelding>Fant ikke dokument</Feilmelding>;
    }
    if (hasError(journalpostResource)) {
        return <Feilmelding>Kunne ikke hente informasjon om dokumentet</Feilmelding>;
    } else if (isPending(journalpostResource)) {
        return <Spinner />;
    }

    const journalpost = journalpostResource.data;
    const mineSakerLenke = `${getPersonNAVBaseUrl()}/mine-saker/tema/${journalpost.tema}`;
    const dokumenter = journalpost.dokumenter.map((dokument) => (
        <Dokument key={dokument.dokumentId} journalpost={journalpost} dokument={dokument} />
    ));

    return (
        <div className="dokinnsyn dokinnsyn--v2">
            <section className="dokumentvisning-header blokk-m">
                <JournalpostInfo journalpost={journalpost} />
                <ul className="ustilet">
                    <li>
                        {/*TODO må ha riktig url til ny mine-saker løsning*/}
                        <Lenke href={mineSakerLenke}>Gå til Mine Saker</Lenke>
                    </li>
                    <li>
                        <Lenke href={sendNyMeldingURL} className="lenke">
                            Kontakt NAV om dokumentet
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className="dokumenter">
                <ul className="dokumentliste">{dokumenter}</ul>
            </section>
        </div>
    );
}

export default DokumentVarselVisningSide;
