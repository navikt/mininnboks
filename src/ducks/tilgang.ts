import {doThenDispatch, DucksData, STATUS} from "./ducks-utils";
import * as Api from "../utils/api";
import {Action} from "redux";
import { TilgangsDTO } from '../utils/api';
import { Avhengigheter } from '../avhengigheter';

enum TypeKeys {
    INNSENDING_KOMMUNALE_SJEKK_OK = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_OK',
    INNSENDING_KOMMUNALE_SJEKK_PENDING = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_PENDING',
    INNSENDING_KOMMUNALE_SJEKK_FEILET = 'mininnboks/traader/INNSENDING_KOMMUNALE_SJEKK_FEILET',
}

type InnsendingKommunaleSjekkOk = Action<TypeKeys.INNSENDING_KOMMUNALE_SJEKK_OK> & DucksData<TilgangsDTO>;
type InnsendingKommunaleSjekkPending = Action<TypeKeys.INNSENDING_KOMMUNALE_SJEKK_PENDING>;
type InnsendingKommunaleSjekkFeilet = Action<TypeKeys.INNSENDING_KOMMUNALE_SJEKK_FEILET> & DucksData<Error>;

type Actions = InnsendingKommunaleSjekkOk | InnsendingKommunaleSjekkPending | InnsendingKommunaleSjekkFeilet;

interface OkState extends Avhengigheter.OkState<TilgangsDTO> {}
interface ErrorState extends Avhengigheter.ErrorState {}
interface OtherState extends Avhengigheter.OtherState {}
export type TilgangState = OkState | ErrorState | OtherState;

const initialState = {
    status: STATUS.NOT_STARTED,
    data: []
};

export default function reducer(state = initialState, action : Actions) {
    switch (action.type) {
        case TypeKeys.INNSENDING_KOMMUNALE_SJEKK_PENDING:
            return { ...state, status: STATUS.PENDING };
        case TypeKeys.INNSENDING_KOMMUNALE_SJEKK_OK:
            return { ...state, status: STATUS.OK, data: action.data };
        case TypeKeys.INNSENDING_KOMMUNALE_SJEKK_FEILET:
            return { ...state, status: STATUS.ERROR, error: action.data };
        default:
            return state;
    }
}

export function harTilgangTilKommunaleTemagrupper() {
    return doThenDispatch(() => Api.harTilgangTilKommunaleTemagrupper(), {
        OK: TypeKeys.INNSENDING_KOMMUNALE_SJEKK_OK,
        PENDING: TypeKeys.INNSENDING_KOMMUNALE_SJEKK_PENDING,
        FEILET: TypeKeys.INNSENDING_KOMMUNALE_SJEKK_FEILET
    });
}
