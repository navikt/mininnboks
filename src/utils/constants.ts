export enum MeldingsTyper {
    SPORSMAL_SKRIFTLIG = 'SPORSMAL_SKRIFTLIG',
    SPORSMAL_SKRIFTLIG_DIREKTE = 'SPORSMAL_SKRIFTLIG_DIREKTE',
    SVAR_SKRIFTLIG = 'SVAR_SKRIFTLIG',
    DELVIS_SVAR = 'DELVIS_SVAR_SKRIFTLIG',
    INFOMELDING_MODIA_UTGAAENDE = 'INFOMELDING_MODIA_UTGAAENDE',
    SPORSMAL_MODIA_UTGAAENDE = 'SPORSMAL_MODIA_UTGAAENDE'
}

export enum Temagrupper {
    ORT_HJE = 'Ortopediske hjelpemidler',
    BIL = 'Hjelpemidler Bil',
    HJLPM = 'Hjelpemidler',
    ARBD = 'Arbeid',
    PENS = 'Pensjon',
    OKSOS = 'Økonomisk sosialhjelp',
    OVRG = 'Øvrig',
    ANSOS = 'Økonomisk sosialhjelp',
    FMLI = 'Familie',
    UFRT = 'Uføretrygd',
    HELSE = 'Helse',
    FDAG = 'Forskudd på dagpenger'
}

export const GodkjenteTemagrupper = ['ARBD', 'HELSE', 'FMLI', 'FDAG', 'HJLPM', 'BIL', 'ORT_HJE', 'PENS', 'UFRT'];
