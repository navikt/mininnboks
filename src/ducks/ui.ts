import {Action} from "redux";
import {DucksData} from "./ducks-utils";

// Actions
export enum TypeKeys {
    VIS_VILKAR_MODAL = 'mininnboks/ui/VIS_VILKAR_MODAL',
    VIS_BESVAR_BOKS = 'mininnboks/ui/VIS_BESVAR_BOKS',
    INNSENDING_OK = 'mininnboks/traader/INNSENDING_OK',

}

type VisVilkarModal = Action<TypeKeys.VIS_VILKAR_MODAL> & DucksData<boolean>;
type VisBesvarBoks = Action<TypeKeys.VIS_BESVAR_BOKS> & DucksData<boolean>;
type InnsendingOk = Action<TypeKeys.INNSENDING_OK>;

type Actions = VisBesvarBoks | VisVilkarModal | InnsendingOk;


export interface UIState {
    visVilkarModal: boolean,
    visBesvarBoks: boolean
}
const initalState = {
    visVilkarModal: false,
    visBesvarBoks: false
};


// Reducer
export default function reducer(state = initalState, action : Actions) {
    switch (action.type) {
        case TypeKeys.VIS_VILKAR_MODAL:
            return { ...state, visVilkarModal: action.data };
        case TypeKeys.VIS_BESVAR_BOKS:
            return { ...state, visBesvarBoks: action.data };
        case TypeKeys.INNSENDING_OK:
            return { ...state, visBesvarBoks: false };
        default:
            return state;
    }
}

// Action Creators
export function visVilkarModal() {
    return { type: TypeKeys.VIS_VILKAR_MODAL, data: true };
}
export function skjulVilkarModal() {
    return { type: TypeKeys.VIS_VILKAR_MODAL, data: false };
}
export function visBesvarBoks() {
    return { type: TypeKeys.VIS_BESVAR_BOKS, data: true };
}
export function skjulBesvarBoks() {
    return { type: TypeKeys.VIS_BESVAR_BOKS, data: false };
}
