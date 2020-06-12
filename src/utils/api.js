import { getCookie, fetchToJson } from './../ducks/utils';

const API_BASE_URL = '/mininnboks-api';
const MED_CREDENTIALS = { credentials: 'same-origin' };
const somPostConfig = () => ({
    credentials: 'same-origin',
    method: 'POST',
    redirect: 'manual',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION')
    }
});

const sendSporsmalConfig = (temagruppe, fritekst) => ({
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ temagruppe, fritekst })
});

const sendSvarConfig = (traadId, fritekst) => ({
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        'NAV_CSRF_PROTECTION': getCookie('NAV_CSRF_PROTECTION'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ traadId, fritekst })
});

export const TRAADER_PATH = `${API_BASE_URL}/traader`;
export const RESOURCES_PATH = `${API_BASE_URL}/resources`;
export const RATE_LIMITER_URL = `/rate-limiter/api/limit`;

export function hentLedetekster() {
    return fetchToJson(RESOURCES_PATH, MED_CREDENTIALS);
}

export function hentTraader() {
    return fetchToJson(TRAADER_PATH, MED_CREDENTIALS);
}

export function markerTraadSomLest(traadId) {
    return fetchToJson(`${API_BASE_URL}/traader/allelest/${traadId}`, somPostConfig());
}

export function markerSomLest(behandlingsId) {
    return fetchToJson(`${API_BASE_URL}/traader/lest/${behandlingsId}`, somPostConfig());
}

export function sendSporsmal(temagruppe, fritekst, isDirekte) {
    if(isDirekte) {
        return fetchToJson(`${API_BASE_URL}/traader/sporsmaldirekte`, sendSporsmalConfig(temagruppe, fritekst));
    }
    return fetchToJson(`${API_BASE_URL}/traader/sporsmal`, sendSporsmalConfig(temagruppe, fritekst));
}

export function sendSvar(traadId, fritekst) {
    return fetchToJson(`${API_BASE_URL}/traader/svar`, sendSvarConfig(traadId, fritekst));
}

export function harTilgangTilKommunaleTemagrupper() {
    return fetchToJson(`${API_BASE_URL}/tilgang/oksos`, MED_CREDENTIALS)
}

export function sjekkRatelimiter() { return fetchToJson(RATE_LIMITER_URL, MED_CREDENTIALS); }
export function sjekkOgOppdaterRatelimiter() { return fetchToJson(RATE_LIMITER_URL, postConfig()); }
