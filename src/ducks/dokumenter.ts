
export const API_BASE_URL = '/saksoversikt-api/tjenester';

const MED_CREDENTIALS = { credentials: 'same-origin' };
import { STATUS, fetchToJson, doThenDispatch } from './ducks-utils';

export interface DokumentState<T> {
    status: STATUS,
    data: T,
    pdfModal: {
        skalVises: boolean,
        dokumentUrl: string | undefined
    }
}
const initalState = {
    status: STATUS.NOT_STARTED,
    data: {},
    pdfModal: {
        skalVises: false,
        dokumentUrl: undefined
    }
};

export enum DokumenterActionTypes {
    DOKUMENTVISNING_DATA_OK = 'DOKUMENTVISNING_DATA_OK',
    DOKUMENTVISNING_DATA_FEILET = 'DOKUMENTVISNING_DATA_FEILET',
    DOKUMENTVISNING_DATA_PENDING = 'DOKUMENTVISNING_DATA_PENDING',
    STATUS_PDF_MODAL = 'STATUS_PDF_MODAL',
}
export interface SkjulLastNedPdfModal {
    type: DokumenterActionTypes.STATUS_PDF_MODAL;
    pdfModal: {
        skalVises: boolean,
        dokumentUrl: string | undefined
    };
}

export interface VisLastNedPdfModal {
    type: DokumenterActionTypes.STATUS_PDF_MODAL;
    pdfModal: {
        skalVises: boolean,
        dokumentUrl: string | undefined
    };
}
export type DokumentActions = SkjulLastNedPdfModal | VisLastNedPdfModal | ;


// Reducer
export default function reducer(state : DokumentState = initalState, action : DokumentActions) : DokumentState {
    switch (action.type) {
        case DokumenterActionTypes.DOKUMENTVISNING_DATA_PENDING:
            return { ...state, status: STATUS.PENDING };
        case DokumenterActionTypes.DOKUMENTVISNING_DATA_FEILET:
            return { ...state, status: STATUS.ERROR };
        case DokumenterActionTypes.DOKUMENTVISNING_DATA_OK: {
            const [dokumentmetadata, journalpostmetadata] = action.data;
            return { ...state, status: STATUS.OK, data: { dokumentmetadata, journalpostmetadata } };
        } case DokumenterActionTypes.STATUS_PDF_MODAL:
            return { ...state, pdfModal: action.pdfModal };
        default:
            return state;
    }
}

// ActionCreators
const hentDokumentMetadata = (journalpostId : string, dokumentmetadata) =>
    fetchToJson(`${API_BASE_URL}/dokumenter/dokumentmetadata/${journalpostId}/${dokumentmetadata}`,
        MED_CREDENTIALS);

const hentJournalpostMetadata = (journalpostId : string) =>
    fetchToJson(`${API_BASE_URL}/dokumenter/journalpostmetadata/${journalpostId}`, MED_CREDENTIALS);

const hentAlleDokumentMetadata = (journalpostId : string, dokumentreferanser) =>
    Promise.all(dokumentreferanser.split('-').map(dokumentId =>
        hentDokumentMetadata(journalpostId, dokumentId)));


export function hentDokumentVisningData(journalpostId : string, dokumentreferanser) {
    return doThenDispatch(() => Promise.all([
        hentAlleDokumentMetadata(journalpostId, dokumentreferanser),
        hentJournalpostMetadata(journalpostId)
    ]), {
        OK: DokumenterActionTypes.DOKUMENTVISNING_DATA_OK,
        FEILET: DokumenterActionTypes.DOKUMENTVISNING_DATA_FEILET,
        PENDING: DokumenterActionTypes.DOKUMENTVISNING_DATA_PENDING
    });
}

export function visLastNedPdfModal(dokumentUrl : string) : VisLastNedPdfModal {
    return { type: DokumenterActionTypes.STATUS_PDF_MODAL, pdfModal: { skalVises: true, dokumentUrl } };
}



export function skjulLastNedPdfModal() : SkjulLastNedPdfModal{
    return { type: DokumenterActionTypes.STATUS_PDF_MODAL, pdfModal: { skalVises: false, dokumentUrl: undefined } };
}

