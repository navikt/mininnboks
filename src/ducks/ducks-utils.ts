import { Dispatch } from 'redux';

export type ErrorWithResponse = Error & { response: Response };
export type DucksData<T> = { data: T };

export enum STATUS {
    NOT_STARTED = 'NOT_STARTED',
    PENDING = 'PENDING',
    OK = 'OK',
    RELOADING = 'RELOADING',
    ERROR = 'ERROR'
}

export function sjekkStatuskode(response: Response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    const error = new Error(response.statusText);
    (error as ErrorWithResponse).response = response;
    throw error;
}

export function toJson(response: Response) {
    if (response.status !== 204) {
        // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch: Dispatch<any>, action: string) {
    return (...data: any) => {
        if (data.length === 1) {
            return dispatch({ type: action, data: data[0] });
        }
        return dispatch({ type: action, data });
    };
}

export function handterFeil(dispatch: Dispatch<any>, action: string) {
    return (error: ErrorWithResponse) => {
        if (error.response) {
            error.response.text().then((data) => {
                console.error(error, error.stack, data); // eslint-disable-line no-console
                dispatch({ type: action, data: { response: error.response, data } });
            });
        } else {
            console.error(error, error.stack); // eslint-disable-line no-console
            dispatch({ type: action, data: error.toString() });
        }
    };
}

export const getCookie = (name: string) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export function fetchToJson(url: string, config = {}) {
    return fetch(url, config).then(sjekkStatuskode).then(toJson);
}

export type AsyncActions = {
    OK: string;
    PENDING?: string;
    FEILET: string;
};
export function doThenDispatch(fn: () => Promise<any>, { OK, FEILET, PENDING }: AsyncActions) {
    return (dispatch: Dispatch<any>) => {
        if (PENDING) {
            dispatch({ type: PENDING });
        }
        return fn().then(sendResultatTilDispatch(dispatch, OK)).catch(handterFeil(dispatch, FEILET));
    };
}
