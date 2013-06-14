package no.nav.sbl.dialogarena.minehenvendelser.config;

import no.nav.modig.frontend.FrontendConfigurator;
import no.nav.modig.wicket.configuration.ApplicationSettingsConfig;
import no.nav.sbl.dialogarena.minehenvendelser.pages.HomePage;
import no.nav.sbl.dialogarena.minehenvendelser.selftest.SelfTestPage;
import org.apache.wicket.Application;
import org.apache.wicket.Page;
import org.apache.wicket.protocol.http.WebApplication;
import org.apache.wicket.spring.injection.annot.SpringComponentInjector;
import org.springframework.context.ApplicationContext;

import javax.inject.Inject;

import static no.nav.modig.frontend.FrontendModules.EKSTERNFLATE;
import static no.nav.modig.frontend.FrontendModules.UNDERSCORE;
import static no.nav.modig.frontend.MetaTag.CHARSET_UTF8;
import static no.nav.modig.frontend.MetaTag.VIEWPORT_SCALE_1;
import static no.nav.modig.frontend.MetaTag.XUA_IE_EDGE;
import static no.nav.sbl.dialogarena.minehenvendelser.BasePage.CSS_RESOURCE;
import static no.nav.sbl.dialogarena.minehenvendelser.BasePage.JS_RESOURCE;
import static no.nav.sbl.dialogarena.webkomponent.tilbakemelding.web.TilbakemeldingContainer.TILBAKEMELDING_JS;
import static no.nav.sbl.dialogarena.webkomponent.tilbakemelding.web.TilbakemeldingContainer.TILBAKEMELDING_LESS;

/**
 * Kontekst for wicket
 */
public class WicketApplication extends WebApplication {

    @Inject
    private ApplicationContext applicationContext;

    public static WicketApplication get() {
        return (WicketApplication) Application.get();
    }

    @Override
    public Class<? extends Page> getHomePage() {
        return HomePage.class;
    }

    @Override
    protected void init() {
        super.init();
        new FrontendConfigurator()
                .withModules(
                        EKSTERNFLATE,
                        UNDERSCORE)
                .addMetas(
                        CHARSET_UTF8,
                        VIEWPORT_SCALE_1,
                        XUA_IE_EDGE)
                .addCss(CSS_RESOURCE)
                .addLess(TILBAKEMELDING_LESS)
                .addScripts(JS_RESOURCE, TILBAKEMELDING_JS)
                .withResourcePacking(this.usesDeploymentConfig())
                .configure(this);
        new ApplicationSettingsConfig().configure(this);

        mountPage("internal/selftest", SelfTestPage.class);
        Application.get().getRequestLoggerSettings().setRequestLoggerEnabled(true);
        setSpringComponentInjector();

    }

    protected void setSpringComponentInjector() {
        getComponentInstantiationListeners().add(new SpringComponentInjector(this, applicationContext));
    }

    public ApplicationContext getApplicationContext() {
        return applicationContext;
    }

}
