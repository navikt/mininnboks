import {AppState} from "../reducer";
import {useSelector} from "react-redux";

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}
