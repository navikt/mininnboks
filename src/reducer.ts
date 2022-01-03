import { combineReducers } from 'redux';
import traaderReducer, { TraaderState } from './ducks/traader';
import uiReducer, { UIState } from './ducks/ui';
import tilgangReducer, { TilgangState } from './ducks/tilgang';

export interface AppState {
    traader: TraaderState;
    ui: UIState;
    tilgang: TilgangState;
}

export default combineReducers({
    traader: traaderReducer,
    ui: uiReducer,
    tilgang: tilgangReducer
});
