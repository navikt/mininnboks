import { doThenDispatch, STATUS } from "./ducks-utils";
import * as Api from "../utils/api";

export const INNSENDING_KOMMUNALE_SJEKK_OK = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_OK';
export const INNSENDING_KOMMUNALE_SJEKK_PENDING = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_PENDING';
export const INNSENDING_KOMMUNALE_SJEKK_FEILET = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_FEILET';

export interface TilgangState {
    status: STATUS,
    data: any
}

const initialState = {
    status: STATUS.NOT_STARTED,
    data: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case INNSENDING_KOMMUNALE_SJEKK_PENDING:
            return { ...state, status: STATUS.PENDING };
        case INNSENDING_KOMMUNALE_SJEKK_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case INNSENDING_KOMMUNALE_SJEKK_FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        default:
            return state;
    }
}

export function harTilgangTilKommunaleTemagrupper() {
    return doThenDispatch(() => Api.harTilgangTilKommunaleTemagrupper(), {
        OK: INNSENDING_KOMMUNALE_SJEKK_OK,
        PENDING: INNSENDING_KOMMUNALE_SJEKK_PENDING,
        FEILET: INNSENDING_KOMMUNALE_SJEKK_FEILET
    });
}
