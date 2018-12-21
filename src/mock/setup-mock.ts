import FetchMock, { Middleware, MiddlewareUtils } from 'yet-another-fetch-mock';
import { TRAADER_PATH, RESOURCES_PATH } from '../utils/api';

import * as traader from './traader.json';
import * as resources from './resources.json';

export default () => {

    const loggingMiddleware: Middleware = (request, response) => {
        console.log(request.url, response); // tslint:disable-line:no-console
        return response;
    };

    const fetchMock = FetchMock.configure({
        enableFallback: true, // default: true
        middleware: MiddlewareUtils.combine(
            MiddlewareUtils.delayMiddleware(200),
            MiddlewareUtils.failurerateMiddleware(0.01),
            loggingMiddleware
        )
    });

    console.log('### MOCK AKTIVERT! ###'); // tslint:disable-line:no-console

    fetchMock.get(TRAADER_PATH, traader);
    fetchMock.get(RESOURCES_PATH, resources);

    fetchMock.post('/mininnboks-api/traader/svar', {});
    fetchMock.post('/mininnboks-api/traader/lest/:id', {});
    fetchMock.post('/mininnboks-api/traader/allelest/:id', {});

};
