
export interface DokumentMetadata {
    bildeurler: string[],
    kanVises: boolean,
    tittel: string,
    ekstrafeilinfo: any,
    feilmelding: string;
}

export interface Dokument {
    dokumentmetadata: DokumentMetadata;
    journalpostmetadata: any;
    
}