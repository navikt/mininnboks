import { combineReducers } from 'redux';
import traaderReducer, { TraaderState } from './ducks/traader';

export interface AppState {
    traader: TraaderState;
}

export default combineReducers({
    traader: traaderReducer
});
