package no.nav.sbl.dialogarena.minehenvendelser.fitnesseobjects;

public class FitPaabegyntBehandling {

    public String navnPaaBehandling;
    public String datoOgTidspunkt;
    public String tekst;

    public FitPaabegyntBehandling() {
    }

    public FitPaabegyntBehandling(String tittel, String tekst, String sistEndret) {
        this.tekst = tekst.substring(13, 24);
        this.navnPaaBehandling = tittel;
        this.datoOgTidspunkt = sistEndret.substring(25,sistEndret.length());
    }
}
