import * as React from 'react';
import {hasError, isPending} from "@nutgaard/use-fetch";
import {useFeaturetoggles} from "../utils/api";
import DokumentVisningSide from './v1/DokumentVisningSide';

function useSafSaker(): boolean | null {
    const featuretoggles = useFeaturetoggles();
    if (hasError(featuretoggles) || isPending(featuretoggles)) {
        // Kommer aldri hit om uthenting har feilet
        return null;
    }
    return featuretoggles.data["modia.innboks.saf-saker"];
}

function DokumentVisningSideSwitcher() {
    const useSaf = useSafSaker();
    if (useSaf == null) {
        return null
    } else if (useSaf) {
        return null;
    } else {
        return <DokumentVisningSide />
    }
}

export default DokumentVisningSideSwitcher;