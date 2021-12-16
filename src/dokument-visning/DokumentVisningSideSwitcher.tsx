import * as React from 'react';
import { hasError, isPending } from '@nutgaard/use-fetch';
import { useFeaturetoggles } from '../utils/api';
import DokumentVisningSide from './v1/DokumentVisningSide';
import DokumentVisningSideV2 from './v2/DokumentVarselVisningSide';

function useSafSaker(): boolean | null {
    const featuretoggles = useFeaturetoggles();
    if (hasError(featuretoggles) || isPending(featuretoggles)) {
        // Kommer aldri hit om uthenting har feilet
        return null;
    }
    return featuretoggles.data['modia.innboks.saf-saker'];
}

function DokumentVisningSideSwitcher() {
    const useSaf = useSafSaker();
    if (useSaf == null) {
        return null;
    } else if (useSaf) {
        return <DokumentVisningSideV2 />;
    } else {
        return <DokumentVisningSide />;
    }
}

export default DokumentVisningSideSwitcher;
