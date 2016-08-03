export const STATUS = {
    NOT_STARTED: 'NOT_STARTED',
    PENDING: 'PENDING',
    OK: 'OK',
    RELOADING: 'RELOADING',
    ERROR: 'ERROR'
};

export function sjekkStatuskode(response) {
    if (response.status >= 200 && response.status < 300 && response.ok) {
        return response;
    }
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
}

export function toJson(response) {
    if (response.status !== 204) { // No content
        return response.json();
    }
    return response;
}

export function sendResultatTilDispatch(dispatch, action) {
    return (...data) => {
        if (data.length === 1) {
            return dispatch({type: action, data: data[0] });
        }
        return dispatch({ type: action, data })
    };
}

export function handterFeil(dispatch, action) {
    return (error) => {
        if (error.response){
            error.response.text().then((data) => {
                console.error(error, error.stack, data); // eslint-disable-line no-console
                dispatch({type: action, data: {response: error.response, data: data}});
            });
        } else {
            console.error(error, error.stack); // eslint-disable-line no-console
            dispatch({type: action, data: error.toString()});
        }
    };
}

export const getCookie = (name) => {
    const re = new RegExp(`${name}=([^;]+)`);
    const match = re.exec(document.cookie);
    return match !== null ? match[1] : '';
};

export function fetchToJson(url, config = {}) {
    return fetch(url, config)
        .then(sjekkStatuskode)
        .then(toJson);
}

export function doThenDispatch(fn, { OK, FEILET, PENDING }) {
    return (dispatch) => {
        if (PENDING) {
            dispatch({ type: PENDING });
        }
        return fn()
            .then(sendResultatTilDispatch(dispatch, OK))
            .catch(handterFeil(dispatch, FEILET));

    }
}
