import * as Api from '../utils/api';
import {STATUS, doThenDispatch, DucksData} from './ducks-utils';
import {Temagruppe} from "../skriv-nytt-sporsmal/TemagruppeEkstraInfo";
import {Action} from "redux";
import { Avhengigheter } from '../avhengigheter';


// Actions
enum TypeKeys {
    OK = 'mininnboks/ledetekster/OK',
    FEILET = 'mininnboks/ledetekster/FEILET',
    PENDING = 'mininnboks/ledetekster/PENDING',
}

type Ok = Action<TypeKeys.OK> & DucksData<string[]>;
type Feilet = Action<TypeKeys.FEILET> & DucksData<Error>;
type Pending = Action<TypeKeys.PENDING>;

type Actions = Ok | Feilet | Pending;

export namespace Ledetekster {
    export interface OkState extends Avhengigheter.OkState<string[]> {
        godkjenteTemagrupper: Temagruppe[]
    }
    export interface ErrorState extends Avhengigheter.ErrorState {}
    export interface OtherState extends Avhengigheter.OtherState {}
}
export type LedeteksterState = Ledetekster.OkState | Ledetekster.ErrorState | Ledetekster.OtherState;
const initalState: LedeteksterState = {
    status: STATUS.NOT_STARTED
};


// Reducer
export default function reducer(state = initalState, action : Actions) {
    switch (action.type) {
        case TypeKeys.PENDING:
            return { ...state, status: STATUS.PENDING };
        case TypeKeys.FEILET:
            return { ...state, status: STATUS.ERROR, data: action.data };
        case TypeKeys.OK: {
            const godkjenteTemagrupper = action.data['temagruppe.liste'].split(' ');
            return { ...state, status: STATUS.OK, data: action.data, godkjenteTemagrupper };
        }
        default:
            return state;
    }
}

// Action Creators
export function hentLedetekster() {
    return doThenDispatch(() => Api.hentLedetekster(), {
        OK: TypeKeys.OK,
        FEILET: TypeKeys.FEILET,
        PENDING: TypeKeys.PENDING
    });
}
