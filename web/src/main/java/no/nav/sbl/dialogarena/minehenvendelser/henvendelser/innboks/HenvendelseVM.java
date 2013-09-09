package no.nav.sbl.dialogarena.minehenvendelser.henvendelser.innboks;

import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.consumer.Henvendelse;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.consumer.Henvendelsetype;
import org.apache.commons.collections15.Transformer;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.model.IModel;
import org.joda.time.format.DateTimeFormat;

import java.io.Serializable;
import java.util.Comparator;
import java.util.Locale;

import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.consumer.Henvendelsetype.SPORSMAL;

public class HenvendelseVM implements Serializable {

    public final Henvendelse henvendelse;

    public HenvendelseVM(Henvendelse henvendelse) {
        this.henvendelse = henvendelse;
    }

    public String getAvsender() {
        return avType(SPORSMAL).getObject() ? "Ola Nordmann" : "Fra: NAV";
    }

    public String getOpprettetDato() {
        return formatertOpprettetDato("EEEEE dd.MM.yyyy").getObject();
    }

    public IModel<String> formatertOpprettetDato(final String format) {
        return new AbstractReadOnlyModel<String>() {
            @Override
            public String getObject() {
                return henvendelse.opprettet == null ? null :
                        DateTimeFormat.forPattern(format)
                                .withLocale(new Locale("nb"))
                                .print(henvendelse.opprettet);
            }
        };
    }

    public IModel<Boolean> avType(final Henvendelsetype type) {
        return new AbstractReadOnlyModel<Boolean>() {
            @Override
            public Boolean getObject() {
                return henvendelse.type == type;
            }
        };
    }

    public IModel<Boolean> erLest() {
        return new AbstractReadOnlyModel<Boolean>() {
            @Override
            public Boolean getObject() {
                return henvendelse.erLest();
            }
        };
    }

    public static final Transformer<Henvendelse, HenvendelseVM> TIL_HENVENDELSE_VM = new Transformer<Henvendelse, HenvendelseVM>() {
        @Override
        public HenvendelseVM transform(Henvendelse henvendelse) {
            return new HenvendelseVM(henvendelse);
        }
    };

    public static final Transformer<HenvendelseVM, String> TRAAD_ID = new Transformer<HenvendelseVM, String>() {
        @Override
        public String transform(HenvendelseVM henvendelseVM) {
            return henvendelseVM.henvendelse.traadId;
        }
    };

    public static final Comparator<HenvendelseVM> NYESTE_OVERST = new Comparator<HenvendelseVM>() {
        public int compare(HenvendelseVM m1, HenvendelseVM m2) {
            return m2.henvendelse.opprettet.compareTo(m1.henvendelse.opprettet);
        }
    };

}
