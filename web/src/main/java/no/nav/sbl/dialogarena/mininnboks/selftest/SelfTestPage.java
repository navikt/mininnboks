package no.nav.sbl.dialogarena.mininnboks.selftest;

import no.nav.modig.wicket.selftest.SelfTestBase;
import no.nav.sbl.dialogarena.mininnboks.config.ContentConfig;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.innsynhenvendelse.InnsynHenvendelsePortType;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v1.sendinnhenvendelse.SendInnHenvendelsePortType;
import no.nav.tjeneste.domene.brukerdialog.henvendelse.v2.henvendelse.HenvendelsePortType;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.BrukerprofilPortType;
import org.apache.wicket.request.mapper.parameter.PageParameters;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;

import static java.lang.String.format;
import static java.lang.System.currentTimeMillis;
import static java.net.HttpURLConnection.HTTP_OK;

/**
 * Viser status for alle integrasjonspunkter
 */
public class SelfTestPage extends SelfTestBase {

    private static final Logger logger = LoggerFactory.getLogger(SelfTestPage.class);

    @Inject
    private ContentConfig contentConfig;

    @Inject
    private HenvendelsePortType henvendelse;

    @Inject
    private SendInnHenvendelsePortType sendInnHenvendelse;

    @Inject
    private InnsynHenvendelsePortType innsynHenvendelse;

    @Inject
    private BrukerprofilPortType brukerprofil;

    public SelfTestPage(PageParameters params) throws IOException {
        super("Mininnboks", params);
    }

    private AvhengighetStatus getCmsStatus() {
        long start = currentTimeMillis();
        int statusCode = 0;
        HttpURLConnection connection = null;
        try {
            connection = (HttpURLConnection) new URL(contentConfig.appresUrl()).openConnection();
            connection.setConnectTimeout(10000);
            statusCode = connection.getResponseCode();
        } catch (IOException e) {
            logger.warn("Cms not reachable on " + contentConfig.appresUrl());
        } finally {
            if (connection != null) {
                connection.disconnect();
            }
        }

        String status = HTTP_OK == statusCode ? SelfTestBase.STATUS_OK : SelfTestBase.STATUS_ERROR;
        return new AvhengighetStatus("ENONIC_CMS", status, currentTimeMillis() - start, format("URL: %s", contentConfig.appresUrl()));
    }

    private AvhengighetStatus getHenvendelseWSStatus() {
        long start = currentTimeMillis();
        String status = SelfTestBase.STATUS_ERROR;
        try {
            henvendelse.ping();
            status = SelfTestBase.STATUS_OK;
        } catch (Exception e) {
            logger.warn("<<<<<<Error Contacting Henvendelse WS: " + e.getMessage(), e);
        }
        return new AvhengighetStatus("HENVENDELSE_TJENESTE_PING", status, currentTimeMillis() - start);
    }

    private AvhengighetStatus getSendHenvendelseWSStatus() {
        long start = currentTimeMillis();
        String status = SelfTestBase.STATUS_ERROR;
        try {
            sendInnHenvendelse.ping();
            status = SelfTestBase.STATUS_OK;
        } catch (Exception e) {
            logger.warn("<<<<<<Error Contacting Sporsmalinnsending WS: " + e.getMessage(), e);
        }
        return new AvhengighetStatus("SEND_HENVENDELSE_TJENESTE_PING", status, currentTimeMillis() - start);
    }

    private AvhengighetStatus getInnsynHenvendelseWSStatus() {
        long start = currentTimeMillis();
        String status = SelfTestBase.STATUS_ERROR;
        try {
            innsynHenvendelse.ping();
            status = SelfTestBase.STATUS_OK;
        } catch (Exception e) {
            logger.warn("<<<<<<Error Contacting Sporsmalinnsending WS: " + e.getMessage(), e);
        }
        return new AvhengighetStatus("INNSYN_HENVENDELSE_TJENESTE_PING", status, currentTimeMillis() - start);
    }

    private AvhengighetStatus getBrukerprofilStatus() {
        long start = currentTimeMillis();
        String status = SelfTestBase.STATUS_ERROR;
        try {
            brukerprofil.ping();
            status = SelfTestBase.STATUS_OK;
        } catch (Exception e) {
            logger.warn("<<<<<<Error Contacting Brukerprofil WS: " + e.getMessage(), e);
        }
        return new AvhengighetStatus("BRUKERPROFIL_TJENESTE_PING", status, currentTimeMillis() - start);
    }

    @Override
    protected void addToStatusList(List<AvhengighetStatus> statusList) {
        statusList.add(getHenvendelseWSStatus());
        statusList.add(getSendHenvendelseWSStatus());
        statusList.add(getInnsynHenvendelseWSStatus());
        statusList.add(getCmsStatus());
        statusList.add(getBrukerprofilStatus());
    }

}