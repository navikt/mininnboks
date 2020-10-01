
export interface DokumentMetadata {
    bildeurler: string[],
    kanVises: boolean,
    tittel: string,
    ekstrafeilinfo: any,
    feilmelding: string;
    dokumentreferanse?: string;
}

export interface Dokument {
    dokumentmetadata: DokumentMetadata;
    journalpostmetadata: any;
    
}