package no.nav.sbl.dialogarena.mininnboks.consumer;

import java.io.Serializable;
import java.util.Comparator;

import no.nav.sbl.dialogarena.mininnboks.sporsmal.tema.Tema;
import org.joda.time.DateTime;

public class Henvendelse implements Serializable {

    public Henvendelse(String id, Henvendelsetype type, String traadId) {
        this.id = id;
        this.type = type;
        this.traadId = traadId;
    }
    public final String id, traadId;
    public final Henvendelsetype type;
    public String fritekst;
    public Tema tema;
    public DateTime opprettet, lestDato;
    private boolean lest;

    public void markerSomLest() {
        setLest(true);
        lestDato = DateTime.now();
    }

    public void setLest(boolean lest) {
        this.lest = lest;
    }

    public boolean erLest() {
        return lest;
    }

    public static final Comparator<Henvendelse> NYESTE_OVERST = new Comparator<Henvendelse>() {
        public int compare(Henvendelse h1, Henvendelse h2) {
            return h2.opprettet.compareTo(h1.opprettet);
        }
    };
}