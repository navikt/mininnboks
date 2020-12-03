import { AppState } from '../reducer';
import { useSelector } from 'react-redux';
import { EffectCallback, useEffect } from 'react';

export function useAppState<T>(selector: (state: AppState) => T) {
    return useSelector((state: AppState) => selector(state));
}

export function useOnMount(effect: EffectCallback) {
    useEffect(effect, []); // eslint-disable-next-line react-hooks/exhaustive-deps
}
