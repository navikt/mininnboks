
export interface DokumentMetadata {
    bildeurler: string[],
    kanVises: boolean,
    tittel: string,
    ekstrafeilinfo: any,
    feilmelding: string;
    dokumentreferanse: string;
}

export interface Dokument {
    dokumentmetadata: DokumentMetadata[];
    journalpostmetadata: Journalpostmetadata;
}

export interface Journalpostmetadata {
    retning: string,
    navn: string,
    avsender: string,
    mottaker: string,
    dato: string
    journalPostId: string
    resultat: {
        temakode: string;
        journalpostId: string;
    }
}

export interface Ekstrafeilinfo {
    tittel: string;
    korruptPdf: string;
}
