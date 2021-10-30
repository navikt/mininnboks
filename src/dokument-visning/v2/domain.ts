export interface Dokumenter {
    tema: string;
    journalpostMetadata: JournalpostMetadata;
    dokumentMetadata: DokumentMetadata[];
}

export interface DokumentMetadata {
    tittel: string;
}

export interface JournalpostMetadata {
    dato: string;
    navn: string;
    retning: string;
    avsender: string;
    mottaker: string;
}