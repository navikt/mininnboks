package no.nav.sbl.dialogarena.minehenvendelser.security;

import no.nav.modig.core.context.SubjectHandler;

public class ModigSecurityBrukerkontekst implements Brukerkontekst {

    @Override
    public String getBrukerId() {
        return SubjectHandler.getSubjectHandler().getUid();
    }

}
