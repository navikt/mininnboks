import { combineReducers } from 'redux';

import traaderReducer from './ducks/traader';
import ledetekstReducer from './ducks/ledetekster';
import uiReducer from './ducks/ui';
import dokumentReducer from './ducks/dokumenter';

export default combineReducers({
    traader: traaderReducer,
    ledetekster: ledetekstReducer,
    dokumenter: dokumentReducer,
    ui: uiReducer
});
