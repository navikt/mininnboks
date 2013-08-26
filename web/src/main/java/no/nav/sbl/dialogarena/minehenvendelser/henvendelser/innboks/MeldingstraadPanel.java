package no.nav.sbl.dialogarena.minehenvendelser.henvendelser.innboks;

import org.apache.wicket.markup.html.basic.Label;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.PropertyListView;
import org.apache.wicket.markup.html.panel.Panel;

import static no.nav.modig.wicket.model.ModelUtils.both;
import static no.nav.modig.wicket.conditional.ConditionalUtils.visibleIf;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.consumer.Meldingstype.SVAR;

public class MeldingstraadPanel extends Panel {

    public MeldingstraadPanel(String id) {
        super(id);
        setOutputMarkupId(true);
        add(new Traad("traad"));
    }

    private static class Traad extends PropertyListView<MeldingVM> {

        public Traad(String id) {
            super(id);
            setOutputMarkupId(true);
        }

        @Override
        protected void populateItem(final ListItem<MeldingVM> item) {
            item.setOutputMarkupId(true);
            item.add(new MeldingsHeader("header"));
            item.add(new Label("melding.fritekst"));
            Label lestDato = new Label("lestDato");
            lestDato.add(visibleIf(both(item.getModelObject().avType(SVAR)).and(item.getModelObject().erLest())));
            item.add(lestDato);
        }
    }
}
