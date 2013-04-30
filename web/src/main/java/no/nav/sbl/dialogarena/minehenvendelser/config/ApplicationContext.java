package no.nav.sbl.dialogarena.minehenvendelser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

/**
 * Hovedkontekstfil for applikasjonen. Laster inn subkontekster for både default- og testprofil.
 */
@ComponentScan("no.nav.sbl.dialogarena.minehenvendelser.config")
@Configuration
public class ApplicationContext {

    @Bean
    public static PropertySourcesPlaceholderConfigurer placeholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    @Bean
    public WicketApplication minehenvendelserApplication() {
        return new WicketApplication();
    }

}
