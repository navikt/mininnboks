import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { RESOURCES_PATH, TRAADER_PATH } from '../utils/api';
import traader from './traader.json';
import resources from './resources.json';
import fetchDekoratorHtml from './dekorator/fetchDekoratorHtml';
import { AvsenderMottaker, Journalpost, Retning } from '../dokument-visning/v2/domain';

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

const fetchMock = FetchMock.configure({
    enableFallback: true, // default: true
    middleware: MiddlewareUtils.combine(
        MiddlewareUtils.delayMiddleware(200),
        MiddlewareUtils.failurerateMiddleware(0.01),
        MiddlewareUtils.loggingMiddleware()
    )
});

fetchMock.get(TRAADER_PATH, (req, res, ctx) => {
    const trader = traader.filter((trad) =>
        trad.meldinger.every((melding: any) => ['DOKUMENT_VARSEL', 'OPPGAVE_VARSEL'].includes(melding.type))
    );
    return res(ctx.json(trader));
});
fetchMock.get(RESOURCES_PATH, (req, res, ctx) => res(ctx.json(resources)));
fetchMock.post('/mininnboks-api/traader/lest/:id', (req, res, ctx) => res(ctx.json({})));
fetchMock.post('/mininnboks-api/traader/allelest/:id', (req, res, ctx) => res(ctx.json({})));

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
