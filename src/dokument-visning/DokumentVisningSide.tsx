import * as React from 'react';
import { useDispatch } from 'react-redux';
import { getTraaderSafe, markerBehandlingsIdSomLest } from '../ducks/traader';
import { hentDokumentVisningData, settDokumentUrl } from '../ducks/dokumenter';
import Feilmelding from '../feilmelding/Feilmelding';
import Dokumentvisning from './DokumentVisning';
import LastNedPdfModal from './LastNedPdfModal';
import { useParams } from 'react-router';
import { useAppState, useOnMount } from '../utils/custom-hooks';
import { harFeil, laster } from '../avhengigheter';
import Spinner from '../utils/Spinner';
import Alertstripe from 'nav-frontend-alertstriper';

function DokumentVisningSide() {
    const params = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const traaderResource = useAppState((state) => state.traader);
    const dokumenter = useAppState((state) => state.dokumenter);
    const traader = getTraaderSafe(traaderResource);

    useOnMount(() => {
        const traad = traader.find((traad) => traad.traadId === params.id);
        if (traad && !traad.meldinger[0].lest) {
            dispatch(markerBehandlingsIdSomLest(params.id));
        }
        if (traad && traad.meldinger[0]) {
            const varsel = traad.meldinger[0];
            dispatch(hentDokumentVisningData(varsel.journalpostId, varsel.dokumentIdListe.join('-')));
        }
    });

    const onLastNedPdfClick = (url: string, event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(settDokumentUrl(url));
    };

    const onPrintPdfClick = (url: string, event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(settDokumentUrl(url));
    };

    const traad = traader.find((t) => t.traadId === params.id);
    if (!traad) {
        return <Feilmelding>Fant ikke dokumentet</Feilmelding>;
    }

    if (laster(dokumenter)) {
        return <Spinner />;
    } else if (harFeil(dokumenter)) {
        return <Alertstripe type="advarsel">Kunne ikke laste inn dokumentet.</Alertstripe>;
    }
    const dokumentmetadata = dokumenter.data.dokumentmetadata;
    const journalpostmetadata = dokumenter.data.journalpostmetadata;

    return (
        <>
            <LastNedPdfModal />
            <Dokumentvisning
                dokumentmetadata={dokumentmetadata}
                journalpostmetadata={journalpostmetadata}
                lastNedPdfOnClick={onLastNedPdfClick}
                printPdfOnClick={onPrintPdfClick}
            />
        </>
    );
}

export default DokumentVisningSide;
