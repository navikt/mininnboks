import * as Api from '../utils/api';
import { MeldingsTyper, Temagruppe } from '../utils/constants';
import { eldsteMeldingForst } from '../utils';
import { doThenDispatch, DucksData, STATUS } from './ducks-utils';
import { Action, Dispatch } from 'redux';
import { AppState } from '../reducer';
import {
    ErrorState as AvhengigheterErrorState,
    harData,
    OkState as AvhengigheterOkState,
    OtherState as AvhengigheterOtherState
} from '../avhengigheter';
import { Melding, Traad } from '../Traad';
import { ThunkAction } from 'redux-thunk';

// Actions
export enum TypeKeys {
    HENT_ALLE_OK = 'mininnboks/traader/HENT_ALLE_OK',
    HENT_ALLE_FEILET = 'mininnboks/traader/HENT_ALLE_FEILET',
    HENT_ALLE_PENDING = 'mininnboks/traader/HENT_ALLE_PENDING',
    HENT_ALLE_RELOAD = 'mininnboks/traader/HENT_ALLE_RELOAD',
    MARKERT_SOM_LEST_OK = 'mininnboks/traader/MARKERT_SOM_LEST_OK',
    MARKERT_SOM_LEST_FEILET = 'mininnboks/traader/MARKERT_SOM_LEST_FEILET',
    INNSENDING_OK = 'mininnboks/traader/INNSENDING_OK',
    INNSENDING_FEILET = 'mininnboks/traader/INNSENDING_FEILET',
    RATELIMITER_FEILET = 'mininnboks/traader/RATELIMITER_FEILET',
    INNSENDING_PENDING = 'mininnboks/traader/INNSENDING_PENDING'
}

type HentAlleOk = Action<TypeKeys.HENT_ALLE_OK> & DucksData<Traad[]>;
type HentAlleFeilet = Action<TypeKeys.HENT_ALLE_FEILET> & DucksData<Error>;
type HentAllePending = Action<TypeKeys.HENT_ALLE_PENDING>;
type HentAlleReloading = Action<TypeKeys.HENT_ALLE_RELOAD>;
type MarkertSomLestOk = Action<TypeKeys.MARKERT_SOM_LEST_OK> & DucksData<{ traadId: string }>;
type MarkertSomLestFeilet = Action<TypeKeys.MARKERT_SOM_LEST_FEILET> & DucksData<Error>;
type InnsendingOk = Action<TypeKeys.INNSENDING_OK>;
type InnsendingFeilet = Action<TypeKeys.INNSENDING_FEILET>;
type RatelimiterFeilet = Action<TypeKeys.RATELIMITER_FEILET>;
type InnsendingPending = Action<TypeKeys.INNSENDING_PENDING>;

type Actions =
    | HentAlleOk
    | HentAlleFeilet
    | HentAllePending
    | HentAlleReloading
    | MarkertSomLestOk
    | MarkertSomLestFeilet
    | InnsendingOk
    | InnsendingFeilet
    | InnsendingPending
    | RatelimiterFeilet;

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
        case TypeKeys.INNSENDING_OK:
            return { ...state, innsendingStatus: STATUS.OK };
        case TypeKeys.INNSENDING_FEILET:
            return { ...state, innsendingStatus: STATUS.ERROR };
        case TypeKeys.INNSENDING_PENDING:
            return { ...state, innsendingStatus: STATUS.PENDING };
        case TypeKeys.RATELIMITER_FEILET:
            return { ...state, innsendingStatus: STATUS.TOOMANYREQUESTS };

        default:
            return state;
    }
}

const innsendingActions = {
    OK: TypeKeys.INNSENDING_OK,
    FEILET: TypeKeys.INNSENDING_FEILET,
    TOOMANYREQUESTS: TypeKeys.RATELIMITER_FEILET,
    PENDING: TypeKeys.INNSENDING_PENDING
};

// Action Creators
export function hentTraader(pendingType: string = TypeKeys.HENT_ALLE_PENDING) {
    return doThenDispatch(() => Api.hentTraader(), {
        OK: TypeKeys.HENT_ALLE_OK,
        FEILET: TypeKeys.HENT_ALLE_FEILET,
        PENDING: pendingType
    });
}

export const sendSporsmal = (temagruppe: Temagruppe, fritekst: string, isDirekte: boolean) => (
    dispatch: Dispatch<any>
) =>
    doThenDispatch(
        () =>
            Api.sendSporsmal(temagruppe, fritekst, isDirekte).then(() =>
                dispatch(hentTraader(TypeKeys.HENT_ALLE_RELOAD))
            ),
        innsendingActions
    )(dispatch);

export function sendSvar(traadId: string, fritekst: string): ThunkAction<Promise<unknown>, AppState, null, Actions> {
    return doThenDispatch(
        (dispatch: Dispatch<any>) =>
            Api.sendSvar(traadId, fritekst).then(() => dispatch(hentTraader(TypeKeys.HENT_ALLE_RELOAD))),
        innsendingActions
    );
}

export const sendSvar2 = (traadId: string, fritekst: string) => (dispatch: Dispatch<any>) =>
    doThenDispatch(
        () => Api.sendSvar(traadId, fritekst).then(() => dispatch(hentTraader(TypeKeys.HENT_ALLE_RELOAD))),
        innsendingActions
    )(dispatch);

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

// Selectors
function erSkriftligSvar(melding: Melding) {
    return melding.type === MeldingsTyper.SVAR_SKRIFTLIG;
}

function erDelvisSvar(melding: Melding) {
    return melding.type === MeldingsTyper.DELVIS_SVAR;
}

function flettDelviseSvarInnISkriftligSvar(traad: Traad, delviseSvar: Melding[]) {
    const skriftligeSvar = traad.meldinger.filter(erSkriftligSvar);
    if (skriftligeSvar.length > 0) {
        const avsluttendeSvar = skriftligeSvar.sort(eldsteMeldingForst)[0];
        const dobbeltLinjeskift = '\n\u00A0\n';

        const sorterteDelsvar = delviseSvar.sort(eldsteMeldingForst);
        avsluttendeSvar.fritekst = sorterteDelsvar
            .concat(avsluttendeSvar)
            .map((melding) => melding.fritekst)
            .join(dobbeltLinjeskift);
    }
}

function flettMeldingerITraad(traad: Traad): Traad {
    const delviseSvar = traad.meldinger.filter(erDelvisSvar);
    if (delviseSvar.length > 0) {
        flettDelviseSvarInnISkriftligSvar(traad, delviseSvar);
    }

    const sammenslaatTraad = traad;
    sammenslaatTraad.meldinger = traad.meldinger.filter((melding) => !erDelvisSvar(melding));
    return sammenslaatTraad;
}

export function selectTraaderMedSammenslatteMeldinger(store: AppState): { data: Traad[] } {
    if (harData(store.traader)) {
        return { data: store.traader.data.map(flettMeldingerITraad) };
    }
    return { data: [] };
}
