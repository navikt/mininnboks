import * as React from 'react';
import {useParams} from "react-router";
import {useDispatch} from "react-redux";
import useFetch, {hasError, isPending} from "@nutgaard/use-fetch";
import {useAppState, useOnMount, useScrollToTop} from "../../utils/custom-hooks";
import {useBreadcrumbs} from "../../brodsmuler/Brodsmuler";
import { getTraaderSafe, markerBehandlingsIdSomLest } from "../../ducks/traader";
import Feilmelding from "../../feilmelding/Feilmelding";
import Spinner from "../../utils/Spinner";
import Lenke from "nav-frontend-lenker";
import {getNAVBaseUrl} from "../../environment";
import {Melding} from "../../Traad";
import JournalpostInfo from "./JournalpostInfo";
import {Dokumenter} from "./domain";
import Dokument from "./Dokument";

const sendNyMeldingURL = `${getNAVBaseUrl()}/person/kontakt-oss/skriv-til-oss`;

function lagDokumentUrl(melding: Melding | undefined): string {
    if (!melding) {
        return '';
    }
    const dokumentIdQueryParam = melding.dokumentIdListe
        .map((id) => `dokumentId=${id}`)
        .join('&');
    return `/mininnboks-api/dokument/${melding.journalpostId}?${dokumentIdQueryParam}`;
}

function DokumentVarselVisningSide() {
    useScrollToTop();
    const params = useParams<{ id: string }>();
    useBreadcrumbs([{ title: 'Dokumentvisning', url: `/dokument/${params.id}` }]);
    const dispatch = useDispatch();
    const traaderResource = useAppState((state) => state.traader);
    const dokumentVarsel: Melding | undefined = getTraaderSafe(traaderResource)
        .find((trad) => trad.traadId === params.id)
        ?.meldinger
        ?.at(0);

    const dokumentDataResource = useFetch<Dokumenter>(lagDokumentUrl(dokumentVarsel), {}, { lazy: true });

    useOnMount(() => {
        const varselErLest = dokumentVarsel?.lest ?? false;
        if (!varselErLest) {
            dispatch(markerBehandlingsIdSomLest(params.id))
        }
        if (dokumentVarsel) {
            dokumentDataResource.rerun();
        }
    });

    if (!dokumentVarsel) {
        return <Feilmelding>Fant ikke dokument</Feilmelding>
    }
    if (hasError(dokumentDataResource)) {
        return <Feilmelding>Kunne ikke hente informasjon om dokumentet</Feilmelding>
    } else if (isPending(dokumentDataResource)) {
        return <Spinner />
    }
    const dokumentVarselData = dokumentDataResource.data
    const antallDokumenter = dokumentVarselData.dokumentMetadata.length;
    const dokumenter = dokumentVarselData.dokumentMetadata.map((dokument) => (
        <Dokument
            dokument={dokument}
            journalpostMetadata={dokumentVarselData.journalpostMetadata}
            inlinePdf={antallDokumenter === 1}
        />
    ));

    return (
        <div className="dokinnsyn">
            <section className="dokumentvisning-header blokk-m">
                <JournalpostInfo journalpostmetadata={dokumentVarselData.journalpostMetadata}/>
                <ul className="ustiled">
                    <li>
                        {/*TODO må ha riktig url til ny mine-saker løsning*/}
                        <Lenke href={`/minesaker/tema/${dokumentVarselData.tema}`}>Gå til "mine saker"</Lenke>
                    </li>
                    <li>
                        <Lenke href={sendNyMeldingURL} className="lenke">
                            Kontakt NAV om dokumentet
                        </Lenke>
                    </li>
                </ul>
            </section>
            <section className="dokumenter">
                <ul className="dokumentIdListe">
                    {dokumenter}
                </ul>
            </section>
        </div>
    );
}

export default DokumentVarselVisningSide;