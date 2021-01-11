import { AppState } from '../reducer';
import { useDispatch, useSelector } from 'react-redux';
import { EffectCallback, useEffect } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []); // eslint-disable-next-line react-hooks/exhaustive-deps
}

export function useScrollToTop() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return null;
}

export function useThunkDispatch(): ThunkDispatch<AppState, any, AnyAction> {
    return useDispatch();
}
