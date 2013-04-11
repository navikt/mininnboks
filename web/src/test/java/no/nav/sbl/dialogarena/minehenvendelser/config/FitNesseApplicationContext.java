package no.nav.sbl.dialogarena.minehenvendelser.config;

import no.nav.modig.core.exception.ApplicationException;
import no.nav.sbl.dialogarena.common.jetty.Jetty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;

import static no.nav.sbl.dialogarena.common.jetty.Jetty.usingWar;

@Import(ApplicationContext.class)
@ActiveProfiles("test")
public class FitNesseApplicationContext {

    @Bean
    public void startJetty() {
        try {
            jetty().start();
        } catch (Exception e) {
            throw new ApplicationException("could not launch jetty because of a " + e.getClass() + ", details as follows: ", e);
        }
    }

    @Bean
    public Jetty jetty() {
        return usingWar(new File("location")).at("port").buildJetty();
    }

}
