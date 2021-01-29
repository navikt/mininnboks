import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { FOLKREGISTRERT_ADRESSE_PATH, RATE_LIMITER_URL, RESOURCES_PATH, TRAADER_PATH } from '../utils/api';
import traader from './traader.json';
import resources from './resources.json';
import { dokumentMock } from './dokument-mock';
import { Adresse } from '../skriv-nytt-sporsmal/geografisk-tilknytning/AdresseUtils';

console.log('==========================');
console.log('======== MED MOCK ========');
console.log('==========================');
const fetchMock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.01),
        MiddlewareUtils.loggingMiddleware()
    )
});

fetchMock.get(TRAADER_PATH, (req, res, ctx) => res(ctx.json(traader)));
fetchMock.get(RESOURCES_PATH, (req, res, ctx) => res(ctx.json(resources)));
fetchMock.get('/mininnboks-api/tilgang/oksos', (req, res, ctx) =>
    res(ctx.json({ resultat: 'OK', melding: 'Kunne ikke hente data fra pdl-api' }))
);

fetchMock.get(RATE_LIMITER_URL, (req, res, ctx) => res(ctx.json(true)));
fetchMock.post(RATE_LIMITER_URL, (req, res, ctx) => res(ctx.json(true)));

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

fetchMock.get('/sosialhjelp-soknad-api/informasjon/adressesok', (req, res, ctx) => {
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

fetchMock.post('/mininnboks-api/traader/svar', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/sporsmal', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/lest/:id', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/allelest/:id', (req, res, ctx) => res(ctx.json({})));

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
