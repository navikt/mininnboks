import { combineReducers } from 'redux';

import traaderReducer from './ducks/traader';
import ledetekstReducer from './ducks/ledetekster';
import uiReducer from './ducks/ui';
import dokumentReducer from './ducks/dokumenter';
import tilgangReducer from './ducks/tilgang';

export default combineReducers({
    traader: traaderReducer,
    ledetekster: ledetekstReducer,
    dokumenter: dokumentReducer,
    ui: uiReducer,
    tilgang: tilgangReducer
});
