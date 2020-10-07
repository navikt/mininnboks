import {Action} from "redux";

export const API_BASE_URL = '/saksoversikt-api/tjenester';

const MED_CREDENTIALS = { credentials: 'same-origin' };
import {STATUS, fetchToJson, doThenDispatch, DucksData} from './ducks-utils';
import {Dokument} from "../dokument";

interface PdfModal {
    skalVises: boolean,
    dokumentUrl: string | undefined
}

enum TypeKeys {
    DOKUMENTVISNING_DATA_OK = 'DOKUMENTVISNING_DATA_OK',
    DOKUMENTVISNING_DATA_FEILET = 'DOKUMENTVISNING_DATA_FEILET',
    DOKUMENTVISNING_DATA_PENDING = 'DOKUMENTVISNING_DATA_PENDING',
    STATUS_PDF_MODAL = 'STATUS_PDF_MODAL',
}

type DokumentvisningDataOk = Action<TypeKeys.DOKUMENTVISNING_DATA_OK> & DucksData<any>;
type DokumentvisningDataFeilet = Action<TypeKeys.DOKUMENTVISNING_DATA_FEILET>;
type DokumentvisningDataPending = Action<TypeKeys.DOKUMENTVISNING_DATA_PENDING>;
type StatusPdfModal = Action<TypeKeys.STATUS_PDF_MODAL> & DucksData<{pdfModal: PdfModal; }>;

type Actions = DokumentvisningDataOk | DokumentvisningDataFeilet | DokumentvisningDataPending | StatusPdfModal;

export interface DokumentState {
    status: STATUS,
    data: Dokument[] | Error,
    pdfModal: PdfModal
}
const initalState = {
    status: STATUS.NOT_STARTED,
    data: [],
    pdfModal: {
        skalVises: false,
        dokumentUrl: undefined
    }
};

// Reducer
export default function reducer(state : DokumentState = initalState, action : Actions) : DokumentState {
    switch (action.type) {
        case TypeKeys.DOKUMENTVISNING_DATA_PENDING:
            return { ...state, status: STATUS.PENDING };
        case TypeKeys.DOKUMENTVISNING_DATA_FEILET:
            return { ...state, status: STATUS.ERROR };
        case TypeKeys.DOKUMENTVISNING_DATA_OK: {
            const [dokumentmetadata, journalpostmetadata] = action.data;
            return { ...state, status: STATUS.OK, data: [dokumentmetadata, journalpostmetadata]};
        } case TypeKeys.STATUS_PDF_MODAL:
            return { ...state, pdfModal: action.data.pdfModal };
        default:
            return state;
    }
}

// ActionCreators
const hentDokumentMetadata = (journalpostId : string, dokumentmetadata : string) =>
    fetchToJson(`${API_BASE_URL}/dokumenter/dokumentmetadata/${journalpostId}/${dokumentmetadata}`,
        MED_CREDENTIALS);

const hentJournalpostMetadata = (journalpostId : string) =>
    fetchToJson(`${API_BASE_URL}/dokumenter/journalpostmetadata/${journalpostId}`, MED_CREDENTIALS);

const hentAlleDokumentMetadata = (journalpostId : string, dokumentreferanser : string) =>
    Promise.all(dokumentreferanser.split('-').map(dokumentId =>
        hentDokumentMetadata(journalpostId, dokumentId)));


export function hentDokumentVisningData(journalpostId : string, dokumentreferanser : string) {
    return doThenDispatch(() => Promise.all([
        hentAlleDokumentMetadata(journalpostId, dokumentreferanser),
        hentJournalpostMetadata(journalpostId)
    ]), {
        OK: TypeKeys.DOKUMENTVISNING_DATA_OK,
        FEILET: TypeKeys.DOKUMENTVISNING_DATA_FEILET,
        PENDING: TypeKeys.DOKUMENTVISNING_DATA_PENDING
    });
}

export function visLastNedPdfModal(dokumentUrl : string)  {
    return { type: TypeKeys.STATUS_PDF_MODAL, pdfModal: { skalVises: true, dokumentUrl } };
}



export function skjulLastNedPdfModal() {
    return { type: TypeKeys.STATUS_PDF_MODAL, pdfModal: { skalVises: false, dokumentUrl: undefined } };
}

