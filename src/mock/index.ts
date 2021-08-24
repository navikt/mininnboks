import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { RESOURCES_PATH, TRAADER_PATH } from '../utils/api';
import traader from './traader.json';
import resources from './resources.json';
import { dokumentMock } from './dokument-mock';
import fetchDekoratorHtml from './dekorator/fetchDekoratorHtml';

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
const brukerSalesforceDialoger = true;
const featureToggles: ToggleMap = {
    'modiabrukerdialog.bruker-salesforce-dialoger': brukerSalesforceDialoger
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
    const traderSf = traader
        .filter((trad) => trad.meldinger.every((melding: any) => ['DOKUMENT_VARSEL', 'OPPGAVE_VARSEL'].includes(melding.type)));
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
})