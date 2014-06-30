package no.nav.sbl.dialogarena.mininnboks.innboks;

import no.nav.modig.core.context.SubjectHandler;
import no.nav.sbl.dialogarena.mininnboks.BasePage;
import no.nav.sbl.dialogarena.mininnboks.consumer.HenvendelseService;
import no.nav.sbl.dialogarena.mininnboks.sporsmal.temagruppe.VelgTemagruppePage;
import org.apache.wicket.ajax.AjaxEventBehavior;
import org.apache.wicket.ajax.AjaxRequestTarget;
import org.apache.wicket.ajax.attributes.AjaxRequestAttributes;
import org.apache.wicket.ajax.markup.html.AjaxLink;
import org.apache.wicket.markup.head.IHeaderResponse;
import org.apache.wicket.markup.html.WebMarkupContainer;
import org.apache.wicket.markup.html.link.Link;
import org.apache.wicket.markup.html.list.ListItem;
import org.apache.wicket.markup.html.list.ListView;
import org.apache.wicket.model.AbstractReadOnlyModel;
import org.apache.wicket.model.CompoundPropertyModel;
import org.apache.wicket.model.IModel;
import org.apache.wicket.request.resource.JavaScriptResourceReference;

import javax.inject.Inject;
import java.util.List;

import static no.nav.modig.wicket.conditional.ConditionalUtils.hasCssClassIf;
import static no.nav.sbl.dialogarena.mininnboks.innboks.TraadVM.erLest;
import static no.nav.sbl.dialogarena.mininnboks.innboks.TraadVM.tilTraader;
import static org.apache.wicket.markup.head.JavaScriptHeaderItem.forReference;

public class Innboks extends BasePage {

    @Inject
    private HenvendelseService service;

    private final IModel<List<TraadVM>> traaderModel;

    public Innboks() {
        traaderModel = new CompoundPropertyModel<>(tilTraader(service.hentAlleHenvendelser(innloggetBruker())));

        add(new Link<Void>("skriv-ny") {
            @Override
            public void onClick() {
                setResponsePage(VelgTemagruppePage.class);
            }
        });

        add(new ListView<TraadVM>("traader", traaderModel) {
            @Override
            protected void populateItem(final ListItem<TraadVM> item) {
                final TraadVM traadVM = item.getModelObject();
                item.setOutputMarkupId(true);

                item.add(hasCssClassIf("lest", erLest(traadVM.henvendelser)));
                item.add(hasCssClassIf("closed", traadVM.lukket));

                item.add(new AjaxLink<Void>("flipp") {
                    @Override
                    public void onClick(AjaxRequestTarget target) {
                        traadClickBehaviour(item, target);
                    }
                });
                item.add(new AjaxEventBehavior("click") {
                    @Override
                    protected void onEvent(AjaxRequestTarget target) {
                        if (traadVM.lukket.getObject()) {
                            traadClickBehaviour(item, target);
                        }
                    }
                    @Override
                    protected void updateAjaxAttributes(AjaxRequestAttributes attributes) {
                        super.updateAjaxAttributes(attributes);
                        attributes.setAllowDefault(true);
                    }
                });
                item.add(new NyesteMeldingPanel("nyeste-melding", item.getModel()));
                item.add(new TidligereMeldingerPanel("tidligere-meldinger", item.getModel()));
            }
        });

        add(new WebMarkupContainer("tom-innboks").add(hasCssClassIf("ingen-meldinger", tomInnboksModel())));
    }

    private void traadClickBehaviour(ListItem<TraadVM> item, AjaxRequestTarget target) {
        TraadVM traadVM = item.getModelObject();
        if (!erLest(traadVM.henvendelser).getObject()) {
            traadVM.markerSomLest(service);
            target.appendJavaScript("Innboks.markerSomLest('" + item.getMarkupId() + "');");
        }
        traadVM.lukket.setObject(!traadVM.lukket.getObject());
        target.appendJavaScript("Innboks.toggleTraad('" + item.getMarkupId() + "');");
    }

    private IModel<Boolean> tomInnboksModel() {
        return new AbstractReadOnlyModel<Boolean>() {
            @Override
            public Boolean getObject() {
                return !traaderModel.getObject().isEmpty();
            }
        };
    }

    private static String innloggetBruker() {
        return SubjectHandler.getSubjectHandler().getUid();
    }

    @Override
    public void renderHead(IHeaderResponse response) {
        super.renderHead(response);
        response.render(forReference(new JavaScriptResourceReference(Innboks.class, "innboks.js")));
    }

    @Override
    protected void onBeforeRender() {
        traaderModel.setObject(tilTraader(service.hentAlleHenvendelser(innloggetBruker())));
        super.onBeforeRender();
    }
}
