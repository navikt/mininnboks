export interface Journalpost {
    journalpostId: string;
    tittel?: string;
    dato: string;
    retning: Retning;
    avsender?: AvsenderMottaker;
    mottaker?: AvsenderMottaker;
    tema?: string;
    dokumenter: Dokument[];
}

export interface Dokument {
    dokumentId: string;
    tittel: string | null;
    harTilgang: boolean;
}

export enum Retning {
    INN = 'INN',
    UT = 'UT',
    INTERN = 'INTERN'
}

export enum AvsenderMottaker {
    NAV = 'NAV',
    SLUTTBRUKER = 'SLUTTBRUKER',
    EKSTERN_PART = 'EKSTERN_PART',
    UKJENT = 'UKJENT'
}
