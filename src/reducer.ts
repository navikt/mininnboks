import { combineReducers } from 'redux';
import traaderReducer, { TraaderState } from './ducks/traader';
import uiReducer, { UIState } from './ducks/ui';
import dokumentReducer, { DokumentState } from './ducks/dokumenter';
import tilgangReducer, { TilgangState } from './ducks/tilgang';

export interface AppState {
    traader: TraaderState;
    ui: UIState;
    dokumenter: DokumentState;
    tilgang: TilgangState;
}

export default combineReducers({
    traader: traaderReducer,
    dokumenter: dokumentReducer,
    ui: uiReducer,
    tilgang: tilgangReducer
});
