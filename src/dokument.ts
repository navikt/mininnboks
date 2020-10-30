export interface DokumentMetadata {
    bildeurler: string[];
    kanVises: boolean;
    tittel: string;
    ekstrafeilinfo: { [key: string]: string };
    feilmelding: string;
    dokumentreferanse?: string;
}

export interface Dokument {
    dokumentmetadata: DokumentMetadata[];
    journalpostmetadata: Journalpostmetadata;
}

export interface Journalpostmetadata {
    retning: string;
    navn: string;
    avsender: string;
    mottaker: string;
    dato: string;
    journalpostId: string;
    resultat: {
        temakode: string;
        journalpostId: string;
    };
}
