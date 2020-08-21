import {Temagruppe} from "./skriv-nytt-sporsmal/TemagruppeEkstraInfo";
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
    kanal: string,
    eksternAktor: string,
    brukersEnhet: string,
    tilknyttetEnhet: string,
    temagruppeNavn: string,
    statusTekst: string,
    kontorsperreEnhet: string,
    temaNavn: string,
    temaKode: string,
    korrelasjonsId: string,
    journalpostId: string,
    dokumentIdListe: string[],
    oppgaveType: string,
    oppgaveUrl: string,
    type: Meldingstype,
    temagruppe: Temagruppe
    opprettet: string,
    avsluttet: string,
    fraNav: boolean,
    fraBruker: boolean,
    kassert: boolean,
    erTilknyttetAnsatt: boolean,
    ferdigstiltUtenSvar: boolean,
    lestDato: string,
    lest: boolean
}