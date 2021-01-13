export interface DokumentMetadata {
    bildeurler: string[];
    kanVises: boolean;
    ekstrafeilinfo: { [key: string]: string };
    feilmelding: string;
    dokumentreferanse?: string;
}

export interface Dokument {
    dokumentmetadata: DokumentMetadata[];
    journalpostmetadata: JournalpostMetadata;
}

export interface JournalpostMetadata {
    feilendeSystemer?: string[];
    resultat: {
        avsender: string;
        baksystem: string[];
        behandlingsId?: string;
        dato: string;
        erJournalfort: boolean;
        ettersending: boolean;
        feilWrapper: {
            feilmelding?: string;
            innholderFeil?: boolean;
        };
        hoveddokument: {
            kanVises: boolean;
            tittel: string;
            dokumentreferanse: string;
            logiskDokument: boolean;
        };
        journalpostId: string;
        kategoriNotat?: string;
        lenkeTilSoknad?: string;
        mottaker: string;
        navn: string;
        retning: string;
        temakode: string;
        temakodeVisning: string;
        tilhorebdeFagsakId?: string;
        tilhorendeSakId?: string;
        vedlegg: any[];
    };
}
