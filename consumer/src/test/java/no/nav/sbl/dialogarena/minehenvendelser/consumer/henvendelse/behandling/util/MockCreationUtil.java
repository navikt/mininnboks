package no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.util;

import no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.domain.Dokumentforventning;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSBehandlingsstatus;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSBrukerBehandlingOppsummering;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSDokumentForventningOppsummering;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSDokumentForventningOppsummeringer;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSInnsendingsValg;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.FinnSakOgBehandlingskjedeListeResponse;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.Behandling;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.BehandlingVS;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.Behandlingstid;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.Behandlingstidtyper;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.finnsakogbehandlingskjedeliste.Behandlingskjede;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.finnsakogbehandlingskjedeliste.Sak;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.meldinger.HentBehandlingResponse;
import no.nav.tjeneste.virksomhet.sakogbehandling.v1.meldinger.HentBehandlingskjedensBehandlingerResponse;
import org.joda.time.DateTime;

import java.math.BigInteger;
import java.util.List;

import static no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSBrukerBehandlingType.DOKUMENT_BEHANDLING;
import static no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSBrukerBehandlingType.DOKUMENT_ETTERSENDING;
import static no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.informasjon.WSDokumentbehandlingType.SOKNADSINNSENDING;


public class MockCreationUtil {

    public static final String AKTOR_ID = "***REMOVED***";

    public static final String KODEVERK_ID_1 = "NAV 00-01.00";
    public static final String KODEVERK_ID_2 = "NAV 76-08.03";
    public static final String KODEVERK_ID_3 = "NAV 00-02.00";
    public static final String KODEVERK_ID_7 = "NAV 34-00.08";
    public static final String KODEVERK_ID_8 = "NAV 15-00.01";
    public static final String KODEVERK_ID_9 = "NAV 76-13.16";

    public static Dokumentforventning createDokumentforventning(boolean isHovedskjema, WSInnsendingsValg innsendingsValg) {
        WSDokumentForventningOppsummering wsDokumentForventning = new WSDokumentForventningOppsummering()
                .withHovedskjema(isHovedskjema)
                .withInnsendingsValg(innsendingsValg);
        return Dokumentforventning.transformToDokumentforventing(wsDokumentForventning);
    }

    public static WSDokumentForventningOppsummering createWSDokumentForventningMock(boolean hovedDok, String kodeverkId, WSInnsendingsValg innsendingsValg) {
        return new WSDokumentForventningOppsummering()
                .withKodeverkId(kodeverkId)
                .withInnsendingsValg(innsendingsValg)
                .withHovedskjema(hovedDok);
    }

    public static WSBrukerBehandlingOppsummering createWsBehandlingMock() {
        return createWsBehandlingMock(new DateTime(2013, 1, 2, 1, 1), new DateTime(2013, 1, 2, 1, 1), WSBehandlingsstatus.UNDER_ARBEID)
                .withDokumentForventningOppsummeringer(
                        new WSDokumentForventningOppsummeringer())
                .withHovedskjemaId("hovedSkjemaId");
    }

    public static WSBrukerBehandlingOppsummering createWsBehandlingMock(DateTime innsendtDato, DateTime sistEndret, WSBehandlingsstatus status, boolean ettersending) {
        return new WSBrukerBehandlingOppsummering()
                .withStatus(status)
                .withBehandlingsId("DA01-000-000-029")
                .withHovedskjemaId("hovedSkjemaId")
                .withInnsendtDato(innsendtDato)
                .withSistEndret(sistEndret)
                .withBrukerBehandlingType(ettersending ? DOKUMENT_ETTERSENDING : DOKUMENT_BEHANDLING)
                .withDokumentbehandlingType(SOKNADSINNSENDING)
                .withDokumentForventningOppsummeringer(new WSDokumentForventningOppsummeringer());
    }

    public static WSBrukerBehandlingOppsummering createWsBehandlingMock(DateTime innsendtDato, DateTime sistEndret, WSBehandlingsstatus status) {
        return createWsBehandlingMock(innsendtDato, sistEndret, status, false);
    }


    public static FinnSakOgBehandlingskjedeListeResponse createFinnSakOgBehandlingskjedeListeResponse(List<Behandlingskjede> behandlingskjede) {
        return new FinnSakOgBehandlingskjedeListeResponse()
                .withResponse(new no.nav.tjeneste.virksomhet.sakogbehandling.v1.meldinger.FinnSakOgBehandlingskjedeListeResponse()
                        .withSak(new Sak().withBehandlingskjede(behandlingskjede)));
    }

    public static Behandling createBehandling(BigInteger tid) {
        return new BehandlingVS()
                .withNormertBehandlingstid(new Behandlingstid().withTid(tid).withType(new Behandlingstidtyper().withValue("dager")));
    }

    public static HentBehandlingResponse createHentBehandlingResponse(BigInteger normertBehandlingstid) {
        return new HentBehandlingResponse()
                .withBehandling(createBehandling(normertBehandlingstid));
    }

    public static HentBehandlingskjedensBehandlingerResponse createHentBehandlingskjedensBehandlingerResponse(List<Behandling> behandlinger) {
        return new HentBehandlingskjedensBehandlingerResponse()
                .withBehandlingskjede(new no.nav.tjeneste.virksomhet.sakogbehandling.v1.informasjon.hentbehandlingskjedensbehandlinger.Behandlingskjede()
                        .withBehandling(behandlinger));
    }
}
