package no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer;


import no.nav.modig.core.exception.ApplicationException;
import no.nav.modig.lang.option.Optional;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.Person;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.adresse.Adresse;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.adresse.AdresseTransform;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.adresse.StrukturertAdresse;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.adresse.UstrukturertAdresse;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.common.UnableToHandleException;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.kontaktdetaljer.Preferanser;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.konto.UtenlandskKonto;
import no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.telefonnummer.Telefonnummer;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.BrukerprofilPortType;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.HentKontaktinformasjonOgPreferanserPersonIkkeFunnet;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.HentKontaktinformasjonOgPreferanserSikkerhetsbegrensning;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLBankkontoNorge;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLBankkontoUtland;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLBruker;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLEPost;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLElektroniskAdresse;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLElektroniskKommunikasjonskanal;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLMidlertidigPostadresse;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLMidlertidigPostadresseNorge;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLMidlertidigPostadresseUtland;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLPreferanser;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLStrukturertAdresse;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLTelefonnummer;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.informasjon.XMLUstrukturertAdresse;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.meldinger.XMLHentKontaktinformasjonOgPreferanserRequest;
import no.nav.tjeneste.virksomhet.brukerprofil.v1.meldinger.XMLHentKontaktinformasjonOgPreferanserResponse;

import java.util.List;

import static no.nav.modig.lang.collections.TransformerUtils.castTo;
import static no.nav.modig.lang.option.Optional.optional;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.adresse.AdresseTransform.medUtlopsdatoFra;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.GjeldendeAdresseKodeverk.somGjeldendeAdressetype;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform.Transform.castIfPossibleTo;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform.Transform.kodeverdi;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform.Transform.norskKontonummer;
import static no.nav.sbl.dialogarena.minehenvendelser.henvendelser.person.consumer.transform.Transform.utenlandskKonto;


public class HentBrukerprofilConsumer {

    private final BrukerprofilPortType webservice;

    public HentBrukerprofilConsumer(BrukerprofilPortType brukerprofilPortType) {
        webservice = brukerprofilPortType;
    }


    private static class Kanaler {
        String epost;
        Telefonnummer hjemmetelefon, jobbtelefon, mobil;
    }

    public Person hentPerson(String ident) {
        XMLHentKontaktinformasjonOgPreferanserResponse response;
        try {
            response = webservice.hentKontaktinformasjonOgPreferanser(new XMLHentKontaktinformasjonOgPreferanserRequest().withIdent(ident));
        } catch (HentKontaktinformasjonOgPreferanserSikkerhetsbegrensning | HentKontaktinformasjonOgPreferanserPersonIkkeFunnet e) {
            throw new ApplicationException("Person med id '" + ident + "': " + e.getMessage(), e);
        }

        XMLBruker soapBruker = (XMLBruker) response.getPerson();

        Person person = new Person(soapBruker.getPersonnavn().getSammensattNavn(), ident, getFolkeregistrertAdresse(soapBruker));

        XMLMidlertidigPostadresse midlertidigPostadresse = soapBruker.getMidlertidigPostadresse();
        if (midlertidigPostadresse instanceof XMLMidlertidigPostadresseNorge) {
            person.setNorskMidlertidig(getNorskMidlertidigAdresse((XMLMidlertidigPostadresseNorge) midlertidigPostadresse));
        } else if (midlertidigPostadresse instanceof XMLMidlertidigPostadresseUtland) {
            person.setUtenlandskMidlertidig(getUtenlandsMidlertidigAdresse((XMLMidlertidigPostadresseUtland) midlertidigPostadresse));
        }
        person.velg(somGjeldendeAdressetype(soapBruker.getGjeldendePostadresseType()));

        Kanaler kanaler = finnElektroniskeKanaler(soapBruker);
        person.setMobilnummer(kanaler.mobil);
        person.setHjemmetelefonnummer(kanaler.hjemmetelefon);
        person.setJobbtelefonnummer(kanaler.jobbtelefon);
        person.setEpost(kanaler.epost);

        for (String kontonummer : optional(soapBruker.getBankkonto()).map(castIfPossibleTo(XMLBankkontoNorge.class)).map(norskKontonummer())) {
            person.setKontonummer(kontonummer);
        }
        for (UtenlandskKonto utenlandskKonto : optional(soapBruker.getBankkonto()).map(castIfPossibleTo(XMLBankkontoUtland.class)).map(utenlandskKonto())) {
            person.setBankkontoUtland(utenlandskKonto);
        }

        setPreferanser(person, soapBruker.getPreferanser());

        return person;
    }

    private void setPreferanser(Person person, XMLPreferanser xmlPreferanser) {
        Preferanser preferanser = new Preferanser();
        preferanser.setElektroniskSamtykke(xmlPreferanser.isElektroniskKorrespondanse());
        preferanser.getMaalform().setKodeverkRef(xmlPreferanser.getMaalform().getKodeverksRef());
        person.setPreferanser(preferanser);
    }

    private Kanaler finnElektroniskeKanaler(XMLBruker soapPerson) {
        Kanaler kanaler = new Kanaler();

        List<XMLElektroniskKommunikasjonskanal> elkanaler = soapPerson.getElektroniskKommunikasjonskanal();
        for (XMLElektroniskKommunikasjonskanal kanal : elkanaler) {
            XMLElektroniskAdresse adr = kanal.getElektroniskAdresse();
            if (adr instanceof XMLTelefonnummer) {
                extract((XMLTelefonnummer) adr, kanaler);
            } else if (adr instanceof XMLEPost) {
                kanaler.epost = ((XMLEPost) adr).getIdentifikator();
            }
        }
        return kanaler;
    }

    private void extract(XMLTelefonnummer xnr, Kanaler numre) {
        Telefonnummer nr = new Telefonnummer(optional(xnr.getRetningsnummer()).map(kodeverdi()).getOrElse(null), xnr.getIdentifikator());
        String type = optional(xnr.getType()).map(kodeverdi()).getOrElse(null);
        switch (type) {
            case "MOBI":
                numre.mobil = nr;
                break;
            case "HJET":
                numre.hjemmetelefon = nr;
                break;
            case "ARBT":
                numre.jobbtelefon = nr;
                break;
            case "FAKS":
                break;
            default:
                throw new UnableToHandleException(type);
        }
    }

    private UstrukturertAdresse getUtenlandsMidlertidigAdresse(XMLMidlertidigPostadresseUtland xmlUtenlandskAdresse) {
        return optional(xmlUtenlandskAdresse).map(AdresseTransform.USTRUKTURERT_UTENLANDSK_ADRESSE).map(AdresseTransform.TO_ADRESSE).map(medUtlopsdatoFra(xmlUtenlandskAdresse)).map(castTo(UstrukturertAdresse.class)).getOrElse(null);
    }

    private StrukturertAdresse getNorskMidlertidigAdresse(XMLMidlertidigPostadresseNorge xmlAdresse) {
        return optional(xmlAdresse).map(AdresseTransform.STRUKTURERT_MIDLERTIDIG_ADRESSE).map(AdresseTransform.TO_ADRESSE).map(medUtlopsdatoFra(xmlAdresse)).map(castTo(StrukturertAdresse.class)).getOrElse(null);
    }

    private Optional<Adresse> getFolkeregistrertAdresse(XMLBruker soapBruker) {
        Optional<XMLUstrukturertAdresse> postadresse = optional(soapBruker.getPostadresse()).map(AdresseTransform.USTRUKTURERT_POSTADRESSE);
        Optional<XMLStrukturertAdresse> bostedsadresse = optional(soapBruker.getBostedsadresse()).map(AdresseTransform.STRUKTURERT_BOSTEDSADRESSE);
        return (postadresse.isSome() ? postadresse : bostedsadresse).map(AdresseTransform.TO_ADRESSE);
    }


    public void ping() {
        webservice.ping();
    }

}
