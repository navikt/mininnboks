import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { FOLKREGISTRERT_ADRESSE_PATH, RESOURCES_PATH, TRAADER_PATH } from '../utils/api';
import traader from './traader.json';
import resources from './resources.json';
import { dokumentMock } from './dokument-mock';
import fetchDekoratorHtml from './dekorator/fetchDekoratorHtml';
import { AvsenderMottaker, Journalpost, Retning } from '../dokument-visning/v2/domain';
import { Adresse } from '../skriv-nytt-sporsmal/geografisk-tilknytning/AdresseUtils';

console.log('==========================');
console.log('======== MED MOCK ========');
console.log('==========================');
(window as any).setBreadcrumbs = setBreadcrumbs;
(async () => {
    const { scripts, styles, header, footer } = await fetchDekoratorHtml();
    scripts.forEach((child) => document.body.append(child));
    styles.forEach((child) => document.head.append(child));
    header.reverse().forEach((child) => document.body.prepend(child));
    footer.forEach((child) => document.body.append(child));
})();

type ToggleMap = { [key: string]: boolean };
const stengtSTO = false;
const brukerSalesforceDialoger = false;
const featureToggles: ToggleMap = {
    'modia.innboks.steng-sto': stengtSTO,
    'modia.innboks.bruker-salesforce-dialoger': brukerSalesforceDialoger,
    'modia.innboks.saf-saker': true,
    'modia.innboks.oksos-adressesok': true
};

const fetchMock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.01),
        MiddlewareUtils.loggingMiddleware()
    )
});

fetchMock.get(TRAADER_PATH, (req, res, ctx) => {
    const traderSf = traader.filter((trad) =>
        trad.meldinger.every((melding: any) => ['DOKUMENT_VARSEL', 'OPPGAVE_VARSEL'].includes(melding.type))
    );
    return res(ctx.json(brukerSalesforceDialoger ? traderSf : traader));
});
fetchMock.get(RESOURCES_PATH, (req, res, ctx) => res(ctx.json(resources)));
fetchMock.get('/mininnboks-api/tilgang/oksos', (req, res, ctx) =>
    res(ctx.json({ resultat: 'OK', melding: 'Kunne ikke hente data fra pdl-api' }))
);
fetchMock.post('/mininnboks-api/traader/svar', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/sporsmal', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/lest/:id', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/allelest/:id', (req, res, ctx) => res(ctx.json({})));

fetchMock.get(FOLKREGISTRERT_ADRESSE_PATH, (req, res, ctx) => {
    return res(
        ctx.delay(1000),
        ctx.json({
            adresse: 'Folkegata',
            tilleggsnavn: 'H0001 Lillo',
            husnummer: '3',
            husbokstav: 'A',
            kommunenummer: '4321',
            kommunenavn: 'Furtil',
            postnummer: '1234',
            poststed: 'Ossen',
            geografiskTilknytning: '010101',
            gatekode: null,
            bydel: null,
            type: 'VEGADRESSE'
        })
    );
});

fetchMock.get('/sosialhjelp-soknad-api/sosialhjelp/soknad-api/informasjon/adressesok', (req, res, ctx) => {
    const forslag: Array<Adresse> = [
        {
            adresse: 'Kirkegata',
            tilleggsnavn: null,
            husnummer: '12',
            husbokstav: 'B',
            kommunenummer: '4321',
            kommunenavn: 'TURITULL',
            postnummer: '1234',
            poststed: 'Åsen',
            geografiskTilknytning: '010101',
            gatekode: null,
            bydel: null,
            type: null
        },
        {
            adresse: 'Prostegata',
            tilleggsnavn: null,
            husnummer: '14',
            husbokstav: 'A',
            kommunenummer: '4322',
            kommunenavn: 'Morokuln',
            postnummer: '1238',
            poststed: 'Åsane',
            geografiskTilknytning: null,
            gatekode: null,
            bydel: null,
            type: null
        }
    ];
    return res(ctx.delay(1000), ctx.json(forslag));
});

const journalposter: Journalpost[] = [
    {
        journalpostId: '410959806',
        tittel: 'Søknad om dagpenger (ikke permittert)',
        dato: '2021-11-03T18:25:46.061Z',
        retning: Retning.INN,
        tema: 'DAG',
        avsender: AvsenderMottaker.SLUTTBRUKER,
        mottaker: AvsenderMottaker.NAV,
        dokumenter: [
            {
                dokumentId: '419361302',
                tittel: 'Søknad om dagpenger (ikke permittert)',
                harTilgang: false
            },
            {
                dokumentId: '419361303',
                tittel: 'Kvitteringsside for dokumentinnsending',
                harTilgang: true
            }
        ]
    },
    {
        journalpostId: '410959805',
        tittel: 'Samtale med NAV',
        dato: '2021-11-03T18:25:46.061Z',
        retning: Retning.UT,
        avsender: AvsenderMottaker.NAV,
        mottaker: AvsenderMottaker.SLUTTBRUKER,
        tema: 'AAP',
        dokumenter: [
            {
                dokumentId: '419361301',
                tittel: 'Samtale med NAV',
                harTilgang: true
            }
        ]
    }
];

fetchMock.get('/mininnboks-api/dokument/:journalpostId', (req, res, ctx) => {
    const journalpostId = req.pathParams.journalpostId;
    const journalpost = journalposter.find((it) => it.journalpostId === journalpostId);
    if (!journalpost) {
        return res(ctx.status(404));
    } else {
        return res(ctx.json(journalpost));
    }
});

// Blir kun brukt om man disabler mock-pdf i mockable.pdf-url.ts
fetchMock.get('/mininnboks-api/dokument/:journalpostId/:dokumentId', (req, res, ctx) => {
    const journalpostId = req.pathParams.journalpostId;
    const dokumentId = req.pathParams.dokumentId;
    const journalpost = journalposter.find((it) => it.journalpostId === journalpostId);
    const dokument = journalpost?.dokumenter?.find((it) => it.dokumentId === dokumentId);
    if (!dokument) {
        return res(ctx.status(404));
    } else if (!dokument.harTilgang) {
        return res(ctx.status(401));
    } else {
        return res(ctx.json(journalpost));
    }
});

fetchMock.get(
    '/saksoversikt-api/tjenester/dokumenter/dokumentmetadata/:journalpostId/:dokumentmetadata',
    (req, res, ctx) =>
        res(
            ctx.json({
                bildeurler: ['/img/Dummy_dokument.png'],
                kanVises: true,
                feilmelding: 'feilmelding.dokumentikkefunnet',
                ekstrafeilinfo: {},
                dokumentreferanse: '419361301'
            })
        )
);
fetchMock.get('/saksoversikt-api/tjenester/dokumenter/journalpostmetadata/:journalpostId', (req, res, ctx) =>
    res(ctx.json(dokumentMock))
);

fetchMock.get('/api/feature', (req, res, ctx) => {
    const queryParam = req.queryParams['feature'] || [];
    const features = Array.isArray(queryParam) ? queryParam : [queryParam];
    const results = features
        .map((feature) => [feature, featureToggles[feature] || false])
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as ToggleMap);
    return res(ctx.json(results));
});
