import FetchMock, { MiddlewareUtils } from 'yet-another-fetch-mock';
import { TRAADER_PATH, RESOURCES_PATH, RATE_LIMITER_URL } from '../utils/api';
import * as traader from './traader.json';
import * as resources from './resources.json';

export default () => {
    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(200),
            MiddlewareUtils.failurerateMiddleware(0.01),
            MiddlewareUtils.loggingMiddleware()
        )
    });

    console.log('### MOCK AKTIVERT! ###'); // tslint:disable-line:no-console

    fetchMock.get(TRAADER_PATH, (req, res, ctx) => res(ctx.json( traader )));
    fetchMock.get(RESOURCES_PATH, (req, res, ctx) => res(ctx.json( resources )));
    fetchMock.get('/mininnboks-api/tilgang/oksos', (req, res, ctx) => res(ctx.json({ resultat: 'OK', melding: 'Kunne ikke hente data fra pdl-api' })));
    fetchMock.get(RATE_LIMITER_URL, (req, res, ctx) => res(ctx.json(true)));

    fetchMock.post(RATE_LIMITER_URL, (req, res, ctx) => res(ctx.json(false)));
    fetchMock.post('/mininnboks-api/traader/svar', (req, res, ctx) => res(ctx.json({})));
    fetchMock.post('/mininnboks-api/traader/lest/:id', (req, res, ctx) => res(ctx.json({})));
    fetchMock.post('//mininnboks-api/traader/allelest/:id', (req, res, ctx) => res(ctx.json({})));
};
