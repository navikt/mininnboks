package no.nav.sbl.dialogarena.minehenvendelser.config;


import no.nav.sbl.dialogarena.minehenvendelser.AktoerIdDummy;
import no.nav.sbl.dialogarena.minehenvendelser.AktoerIdService;
import no.nav.sbl.dialogarena.minehenvendelser.consumer.KodeverkOppslag;
import no.nav.sbl.dialogarena.minehenvendelser.consumer.context.ConsumerTestContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.Profile;
import org.springframework.context.annotation.PropertySource;

@Profile("test")
@Configuration
@Import(ConsumerTestContext.class)
@PropertySource("classpath:environment-test.properties")
public class TestApplicationContext {

    @Bean
    public KodeverkOppslag kodeverkOppslag() {
        return new KodeverkOppslag();
    }

    @Bean
    public AktoerIdService aktoerIdService() {
        return new AktoerIdDummy();
    }

}
