import { getCookie, fetchToJson } from '../ducks/ducks-utils';

const API_BASE_URL = '/mininnboks-api';
export const MED_CREDENTIALS: RequestInit = { credentials: 'same-origin' };
export const somPostConfig: () => RequestInit = () => ({
    credentials: 'same-origin',
    method: 'POST',
    redirect: 'manual',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION')
    }
});

const sendSporsmalConfig = (temagruppe: string, fritekst: string, overstyrtGt: string | undefined) => ({
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ temagruppe, fritekst, overstyrtGt })
});

const sendSvarConfig = (traadId: string, fritekst: string) => ({
    credentials: 'same-origin',
    method: 'POST',
    headers: {
        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN-MININNBOKS'),
        NAV_CSRF_PROTECTION: getCookie('NAV_CSRF_PROTECTION'),
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ traadId, fritekst })
});

export const TRAADER_PATH = `${API_BASE_URL}/traader`;
export const RESOURCES_PATH = `${API_BASE_URL}/resources`;

export function hentTraader() {
    return fetchToJson(TRAADER_PATH, MED_CREDENTIALS);
}

export function markerTraadSomLest(traadId: string) {
    return fetchToJson(`${API_BASE_URL}/traader/allelest/${traadId}`, somPostConfig());
}

export function markerSomLest(behandlingsId: string) {
    return fetchToJson(`${API_BASE_URL}/traader/lest/${behandlingsId}`, somPostConfig());
}

export function sendSporsmal(
    temagruppe: string,
    fritekst: string,
    overstyrtGt: string | undefined,
    isDirekte: boolean
) {
    if (isDirekte) {
        return fetchToJson(
            `${API_BASE_URL}/traader/sporsmaldirekte`,
            sendSporsmalConfig(temagruppe, fritekst, overstyrtGt)
        );
    }
    return fetchToJson(`${API_BASE_URL}/traader/sporsmal`, sendSporsmalConfig(temagruppe, fritekst, overstyrtGt));
}

export function sendSvar(traadId: string, fritekst: string) {
    return fetchToJson(`${API_BASE_URL}/traader/svar`, sendSvarConfig(traadId, fritekst));
}

export interface TilgangsDTO {
    resultat: 'FEILET' | 'KODE6' | 'INGEN_ENHET' | 'OK';
    melding: string;
}

export function harTilgangTilKommunaleTemagrupper(): Promise<TilgangsDTO> {
    return fetchToJson(`${API_BASE_URL}/tilgang/oksos`, MED_CREDENTIALS);
}
