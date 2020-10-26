import { combineReducers } from "redux";

import traaderReducer, { TraaderState } from "./ducks/traader";
import ledetekstReducer, { LedeteksterState } from "./ducks/ledetekster";
import uiReducer, { UIState } from "./ducks/ui";
import dokumentReducer, { DokumentState } from "./ducks/dokumenter";
import tilgangReducer, { TilgangState } from "./ducks/tilgang";

export interface AppState {
  traader: TraaderState;
  ui: UIState;
  ledetekster: LedeteksterState;
  dokumenter: DokumentState;
  tilgang: TilgangState;
}

export default combineReducers({
  traader: traaderReducer,
  ledetekster: ledetekstReducer,
  dokumenter: dokumentReducer,
  ui: uiReducer,
  tilgang: tilgangReducer,
});
