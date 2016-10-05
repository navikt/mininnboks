package no.nav.sbl.dialogarena.mininnboks.provider.rest.ubehandletmelding;

import no.nav.sbl.dialogarena.mininnboks.consumer.domain.Henvendelse;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;
import java.util.function.Supplier;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static no.nav.sbl.dialogarena.mininnboks.consumer.domain.Henvendelse.NYESTE_OVERST;
import static no.nav.sbl.dialogarena.mininnboks.provider.rest.ubehandletmelding.UbehandletMelding.erUbesvart;
import static no.nav.sbl.dialogarena.mininnboks.provider.rest.ubehandletmelding.UbehandletMelding.erUlest;

public class UbehandletMeldingUtils {
    static Supplier<Set<Henvendelse>> supplier = () -> new TreeSet<>((h1, h2) -> h1.traadId.compareTo(h2.traadId));

    public static List<UbehandletMelding> hentUbehandledeMeldinger(List<Henvendelse> henvendelser) {

        return henvendelser
                .stream()
                .sorted(NYESTE_OVERST)
                .collect(Collectors.toCollection(supplier))
                .stream()
                .filter(erUbesvart.or(erUlest))
                .map(UbehandletMelding::new)
                .collect(toList());
    }
}