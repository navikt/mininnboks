package no.nav.sbl.dialogarena.minehenvendelser.henvendelser.consumer;

import java.io.Serializable;
import org.joda.time.DateTime;

public class Melding implements Serializable {

//    public static class EtterOpprettetDato implements Comparator<Melding> {
//        @Override
//        public int compare(Melding first, Melding second) {
//            return first.opprettet.compareTo(second.opprettet);
//        }
//    }

    public String id, traadId, tema, overskrift, fritekst;
    public DateTime opprettet;
    public Meldingstype type;

    public Melding withId(String id) {
        this.id = id;
        return this;
    }

    public Melding withTraadId(String traadId) {
        this.traadId = traadId;
        return this;
    }

    public Melding withTema(String tema) {
        this.tema = tema;
        return this;
    }

    public Melding withOverskrift(String overskrift) {
        this.overskrift = overskrift;
        return this;
    }

    public Melding withFritekst(String fritekst) {
        this.fritekst = fritekst;
        return this;
    }

    public Melding withOpprettet(DateTime opprettet) {
        this.opprettet = opprettet;
        return this;
    }

    public Melding withType(Meldingstype type) {
        this.type = type;
        return this;
    }

}
