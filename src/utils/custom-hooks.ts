import { EffectCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
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

export function useDebounce<S>(value: S, delay: number): S {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
