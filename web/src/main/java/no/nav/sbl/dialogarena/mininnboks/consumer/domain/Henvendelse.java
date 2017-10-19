package no.nav.sbl.dialogarena.mininnboks.consumer.domain;

import org.joda.time.DateTime;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import static java.util.Collections.reverseOrder;

public class Henvendelse implements Serializable {

    public String id;
    public String traadId, fritekst, kanal, eksternAktor, brukersEnhet, tilknyttetEnhet,
            temagruppeNavn, statusTekst, kontorsperreEnhet, temaNavn, temaKode, korrelasjonsId, journalpostId;
    public List<String> dokumentIdListe = new ArrayList<>();
    public String oppgaveType;
    public String oppgaveUrl;
    public Henvendelsetype type;
    public Temagruppe temagruppe;
    public DateTime opprettet, avsluttet;
    public Boolean fraNav, fraBruker, kassert = false, erTilknyttetAnsatt, ferdigstiltUtenSvar;
    private DateTime lestDato;

    public Henvendelse(String id) {
        this.id = id;
    }

    public Henvendelse(String fritekst, Temagruppe temagruppe) {
        this.fritekst = fritekst;
        this.temagruppe = temagruppe;
    }

    public Henvendelse withTraadId(String traadId) {
        this.traadId = traadId;
        return this;
    }

    public Henvendelse withType(Henvendelsetype type) {
        this.type = type;
        return this;
    }

    public Henvendelse withOpprettetTid(DateTime opprettetTid) {
        this.opprettet = opprettetTid;
        return this;
    }

    public void markerSomLest(DateTime lestDato) {
        this.lestDato = lestDato;
    }

    public void markerSomLest() {
        this.lestDato = DateTime.now();
    }

    public DateTime getLestDato() {
        return lestDato;
    }

    public boolean isLest() {
        return lestDato != null;
    }

    public static final Comparator<Henvendelse> NYESTE_OVERST = reverseOrder(Comparator.comparing(henvendelse -> henvendelse.opprettet));

    public Henvendelse withTemaNavn(String temaNavn) {
        this.temaNavn = temaNavn;
        return this;
    }

}
