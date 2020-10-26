import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export function useThunkDispatch<STATE, EXTRA, ACTION extends Action>(): ThunkDispatch<STATE, EXTRA, ACTION> {
    return useDispatch();
}
