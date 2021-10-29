import { EffectCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useLocation } from 'react-router';
import { AppState } from '../reducer';

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

export function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}
