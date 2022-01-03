export interface Adresse {
    adresse: null | string;
    tilleggsnavn: null | string;
    husnummer: null | string;
    husbokstav: null | string;
    kommunenummer: null | string;
    kommunenavn: null | string;
    postnummer: null | string;
    poststed: null | string;
    geografiskTilknytning: null | string;
    gatekode: null | string;
    bydel: null | string;
    type: null | string;
}

export function beregnTekstfeltMarkorPosisjon(adresse: Adresse): number {
    const husbokstav = adresse.husbokstav ? adresse.husbokstav : '';
    if (adresse.adresse) {
        return adresse.husnummer
            ? adresse.adresse.length + adresse.husnummer.length + husbokstav.length + 1
            : adresse.adresse.length + 1;
    }
    return 0;
}

function isDefined(value: string | null | undefined): boolean {
    return !!value && value.length > 0;
}

export function formaterAdresseString(adresse: Adresse | null): string {
    if (adresse === null) {
        return '';
    }

    let returverdi = adresse.adresse || '';

    try {
        if (isDefined(adresse.postnummer) && isDefined(adresse.poststed)) {
            if (isDefined(adresse.husnummer)) {
                returverdi += ` ${adresse.husnummer}${adresse.husbokstav || ''}`;
            }
            returverdi += ', ' + adresse.postnummer + ' ' + adresse.poststed;
        } else if (isDefined(adresse.kommunenavn)) {
            if (isDefined(adresse.husnummer)) {
                returverdi += ` ${adresse.husnummer}${adresse.husbokstav || ''}`;
            }
            returverdi += ', ' + adresse.kommunenavn;
        }
    } catch (error) {
        console.warn('error: ' + error);
    }
    return returverdi || '';
}

export function removeDuplicatesAfterTransform<FROM, TO>(myArray: FROM[], transform: (item: FROM) => TO) {
    const propArray = myArray.map((elem) => transform(elem));
    return myArray.filter((obj, pos) => {
        return propArray.indexOf(propArray[pos]) === pos;
    });
}
