package no.nav.sbl.dialogarena.mininnboks.provider.rest.resources;

import no.nav.modig.content.PropertyResolver;
import no.nav.sbl.dialogarena.mininnboks.consumer.EpostService;

import javax.inject.Inject;
import javax.inject.Named;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static javax.ws.rs.core.MediaType.APPLICATION_JSON;

@Path("/resources")
@Produces(APPLICATION_JSON)
public class ResourcesController {

    @Inject
    private EpostService epostService;
    @Inject
    private PropertyResolver propertyResolver;
    @Inject
    @Named("keys")
    private List<String> keys;

    @GET
    public Map<String, String> getResources() {
        Map<String, String> resources = new HashMap<>();
        resources.put("skriv.ny.link", System.getProperty("temavelger.link.url"));
        resources.put("brukerprofil.link", System.getProperty("brukerprofil.link.url"));
        resources.put("bruker.epost", epost());
        for (String key : keys) {
            resources.put(key, propertyResolver.getProperty(key));
        }
        return resources;
    }

    private String epost() {
        try {
            return epostService.hentEpostadresse();
        } catch (Exception e) {
            return "";
        }
    }

}