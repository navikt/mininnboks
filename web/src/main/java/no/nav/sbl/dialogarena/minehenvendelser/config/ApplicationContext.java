package no.nav.sbl.dialogarena.minehenvendelser.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

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
