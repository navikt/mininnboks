package no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.domain;

import org.junit.Before;
import org.junit.Test;
import org.mockito.internal.util.reflection.Whitebox;

import java.util.List;

import static no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.domain.Behandling.transformToBehandling;
import static no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.util.MockCreationUtil.createMock;
import static org.hamcrest.core.Is.is;
import static org.hamcrest.core.IsEqual.equalTo;
import static org.junit.Assert.assertThat;
import static org.mockito.Mockito.when;

public class BehandlingTest {

    private static final boolean IS_INNSENDT = true;
    private static final boolean NOT_INNSENDT = false;
    private static final boolean IS_HOVEDSKJEMA = true;
    private static final boolean NOT_HOVEDSKJEMA = false;

    private Behandling behandling;

    @Before
    public void setup() {
        behandling = transformToBehandling(null);
    }

    @Test
    public void shouldCountCorrectAmountOfInnsendteDokumenter() {
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(IS_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.getAntallInnsendteDokumenter(), is(2));
    }

    @Test
    public void shouldCountCorrectAmountOfDokumenter() {
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        behandling.getDokumentforventninger().add(createMock(IS_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.getAntallSubDokumenter(), is(3));
    }

    @Test
    public void filterDokumenterShouldReturnAllInsendteDokumenterWhichAreNotHovedskjema() {
        List<Dokumentforventning> dokumentforventningList = behandling.getDokumentforventninger();
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.fetchInnsendteDokumenter().size(), equalTo(2));
    }

    @Test
    public void filterDokumenterShouldReturnAlleDokumenterWhichAreNotHovedskjema() {
        List<Dokumentforventning> dokumentforventningList = behandling.getDokumentforventninger();
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.fetchAlleDokumenter().size(), equalTo(3));
    }

    @Test
    public void filterDokumenterShouldReturnAlleDokumenterWhichAreHovedskjema() {
        List<Dokumentforventning> dokumentforventningList = behandling.getDokumentforventninger();
        Dokumentforventning dokumentforventning = createMock(IS_HOVEDSKJEMA, IS_INNSENDT);
        dokumentforventningList.add(dokumentforventning);
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.fetchHoveddokument(), equalTo(dokumentforventning));
    }

    @Test
    public void filterDokumenterShouldReturnAlleDokumenter() {
        List<Dokumentforventning> dokumentforventningList = behandling.getDokumentforventninger();
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(IS_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.getDokumentforventninger().size(), equalTo(5));
    }

    @Test
    public void getTittelShouldReturnKodeverkIdFromHovedskjema() {
        List<Dokumentforventning> dokumentforventningList = behandling.getDokumentforventninger();
        Dokumentforventning hovedSkjema = createMock(IS_HOVEDSKJEMA, IS_INNSENDT);
        when(hovedSkjema.getKodeverkId()).thenReturn("kodeverkId");
        dokumentforventningList.add(hovedSkjema);
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, IS_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));
        dokumentforventningList.add(createMock(NOT_HOVEDSKJEMA, NOT_INNSENDT));

        assertThat(behandling.getTittel(), equalTo("KodeverkData kodeverkId"));
    }

    @Test
    public void statusTransformerWorks() {
        Whitebox.setInternalState(behandling,"status", Behandling.Behandlingsstatus.FERDIG);
        assertThat(Behandling.STATUS.transform(behandling), equalTo(Behandling.Behandlingsstatus.FERDIG));
    }

}
