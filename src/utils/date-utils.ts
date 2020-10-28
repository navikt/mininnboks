const locale = 'nb-NO';
const dateLocaleOptions: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
};
const timeLocaleOptions: Intl.DateTimeFormatOptions = {
    ...dateLocaleOptions,
    hour: '2-digit',
    hour12: false,
    minute: '2-digit',
    second: undefined
};

const DATO_FORMAT = new Intl.DateTimeFormat(locale, dateLocaleOptions);
const DATO_TID_MANEDSNANV_FORMAT = new Intl.DateTimeFormat(locale, { ...timeLocaleOptions, month: 'long' });
const BARE_MANED = new Intl.DateTimeFormat(locale, { month: 'long' });

export function asDate(dato: string | Date): Date {
    if (dato instanceof Date) {
        return dato;
    }
    return new Date(dato);
}

export function formaterDato(dato: string | Date) {
    return DATO_FORMAT.format(asDate(dato));
}

export function formaterDatoTidMedMaanedsnavn(datoStr: string | Date) {
    const dato = asDate(datoStr);
    return fiksKortformAvManed(dato, DATO_TID_MANEDSNANV_FORMAT.format(dato)).replace(',', '');
}

const fiksKortformAvManed = (dato: Date, value: string): string => {
    const maned = BARE_MANED.format(dato);
    if (maned.length <= 4) {
        return value;
    }
    return value.replace(maned, `${maned.substring(0, 3)}.`);
};
