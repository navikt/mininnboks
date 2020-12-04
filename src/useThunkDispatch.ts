import { useDispatch } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from './reducer';

export function useThunkDispatch(): ThunkDispatch<AppState, any, AnyAction> {
    return useDispatch();
}
