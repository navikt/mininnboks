package no.nav.sbl.dialogarena.minehenvendelser.components;

import no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.jaxb.Behandling;
import no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.jaxb.Dokumentforventning;
import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.PropertyListView;
import org.apache.wicket.markup.html.panel.Panel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.model.LoadableDetachableModel;

import java.util.List;

import static no.nav.modig.lang.collections.IterUtils.on;
import static no.nav.modig.lang.collections.PredicateUtils.equalTo;
import static no.nav.modig.lang.collections.PredicateUtils.where;
import static no.nav.sbl.dialogarena.minehenvendelser.consumer.henvendelse.behandling.jaxb.Dokumentforventning.STATUS_LASTET_OPP;
import static no.nav.sbl.dialogarena.minehenvendelser.consumer.util.CMSLookup.lookupText;

public class BehandlingPanel extends Panel {

    private static final boolean MANGLENDE = false;
    private static final boolean INNSENDT = true;
    private final IModel<List<Dokumentforventning>> model;
    private Behandling behandling;

    public BehandlingPanel(String id, IModel<List<Dokumentforventning>> model, Behandling behandling) {
        super(id, model);
        this.model = model;
        this.behandling = behandling;
        add(
                getDateText(),
                getVedleggsLabel(),
                getHeadText(),
                getTopText(),
                getInnsendteDokumenterHeader(),
                dokumenterView("innsendteDokumenter", INNSENDT),
                getManglendeDokumenterHeader(),
                dokumenterView("manglendeDokumenter", MANGLENDE),
                getBottomText()
        );
    }

    private Label getInnsendteDokumenterHeader() {
        return new Label("innsendteDokumenterHeader", lookupText("innsendtDokumenterHeader"));
    }

    private Label getManglendeDokumenterHeader() {
        return new Label("manglendeDokumenterHeader", lookupText("manglendeDokumenterHeader"));
    }

    private Label getVedleggsLabel() {
        return new Label("vedlegg", lookupText("vedleggantall") + behandling.getAntallInnsendteDokumenter());
    }

    private PropertyListView dokumenterView(String dokumentType, boolean statusToFilter) {
        IModel<List<Dokumentforventning>> dokumenterLDM = new DokumentforventningModel(model, statusToFilter);
        return new PropertyListView<Dokumentforventning>(dokumentType, dokumenterLDM) {
            @Override
            protected void populateItem(ListItem<Dokumentforventning> listItem) {
                Dokumentforventning dokumentforventning = listItem.getModelObject();
                listItem.add(new Label("dokument", dokumentforventning.getTittel()));
            }
        };
    }

    private Label getHeadText() {
        return new Label("tittel", behandling.getTittel());
    }

    private Label getTopText() {
        return new Label("forTekst", lookupText("topText"));
    }

    private Label getBottomText() {
        return new Label("etterTekst", lookupText("bottomText"));
    }

    private Label getDateText() {
        return new Label("innsendtDato", behandling.getInnsendtDato());
    }

    private static class DokumentforventningModel extends LoadableDetachableModel<List<Dokumentforventning>> {

        private IModel<List<Dokumentforventning>> parentModel;
        private boolean statusToFilter;

        public DokumentforventningModel(IModel<List<Dokumentforventning>> parentModel, boolean statusToFilter) {
            this.parentModel = parentModel;
            this.statusToFilter = statusToFilter;
        }

        @Override
        protected List<Dokumentforventning> load() {
            return on(parentModel.getObject()).filter(where(STATUS_LASTET_OPP, equalTo(statusToFilter))).collect();
        }

        @Override
        public void detach() {
            parentModel.detach();
        }
    }
}
