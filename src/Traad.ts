import {Meldingstype} from "./meldingstype";

export interface Traad {
    traadId: string,
    meldinger: Melding[],
    nyeste: Melding,
    eldste: Melding,
    kanBesvares: boolean,
    avsluttet: boolean
}

export interface Melding {
    id: string,
    traadId: string,
    fritekst: string,
    brukersEnhet: string,
    temagruppeNavn: string,
    statusTekst: string,
    kontorsperreEnhet: string,
    temaNavn: string,
    temaKode: string,
    korrelasjonsId: string,
    journalpostId: string,
    dokumentIdListe: string[],
    oppgaveUrl: string,
    type: Meldingstype,
    opprettet: string,
    avsluttet: string,
    fraNav: boolean,
    fraBruker: boolean,
    kassert: boolean,
    lest: boolean
}