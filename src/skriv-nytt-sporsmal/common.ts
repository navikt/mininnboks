import useFormstateFactory, { Validation } from '@nutgaard/use-formstate';
import { Avhengighet } from '../avhengigheter';
import { AppState } from '../reducer';
import { ThunkAction } from 'redux-thunk';
import { useAppState, useThunkDispatch } from '../utils/custom-hooks';
import { useCallback, useEffect, useState } from 'react';
import { STATUS } from '../ducks/ducks-utils';
import { harTilgangTilKommunaleTemagrupper, TilgangState } from '../ducks/tilgang';
import { sjekkOgOppdaterRatelimiter, sjekkRatelimiter } from '../utils/api';
import { visibleIfHOC } from '../utils/hocs/visible-if';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';

export type SkrivNyttSporsmalForm = {
    fritekst: string;
    godkjennVilkaar: string;
};

export const defaultFormstateConfig: Validation<SkrivNyttSporsmalForm> = {
    godkjennVilkaar(value) {
        return value === 'true' ? undefined : 'Du må godta vilkårene for å sende beskjeden';
    },
    fritekst(value: string) {
        if (value.length === 0) {
            return 'Tekstfeltet er tomt';
        } else if (value.length > 1000) {
            return 'Teksten er for lang';
        }
        return undefined;
    }
};
export const useFormstate = useFormstateFactory(defaultFormstateConfig);

export enum FeilmeldingKommunalSjekk {
    FEILET = 'Noe gikk galt, vennligst prøv igjen på ett senere tidspunkt.',
    KODE6 = 'Du har dessverre ikke mulighet til å benytte denne løsningen. Vi ber om at du kontakter oss på telefon.',
    INGEN_ENHET = 'Du har dessverre ikke mulighet til å benytte denne løsningen. Vi ber om at du kontakter oss på telefon.'
}

export enum AndreFeilmeldinger {
    IKKE_GODKJENT_TEMAGRUPPE = 'Ikke gjenkjent temagruppe'
}

function useRestResource<S, T extends Avhengighet<S>>(
    selector: (appState: AppState) => T,
    fetcher: () => ThunkAction<any, any, any, any>
): T {
    const dispatch = useThunkDispatch();
    const resource = useAppState(selector);
    useEffect(() => {
        if (resource.status === STATUS.NOT_STARTED) {
            dispatch(fetcher());
        }
    }, [dispatch, resource, fetcher]);
    return resource;
}

export function useTilgangSjekk(): TilgangState {
    return useRestResource((state) => state.tilgang, harTilgangTilKommunaleTemagrupper);
}

export function useRatelimiter(): { isOk: boolean; update: () => Promise<boolean> } {
    const [state, setState] = useState(true);
    const update = useCallback(() => {
        const updatedValue = sjekkOgOppdaterRatelimiter();
        updatedValue.then((isOk) => setState(isOk));

        return updatedValue;
    }, [setState]);
    useEffect(() => {
        sjekkRatelimiter().then((isOk) => setState(isOk));
    }, [update]);

    return { isOk: state, update };
}

export const AlertstripeAdvarselVisibleIf = visibleIfHOC(AlertStripeAdvarsel);
