package no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.domain;

import no.nav.tjeneste.virksomhet.henvendelse.v1.informasjon.WSDokumentForventningOppsummering;
import org.apache.commons.collections15.Transformer;

import java.io.Serializable;

import static no.nav.modig.lang.option.Optional.optional;
import static no.nav.sbl.dialogarena.minehenvendelser.consumer.util.KodeverkOppslag.hentKodeverk;
import static org.apache.commons.collections15.TransformerUtils.stringValueTransformer;

/**
 * Domeneobjekt som representerer en dokumentforventning
 */
public final class Dokumentforventning implements Serializable {

    public enum Innsendingsvalg {IKKE_VALGT, SEND_SENERE, LASTET_OPP, SEND_I_POST, SENDES_AV_ANDRE, SENDES_IKKE};

    private String kodeverkId;
    private Innsendingsvalg innsendingsvalg;
    private boolean hovedskjema;
    private String friTekst;

    private Dokumentforventning() { }

    private static Transformer<WSDokumentForventningOppsummering, Dokumentforventning> dokumentforventningTransformer = new Transformer<WSDokumentForventningOppsummering, Dokumentforventning>() {

        @Override
        public Dokumentforventning transform(WSDokumentForventningOppsummering wsDokumentForventningOppsummering) {
            Dokumentforventning dokumentforventning = new Dokumentforventning();
            dokumentforventning.friTekst = optional(wsDokumentForventningOppsummering.getFriTekst()).map(stringValueTransformer()).getOrElse(null);
            dokumentforventning.kodeverkId = wsDokumentForventningOppsummering.getKodeverkId();
            dokumentforventning.hovedskjema =  wsDokumentForventningOppsummering.isHovedskjema();
            dokumentforventning.innsendingsvalg = Innsendingsvalg.valueOf(wsDokumentForventningOppsummering.getInnsendingsValg().value());
            return dokumentforventning;
        }

    };

    public static Dokumentforventning transformToDokumentforventing(WSDokumentForventningOppsummering wsDokumentForventningOppsummering) {
        return dokumentforventningTransformer.transform(wsDokumentForventningOppsummering);
    }

    public String getKodeverkId() {
        return kodeverkId;
    }

    public Innsendingsvalg getInnsendingsvalg() {
        return innsendingsvalg;
    }

    public boolean isHovedskjema() {
        return hovedskjema;
    }

    public String getFriTekst() {
        return friTekst;
    }

    public boolean isLastetOpp() {
        return Innsendingsvalg.LASTET_OPP.equals(innsendingsvalg);
    }

    public String getTittel() {
        return hentKodeverk(getKodeverkId());
    }

    public static final Transformer<Dokumentforventning, Boolean> STATUS_LASTET_OPP = new Transformer<Dokumentforventning, Boolean>() {
        @Override
        public Boolean transform(Dokumentforventning dokumentforventning) {
            return dokumentforventning.isLastetOpp();
        }
    };

    public static final Transformer<Dokumentforventning, Boolean> HOVEDSKJEMA = new Transformer<Dokumentforventning, Boolean>() {
        @Override
        public Boolean transform(Dokumentforventning dokumentforventning) {
            return dokumentforventning.isHovedskjema();
        }
    };

}
