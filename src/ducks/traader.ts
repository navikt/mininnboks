import * as Api from '../utils/api';
import { doThenDispatch, DucksData, STATUS } from './ducks-utils';
import { Action } from 'redux';
import {
    ErrorState as AvhengigheterErrorState,
    harData,
    OkState as AvhengigheterOkState,
    OtherState as AvhengigheterOtherState
} from '../avhengigheter';
import { Melding, Traad } from '../Traad';

// Actions
export enum TypeKeys {
    HENT_ALLE_OK = 'mininnboks/traader/HENT_ALLE_OK',
    HENT_ALLE_FEILET = 'mininnboks/traader/HENT_ALLE_FEILET',
    HENT_ALLE_PENDING = 'mininnboks/traader/HENT_ALLE_PENDING',
    HENT_ALLE_RELOAD = 'mininnboks/traader/HENT_ALLE_RELOAD',
    MARKERT_SOM_LEST_OK = 'mininnboks/traader/MARKERT_SOM_LEST_OK',
    MARKERT_SOM_LEST_FEILET = 'mininnboks/traader/MARKERT_SOM_LEST_FEILET'
}

type HentAlleOk = Action<TypeKeys.HENT_ALLE_OK> & DucksData<Traad[]>;
type HentAlleFeilet = Action<TypeKeys.HENT_ALLE_FEILET> & DucksData<Error>;
type HentAllePending = Action<TypeKeys.HENT_ALLE_PENDING>;
type HentAlleReloading = Action<TypeKeys.HENT_ALLE_RELOAD>;
type MarkertSomLestOk = Action<TypeKeys.MARKERT_SOM_LEST_OK> & DucksData<{ traadId: string }>;
type MarkertSomLestFeilet = Action<TypeKeys.MARKERT_SOM_LEST_FEILET> & DucksData<Error>;

type Actions =
    | HentAlleOk
    | HentAlleFeilet
    | HentAllePending
    | HentAlleReloading
    | MarkertSomLestOk
    | MarkertSomLestFeilet;

type OkInnsendingState = { innsendingStatus: STATUS.OK };
type ErrorInnsendingState = { innsendingStatus: STATUS.ERROR };
type RateLimiterErrorInnsendingState = { innsendingStatus: STATUS.TOOMANYREQUESTS };

type OtherInnsendingState = { innsendingStatus: STATUS.NOT_STARTED | STATUS.PENDING };
type InnsendingState =
    | OkInnsendingState
    | ErrorInnsendingState
    | OtherInnsendingState
    | RateLimiterErrorInnsendingState;

type OkState = AvhengigheterOkState<Traad[]> & InnsendingState;
type ErrorState = AvhengigheterErrorState & InnsendingState;
type OtherState = AvhengigheterOtherState & InnsendingState;

export type TraaderState = OkState | ErrorState | OtherState;

export function getTraaderSafe(state: TraaderState): Array<Traad> {
    if (harData(state)) {
        return state.data;
    }
    return [];
}

const initalState: TraaderState = {
    status: STATUS.NOT_STARTED,
    innsendingStatus: STATUS.NOT_STARTED
};

// Utils
const markerMeldingSomLest = (melding: Melding) => ({ ...melding, lest: true });

// Reducer
export default function reducer(state: TraaderState = initalState, action: Actions): TraaderState {
    switch (action.type) {
        case TypeKeys.HENT_ALLE_PENDING:
            return { ...state, status: STATUS.PENDING };
        case TypeKeys.HENT_ALLE_FEILET:
            return { ...state, status: STATUS.ERROR, error: action.data };
        case TypeKeys.HENT_ALLE_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case TypeKeys.HENT_ALLE_RELOAD:
            return { ...(state as AvhengigheterOkState<Traad[]> & InnsendingState), status: STATUS.RELOADING };
        case TypeKeys.MARKERT_SOM_LEST_FEILET:
            return { ...state, status: STATUS.ERROR, error: action.data };
        case TypeKeys.MARKERT_SOM_LEST_OK: {
            if (!harData(state)) {
                return state;
            }
            const traader = state.data.map((traad) => {
                if (traad.traadId === action.data.traadId) {
                    const nyeste = markerMeldingSomLest(traad.nyeste);
                    const eldste = markerMeldingSomLest(traad.eldste);
                    const meldinger = traad.meldinger.map(markerMeldingSomLest);
                    return { ...traad, nyeste, eldste, meldinger };
                }
                return traad;
            });
            return { ...state, data: traader, status: STATUS.OK };
        }

        default:
            return state;
    }
}
// Action Creators
export function hentTraader(pendingType: string = TypeKeys.HENT_ALLE_PENDING) {
    return doThenDispatch(() => Api.hentTraader(), {
        OK: TypeKeys.HENT_ALLE_OK,
        FEILET: TypeKeys.HENT_ALLE_FEILET,
        PENDING: pendingType
    });
}

export function markerTraadSomLest(traadId: string) {
    return doThenDispatch(() => Api.markerTraadSomLest(traadId), {
        OK: TypeKeys.MARKERT_SOM_LEST_OK,
        FEILET: TypeKeys.MARKERT_SOM_LEST_FEILET
    });
}

export function markerBehandlingsIdSomLest(behandlingsId: string) {
    return doThenDispatch(() => Api.markerSomLest(behandlingsId), {
        OK: TypeKeys.MARKERT_SOM_LEST_OK,
        FEILET: TypeKeys.MARKERT_SOM_LEST_FEILET
    });
}
